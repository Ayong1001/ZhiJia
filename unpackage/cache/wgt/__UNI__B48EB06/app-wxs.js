var __wxsModules={};
__wxsModules.f1d6d7d8=(()=>{var v=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var M=v((A,c)=>{function b(t,e){var s=t.instance,a=s.getState();if(!a.disabled){var r=t.touches;r&&r.length>1||(a.moving=!0,a.startX=r[0].pageX,a.startY=r[0].pageY,e.callMethod("closeOther"))}}function m(t,e){var s=t.instance,a=s.getState();if(!(a.disabled||!a.moving)){var r=t.touches,n=r[0].pageX,i=r[0].pageY,o=n-a.startX,u=i-a.startY,h=a.buttonsWidth;(Math.abs(o)>Math.abs(u)||Math.abs(o)>a.threshold)&&(t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation()),!(Math.abs(o)<Math.abs(u))&&(a.status==="open"?(o<0&&(o=0),o>h&&(o=h),g(-h+o,s,e)):(o>0&&(o=0),Math.abs(o)>h&&(o=-h),g(o,s,e)))}}function S(t,e){var s=t.instance,a=s.getState();if(!(!a.moving||a.disabled)){var r=t.changedTouches?t.changedTouches[0]:{},n=r.pageX,i=r.pageY,o=n-a.startX;if(a.status==="open"){if(o<0)return;if(o===0)return f(s,e);Math.abs(o)<a.threshold?l(s,e):f(s,e)}else{if(o>0)return;Math.abs(o)<a.threshold?f(s,e):l(s,e)}}}function p(t){return t.toString().indexOf("s")>=0?t:t>30?t+"ms":t+"s"}function g(t,e,s){var a=e.getState(),r=s.selectAllComponents(".u-swipe-action-item__right__button");e.requestAnimationFrame(function(){e.setStyle({transition:"none",transform:"translateX("+t+"px)","-webkit-transform":"translateX("+t+"px)"})})}function l(t,e){var s=t.getState(),a=e.selectAllComponents(".u-swipe-action-item__right__button"),r=p(s.duration),n=-s.buttonsWidth;t.requestAnimationFrame(function(){t.setStyle({transition:"transform "+r,transform:"translateX("+n+"px)","-webkit-transform":"translateX("+n+"px)"})}),d("open",t,e)}function d(t,e,s){var a=e.getState();a.status=t,s.callMethod("setState",t)}function f(t,e){var s=t.getState(),a=e.selectAllComponents(".u-swipe-action-item__right__button"),r=a.length,n=p(s.duration);t.requestAnimationFrame(function(){t.setStyle({transition:"transform "+n,transform:"translateX(0px)","-webkit-transform":"translateX(0px)"});for(var i=r-1;i>=0;i--)a[i].setStyle({transition:"transform "+n,transform:"translateX(0px)","-webkit-transform":"translateX(0px)"})}),d("close",t,e)}function X(t,e,s,a){var r=a.getState();r.disabled||(t==="close"&&r.status==="open"?f(a,s):t==="open"&&r.status==="close"&&l(a,s))}function _(t,e,s,a){var r=a.getState();if(r.disabled=t.disabled,r.duration=t.duration,r.show=t.show,r.threshold=t.threshold,r.buttons=t.buttons,r.buttons)for(var n=r.buttons.length,i=0,o=t.buttons,u=0;u<n;u++)i+=o[u].width;r.buttonsWidth=i}c.exports={touchstart:b,touchmove:m,touchend:S,sizeChange:_,statusChange:X}});return M();})();
