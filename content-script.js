//  *-----------*
//  | VARIABLES |
//  *-----------*
var outlook_var = {
  regex_check: /^https?:\/\/outlook\.live\.com\/mail\/0\/inbox/,
  icon: { Inbox: '', Blocked: '', Edit: '', Send: '', Clock: '', Delete: '', Archive: '', QuickNote: '', FabricFolder: '', ChevronDownMed: '', ChevronRightMed: '' },
  list: []
}
var twitch_var = {
  regex_check: /^https?:\/\/www\.twitch\.tv\/(?!videos)/
}

//  *----------*
//  | ELEMENTS |
//  *----------*
var hx_elem = {
  loading: `<div class="__Hx__loading-body"><div class="__Hx__loading-ring __Hx-PAGE__loading-ring"></div></div>`
}

var outlook_el = {
  unread: {
    body: `
    <div class="_24FpkalvW30l66zFUdkI8G __Hx-outlook__unread" role="tree">
      <div class="_1PkXPyxM3Hhk5H6YNvwMa1 tZzTXpTvwdvH3pIUj1Bf2 _24FpkalvW30l66zFUdkI8G __Hx-outlook__unread-title" data-is-focusable="true" title="Unread" role="treeitem" aria-expanded="false" aria-level="1" aria-setsize="3" aria-posinset="1" tabindex="0" style="padding-left: 0px; padding-right: 28px;">
        <button type="button" data-is-focusable="false" tabindex="-1" class="ms-Button ms-Button--icon _3Tc12ptS8HtxbTLAGzivrO _13eMs9pGc0Ag2XqdlzNGl1 root-59" role="button" aria-hidden="true">
          <span class="ms-Button-flexContainer flexContainer-47" data-automationid="splitbuttonprimary">
            <i data-icon-name="ChevronRightMed" aria-hidden="true" class="ms-Button-icon _3xjtFZiBm1DrWK64r3hZWK tZzTXpTvwdvH3pIUj1Bf2 _2D6wm1spPIPn1G8mum7M8h flipForRtl icon-61 __Hx-outlook__unread-icon"></i>
          </span>
        </button>
        <span class="_3fLh9Wjn6GR68OwcUckdM0 tZzTXpTvwdvH3pIUj1Bf2 _1rX29KCSBR1YStlzdbNbZ2">Unread</span>
        <span class="_3rASdLVQxHgpaejCMPDNFO">
          <span class="_270bLwFzcvsBtW0L5wgZCz _2dyDdCD431x294iM624xHn _3UWhBRVAO2ks8fdt9JhiHS">
            <span class="_3UWhBRVAO2ks8fdt9JhiHS __Hx-outlook__unread-counter">2</span>
          </span>
        </span>
      </div>
      <div class="__Hx-outlook__unread-list">
      </div>
    </div>
    `.trim().replace(/\n/g, ' '),
    item: `
    <div draggable="true">
      <div class="_2f5JzhIau1fYVnCdnF6jed tZzTXpTvwdvH3pIUj1Bf2" data-is-focusable="true" title="UNREAD_TITLE" role="treeitem" aria-selected="false" aria-level="2" tabindex="-1" style="padding-left: 0px; padding-right: 28px;">
        <i data-icon-name="UNREAD_ICON" aria-hidden="true" class="_3xjtFZiBm1DrWK64r3hZWK _2D6wm1spPIPn1G8mum7M8h root-62">UNREAD_ICON_I</i>
        <span class="_3fLh9Wjn6GR68OwcUckdM0 tZzTXpTvwdvH3pIUj1Bf2 _1rX29KCSBR1YStlzdbNbZ2">UNREAD_TITLE</span>
        <span class="_3rASdLVQxHgpaejCMPDNFO"/>
      </div>
    </div>
    `.trim().replace(/\n/g, ' ')
  }
}

