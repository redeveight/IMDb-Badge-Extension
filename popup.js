var a=0;

function on_apply_click() {
  a++;
  document.getElementById('demo').textContent = a;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'inject.js'});
  });
}
document.getElementById("btn").onclick = on_apply_click;


/*document.getElementById("changeColor").addEventListener("click", myFunction);

function myFunction() {
  document.getElementById("changeColor").innerHTML = "YOU CLICKED ME!";
  console.log("Hello");
}*/

//let url = "https://www.imdb.com/badge/";

/*chrome.storage.sync.get('color', function(data) {
  //apply_button.setAttribute('value', data.color);
});*/

//button.onclick = function(element) {
  /*chrome.tabs.getSelected(null,function(tab) {
    if (tab.url != url) {
      await chrome.tabs.update({
        url: "https://www.imdb.com/badge/"
      });
    }
  });*/

  //let color = element.target.value;
  /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'inject.js'});
  });*/
//};

/*changeColor.addEventListener('click', function() {
  console.log("Hello");
});*/