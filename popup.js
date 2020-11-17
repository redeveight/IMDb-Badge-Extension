let url = "https://www.imdb.com/badge/";
let text_field = document.getElementById('text_field');
let status = document.getElementById('status');
let user_id_regex = /^ur[0-9]{8}$/;

chrome.storage.sync.get('username', function(data) {
  text_field.value = data.username;
});

async function on_apply_click() {
  let value = text_field.value;
  status.style.visibility = "visible";
  if (value != "") {
    if (user_id_regex.exec(value)) {
      await chrome.storage.sync.set({username: value}, function() {
        console.log("Username updated");
      });

      open_url(url);
    } else {
      status.textContent = "Incorrect user_id";
    }
  } else {
    status.textContent = "user_id required";
  }
}
document.getElementById("btn").onclick = on_apply_click;

function open_url(url) {
  chrome.tabs.getSelected(null, function(tab) {
    if (tab.url != url) {
      chrome.tabs.update({url});
      chrome.tabs.onUpdated.addListener(function (tabId , info) {
        if (info.status === 'complete') {
          execute_script();
        }
      });
    } else {
      execute_script();
    }
  });
}

function execute_script() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'inject.js'}
    );
  });
}