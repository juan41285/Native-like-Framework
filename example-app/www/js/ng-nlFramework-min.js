var swipe,swipeH,drawer,drawerH,drawerDimm,drawerDimmH,navToggle,viewContent,burger,burgerTop,burgerBottom,topbar,topbarH,refEl;angular.module("nlFramework",[]).factory("$nlConfig",function(){return{open:!1,plusActive:!1,holdPos:null,reverse:!1,scroll:{},nlRefresh:{},options:{maxWidth:300,topBarHeight:56,speed:.2,animation:"ease",modifyViewContent:!0,useActionButton:!0,burger:{endY:6,startScale:1,endScale:.7}}}}).factory("$nlBurger",["$nlConfig","$nlHelpers",function(e,t){return{animate:function(n){var o=e.maxWidth,i=o-Math.abs(n),r=Math.floor(100/o*i);if(r>0){var s=e.options.burger.startScale-Math.abs((1-e.options.burger.endScale)/100*r).toFixed(2),a=Math.floor(.45*r),l=Math.floor(e.options.burger.endY/100*r);l=y_pos_bottom=l<e.options.burger.endY?l:e.options.burger.endY;var d=Math.floor(1.8*r);e.options.reverse&&(d=180+(180-d)),burger.style.transition="none",burgerTop.style.transition="none",burgerBottom.style.transition="none",t.translate(burger,0,"",0,"",d,"",""),t.translate(burgerTop,0,"",l,"",a,"","",s),t.translate(burgerBottom,0,"",y_pos_bottom,"-",a,"-","",s)}},toggle:function(n){burger.style.transition="all "+e.options.speed+"s "+e.options.animation,burgerTop.style.transition="all "+e.options.speed+"s "+e.options.animation,burgerBottom.style.transition="all "+e.options.speed+"s "+e.options.animation,n?(t.translate(burgerTop,0,"",e.options.burger.endY,"",45,"","",e.options.burger.endScale),t.translate(burgerBottom,0,"",e.options.burger.endY,"-",45,"-","",e.options.burger.endScale),t.translate(burger,0,"",0,"-",180,"")):(t.translate(burgerTop,0,"",0,"",0,"","",e.options.burger.startScale),t.translate(burgerBottom,0,"",0,"",0,"","",e.options.burger.startScale),e.options.reverse?t.translate(burger,0,"",0,"-",360,""):t.translate(burger,0,"",0,"-",0,"")),setTimeout(function(){burger.style.transition="none",burgerTop.style.transition="none",burgerBottom.style.transition="none",n?e.options.reverse=!0:(t.translate(burger,0,"",0,"-",0,""),e.options.reverse=!1)},1e3*e.options.speed)}}}]).factory("$nlHelpers",function(){return{translate:function(e,t,n,o,i,r,s,a,l,d){var t=t||0,o=o||0,n=n||"",i=i||"",s=s||"",a=a||!1,c=e;l="nlRefresh"===c.id?l?"scale3d("+l+","+l+",1)":"scale3d(1,1,1)":l?"scale3d("+l+",1,1)":"","burger-top"===c.id?c.style.transformOrigin="100% 100%":"burger-bottom"===c.id&&(c.style.transformOrigin="100% 0%"),c.style.transform="translate3d("+n+t+"px, "+i+o+"px, 0) rotate3d( 0, 0, 1, "+s+r+"deg ) "+l,c.style.webkitTransform="translate("+n+t+"px, "+i+o+"px) translateZ(0) rotate("+s+r+"deg) "+l,a&&(c.style.width=a+"px"),a&&(c.style["max-width"]=a+"px"),d&&(c.style.msTransform=c.style.MozTransform=c.style.OTransform="translateX("+n+t+"px) translateY("+i+o+"px) rotate("+s+r+"deg)")},merge:function(e,t){var n={};for(var o in e)n[o]=e[o];for(var o in t)n[o]=t[o];return n}}}).factory("$nlDrawer",["$nlConfig","$nlBurger","$nlHelpers",function(e,t,n){var o={init:function(t){e.options=n.merge(e.options,t),console.log(e.options),swipe=document.getElementById("nlSwipe"),swipeH=new Hammer(swipe),drawer=document.getElementById("nlDrawer"),drawerH=new Hammer(drawer),drawerDimm=document.getElementById("nlDimm"),drawerDimmH=new Hammer(drawerDimm),burger=document.getElementById("nlBurger"),burgerTop=document.getElementById("burger-top"),burgerBottom=document.getElementById("burger-bottom"),e.deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e.deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),e.options.modifyViewContent&&(viewContent=document.getElementById("nlContent"),viewContentH=new Hammer(viewContent),viewContent.style.position="fixed",viewContent.style.width=e.deviceW+"px",viewContent.style.height=e.deviceH-e.options.topBarHeight+"px",viewContent.style.top=e.options.topBarHeight+"px"),e.options.useActionButton&&(actionPanel=document.getElementById("nlActionButton"),actionPlus=document.getElementById("nlPlus")),e.maxWidth=e.options.maxWidth>e.deviceW-56?e.deviceW-56:e.options.maxWidth,n.translate(drawer,e.maxWidth,"-",0,"",0,"",e.maxWidth),window.onresize=function(t){e.deviceW=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e.deviceH=Math.max(document.documentElement.clientHeight,window.innerHeight||0),e.options.modifyViewContent&&(viewContent.style.position="fixed",viewContent.style.width=e.deviceW+"px",viewContent.style.height=e.deviceH-e.options.topBarHeight+"px"),e.maxWidth=e.options.maxWidth>e.deviceW-56?e.deviceW-56:e.options.maxWidth,e.options.open?n.translate(drawer,0,"",0,"",0,"",e.maxWidth):n.translate(drawer,e.maxWidth,"-",0,"",0,"",e.maxWidth)},drawerH.on("panleft panright",function(t){e.options.open&&o.move(t,!0)}),drawerDimmH.on("panleft panright",function(t){e.options.open&&o.move(t)}),swipeH.on("panright panleft",function(e){o.move(e)}),o.touchEnd(swipe),o.touchEnd(drawer),o.touchEnd(drawerDimm)},show:function(){drawer.style.transition="all "+e.options.speed+"s "+e.options.animation,e.maxWidth=e.options.maxWidth>e.deviceW-56?e.deviceW-56:e.options.maxWidth,n.translate(drawer,0,"",0,"",0,"",e.maxWidth),drawerDimm.style.transition="all "+e.options.speed+"s "+e.options.animation,drawerDimm.style.visibility="visible",drawerDimm.style.opacity="1",e.options.open=!0,e.options.reverse=!0,t.toggle(!0)},hide:function(){drawer.style.transition="all "+e.options.speed+"s "+e.options.animation,n.translate(drawer,e.maxWidth,"-",0,"",0,""),drawerDimm.style.transition="all "+e.options.speed+"s "+e.options.animation,drawerDimm.style.visibility="hidden",drawerDimm.style.opacity="0",e.options.open&&t.toggle(!1),o.togglePlus(!0),e.options.open=!1},toggle:function(){e.options.open?o.hide():o.show()},move:function(i,r){e.options.direction="panleft"===i.type?"left":"right";var s=i.center.x-e.maxWidth;r&&(e.options.holdPos=e.options.holdPos?e.options.holdPos:s,s+=Math.abs(e.options.holdPos)),s=0>s?s:0;var a=e.options.maxWidth-Math.abs(s),l=(a/(e.options.maxWidth/100)/100).toFixed(2);l=1>l?l:1,t.animate(s),drawerDimm.style.visibility="visible",drawerDimm.style.opacity=l,drawerDimm.style.webkitTransform="translate(0,0) translateZ(0)",drawer.style.transition="none",e.maxWidth=e.options.maxWidth>e.deviceW-56?e.deviceW-56:e.options.maxWidth,n.translate(drawer,s,"",0,"",0,"",e.maxWidth),e.options.open=!0,i.isFinal?("left"===e.options.direction?o.hide():o.show(),e.options.holdPos=null,e.options.endTrue=!1):e.options.endTrue=!0},touchEnd:function(t){var n="ontouchstart"in window?!0:!1;n?t.addEventListener("touchend",function(e){i(e,!0)},!1):t.addEventListener("mouseup",function(e){i(e,!1)},!1);var i=function(t,n){var i=n?t.changedTouches[0]:t,r=i.clientX>e.options.maxWidth/2,s="left"===e.options.direction,a="right"===e.options.direction,l=e.options.endTrue;r&&s&&l||r&&a&&l?o.show():(!r&&s&&l||!r&&a&&l)&&o.hide(),e.options.direction=!1,e.options.endTrue=!1,e.options.holdPos=null,t.preventDefault()}},set:function(t){var o=e.options;e.options=n.merge(o,t)},togglePlus:function(t){e.options.useActionButton&&(o.plusActive||t?(o.plusActive=!1,burger.style["z-index"]="1106",e.options.open||(drawerDimm.style.visibility="hidden",drawerDimm.style.opacity="0"),actionPlus.style["z-index"]="1104",actionPanel.classList.remove("active")):(o.plusActive=!0,burger.style["z-index"]="1104",actionPlus.style["z-index"]="1106",actionPanel.classList.add("active"),setTimeout(function(){drawerDimm.style.visibility="visible",drawerDimm.style.opacity="1"},100)))}};return o}]).factory("$nlRefresh",["$nlConfig","$nlHelpers",function(e,t){var n={init:function(){topbar=document.getElementById("nlTopbar"),topbarH=new Hammer(topbar),refEl=document.getElementById("nlRefresh"),refIcon=document.getElementById("reload-icon"),refIcon.style.transition="all "+(e.options.speed+e.options.speed)+"s "+e.options.animation,e.options.modifyViewContent||(viewContent=document.getElementById("nlContent"),viewContentH=new Hammer(viewContent)),e.syncTrue=!1,e.scroll.top=0,e.center=e.deviceW/2-refEl.offsetWidth/2,window.addEventListener("scroll",function(t){e.scroll.top=window.pageYOffset||document.documentElement.scrollTop,e.scroll.left=window.pageXOffset||document.documentElement.scrollLeft},!1),topbarH.on("pan",function(e){n.move(e)}),n.touchEnd(topbar),n.touchEnd(viewContent)},move:function(n){if(e.center=e.deviceW/2-refEl.offsetWidth/2,!e.syncing&&e.scroll.top<1){refEl.style.transition="none";var o=Math.floor(e.deviceH/2),i=100/e.deviceH*n.center.y;if(n.center.y<o){e.syncTrue=!1;var r=i*(o/100),s=.36*(o/100*n.center.y);t.translate(refEl,e.center,"",r,"",s,""),refIcon.style.fill="red"}else{e.syncTrue=!0,refIcon.style.fill="green";var i=o/100*(n.center.y-o),a=100/e.deviceH*n.center.y,l=100/(e.deviceH/2)*(n.center.y-o),r=a*(o/100);r-=r/100*l/3.5;var s=.36*(o/100*n.center.y);t.translate(refEl,e.center,"",r,"",s,"")}}},touchEnd:function(o){var i="ontouchstart"in window?!0:!1;i?o.addEventListener("touchend",function(e){r(e,!0)},!1):o.addEventListener("mouseup",function(e){r(e,!1)},!1);var r=function(o,i){var r=Math.floor(e.deviceH/2),s=i?o.changedTouches[0]:o;setTimeout(function(){if(refEl.style.transition="all "+e.options.speed+"s "+e.options.animation,s.clientY>r&&e.syncTrue&&!e.syncing){e.syncTrue=!1,e.syncing=!0,e.nlRefresh.ended=!1,n.callback();var o=0,i=0,a=.36*(r/100*(s.clientY-r))+360;e.nlRefresh.minY=e.options.topBarHeight+e.options.topBarHeight/3,t.translate(refEl,e.center,"",e.nlRefresh.minY,"",a,""),setTimeout(function(){refEl.style.transition="all "+e.options.speed/2+"s linear";var n=setInterval(function(){if(e.nlRefresh.ended)clearInterval(n);else{var r=a+i;t.translate(refEl,e.center,"",e.nlRefresh.minY,"",r,""),o+=.1,i+=6+o}},25)},1e3*e.options.speed)}else refEl.style.transition="all "+(e.options.speed+e.options.speed)+"s "+e.options.animation,t.translate(refEl,e.center,"",0,"",0,"")},100)}},callback:function(){setTimeout(function(){e.syncEndTrue()},2500)},syncEnd:function(){e.nlRefresh.ended=!0,setTimeout(function(){refEl.style.transition="all "+e.options.speed/2+"s "+e.options.animation,t.translate(refEl,e.center,"",e.nlRefresh.minY,"",0,"","","1.2")},100),setTimeout(function(){t.translate(refEl,e.center,"",e.nlRefresh.minY,"",0,"","","0")},200),setTimeout(function(){t.translate(refEl,e.center,"",0,"",0,"","","0")},300),e.syncTrue=!1,e.syncing=!1}};return n}]);