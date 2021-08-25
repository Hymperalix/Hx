//  *-----------*
//  | VARIABLES |
//  *-----------*
var outlook_var = {
  regex_check: /^https?:\/\/outlook\.live\.com\/mail\/0/,
  icon: { Inbox: '', Blocked: '', Edit: '', Send: '', Clock: '', Delete: '', Archive: '', QuickNote: '', FabricFolder: '', ChevronDownMed: '', ChevronRightMed: '' },
  load: undefined,
  hide_ads: undefined,
  update_unread: undefined,
  unread_visible: true
}
    
//  *----------*
//  | ELEMENTS |
//  *----------*
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
            <span class="_3UWhBRVAO2ks8fdt9JhiHS __Hx-outlook__unread-counter"></span>
          </span>
        </span>
      </div>
      <div class="__Hx-outlook__unread-list" style="display: none;">
      </div>
    </div>
    `.trim().replace(/\n/g, ' '),
    item: `
    <div draggable="true">
      <div class="_2f5JzhIau1fYVnCdnF6jed tZzTXpTvwdvH3pIUj1Bf2 __Hx-outlook__unread-list-item UNREAD_CLASS" data-is-focusable="true" title="UNREAD_TITLE" path="UNREAD_PATH" role="treeitem" aria-selected="false" aria-level="2" tabindex="-1" style="padding-left: 0px; padding-right: 28px;">
        <i data-icon-name="UNREAD_ICON_N" aria-hidden="true" class="_3xjtFZiBm1DrWK64r3hZWK _2D6wm1spPIPn1G8mum7M8h root-62">UNREAD_ICON_I</i>
        <span class="_3fLh9Wjn6GR68OwcUckdM0 tZzTXpTvwdvH3pIUj1Bf2 _1rX29KCSBR1YStlzdbNbZ2">UNREAD_TITLE</span>
        <span class="_3rASdLVQxHgpaejCMPDNFO">
          <span class="_270bLwFzcvsBtW0L5wgZCz _2dyDdCD431x294iM624xHn _3UWhBRVAO2ks8fdt9JhiHS">
            <span class="_3UWhBRVAO2ks8fdt9JhiHS">UNREAD_TOTAL</span>
            <span class="screenReaderOnly">unread</span>
          </span>
        </span>
      </div>
    </div>
    `.trim().replace(/\n/g, ' ')
  }
}

//  *-----------*
//  | FUNCTIONS |
//  *-----------*
function loadOutlook () { console.log('[loadOutlook]')
  if ($('.__Hx__loading-body').length === 0) { console.log('[(Outlook) Add Loading]')
    $('body').append(hx_elem.loading.replace(/PAGE/g, 'outlook'))
  }
  $('.__Hx__loading-body').show()

  hideOutlookADs()

  if ($('._24FpkalvW30l66zFUdkI8G').length === 0) {
    outlook_var.load = setInterval(function () {
      if ($('._24FpkalvW30l66zFUdkI8G').length > 0) {
        clearInterval(outlook_var.load)
        loadOutlookUnreadBody('[FIRST]')
      }
    }, 200)
  } else {
    loadOutlookUnreadBody('[SECOND]')
  }

  clearInterval(outlook_var.update_unread)
  outlook_var.update_unread = setInterval(function () {
    loadOutlookUnreadBody('[TIMED]')
  }, 2000)
}

function hideOutlookADs () {
  clearInterval(outlook_var.hide_ads)
  outlook_var.hide_ads = setInterval(function () {
    if ($('._1fti_QgAzqGWPGlqh_FSvI').length > 0 && $('._28ithXDZzMqSN0YAG2rCVn').length > 0) { console.log('[(Outlook) Hide ADs]')
      clearInterval(outlook_var.hide_ads)
      $('._1fti_QgAzqGWPGlqh_FSvI').hide();$('._28ithXDZzMqSN0YAG2rCVn').hide()
    }
  }, 200)
}

function loadOutlookUnreadBody (type) {
  console.log('[(Outlook) Load Unread Body]')
  $('.__Hx__loading-body').show()

  $('.__Hx-outlook__unread').remove()
  $('._1PkXPyxM3Hhk5H6YNvwMa1.tZzTXpTvwdvH3pIUj1Bf2').first().parent().before(outlook_el.unread.body)
  if(outlook_var.unread_visible) { $('.__Hx-outlook__unread-list').show() } else { $('.__Hx-outlook__unread-list').hide() }
  $('.__Hx-outlook__unread-title').attr('aria-expanded', (outlook_var.unread_visible).toString())
  $('.__Hx-outlook__unread-title button span i').attr('data-icon-name', outlook_var.unread_visible ? 'ChevronDownMed' : 'ChevronRightMed').html(outlook_var.unread_visible ? outlook_var.icon['ChevronDownMed'] : outlook_var.icon['ChevronRightMed'])

  $('.__Hx-outlook__unread-title').on('click', function (e) {
    outlook_var.unread_visible = ($('.__Hx-outlook__unread-title').attr('aria-expanded') == "false" ? true : false)
    $('.__Hx-outlook__unread-list').is(":visible") ? $('.__Hx-outlook__unread-list').hide() : $('.__Hx-outlook__unread-list').show()
    $('.__Hx-outlook__unread-title').attr('aria-expanded', outlook_var.unread_visible)
    $('.__Hx-outlook__unread-title button span i').attr('data-icon-name', $('.__Hx-outlook__unread-title button span i').attr('data-icon-name') == 'ChevronDownMed' ? 'ChevronRightMed' : 'ChevronDownMed').html(outlook_var.icon[$('.__Hx-outlook__unread-title button span i').attr('data-icon-name')])
  })
  $('.__Hx-outlook__unread-title').on("contextmenu",function(){ return false; });

  loadOutlookUnreadItems()

  $('.__Hx__loading-body').hide()
}

function loadOutlookUnreadItems () {
  var unread_total = 0
  var unread_item = ''
  $('.__Hx-outlook__unread-list').html('')
  $.each($('._1PkXPyxM3Hhk5H6YNvwMa1.tZzTXpTvwdvH3pIUj1Bf2[title="Folders"]').parent().siblings().children().children().filter(function (i, el) { return ($(el).siblings().first().attr('data-icon-name') != 'QuickNote' && $(el).children().hasClass('_3UWhBRVAO2ks8fdt9JhiHS')) }), function( i, el ) {
    let el_title = $(el).parent().attr('title')
    let el_icon = $(el).siblings().first().attr('data-icon-name') || 'FabricFolder'
    let el_icon_i = outlook_var.icon[el_icon]
    let el_total = $(el).children().first().children().first().html()
    let el_highlight = ($(el).parent().hasClass('_2e45YSYkafAibqL8u3c2wj') ? '_2e45YSYkafAibqL8u3c2wj' : '')
    let el_path = getOutlookItemPath($($(el).parent()[0])) + el_title

    unread_item = outlook_el.unread.item
    .replace(/UNREAD_TITLE/g, el_title)
    .replace(/UNREAD_ICON_N/g, el_icon)
    .replace(/UNREAD_ICON_I/g, el_icon_i)
    .replace(/UNREAD_TOTAL/g, el_total)
    .replace(/UNREAD_CLASS/g, el_highlight)
    .replace(/UNREAD_PATH/g, el_path)
    
    $('.__Hx-outlook__unread-list').append(unread_item)
    $('[path="' + el_path + '"]').on('click', function (e) {
      $(el).click()
    })
    unread_total += el_total !== '' ? parseInt(el_total) : 0
  });
  
  $('.__Hx-outlook__unread-list-item').on("contextmenu",function(){ return false; });
  $('.__Hx-outlook__unread-counter').html(unread_total)
}

function getOutlookItemPath (el) {
  var title = ''
  var aria_level = parseInt(el.attr('aria-level'))
  var prev_el = el.parent().prev().children().first()  
  while (aria_level > 2) {
    if (parseInt(prev_el.attr('aria-level')) < aria_level) {
      title = prev_el.attr('title') + ' > ' + title
      aria_level--
    } else {
      prev_el = prev_el.parent().prev().children().first()
    }
  }
  return title
}

//  *---------*
//  | ON LOAD |
//  *---------*
chrome.runtime.onMessage.addListener(function(msg) {
  if (msg === 'page-rendered') {
    if (outlook_var.regex_check.test(document.location.href)) { console.log('[(Outlook) page-rendered]')
      loadOutlook()
    }
  }
})
  
if (outlook_var.regex_check.test(document.location.href))
  loadOutlook()
