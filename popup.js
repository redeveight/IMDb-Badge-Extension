let url = "https://www.imdb.com/badge/";
var a=0;

async function on_apply_click() {
  a++;
  document.getElementById('demo').textContent = a;

  document.getElementById('demo').textContent = "before";
  open_url(url);
  
}
document.getElementById("btn").onclick = on_apply_click;

function open_url(url) {
  chrome.tabs.getSelected(null, function(tab) {
    if (tab.url != url) {
      chrome.tabs.update({
        url: "https://www.imdb.com/badge/"
      });
      chrome.tabs.onUpdated.addListener(function (tabId , info) {
        if (info.status === 'complete') {
          document.getElementById('demo').textContent = "after";
          /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
              tabs[0].id,
              {file: 'inject.js'});
          });*/
        }
      });
    }
  });
}