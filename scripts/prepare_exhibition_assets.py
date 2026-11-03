import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "images"

EXHIBITION_IMAGES = [
    ("晨曦中的校园", "campus", "exhibition-campus-dawn.jpg"),
    ("繁花中的中珠音乐厅", "campus", "exhibition-concert-hall.jpg"),
    ("康园岁影", "campus", "exhibition-kangyuan.jpg"),
    ("海蚀巨壁", "landscape", "exhibition-sea-cliffs.jpg"),
    ("坚尼地城的城市切片", "landscape", "exhibition-kennedy-town.jpg"),
    ("马会站", "landscape", "exhibition-racecourse-station.jpg"),
    ("烟花节中的澳门塔", "landscape", "exhibition-macau-fireworks.jpg"),
]


def find_source(directory: Path, prefix: str) -> Path:
    matches = [
        path
        for path in directory.iterdir()
        if path.is_file()
        and path.name.startswith(prefix)
        and path.suffix.lower() in {".jpg", ".jpeg", ".png"}
    ]
    if len(matches) != 1:
        raise ValueError(f"Expected one source for {prefix!r}, found {len(matches)}")
    return matches[0]


def save_web_image(source: Path, destination: Path, max_edge: int, quality: int) -> tuple[int, int]:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
        image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
        image.save(destination, "JPEG", quality=quality, optimize=True, progressive=True)
        return image.size


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare uncropped photography exhibition images for the website.")
    parser.add_argument("--source-dir", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, default=PUBLIC)
    parser.add_argument("--include-personal", action="store_true")
    args = parser.parse_args()
    if not args.source_dir.is_dir():
        parser.error("--source-dir must be an existing directory")

    try:
        sources = [(find_source(args.source_dir, title), title, category, file)
                   for title, category, file in EXHIBITION_IMAGES]
        personal_source = find_source(args.source_dir, "SRX02588_") if args.include_personal else None
    except ValueError as error:
        parser.error(str(error))

    results = []
    for source, title, category, file in sources:
        destination = args.output_dir / category / file
        thumbnail = args.output_dir / "thumbnails" / category / file
        width, height = save_web_image(source, destination, 2400, 86)
        save_web_image(source, thumbnail, 900, 82)
        results.append({
            "title": title,
            "category": category,
            "file": file,
            "width": width,
            "height": height,
            "thumbnail": thumbnail.relative_to(args.output_dir).as_posix(),
            "bytes": destination.stat().st_size,
        })

    if personal_source:
        destination = args.output_dir / "profile" / "gallery" / "17-photography-talk.jpg"
        width, height = save_web_image(personal_source, destination, 2400, 86)
        results.append({
            "title": "摄影分享现场",
            "category": "personal",
            "file": destination.relative_to(args.output_dir).as_posix(),
            "width": width,
            "height": height,
            "bytes": destination.stat().st_size,
        })

    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
