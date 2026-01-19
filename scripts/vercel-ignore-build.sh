#!/bin/bash

# Vercel Ignored Build Step
# Returns exit 0 to SKIP build, exit 1 to PROCEED with build
# https://vercel.com/docs/concepts/projects/overview#ignored-build-step

echo "Checking if build is needed..."

# Always build on main branch for initial deployments
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "master" ]]; then
    # Check what files changed in the last commit
    CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null || echo "")

    if [ -z "$CHANGED_FILES" ]; then
        echo "Could not determine changed files, proceeding with build"
        exit 1
    fi

    echo "Changed files:"
    echo "$CHANGED_FILES"

    # Check if ONLY content files changed
    NON_CONTENT_CHANGES=$(echo "$CHANGED_FILES" | grep -v "^content/" | grep -v "^static/files/article/" || true)

    if [ -z "$NON_CONTENT_CHANGES" ]; then
        echo "Only content files changed - skipping build (ISR will handle updates)"
        exit 0
    else
        echo "Code or config files changed - proceeding with build"
        echo "Non-content changes: $NON_CONTENT_CHANGES"
        exit 1
    fi
fi

# Always build preview/feature branches
echo "Preview branch - proceeding with build"
exit 1
