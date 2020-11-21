window.addEventListener(
  "load",
  function () {
    navigator.getUserMedia_ =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    try {
      navigator.getUserMedia_(
        {
          video: true,
          audio: true,
        },
        app_start,
        app_denied
      );
      console.log("permission checking");
    } catch (e) {
      console.log(e);
      try {
        navigator.getUserMedia_("audio", app_start, app_denied);
      } catch (e) {
        console.log(e);
      }
    }
  },
  false
);
var app_denied = function () {
  console.log("video denied");
  localStorage["permission"] = "denied";
  window.close();
};
var app_start = function () {
  console.log("app_start background page:");
  localStorage["permission"] = "granted";
  window.close();
  //chrome.extension.getBackgroundPage().location.reload();
};
