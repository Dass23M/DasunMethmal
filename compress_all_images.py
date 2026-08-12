import os
import sys
from PIL import Image

def optimize_image(filepath):
    if not os.path.exists(filepath):
        return
    
    ext = os.path.splitext(filepath)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png', '.webp']:
        return

    size_before = os.path.getsize(filepath)
    # Only process files > 80 KB
    if size_before < 80 * 1024:
        return

    try:
        im = Image.open(filepath)
        width, height = im.size

        # Resize if dimension exceeds 1920px
        max_dim = 1920
        if width > max_dim or height > max_dim:
            if width >= height:
                new_w = max_dim
                new_h = int(height * (max_dim / float(width)))
            else:
                new_h = max_dim
                new_w = int(width * (max_dim / float(height)))
            im = im.resize((new_w, new_h), Image.Resampling.LANCZOS)

        if ext in ['.jpg', '.jpeg']:
            im = im.convert('RGB')
            im.save(filepath, 'JPEG', optimize=True, quality=80)
        elif ext == '.png':
            has_alpha = False
            if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                # Check if alpha is actually used
                alpha = im.convert('RGBA').split()[-1]
                min_alpha, max_alpha = alpha.getextrema()
                if min_alpha < 255:
                    has_alpha = True

            if has_alpha:
                # Save optimized PNG
                im.save(filepath, 'PNG', optimize=True)
            else:
                # Convert non-transparent PNG to JPEG while preserving .png extension for compatibility
                im = im.convert('RGB')
                im.save(filepath, 'JPEG', optimize=True, quality=82)

        size_after = os.path.getsize(filepath)
        saved_pct = int((1 - (size_after / float(size_before))) * 100)
        print(f"Compressed {os.path.basename(filepath)}: {size_before // 1024}KB -> {size_after // 1024}KB (-{saved_pct}%)")
    except Exception as e:
        print(f"Error compressing {filepath}: {e}")

def process_directory(directory):
    if not os.path.exists(directory):
        return
    for root, _, files in os.walk(directory):
        for f in files:
            path = os.path.join(root, f)
            optimize_image(path)

if __name__ == '__main__':
    print("Starting image optimization...")
    process_directory(os.path.abspath('./images'))
    process_directory(os.path.abspath('./public/images'))
    print("Image optimization completed successfully!")
