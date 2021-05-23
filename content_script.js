console.log('in content script')
function modifyDOM(docu) {
    console.log('content script in modify dom: ', docu)
    console.log(docu.url)
    chrome.runtime.sendMessage({url: 'http://www.brandontellis.com'}, function(response) {
        console.log('response in index.js', response)
    });

}

modifyDOM(document);