export function getAverColor(imageElement, ratio) {
  const canvas = document.createElement("canvas");

  // let width = (canvas.width = imageElement.naturlWidth);
  // let height = (canvas.height = imageElement.naturlHeight);

  const context = canvas.getContext("2d");
  context.drawImage(imageElement, 0, 0);

  let data, length;

  let i = -4,
    count = 0;

  try {
    data = context.getImageData(0, 0);
    length = data.data.length;
  } catch (err) {
    console.log(err);
    return {
      R: 0,
      G: 0,
      B: 0,
    };
  }

  let R = 0,
    G = 0,
    B = 0; // 수정: 변수 초기화 방식 수정

  while ((i += ratio * 4) < length) {
    R += data.data[i];
    G += data.data[i + 1];
    B += data.data[i + 2];
    count++;
  }

  R = ~~(R / count);
  G = ~~(G / count);
  B = ~~(B / count);

  return {
    R,
    G,
    B,
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const images = document.getElementsByClassName("detail_img");
  Array.from(images).forEach((image) => {
    image.onload = () => {
      const { R, G, B } = getAverColor(image, 4);

      const detailWraps = document.getElementsByClassName("detail_wrap");
      for (let i = 0; i < detailWraps.length; i++) {
        detailWraps[i].style.background = `rgb( ${R}, ${G}, ${B} )`;
      }
      //document.body.style.background = `rgb( ${R}, ${G}, ${B} )`;
    };
  });
});

// //const image = document.querySelector("img");
// const image = document.getElementsByClassName("detail_img");
// image.onload = () => {
//   const { R, G, B } = getAverColor(image, 4);
//   document.body.style.background = `rgb( ${R}, ${G}, ${B} )`;
// };
