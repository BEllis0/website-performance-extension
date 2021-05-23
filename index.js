// Wait until DOM is ready
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
};
  
ready(() => {
    console.log(window)

    // event listener for submit button
    document.getElementById("submitBtn").addEventListener('click', () => {

        chrome.tabs.executeScript({
            code: 'chrome.runtime.sendMessage({url: window.location.href}, function(response) { console.log("response in index.js", response) });'
        });
    });
    
});