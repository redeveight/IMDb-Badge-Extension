'use strict';

let current_year = new Date().getFullYear();
let lists = { "Highlights": 1, "Top 250": 2 };

chrome.runtime.onInstalled.addListener(function() {
    alert(current_year);
    chrome.storage.sync.set({username: 'ur00000001'}, function() {
      console.log("Default username saved");
    });
    for (let i = 2005; i < current_year + 1; i++) {
      let key = lists[1] + '-' + i;
      chrome.storage.sync.set({key: -1});
    }
    for (let i = 1996; i < current_year + 1; i++) {
      let key = lists[2] + '-' + i;
      chrome.storage.sync.set({key: -1});
    }
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