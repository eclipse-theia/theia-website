#!/usr/bin/env node
/********************************************************************************
 * Copyright (C) 2025 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

/**
 * Script to collect commit statistics from the eclipse-theia GitHub organization
 * This script retrieves the total number of commits per author across all repositories
 * for the last 12 months, including email addresses, grouped by organization.
 */

const { Octokit } = require('@octokit/rest');
const { throttling } = require('@octokit/plugin-throttling');
const ThrottledOctokit = Octokit.plugin(throttling);
const fs = require('fs');
const path = require('path');

// Configure the GitHub API client
// A GitHub token is recommended but optional
// Create a token at https://github.com/settings/tokens
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Configure the Octokit client with or without a token
const octokitConfig = {
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      console.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
      if (retryCount < 3) {
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
      return false;
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      console.warn(`Secondary rate limit hit for request ${options.method} ${options.url}`);
      return true;
    }
  }
};

// Add auth token if available
if (GITHUB_TOKEN) {
  octokitConfig.auth = GITHUB_TOKEN;
} else {
  console.warn('No GITHUB_TOKEN provided. Running unauthenticated with rate limit of 60 requests per hour.');
  console.warn('For higher rate limits, set the GITHUB_TOKEN environment variable:');
  console.warn('export GITHUB_TOKEN=your_github_token');
}

const octokit = new ThrottledOctokit(octokitConfig);

// GitHub organization to analyze
const ORG = 'eclipse-theia';

// ======================================================================
// CONFIGURATION: Organizations to track
// ======================================================================
// To add a new organization:
// 1. For email domains: add an entry with 'domain' property
// 2. For specific emails: add an entry with 'email' property
// 3. You can also combine both by adding specific emails to a domain group
// 4. Add a 'type' property to categorize the organization
// ======================================================================
const TRACKED_ORGS = [
  {
    name: 'EclipseSource',
    type: 'company',
    domain: 'eclipsesource.com',
    specificEmails: []
  },
  {
    name: 'TypeFox',
    type: 'company',
    domain: 'typefox.io',
    specificEmails: []
  },
  {
    name: 'tsmaeder',
    type: 'individual',
    domain: null,
    specificEmails: ['tsmaeder@users.noreply.github.com']
  }
  // Add more organizations as needed using the same format
];

// Calculate date for 12 months ago
const getTwelveMonthsAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 12);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const startDate = getTwelveMonthsAgo();

// Determine which organization an author belongs to based on email
function getAuthorOrg(email) {
  if (!email) return 'Unknown';
  
  // Check for specific email matches first
  for (const org of TRACKED_ORGS) {
    if (org.specificEmails && org.specificEmails.includes(email)) {
      return org.name;
    }
  }
  
  // Check for domain matches
  for (const org of TRACKED_ORGS) {
    if (org.domain && email.toLowerCase().endsWith('@' + org.domain.toLowerCase())) {
      return org.name;
    }
  }
  
  // If no match found
  return 'Other';
}

