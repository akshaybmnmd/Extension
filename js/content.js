var textfound = false;
var hashcontrol = false;
var temp = [];
var span = "";
var modal = "";
var domain_url = "";
console.log("here");
window.setInterval(function () {
  onLoad(domain_url);
}, 5000);

// var templates = []
var crm = window.location.href;

chrome.runtime.onMessage.addListener(function (request, sender) {
  switch (request.message) {
    case "start_highlight":
      click_to_call();
      domain_url = request.crm_type;
      console.log("domain_url", domain_url);
      break;
    case "sms_action":
      console.log("sms_action");
      console.log("sms_action", request.data, request.name);
      append_modal(request.data, request.name);
      break;
    case "ask_action":
      console.log("ask_action", request.data, request.name);
      append_ask_modal(request.data, request.name);
      break;
    case "import_templates":
      console.log(
        "import_templates",
        request.data,
        request.name,
        request.templates
      );
      show_template(request.data, request.name, request.templates);
      break;
    case "get_templates":
      console.log("get_templates", request.templates);
      temp = JSON.parse(request.templates);
      console.log("temp", temp);
      break;
    case "alreadyExist_templates":
      alert("Already this template is Existing..");
    default:
      /* document.getElementById('dial_number').value=request.message;
                       location.href="javascript:call('text','null'); void 0";*/
      break;
  }
});

