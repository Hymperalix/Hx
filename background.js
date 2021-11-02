var outlook = /^https?:\/\/outlook\.live\.com\/mail\/?/
var twitch = /^https?:\/\/www\.twitch\.tv/
//var twitch = /^https?:\/\/www\.twitch\.tv\/(?!videos)/
//var rxLookfor_list = /^https?:\/\/agirsupport\.freshdesk\.com\/a\/tickets\/filters\/.+/

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  // if (rxLookfor.test(changeInfo.url) || rxLookfor_list.test(changeInfo.url)) {
  if (outlook.test(changeInfo.url) || twitch.test(changeInfo.url)) {
    chrome.tabs.sendMessage(tabId, 'page-rendered')
  }
})