#!/usr/bin/env python3
"""
Script to upscale/resize article thumbnails to 200x200 px.
Usage: python3 scripts/upscale-thumbnails.py [--dry-run]
"""

import os
import sys
from PIL import Image

THUMB_DIR = "static/files/article"
TARGET_SIZE = 200


def get_thumbnails_to_fix():
    """Find all thumbnails that need resizing."""
    to_fix = []

    for filename in os.listdir(THUMB_DIR):
        if not filename.endswith(".png"):
            continue

        path = os.path.join(THUMB_DIR, filename)
        try:
            with Image.open(path) as img:
                w, h = img.size
                if w != TARGET_SIZE or h != TARGET_SIZE:
                    to_fix.append((filename, w, h))
        except Exception as e:
            print(f"Error reading {filename}: {e}")

    return to_fix


def resize_thumbnail(filename, dry_run=False):
    """Resize a single thumbnail to 200x200."""
    path = os.path.join(THUMB_DIR, filename)

    try:
        with Image.open(path) as img:
            original_size = img.size
            original_mode = img.mode

            # Convert to RGBA if needed for transparency support
            if img.mode not in ('RGB', 'RGBA'):
                img = img.convert('RGBA')

            # Resize to 200x200 using LANCZOS for best quality
            resized = img.resize((TARGET_SIZE, TARGET_SIZE), Image.LANCZOS)

            if dry_run:
                print(f"  Would resize {filename}: {original_size[0]}x{original_size[1]} -> {TARGET_SIZE}x{TARGET_SIZE}")
                return True

            # Save with optimization
            resized.save(path, 'PNG', optimize=True)
            print(f"  Resized {filename}: {original_size[0]}x{original_size[1]} -> {TARGET_SIZE}x{TARGET_SIZE}")
            return True

    except Exception as e:
        print(f"  Error resizing {filename}: {e}")
        return False


def main():
    dry_run = "--dry-run" in sys.argv

    if dry_run:
        print("DRY RUN - no files will be modified\n")

    print(f"Scanning {THUMB_DIR}...\n")

    to_fix = get_thumbnails_to_fix()

    if not to_fix:
        print("All thumbnails are already 200x200!")
        return 0

    print(f"Found {len(to_fix)} thumbnails to resize:\n")

    # Group by size for summary
    from collections import Counter
    sizes = Counter((w, h) for _, w, h in to_fix)
    for (w, h), count in sizes.most_common():
        print(f"  {w}x{h}: {count} files")
    print()

    if not dry_run:
        confirm = input(f"Resize {len(to_fix)} files? [y/N] ")
        if confirm.lower() != 'y':
            print("Cancelled.")
            return 0
        print()

    success = 0
    failed = 0

    for filename, w, h in to_fix:
        if resize_thumbnail(filename, dry_run):
            success += 1
        else:
            failed += 1

    print(f"\nDone! Resized: {success}, Failed: {failed}")

    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
