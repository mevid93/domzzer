(this["webpackJsonpdomzzer-master-frontend"]=this["webpackJsonpdomzzer-master-frontend"]||[]).push([[0],{104:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(9),c=n.n(i),a=n(45),s=n(11),l=n(18),j=n(14),o=n(154),d=n(155),u=n(150),b=n(148),h=n(147),f=n(153),O=n(157),v=n(2),x=function(){var e=Object(s.c)((function(e){return e.infoMsg}));return null===e||void 0===e?null:Object(v.jsx)("div",{children:Object(v.jsx)(O.a,{variant:"filled",severity:"success",children:e})})},m=function(){var e=Object(s.c)((function(e){return e.errorMsg}));return null===e||void 0===e?null:Object(v.jsx)("div",{children:Object(v.jsx)(O.a,{variant:"filled",severity:"error",children:e})})},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SERVER_INFO":return t.info;default:return e}},p=n(23),S=n.n(p),y={getInfo:function(){return S.a.get("/api/info").then((function(e){return e.data}))}},E=n(142),I=n(143),T=n(144),w=n(145),N=n(146),z=function(e){return{type:"SET_ERROR_MESSAGE",errorMsg:e}},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ERROR_MESSAGE":return void 0===t.errorMsg?null:t.errorMsg;default:return e}},_=function(e){var t=e.serverInfo;return void 0===t||void 0===t.serverName?Object(v.jsx)("div",{children:Object(v.jsx)("p",{children:"Server information not available!"})}):Object(v.jsx)(E.a,{children:Object(v.jsx)(I.a,{"aria-label":"simple table",children:Object(v.jsxs)(T.a,{children:[Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Server name:"}),Object(v.jsx)(N.a,{align:"left",children:t.serverName})]},"1"),Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Server OS:"}),Object(v.jsx)(N.a,{align:"left",children:t.serverType})]},"2"),Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Server OS-version:"}),Object(v.jsx)(N.a,{align:"left",children:t.serverVersion})]},"3"),Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Server memory:"}),Object(v.jsx)(N.a,{align:"left",children:t.serverMemoryMb})]},"4"),Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Server date:"}),Object(v.jsx)(N.a,{align:"left",children:t.serverDate})]},"5"),Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Server uptime:"}),Object(v.jsx)(N.a,{align:"left",children:t.serverUptime})]},"6"),Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Server controlled slave machines:"}),Object(v.jsx)(N.a,{align:"left",children:t.numberOfSlaves})]},"7")]})})})},R=function(e){var t=e.serverInfo;if(void 0===t||void 0===t.serverName)return Object(v.jsx)("div",{children:Object(v.jsx)("p",{children:"Server information not available!"})});var n=t.numberOfTestsPerformed,r=t.numberOfPotentialVulnerabilities,i=void 0!==n&&0!==n?r/n:0;return Object(v.jsx)(E.a,{children:Object(v.jsx)(I.a,{"aria-label":"simple table",children:Object(v.jsxs)(T.a,{children:[Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Number of tests performed:"}),Object(v.jsx)(N.a,{align:"right",children:n})]},"1"),Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Number of potential vulnerabilities found:"}),Object(v.jsx)(N.a,{align:"right",children:r})]},"2"),Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:"Potential vulnerabilities to tests ratio:"}),Object(v.jsx)(N.a,{align:"right",children:i})]},"3")]})})})},L=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.serverInfo}));return Object(r.useEffect)((function(){y.getInfo().then((function(t){return e(function(e){return{type:"SET_SERVER_INFO",info:e}}(t))})).catch((function(t){e(z("Could not retrieve server information!")),setTimeout((function(){e(z(null))}),5e3)}))}),[]),Object(v.jsxs)("div",{children:[Object(v.jsx)("h1",{children:"domzzer / Home"}),Object(v.jsx)("h3",{children:"Master Server Information"}),Object(v.jsx)(_,{serverInfo:t}),Object(v.jsx)("br",{}),Object(v.jsx)("h3",{children:"Vulnerability Information"}),Object(v.jsx)(R,{serverInfo:t})]})},V=n(21),B="/api/slaves",M={getAll:function(){return S.a.get(B).then((function(e){return e.data}))},getById:function(e){return S.a.get("".concat(B,"/").concat(e)).then((function(e){return e.data}))},create:function(e){return S.a.post(B,e).then((function(e){return e.data}))},remove:function(e){return S.a.delete("".concat(B,"/").concat(e)).then((function(e){return e.data}))}},C=function(e){return{type:"SET_INFO_MESSAGE",infoMsg:e}},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_INFO_MESSAGE":return void 0===t.infoMsg?null:t.infoMsg;default:return e}},D=n(149),G=n(156),U=Object(h.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(1)},submit:{padding:e.spacing(2),margin:e.spacing(3,0,2)}}})),k=function(){var e=Object(s.b)(),t=U(),n=Object(r.useState)(""),i=Object(V.a)(n,2),c=i[0],a=i[1],l=Object(r.useState)(""),j=Object(V.a)(l,2),o=j[0],d=j[1];return Object(v.jsxs)("div",{children:[Object(v.jsx)("h1",{children:"domzzer / Slaves / New"}),Object(v.jsx)(b.a,{component:"main",maxWidth:"xs",children:Object(v.jsxs)("div",{className:t.paper,children:[Object(v.jsx)(D.a,{gutterBottom:!0,variant:"h3",children:"Add New Slave"}),Object(v.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={name:c,address:o};M.create(n).then((function(t){e(C("Succesfully added new slave to database!")),setTimeout((function(){e(C(null))}),5e3),a(""),d("")})).catch((function(t){e(z("Could not add new slave to database!")),setTimeout((function(){e(z(null))}),5e3)}))},className:t.form,children:[Object(v.jsx)(G.a,{label:"Name",variant:"outlined",margin:"normal",required:!0,fullWidth:!0,onChange:function(e){a(e.target.value)},value:c}),Object(v.jsx)(G.a,{label:"Address",variant:"outlined",margin:"normal",required:!0,fullWidth:!0,onChange:function(e){d(e.target.value)},value:o}),Object(v.jsx)(u.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,children:"Add"})]})]})})]})},F=function(e){return{type:"SET_SLAVES",slaves:e}},P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SLAVES":return t.slaves;case"INSERT_SLAVE":return e.find((function(e){return e.id===t.slave.id}))?e:e.concat(t.slave);default:return e}},q=n(151),J=n(152),Y=function(e){var t=e.slaves;return Object(v.jsx)(E.a,{style:{marginTop:30},children:Object(v.jsxs)(I.a,{"aria-label":"simple table",children:[Object(v.jsx)(q.a,{children:Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{children:"Server name"}),Object(v.jsx)(N.a,{children:"Server addess"}),Object(v.jsx)(N.a,{children:"Server status"})]})}),Object(v.jsx)(T.a,{children:t.map((function(e){return Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:Object(v.jsx)(l.b,{to:"/slaves/".concat(e.id),children:e.name})}),Object(v.jsx)(N.a,{align:"left",children:e.address}),Object(v.jsx)(N.a,{align:"left",children:e.status})]},e.id)}))})]})})},H=function(){var e=Object(r.useState)(""),t=Object(V.a)(e,2),n=t[0],i=t[1],c=Object(s.b)(),a=Object(s.c)((function(e){return e.slaves})).filter((function(e){return!!e.name.toLowerCase().includes(n.toLowerCase())||(!!e.address.toLowerCase().includes(n.toLowerCase())||!!e.status.toLowerCase().includes(n.toLowerCase()))}));Object(r.useEffect)((function(){M.getAll().then((function(e){return c(F(e))})).catch((function(e){c(z("Could not retrieve slave information from server!")),setTimeout((function(){c(z(null))}),5e3)}))}),[]);return Object(v.jsxs)("div",{children:[Object(v.jsx)("h1",{children:"domzzer / Slaves"}),Object(v.jsxs)(J.a,{container:!0,spacing:3,justify:"space-around",children:[Object(v.jsx)(J.a,{item:!0,xs:6,style:{display:"flex",justifyContent:"flex-start"},children:Object(v.jsx)(G.a,{onChange:function(e){i(e.target.value)},fullWidth:!0,value:n,placeholder:"filter by keyword"})}),Object(v.jsx)(J.a,{item:!0,xs:6,style:{display:"flex",justifyContent:"center"},children:Object(v.jsx)(u.a,{color:"primary",variant:"contained",component:l.b,to:"/slaves/new",children:"add new slave"})})]}),Object(v.jsx)(Y,{slaves:a})]})},K=function(){var e=Object(j.f)(),t=Object(s.b)(),n=Object(j.g)().id,i=Object(s.c)((function(e){return e.slaves})),c=i.find((function(e){return e.id===n}));Object(r.useEffect)((function(){M.getById(n).then((function(e){t(function(e){return{type:"INSERT_SLAVE",slave:e}}(e))})).catch((function(e){}))}),[]);return void 0===c?Object(v.jsx)("div",{children:Object(v.jsx)("h1",{children:"domzzer - Slaves - 404 (Slave not found) "})}):Object(v.jsxs)("div",{children:[Object(v.jsxs)("h1",{children:["domzzer / Slaves / ",c.name," "]}),Object(v.jsxs)("h3",{children:["address: ",c.address]}),Object(v.jsxs)("h3",{children:["status: ",c.status]}),Object(v.jsx)("button",{onClick:function(){M.remove(n).then((function(){var r=i.filter((function(e){return e.id!==n}));t(F(r)),e.push("/slaves")})).catch((function(e){}))},children:"Remove slave from database"})]})},Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VULNERABILITIES":return t.vulnerabilities;case"INSERT_VULNERABILITY":return e.find((function(e){return e.id===t.vulnerability.id}))?e:e.concat(t.vulnerability);default:return e}},X="/api/vulnerabilities",Z={getAll:function(){return S.a.get(X).then((function(e){return e.data}))},getById:function(e){return S.a.get("".concat(X,"/").concat(e)).then((function(e){return e.data}))}},$=function(e){var t=e.vulnerabilities;return Object(v.jsx)(E.a,{children:Object(v.jsxs)(I.a,{"aria-label":"simple table",children:[Object(v.jsx)(q.a,{children:Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{children:"ID"}),Object(v.jsx)(N.a,{children:"Server address"}),Object(v.jsx)(N.a,{children:"Target browser"}),Object(v.jsx)(N.a,{children:"Timestamp"}),Object(v.jsx)(N.a,{children:"Status"})]})}),Object(v.jsx)(T.a,{children:t.map((function(e){return Object(v.jsxs)(w.a,{children:[Object(v.jsx)(N.a,{align:"left",children:Object(v.jsx)(l.b,{to:"/vulnerabilities/".concat(e.id),children:e.id})}),Object(v.jsx)(N.a,{align:"left",children:e.serverAddress}),Object(v.jsx)(N.a,{align:"left",children:e.targetBrowser}),Object(v.jsx)(N.a,{align:"left",children:e.timestamp}),Object(v.jsx)(N.a,{align:"left",children:e.status})]},e.id)}))})]})})},ee=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.vulnerabilities}));return Object(r.useEffect)((function(){Z.getAll().then((function(t){return e(function(e){return{type:"SET_VULNERABILITIES",vulnerabilities:e}}(t))})).catch((function(t){e(z("Could not retrieve vulnerability information from server!")),setTimeout((function(){e(z(null))}),5e3)}))}),[]),Object(v.jsxs)("div",{children:[Object(v.jsx)("h1",{children:"domzzer / Vulnerabilities"}),Object(v.jsx)("h3",{children:"Vulnerabilities in Database"}),Object(v.jsx)($,{vulnerabilities:t})]})},te=function(){var e=Object(s.b)(),t=Object(j.g)().id,n=Object(s.c)((function(e){return e.vulnerabilities})).find((function(e){return e.id===t}));return Object(r.useEffect)((function(){Z.getById(t).then((function(t){e(function(e){return{type:"INSERT_VULNERABILITY",vulnerability:e}}(t))})).catch((function(e){}))}),[]),void 0===n?Object(v.jsx)("div",{children:Object(v.jsx)("h1",{children:"domzzer - Vulnerabilities - 404 (Vulnerability not found) "})}):Object(v.jsxs)("div",{children:[Object(v.jsxs)("h1",{children:["domzzer / Vulnerabilities / ",n.id," "]}),Object(v.jsxs)("h3",{children:["server address: ",n.serverAddress]}),Object(v.jsxs)("h3",{children:["target browser: ",n.targetBrowser]}),Object(v.jsxs)("h3",{children:["timestamp: ",n.timestamp]}),Object(v.jsxs)("h3",{children:["status: ",n.status]})]})},ne=Object(h.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)}}}));var re=function(){var e=ne();return Object(v.jsx)(l.a,{children:Object(v.jsxs)("div",{className:e.root,children:[Object(v.jsx)(f.a,{}),Object(v.jsx)(o.a,{position:"absolute",className:e.appBar,children:Object(v.jsxs)(d.a,{children:[Object(v.jsx)(u.a,{color:"inherit",component:l.b,to:"/",children:"home"}),Object(v.jsx)(u.a,{color:"inherit",component:l.b,to:"/slaves",children:"slaves"}),Object(v.jsx)(u.a,{color:"inherit",component:l.b,to:"/vulnerabilities",children:"vulnerabilities"}),Object(v.jsx)(u.a,{color:"inherit",component:l.b,to:"/settings",children:"settings"})]})}),Object(v.jsxs)("main",{className:e.content,children:[Object(v.jsx)("div",{className:e.appBarSpacer}),Object(v.jsxs)(b.a,{maxWidth:"lg",className:e.container,children:[Object(v.jsx)(x,{}),Object(v.jsx)(m,{}),Object(v.jsxs)(j.c,{children:[Object(v.jsx)(j.a,{path:"/settings"}),Object(v.jsx)(j.a,{path:"/vulnerabilities/:id",children:Object(v.jsx)(te,{})}),Object(v.jsx)(j.a,{path:"/vulnerabilities",children:Object(v.jsx)(ee,{})}),Object(v.jsx)(j.a,{path:"/slaves/new",children:Object(v.jsx)(k,{})}),Object(v.jsx)(j.a,{path:"/slaves/:id",children:Object(v.jsx)(K,{})}),Object(v.jsx)(j.a,{path:"/slaves",children:Object(v.jsx)(H,{})}),Object(v.jsx)(j.a,{path:"/",children:Object(v.jsx)(L,{})})]})]})]})]})})},ie=Object(a.a)({serverInfo:g,slaves:P,vulnerabilities:Q,infoMsg:W,errorMsg:A}),ce=Object(a.b)(ie);c.a.render(Object(v.jsx)(s.a,{store:ce,children:Object(v.jsx)(re,{})}),document.getElementById("root"))}},[[104,1,2]]]);
//# sourceMappingURL=main.74fce8ec.chunk.js.map