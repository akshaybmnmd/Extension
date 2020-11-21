$(document).ready(function () {
  if (!localStorage.hasOwnProperty("permission")) {
    window.open("permission.html");
  }

  var port = chrome.extension.connect({
    name: "Sample Communication",
  });

  // port.postMessage("Initiating this port");

  port.onMessage.addListener(function (msg) {
    console.log("message recieved" + msg);
  });

  document
    .getElementById("btn_register_client")
    .addEventListener("click", register_client);
  console.log("added click event");

  document.getElementById("make_call").addEventListener("click", make_call);

  function register_client() {
    port.postMessage("register_client");
    localStorage["user"] = $("#user").val();
    localStorage["registered"] = "YES";
    document.getElementById("register_page").style.display = "none";
    document.getElementById("make_video_call").style.display = "inline";
  }

  function make_call() {
    var video1 = document.getElementById("videoElement1");
    var video2 = document.getElementById("videoElement2");
    port.postMessage("video calling");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video1.srcObject = stream;
          video2.srcObject = stream;
        })
        .catch(function (err) {
          port.postMessage("Can't get userMedia: " + err);
        });
    }
    window.setInterval(function () {
      onAnswer();
    }, 10000);
    document.getElementById("calling").style.display = "inline";
  }

  function onAnswer() {
    document.getElementById("calling").style.display = "none";
    document.getElementById("videoElement2").style.display = "inline";
  }
});
