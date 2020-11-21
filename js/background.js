console.log("backgrund page loaded", localStorage.hasOwnProperty("registered"));

chrome.extension.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log(msg);
  });
  if (localStorage.hasOwnProperty("registered")) {
    hide_view("register_page");
    show_view("make_video_call");
  } else {
    show_view("register_page");
    hide_view("make_video_call");
  }
});

function show_view(view_id) {
  var views = chrome.extension.getViews({
    type: "popup",
  });
  console.log("views", views);
  for (var i = 0; i < views.length; i++) {
    if (views[i].document.getElementById(view_id) != null)
      views[i].document.getElementById(view_id).style.display = "inline";
  }
}

function hide_view(view_id) {
  var views = chrome.extension.getViews({
    type: "popup",
  });
  for (var i = 0; i < views.length; i++) {
    if (views[i].document.getElementById(view_id) != null)
      views[i].document.getElementById(view_id).style.display = "none";
  }
}
