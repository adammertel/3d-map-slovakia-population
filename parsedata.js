const fs = require("fs");
const GeoTIFF = require("geotiff");

const w = 200;
const h = 100;
const getPixel = (vals, x, y) => {
  return vals[y * w + x];
};

const load = async () => {
  const tiff = await GeoTIFF.fromFile("./data/005.tiff");

  const image = await tiff.getImage();
  const [values] = await image.readRasters({
    width: w,
    height: h,
    resampleMethod: "bilinear",
  });

  const arr = [];

  for (let x = 0; x !== w; x++) {
    if (!arr[x]) {
      arr[x] = [];
    }
    for (let y = 0; y !== h; y++) {
      const px = getPixel(values, x, y);
      arr[x][y] = px < 0 ? false : px;
    }
  }
  console.log(arr);
  fs.writeFileSync("data/svk.json", JSON.stringify(arr));
};

load();
