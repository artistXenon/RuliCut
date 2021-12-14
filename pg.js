chrome.runtime.onMessage.addListener((message) => {
    chrome.bookmarks.getTree((t) => {
        const o = t[0]['children'][0]['children'][message]
        if (o.url) chrome.tabs.create({ url: o.url })
    })
})