// Main function to collect statistics
async function collectCommitStats() {
  console.log(`Collecting commit statistics for ${ORG} organization since ${startDate} (last 12 months)...`);
  
  // Check rate limit before starting
  try {
    const rateLimit = await octokit.rateLimit.get();
    console.log(`GitHub API rate limit: ${rateLimit.data.rate.remaining}/${rateLimit.data.rate.limit} requests remaining`);
    
    if (rateLimit.data.rate.remaining < 10) {
      const resetTime = new Date(rateLimit.data.rate.reset * 1000);
      console.error(`Rate limit too low to proceed. Limit resets at ${resetTime.toLocaleString()}`);
      process.exit(1);
    }
  } catch (error) {
    console.warn('Could not check rate limit:', error.message);
  }
  
  // Get all repositories from the organization
  const repos = await getAllRepos();
  console.log(`Found ${repos.length} repositories in the ${ORG} organization.`);
  
  // Initialize statistics structure grouped by organization
  const orgStats = {};
  
  // Initialize organization stats for all tracked orgs
  TRACKED_ORGS.forEach(org => {
    orgStats[org.name] = {
      name: org.name,
      totalCommits: 0,
      authors: {}
    };
  });
  
  // Also track "Other" for unmatched emails
  orgStats['Other'] = {
    name: 'Other',
    totalCommits: 0,
    authors: {}
  };
  
  // Process repositories
  for (const repo of repos) {
    console.log(`Processing repository: ${repo.name}`);
    
    try {
      // Get commits for this repository
      const commits = await getAllCommits(repo.name);
      console.log(`  Found ${commits.length} commits in the last 12 months.`);
      
      // Process commits
      for (const commit of commits) {
        if (!commit.commit.author) continue;
        
        const authorName = commit.commit.author.name || 'Unknown';
        const authorEmail = commit.commit.author.email || 'No email';
        const authorOrg = getAuthorOrg(authorEmail);
        
        // Skip if not in our tracked organizations
        if (!orgStats[authorOrg]) continue;
        
        const authorKey = `${authorName} <${authorEmail}>`;
        
        if (!orgStats[authorOrg].authors[authorKey]) {
          orgStats[authorOrg].authors[authorKey] = {
            name: authorName,
            email: authorEmail,
            commitCount: 0
          };
        }
        
        orgStats[authorOrg].authors[authorKey].commitCount++;
        orgStats[authorOrg].totalCommits++;
      }
    } catch (error) {
      console.error(`  Error processing repository ${repo.name}: ${error.message}`);
    }
  }
  
  // Print results grouped by organization
  console.log('\n======================================================');
  console.log(`COMMIT STATISTICS FOR THE LAST 12 MONTHS (since ${startDate})`);
  console.log('======================================================\n');
  
  // Get tracked orgs
  const trackedOrgNames = TRACKED_ORGS.map(org => org.name);
  
  // Sort organizations by total commits
  const sortedOrgs = Object.values(orgStats)
    .filter(org => trackedOrgNames.includes(org.name))  // Only include tracked orgs
    .sort((a, b) => b.totalCommits - a.totalCommits);
  
  // Print each organization's stats
  for (const org of sortedOrgs) {
    if (org.totalCommits === 0) continue; // Skip orgs with no commits
    
    console.log(`\n== ${org.name} (${org.totalCommits} total commits) ==`);
    console.log('Author Name <Email>: Commit Count');
    console.log('---------------------------------------');
    
    // Sort authors by commit count
    const sortedAuthors = Object.values(org.authors)
      .sort((a, b) => b.commitCount - a.commitCount);
    
    // Print each author's stats
    sortedAuthors.forEach(author => {
      console.log(`${author.name} <${author.email}>: ${author.commitCount}`);
    });
    
    console.log(`\nTotal authors in ${org.name}: ${sortedAuthors.length}`);
  }
  
  // Print overall summary
  const totalCommits = sortedOrgs.reduce((sum, org) => sum + org.totalCommits, 0);
  const totalAuthors = sortedOrgs.reduce((sum, org) => sum + Object.keys(org.authors).length, 0);
  
  console.log('\n======================================================');
  console.log('SUMMARY');
  console.log('======================================================');
  console.log(`Total organizations: ${sortedOrgs.length}`);
  console.log(`Total authors: ${totalAuthors}`);
  console.log(`Total commits: ${totalCommits}`);
  
  // Generate and write JSON stats to file
  writeStatsToJson(sortedOrgs);
}

// Write organization statistics to a JSON file
function writeStatsToJson(organizations) {
  // Create simplified stats object with just name, type, and total commits
  const simplifiedStats = organizations.map(org => {
    // Find the original org definition to get the type
    const orgDef = TRACKED_ORGS.find(trackedOrg => trackedOrg.name === org.name) || {};
    
    return {
      name: org.name,
      type: orgDef.type || 'unknown',
      totalCommits: org.totalCommits
    };
  });
  
  // Create utils directory if it doesn't exist
  const utilsDir = path.join(__dirname, '..', 'src/utils');
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
    console.log(`Created directory: ${utilsDir}`);
  }
  
  // Create the JSON file
  const outputFile = path.join(utilsDir, 'org-commit-stats.json');
  fs.writeFileSync(outputFile, JSON.stringify(simplifiedStats, null, 2));
  
  console.log(`\nJSON statistics written to: ${outputFile}`);
}

// Get all repositories in the organization
async function getAllRepos() {
  const repos = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    const response = await octokit.repos.listForOrg({
      org: ORG,
      per_page: perPage,
      page: page
    });
    
    if (response.data.length === 0) break;
    
    repos.push(...response.data);
    page++;
  }
  
  return repos;
}

// Get all commits for a repository since the specified date
async function getAllCommits(repoName) {
  const commits = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    try {
      const response = await octokit.repos.listCommits({
        owner: ORG,
        repo: repoName,
        since: `${startDate}T00:00:00Z`,  // Changed to 12 months ago
        per_page: perPage,
        page: page
      });
      
      if (response.data.length === 0) break;
      
      commits.push(...response.data);
      page++;
    } catch (error) {
      if (error.status === 409) {
        console.warn(`  Repository ${repoName} is empty or in conflict. Skipping.`);
        break;
      }
      throw error;
    }
  }
  
  return commits;
}

// Run the script
collectCommitStats().catch(error => {
  console.error('Error executing script:', error);
  process.exit(1);
});