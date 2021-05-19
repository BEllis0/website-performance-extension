chrome.runtime.onInstalled.addListener(function() {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'developer.chrome.com'},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
  });

  // handle fetch request
  chrome.runtime.onMessage.addListener(function(message, sender, onSuccess) {
    console.log('received message: ', message)
    fetch(`https://lighthouse-report-files.herokuapp.com/api/reports/all?url=${message.url}`)
    .then(response => {
      return response.json(response.body);
    })
    .then(data => {
        console.log('data', data)
        onSuccess(response);
    })
    .catch(err => {
      console.log('Error getting Lighthouse data: ', err);
    });
      
    return true;  // Will respond asynchronously.
  }
);