//  *----------------*
//  | LOAD FUNCTIONS |
//  *----------------*
function loadOutlook () {
	console.log('loadOutlook')
  $('body').append(hx_elem.loading.replace(/PAGE/g, 'outlook'))
	let checkOutlook = setInterval(function () {
		if ($('._1fti_QgAzqGWPGlqh_FSvI').length > 0 && $('._28ithXDZzMqSN0YAG2rCVn').length > 0 && $('._24FpkalvW30l66zFUdkI8G').length > 0) {
			clearInterval(checkOutlook)
      $('._1fti_QgAzqGWPGlqh_FSvI').hide();$('._28ithXDZzMqSN0YAG2rCVn').hide()

      //$('._1PkXPyxM3Hhk5H6YNvwMa1.tZzTXpTvwdvH3pIUj1Bf2[title="Folders"]').parent().siblings()

      // $('._1PkXPyxM3Hhk5H6YNvwMa1.tZzTXpTvwdvH3pIUj1Bf2[title="Folders"]').parent().siblings().children().children().filter(function (i, el) { return ($(el).siblings().first().attr('data-icon-name') != 'QuickNote' && $(el).children().hasClass('_3UWhBRVAO2ks8fdt9JhiHS')) }).each((i) => {
      //     outlook_var.list.push($(this))
      // })

      loadOutlookUnreadItems()
      console.log(outlook_var.list)
      
      $('._1PkXPyxM3Hhk5H6YNvwMa1.tZzTXpTvwdvH3pIUj1Bf2').first().parent().before(outlook_el.unread.body)
      $('.__Hx-outlook__unread-list').hide()
      $('.__Hx-outlook__unread-title').on('click', function (e) {
        $('.__Hx-outlook__unread-list').is(":visible") ? $('.__Hx-outlook__unread-list').hide() : $('.__Hx-outlook__unread-list').show()
        $('.__Hx-outlook__unread-title').attr('aria-expanded', ($('.__Hx-outlook__unread-title').attr('aria-expanded') == "false" ? true : false))
        $('.__Hx-outlook__unread-title button span i').attr('data-icon-name', $('.__Hx-outlook__unread-title button span i').attr('data-icon-name') == 'ChevronDownMed' ? 'ChevronRightMed' : 'ChevronDownMed')
        $('.__Hx-outlook__unread-title button span i').html(outlook_var.icon[$('.__Hx-outlook__unread-title button span i').attr('data-icon-name')])
      })

      $('.__Hx__loading-body').hide()
		}
	}, 200)
}
function loadTwitch () {
	console.log('loadTwitch')
	setInterval(function () {
		if (!!$('[aria-label="Claim Bonus"]')) {
			$('[aria-label="Claim Bonus"]').click()
		}
	}, 200)
}

//  *-----------*
//  | FUNCTIONS |
//  *-----------*
function loadOutlookUnreadItems () {
  outlook_var.list = []
  var unread_list = ''
  $.each($('._1PkXPyxM3Hhk5H6YNvwMa1.tZzTXpTvwdvH3pIUj1Bf2[title="Folders"]').parent().siblings().children().children().filter(function (i, el) { return ($(el).siblings().first().attr('data-icon-name') != 'QuickNote' && $(el).children().hasClass('_3UWhBRVAO2ks8fdt9JhiHS')) }), function( i, el ) {
    console.log('[BEGIN]-------------------------')
    let item = {
      el: $(el).parent(),
      title: getOutlookItemTitle($($(el).parent()[0]))
    }
    outlook_var.list.push(item)
    // console.log($($(el).parent()[0]))

    // console.log($($(el).parent()[0]).attr('aria-level'))
    // console.log($($(el).parent()[0]).parent().prev().children().first())
    // console.log($($(el).parent()[0]).parent().prev().children().first().attr('aria-level'))

    // console.log($($(el).parent()[0]).prev().attr('aria-level'))
    // console.log(.attr('aria-level'))
    //unread_list += outlook_el.unread.item.replace()
    console.log('[END]-------------------------')
  });
}

function getOutlookItemTitle (el) {
  var title = ''
  var aria_level = el.attr('aria-level')
  var prev_el = el.parent().prev().children().first()
  console.log(aria_level)
  // while (aria_level > 1) {
  //   if (prev_el) {
  //     aria_level--
  //   }
  // }
  // title = getOutlookItemName() + title
  return ''
}

async function hx_sql (query, args) {
  // args = args || {}

  // return await axios.post('URL', {
    // sql: query,
    // args: args
  // }, {
    // headers: {
      // Authorization: 'Bearer XXXXXXXXXXXXXXXXXXXXXXXX'
    // }
  // }).then(function (res) { return res.data }).catch(function (err) {})
}


//  *---------*
//  | ON LOAD |
//  *---------*
chrome.runtime.onMessage.addListener(function(msg) {
  if (msg === 'page-rendered') {
    if (outlook_var.regex_check.test(document.location.href))
      loadOutlook()
	else if (twitch_var.regex_check.test(document.location.href))
      loadTwitch()
  }
})

if (outlook_var.regex_check.test(document.location.href))
  loadOutlook()
else if (twitch_var.regex_check.test(document.location.href))
  loadTwitch()
