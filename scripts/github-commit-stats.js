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
 * Script to collect commit statistics and interaction data from the eclipse-theia GitHub organization
 * This script retrieves:
 * - Total number of commits per author across all repositories
 * - Interactions from discussions, bug reports (issues), and pull requests
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

// Configuration options
const SKIP_USERNAME_LOOKUP = process.env.SKIP_USERNAME_LOOKUP === 'true';

// Configure the Octokit client with or without a token
const octokitConfig = {
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      console.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
      if (retryCount < 5) { // Increased retry count
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
  console.log('Using authenticated GitHub API (higher rate limits)');
} else {
  console.warn('No GITHUB_TOKEN provided. Running unauthenticated with rate limit of 60 requests per hour.');
  console.warn('For higher rate limits, set the GITHUB_TOKEN environment variable:');
  console.warn('export GITHUB_TOKEN=your_github_token');
  console.warn('\nTo skip username lookup entirely and avoid search API calls:');
  console.warn('export SKIP_USERNAME_LOOKUP=true');
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

// Calculate date for 12 months ago (for commits)
const getTwelveMonthsAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 12);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

// Calculate date for 1 month ago (for interactions)
const getOneMonthAgo = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 12);
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

const commitsStartDate = getTwelveMonthsAgo();
const interactionsStartDate = getOneMonthAgo();

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
  console.log(`Collecting commit statistics for ${ORG} organization since ${commitsStartDate} (last 12 months)...`);
  console.log(`Collecting interaction statistics for ${ORG} organization since ${interactionsStartDate} (last 1 month)...`);
  
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
      totalInteractions: 0,
      authors: {},
      interactions: {
        discussions: 0,
        issues: 0,
        pullRequests: 0
      }
    };
  });
  
  // Also track "Other" for unmatched emails
  orgStats['Other'] = {
    name: 'Other',
    totalCommits: 0,
    totalInteractions: 0,
    authors: {},
    interactions: {
      discussions: 0,
      issues: 0,
      pullRequests: 0
    }
  };
  
  // Process repositories and collect commit statistics
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
            commitCount: 0,
            interactionCount: 0,
            githubLogin: null // Will be populated later
          };
        }
        
        orgStats[authorOrg].authors[authorKey].commitCount++;
        orgStats[authorOrg].totalCommits++;
      }
    } catch (error) {
      console.error(`  Error processing repository ${repo.name}: ${error.message}`);
    }
  }
  
  // Cache GitHub usernames for all committers (optional)
  let githubUsernameCache = {};
  if (SKIP_USERNAME_LOOKUP) {
    console.log('\nSkipping GitHub username lookup (SKIP_USERNAME_LOOKUP=true)');
  } else {
    console.log('\nCaching GitHub usernames for all committers...');
    githubUsernameCache = await cacheGithubUsernames(orgStats);
    console.log(`Cached ${Object.keys(githubUsernameCache).length} GitHub usernames`);
    
    // Print all cached GitHub usernames
    if (Object.keys(githubUsernameCache).length > 0) {
      console.log('\n📋 Cached GitHub Usernames:');
      const sortedUsernames = Object.keys(githubUsernameCache).sort();
      sortedUsernames.forEach((username, index) => {
        const cache = githubUsernameCache[username];
        console.log(`  ${index + 1}. @${username} (${cache.orgName}: ${cache.authorKey})`);
      });
      console.log('');
    }
  }
  
  // Collect interactions from discussions, issues, and pull requests
  console.log('\nCollecting interactions from discussions, issues, and pull requests...');
  await collectInteractions(repos, orgStats, githubUsernameCache);
  
  // Print results grouped by organization
  console.log('\n======================================================');
  console.log(`COMMIT STATISTICS FOR THE LAST 12 MONTHS (since ${commitsStartDate})`);
  console.log(`INTERACTION STATISTICS FOR THE LAST 1 MONTH (since ${interactionsStartDate})`);
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
    
    console.log(`\n== ${org.name} ==`);
    console.log(`Total Commits: ${org.totalCommits}`);
    console.log(`Total Interactions: ${org.totalInteractions}`);
    console.log(`  - Discussions: ${org.interactions.discussions}`);
    console.log(`  - Issues: ${org.interactions.issues}`);
    console.log(`  - Pull Requests: ${org.interactions.pullRequests}`);
    console.log('\nAuthor Name <Email>: Commits | Interactions');
    console.log('-----------------------------------------------');
    
    // Sort authors by commit count
    const sortedAuthors = Object.values(org.authors)
      .sort((a, b) => b.commitCount - a.commitCount);
    
    // Print each author's stats
    sortedAuthors.forEach(author => {
      console.log(`${author.name} <${author.email}>: ${author.commitCount} | ${author.interactionCount || 0}`);
    });
    
    console.log(`\nTotal authors in ${org.name}: ${sortedAuthors.length}`);
  }
  
  // Print overall summary
  const totalCommits = sortedOrgs.reduce((sum, org) => sum + org.totalCommits, 0);
  const totalInteractions = sortedOrgs.reduce((sum, org) => sum + org.totalInteractions, 0);
  const totalAuthors = sortedOrgs.reduce((sum, org) => sum + Object.keys(org.authors).length, 0);
  
  console.log('\n======================================================');
  console.log('SUMMARY');
  console.log('======================================================');
  console.log(`Total organizations: ${sortedOrgs.length}`);
  console.log(`Total authors: ${totalAuthors}`);
  console.log(`Total commits: ${totalCommits}`);
  console.log(`Total interactions: ${totalInteractions}`);
  
  const totalDiscussions = sortedOrgs.reduce((sum, org) => sum + org.interactions.discussions, 0);
  const totalIssues = sortedOrgs.reduce((sum, org) => sum + org.interactions.issues, 0);
  const totalPRs = sortedOrgs.reduce((sum, org) => sum + org.interactions.pullRequests, 0);
  console.log(`  - Discussions: ${totalDiscussions}`);
  console.log(`  - Issues: ${totalIssues}`);
  console.log(`  - Pull Requests: ${totalPRs}`);
  
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
      totalCommits: org.totalCommits,
      totalInteractions: org.totalInteractions,
      interactions: {
        discussions: org.interactions.discussions,
        issues: org.interactions.issues,
        pullRequests: org.interactions.pullRequests
      }
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
        since: `${commitsStartDate}T00:00:00Z`,  // 12 months ago for commits
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

