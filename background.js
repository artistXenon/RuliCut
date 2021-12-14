const i = setInterval(() => {
    if (window == top) {
        window.addEventListener('keydown', ({ altKey, code }) => {
            const i = ((cd) => {
                const c = /^Digit(\d{1})$/.exec(cd)
                return (c && c[1] && !isNaN(c[1])) ? (parseInt(c[1]) - 1) : -1
            })(code)
            if (altKey && i > -1) chrome.runtime.sendMessage(undefined, i)
        }, false)
        clearInterval(i)
    }    
}, 1000)
