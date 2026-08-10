import os
from PIL import Image

def compress_images(directory):
    if not os.path.exists(directory):
        return
    for root, _, files in os.walk(directory):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.jpg', '.jpeg', '.png']:
                path = os.path.join(root, file)
                size_before = os.path.getsize(path)
                # Only compress files larger than 150 KB
                if size_before > 150 * 1024:
                    try:
                        im = Image.open(path)
                        if ext in ['.jpg', '.jpeg']:
                            im.convert('RGB').save(path, 'JPEG', optimize=True, quality=80)
                        elif ext == '.png':
                            # For large PNGs (like cover_bg_2.png), convert to RGB JPEG or high-compression PNG
                            if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                                im.save(path, 'PNG', optimize=True)
                            else:
                                im.convert('RGB').save(path, 'JPEG', optimize=True, quality=82)
                        size_after = os.path.getsize(path)
                        print(f"Compressed {file}: {size_before // 1024}KB -> {size_after // 1024}KB")
                    except Exception as e:
                        print(f"Error compressing {file}: {e}")

if __name__ == '__main__':
    compress_images('./images')
    compress_images('./public/images')
