#!/usr/bin/env python3
"""
Scan stimuli/shapes/ and stimuli/textures/ and emit a JS file:

export const stimulusManifest = {
  shape_categories: [...],
  texture_categories: [...],
  shapes: { <shapeCat>: [<file>, ...], ... },
  textures: { <texCat>: [<file>, ...], ... }
};
"""

from pathlib import Path
import argparse
import json

IMG_EXTS = {".png", ".jpg", ".jpeg", ".bmp", ".gif", ".webp"}  # adjust if needed

def list_categories(root: Path) -> list[str]:
    return sorted([p.name for p in root.iterdir() if p.is_dir()])

def list_images(cat_dir: Path) -> list[str]:
    return sorted([p.name for p in cat_dir.iterdir()
                   if p.is_file() and p.suffix.lower() in IMG_EXTS])

def build_manifest(root: Path, shapes_sub: str, textures_sub: str) -> dict:
    shapes_dir = root / shapes_sub
    textures_dir = root / textures_sub

    if not shapes_dir.is_dir():
        raise SystemExit(f"Missing folder: {shapes_dir}")
    if not textures_dir.is_dir():
        raise SystemExit(f"Missing folder: {textures_dir}")

    shape_categories = list_categories(shapes_dir)
    texture_categories = list_categories(textures_dir)

    shapes = {cat: list_images(shapes_dir / cat) for cat in shape_categories}
    textures = {cat: list_images(textures_dir / cat) for cat in texture_categories}

    return {
        "shape_categories": shape_categories,
        "texture_categories": texture_categories,
        "shapes": shapes,
        "textures": textures,
    }

def write_js(manifest: dict, out_js: Path) -> None:
    out_js.parent.mkdir(parents=True, exist_ok=True)
    js = "export const stimulusManifest = " + json.dumps(manifest, indent=2) + ";\n"
    out_js.write_text(js, encoding="utf-8")
    print(f"[ok] wrote {out_js}")

def main():
    ap = argparse.ArgumentParser(description="Emit stimulus_manifest.js from folder structure.")
    ap.add_argument("--root", default="stimuli", help="Root containing shapes/ and textures/ (default: stimuli)")
    ap.add_argument("--shapes", default="shapes", help="Subfolder under root for shapes (default: shapes)")
    ap.add_argument("--textures", default="textures", help="Subfolder under root for textures (default: textures)")
    ap.add_argument("--out", default="js/stimulus_manifest.js", help="Output JS file (default: js/stimulus_manifest.js)")
    args = ap.parse_args()

    root = Path(args.root)
    manifest = build_manifest(root, args.shapes, args.textures)
    write_js(manifest, Path(args.out))

if __name__ == "__main__":
    main()
