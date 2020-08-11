const fs = require("fs");
const GeoTIFF = require("geotiff");

const getPixel = (values, x, y, w, h) => {
  return parseInt(values[y * w + x]);
};

const load = async () => {
  const tiff = await GeoTIFF.fromFile("./data/reproject-0.01.tif");
  const image = await tiff.getImage();

  //console.log(image.fileDirectory);
  const w = image.fileDirectory.ImageWidth;
  const h = image.fileDirectory.ImageLength;
  console.log(w, h);

  const [values] = await image.readRasters({
    width: w,
    height: h,
    resampleMethod: "bilinear",
  });

  const imageArr = [];

  for (let x = 0; x !== w; x++) {
    if (!imageArr[x]) {
      imageArr[x] = [];
    }
    for (let y = 0; y !== h; y++) {
      const px = getPixel(values, x, y, w, h);
      imageArr[x][y] = px < 0 ? false : px;
    }
  }
  //console.log(imageArr);
  fs.writeFileSync("data/svk.json", JSON.stringify(imageArr));
};

load();
