---
name: theia-website-blog-sync
description: Syncs new EclipseSource blog posts into the theia-website. Fetches https://eclipsesource.com/blogs/, determines which posts are not yet listed, routes each post to the correct file (Releases.js for monthly and community releases, Resources.js for everything else), inserts entries in the right category and format, then commits the result on a feature branch. Use when asked to check the EclipseSource blog for new articles, update the website resources/releases lists, or add a specific blog post to the website.
---

# Sync EclipseSource Blog Posts into theia-website

## Overview

New EclipseSource blog posts must be added to one of two curated lists:

| File | Holds |
|---|---|
| `src/components/Releases.js` | Release announcements only (monthly + community releases) |
| `src/components/Resources.js` | All other thematic content (articles, videos, talks) |

**The single most important rule: release announcements never go in `Resources.js`.**
Routing a release into `Resources.js` is the most common mistake. Check the routing
table below before editing anything.

## Step 1: Fetch the blog index

Fetch `https://eclipsesource.com/blogs/`. Page 1 holds the ~6 newest posts. If the
newest already-listed post is older than the last entry on page 1, continue with
`https://eclipsesource.com/blogs/page/2/`, `/page/3/`, etc. until you reach posts
that are already listed.

Post URLs follow `https://eclipsesource.com/blogs/YYYY/MM/DD/slug/`, so the URL
itself encodes the publication date. Use it to sort and to find the cutoff.

## Step 2: Establish the cutoff

Read both target files and find the newest post already referenced in each. Anything
newer is a candidate. Build an explicit table of candidates (title, date, target file)
and confirm each is genuinely absent by searching for its URL — do not rely on the
title alone.

## Step 3: Route each post

| Post pattern | Destination |
|---|---|
| `Eclipse Theia <X.YZ> Release: News and Noteworthy` | `Releases.js` → `monthlyReleases` |
| `The Eclipse Theia Community Release <YYYY-MM>` | `Releases.js` → `communityReleases` (update existing entry) |
| Anything else (features, tutorials, adopter stories, AI topics, opinion, TheiaCon talks) | `Resources.js` → best-fitting category |

If a post genuinely does not fit any existing theme, leave it out and say so in your
summary rather than forcing it into a loosely-related category.

## Step 4a: Monthly releases (`Releases.js`)

Prepend to the `monthlyReleases` array, keeping strict newest-first order:

```js
const monthlyReleases = [
    {
        title: 'Eclipse Theia 1.75 Release: News and Noteworthy',
        url: 'https://eclipsesource.com/blogs/2026/09/10/eclipse-theia-1-75-release-news-and-noteworthy/',
    },
    // ...older entries
]
```

Only `title` and `url`. Note the trailing comma after `url` matches existing style.

## Step 4b: Community releases (`Releases.js`)

A community release is usually **already present as a `- planned` entry** — update it
in place instead of adding a new object:

1. Change the `name` suffix from `- planned` to `- published`.
2. Set `announcementurl` to the blog post URL.
3. Correct `releaseanouncement` to the *actual* publication date from the URL
   (the planned date is often off by a few days).
4. Fill `npmVersion` / `npmUrl` if still empty and the version is known.

```js
{
    name: 'Theia 1.74.x (2026-08) - published',
    releasedate: 'August 27th, 2026',
    releasecandidatedate: 'July 30th, 2026',
    technologiesin: 'September 7th, 2026',
    releaseanouncement: 'September 15th, 2026',
    announcementurl: 'https://eclipsesource.com/blogs/2026/09/15/the-eclipse-theia-community-release-2026-08/',
    npmVersion: '1.74.1',
    npmUrl: 'https://www.npmjs.com/package/@theia/core/v/1.74.1',
    frameworks: [ /* leave untouched unless told otherwise */ ]
}
```

Keep `frameworks` / compatible-technology versions as they are. Those are maintained
by the individual projects via their own PRs and are not part of this task.

If no matching entry exists, add a new one at the top of `communityReleases` and keep
the array newest-first. Mention in your summary if the next cycle's `- planned` entry
appears to be missing rather than inventing dates for it.

## Step 5: Resources (`Resources.js`)

Entries live in the `categories` array. Current categories:

- `News around Eclipse Theia`
- `TheiaCon Talk Recordings`
- `Introductions to Eclipse Theia`
- `Eclipse Theia Adopter Stories`
- `Technical topics about Eclipse Theia`
- `Topics related to Eclipse Theia`
- `Theia AI and AI-powered Theia IDE`
- `AI Coding`

Prefer an existing category. Only propose a new one if several posts share a clearly
new theme, and flag it to the user.

Entry shape — insert at the **top** of the category (newest-first):

```js
{
    title: 'Eclipse Enclave: An Open Source Sandbox for AI Coding Agents',
    url: 'https://eclipsesource.com/blogs/2026/09/08/eclipse-enclave-sandbox-for-ai-coding-agents/',
    type: 'article'
},
```

### Rules

- `type` is `'article'` or `'video'`. Use `'video'` when the post is built around a
  video or talk recording, `'article'` for written content. Many EclipseSource posts
  are video-first — if the index excerpt is ambiguous, fetch the post and look for an
  embedded video before guessing.
- Escape apostrophes in single-quoted titles: `'It\'s Released: ...'`.
- Reproduce the post title exactly as published.
- **Cross-listing is allowed** when a post genuinely belongs to two categories
  (several posts appear in both `Theia AI ...` and `AI Coding`). Never duplicate a URL
  *within the same* category.

## Step 6: Verify

- Check diagnostics on every edited file; the arrays are plain JS and a stray comma
  or unescaped quote breaks the site build.
- Confirm each new URL exactly matches the blog index (no typos, keep the trailing slash).
- Re-read the edited regions to confirm ordering and that nothing was clobbered.

## Step 7: Commit

1. Create a feature branch, e.g. `git checkout -b update-blog-resources`.
2. Stage **only** the files you touched — never `git add .`.
3. Commit with a concise, imperative message, e.g.
   `Add latest EclipseSource blog articles and releases`.
4. **Do not push and do not open a PR unless explicitly asked.**

## Step 8: Report

Summarize as a short table: post, date, destination (file + category), and `type`.
Explicitly list any post you deliberately skipped **and why** — this is how the user
catches routing mistakes, so never silently drop a candidate.
