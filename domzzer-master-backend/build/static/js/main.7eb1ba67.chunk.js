(this["webpackJsonpdomzzer-master-frontend"]=this["webpackJsonpdomzzer-master-frontend"]||[]).push([[0],{61:function(e,t,r){"use strict";r.r(t);var s=r(0),n=r(13),c=r.n(n),i=r(18),j=r(12),o=r(10),a=r(3),b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SERVER_INFO":return t.info;default:return e}},l=r(28),d=r.n(l),v={getInfo:function(){return d.a.get("/info").then((function(e){return e.data}))}},u=r(1),O=function(e){var t=e.serverInfo;return void 0===t||void 0===t.serverName?Object(u.jsx)("div",{children:Object(u.jsx)("p",{children:"Server information not available!"})}):Object(u.jsxs)("div",{children:[Object(u.jsxs)("p",{children:["Master-server name: ",t.serverName]}),Object(u.jsxs)("p",{children:["Master-server OS: ",t.serverType]}),Object(u.jsxs)("p",{children:["Master-server OS-version: ",t.serverVersion]}),Object(u.jsxs)("p",{children:["Master-server memory: ",t.serverMemoryMb," Mb"]}),Object(u.jsxs)("p",{children:["Master-server date: ",t.serverDate]}),Object(u.jsxs)("p",{children:["Master-server uptime: ",t.serverUptime]}),Object(u.jsxs)("p",{children:["Number of slave machines: ",t.numberOfSlaves]}),Object(u.jsxs)("p",{children:["Number of tests performed: ",t.numberOfTestsPerformed]}),Object(u.jsxs)("p",{children:["Number of potential vulnerabilities found: ",t.numberOfPotentialVulnerabilities]})]})},h=function(){var e=Object(j.b)(),t=Object(j.c)((function(e){return e.serverInfo}));return Object(s.useEffect)((function(){v.getInfo().then((function(t){return e(function(e){return{type:"SET_SERVER_INFO",info:e}}(t))})).catch((function(e){return console.log("Could not connect to master-server!")}))}),[]),Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"domzzer - Home"}),Object(u.jsx)(O,{serverInfo:t})]})};var f=function(){var e={padding:5};return Object(u.jsx)("div",{children:Object(u.jsxs)(o.a,{children:[Object(u.jsxs)("div",{children:[Object(u.jsx)(o.b,{style:e,to:"/",children:"home"}),Object(u.jsx)(o.b,{style:e,to:"/slaves",children:"slaves"}),Object(u.jsx)(o.b,{style:e,to:"/vulnerabilities",children:"vulnerabilities"}),Object(u.jsx)(o.b,{style:e,to:"/settings",children:"settings"})]}),Object(u.jsxs)(a.c,{children:[Object(u.jsx)(a.a,{path:"/settings"}),Object(u.jsx)(a.a,{path:"/vulnerabilities"}),Object(u.jsx)(a.a,{path:"/slaves"}),Object(u.jsx)(a.a,{path:"/",children:Object(u.jsx)(h,{})})]})]})})},x=Object(i.a)({serverInfo:b}),m=Object(i.b)(x);c.a.render(Object(u.jsx)(j.a,{store:m,children:Object(u.jsx)(f,{})}),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.7eb1ba67.chunk.js.map