(this.webpackJsonpdatepicker=this.webpackJsonpdatepicker||[]).push([[0],[,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var s=a(0),c=a(1),n=a.n(c),l=a(4),i=a.n(l),d=(a(10),a(2));a(11);var r=n.a.createContext({selectedDate:[],setSelectedDate:()=>{},maxMonths:12});var o={default_headline:"\u05ea\u05d0\u05e8\u05d9\u05da \u05d9\u05e6\u05d9\u05d0\u05d4"};const j="he-IL"===(navigator.language||"he-IL")?["\u05d0'","\u05d1'","\u05d2'","\u05d3'","\u05d4'","\u05d5'","\u05e9'"]:["Sun","Mon","Thu","Wen","The","Fri","Sat"],m=+(new Date).getFullYear(),b=+(new Date).getMonth(),h=(e=12,t=b,a=m)=>{const s={};for(let c=0;c<e;c++)s[c]=new Date(a,t,1),t<11?t++:(t=0,a++);return s},u=(h(),(e=b,t=m)=>{let a=((e=b,t=m)=>+new Date(t,e,1).getDay())(e,t);const s=[];for(let c=1;c<a;c++)s.push("");return s}),O=(e=b,t=m)=>{const a=[];let s=((e=b,t=m)=>1===e?t%4===0?29:28:[3,5,8,10].includes(e)?30:31)(e,t);for(let c=1;c<=s;c++)a.push(c);return a},g=(e,t)=>11===e&&t>0,x=(e,t)=>0===e&&t<0;a(12);var v=function(){const e=Object(c.useContext)(r),t=Object(c.useState)(O()),a=Object(d.a)(t,2),n=a[0],l=a[1],i=Object(c.useState)(u()),v=Object(d.a)(i,2),p=v[0],y=v[1],D=Object(c.useState)(b),w=Object(d.a)(D,2),f=w[0],N=w[1],S=Object(c.useState)(m),k=Object(d.a)(S,2),M=k[0],L=k[1],C=Object(c.useState)(!1),F=Object(d.a)(C,2),I=F[0],Y=F[1],A=Object(c.useState)(""),E=Object(d.a)(A,2),W=E[0],B=E[1],J=Object(c.useState)([]),P=Object(d.a)(J,2),T=P[0],_=P[1],$=Object(c.useState)(h(e.maxMonths)),q=Object(d.a)($,2),z=q[0];q[1],Object(c.useEffect)((()=>{const t=e.monthDisplayStyle,a=[];_(Object.entries(z).map((e=>{let s=e[1].toLocaleString("default",{month:t||"long"});return s+=" "+e[1].getFullYear(),a.push([e[1].getFullYear(),e[1].getMonth()]),s}))),!W&&z[0]&&B(z[0].toLocaleString("default",{month:"long"})+" "+z[0].getFullYear())}),[]);const G=()=>f===b&&M===m,H=()=>{const t=e.maxMonths;return t-2<=11*(M-m)+f-b},K=t=>{const a=e.blockedDats;return t++,a&&a.find((e=>e.dd===t&&e.mm===f&&e.yy===M))||m===M&&b===f&&t<+(new Date).getDate()},Q=e=>{const t=Object(d.a)(e,3),a=t[0],s=t[1],c=t[2];l(O(+s,+a)),y(u(+s,+a)),N(+s),L(+a),B(c)},R=e=>{if(e<0&&G())return;if(e>0&&H())return;let t=((e,t,a)=>g(t,a)?e+1:x(t,a)?e-1:e)(M,f,e),a=((e,t)=>g(e,t)?0:x(e,t)?11:e+t)(f,e),s=new Date(t,a,1),c=s.toLocaleString("default",{month:"long"});c+=" "+s.getFullYear();Q([t,a,c])},U=e.selectedDate,V=e.guideAvailable,X=e.guide2,Z=e.headline,ee=void 0===Z?o.default_headline:Z;return Object(s.jsxs)("div",{className:"datepicker-container",onClick:()=>{I&&Y(!1)},style:{direction:"rtl"},children:[Object(s.jsx)("div",{className:"close"}),Object(s.jsx)("span",{className:"datepicker-headline",children:ee}),Object(s.jsx)("div",{className:"months-container",onClick:()=>{Y(!I)},children:Object(s.jsxs)("div",{className:"months-dropdown",children:[Object(s.jsxs)("span",{children:[Object(s.jsx)("i",{className:"dorpdown-arrow "+(I?"up":"down")}),W]}),Object(s.jsx)("ul",{className:"months-select "+(I?"show":"hide"),children:T.map(((e,t)=>Object(s.jsx)("li",{className:"month",onClick:()=>Q([z[t].getFullYear(),z[t].getMonth(),e]),children:e},t)))})]})}),Object(s.jsxs)("div",{className:"arrows",children:[Object(s.jsx)("i",{className:"arrow right "+(G()?" disabeld":""),onClick:()=>R(-1)}),Object(s.jsx)("i",{className:"arrow left "+(H()?" disabeld":""),onClick:()=>R(1)})]}),Object(s.jsx)("div",{className:"calendar",children:Object(s.jsxs)("div",{className:"dates",children:[j.map((e=>Object(s.jsx)("div",{className:"day",children:e},e))),p.map(((e,t)=>Object(s.jsx)("div",{className:"date-number empty"},t))),n.map(((t,a)=>Object(s.jsx)("div",{className:K(a)?"date-number unavailable":U&&M===U[0]&&f===U[1]&&t===U[2]?"date-number  available selected":"date-number available",onClick:()=>(t=>{if(K(t))return;t++;let a=new Date(M,f,t),s=[M,f,t];s=e.selectedDate[0]===s[0]&&e.selectedDate[1]===s[1]&&e.selectedDate[2]===s[2]?[]:s,e.setSelectedDate(s),s[0]&&console.log(a)})(a),children:t},a)))]})}),Object(s.jsxs)("div",{className:"date-picker guide-container",children:[Object(s.jsxs)("div",{className:"guide",children:[Object(s.jsx)("i",{className:"date-number available"}),Object(s.jsxs)("span",{children:[" ",V]})]}),Object(s.jsxs)("div",{className:"guide",children:[Object(s.jsx)("i",{className:"guide-circle charter"}),Object(s.jsx)("span",{children:X})]})]})]})};const p=new Date,y=11===p.getMonth()?0:p.getMonth()+1,D=[{dd:2,mm:y,yy:2021},{dd:4,mm:y,yy:2021},{dd:6,mm:y,yy:2021},{dd:8,mm:y,yy:2021},{dd:10,mm:y,yy:2021},{dd:12,mm:y,yy:2021},{dd:19,mm:y,yy:2021},{dd:27,mm:y,yy:2021},{dd:28,mm:y,yy:2021}];var w=function(){const e=Object(c.useState)([]),t=Object(d.a)(e,2),a=t[0],n=t[1],l=navigator.language||"he-IL",i="he-IL"===l?"\u05ea\u05d0\u05e8\u05d9\u05db\u05d9 \u05d9\u05e6\u05d9\u05d0\u05d4 \u05d5\u05d7\u05d6\u05e8\u05d4 \u05d0\u05e4\u05e9\u05e8\u05d9\u05d9\u05dd":"Departure and return dates are possible",o="he-IL"===l?"\u05d0\u05e4\u05e9\u05e8\u05d5\u05ea \u05d8\u05d9\u05e1\u05ea \u05e6'\u05e8\u05d8\u05e8 \u05d1\u05ea\u05d0\u05e8\u05d9\u05db\u05d9\u05dd \u05d0\u05dc\u05d5":"Possibility of charter flights on these dates",j="he-IL"===l?"\u05ea\u05d0\u05e8\u05d9\u05da \u05d9\u05e6\u05d9\u05d0\u05d4":"Exit Date";return Object(s.jsx)("div",{className:"App",children:Object(s.jsx)(r.Provider,{value:{selectedDate:a,setSelectedDate:n,monthDisplayStyle:"long",blockedDats:D,maxMonths:12,headline:j,guideAvailable:i,guide2:o},children:Object(s.jsx)("div",{children:Object(s.jsx)(v,{})})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(s.jsx)(w,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((e=>{e.unregister()}))}],[[13,1,2]]]);
//# sourceMappingURL=main.f57dd176.chunk.js.map