function refreshList() {
    let profileList = {};
    chrome.storage.sync.get({ "profileList": {} }, function (item) {
        profileList = item["profileList"];
        let tableBody = $("table#profileListTable>tbody");
        tableBody.find("tr").remove();
        for (let profileName in profileList) {
            if (profileList.hasOwnProperty(profileName)) {
                let tr = $(`<tr>
                <td class="mdl-data-table__cell--non-numeric">${profileName}</td>
                <td>${profileList[profileName]}</td>
            </tr>`);
                let td = $("<td></td>");
                let button = $(`<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent delete-button" id="${profileName + "Button"}" _for="${profileName}">删除</button>`);
                button.click(function(e) {
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
    let profileName = document.getElementById("profileName").value.toUpperCase();
    let urlTemplate = document.getElementById("urlTemplate").value;
    if (profileName === "" || urlTemplate === "") return;
    let profileList = {};
    chrome.storage.sync.get({ "profileList": {} }, function (item) {
        profileList = item["profileList"];
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