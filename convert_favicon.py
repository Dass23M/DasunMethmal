import os
from PIL import Image

src_path = r"c:\Users\DELL\Desktop\unfold-master\methmal\public\images\favicon.ico.jpeg"
pub_dest = r"c:\Users\DELL\Desktop\unfold-master\methmal\public\favicon.ico"
app_dest = r"c:\Users\DELL\Desktop\unfold-master\methmal\src\app\favicon.ico"
png_dest = r"c:\Users\DELL\Desktop\unfold-master\methmal\public\favicon.png"

if os.path.exists(src_path):
    try:
        im = Image.open(src_path)
        # Save as ICO (containing 16x16, 32x32, 48x48, 64x64 sizes)
        im.save(pub_dest, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        im.save(app_dest, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        im.save(png_dest, format='PNG')
        print("Successfully generated public/favicon.ico, src/app/favicon.ico, and public/favicon.png!")
    except Exception as e:
        print(f"Error converting favicon: {e}")
else:
    print(f"Source file not found at {src_path}")
