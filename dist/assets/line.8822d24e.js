import{_ as a,d as s,k as l,y as i,z as r,o as n,c as u,a as c}from"./index.faeea855.js";import{L as e,u as f,i as p,a as y,b as d,c as m,g as h,h as b,j as _,f as g}from"./echarts.0e95a579.js";const F={color:["#80FFA5","#00DDFF","#37A2FF","#FF0087","#FFBF00"],title:{text:"\u6E10\u53D8\u5806\u53E0\u9762\u79EF\u56FE"},tooltip:{trigger:"axis",axisPointer:{type:"cross",label:{backgroundColor:"#6a7985"}}},legend:{data:["Line 1","Line 2","Line 3","Line 4","Line 5"]},toolbox:{feature:{saveAsImage:{}}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},xAxis:[{type:"category",boundaryGap:!1,data:["\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D","\u5468\u65E5"]}],yAxis:[{type:"value"}],series:[{name:"Line 1",type:"line",stack:"\u603B\u91CF",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new e(0,0,0,1,[{offset:0,color:"rgba(128, 255, 165)"},{offset:1,color:"rgba(1, 191, 236)"}])},emphasis:{focus:"series"},data:[140,232,101,264,90,340,250]},{name:"Line 2",type:"line",stack:"\u603B\u91CF",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new e(0,0,0,1,[{offset:0,color:"rgba(0, 221, 255)"},{offset:1,color:"rgba(77, 119, 255)"}])},emphasis:{focus:"series"},data:[120,282,111,234,220,340,310]},{name:"Line 3",type:"line",stack:"\u603B\u91CF",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new e(0,0,0,1,[{offset:0,color:"rgba(55, 162, 255)"},{offset:1,color:"rgba(116, 21, 219)"}])},emphasis:{focus:"series"},data:[320,132,201,334,190,130,220]},{name:"Line 4",type:"line",stack:"\u603B\u91CF",smooth:!0,lineStyle:{width:0},showSymbol:!1,areaStyle:{opacity:.8,color:new e(0,0,0,1,[{offset:0,color:"rgba(255, 0, 135)"},{offset:1,color:"rgba(135, 0, 157)"}])},emphasis:{focus:"series"},data:[220,402,231,134,190,230,120]},{name:"Line 5",type:"line",stack:"\u603B\u91CF",smooth:!0,lineStyle:{width:0},showSymbol:!1,label:{show:!0,position:"top"},areaStyle:{opacity:.8,color:new e(0,0,0,1,[{offset:0,color:"rgba(255, 191, 0)"},{offset:1,color:"rgba(224, 62, 76)"}])},emphasis:{focus:"series"},data:[220,302,181,234,210,290,150]}]};const w=s({setup(){const o=l(null);let t=null;return i(()=>{f([y,d,m,h,b,_,g]),t=p(o.value),t.setOption(F),r("resize",()=>t.resize())}),{dom:o}}}),S={class:"layout-container"},L={ref:"dom",class:"chart"};function E(o,t,v,x,B,$){return n(),u("div",S,[c("div",L,null,512)])}var A=a(w,[["render",E],["__scopeId","data-v-6b4cf4b9"]]);export{A as default};
