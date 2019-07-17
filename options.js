function refreshList() {
    console.log("refreshing list")
    let profileList = {};
    console.log("getting profiles......")
    chrome.storage.sync.get({ "profileList": {} }, function (item) {
        console.log("got profiles");
        profileList = item["profileList"];
        console.log("profileList = ");
        console.log(profileList);
        let tableBody = $("table#profileListTable>tbody");
        tableBody.find("tr").remove();
        for (let profileName in profileList) {
            if (profileList.hasOwnProperty(profileName)) {
                /*
                let tr = $(`<tr>
                /*
                <td>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select mdl-js-ripple-effect--ignore-events is-upgraded" data-upgraded=",MaterialCheckbox">
                    <input type="checkbox" class="mdl-checkbox__input">
                    <span class="mdl-checkbox__focus-helper"></span>
                    <span class="mdl-checkbox__box-outline">
                        <span class="mdl-checkbox__tick-outline"></span>
                    </span>
                    <span class="mdl-checkbox__ripple-container mdl-js-ripple-effect mdl-ripple--center">
                        <span class="mdl-ripple"></span>
                    </span>
                    </label>
                </td>
                */
                let tr = $(`<tr>
                <td class="mdl-data-table__cell--non-numeric">${profileName}</td>
                <td>${profileList[profileName]}</td>
            </tr>`);
                let td = $("<td></td>");
                let button = $(`<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent delete-button" id="${profileName + "Button"}" _for="${profileName}">删除</button>`);
                button.click(function(e) {
                    console.log(this.getAttribute("_for"));
                    removeProfile(this.getAttribute("_for"));
                });
                td.append(button);
                tr.append(td);
                tableBody.append(tr);
            }
        }
    });
}

function saveProfile(e) {
    console.log("saving profile");
    let profileName = document.getElementById("profileName").value.toUpperCase();
    let urlTemplate = document.getElementById("urlTemplate").value;
    if (profileName === "" || urlTemplate === "") return;
    let profileList = {};
    console.log("getting profiles...")
    chrome.storage.sync.get({ "profileList": {} }, function (item) {
        console.log("got profiles");
        profileList = item["profileList"];
        console.log("profileList = ");
        console.log(profileList);
        profileList[profileName] = urlTemplate;
        chrome.storage.sync.set({ "profileList": profileList }, refreshList)
    });
}

function removeProfile(profileName) {
    let profileList = {};
    chrome.storage.sync.get({ "profileList": {} }, function (item) {
        profileList = item["profileList"];
        delete profileList[profileName];
        chrome.storage.sync.set({ "profileList": profileList }, refreshList);
    });
}

document.addEventListener("DOMContentLoaded", refreshList);
document.getElementById("addProfileForm").addEventListener("submit", saveProfile);
let deleteButtons = $(".delete-button");
for (let button of deleteButtons) {
    button.click(function(e) {
        removeProfile(this._for);
    });
}