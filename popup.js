let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    /*chrome.tabs.update({
      url: "https://www.imdb.com/badge/"
    });*/

    /*chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    });*/
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {file: 'inject.js'});
    });
  };