import{d as B,k as S,R as I,j as de,A as me,B as ve,O as L,G as H,Q as _e,b as t,ap as fe,N as ue,aR as xe,P as oe,a0 as pe,_ as N,r as x,D as Q,o as D,c as M,w as o,e as i,p as W,f as K,a as w,F as ne,x as he,q as Y,t as be}from"./index.faeea855.js";var le=function(e,l){var a,r=l.arg;if(!r){console.error("\u53C2\u6570\u6709\u8BEF");return}var _=l.value,u=pe(r)?r.value:(a=l.instance)===null||a===void 0?void 0:a.$refs[r];if(!u){console.error("\u6CA1\u6709\u627E\u5230 ".concat(r," \u5BF9\u5E94\u7684\u5B9E\u4F8B"));return}if(typeof u.addReference!="function"){console.error("".concat(r," \u5BF9\u5E94\u7684\u5B9E\u4F8B\u4E0D\u662F VContextmenu"));return}e.$contextmenuKey=r,u.addReference(e,_)},re=function(e,l){var a,r=e.$contextmenuKey;if(!!r){var _=(a=l.instance)===null||a===void 0?void 0:a.$refs[r];_==null||_.removeReference(e)}},$e=function(e,l){re(e,l),le(e,l)},z={mounted:le,updated:$e,beforeUnmount:re},c={contextmenu:"v-contextmenu",contextmenuIcon:"v-contextmenu-icon",contextmenuInner:"v-contextmenu-inner",contextmenuDivider:"v-contextmenu-divider",contextmenuItem:"v-contextmenu-item",contextmenuItemHover:"v-contextmenu-item--hover",contextmenuItemDisabled:"v-contextmenu-item--disabled",contextmenuGroup:"v-contextmenu-group",contextmenuGroupTitle:"v-contextmenu-group__title",contextmenuGroupMenus:"v-contextmenu-group__menus",contextmenuSubmenu:"v-contextmenu-submenu",contextmenuSubmenuTitle:"v-contextmenu-submenu__title",contextmenuSubmenuMenus:"v-contextmenu-submenu__menus",contextmenuSubmenuMenusTop:"v-contextmenu-submenu__menus--top",contextmenuSubmenuMenusRight:"v-contextmenu-submenu__menus--right",contextmenuSubmenuMenusBottom:"v-contextmenu-submenu__menus--bottom",contextmenuSubmenuMenusLeft:"v-contextmenu-submenu__menus--left",contextmenuSubmenuArrow:"v-contextmenu-submenu__arrow"};function ge(n){return typeof n=="function"||Object.prototype.toString.call(n)==="[object Object]"&&!xe(n)}var Ce={trigger:["contextmenu"]},k=B({name:"VContextmenu",props:{modelValue:{type:Boolean,default:!1},autoAjustPlacement:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},teleport:{type:[String,Object],default:function(){return"body"}}},emits:["show","hide","update:modelValue"],setup:function(e,l){var a=l.emit,r=S(null),_=S(e.modelValue||!1),u=function(v){_.value=v,a("update:modelValue",v)},m=S({top:0,left:0}),p=I(function(){return{top:"".concat(m.value.top,"px"),left:"".concat(m.value.left,"px")}}),b=S(null),d=function(v,g){var f=v instanceof Event?g:v,j=(f==null?void 0:f.autoAjustPlacement)||e.autoAjustPlacement,y={top:(f==null?void 0:f.top)||0,left:(f==null?void 0:f.left)||0};if(v instanceof Event){var G,U;v.preventDefault(),y.top=(G=f==null?void 0:f.top)!==null&&G!==void 0?G:v.pageY,y.left=(U=f==null?void 0:f.left)!==null&&U!==void 0?U:v.pageX}u(!0),oe(function(){if(j){var X=r.value;if(!X)return;var J=X.clientWidth,Z=X.clientHeight;if(Z+y.top>=window.innerHeight+window.scrollY){var ee=y.top-Z;ee>window.scrollY&&(y.top=ee)}if(J+y.left>=window.innerWidth+window.scrollX){var te=y.left-J;te>window.scrollX&&(y.left=te)}}m.value=y,a("show")})},$=function(){b.value=null,u(!1),a("hide")},s=de(new Map),h=S(),F=I(function(){return h.value&&s.get(h.value)}),q=function(v,g){var f=function(){return g!=null&&g.trigger?Array.isArray(g.trigger)?g.trigger:[g.trigger]:Ce.trigger}(),j=function(G){e.disabled||(h.value=v,d(G,{}))};f.forEach(function(y){v.addEventListener(y,j)}),s.set(v,{triggers:f,handler:j})},T=function(v){var g=s.get(v);!g||(g.triggers.forEach(function(f){v.removeEventListener(f,g.handler)}),s.delete(v))},P=function(v){if(!(!v.target||!r.value||!h.value)){var g=r.value.contains(v.target)||F.value&&F.value.triggers.includes("click")&&h.value.contains(v.target);g||u(!1)}};return me(_,function(E){E?document.addEventListener("click",P):document.removeEventListener("click",P)}),ve(function(){document.removeEventListener("click",P)}),L("visible",_),L("autoAjustPlacement",e.autoAjustPlacement),L("show",d),L("hide",$),{visible:_,style:p,currentReferenceOptions:F,currentOptions:b,contextmenuRef:r,addReference:q,removeReference:T,toggle:u,show:d,hide:$}},methods:{renderContent:function(){var e,l;return H(t("div",{class:c.contextmenu,ref:"contextmenuRef",style:this.style},[t("ul",{class:c.contextmenuInner},[(e=(l=this.$slots).default)===null||e===void 0?void 0:e.call(l,{triggerOptions:"currentReferenceOptions",options:"currentOptions"})])]),[[_e,"visible"]])}},render:function(){var e;return this.visible?this.teleport?t(fe,{to:this.teleport},ge(e=this.renderContent())?e:{default:function(){return[e]}}):this.renderContent():null}});function C(n,e,l){return e in n?Object.defineProperty(n,e,{value:l,enumerable:!0,configurable:!0,writable:!0}):n[e]=l,n}var A=B({name:"VContextmenuItem",props:{disabled:{type:Boolean,default:!1},hideOnClick:{type:Boolean,default:!0}},emits:["click","mouseenter","mouseleave"],setup:function(e,l){var a=l.emit,r=ue("hide"),_=S(!1),u=I(function(){var d;return d={},C(d,c.contextmenuItem,!0),C(d,c.contextmenuItemDisabled,e.disabled),C(d,c.contextmenuItemHover,_.value),d}),m=function($){e.disabled||(a("click",$),e.hideOnClick&&(r==null||r()))},p=function($){e.disabled||(_.value=!0,a("mouseenter",$))},b=function($){e.disabled||(_.value=!1,a("mouseleave",$))};return{classes:u,handleClick:m,handleMouseenter:p,handleMouseleave:b}},render:function(){var e,l;return t("li",{class:this.classes,onClick:this.handleClick,onMouseenter:this.handleMouseenter,onMouseleave:this.handleMouseleave},[(e=(l=this.$slots).default)===null||e===void 0?void 0:e.call(l)])}}),R=B({name:"VContextmenuDivider",render:function(){return t("li",{class:c.contextmenuDivider},null)}}),ye=B({name:"VContextmenuIcon",props:{name:{type:String,required:!0}},render:function(){return t("i",{class:[c.contextmenuIcon,"".concat(c.contextmenuIcon,"-").concat(this.name)]},null)}}),O=B({name:"VContextmenuSubmenu",props:{title:{type:String,required:!0},disabled:{type:Boolean,default:!1}},emits:["mouseenter","mouseleave"],setup:function(e,l){var a=l.emit,r=S(null),_=ue("autoAjustPlacement"),u=S(["top","right"]),m=S(!1),p=function(h){e.disabled||(m.value=!0,a("mouseenter",h),oe(function(){var F=[];if(_){var q=h.target,T=q.getBoundingClientRect();if(!r.value)return;var P=r.value.clientWidth,E=r.value.clientHeight;T.right+P>=window.innerWidth?F.push("left"):F.push("right"),T.bottom+E>=window.innerHeight?F.push("bottom"):F.push("top")}u.value=F}))},b=function(h){e.disabled||(m.value=!1,a("mouseleave",h))},d=I(function(){var s;return s={},C(s,c.contextmenuItem,!0),C(s,c.contextmenuSubmenuTitle,!0),C(s,c.contextmenuItemHover,m.value),C(s,c.contextmenuItemDisabled,e.disabled),s}),$=I(function(){var s;return s={},C(s,c.contextmenu,!0),C(s,c.contextmenuSubmenuMenus,!0),C(s,c.contextmenuSubmenuMenusTop,u.value.includes("top")),C(s,c.contextmenuSubmenuMenusRight,u.value.includes("right")),C(s,c.contextmenuSubmenuMenusBottom,u.value.includes("bottom")),C(s,c.contextmenuSubmenuMenusLeft,u.value.includes("left")),s});return{hover:m,submenuRef:r,titleClasses:d,menusClasses:$,handleMouseenter:p,handleMouseleave:b}},render:function(){var e,l,a,r;return t("li",{class:c.contextmenuSubmenu,onMouseenter:this.handleMouseenter,onMouseleave:this.handleMouseleave},[t("div",{class:this.titleClasses},[((e=(l=this.$slots).title)===null||e===void 0?void 0:e.call(l))||this.title,t("span",{class:c.contextmenuSubmenuArrow},[t(ye,{name:"right-arrow"},null)])]),this.hover?t("div",{ref:"submenuRef",class:this.menusClasses},[t("ul",{class:c.contextmenuInner},[(a=(r=this.$slots).default)===null||a===void 0?void 0:a.call(r)])]):null])}}),V=B({name:"VContextmenuGroup",props:{title:{type:String,default:void 0},maxWidth:{type:[Number,String],default:void 0}},setup:function(e){var l=I(function(){if(!!e.maxWidth)return{"max-width":typeof e.maxWidth=="number"?"".concat(e.maxWidth,"px"):e.maxWidth,"overflow-x":"auto"}});return{style:l}},methods:{renderTitle:function(){var e,l,a=((e=(l=this.$slots).title)===null||e===void 0?void 0:e.call(l))||this.title;return a?t("div",{class:c.contextmenuGroupTitle},[a]):null}},render:function(){var e,l;return t("li",{class:c.contextmenuGroup},[this.renderTitle(),t("ul",{style:this.style,class:c.contextmenuGroupMenus},[(e=(l=this.$slots).default)===null||e===void 0?void 0:e.call(l)])])}});const De=B({name:"ExampleSimple",components:{[k.name]:k,[A.name]:A,[R.name]:R,[O.name]:O,[V.name]:V},directives:{contextmenu:z}}),ae=n=>(W("data-v-488970a8"),n=n(),K(),n),we={class:"box"},Be=ae(()=>w("h1",null,"\u57FA\u7840\u4F7F\u7528",-1)),Fe={class:"wrapper"},Ee=ae(()=>w("code",null,"\u53F3\u952E\u70B9\u51FB\u6B64\u533A\u57DF",-1)),Se=[Ee];function Me(n,e,l,a,r,_){const u=x("v-contextmenu-item"),m=x("v-contextmenu-divider"),p=x("v-contextmenu-submenu"),b=x("v-contextmenu"),d=Q("contextmenu");return D(),M("div",we,[Be,H((D(),M("div",Fe,Se)),[[d,void 0,"contextmenu"]]),t(b,{ref:"contextmenu"},{default:o(()=>[t(u,null,{default:o(()=>[i("\u7F16\u8F91")]),_:1}),t(u,null,{default:o(()=>[i("\u5220\u9664")]),_:1}),t(u,{disabled:""},{default:o(()=>[i("\u6545\u4E8B")]),_:1}),t(u,null,{default:o(()=>[i("\u4F18\u79C0")]),_:1}),t(m),t(p,{title:"\u66F4\u591A\u64CD\u4F5C"},{default:o(()=>[t(u,null,{default:o(()=>[i("\u67E5\u770B")]),_:1}),t(p,{title:"\u6587\u6863"},{default:o(()=>[t(u,null,{default:o(()=>[i("\u6E90\u7801\u6587\u6863")]),_:1}),t(u,null,{default:o(()=>[i("\u8BF4\u660E\u6587\u6863")]),_:1})]),_:1}),t(u,null,{default:o(()=>[i("\u501F\u9605")]),_:1})]),_:1}),t(m)]),_:1},512)])}var Ie=N(De,[["render",Me],["__scopeId","data-v-488970a8"]]);const ke=B({name:"ExampleSFC",components:{[k.name]:k,[A.name]:A,[R.name]:R,[O.name]:O,[V.name]:V},directives:{contextmenu:z}}),Ae=ke,se=n=>(W("data-v-31a865b6"),n=n(),K(),n),Re={class:"box"},Oe=se(()=>w("h1",null,"\u6309\u94AE\u7EC4",-1)),Ve={class:"wrapper"},Pe=se(()=>w("code",null,"\u53F3\u952E\u70B9\u51FB\u6B64\u533A\u57DF",-1)),Ge=[Pe];function Te(n,e,l,a,r,_){const u=x("v-contextmenu-item"),m=x("v-contextmenu-group"),p=x("v-contextmenu-divider"),b=x("v-contextmenu"),d=Q("contextmenu");return D(),M("div",Re,[Oe,H((D(),M("div",Ve,Ge)),[[d,void 0,"contextmenu"]]),t(b,{ref:"contextmenu"},{default:o(()=>[t(u,null,{default:o(()=>[i("\u83DC\u5355")]),_:1}),t(m,null,{default:o(()=>[t(u,null,{default:o(()=>[i("vue3")]),_:1}),t(u,null,{default:o(()=>[i("axios")]),_:1}),t(u,{disabled:""},{default:o(()=>[i("vuex")]),_:1}),t(u,null,{default:o(()=>[i("router")]),_:1})]),_:1}),t(p),t(m,{title:"\u6309\u94AE\u7EC4"},{default:o(()=>[t(u,null,{default:o(()=>[i("\u83DC\u53551")]),_:1}),t(u,null,{default:o(()=>[i("\u83DC\u53552")]),_:1}),t(u,{disabled:""},{default:o(()=>[i("\u83DC\u53553")]),_:1})]),_:1})]),_:1},512)])}var je=N(Ae,[["render",Te],["__scopeId","data-v-31a865b6"]]);const Le=B({name:"ExampleDynamic",components:{[k.name]:k,[A.name]:A,[R.name]:R,[O.name]:O,[V.name]:V},directives:{contextmenu:z},data(){return{extra:[]}},methods:{addItem(n="item"){this.extra.push(n)},removeItem(){this.extra.pop()}}}),ie=n=>(W("data-v-f4e7004e"),n=n(),K(),n),He={class:"box"},Ne=ie(()=>w("h1",null,"\u52A8\u6001\u83DC\u5355",-1)),We={class:"wrapper"},Ke=ie(()=>w("code",null,"\u53F3\u952E\u70B9\u51FB\u6B64\u533A\u57DF",-1)),qe=[Ke];function Ue(n,e,l,a,r,_){const u=x("v-contextmenu-item"),m=x("v-contextmenu-group"),p=x("v-contextmenu-divider"),b=x("v-contextmenu-submenu"),d=x("v-contextmenu"),$=Q("contextmenu");return D(),M("div",He,[Ne,H((D(),M("div",We,qe)),[[$,void 0,"contextmenu"]]),t(d,{ref:"contextmenu"},{default:o(()=>[t(m,{title:"\u64CD\u4F5C"},{default:o(()=>[t(u,{"hide-on-click":!1,onClick:e[0]||(e[0]=s=>n.extra.push("item"))},{default:o(()=>[i("\u6DFB\u52A0\u83DC\u5355")]),_:1}),t(u,{"hide-on-click":!1,onClick:e[1]||(e[1]=s=>n.extra.push("group"))},{default:o(()=>[i("\u6DFB\u52A0\u83DC\u5355\u7EC4")]),_:1}),t(u,{"hide-on-click":!1,onClick:e[2]||(e[2]=s=>n.extra.push("submenu"))},{default:o(()=>[i("\u6DFB\u52A0\u5B50\u83DC\u5355")]),_:1}),t(u,{"hide-on-click":!1,onClick:e[3]||(e[3]=s=>n.extra.pop())},{default:o(()=>[i("\u5220\u9664")]),_:1})]),_:1}),(D(!0),M(ne,null,he(n.extra,(s,h)=>(D(),M(ne,{key:h},[t(p),s==="group"?(D(),Y(m,{key:0,title:`\u83DC\u5355\u7EC4 ${h+1}`},{default:o(()=>[t(u,null,{default:o(()=>[i("\u83DC\u53551")]),_:1}),t(u,null,{default:o(()=>[i("\u83DC\u53552")]),_:1}),t(u,null,{default:o(()=>[i("\u83DC\u53553")]),_:1})]),_:2},1032,["title"])):s==="submenu"?(D(),Y(b,{key:1,title:`\u5B50\u83DC\u5355 ${h+1}`},{default:o(()=>[t(u,null,{default:o(()=>[i("\u83DC\u53551")]),_:1}),t(u,null,{default:o(()=>[i("\u83DC\u53552")]),_:1}),t(u,null,{default:o(()=>[i("\u83DC\u53553")]),_:1})]),_:2},1032,["title"])):(D(),Y(u,{key:2},{default:o(()=>[i("\u83DC\u5355 "+be(h+1),1)]),_:2},1024))],64))),128))]),_:1},512)])}var Xe=N(Le,[["render",Ue],["__scopeId","data-v-f4e7004e"]]);const Ye=B({components:{basic:Ie,menuGroup:je,menuDynamic:Xe},setup(){}}),ce=n=>(W("data-v-161ed4dd"),n=n(),K(),n),Qe={class:"layout-container"},ze={class:"flex-box"},Je=ce(()=>w("p",{style:{"text-align":"left"}},"demo\u91C7\u7528\u63D2\u4EF6\uFF1Av-contextmenu",-1)),Ze=ce(()=>w("p",null,[i("\u4F7F\u7528\u65B9\u6CD5\uFF1A"),w("a",{href:"https://github.com/heynext/v-contextmenu",target:"_blank"},"https://github.com/heynext/v-contextmenu")],-1));function et(n,e,l,a,r,_){const u=x("el-alert"),m=x("basic"),p=x("el-col"),b=x("menuGroup"),d=x("menuDynamic"),$=x("el-row");return D(),M("div",Qe,[w("div",ze,[t(u,{type:"success"},{default:o(()=>[Je,Ze]),_:1}),t($,{gutter:24},{default:o(()=>[t(p,{xs:24,sm:8,md:8,lg:8,xl:8},{default:o(()=>[t(m)]),_:1}),t(p,{xs:24,sm:8,md:8,lg:8,xl:8},{default:o(()=>[t(b)]),_:1}),t(p,{xs:24,sm:8,md:8,lg:8,xl:8},{default:o(()=>[t(d)]),_:1})]),_:1})])])}var nt=N(Ye,[["render",et],["__scopeId","data-v-161ed4dd"]]);export{nt as default};
