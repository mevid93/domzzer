(this["webpackJsonpdomzzer-master-frontend"]=this["webpackJsonpdomzzer-master-frontend"]||[]).push([[0],{81:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(20),i=n.n(c),s=n(34),a=n(13),l=n(18),j=n(7),b=n(101),d=n(104),o=n(102),h=n(103),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SERVER_INFO":return t.info;default:return e}},O=n(22),f=n.n(O),x={getInfo:function(){return f.a.get("/api/info").then((function(e){return e.data}))}},v=n(95),g=n(96),m=n(97),S=n(98),p=n(99),I=n(1),E=function(e){var t=e.serverInfo;return void 0===t||void 0===t.serverName?Object(I.jsx)("div",{children:Object(I.jsx)("p",{children:"Server information not available!"})}):Object(I.jsx)(v.a,{children:Object(I.jsx)(g.a,{"aria-label":"simple table",children:Object(I.jsxs)(m.a,{children:[Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Server name:"}),Object(I.jsx)(p.a,{align:"left",children:t.serverName})]},"1"),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Server OS:"}),Object(I.jsx)(p.a,{align:"left",children:t.serverType})]},"2"),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Server OS-version:"}),Object(I.jsx)(p.a,{align:"left",children:t.serverVersion})]},"3"),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Server memory:"}),Object(I.jsx)(p.a,{align:"left",children:t.serverMemoryMb})]},"4"),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Server date:"}),Object(I.jsx)(p.a,{align:"left",children:t.serverDate})]},"5"),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Server uptime:"}),Object(I.jsx)(p.a,{align:"left",children:t.serverUptime})]},"6"),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Server controlled slave machines:"}),Object(I.jsx)(p.a,{align:"left",children:t.numberOfSlaves})]},"7")]})})})},y=function(e){var t=e.serverInfo;if(void 0===t||void 0===t.serverName)return Object(I.jsx)("div",{children:Object(I.jsx)("p",{children:"Server information not available!"})});var n=t.numberOfTestsPerformed,r=t.numberOfPotentialVulnerabilities,c=void 0!==n&&0!==n?r/n:0;return Object(I.jsx)(v.a,{children:Object(I.jsx)(g.a,{"aria-label":"simple table",children:Object(I.jsxs)(m.a,{children:[Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Number of tests performed:"}),Object(I.jsx)(p.a,{align:"right",children:n})]},"1"),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Number of potential vulnerabilities found:"}),Object(I.jsx)(p.a,{align:"right",children:r})]},"2"),Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:"Potential vulnerabilities to tests ratio:"}),Object(I.jsx)(p.a,{align:"right",children:c})]},"3")]})})})},T=function(){var e=Object(a.b)(),t=Object(a.c)((function(e){return e.serverInfo}));return Object(r.useEffect)((function(){x.getInfo().then((function(t){return e(function(e){return{type:"SET_SERVER_INFO",info:e}}(t))})).catch((function(e){return console.log("Could not connect to master-server!")}))}),[]),Object(I.jsxs)("div",{children:[Object(I.jsx)("h1",{children:"domzzer - Home"}),Object(I.jsx)("h3",{children:"Master Server Information"}),Object(I.jsx)(E,{serverInfo:t}),Object(I.jsx)("br",{}),Object(I.jsx)("h3",{children:"Vulnerability Information"}),Object(I.jsx)(y,{serverInfo:t})]})},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SLAVES":return t.slaves;case"INSERT_SLAVE":return e.find((function(e){return e.id===t.slave.id}))?e:e.concat(t.slave);default:return e}},V="/api/slaves",N={getAll:function(){return f.a.get(V).then((function(e){return e.data}))},getById:function(e){return f.a.get("".concat(V,"/").concat(e)).then((function(e){return e.data}))}},A=n(100),_=function(e){var t=e.slaves;return Object(I.jsx)(v.a,{children:Object(I.jsxs)(g.a,{"aria-label":"simple table",children:[Object(I.jsx)(A.a,{children:Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{children:"Server name"}),Object(I.jsx)(p.a,{children:"Server addess"}),Object(I.jsx)(p.a,{children:"Server status"})]})}),Object(I.jsx)(m.a,{children:t.map((function(e){return Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:Object(I.jsx)(l.b,{to:"/slaves/".concat(e.id),children:e.name})}),Object(I.jsx)(p.a,{align:"left",children:e.address}),Object(I.jsx)(p.a,{align:"left",children:e.status})]},e.id)}))})]})})},L=function(){var e=Object(a.b)(),t=Object(a.c)((function(e){return e.slaves}));return Object(r.useEffect)((function(){N.getAll().then((function(t){return e(function(e){return{type:"SET_SLAVES",slaves:e}}(t))})).catch((function(e){return console.log("Could not connect to master-server!")}))}),[]),Object(I.jsxs)("div",{children:[Object(I.jsx)("h1",{children:"domzzer - Slaves"}),Object(I.jsx)("h3",{children:"Slaves in Database"}),Object(I.jsx)(_,{slaves:t})]})},R=function(){var e=Object(a.b)(),t=Object(j.f)().id,n=Object(a.c)((function(e){return e.slaves})).find((function(e){return e.id===t}));return Object(r.useEffect)((function(){N.getById(t).then((function(t){e(function(e){return{type:"INSERT_SLAVE",slave:e}}(t))})).catch((function(e){}))}),[]),void 0===n?Object(I.jsx)("div",{children:Object(I.jsx)("h1",{children:"domzzer - Slaves - 404 (Slave not found) "})}):Object(I.jsxs)("div",{children:[Object(I.jsxs)("h1",{children:["domzzer - Slaves - ",n.name," "]}),Object(I.jsxs)("h3",{children:["address: ",n.address]}),Object(I.jsxs)("h3",{children:["status: ",n.status]})]})},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VULNERABILITIES":return t.vulnerabilities;case"INSERT_VULNERABILITY":return e.find((function(e){return e.id===t.vulnerability.id}))?e:e.concat(t.vulnerability);default:return e}},w="/api/vulnerabilities",D={getAll:function(){return f.a.get(w).then((function(e){return e.data}))},getById:function(e){return f.a.get("".concat(w,"/").concat(e)).then((function(e){return e.data}))}},U=function(e){var t=e.vulnerabilities;return Object(I.jsx)(v.a,{children:Object(I.jsxs)(g.a,{"aria-label":"simple table",children:[Object(I.jsx)(A.a,{children:Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{children:"ID"}),Object(I.jsx)(p.a,{children:"Server address"}),Object(I.jsx)(p.a,{children:"Target browser"}),Object(I.jsx)(p.a,{children:"Timestamp"}),Object(I.jsx)(p.a,{children:"Status"})]})}),Object(I.jsx)(m.a,{children:t.map((function(e){return Object(I.jsxs)(S.a,{children:[Object(I.jsx)(p.a,{align:"left",children:Object(I.jsx)(l.b,{to:"/vulnerabilities/".concat(e.id),children:e.id})}),Object(I.jsx)(p.a,{align:"left",children:e.serverAddress}),Object(I.jsx)(p.a,{align:"left",children:e.targetBrowser}),Object(I.jsx)(p.a,{align:"left",children:e.timestamp}),Object(I.jsx)(p.a,{align:"left",children:e.status})]},e.id)}))})]})})},C=function(){var e=Object(a.b)(),t=Object(a.c)((function(e){return e.vulnerabilities}));return Object(r.useEffect)((function(){D.getAll().then((function(t){return e(function(e){return{type:"SET_VULNERABILITIES",vulnerabilities:e}}(t))})).catch((function(e){console.log(e),console.log("Could not connect to master-server!")}))}),[]),Object(I.jsxs)("div",{children:[Object(I.jsx)("h1",{children:"domzzer - Vulnerabilities"}),Object(I.jsx)("h3",{children:"Vulnerabilities in Database"}),Object(I.jsx)(U,{vulnerabilities:t})]})};var M=function(){return Object(I.jsx)(l.a,{children:Object(I.jsxs)(b.a,{children:[Object(I.jsx)(d.a,{position:"static",children:Object(I.jsxs)(o.a,{children:[Object(I.jsx)(h.a,{color:"inherit",component:l.b,to:"/",children:"home"}),Object(I.jsx)(h.a,{color:"inherit",component:l.b,to:"/slaves",children:"slaves"}),Object(I.jsx)(h.a,{color:"inherit",component:l.b,to:"/vulnerabilities",children:"vulnerabilities"}),Object(I.jsx)(h.a,{color:"inherit",component:l.b,to:"/settings",children:"settings"})]})}),Object(I.jsxs)(j.c,{children:[Object(I.jsx)(j.a,{path:"/settings"}),Object(I.jsx)(j.a,{path:"/vulnerabilities",children:Object(I.jsx)(C,{})}),Object(I.jsx)(j.a,{path:"/slaves/:id",children:Object(I.jsx)(R,{})}),Object(I.jsx)(j.a,{path:"/slaves",children:Object(I.jsx)(L,{})}),Object(I.jsx)(j.a,{path:"/",children:Object(I.jsx)(T,{})})]})]})})},P=Object(s.a)({serverInfo:u,slaves:z,vulnerabilities:B}),k=Object(s.b)(P);i.a.render(Object(I.jsx)(a.a,{store:k,children:Object(I.jsx)(M,{})}),document.getElementById("root"))}},[[81,1,2]]]);
//# sourceMappingURL=main.b5a2e294.chunk.js.map