chrome.runtime.onInstalled.addListener(function (details) {
    var profileList = {
        LUOGU: "https://www.luogu.org/problemnew/show/${number}",
        POJ: "http://poj.org/problem?id=${number}",
        BZOJ: "https://www.lydsy.com/JudgeOnline/problem.php?id=${number}",
        LOJ: "https://loj.ac/problem/${number}",
    };
    chrome.storage.sync.get({ "profileList": {} }, function (item) {
        chrome.storage.sync.set({ "profileList": profileList });
    });
    chrome.tabs.create({
        url: `chrome-extension://${chrome.i18n.getMessage("@@extension_id")}/options.html`
    });
})