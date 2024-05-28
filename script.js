let imgBox = document.getElementById("imgBox");
let qrImg = document.getElementById("qrImg");
let qrText = document.getElementById("qrText");
let clearQR = document.getElementById("clearQR");
let downloadQR = document.getElementById("downloadQR");

window.onload = function () {
  const storedQRCode = localStorage.getItem("qrCode");
  if (storedQRCode) {
    qrImg.src = storedQRCode;
    imgBox.style.display = "block";
  }
};

function generateQR() {
  const qrData = qrText.value;
  const qrURL =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrData;
  qrImg.src = qrURL;
  localStorage.setItem("qrCode", qrURL);
  imgBox.style.display = "block";
}

clearQR.addEventListener("click", function () {
  localStorage.removeItem("qrCode");
  qrImg.src = "";
  imgBox.style.display = "none";
});

downloadQR.addEventListener("click", function () {
  const qrURL = qrImg.src;
  fetch(qrURL)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr_code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    })
    .catch(console.error);
});
