//  *-----------*
//  | VARIABLES |
//  *-----------*
var twitch_var = {
  regex_check: /^https?:\/\/www\.twitch\.tv\/(?!videos)/
}

//  *----------------*
//  | LOAD FUNCTIONS |
//  *----------------*
function loadTwitch () { console.log('[loadTwitch]')
	setInterval(function () {
		if (!!$('[aria-label="Claim Bonus"]')) {
			$('[aria-label="Claim Bonus"]').click()
		}
	}, 1000)
}

//  *---------*
//  | ON LOAD |
//  *---------*
chrome.runtime.onMessage.addListener(function(msg) {
  if (msg === 'page-rendered') {
    if (twitch_var.regex_check.test(document.location.href)) { console.log('[(Twitch) page-rendered]')
      loadTwitch()
    }
  }
})

if (twitch_var.regex_check.test(document.location.href))
  loadTwitch()
