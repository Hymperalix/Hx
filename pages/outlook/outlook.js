//  *-----------*
//  | VARIABLES |
//  *-----------*
var outlook_var = {
  regex_check: /^https?:\/\/outlook\.live\.com\/mail\/?/,
  icon: { Inbox: '', Blocked: '', Edit: '', Send: '', Clock: '', Delete: '', Archive: '', QuickNote: '', FabricFolder: '', ChevronDownMed: '', ChevronRightMed: '' },
  load: undefined, hide_ads: undefined, update_unread: undefined,
  unread_visible: true, unread_loaded: false,
  items_length: 0
}
    
//  *----------*
//  | ELEMENTS |
//  *----------*
var outlook_el = {
  unread: {
    body: `
    <div class="_24FpkalvW30l66zFUdkI8G __Hx-outlook__unread" role="tree">
      <div class="_1PkXPyxM3Hhk5H6YNvwMa1 tZzTXpTvwdvH3pIUj1Bf2 _24FpkalvW30l66zFUdkI8G __Hx-outlook__unread-title" data-is-focusable="true" title="Unread" role="treeitem" aria-expanded="false" aria-level="1" aria-setsize="3" aria-posinset="1" tabindex="0" style="padding-left: 0px; padding-right: 28px;">
        <button type="button" data-is-focusable="false" tabindex="-1" class="ms-Button ms-Button--icon _249vbXlEbh-_Zlg2_z89J3 _3Tc12ptS8HtxbTLAGzivrO __Hx-outlook__unread-button" role="button" aria-hidden="true">
          <span class="ms-Button-flexContainer flexContainer-47" data-automationid="splitbuttonprimary">
            <i data-icon-name="ChevronRightMed" aria-hidden="true" class="ms-Button-icon _3xjtFZiBm1DrWK64r3hZWK _2rLOSdFEKgs3sSzkHAkBbO tZzTXpTvwdvH3pIUj1Bf2 _2D6wm1spPIPn1G8mum7M8h flipForRtl __Hx-outlook__unread-icon"></i>
          </span>
        </button>
        <span class="_3fLh9Wjn6GR68OwcUckdM0 tZzTXpTvwdvH3pIUj1Bf2 _1TiMxaSHmTHs6gdl1bwBCi">Unread</span>
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
      <div class="_2f5JzhIau1fYVnCdnF6jed tZzTXpTvwdvH3pIUj1Bf2 __Hx-outlook__unread-list-item UNREAD_CLASS" data-is-focusable="true" title="UNREAD_TITLE_ATTR" path="UNREAD_PATH" role="treeitem" aria-selected="false" aria-level="2" tabindex="-1" style="padding-left: 0px; padding-right: 28px;">
        <div class="EyQ84bEUGumKAw5-dGNKI">
          <i data-icon-name="UNREAD_ICON_N" aria-hidden="true" class="_3xjtFZiBm1DrWK64r3hZWK tZzTXpTvwdvH3pIUj1Bf2 _3JuADJZrI8MDGlNxg_ila7 _3EcgR4Apr5qv5DWu9VcOog __Hx-outlook__item-icon">UNREAD_ICON_I</i>
        </div>
        <span class="_3fLh9Wjn6GR68OwcUckdM0 tZzTXpTvwdvH3pIUj1Bf2 UNREAD_CLASS">UNREAD_TITLE_SPAN</span>
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
function loadOutlook () { console.log('%c[loadOutlook]', 'background: #222; color: #2E8BC0;');
  if ($('.__Hx__loading-body').length === 0) { console.log('%c[(Outlook) Add Loading]', 'background: #222; color: #2E8BC0;');
    $('body').append(hx_elem.loading.replace(/PAGE/g, 'outlook'));
  }
  $('.__Hx__loading-body').show();

  hideOutlookADs();

  if (!outlook_var.unread_loaded || $('._24FpkalvW30l66zFUdkI8G').length === 0) {
    outlook_var.load = setInterval(function () {
      if ($('._24FpkalvW30l66zFUdkI8G').length > 0) {
        clearInterval(outlook_var.load);
        outlook_var.unread_loaded = true
        loadOutlookUnreadBody('(Load)');
      }
    }, 200)
  } else {
    loadOutlookUnreadBody('(Loaded)');
  }

  clearInterval(outlook_var.update_unread);
  outlook_var.update_unread = setInterval(function () {
    loadOutlookUnreadItems();
  }, 1000);
}

function hideOutlookADs () {
  clearInterval(outlook_var.hide_ads);
  outlook_var.hide_ads = setInterval(function () {
    if ($('._1fti_QgAzqGWPGlqh_FSvI').length > 0 && $('._28ithXDZzMqSN0YAG2rCVn').length > 0) { console.log('%c[(Outlook) Hide ADs]', 'background: #222; color: #2E8BC0;');
      clearInterval(outlook_var.hide_ads);
      $('._1fti_QgAzqGWPGlqh_FSvI').hide();$('._28ithXDZzMqSN0YAG2rCVn').hide();
    }
  }, 200);
}

function loadOutlookUnreadBody (info) { console.log('%c[(Outlook) Load Unread Body ' + info + ']', 'background: #222; color: #2E8BC0;');
  $('.__Hx__loading-body').show();

  if (!$('.__Hx-outlook__unread-title').length) {
    $('._1PkXPyxM3Hhk5H6YNvwMa1.tZzTXpTvwdvH3pIUj1Bf2').first().parent().before(outlook_el.unread.body);
    if (outlook_var.unread_visible) { $('.__Hx-outlook__unread-list').show(); } else { $('.__Hx-outlook__unread-list').hide(); }
    $('.__Hx-outlook__unread-title').attr('aria-expanded', (outlook_var.unread_visible).toString());
    $('.__Hx-outlook__unread-title button span i').attr('data-icon-name', outlook_var.unread_visible ? 'ChevronDownMed' : 'ChevronRightMed').html(outlook_var.unread_visible ? outlook_var.icon['ChevronDownMed'] : outlook_var.icon['ChevronRightMed']);

    $('.__Hx-outlook__unread-title').on('click', function (e) {
      outlook_var.unread_visible = ($('.__Hx-outlook__unread-title').attr('aria-expanded') == "false" ? true : false);
      $('.__Hx-outlook__unread-list').is(":visible") ? $('.__Hx-outlook__unread-list').hide() : $('.__Hx-outlook__unread-list').show();
      $('.__Hx-outlook__unread-title').attr('aria-expanded', outlook_var.unread_visible);
      $('.__Hx-outlook__unread-title button span i').attr('data-icon-name', $('.__Hx-outlook__unread-title button span i').attr('data-icon-name') == 'ChevronDownMed' ? 'ChevronRightMed' : 'ChevronDownMed').html(outlook_var.icon[$('.__Hx-outlook__unread-title button span i').attr('data-icon-name')]);
    });
    $('.__Hx-outlook__unread-title').on("contextmenu",function(){ return false; });
  }
  loadOutlookUnreadItems();

  $('.__Hx__loading-body').hide();
}

function loadOutlookUnreadItems() { // console.log('%c[(Outlook) Load Unread Items]', 'background: #222; color: #ffd500;');
  var unread_total = 0;
  var items = $('._1PkXPyxM3Hhk5H6YNvwMa1.tZzTXpTvwdvH3pIUj1Bf2[title="Folders"]').parent().next().children().children().filter(function (i, el) { return ($(el).children().first().children().first().attr('data-icon-name') != 'QuickNote') });

  if (outlook_var.items_length !== items.length) { // console.log('%c[(Outlook) Load Unread Items (Reload)]', 'background: #222; color: #8080ff;');
    var unread_item = '';
    outlook_var.items_length = items.length;

    $('.__Hx-outlook__unread-list').html('');
    $.each(items, function( i, el ) {
      let el_title = $(el).attr('title');
      let el_icon = $(el).children().first().children().first().attr('data-icon-name') || 'FabricFolder';
      let el_icon_i = outlook_var.icon[el_icon];
      let el_total = $(el).children().last().children().first().children().first().html();
      let el_highlight = ($(el).hasClass('_2e45YSYkafAibqL8u3c2wj') ? '_2e45YSYkafAibqL8u3c2wj' : '');
      let el_path = getOutlookItemPath($(el)) + el_title;

      unread_item = outlook_el.unread.item
      .replace(/UNREAD_TITLE_SPAN/g, el_title)
      .replace(/UNREAD_TITLE_ATTR/g, el_path)
      .replace(/UNREAD_ICON_N/g, el_icon)
      .replace(/UNREAD_ICON_I/g, el_icon_i)
      .replace(/UNREAD_TOTAL/g, el_total)
      .replace(/UNREAD_CLASS/g, el_highlight)
      .replace(/UNREAD_PATH/g, el_path);
      
      $('.__Hx-outlook__unread-list').append(unread_item);
      $('[path="' + el_path + '"]').on('click', function (e) {
        $(el).click();
      })
      unread_total += !isNaN(el_total) ? parseInt(el_total) : 0;

      if ($(el).children().last().children().hasClass('_3UWhBRVAO2ks8fdt9JhiHS')) { 
        $('[path="' + el_path + '"]').parent().show();
      } else { 
        $('[path="' + el_path + '"]').parent().hide();
      }
    });

    $('.__Hx-outlook__unread-list-item').on("contextmenu",function(){ return false; });
    $('.__Hx-outlook__unread-counter').html(unread_total);
  } else {  // console.log('%c[(Outlook) Load Unread Items (Update)]', 'background: #222; color: #00cc00;');
    $.each(items, function( i, el ) {
      let el_title = $(el).attr('title');
      let el_total = $(el).children().last().children().first().children().first().html();
      let el_path = getOutlookItemPath($(el)) + el_title;

      if ($(el).hasClass('_2e45YSYkafAibqL8u3c2wj')) {
        if (!$('[path="' + el_path + '"]').hasClass('_2e45YSYkafAibqL8u3c2wj')) {
          $('[path="' + el_path + '"]').addClass('_2e45YSYkafAibqL8u3c2wj');
        }
      } else {
        $('[path="' + el_path + '"]').removeClass('_2e45YSYkafAibqL8u3c2wj');
      }

      $('[path="' + el_path + '"]').children().last().children().first().children().first().html(el_total);
      unread_total += !isNaN(el_total) ? parseInt(el_total) : 0;

      if ($(el).children().last().children().hasClass('_3UWhBRVAO2ks8fdt9JhiHS')) { 
        $('[path="' + el_path + '"]').parent().show();
      } else { 
        $('[path="' + el_path + '"]').parent().hide();
      }
    });
    $('.__Hx-outlook__unread-counter').html(unread_total);
  }
}

function getOutlookItemPath (el) {
  var title = '';
  var aria_level = parseInt(el.attr('aria-level'));
  var prev_el = el.parent().prev().children().first(); 
  while (aria_level > 2) {
    if (parseInt(prev_el.attr('aria-level')) < aria_level) {
      title = prev_el.attr('title') + ' > ' + title;
      aria_level--;
    } else {
      prev_el = prev_el.parent().prev().children().first();
    }
  }
  return title;
}

//  *---------*
//  | ON LOAD |
//  *---------*
chrome.runtime.onMessage.addListener(function(msg) {
  if (msg === 'page-rendered') {
    if (outlook_var.regex_check.test(document.location.href)) { console.log('%c[(Outlook) page-rendered]', 'background: #222; color: #bada55;');
      loadOutlook()
    }
  }
})
  
if (outlook_var.regex_check.test(document.location.href))
  loadOutlook()
