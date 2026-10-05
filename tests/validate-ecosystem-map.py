from pathlib import Path
from math import dist

from PIL import Image


image = Image.open(Path(__file__).parents[1] / "assets" / "ecosystem-map.webp").convert("RGB")

# These points sit inside the four content panels. Connector strokes must stay
# in the central corridor instead of crossing these positions.
for point, accent in {
    (480, 180): (37, 99, 235),
    (800, 180): (34, 211, 238),
    (480, 290): (139, 92, 246),
    (800, 290): (16, 185, 129),
}.items():
    pixel = image.getpixel(point)
    if dist(pixel, accent) < 70:
        raise AssertionError(f"connector enters panel content at {point}: {pixel}")

print("ECOSYSTEM_CONNECTORS_OK=4")