// Cache GitHub usernames for all committers
async function cacheGithubUsernames(orgStats) {
  const usernameCache = {}; // Maps GitHub login -> {authorKey, orgName}
  const emailsToLookup = new Set();
  const unmatchedEmails = []; // Track emails that couldn't be matched to GitHub usernames
  
  // Load local user mappings
  const localMappings = readLocalUserMappings();
  
  // Collect unique emails from committers in TRACKED organizations only (exclude "Other")
  const trackedOrgNames = TRACKED_ORGS.map(org => org.name);
  
  for (const [orgName, orgData] of Object.entries(orgStats)) {
    // Only process explicitly tracked organizations, skip "Other"
    if (trackedOrgNames.includes(orgName) && Object.keys(orgData.authors).length > 0) {
      for (const [authorKey, authorData] of Object.entries(orgData.authors)) {
        if (authorData.email) {
          emailsToLookup.add(authorData.email);
        }
      }
    }
  }
  
  console.log(`  Looking up GitHub usernames for ${emailsToLookup.size} unique email addresses...`);
  console.log(`  Note: Using conservative rate limiting to avoid API quota exhaustion`);
  
  // Look up GitHub usernames with much smaller batches and longer delays to avoid rate limiting
  const emailBatches = Array.from(emailsToLookup).reduce((batches, email, index) => {
    const batchIndex = Math.floor(index / 3); // Much smaller batches: 3 emails per batch
    if (!batches[batchIndex]) batches[batchIndex] = [];
    batches[batchIndex].push(email);
    return batches;
  }, []);
  
  let processedEmails = 0;
  for (const emailBatch of emailBatches) {
    // Process emails sequentially within batch to avoid overwhelming the API
    for (const email of emailBatch) {
      try {
        // First check local mappings
        let githubLogin = localMappings[email];
        if (githubLogin) {
          console.log(`    📋 Local mapping: ${email} -> @${githubLogin}`);
        } else {
          // Fall back to GitHub API lookup
          githubLogin = await lookupGithubUsername(email);
        }
        
        if (githubLogin) {
          // Find the author in orgStats and update the cache
          for (const [orgName, orgData] of Object.entries(orgStats)) {
            for (const [authorKey, authorData] of Object.entries(orgData.authors)) {
              if (authorData.email === email) {
                usernameCache[githubLogin] = { authorKey, orgName };
                authorData.githubLogin = githubLogin;
                console.log(`    ✓ Found: ${email} -> @${githubLogin}`);
                break;
              }
            }
          }
        } else {
          console.log(`    ✗ No username found for: ${email}`);
          unmatchedEmails.push(email);
        }
      } catch (error) {
        console.warn(`    Skipping lookup for ${email}: ${error.message}`);
        unmatchedEmails.push(email);
      }
      
      processedEmails++;
      if (processedEmails % 10 === 0 || processedEmails === emailsToLookup.size) {
        console.log(`    Processed ${processedEmails}/${emailsToLookup.size} email lookups`);
      }
      
      // Longer delay between each lookup to respect rate limits
      if (processedEmails < emailsToLookup.size) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms between lookups
      }
    }
    
    // Additional delay between batches
    if (emailBatch !== emailBatches[emailBatches.length - 1]) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay between batches
    }
  }
  
  // Write unmatched emails to file
  if (unmatchedEmails.length > 0) {
    writeUnmatchedUsersToFile(unmatchedEmails);
    console.log(`\n📄 Created file with ${unmatchedEmails.length} unmatched email addresses: scripts/unmatched-users.txt`);
  } else {
    console.log('\n✅ All email addresses were successfully matched to GitHub usernames');
  }
  
  return usernameCache;
}

