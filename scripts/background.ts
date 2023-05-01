chrome.runtime.onInstalled.addListener(() => {

    const menuId = "yt-open-standalone";
    chrome.contextMenus.create({
        "id": menuId,
        "title": "Open Video Alone",
        "contexts": ["link"],
        targetUrlPatterns: ["https://www.youtube.com/watch*"]
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId = menuId) {
            const [url, query] = info.linkUrl!.split("?") as [string, string?];
            let newUrl = url;
            if (query) {
                const v = query.split("&").find(p => p.startsWith("v="));
                if (v) {
                    newUrl += "?" + v;
                }
            }
            chrome.tabs.create({
                url: newUrl,
                active: true,
            });
        }
    });
});