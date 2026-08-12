import os
from PIL import Image

src_path = r"c:\Users\DELL\Desktop\unfold-master\methmal\public\images\favicon.ico.jpeg"
pub_dir = r"c:\Users\DELL\Desktop\unfold-master\methmal\public"
app_dir = r"c:\Users\DELL\Desktop\unfold-master\methmal\src\app"

if os.path.exists(src_path):
    try:
        im = Image.open(src_path)
        
        # 1. Save ICO files
        im.save(os.path.join(pub_dir, "favicon.ico"), format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        im.save(os.path.join(app_dir, "favicon.ico"), format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        
        # 2. Save PNG icon sizes expected by browser and Next.js manifest
        im.resize((32, 32), Image.Resampling.LANCZOS).save(os.path.join(pub_dir, "favicon-32x32.png"), format='PNG')
        im.resize((192, 192), Image.Resampling.LANCZOS).save(os.path.join(pub_dir, "icon-192.png"), format='PNG')
        im.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(pub_dir, "icon-512.png"), format='PNG')
        im.resize((180, 180), Image.Resampling.LANCZOS).save(os.path.join(pub_dir, "apple-touch-icon.png"), format='PNG')
        
        print("Successfully generated all icons in public/ and src/app/!")
    except Exception as e:
        print(f"Error converting favicon: {e}")
else:
    print(f"Source file not found at {src_path}")
