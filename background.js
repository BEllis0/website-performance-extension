// chrome.runtime.onInstalled.addListener(function() {

//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//         chrome.declarativeContent.onPageChanged.addRules([{
//           conditions: [new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: {hostEquals: 'developer.chrome.com'},
//           })
//           ],
//               actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//       });
// });

// handle fetch request
const fetchPageReport = (url, waitTime) => {
    return new Promise((resolve, reject) => {
        waitTime = waitTime || 0;
        console.log('wait time: ', waitTime)
        setTimeout(function() {
            fetch(`https://lighthouse-report-files.herokuapp.com/api/reports/all?url=${url}`)
            //.then(response => response.blob())
            .then(data => {
                resolve(data);
            })
            .catch(err => {
                console.log('Error getting Lighthouse data: ', err);
                reject(err);
            });
        }, waitTime);
    });
};

chrome.runtime.onMessage.addListener(function(message, sender, onSuccess) {
    // if message has a url
    if (message.url) {
        console.log('on success: ', onSuccess, onSuccess('jeff'))
        fetchPageReport(message.url)
            .then(response => {
                if (response.ok === false) {
                    // rerun api call
                    console.log('response was false');
                    fetchPageReport(message.url, 5000)
                        .then(res => {
                            console.log('second res after waiting', res);
                            return res.blob();
                        })
                        .catch(error => {
                            console.log('Error in second fetch request', error);
                        });
                } else {
                    // return blob
                    console.log('data from fetchpagereport: ', response);
                    return response.blob();
                }
            })
            .then(data => {
                // create  xlsx file with the blob data and download
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `lighthouse-report-${message.url}.xlsx`);
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                console.log('Error from fetchpagereport: ', err);
            });
    }
});