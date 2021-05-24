// Wait until DOM is ready
var ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
};
  
ready(() => {

    let state;
    // event listener for submit button
    document.getElementById("submitBtn").addEventListener('click', () => {

        chrome.tabs.executeScript({
            code: `chrome.runtime.sendMessage({url: window.location.href}, function(response) { 
                window.alert("Page Performance Report Extension: " + response.message)
            });`
        });
    });
});