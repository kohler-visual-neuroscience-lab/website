#!/usr/bin/env python3
"""
Crop and/or resize all images under a folder (recursively) and write them to a
mirrored output folder.

Order of operations is ALWAYS:
1) Crop (if requested)
2) Resize (if requested)
"""

from __future__ import annotations
import argparse
from pathlib import Path
from typing import Iterable, Tuple, Optional
from PIL import Image, UnidentifiedImageError

DEFAULT_EXTS = {".png", ".jpg", ".jpeg", ".bmp", ".tif", ".tiff", ".gif", ".webp"}

def iter_files(root: Path) -> Iterable[Path]:
    for p in root.rglob("*"):
        if p.is_file():
            yield p

def is_candidate(path: Path, accept_exts: set[str]) -> bool:
    return path.suffix.lower() in accept_exts

def crop_with_border(img: Image.Image, border: int) -> Image.Image:
    """Crop `border` pixels from each edge. Raises ValueError if image too small."""
    if border < 0:
        raise ValueError("Crop/border must be >= 0.")
    if border == 0:
        return img
    w, h = img.size
    if w <= 2 * border or h <= 2 * border:
        raise ValueError(f"Image {w}x{h} too small for border={border}.")
    left, upper, right, lower = border, border, w - border, h - border
    return img.crop((left, upper, right, lower))

def resize_longest(img: Image.Image, longest: int) -> Image.Image:
    """Resize so the longer side equals `longest`, preserving aspect ratio."""
    if longest <= 0:
        raise ValueError("resize-longest must be > 0.")
    w, h = img.size
    long_side = max(w, h)
    if long_side == longest:
        return img
    scale = longest / float(long_side)
    new_w = max(1, int(round(w * scale)))
    new_h = max(1, int(round(h * scale)))
    return img.resize((new_w, new_h), Image.LANCZOS)

def resize_exact(img: Image.Image, width: int, height: int) -> Image.Image:
    """Resize to exactly (width, height). May change aspect ratio (stretch)."""
    if width <= 0 or height <= 0:
        raise ValueError("resize-exact width/height must be > 0.")
    return img.resize((int(width), int(height)), Image.LANCZOS)

def save_image(img: Image.Image, dst_path: Path) -> None:
    dst_path.parent.mkdir(parents=True, exist_ok=True)
    exif_bytes = img.info.get("exif") if isinstance(img.info, dict) else None
    save_kwargs = {"exif": exif_bytes} if exif_bytes else {}
    try:
        img.save(dst_path, **save_kwargs)
    except OSError:
        # Fallback: convert to PNG (helps with some palette/animated formats)
        dst_path = dst_path.with_suffix(".png")
        img.convert("RGBA").save(dst_path)

def process_one(
    src: Path,
    dst: Path,
    crop: Optional[int],
    longest: Optional[int],
    exact_size: Optional[tuple[int, int]],
) -> None:
    with Image.open(src) as im:
        im.load()  # fully load to catch truncated files early

        # === ALWAYS CROP FIRST (if requested) ===
        if crop is not None:
            im = crop_with_border(im, crop)

        # === THEN RESIZE (if requested) ===
        # Mutually exclusive options handled by argparse group; prefer longest if given
        if longest is not None:
            im = resize_longest(im, longest)
        elif exact_size is not None:
            w, h = exact_size
            im = resize_exact(im, w, h)

        save_image(im, dst)

def process_tree(
    in_dir: Path,
    out_dir: Path,
    accept_exts: set[str],
    crop: Optional[int],
    longest: Optional[int],
    exact_size: Optional[tuple[int, int]],
) -> Tuple[int, int, int]:
    total = skipped = errors = 0
    for src in iter_files(in_dir):
        if not is_candidate(src, accept_exts):
            continue
        rel = src.relative_to(in_dir)
        dst = out_dir / rel
        total += 1
        try:
            process_one(src, dst, crop=crop, longest=longest, exact_size=exact_size)
        except UnidentifiedImageError:
            skipped += 1
            print(f"[skip] Not an image or unsupported: {src}")
        except ValueError as ve:
            skipped += 1
            print(f"[skip] {src}: {ve}")
        except Exception as e:
            errors += 1
            print(f"[err ] {src}: {e}")
    return total, skipped, errors

def main():
    ap = argparse.ArgumentParser(
        description="Optionally crop and/or resize all images in a folder tree, mirroring structure to a new folder."
    )
    ap.add_argument("input_dir", type=Path, help="Input folder (processed recursively).")
    ap.add_argument("--out", type=Path, default=None, help="Output folder (default: input_dir + '_new').")

    # Optional ops (crop happens before any resize)
    ap.add_argument("--crop", type=int, default=None, help="Pixels to remove from each edge (>=0).")
    group = ap.add_mutually_exclusive_group()
    group.add_argument("--resize-longest", type=int, default=None,
                       help="Resize so the longer side equals this value (preserve aspect).")
    group.add_argument("--resize-exact", nargs=2, type=int, metavar=("WIDTH", "HEIGHT"), default=None,
                       help="Resize to exactly WIDTH HEIGHT (may stretch).")

    ap.add_argument(
        "--exts",
        nargs="*",
        default=sorted(DEFAULT_EXTS),
        help=f"File extensions to include (default: {sorted(DEFAULT_EXTS)})."
    )
    args = ap.parse_args()

    in_dir: Path = args.input_dir
    out_dir: Path = args.out if args.out else in_dir.with_name(in_dir.name + "_new")
    accept_exts = {e.lower() if e.startswith(".") else "." + e.lower() for e in args.exts}

    if not in_dir.exists() or not in_dir.is_dir():
        raise SystemExit(f"Input folder does not exist or is not a directory: {in_dir}")

    crop = args.crop if args.crop is not None else None
    if crop is not None and crop < 0:
        raise SystemExit("--crop must be >= 0.")
    longest = args.resize_longest if args.resize_longest is not None else None
    exact = tuple(args.resize_exact) if args.resize_exact is not None else None
    if longest is not None and longest <= 0:
        raise SystemExit("--resize-longest must be > 0.")
    if exact is not None and (exact[0] <= 0 or exact[1] <= 0):
        raise SystemExit("--resize-exact WIDTH HEIGHT must be > 0.")

    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"[info] Input : {in_dir}")
    print(f"[info] Output: {out_dir}")
    print(f"[info] Exts  : {sorted(accept_exts)}")
    print(f"[info] Ops   : crop={crop}  resize_longest={longest}  resize_exact={exact}")

    total, skipped, errors = process_tree(
        in_dir=in_dir,
        out_dir=out_dir,
        accept_exts=accept_exts,
        crop=crop,
        longest=longest,
        exact_size=exact
    )

    done = total - skipped - errors
    print(f"\nDone. Processed: {done} | Skipped: {skipped} | Errors: {errors}")

if __name__ == "__main__":
    main()