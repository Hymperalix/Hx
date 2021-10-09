//  *-----------*
//  | VARIABLES |
//  *-----------*
var twitch_var = {
  regex_check: /^https?:\/\/www\.twitch\.tv/,
  // regex_check: /^https?:\/\/www\.twitch\.tv\/(?!videos)/,
  prime: undefined
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

  twitch_var.prime = setInterval(function () {
    if (!!$('.top-nav__prime')) {
      clearInterval(twitch_var.prime)
      $('.top-nav__prime').hide()
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
