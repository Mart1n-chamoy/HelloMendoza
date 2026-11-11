"""PNG -> WebP optimizado. Genera nombre.webp (ancho original, máx 1920) y nombre-sm.webp (800px)."""
import os, sys
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
for f in sorted(os.listdir(src)):
    if not f.endswith(".png"):
        continue
    name = f[:-4]
    im = Image.open(os.path.join(src, f)).convert("RGB")
    big = im.copy()
    if big.width > 1920:
        big.thumbnail((1920, 10000), Image.LANCZOS)
    if name == "og-image":
        big.save(os.path.join(dst, name + ".jpg"), "JPEG", quality=84, optimize=True, progressive=True)
        continue
    big.save(os.path.join(dst, name + ".webp"), "WEBP", quality=80, method=6)
    sm = im.copy()
    sm.thumbnail((800, 10000), Image.LANCZOS)
    sm.save(os.path.join(dst, name + "-sm.webp"), "WEBP", quality=78, method=6)
    print(name, big.size, sm.size)
