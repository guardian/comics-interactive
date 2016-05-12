import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'

var credit = null;
var srcsMobile = null;
var srcsDesktop = null;
var ratiosMobile = null;
var ratiosDesktop = null;
var vPadding = null;
var backgroundColour = null;

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();

    el.innerHTML = embedHTML;
    
    credit = decodeURI(getParameter("credit"));
    srcsMobile = getParameter("srcs-mobile");
    srcsDesktop = getParameter("srcs-desktop");
    ratiosMobile = getParameter("ratios-mobile");
    ratiosDesktop = getParameter("ratios-desktop");
    vPadding = decodeURI(getParameter("vpadding"));
    backgroundColour = decodeURI(getParameter("background"));
    
    buildView();

    // reqwest({
    //     url: 'http://ip.jsontest.com/',
    //     type: 'json',
    //     crossOrigin: true,
    //     success: (resp) => el.querySelector('.test-msg').innerHTML = `Your IP address is ${resp.ip}`
    // });
};

function buildView() {
    
    var htmlString = "", comic, cr;
    
    srcsMobile = srcsMobile.split("+");
    srcsDesktop = srcsDesktop.split("+");
    ratiosMobile = ratiosMobile.split("+");
    ratiosDesktop = ratiosDesktop.split("+");
    
    htmlString +='<div class="mobile-content">';
    htmlString += addImages( srcsMobile, ratiosMobile, "mobile-cell");
    htmlString +='</div><div class="desktop-content">';
    htmlString += addImages( srcsDesktop, ratiosDesktop, "desktop-cell");
     htmlString +='</div>';
     
    comic = document.getElementById("comic-content");
    comic.innerHTML = htmlString;
    
    if ( backgroundColour != null && backgroundColour != "FFFFFF") {
        comic.style.backgroundColor = "#" + backgroundColour;
    }
    
    if ( vPadding != null && vPadding != 20 && vPadding != "20" ) {
        
        var elementList = document.querySelectorAll('.comic-cell');
        
        for (var i = 0; i < elementList.length; i++ ) {
        elementList[i].style.marginBottom = vPadding + "px";
        }
    }
    
    cr = document.getElementById("comic-credit");
    cr.innerHTML = "<p>" + credit + "</p>";
    
}

function addImages ( srcs, ratios, cellClass ) {
    
    var i, html = "";
    
    for ( i = 0; i < srcs.length; i++ ) {
        html += '<div class="comic-cell ' + cellClass + '" style="background-image:url(' + srcs[i] + ');padding-bottom:' + ratios[i] + '%;" ></div>';
    }
    
    return html;
}

function getParameter(paramName) {
  var searchString = window.location.search.substring(1),
      i, val, params = searchString.split("&");

  for (i=0;i<params.length;i++) {
    val = params[i].split("=");
    if (val[0] == paramName) {
      return val[1];
    }
  }
  return null;
}