function append_modal(number, name) {
  console.log("opened");
  if (
    document.getElementById("open_content_modal") === null &&
    document.getElementById("open_ask_modal") === null
  ) {
    console.log("open_modal");
    $.get(chrome.runtime.getURL("/open_modal.html"), function (data) {
      var div = document.createElement("div");
      div.id = "open_content_modal";
      div.innerHTML = data;
      document.body.appendChild(div);
      append_images(number, name);

      modal = document.getElementById("myModal");
      span = document.getElementsByClassName("_close")[0];
      modal.style.display = "block";
    });
  } else {
    if (document.getElementById("open_content_modal") === null) {
      // console.log("number",number+"name"+name);
      append_images(number, name);
    }
    // console.log("number",number+"name"+name);
    var name_id = document.getElementById("user_add");
    if (name == "") name_id.innerHTML = number;
    else name_id.innerHTML = number + " - " + name;
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("_close")[0];
    modal.style.display = "block";
    // $('#myModal').modal('show');
  }
}
$(document).on("click", "._close", function () {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("askModal").style.display = "none";
});
window.onclick = function (event) {
  if (event.target == modal) {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("askModal").style.display = "none";
  }
};
function append_images(number, name) {
  // console.log("number1 ",number+"name"+name);
  var save_icon = chrome.runtime.getURL("img/save_icon.png");
  if (document.getElementById("save_msg_extentemplate") === null) {
    var sdiv = document.getElementById("save_template");
    var simg = document.createElement("img");
    simg.src = save_icon;
    simg.id = "save_msg_extentemplate";
    sdiv.appendChild(simg);
    // document.getElementById('save_msg_extentemplate').title = "Save template";
  }
  var send_icon = chrome.runtime.getURL("img/button_send_msg.png");
  if (document.getElementById("modal_send_messg_extention") === null) {
    var senddiv = document.getElementById("send_message");
    console.log(send_icon, "send_icon");
    var sendimg = document.createElement("img");
    sendimg.src = send_icon;
    sendimg.id = "modal_send_messg_extention";
    senddiv.appendChild(sendimg);
    var template_icon = chrome.runtime.getURL("img/Template.png");
    var tempdiv = document.getElementById("import_templates");
    var tempimg = document.createElement("img");
    tempimg.id = "modal_import_template";
    tempimg.src = template_icon;
    tempdiv.appendChild(tempimg);
  }
  console.log("number2 ", number + "name" + name);
  var name_id = document.getElementById("user_add");
  if (name == "") name_id.innerHTML = number;
  else name_id.innerHTML = number + " - " + name;
  document.getElementById("message_content").innerText = "";
  if (crm.indexOf("zoho") > -1) {
    console.log("index", crm.indexOf("insightly"));
    document.getElementById("myModal").style.height = "100%";
    document.getElementById("save_msg_extentemplate").style.right = "11.5%";
    document.getElementById("save_msg_extentemplate").style.top = "64%";
    document.getElementById("modal_send_messg_extention").style.top = "74%";
    document.getElementById("modal_send_messg_extention").style.right = "10.5%";
    document.getElementById("modal_import_template").style.top = "-207px";
    document.getElementById("modal_import_template").style.left = "540px";
  }
}
function append_ask_modal(number, name) {
  console.log("opened");
  if (
    document.getElementById("open_ask_modal") === null &&
    document.getElementById("open_content_modal") === null
  ) {
    $.get(chrome.runtime.getURL("/open_modal.html"), function (data) {
      var div = document.createElement("div");
      div.id = "open_ask_modal";
      div.innerHTML = data;
      document.body.appendChild(div);
      ask_modal_append_images(number, name);
      modal = document.getElementById("askModal");
      span = document.getElementsByClassName("_close")[0];
      modal.style.display = "block";
    });
  } else {
    if (document.getElementById("open_ask_modal") === null) {
      ask_modal_append_images(number, name);
    }
    var name_id = document.getElementById("user_askadd");
    if (name == "") name_id.innerHTML = number;
    else name_id.innerHTML = number + " - " + name;
    console.log("name", name);
    modal = document.getElementById("askModal");
    span = document.getElementsByClassName("_close")[0];
    modal.style.display = "block";
  }
}
function ask_modal_append_images(number, name) {
  var call_icon = chrome.runtime.getURL("img/call_icons.png");
  var message_icon = chrome.runtime.getURL("img/message_icon.png");
  var idiv = document.getElementById("bottom_button_call");
  if (document.getElementById("call_icon") == null) {
    var img = document.createElement("img");
    img.src = call_icon;
    img.id = "call_icon";
    idiv.appendChild(img);
    var mdiv = document.getElementById("bottom_button_message");
    var mimg = document.createElement("img");
    mimg.src = message_icon;
    mimg.id = "message_icon";
    mdiv.appendChild(mimg);
  }
  var name_id = document.getElementById("user_askadd");
  if (name == "") name_id.innerHTML = number;
  else name_id.innerHTML = number + " - " + name;
}
function show_template(number, name, template) {
  // append_modal(number,name);
  // var text = document.getElementById("message_content").value;
  var dropdown = "";
  var element = document.getElementById("twilio_dialer_Dropdown");
  $("#twilio_dialer_Dropdown").empty();
  if (template == null) {
    alert("There is no saved templates to show");
  } else {
    temp = JSON.parse(template);
    for (var i = 0; i < temp.length; i++) {
      console.log("body", temp[i]);
      body = temp[i];
      if (body !== null) {
        if (body.length > 25) {
          body = body.substr(0, 22) + "...";
        }
        var option = document.createElement("div");
        option.innerHTML = body;
        option.id = i;
        option.className = "option";
        element.appendChild(option);
      }
    }
    element.classList.toggle("show");
  }
}
function dropdown_remove() {
  var dropdowns = document.getElementsByClassName(
    "twilio_dialer_dropdown-content"
  );
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
}
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    dropdown_remove();
  }
};
$(document).on("click", "#save_msg_extentemplate", function () {
  console.log("saved");
  if (document.getElementById("append_text") !== null) {
    document.getElementById("append_text").innerText = "";
  }
  var text = document.getElementById("message_content").innerText;
  console.log("saved text", text);
  chrome.runtime.sendMessage({ action: "save_template", data: { text: text } });
});
$(document).on("click", ".option", function () {
  console.log("clicked", this.id);
  var index = this.id;
  console.log(temp[index]);
  if (document.getElementById("append_text") !== null) {
    document.getElementById("append_text").innerText = "";
  }
  var text = document.getElementById("message_content").innerText;
  document.getElementById("message_content").innerText =
    text + " " + temp[index];
  dropdown_remove();
  // chrome.extension.sendRequest({action: "import_contenttemplates",data:{num:number[0]}});
});
$(document).on("click", "#import_templates", function () {
  console.log("importing_templates");
  var number = document.getElementById("user_add").innerHTML;
  number = number.split(" - ");
  console.log("number", number);
  chrome.runtime.sendMessage({
    action: "import_templates",
    data: { num: number[0] },
  });
});
$(document).on("click", "#send_msg", function () {
  console.log("send_msg");
  send_mesg();
});
$(document).on("click", "#modal_send_messg_extention", function () {
  send_mesg();
});
function send_mesg() {
  if (document.getElementById("append_text") !== null) {
    document.getElementById("append_text").innerText = "";
  }
  var message = document.getElementById("message_content").innerText;
  var number = document.getElementById("user_add").innerHTML;
  number = number.split(" - ");
  console.log("number " + number[0] + " body " + message);
  chrome.runtime.sendMessage({
    action: "send_message",
    data: { num: number[0], body: message },
  });
  document.getElementById("message_content").innerText = "";
  // $('#myModal').modal('hide');
  modal.style.display = "none";
}
$(document).on("click", "#bottom_button_call", function () {
  console.log("action called");
  var number = document.getElementById("user_askadd").innerHTML;
  number = number.split(" - ");
  chrome.runtime.sendMessage({
    action: "call_action",
    data: { num: number[0] },
  });
  document.getElementById("askModal").style.display = "none";
  // $('#askModal').modal('hide');
});
$(document).on("click", "#bottom_button_message", function () {
  console.log("action called");
  var number = document.getElementById("user_askadd").innerHTML;
  number = number.split(" - ");
  chrome.runtime.sendMessage({
    action: "sms_action",
    data: { num: number[0] },
  });
  document.getElementById("askModal").style.display = "none";
  // $('#askModal').modal('hide');
});
$(document).on("keydown", "#message_content", function (e) {
  var keyCode = e.keyCode || e.which;
  console.log(keyCode);
  if (keyCode == 9) {
    e.preventDefault();
    var append_text = document.getElementById("append_text").innerText;
    document.getElementById("append_text").innerText = "";
    var exist_text = document.getElementById("message_content").innerText;
    document.getElementById("message_content").innerText =
      exist_text + append_text;
    console.log("total message", exist_text + append_text);
    var message = document.getElementById("message_content").innerText;
    console.log("message", message);
    console.log("message length", message.length);
    placeCaretAtEnd(document.getElementById("message_content"));
  }
  if (keyCode == 13) {
    send_mesg();
    placeCaretAtEnd(document.getElementById("message_content"));
  }
});
$(document).on("keyup", "#message_content", function (e) {
  if (e.which != 16) {
    console.log("e", e.which);
    var append_text = "";
    if (document.getElementById("append_text") === null) {
      console.log("append_text not found");
      var div_element = document.getElementById("message_content");
      var span_element = document.createElement("span");
      span_element.id = "append_text";
      div_element.appendChild(span_element);
      if (document.getElementById("append_text") === null) {
        console.log("append_text not found 2");
      } else {
        console.log("found");
      }
    } else {
      console.log("found 1");
    }
    document.getElementById("append_text").innerHTML = "";
    var message = document.getElementById("message_content").innerText;
    console.log(message);
    // message = message.replace('<span id="append_text"></span>','');
    console.log("message", message);
    if (message != "") {
      for (var i = 0; i < temp.length; i++) {
        console.log("template", temp[i]);
        if (temp[i].indexOf(message) === 0) {
          var append_text = temp[i].replace(message, "");
          // document.getElementById("append_text").style.color = "#D4D3D3"
          document.getElementById("append_text").innerHTML = append_text;
          console.log(
            "append_text",
            document.getElementById("append_text").innerHTML
          );
          break;
        }
      }
    } else {
      document.getElementById("append_text").innerText = "";
    }
  }
});

