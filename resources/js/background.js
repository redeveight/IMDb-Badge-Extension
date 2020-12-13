'use strict';

let current_year = new Date().getFullYear();

chrome.runtime.onInstalled.addListener(async function() {
    chrome.storage.sync.set({username: 'ur00000001'}, function() {
      console.log("Default username saved");
    });

    /*for (let i = 2005; i <= current_year + 1; i++) {
      let key = "Highlights-" + i;
      localStorage.setItem(key, "default");
    }
    for (let i = 1996; i <= current_year + 1; i++) {
      let key = "Top 250-" + i;
      localStorage.setItem(key, "default");
    }*/
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'www.imdb.com'},
    })
    ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});