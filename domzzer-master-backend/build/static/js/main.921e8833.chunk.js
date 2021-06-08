(this["webpackJsonpdomzzer-master-frontend"]=this["webpackJsonpdomzzer-master-frontend"]||[]).push([[0],{81:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(18),i=n.n(c),s=n(33),a=n(20),l=n(23),j=n(7),b=n(101),o=n(104),d=n(102),h=n(103),O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SERVER_INFO":return t.info;default:return e}},x=n(27),f=n.n(x),v={getInfo:function(){return f.a.get("/api/info").then((function(e){return e.data}))}},u=n(95),m=n(96),g=n(97),p=n(98),S=n(99),E=n(2),I=function(e){var t=e.serverInfo;return void 0===t||void 0===t.serverName?Object(E.jsx)("div",{children:Object(E.jsx)("p",{children:"Server information not available!"})}):Object(E.jsx)(u.a,{children:Object(E.jsx)(m.a,{"aria-label":"simple table",children:Object(E.jsxs)(g.a,{children:[Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Server name:"}),Object(E.jsx)(S.a,{align:"left",children:t.serverName})]},"1"),Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Server OS:"}),Object(E.jsx)(S.a,{align:"left",children:t.serverType})]},"2"),Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Server OS-version:"}),Object(E.jsx)(S.a,{align:"left",children:t.serverVersion})]},"3"),Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Server memory:"}),Object(E.jsx)(S.a,{align:"left",children:t.serverMemoryMb})]},"4"),Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Server date:"}),Object(E.jsx)(S.a,{align:"left",children:t.serverDate})]},"5"),Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Server uptime:"}),Object(E.jsx)(S.a,{align:"left",children:t.serverUptime})]},"6"),Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Server controlled slave machines:"}),Object(E.jsx)(S.a,{align:"left",children:t.numberOfSlaves})]},"7")]})})})},y=function(e){var t=e.serverInfo;if(void 0===t||void 0===t.serverName)return Object(E.jsx)("div",{children:Object(E.jsx)("p",{children:"Server information not available!"})});var n=t.numberOfTestsPerformed,r=t.numberOfPotentialVulnerabilities,c=void 0!==n&&0!==n?r/n:0;return Object(E.jsx)(u.a,{children:Object(E.jsx)(m.a,{"aria-label":"simple table",children:Object(E.jsxs)(g.a,{children:[Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Number of tests performed:"}),Object(E.jsx)(S.a,{align:"right",children:n})]},"1"),Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Number of potential vulnerabilities found:"}),Object(E.jsx)(S.a,{align:"right",children:r})]},"2"),Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:"Potential vulnerabilities to tests ratio:"}),Object(E.jsx)(S.a,{align:"right",children:c})]},"3")]})})})},z=function(){var e=Object(a.b)(),t=Object(a.c)((function(e){return e.serverInfo}));return Object(r.useEffect)((function(){v.getInfo().then((function(t){return e(function(e){return{type:"SET_SERVER_INFO",info:e}}(t))})).catch((function(e){return console.log("Could not connect to master-server!")}))}),[]),Object(E.jsxs)("div",{children:[Object(E.jsx)("h1",{children:"domzzer - Home"}),Object(E.jsx)("h3",{children:"Master Server Information"}),Object(E.jsx)(I,{serverInfo:t}),Object(E.jsx)("br",{}),Object(E.jsx)("h3",{children:"Vulnerability Information"}),Object(E.jsx)(y,{serverInfo:t})]})},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SLAVES":return t.slaves;default:return e}},V={getAll:function(){return f.a.get("/api/slaves").then((function(e){return e.data}))}},T=n(100),_=function(e){var t=e.slaves;return Object(E.jsx)(u.a,{children:Object(E.jsxs)(m.a,{"aria-label":"simple table",children:[Object(E.jsx)(T.a,{children:Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{children:"Server name"}),Object(E.jsx)(S.a,{children:"Server addess"}),Object(E.jsx)(S.a,{children:"Server status"})]})}),Object(E.jsx)(g.a,{children:t.map((function(e){return Object(E.jsxs)(p.a,{children:[Object(E.jsx)(S.a,{align:"left",children:e.name}),Object(E.jsx)(S.a,{align:"left",children:e.address}),Object(E.jsx)(S.a,{align:"left",children:e.status})]},e.id)}))})]})})},w=function(){var e=Object(a.b)(),t=Object(a.c)((function(e){return e.slaves}));return Object(r.useEffect)((function(){V.getAll().then((function(t){return e(function(e){return{type:"SET_SLAVES",slaves:e}}(t))})).catch((function(e){return console.log("Could not connect to master-server!")}))}),[]),Object(E.jsxs)("div",{children:[Object(E.jsx)("h1",{children:"domzzer - Slaves"}),Object(E.jsx)("h3",{children:"Slaves in Database"}),Object(E.jsx)(_,{slaves:t})]})};var A=function(){return Object(E.jsx)(l.a,{children:Object(E.jsxs)(b.a,{children:[Object(E.jsx)(o.a,{position:"static",children:Object(E.jsxs)(d.a,{children:[Object(E.jsx)(h.a,{color:"inherit",component:l.b,to:"/",children:"home"}),Object(E.jsx)(h.a,{color:"inherit",component:l.b,to:"/slaves",children:"slaves"}),Object(E.jsx)(h.a,{color:"inherit",component:l.b,to:"/vulnerabilities",children:"vulnerabilities"}),Object(E.jsx)(h.a,{color:"inherit",component:l.b,to:"/settings",children:"settings"})]})}),Object(E.jsxs)(j.c,{children:[Object(E.jsx)(j.a,{path:"/settings"}),Object(E.jsx)(j.a,{path:"/vulnerabilities"}),Object(E.jsx)(j.a,{path:"/slaves",children:Object(E.jsx)(w,{})}),Object(E.jsx)(j.a,{path:"/",children:Object(E.jsx)(z,{})})]})]})})},R=Object(s.a)({serverInfo:O,slaves:N}),M=Object(s.b)(R);i.a.render(Object(E.jsx)(a.a,{store:M,children:Object(E.jsx)(A,{})}),document.getElementById("root"))}},[[81,1,2]]]);
//# sourceMappingURL=main.921e8833.chunk.js.map