function click_to_call() {
  switch (localStorage["crm_type"]) {
    case "one":
      // statements_1
      break;
    default:
      onLoad();
      break;
  }
}
function placeCaretAtEnd(el) {
  el.focus();
  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

function onLoad(domain_url) {
  console.log(domain_url);
  if (crm.indexOf(domain_url) > -1 && domain_url != "") {
    var re = /(\d*[/ . ()-]*[0-9][0-9][0-9][/ . ()-]*[0-9][0-9][0-9][/ . ()-]*[0-9][0-9][0-9][0-9][ ]*)/g;
    var regs;
    console.log("onLoad function is called");
    if (crm.indexOf("crmplus.zoho.com") > -1) {
      var iframe = document.querySelector("#crmLoadFrame");
      console.log("iframe", iframe);
      var iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      var iframeContent =
        iframeDocument.getElementById("fullInfoDiv") ||
        iframeDocument.getElementById("bcWraperDiv") ||
        iframeDocument.getElementById("lvTred") ||
        iframeDocument.getElementById("listviewtablescroll");
      console.log("frame content", iframeContent);
      var walker = document.createTreeWalker(
        iframeContent,
        NodeFilter.SHOW_TEXT,
        function (node) {
          // console.log("NodeFilter SHOW_TEXT ",node.textContent);
          if ((regs = re.exec(node.textContent))) {
            //  console.log("re.exec(node.textContent) ");
            // make sure the text nodes parent doesnt have an attribute we add to know its allready been highlighted
            if (!node.parentNode.classList.contains("highlighted_text")) {
              console.log("no highlighted text found", regs);
              textfound = true;
              var match = document.createElement("button");
              //match.href = '#';
              match.style.background = "none";
              match.style.border = "none";
              match.style.visibility = "visible";
              match.style.color = "blue";
              match.style.cursor = "pointer";
              match.id = regs[0];
              match.appendChild(document.createTextNode(regs[0]));

              match.onclick = "return false";
              //console.log("NUM"+this.text);
              //// match.addEventListener("click", function(){alert('clicked')}, false)
              match.addEventListener("click", function () {
                console.log("click to call", this.id);
                sendnumber(this.id);
              });

              // add an attribute so we know this element is one we added
              // Im using a class so you can target it with css easily

              match.classList.add("highlighted_text");
              console.log("Adding class highlighted_Text");

              var after = node.splitText(regs.index);
              after.nodeValue = after.nodeValue.substring(regs[0].length);
              node.parentNode.insertBefore(match, after);
            }
          }
          return NodeFilter.FILTER_SKIP;
        },
        false
      );
      walker.nextNode();
      if (textfound == true) {
        console.log("End of highlighting");
      } else {
        console.log("Recursion");
        // load_completed();
      }
      var iframeContent1 =
        iframeDocument.getElementById("bcWraperDiv") ||
        iframeDocument.getElementById("lvTred");
      console.log("frame content", iframeContent1);
      var walker = document.createTreeWalker(
        iframeContent1,
        NodeFilter.SHOW_TEXT,
        function (node) {
          // console.log("NodeFilter SHOW_TEXT ",node.textContent);
          if ((regs = re.exec(node.textContent))) {
            //  console.log("re.exec(node.textContent) ");
            // make sure the text nodes parent doesnt have an attribute we add to know its allready been highlighted
            if (!node.parentNode.classList.contains("highlighted_text")) {
              console.log("no highlighted text found", regs);
              textfound = true;
              var match = document.createElement("button");
              //match.href = '#';
              match.style.background = "none";
              match.style.border = "none";
              match.style.visibility = "visible";
              match.style.color = "blue";
              match.style.cursor = "pointer";
              match.id = regs[0];
              match.appendChild(document.createTextNode(regs[0]));

              match.onclick = "return false";
              //console.log("NUM"+this.text);
              //// match.addEventListener("click", function(){alert('clicked')}, false)
              match.addEventListener("click", function () {
                console.log("click to call", this.id);
                sendnumber(this.id);
              });

              // add an attribute so we know this element is one we added
              // Im using a class so you can target it with css easily

              match.classList.add("highlighted_text");
              console.log("Adding class highlighted_Text");

              var after = node.splitText(regs.index);
              after.nodeValue = after.nodeValue.substring(regs[0].length);
              node.parentNode.insertBefore(match, after);
            }
          }
          return NodeFilter.FILTER_SKIP;
        },
        false
      );
    } else {
      var walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        function (node) {
          // console.log("NodeFilter SHOW_TEXT ",node.textContent);
          if ((regs = re.exec(node.textContent))) {
            //  console.log("re.exec(node.textContent) ");
            // make sure the text nodes parent doesnt have an attribute we add to know its allready been highlighted
            if (!node.parentNode.classList.contains("highlighted_text")) {
              console.log("no highlighted text found", regs);
              textfound = true;
              var match = document.createElement("button");
              //match.href = '#';
              match.style.background = "none";
              match.style.border = "none";
              match.style.visibility = "visible";
              match.style.color = "blue";
              match.style.cursor = "pointer";
              match.id = regs[0];
              match.appendChild(document.createTextNode(regs[0]));

              match.onclick = "return false";
              //console.log("NUM"+this.text);
              //// match.addEventListener("click", function(){alert('clicked')}, false)
              match.addEventListener("click", function (e) {
                e.stopPropagation();
                console.log("click to call", this.id);
                sendnumber(this.id);
              });

              // add an attribute so we know this element is one we added
              // Im using a class so you can target it with css easily

              match.classList.add("highlighted_text");
              console.log("Adding class highlighted_Text");

              var after = node.splitText(regs.index);
              after.nodeValue = after.nodeValue.substring(regs[0].length);
              node.parentNode.insertBefore(match, after);
            }
          }
          return NodeFilter.FILTER_SKIP;
        },
        false
      );
    }

    // Make the walker step through the nodes
    walker.nextNode();
    if (textfound == true) {
      console.log("End of highlighting");
    } else {
      console.log("Recursion");
      load_completed();
    }
  }
}
function sendnumber(number) {
  console.log("Sdsds", number);
  // if(typeof chrome.runtime.isInstalled!=='undefined'){
  console.log("INSTALLED");
  chrome.runtime.sendMessage({ action: "check_action", data: { num: number } });
  // }
}
function load_completed() {
  chrome.runtime.sendMessage({
    action: "check_highlight",
    data: { url: window.location.href },
  });
}

(function () {
  document.addEventListener("DOMContentLoaded", load_completed);
  //document.addEventListener("DOMSubtreeModified", load_completed);
  textfound = false;
  console.log("Load of content completed");
})();
window.onload = function () {
  console.log("It's loaded!");
};
window.addEventListener("hashchange", doThisWhenTheHashChanges, false);
function doThisWhenTheHashChanges() {
  //console.log("hashchange url:"+ window.location.href);
  chrome.runtime.sendMessage({
    action: "check_highlight",
    data: { url: window.location.href },
  });
  textfound = false;
  hashcontrol = false;
}
