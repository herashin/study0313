// 이미지의 색상 추출 함수
const extractImageColor = (imageUrl) => {
  // 새로운 이미지 객체 생성
  const image = new Image();

  // 이미지 로드 완료 시 실행되는 함수
  image.onload = function () {
    // 캔버스 생성
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 캔버스 크기 설정
    canvas.width = image.width;
    canvas.height = image.height;

    // 이미지를 캔버스에 그리기
    ctx.drawImage(image, 0, 0);

    // 이미지 데이터 가져오기
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 색상 정보 초기화
    let red = 0;
    let green = 0;
    let blue = 0;

    // 픽셀 데이터를 순회하면서 RGB 값을 누적
    for (let i = 0; i < data.length; i += 4) {
      red += data[i];
      green += data[i + 1];
      blue += data[i + 2];
    }

    // 픽셀 수로 나누어 평균값 계산
    const pixelCount = data.length / 4;
    red = Math.round(red / pixelCount);
    green = Math.round(green / pixelCount);
    blue = Math.round(blue / pixelCount);

    // 평균 색상 반환
    const averageColor = `rgb(${red}, ${green}, ${blue})`;
    console.log(averageColor); // 추출된 평균 색상 출력
  };

  // 이미지 소스 설정 및 로드 시작
  image.src = imageUrl;
};

// 이미지 경로로 색상 추출 함수 호출
extractImageColor(src);
