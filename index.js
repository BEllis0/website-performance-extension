// Wait until DOM is ready
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
};
  
ready(() => {
    console.log('running')
    // event listener for submit button
    document.getElementById("submitBtn").addEventListener('click', () => {

        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //     chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"}, function(data) {
        
        //     });
        //   });
        console.log(document.url)
        chrome.runtime.sendMessage({url: 'http://www.brandontellis.com'}, null, function(response) {
            console.log('response in index.js', response)
        });
    });

    
});