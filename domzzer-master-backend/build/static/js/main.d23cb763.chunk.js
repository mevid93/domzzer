(this["webpackJsonpdomzzer-master-frontend"]=this["webpackJsonpdomzzer-master-frontend"]||[]).push([[0],{126:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(9),a=n.n(i),c=n(61),s=n(11),l=n(17),o=n(14),j=n(181),d=n(2),u=function(){var e=Object(s.c)((function(e){return e.infoMsg}));return Object(d.jsx)("div",{children:null!==e&&void 0!==e&&Object(d.jsx)(j.a,{variant:"filled",severity:"success",children:e})})},b=function(){var e=Object(s.c)((function(e){return e.errorMsg}));return Object(d.jsx)("div",{children:null!==e&&void 0!==e&&Object(d.jsx)(j.a,{variant:"filled",severity:"error",children:e})})},h=function(e){return{type:"SET_ERROR_MESSAGE",errorMsg:e}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ERROR_MESSAGE":return void 0===t.errorMsg?null:t.errorMsg;default:return e}},O=function(e){return{type:"SET_INFO_MESSAGE",infoMsg:e}},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_INFO_MESSAGE":return void 0===t.infoMsg?null:t.infoMsg;default:return e}},x=function(){var e=Object(s.b)();return{showErrorMessage:function(t){null!==t&&void 0!==t&&(e(h(t)),setTimeout((function(){e(h(null))}),5e3))},showInfoMessage:function(t){null!==t&&void 0!==t&&(e(O(t)),setTimeout((function(){e(O(null))}),5e3))}}},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SERVER_INFO":return t.info;default:return e}},g=n(25),p=n.n(g),S={getInfo:function(){return p.a.get("/api/info").then((function(e){return e.data}))}},y=n(163),E=n(164),w=n(165),I=n(166),N=n(167),T=function(e){var t=e.serverInfo;return void 0===t||void 0===t.serverName?Object(d.jsx)("div",{children:Object(d.jsx)("p",{children:"Server information not available!"})}):Object(d.jsx)(y.a,{children:Object(d.jsx)(E.a,{"aria-label":"simple table",children:Object(d.jsxs)(w.a,{children:[Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Server name:"}),Object(d.jsx)(N.a,{align:"left",children:t.serverName})]},"1"),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Server OS:"}),Object(d.jsx)(N.a,{align:"left",children:t.serverType})]},"2"),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Server OS-version:"}),Object(d.jsx)(N.a,{align:"left",children:t.serverVersion})]},"3"),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Server memory:"}),Object(d.jsx)(N.a,{align:"left",children:t.serverMemoryMb})]},"4"),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Server date:"}),Object(d.jsx)(N.a,{align:"left",children:t.serverDate})]},"5"),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Server uptime:"}),Object(d.jsx)(N.a,{align:"left",children:t.serverUptime})]},"6"),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Server controlled slave machines:"}),Object(d.jsx)(N.a,{align:"left",children:t.numberOfSlaves})]},"7")]})})})},z=function(e){var t=e.serverInfo;if(void 0===t||void 0===t.serverName)return Object(d.jsx)("div",{children:Object(d.jsx)("p",{children:"Server information not available!"})});var n=t.numberOfTestsPerformed,r=t.numberOfPotentialVulnerabilities,i=void 0!==n&&0!==n?r/n:0;return Object(d.jsx)(y.a,{children:Object(d.jsx)(E.a,{"aria-label":"simple table",children:Object(d.jsxs)(w.a,{children:[Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Number of tests performed:"}),Object(d.jsx)(N.a,{align:"right",children:n})]},"1"),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Number of potential vulnerabilities found:"}),Object(d.jsx)(N.a,{align:"right",children:r})]},"2"),Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:"Potential vulnerabilities to tests ratio:"}),Object(d.jsx)(N.a,{align:"right",children:i})]},"3")]})})})},M=function(){var e=x(),t=Object(s.b)(),n=Object(s.c)((function(e){return e.serverInfo}));return Object(r.useEffect)((function(){S.getInfo().then((function(e){return t(function(e){return{type:"SET_SERVER_INFO",info:e}}(e))})).catch((function(){e.showErrorMessage("Could not retrieve server information!")}))}),[]),Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:"domzzer / Home"}),Object(d.jsx)("h3",{children:"Master Server Information"}),Object(d.jsx)(T,{serverInfo:n}),Object(d.jsx)("br",{}),Object(d.jsx)("h3",{children:"Vulnerability Information"}),Object(d.jsx)(z,{serverInfo:n})]})},A=n(18),C="/api/slaves",_={getAll:function(){return p.a.get(C).then((function(e){return e.data}))},getById:function(e){return p.a.get("".concat(C,"/").concat(e)).then((function(e){return e.data}))},create:function(e){return p.a.post(C,e).then((function(e){return e.data}))},remove:function(e){return p.a.delete("".concat(C,"/").concat(e)).then((function(e){return e.data}))}},R=n(168),L=n(169),V=n(170),B=n(182),W=n(173),P=Object(R.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(1)},submit:{padding:e.spacing(2),margin:e.spacing(3,0,2)}}})),q=function(){var e=x(),t=P(),n=Object(r.useState)(""),i=Object(A.a)(n,2),a=i[0],c=i[1],s=Object(r.useState)(""),l=Object(A.a)(s,2),o=l[0],j=l[1],u=Object(r.useState)(""),b=Object(A.a)(u,2),h=b[0],f=b[1],O=Object(r.useState)(""),v=Object(A.a)(O,2),m=v[0],g=v[1];return Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:"domzzer / Slaves / New"}),Object(d.jsx)(L.a,{component:"main",maxWidth:"xs",children:Object(d.jsxs)("div",{className:t.paper,children:[Object(d.jsx)(V.a,{gutterBottom:!0,variant:"h3",children:"Add New Slave"}),Object(d.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={name:a,address:o,username:h,password:m};_.create(n).then((function(){e.showInfoMessage("Succesfully added new slave to database!"),c(""),j(""),f(""),g("")})).catch((function(){e.showErrorMessage("Could not add new slave to database!!!")}))},className:t.form,children:[Object(d.jsx)(B.a,{label:"Name",variant:"outlined",margin:"normal",required:!0,fullWidth:!0,onChange:function(e){return c(e.target.value)},value:a}),Object(d.jsx)(B.a,{label:"Address",variant:"outlined",margin:"normal",required:!0,fullWidth:!0,onChange:function(e){return j(e.target.value)},value:o}),Object(d.jsx)(B.a,{label:"Username (optional)",variant:"outlined",margin:"normal",required:!1,fullWidth:!0,onChange:function(e){return f(e.target.value)},value:h}),Object(d.jsx)(B.a,{label:"Password (optional)",variant:"outlined",margin:"normal",required:!1,fullWidth:!0,type:"password",onChange:function(e){return g(e.target.value)},value:m}),Object(d.jsx)(W.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:t.submit,children:"Add"})]})]})})]})},k=function(e){return{type:"SET_SLAVES",slaves:e}},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_SLAVES":return t.slaves;case"INSERT_SLAVE":return e.find((function(e){return e.id===t.slave.id}))?e:e.concat(t.slave);default:return e}},D=n(5),G=Object(D.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.action.hover}}}}))(I.a),F=Object(D.a)((function(e){return{head:{backgroundColor:e.palette.common.black,color:e.palette.common.white},body:{fontSize:14}}}))(N.a),J=n(174),Y=n(180),H=function(e){var t=e.slaves,n=Object(r.useState)(0),i=Object(A.a)(n,2),a=i[0],c=i[1],s=10,o=s-Math.min(s,t.length-a*s);return Object(d.jsxs)(y.a,{style:{marginTop:50},children:[Object(d.jsxs)(E.a,{"aria-label":"simple table",children:[Object(d.jsx)(J.a,{children:Object(d.jsxs)(G,{children:[Object(d.jsx)(F,{children:"Server name"}),Object(d.jsx)(F,{children:"Server address"}),Object(d.jsx)(F,{children:"Server status"})]})}),Object(d.jsxs)(w.a,{children:[t.slice(a*s,a*s+s).map((function(e){return Object(d.jsxs)(G,{children:[Object(d.jsx)(F,{align:"left",children:Object(d.jsx)(l.b,{to:"/slaves/".concat(e.id),children:e.name})}),Object(d.jsx)(F,{align:"left",children:e.address}),Object(d.jsx)(F,{align:"left",children:e.status})]},e.id)})),o>0&&Object(d.jsx)(G,{style:{height:53*o},children:Object(d.jsx)(F,{colSpan:6})})]})]}),Object(d.jsx)(Y.a,{rowsPerPageOptions:[10],component:"div",count:t.length,rowsPerPage:10,page:a,onChangePage:function(e,t){return c(t)}})]})},K=n(176),Q=function(){var e=Object(s.b)(),t=x(),n=Object(r.useState)(""),i=Object(A.a)(n,2),a=i[0],c=i[1],o=Object(s.c)((function(e){return e.slaves})).filter((function(e){return!!e.name.toLowerCase().includes(a.toLowerCase())||(!!e.address.toLowerCase().includes(a.toLowerCase())||!!e.status.toLowerCase().includes(a.toLowerCase()))}));return Object(r.useEffect)((function(){_.getAll().then((function(t){return e(k(t))})).catch((function(){t.showErrorMessage("Could not retrieve slave information from server!")}))}),[]),Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:"domzzer / Slaves"}),Object(d.jsxs)(K.a,{container:!0,spacing:3,justify:"space-around",children:[Object(d.jsx)(K.a,{item:!0,xs:6,style:{marginTop:15,display:"flex",justifyContent:"flex-start"},children:Object(d.jsx)(B.a,{onChange:function(e){return c(e.target.value)},fullWidth:!0,value:a,placeholder:"filter by keyword"})}),Object(d.jsx)(K.a,{item:!0,xs:6,style:{display:"flex",justifyContent:"center"},children:Object(d.jsx)(W.a,{color:"primary",variant:"contained",component:l.b,to:"/slaves/new",children:"add new slave"})})]}),Object(d.jsx)(H,{slaves:o})]})},X=Object(R.a)((function(e){return{root:{flexGrow:1},gridItem:{margin:e.spacing(3,0,2)},paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(1)},submit:{padding:e.spacing(2),margin:e.spacing(3,0,2)}}})),Z=function(e){var t=e.slave,n=e.classes;return Object(d.jsx)("div",{children:Object(d.jsxs)("form",{className:n.form,children:[Object(d.jsx)(B.a,{label:"Name",variant:"outlined",margin:"normal",required:!0,fullWidth:!0,value:t.name,disabled:!0}),Object(d.jsx)(B.a,{label:"Address",variant:"outlined",margin:"normal",required:!0,fullWidth:!0,value:t.address,disabled:!0}),Object(d.jsx)(B.a,{label:"Username (optional)",variant:"outlined",margin:"normal",required:!1,fullWidth:!0,value:t.username,disabled:!0}),Object(d.jsx)(B.a,{label:"Password (optional)",variant:"outlined",margin:"normal",required:!1,fullWidth:!0,type:"password",value:t.password,disabled:!0})]})})},$=function(){var e=X(),t=Object(o.f)(),n=Object(s.b)(),i=Object(o.g)().id,a=Object(s.c)((function(e){return e.slaves})),c=a.find((function(e){return e.id===i}));Object(r.useEffect)((function(){_.getById(i).then((function(e){n(function(e){return{type:"INSERT_SLAVE",slave:e}}(e))})).catch((function(e){}))}),[]);return void 0===c?Object(d.jsx)("div",{children:Object(d.jsx)("h1",{children:"domzzer / Slaves / 404 (Slave not found) "})}):Object(d.jsxs)("div",{children:[Object(d.jsxs)("h1",{children:["domzzer / Slaves / ",c.name," "]}),Object(d.jsx)(L.a,{component:"main",maxWidth:"xs",children:Object(d.jsx)("div",{className:e.paper,children:Object(d.jsx)(Z,{slave:c,classes:e})})}),Object(d.jsxs)(K.a,{container:!0,direction:"column",justify:"center",alignItems:"center",children:[Object(d.jsx)(K.a,{item:!0,className:e.gridItem,xs:!0,children:Object(d.jsx)(W.a,{color:"primary",variant:"contained",size:"large",children:"Edit information"})}),Object(d.jsx)(K.a,{item:!0,xs:!0,children:Object(d.jsx)(W.a,{color:"secondary",variant:"contained",size:"large",onClick:function(){_.remove(i).then((function(){var e=a.filter((function(e){return e.id!==i}));n(k(e)),t.push("/slaves")})).catch((function(e){}))},children:"Remove from database"})})]})]})},ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VULNERABILITIES":return t.vulnerabilities;case"INSERT_VULNERABILITY":return e.find((function(e){return e.id===t.vulnerability.id}))?e:e.concat(t.vulnerability);default:return e}},te="/api/vulnerabilities",ne={getAll:function(){return p.a.get(te).then((function(e){return e.data}))},getById:function(e){return p.a.get("".concat(te,"/").concat(e)).then((function(e){return e.data}))}},re=function(e){var t=e.vulnerabilities;return Object(d.jsx)(y.a,{children:Object(d.jsxs)(E.a,{"aria-label":"simple table",children:[Object(d.jsx)(J.a,{children:Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{children:"ID"}),Object(d.jsx)(N.a,{children:"Server address"}),Object(d.jsx)(N.a,{children:"Target browser"}),Object(d.jsx)(N.a,{children:"Timestamp"}),Object(d.jsx)(N.a,{children:"Status"})]})}),Object(d.jsx)(w.a,{children:t.map((function(e){return Object(d.jsxs)(I.a,{children:[Object(d.jsx)(N.a,{align:"left",children:Object(d.jsx)(l.b,{to:"/vulnerabilities/".concat(e.id),children:e.id})}),Object(d.jsx)(N.a,{align:"left",children:e.serverAddress}),Object(d.jsx)(N.a,{align:"left",children:e.targetBrowser}),Object(d.jsx)(N.a,{align:"left",children:e.timestamp}),Object(d.jsx)(N.a,{align:"left",children:e.status})]},e.id)}))})]})})},ie=function(){var e=x(),t=Object(s.b)(),n=Object(s.c)((function(e){return e.vulnerabilities}));return Object(r.useEffect)((function(){ne.getAll().then((function(e){return t(function(e){return{type:"SET_VULNERABILITIES",vulnerabilities:e}}(e))})).catch((function(){e.showErrorMessage("Could not retrieve vulnerability information from server!")}))}),[]),Object(d.jsxs)("div",{children:[Object(d.jsx)("h1",{children:"domzzer / Vulnerabilities"}),Object(d.jsx)("h3",{children:"Vulnerabilities in Database"}),Object(d.jsx)(re,{vulnerabilities:n})]})},ae=function(){var e=Object(s.b)(),t=Object(o.g)().id,n=Object(s.c)((function(e){return e.vulnerabilities})).find((function(e){return e.id===t}));return Object(r.useEffect)((function(){ne.getById(t).then((function(t){e(function(e){return{type:"INSERT_VULNERABILITY",vulnerability:e}}(t))})).catch((function(e){}))}),[]),void 0===n?Object(d.jsx)("div",{children:Object(d.jsx)("h1",{children:"domzzer - Vulnerabilities - 404 (Vulnerability not found) "})}):Object(d.jsxs)("div",{children:[Object(d.jsxs)("h1",{children:["domzzer / Vulnerabilities / ",n.id," "]}),Object(d.jsxs)("h3",{children:["server address: ",n.serverAddress]}),Object(d.jsxs)("h3",{children:["target browser: ",n.targetBrowser]}),Object(d.jsxs)("h3",{children:["timestamp: ",n.timestamp]}),Object(d.jsxs)("h3",{children:["status: ",n.status]})]})},ce=n(178),se=n(175),le=n(177),oe=Object(R.a)((function(e){return{root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)}}}));var je=function(){var e=oe();return Object(d.jsx)(l.a,{children:Object(d.jsxs)("div",{className:e.root,children:[Object(d.jsx)(le.a,{}),Object(d.jsx)(ce.a,{position:"absolute",className:e.appBar,children:Object(d.jsxs)(se.a,{children:[Object(d.jsx)(W.a,{color:"inherit",component:l.b,to:"/",children:"home"}),Object(d.jsx)(W.a,{color:"inherit",component:l.b,to:"/slaves",children:"slaves"}),Object(d.jsx)(W.a,{color:"inherit",component:l.b,to:"/vulnerabilities",children:"vulnerabilities"}),Object(d.jsx)(W.a,{color:"inherit",component:l.b,to:"/users",children:"users"}),Object(d.jsx)(W.a,{color:"inherit",component:l.b,to:"/settings",children:"settings"})]})}),Object(d.jsxs)("main",{className:e.content,children:[Object(d.jsx)("div",{className:e.appBarSpacer}),Object(d.jsxs)(L.a,{maxWidth:"lg",className:e.container,children:[Object(d.jsx)(u,{}),Object(d.jsx)(b,{}),Object(d.jsxs)(o.c,{children:[Object(d.jsx)(o.a,{path:"/login"}),Object(d.jsx)(o.a,{path:"/users"}),Object(d.jsx)(o.a,{path:"/settings"}),Object(d.jsx)(o.a,{path:"/vulnerabilities/:id",children:Object(d.jsx)(ae,{})}),Object(d.jsx)(o.a,{path:"/vulnerabilities",children:Object(d.jsx)(ie,{})}),Object(d.jsx)(o.a,{path:"/slaves/new",children:Object(d.jsx)(q,{})}),Object(d.jsx)(o.a,{path:"/slaves/:id",children:Object(d.jsx)($,{})}),Object(d.jsx)(o.a,{path:"/slaves",children:Object(d.jsx)(Q,{})}),Object(d.jsx)(o.a,{path:"/",children:Object(d.jsx)(M,{})})]})]})]})]})})},de=Object(c.a)({serverInfo:m,slaves:U,vulnerabilities:ee,infoMsg:v,errorMsg:f}),ue=Object(c.b)(de);a.a.render(Object(d.jsx)(s.a,{store:ue,children:Object(d.jsx)(je,{})}),document.getElementById("root"))}},[[126,1,2]]]);
//# sourceMappingURL=main.d23cb763.chunk.js.map