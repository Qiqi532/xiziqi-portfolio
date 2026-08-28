from pathlib import Path
import subprocess
import tempfile
import zipfile

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
INTRO = ROOT / "intro"
PUBLIC = ROOT / "public" / "images"


def save_web_image(source: Path, destination: Path, max_edge: int = 2200) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
        image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
        image.save(destination, "JPEG", quality=86, optimize=True, progressive=True)


def render_pdf_first_page(source: Path, destination: Path) -> None:
    with tempfile.TemporaryDirectory() as temporary:
        prefix = Path(temporary) / "page"
        subprocess.run(
            [
                "pdftoppm",
                "-f",
                "1",
                "-singlefile",
                "-png",
                "-r",
                "180",
                str(source),
                str(prefix),
            ],
            check=True,
        )
        save_web_image(prefix.with_suffix(".png"), destination)


def extract_ppt_media(source: Path, media_name: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(source) as archive, tempfile.TemporaryDirectory() as temporary:
        extracted = Path(temporary) / media_name
        extracted.write_bytes(archive.read(f"ppt/media/{media_name}"))
        save_web_image(extracted, destination)


HERO_IMAGES = {
    "上海.jpg": "hero-shanghai.jpg",
    "泉州.jpg": "hero-quanzhou.jpg",
    "杭州.jpg": "hero-hangzhou.jpg",
    "长城.jpg": "hero-great-wall.jpg",
    "北京.jpg": "hero-beijing.jpg",
}

GALLERY_IMAGES = {
    "20251003-DSC_1575.jpg": "gallery/01-coast.jpg",
    "北京.jpg": "gallery/02-beijing.jpg",
    "光电会议.jpg": "gallery/03-photonics-conference.jpg",
    "全运会 (2).jpg": "gallery/04-national-games.jpg",
    "全运会 (3).jpg": "gallery/05-national-games.jpg",
    "全运会 (4).jpg": "gallery/06-national-games.jpg",
    "杭州.jpg": "gallery/07-hangzhou.jpg",
    "南京.png": "gallery/08-nanjing.jpg",
    "泉州.jpg": "gallery/09-quanzhou.jpg",
    "三下乡.JPG": "gallery/10-fieldwork.jpg",
    "篮球赛 (1).jpg": "gallery/11-basketball.jpg",
    "证件照.jpg": "gallery/12-id-photo.jpg",
    "长城.jpg": "gallery/13-great-wall.jpg",
    "香港.jpg": "gallery/14-hong-kong.jpg",
    "迪士尼.jpg": "gallery/15-disney.jpg",
}

for source_name, destination_name in HERO_IMAGES.items():
    save_web_image(INTRO / "pic" / source_name, PUBLIC / "profile" / destination_name)
for source_name, destination_name in GALLERY_IMAGES.items():
    save_web_image(INTRO / "pic" / source_name, PUBLIC / "profile" / destination_name)

save_web_image(
    INTRO / "国际旅游地理.jpg",
    PUBLIC / "practice" / "china-national-travel.jpg",
)
save_web_image(
    INTRO
    / "reward"
    / "千年古树的现代生存密码-光明日报-光明网_files"
    / "2025050607_big.jpg",
    PUBLIC / "practice" / "guangming-daily-page.jpg",
)
for index, source_name in enumerate(
    ("全运会 (2).jpg", "全运会 (3).jpg", "全运会 (4).jpg"), start=1
):
    save_web_image(
        INTRO / "pic" / source_name,
        PUBLIC / "practice" / f"national-games-{index}.jpg",
    )
save_web_image(INTRO / "pic" / "三下乡.JPG", PUBLIC / "practice" / "fieldwork.jpg")

render_pdf_first_page(
    INTRO / "reward" / "Measurement.pdf",
    PUBLIC / "research" / "paper-measurement.jpg",
)
render_pdf_first_page(
    INTRO / "reward" / "optical fiber Technology .pdf",
    PUBLIC / "research" / "paper-optical-fiber-technology.jpg",
)
render_pdf_first_page(
    INTRO / "reward" / "数模广东省一等奖.pdf",
    PUBLIC / "research" / "award-modeling.jpg",
)
render_pdf_first_page(
    INTRO / "reward" / "华南大学生物理实验竞赛二等奖.pdf",
    PUBLIC / "research" / "award-physics-experiment.jpg",
)
save_web_image(
    INTRO / "reward" / "全国物理实验研讨会科研论文一等奖.jpg",
    PUBLIC / "research" / "award-seminar.jpg",
)

PPT = INTRO / "中山大学-黄新宏 - 线下交流.pptx"
PPT_MEDIA = {
    "image15.png": "project-fiber-structure.jpg",
    "image22.png": "measurement-figure.jpg",
    "image27.png": "lhc-top-tagging.jpg",
    "image31.png": "peculiar-stars-figure.jpg",
}
for media_name, destination_name in PPT_MEDIA.items():
    extract_ppt_media(PPT, media_name, PUBLIC / "research" / destination_name)

print("Prepared personal homepage assets")