// Read local user mappings from file
function readLocalUserMappings() {
  const scriptDir = __dirname;
  const mappingsFile = path.join(scriptDir, 'local-user-mappings.txt');
  const mappings = {};
  
  try {
    if (fs.existsSync(mappingsFile)) {
      const content = fs.readFileSync(mappingsFile, 'utf8');
      const lines = content.split('\n');
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        // Skip comments and empty lines
        if (trimmedLine === '' || trimmedLine.startsWith('#')) {
          continue;
        }
        
        // Parse email = username format
        const match = trimmedLine.match(/^(.+?)\s*=\s*(.+?)$/);
        if (match) {
          const email = match[1].trim();
          const username = match[2].trim();
          mappings[email] = username;
        }
      }
      
      if (Object.keys(mappings).length > 0) {
        console.log(`📋 Loaded ${Object.keys(mappings).length} local user mappings`);
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read local mappings file: ${error.message}`);
  }
  
  return mappings;
}

// Write unmatched user emails to a file
function writeUnmatchedUsersToFile(unmatchedEmails) {
  const scriptDir = __dirname;
  const outputFile = path.join(scriptDir, 'unmatched-users.txt');
  
  // Create content with header and sorted unique emails
  const uniqueEmails = [...new Set(unmatchedEmails)].sort();
  const content = [
    '# Unmatched Email Addresses',
    '# This file contains email addresses from commit authors that could not be matched to GitHub usernames',
    `# Generated on: ${new Date().toISOString()}`,
    `# Total unmatched emails: ${uniqueEmails.length}`,
    '',
    ...uniqueEmails
  ].join('\n');
  
  fs.writeFileSync(outputFile, content, 'utf8');
}

// Look up GitHub username for a given email address
async function lookupGithubUsername(email) {
  try {
    // Skip noreply emails as we already have the username
    if (email.includes('@users.noreply.github.com')) {
      const username = email.split('@')[0];
      console.log(`    ✓ Extracted from noreply: ${email} -> @${username}`);
      return username;
    }
    
    // Add exponential backoff for search API rate limits
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        // Search for users by email
        const response = await octokit.search.users({
          q: `${email} in:email`,
          per_page: 1
        });
        
        if (response.data.total_count > 0) {
          return response.data.items[0].login;
        }
        break; // No results, exit retry loop
        
      } catch (searchError) {
        if (searchError.status === 403 && searchError.message.includes('rate limit')) {
          retryCount++;
          const waitTime = Math.min(60 * Math.pow(2, retryCount), 300); // Max 5 minutes
          console.warn(`    Rate limit hit for ${email}, waiting ${waitTime}s (attempt ${retryCount}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
        } else {
          throw searchError;
        }
      }
    }
  } catch (error) {
    // Ignore errors for individual lookups
    console.warn(`    Warning: Could not lookup username for ${email}: ${error.message}`);
  }
  return null;
}

// Collect interactions from discussions, issues, and pull requests
async function collectInteractions(repos, orgStats, githubUsernameCache) {
  for (const repo of repos) {
    console.log(`  Processing interactions for repository: ${repo.name}`);
    
    try {
      // Collect discussions
      const discussions = await getDiscussions(repo.name);
      console.log(`    Found ${discussions.length} discussions`);
      
      // Process discussion messages in batches
      if (discussions.length > 0) {
        await processDiscussionsBatch(repo.name, discussions, orgStats, githubUsernameCache);
      }
      
      // Collect issues (bug reports) - simplified approach
      const issues = await getIssues(repo.name);
      console.log(`    Found ${issues.length} issues, processing simplified...`);
      
      // Process issues in batches to avoid hanging
      await processIssuesBatch(repo.name, issues, orgStats, githubUsernameCache);
      
      // Collect pull requests - simplified approach
      const pullRequests = await getPullRequests(repo.name);
      console.log(`    Found ${pullRequests.length} pull requests, processing simplified...`);
      
      // Process PRs in batches to avoid hanging
      await processPullRequestsBatch(repo.name, pullRequests, orgStats, githubUsernameCache);
      
    } catch (error) {
      console.error(`    Error processing interactions for ${repo.name}: ${error.message}`);
    }
  }
}

// Get discussions for a repository
async function getDiscussions(repoName) {
  const discussions = [];
  let hasNextPage = true;
  let cursor = null;
  
  while (hasNextPage) {
    try {
      const query = `
        query($owner: String!, $repo: String!, $cursor: String) {
          repository(owner: $owner, name: $repo) {
            discussions(first: 100, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                number
                createdAt
                author {
                  login
                  ... on User {
                    email
                  }
                }
                comments(first: 1) {
                  totalCount
                }
              }
            }
          }
        }
      `;
      
      const response = await octokit.graphql(query, {
        owner: ORG,
        repo: repoName,
        cursor: cursor
      });
      
      const discussionData = response.repository.discussions;
      
      // Filter discussions from the last 1 month
      const filteredDiscussions = discussionData.nodes.filter(discussion => {
        const createdDate = new Date(discussion.createdAt);
        const oneMonthAgo = new Date(interactionsStartDate);
        return createdDate >= oneMonthAgo;
      });
      
      discussions.push(...filteredDiscussions);
      
      hasNextPage = discussionData.pageInfo.hasNextPage;
      cursor = discussionData.pageInfo.endCursor;
      
    } catch (error) {
      if (error.message.includes('not have Discussions enabled')) {
        console.log(`    Discussions not enabled for ${repoName}`);
        break;
      }
      throw error;
    }
  }
  
  return discussions;
}

// Get issues for a repository
async function getIssues(repoName) {
  const issues = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    try {
      const response = await octokit.issues.listForRepo({
        owner: ORG,
        repo: repoName,
        state: 'all',
        since: `${interactionsStartDate}T00:00:00Z`,
        per_page: perPage,
        page: page
      });
      
      if (response.data.length === 0) break;
      
      // Filter out pull requests (GitHub API includes PRs in issues)
      const actualIssues = response.data.filter(issue => !issue.pull_request);
      
      issues.push(...actualIssues);
      page++;
    } catch (error) {
      throw error;
    }
  }
  
  return issues;
}

// Get pull requests for a repository
async function getPullRequests(repoName) {
  const pullRequests = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    try {
      const response = await octokit.pulls.list({
        owner: ORG,
        repo: repoName,
        state: 'all',
        per_page: perPage,
        page: page
      });
      
      if (response.data.length === 0) break;
      
      // Filter PRs from the last 1 month
      const filteredPRs = response.data.filter(pr => {
        const createdDate = new Date(pr.created_at);
        const oneMonthAgo = new Date(interactionsStartDate);
        return createdDate >= oneMonthAgo;
      });
      
      pullRequests.push(...filteredPRs);
      page++;
    } catch (error) {
      throw error;
    }
  }
  
  return pullRequests;
}

// Process discussions with efficient GraphQL batching
async function processDiscussionsBatch(repoName, discussions, orgStats, githubUsernameCache) {
  console.log(`    Processing ${discussions.length} discussions with comments...`);
  
  // Process discussions in smaller batches using a single GraphQL query per batch
  const batchSize = 10; // Much smaller batches
  let processedCount = 0;
  
  for (let i = 0; i < discussions.length; i += batchSize) {
    const batch = discussions.slice(i, i + batchSize);
    
    try {
      await processDiscussionBatchWithComments(repoName, batch, orgStats, githubUsernameCache);
      processedCount += batch.length;
      
      if (processedCount % 50 === 0 || processedCount === discussions.length) {
        console.log(`      Processed ${processedCount}/${discussions.length} discussions`);
      }
      
      // Small delay between batches to avoid overwhelming the API
      if (i + batchSize < discussions.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.warn(`      Warning: Batch ${i}-${i+batch.length} failed: ${error.message}`);
      // Still count the original posts even if comments fail
      for (const discussion of batch) {
        if (discussion.author) {
          processInteractionAuthor(discussion.author, orgStats, 'discussions', githubUsernameCache);
        }
      }
      processedCount += batch.length;
    }
  }
  
  console.log(`    Completed processing ${discussions.length} discussions with comments`);
}

// Process a batch of discussions with their comments using efficient GraphQL
async function processDiscussionBatchWithComments(repoName, discussionBatch, orgStats, githubUsernameCache) {
  // Build a GraphQL query that fetches multiple discussions at once
  const discussionQueries = discussionBatch.map((discussion, index) => `
    discussion${index}: discussion(number: ${discussion.number}) {
      author {
        login
        ... on User {
          email
        }
      }
      createdAt
      comments(first: 20) {
        nodes {
          author {
            login
            ... on User {
              email
            }
          }
          createdAt
        }
      }
    }`).join('');
  
  const query = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        ${discussionQueries}
      }
    }
  `;
  
  try {
    const response = await octokit.graphql(query, {
      owner: ORG,
      repo: repoName
    });
    
    // Process each discussion in the response
    for (let i = 0; i < discussionBatch.length; i++) {
      const discussionKey = `discussion${i}`;
      const discussionData = response.repository[discussionKey];
      
      if (!discussionData) continue;
      
      // Count the original discussion post
      if (discussionData.author) {
        const createdDate = new Date(discussionData.createdAt);
        const oneMonthAgo = new Date(interactionsStartDate);
        if (createdDate >= oneMonthAgo) {
          processInteractionAuthor(discussionData.author, orgStats, 'discussions', githubUsernameCache);
        }
      }
      
      // Count comments within the date range
      for (const comment of discussionData.comments.nodes) {
        if (!comment.author) continue;
        
        const createdDate = new Date(comment.createdAt);
        const oneMonthAgo = new Date(interactionsStartDate);
        if (createdDate >= oneMonthAgo) {
          processInteractionAuthor(comment.author, orgStats, 'discussions', githubUsernameCache);
        }
      }
    }
  } catch (error) {
    // If the batch query fails, fall back to counting just the original posts
    console.warn(`      Batch GraphQL query failed, counting original posts only: ${error.message}`);
    for (const discussion of discussionBatch) {
      if (discussion.author) {
        processInteractionAuthor(discussion.author, orgStats, 'discussions', githubUsernameCache);
      }
    }
  }
}

// Legacy function - no longer used but kept for compatibility
async function processDiscussionComments(repoName, discussionNumber, orgStats) {
  return;
}

// Helper function to process interaction authors using the GitHub username cache
function processInteractionAuthor(author, orgStats, interactionType, githubUsernameCache) {
  const authorLogin = author.login;
  
  // First, try to find the author in our cache
  if (githubUsernameCache[authorLogin]) {
    const cachedInfo = githubUsernameCache[authorLogin];
    const orgName = cachedInfo.orgName;
    const authorKey = cachedInfo.authorKey;
    
    // Add interaction to the existing author
    if (orgStats[orgName] && orgStats[orgName].authors[authorKey]) {
      orgStats[orgName].authors[authorKey].interactionCount++;
      orgStats[orgName].totalInteractions++;
      orgStats[orgName].interactions[interactionType]++;
      return;
    }
  }
  
  // If not found in cache, fall back to email-based matching
  const authorEmail = author.email || `${authorLogin}@users.noreply.github.com`;
  const authorOrg = getAuthorOrg(authorEmail);
  
  if (!orgStats[authorOrg]) return;
  
  const authorKey = `${authorLogin} <${authorEmail}>`;
  
  if (!orgStats[authorOrg].authors[authorKey]) {
    orgStats[authorOrg].authors[authorKey] = {
      name: authorLogin,
      email: authorEmail,
      commitCount: 0,
      interactionCount: 0,
      githubLogin: authorLogin
    };
  }
  
  orgStats[authorOrg].authors[authorKey].interactionCount++;
  orgStats[authorOrg].totalInteractions++;
  orgStats[authorOrg].interactions[interactionType]++;
}

// Process all issues in batches with efficient approach
async function processIssuesBatch(repoName, issues, orgStats, githubUsernameCache) {
  console.log(`    Processing all ${issues.length} issues...`);
  
  let processedCount = 0;
  const batchSize = 20; // Process 20 issues at a time
  
  for (let i = 0; i < issues.length; i += batchSize) {
    const batch = issues.slice(i, i + batchSize);
    
    // Process issues in parallel within each batch
    const batchPromises = batch.map(issue => processIndividualIssue(repoName, issue, orgStats, githubUsernameCache));
    
    try {
      await Promise.allSettled(batchPromises); // Use allSettled to continue even if some fail
      processedCount += batch.length;
      
      if (processedCount % 100 === 0 || processedCount === issues.length) {
        console.log(`      Processed ${processedCount}/${issues.length} issues`);
      }
      
      // Small delay between batches to avoid rate limiting
      if (i + batchSize < issues.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.warn(`      Warning: Batch processing failed: ${error.message}`);
      processedCount += batch.length;
    }
  }
  
  console.log(`    Completed processing all ${issues.length} issues`);
}

// Process individual issue with timeout protection
async function processIndividualIssue(repoName, issue, orgStats, githubUsernameCache) {
  return new Promise(async (resolve, reject) => {
    // Set a reasonable timeout for each issue
    const timeout = setTimeout(() => {
      resolve(); // Resolve instead of reject to continue processing
    }, 5000); // 5 second timeout per issue
    
    try {
      // Count the issue author
      if (issue.user) {
        const author = {
          login: issue.user.login,
          email: null
        };
        processInteractionAuthor(author, orgStats, 'issues', githubUsernameCache);
      }
      
      // Get comments with reasonable limit
      const response = await octokit.issues.listComments({
        owner: ORG,
        repo: repoName,
        issue_number: issue.number,
        since: `${interactionsStartDate}T00:00:00Z`,
        per_page: 15 // Reasonable sample size
      });
      
      for (const comment of response.data) {
        if (comment.user) {
          const author = {
            login: comment.user.login,
            email: null
          };
          processInteractionAuthor(author, orgStats, 'issues', githubUsernameCache);
        }
      }
      
      clearTimeout(timeout);
      resolve();
    } catch (error) {
      clearTimeout(timeout);
      // Don't reject - just resolve to continue processing other issues
      resolve();
    }
  });
}

// Legacy function kept for compatibility
async function processIssueComments(repoName, issueNumber, orgStats) {
  // This is now handled in processIssuesBatch
  return;
}

// Process all pull requests in batches
async function processPullRequestsBatch(repoName, pullRequests, orgStats, githubUsernameCache) {
  console.log(`    Processing all ${pullRequests.length} pull requests...`);
  
  let processedCount = 0;
  const batchSize = 15; // Process 15 PRs at a time (smaller batch due to more API calls per PR)
  
  for (let i = 0; i < pullRequests.length; i += batchSize) {
    const batch = pullRequests.slice(i, i + batchSize);
    
    // Process PRs in parallel within each batch
    const batchPromises = batch.map(pr => processIndividualPullRequest(repoName, pr, orgStats, githubUsernameCache));
    
    try {
      await Promise.allSettled(batchPromises); // Use allSettled to continue even if some fail
      processedCount += batch.length;
      
      if (processedCount % 50 === 0 || processedCount === pullRequests.length) {
        console.log(`      Processed ${processedCount}/${pullRequests.length} pull requests`);
      }
      
      // Slightly longer delay for PRs since they make more API calls
      if (i + batchSize < pullRequests.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.warn(`      Warning: PR batch processing failed: ${error.message}`);
      processedCount += batch.length;
    }
  }
  
  console.log(`    Completed processing all ${pullRequests.length} pull requests`);
}

// Process individual pull request with timeout protection
async function processIndividualPullRequest(repoName, pr, orgStats, githubUsernameCache) {
  return new Promise(async (resolve, reject) => {
    // Set a reasonable timeout for each PR
    const timeout = setTimeout(() => {
      resolve(); // Resolve instead of reject to continue processing
    }, 8000); // 8 second timeout per PR (longer due to multiple API calls)
    
    try {
      // Count the PR author
      if (pr.user) {
        const author = {
          login: pr.user.login,
          email: null
        };
        processInteractionAuthor(author, orgStats, 'pullRequests', githubUsernameCache);
      }
      
      // Get comments with reasonable limits
      const [commentsResponse, reviewCommentsResponse] = await Promise.all([
        octokit.issues.listComments({
          owner: ORG,
          repo: repoName,
          issue_number: pr.number,
          since: `${interactionsStartDate}T00:00:00Z`,
          per_page: 10 // Reasonable sample
        }),
        octokit.pulls.listReviewComments({
          owner: ORG,
          repo: repoName,
          pull_number: pr.number,
          since: `${interactionsStartDate}T00:00:00Z`,
          per_page: 10 // Reasonable sample
        })
      ]);
      
      // Process comments
      [...commentsResponse.data, ...reviewCommentsResponse.data].forEach(comment => {
        if (comment.user) {
          const author = {
            login: comment.user.login,
            email: null
          };
          processInteractionAuthor(author, orgStats, 'pullRequests', githubUsernameCache);
        }
      });
      
      clearTimeout(timeout);
      resolve();
    } catch (error) {
      clearTimeout(timeout);
      // Don't reject - just resolve to continue processing other PRs
      resolve();
    }
  });
}

// Legacy function kept for compatibility
async function processPullRequestComments(repoName, prNumber, orgStats) {
  // This is now handled in processPullRequestsBatch
  return;
}

// Run the script
collectCommitStats().catch(error => {
  console.error('Error executing script:', error);
  process.exit(1);
});