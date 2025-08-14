const videoElem = document.getElementById("video");
const errorElem = document.getElementById("error");
const canvas = document.getElementById("canvas");
const photo = document.getElementById("photo");
const captureButton = document.getElementById("captureButton");
const filterContainer = document.getElementById("filterSelect");
const buttons = filterContainer.querySelectorAll("button");

document.addEventListener("DOMContentLoaded", () => {
  let activeButton = null;

  const filterMap = {
    1: "contrast(97%) grayscale(0%) hue-rotate(330deg) invert(0%) opacity(100%) saturate(111%) sepia(0%)",
    2: "contrast(107%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(165%) sepia(50%)",
    3: "blur(3px)",
    4: "brightness(110%) contrast(116%) grayscale(0%) hue-rotate(342deg) invert(0%) opacity(100%) saturate(84%) sepia(0%)",
    5: "grayscale(30%) hue-rotate(233deg) invert(0%) opacity(100%) saturate(205%) sepia(60%)",
    6: "contrast(128%) grayscale(100%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(120%) sepia(0%)",
    7: "brightness(90%) contrast(125%) grayscale(100%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(100%) sepia(50%)",
  };

  let f;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (activeButton) {
        activeButton.classList.remove("active");
      }

      button.classList.add("active");
      activeButton = button;

      const filterId = button.id;
      if (filterMap[filterId]) {
        if (videoElem) videoElem.style.filter = filterMap[filterId];
      }
    });
  });
});

let receivedMediaStream = null;
const constraints = {
  audio: false,
  video: true,
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((mediaStream) => {
    videoElem.srcObject = mediaStream;
    receivedMediaStream = mediaStream;
  })
  .catch((err) => {
    errorElem.innerHTML = err;
    errorElem.style.display = "block";
  });

captureButton.addEventListener("click", () => {
  if (receivedMediaStream == null) alert("start the camera");
  else {

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    const ctx=canvas.getContext("2d");

    ctx.filter=getComputedStyle(video).filter;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");

    console.log(canvas.toDataURL("image/jpeg"));

    localStorage.setItem("capturedImage", imageDataUrl);
    
     setTimeout(() => {
    window.location.href = "result.html";
  }, 100);
  }

 
});
