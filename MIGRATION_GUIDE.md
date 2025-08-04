# Database to Markdown Migration Guide

This guide explains how to migrate your blog from a MySQL database to markdown files.

## What Changed

Your blog has been migrated from using a MySQL database to using markdown files for content storage. This provides several benefits:

- **Version Control**: Blog posts are now stored as files that can be tracked in Git
- **Portability**: No database dependency, easier to deploy and backup
- **Performance**: Faster page loads as no database queries are needed
- **Editing**: Posts can be edited directly in any text editor
- **Simplicity**: Reduced infrastructure complexity

## File Structure

Posts are now stored in the `posts/` directory as markdown files:

```
posts/
├── my-first-post.md
├── another-post.md
└── sample-post.md
```

## Frontmatter Format

Each markdown file uses YAML frontmatter for metadata:

```markdown
---
title: 'Your Post Title'
headline: 'A compelling headline'
description: 'Brief description for SEO'
date: '2024-01-15'
last_modification: '2024-01-15'
status: 1
tags: ['web', 'development', 'markdown']
---

# Your Post Content

Your markdown content goes here...
```

## Migration Steps

### 1. Export Existing Data

Run the export script to convert your database posts to markdown:

```bash
# Set your database URL
export DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# Run the export script
node scripts/export-db-to-markdown.js
```

This will create markdown files in the `posts/` directory with all your existing content.

### 2. Review Exported Files

Check the exported markdown files in the `posts/` directory. The script performs basic HTML-to-markdown conversion, but you may want to manually review and improve the formatting.

### 3. Test the New System

Start your development server and verify everything works:

```bash
pnpm dev
```

### 4. Remove Database Dependencies

Once you've verified everything works correctly, you can:

1. Remove the MySQL database connection
2. Delete the `src/lib/server/database.ts` file if no longer needed
3. Remove MySQL environment variables from your deployment

## Content Management

### Adding New Posts

Create a new `.md` file in the `posts/` directory with proper frontmatter:

```markdown
---
title: 'New Post Title'
headline: 'Your headline here'
description: 'SEO description'
date: '2024-01-20'
status: 1  # 1 = published, 0 = draft
tags: ['tag1', 'tag2']
---

# Your Content Here

Write your post content in markdown format.
```

### Editing Posts

Simply edit the markdown files directly. Changes will be reflected immediately after server restart or in development mode with hot reloading.

### Managing Tags

Tags are managed through the `tags` array in the frontmatter. The system automatically:

- Generates tag pages for all used tags
- Creates tag relationships and counts
- Provides related posts functionality

### Post Status

The `status` field controls post visibility:

- **`status: 1`** = Published (visible on website)
- **`status: 0`** = Draft (hidden from public, only visible in admin/development)

To create draft posts, set `status: 0` in the frontmatter. Drafts won't appear in public post listings but can still be accessed directly by URL if needed.

## Important Notes

- **File Names**: The filename (without `.md`) becomes the URL slug
- **Backup**: Keep backups of your database until you're confident the migration is complete
- **Images**: Update image paths if needed to point to your static files
- **Admin Interface**: The database-based admin interface for creating/editing posts is no longer functional. Posts must be managed as files.

## Rollback Plan

If you need to rollback to the database system:

1. Keep your database and its data
2. Revert the code changes in this commit
3. Restore the MySQL dependency in `package.json`
4. Update your environment variables

## Support

The markdown system supports all the same features as the database version:

- ✅ Posts and drafts
- ✅ Tags and tag pages
- ✅ Related posts
- ✅ Search functionality (Algolia)
- ✅ RSS feeds
- ✅ Word count calculation
- ✅ Reading time estimation
