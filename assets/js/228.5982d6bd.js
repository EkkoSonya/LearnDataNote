"use strict";(self.webpackChunklearn_data=self.webpackChunklearn_data||[]).push([[228],{8228:(e,l,t)=>{t.r(l),t.d(l,{default:()=>m});var a=t(8981),s=t(5670),r=t(2930),u=t(6719),i=t(7847),n=t(3151),c=t(5826),o=t(9658);const v=["/","/intro.html","/daily/d1.html","/academic/UAV/Reinforcement-Learning-in-Multiple-UAV-Networks_Deployment-and-Movement-Design.html","/code/java/JAVA1.html","/404.html","/daily/","/academic/UAV/","/academic/","/code/java/","/code/","/category/","/category/daily/","/category/academic/","/category/code/","/tag/","/tag/d1/","/tag/uav/","/tag/ieee-transactions-on-vehicular-technology/","/tag/java/","/article/","/star/","/timeline/"];t(2082);const h=(0,s.Mjh)("SEARCH_PRO_QUERY_HISTORY",[]),d=e=>v[e.id]+("anchor"in e?`#${e.anchor}`:""),{resultHistoryCount:p}=o.s,y=(0,s.Mjh)("SEARCH_PRO_RESULT_HISTORY",[]);var m=(0,i.pM)({name:"SearchResult",props:{query:{type:String,required:!0},isFocusing:Boolean},emits:["close","updateQuery"],setup(e,{emit:l}){const t=(0,n.rd)(),v=(0,n.Zv)(),m=(0,a.s5)(o.a),{enabled:g,addQueryHistory:H,queryHistory:f,removeQueryHistory:k}=(()=>{const{queryHistoryCount:e}=o.s,l=e>0;return{enabled:l,queryHistory:h,addQueryHistory:t=>{l&&(h.value.length<e?h.value=Array.from(new Set([t,...h.value])):h.value=Array.from(new Set([t,...h.value.slice(0,e-1)])))},removeQueryHistory:e=>{h.value=[...h.value.slice(0,e),...h.value.slice(e+1)]}}})(),{enabled:Q,resultHistory:R,addResultHistory:w,removeResultHistory:x}=(()=>{const e=p>0;return{enabled:e,resultHistory:y,addResultHistory:l=>{if(e){const e={link:d(l),display:l.display};"header"in l&&(e.header=l.header),y.value.length<p?y.value=[e,...y.value]:y.value=[e,...y.value.slice(0,p-1)]}},removeResultHistory:e=>{y.value=[...y.value.slice(0,e),...y.value.slice(e+1)]}}})(),A=g||Q,C=(0,u.lW)(e,"query"),{results:q,searching:S}=(e=>{const l=(0,o.u)(),t=(0,n.Zv)(),{search:a,terminate:s}=(0,o.c)(),c=(0,u.KR)(!1),v=(0,u.IJ)([]);return(0,i.sV)((()=>{const u=()=>{v.value=[],c.value=!1},n=(0,r.Q0)((e=>{c.value=!0,e?a({type:"search",query:e,locale:t.value,options:l.value}).then((e=>{v.value=e,c.value=!1})).catch((e=>{console.error(e),u()})):u()}),o.s.searchDelay);(0,i.wB)([e,t],(()=>n(e.value)),{immediate:!0}),(0,i.hi)((()=>{s()}))})),{searching:c,results:v}})(C),b=(0,u.Kh)({isQuery:!0,index:0}),E=(0,u.KR)(0),_=(0,u.KR)(0),D=(0,i.EW)((()=>A&&(f.value.length>0||R.value.length>0))),M=(0,i.EW)((()=>q.value.length>0)),T=(0,i.EW)((()=>q.value[E.value]||null)),U=e=>e.map((e=>(0,a.Kg)(e)?e:(0,i.h)(e[0],e[1]))),V=e=>{if("customField"===e.type){const l=o.b[e.index]||"$content",[t,s=""]=(0,a.Qd)(l)?l[v.value].split("$content"):l.split("$content");return e.display.map((e=>(0,i.h)("div",U([t,...e,s]))))}return e.display.map((e=>(0,i.h)("div",U(e))))},W=()=>{E.value=0,_.value=0,l("updateQuery",""),l("close")};return(0,s.MLh)("keydown",(a=>{if(e.isFocusing)if(M.value){if("ArrowUp"===a.key)_.value>0?_.value-=1:(E.value=E.value>0?E.value-1:q.value.length-1,_.value=T.value.contents.length-1);else if("ArrowDown"===a.key)_.value<T.value.contents.length-1?_.value+=1:(E.value=E.value<q.value.length-1?E.value+1:0,_.value=0);else if("Enter"===a.key){const l=T.value.contents[_.value];H(e.query),w(l),t.push(d(l)),W()}}else if(Q)if("ArrowUp"===a.key)(()=>{const{isQuery:e,index:l}=b;0===l?(b.isQuery=!e,b.index=e?R.value.length-1:f.value.length-1):b.index=l-1})();else if("ArrowDown"===a.key)(()=>{const{isQuery:e,index:l}=b;l===(e?f.value.length-1:R.value.length-1)?(b.isQuery=!e,b.index=0):b.index=l+1})();else if("Enter"===a.key){const{index:e}=b;b.isQuery?(l("updateQuery",f.value[e]),a.preventDefault()):(t.push(R.value[e].link),W())}})),(0,i.wB)([E,_],(()=>{document.querySelector(".search-pro-result-list-item.active .search-pro-result-item.active")?.scrollIntoView(!1)}),{flush:"post"}),()=>(0,i.h)("div",{class:["search-pro-result-wrapper",{empty:C.value?!M.value:!D.value}],id:"search-pro-results"},""===C.value?A?D.value?[g?(0,i.h)("ul",{class:"search-pro-result-list"},(0,i.h)("li",{class:"search-pro-result-list-item"},[(0,i.h)("div",{class:"search-pro-result-title"},m.value.queryHistory),f.value.map(((e,t)=>(0,i.h)("div",{class:["search-pro-result-item",{active:b.isQuery&&b.index===t}],onClick:()=>{l("updateQuery",e)}},[(0,i.h)(c.H,{class:"search-pro-result-type"}),(0,i.h)("div",{class:"search-pro-result-content"},e),(0,i.h)("button",{class:"search-pro-remove-icon",innerHTML:c.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),k(t)}})])))])):null,Q?(0,i.h)("ul",{class:"search-pro-result-list"},(0,i.h)("li",{class:"search-pro-result-list-item"},[(0,i.h)("div",{class:"search-pro-result-title"},m.value.resultHistory),R.value.map(((e,l)=>(0,i.h)(n.Wt,{to:e.link,class:["search-pro-result-item",{active:!b.isQuery&&b.index===l}],onClick:()=>{W()}},(()=>[(0,i.h)(c.H,{class:"search-pro-result-type"}),(0,i.h)("div",{class:"search-pro-result-content"},[e.header?(0,i.h)("div",{class:"content-header"},e.header):null,(0,i.h)("div",e.display.map((e=>U(e))).flat())]),(0,i.h)("button",{class:"search-pro-remove-icon",innerHTML:c.C,onClick:e=>{e.preventDefault(),e.stopPropagation(),x(l)}})]))))])):null]:m.value.emptyHistory:m.value.emptyResult:S.value?(0,i.h)(c.S,{hint:m.value.searching}):M.value?(0,i.h)("ul",{class:"search-pro-result-list"},q.value.map((({title:l,contents:t},a)=>{const s=E.value===a;return(0,i.h)("li",{class:["search-pro-result-list-item",{active:s}]},[(0,i.h)("div",{class:"search-pro-result-title"},l||m.value.defaultTitle),t.map(((l,t)=>{const a=s&&_.value===t;return(0,i.h)(n.Wt,{to:d(l),class:["search-pro-result-item",{active:a,"aria-selected":a}],onClick:()=>{H(e.query),w(l),W()}},(()=>["text"===l.type?null:(0,i.h)("title"===l.type?c.T:"heading"===l.type?c.a:c.b,{class:"search-pro-result-type"}),(0,i.h)("div",{class:"search-pro-result-content"},["text"===l.type&&l.header?(0,i.h)("div",{class:"content-header"},l.header):null,(0,i.h)("div",V(l))])]))}))])}))):m.value.emptyResult)}})}}]);