let profileList = {};
chrome.storage.sync.get({ "profileList": {} }, function(item) {
    profileList = item["profileList"];
})

String.prototype.render = function (context) {
  return this.replace(/\${(.*?)}/g, (match, key) => context[key.trim()]);
};

function parse(number) {
    let indexOfSpace = number.indexOf(" ");
    if (indexOfSpace === -1) {
        return null;
    }
    numberObject = {
        onlineJudgeName: number.substring(0, indexOfSpace),
        problemNumber: number.substring(indexOfSpace + 1, number.length)
    };
    if (profileList[numberObject.onlineJudgeName.toUpperCase()] === undefined || isNaN(Number(numberObject.problemNumber))) {
        return null;
    }
    return numberObject;
}

document.getElementById("mainForm").onsubmit = function (e) {
    let number = document.getElementById("numbering").value;
    let numberObject = parse(number);
    if (numberObject !== null) {
        if (profileList[numberObject.onlineJudgeName.toUpperCase()] !== undefined) {
            let number = numberObject.problemNumber;
            chrome.tabs.create({
                url: profileList[numberObject.onlineJudgeName.toUpperCase()].render({ number: number })
            });
            return true;
        }
    }
    document.getElementById("numbering").value = "格式错误";
    document.getElementById("numbering").select();
    return false;
};

document.getElementById("numbering").focus();