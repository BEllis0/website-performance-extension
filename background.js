// handle fetch request
const fetchPageReport = (url, waitTime) => {
    return new Promise((resolve, reject) => {
        
        fetch(`https://lighthouse-report-files.herokuapp.com/api/reports/all?url=${url}`)
        //.then(response => response.blob())
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                console.log('page performance error response: ', response)
                reject({message: 'Error occured, please try again in a few seconds'});
            }
        })
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            console.log('Error getting Lighthouse data: ', err);
            reject({message: "Error fetching data", error: err});
        });
    });
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // if message has a url
    if (message.url) {
        fetchPageReport(message.url)
            .then(data => {
                // create  xlsx file with the blob data and download
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `lighthouse-report-${message.url}.xlsx`);
                document.body.appendChild(link);
                link.click();
                sendResponse({message: "Download successful"});
            })
            .catch(err => {
                console.log('Error from fetchpagereport: ', err);
                sendResponse(err);
            });
    }
    return true;
});