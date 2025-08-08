# Development Scripts

This directory contains development and utility scripts for the project.

## GitHub Commit Statistics

The `github-commit-stats.js` script collects commit statistics from all repositories in the eclipse-theia GitHub organization for the last 12 months. It provides a summary of the total number of commits per author, grouped by organization, including their email addresses. The script also generates a JSON file with simplified statistics.

### Prerequisites

Before running the script, you'll need:

1. Node.js installed on your system
2. (Optional but recommended) A GitHub Personal Access Token

### Setting up the GitHub Token (Optional)

The script can run without authentication, but GitHub API has a rate limit of only 60 requests per hour for unauthenticated requests. For organizations with many repositories, this limit may be insufficient.

For better performance, create a personal access token at https://github.com/settings/tokens with at least the `repo` and `read:org` scopes.

Set this token as an environment variable:

```bash
export GITHUB_TOKEN=your_github_token
```

### Running the Script

Option 1: Using npm script (recommended):

```bash
npm run github-stats
```

Option 2: Running the script directly:

```bash
node scripts/github-commit-stats.js
```

### Configuring Tracked Organizations

The script groups commits by organization based on email domains and specific email addresses. You can easily modify the list of tracked organizations in the script by editing the `TRACKED_ORGS` array:

```javascript
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
    domain: 'typfox.io',
    specificEmails: []
  },
  {
    name: 'Individual Contributors',
    type: 'individual',
    domain: null,
    specificEmails: ['tsmaeder@users.noreply.github.com']
  }
  // Add more organizations as needed
];
```

To add a new organization:
1. For organizations with a domain: add an entry with a `name`, `type`, and `domain` property
2. For specific emails: add an entry with a `name`, `type`, and populate the `specificEmails` array
3. You can combine both approaches by adding specific emails to a domain group
4. The `type` property is used to categorize the organization (e.g., 'company', 'individual', etc.)

### Output

The script will output:

1. Statistics grouped by organization
2. For each organization:
   - Total number of commits
   - List of authors with their commit counts
   - Email addresses for each author
3. An overall summary with totals across all tracked organizations
4. A JSON file in the `utils/org-commit-stats.json` containing simplified statistics (name, type, and total commits)

Example output:

```
== EclipseSource (185 total commits) ==
Author Name <Email>: Commit Count
---------------------------------------
Jane Doe <jane.doe@eclipsesource.com>: 92
John Smith <john.smith@eclipsesource.com>: 93

Total authors in EclipseSource: 2

== TypeFox (253 total commits) ==
Author Name <Email>: Commit Count
---------------------------------------
Alex Johnson <alex.johnson@typfox.io>: 153
Sam Lee <sam.lee@typfox.io>: 100

Total authors in TypeFox: 2

== Individual Contributors (42 total commits) ==
Author Name <Email>: Commit Count
---------------------------------------
Thomas Maeder <tsmaeder@users.noreply.github.com>: 42

Total authors in Individual Contributors: 1

======================================================
SUMMARY
======================================================
Total organizations: 3
Total authors: 5
Total commits: 480

JSON statistics written to: /path/to/workspace/utils/org-commit-stats.json
```

### Troubleshooting

- If you encounter rate limiting issues, the script will automatically retry a few times.
- Without a GitHub token, you're limited to 60 requests per hour, which may not be enough for larger organizations.
- For repositories that are empty or in conflict, the script will log a warning and continue with the next repository.
- If you need to analyze a different time period, you can modify the `getTwelveMonthsAgo()` function in the script.