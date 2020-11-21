$(document).ready(function () {
  // port.postMessage("popup.js loaded");
  if (!localStorage.hasOwnProperty("permission")) {
    window.open("permission.html");
  }

  var port = chrome.extension.connect({
    name: "Sample Communication",
  });

  port.postMessage("Hi BackGround");

  port.onMessage.addListener(function (msg) {
    console.log("message recieved" + msg);
  });

  document
    .getElementById("btn_register_client")
    .addEventListener("click", register_client);

  document.getElementById("make_call").addEventListener("click", make_call);

  function register_client() {
    port.postMessage("register_client");
    localStorage["user"] = $("#user").val();
    localStorage["registered"] = "YES";
    document.getElementById("register_page").style.display = "none";
    document.getElementById("make_video_call").style.display = "inline";
  }

  function make_call() {
    var video = document.getElementById("videoElement");
    port.postMessage("video calling");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err) {
          port.postMessage("Can't get userMedia: " + err);
        });
    }
    document.getElementById("calling").style.display = "inline";
  }
});
