import hashlib
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
IMAGES = PUBLIC / 'images'
OUTPUT = IMAGES / 'responsive'
MANIFEST = ROOT / 'src' / 'data' / 'imageAssets.json'
WIDTHS = (480, 960, 1600)
QUALITY = 82


def prepare_image(source: Path) -> Image.Image:
    with Image.open(source) as original:
        oriented = ImageOps.exif_transpose(original)
        transparent = 'A' in oriented.getbands() or 'transparency' in oriented.info
        return oriented.convert('RGBA' if transparent else 'RGB')


def jpeg_background(image: Image.Image) -> Image.Image:
    if image.mode == 'RGBA':
        background = Image.new('RGB', image.size, 'white')
        background.paste(image, mask=image.getchannel('A'))
        return background
    return image


def prepare_variants(image: Image.Image, digest: str) -> dict:
    variants = {'width': image.width, 'height': image.height, 'webp': [], 'jpeg': []}
    for width in sorted({min(image.width, target) for target in WIDTHS}):
        height = max(1, round(image.height * width / image.width))
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        for extension, image_format in (('webp', 'WEBP'), ('jpg', 'JPEG')):
            destination = OUTPUT / f'image-{digest}-{width}.{extension}'
            if not destination.exists():
                if image_format == 'WEBP':
                    resized.save(destination, image_format, quality=QUALITY, method=6)
                else:
                    jpeg_background(resized).save(destination, image_format, quality=QUALITY, optimize=True, progressive=True)
            variants['webp' if extension == 'webp' else 'jpeg'].append({'src': destination.relative_to(PUBLIC).as_posix(), 'width': width})
    return variants


def comparison(source: Path, record: dict) -> dict:
    preferred = next((variant for variant in record['webp'] if variant['width'] >= 960), record['webp'][-1])
    return {'source': source.relative_to(PUBLIC).as_posix(), 'original_bytes': source.stat().st_size, 'original_dimensions': [record['width'], record['height']], 'default_width': preferred['width'], 'default_webp_bytes': (PUBLIC / preferred['src']).stat().st_size}


def main() -> None:
    sources = sorted(source for source in IMAGES.rglob('*') if source.is_file() and source.suffix.lower() in {'.jpg', '.jpeg', '.png', '.webp'} and not {'thumbnails', 'responsive'}.intersection(source.relative_to(IMAGES).parts))
    if not sources:
        raise ValueError('No original images found in public/images')
    OUTPUT.mkdir(parents=True, exist_ok=True)
    records = {}
    content_records = {}
    for source in sources:
        image = prepare_image(source)
        digest = hashlib.sha256(f'{image.mode}:{image.width}:{image.height}:q{QUALITY}:'.encode() + image.tobytes()).hexdigest()[:20]
        if digest not in content_records:
            content_records[digest] = prepare_variants(image, digest)
        records[source.relative_to(PUBLIC).as_posix()] = content_records[digest]
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(records, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    generated = {PUBLIC / variant['src'] for record in records.values() for image_format in ('webp', 'jpeg') for variant in record[image_format]}
    largest = max(sources, key=lambda source: source.stat().st_size)
    equal_size_sources = [source for source in sources if records[source.relative_to(PUBLIC).as_posix()]['width'] <= 1600]
    equal_size_comparison = None
    if equal_size_sources:
        source = max(equal_size_sources, key=lambda source: source.stat().st_size)
        record = records[source.relative_to(PUBLIC).as_posix()]
        equal_size_comparison = {'source': source.relative_to(PUBLIC).as_posix(), 'dimensions': [record['width'], record['height']], 'original_bytes': source.stat().st_size, 'webp_bytes': (PUBLIC / record['webp'][-1]['src']).stat().st_size, 'jpeg_bytes': (PUBLIC / record['jpeg'][-1]['src']).stat().st_size}
    print(json.dumps({'original_count': len(sources), 'unique_images': len(content_records), 'original_bytes': sum(source.stat().st_size for source in sources), 'manifest_bytes': MANIFEST.stat().st_size, 'responsive_files': len(generated), 'responsive_bytes': sum(path.stat().st_size for path in generated), 'largest_original': comparison(largest, records[largest.relative_to(PUBLIC).as_posix()]), 'largest_original_at_equal_dimensions': equal_size_comparison}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
