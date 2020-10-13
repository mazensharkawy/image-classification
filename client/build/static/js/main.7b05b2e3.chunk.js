(this["webpackJsonpclassification-ui"]=this["webpackJsonpclassification-ui"]||[]).push([[0],{18:function(e,n,t){e.exports=t(29)},23:function(e,n,t){},26:function(e,n,t){},29:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(12),o=t.n(c),i=(t(23),t(4)),s=t(5),u=t(6),l=t(7),d=t(3),p=t.n(d),f=(t(26),t(16)),m=t(1),v=t(2);function h(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: center;\n"]);return h=function(){return e},e}function j(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: space-between;\n"]);return j=function(){return e},e}function g(){var e=Object(m.a)(["\n  display: flex;\n  align-items: center;\n"]);return g=function(){return e},e}var b="".concat(600,"px");"(max-width: ".concat("1024px",") and (min-width: ").concat(b,")"),v.a.div(g()),v.a.div(j()),v.a.div(h());function w(){var e=Object(m.a)(["\n  border-radius: 5px;\n  width: 100%;\n  height: 3vw;\n  -moz-appearance: none; /* Firefox */\n  -webkit-appearance: none; /* Safari and Chrome */\n  appearance: none;\n  padding: 0.5vw 1.6vw;\n  font-size: 1vw;\n  color: #717171;\n  border: none;\n  border: ",";\n  background: ",";\n  @media only screen and (max-width: ",") {\n    height: 9vw;\n    font-size: unset;\n  }\n  @media only screen and (min-width: ",") {\n    padding: 9px 30px;\n    border-radius: 7px;\n    font-size: 20px;\n    height: 60px;\n  }\n"]);return w=function(){return e},e}var x=v.a.input(w(),(function(e){return e.error?"1px solid red":"1px solid #ececec"}),(function(e){return e.error?"#ffcccb":"white"}),b,"1900px"),y=function(){function e(){Object(i.a)(this,e)}return Object(s.a)(e,null,[{key:"createProject",value:function(e){var n=e.projectName,t=e.classes;return this.send({url:"/api/create-project",data:{projectName:n,classes:t}})}},{key:"discardImage",value:function(e){var n=e.project,t=e.image;return this.send({url:"/api/discard-image",data:{project:n,image:t}})}},{key:"classifyImage",value:function(e){var n=e.imageClass,t=e.project,a=e.image;return this.send({url:"/api/classify-image",data:{imageClass:n,project:t,image:a}})}},{key:"requestNewImage",value:function(e){return this.get("/api/request-image/".concat(e))}},{key:"getProjectsAvailable",value:function(){return this.get("/api/projects").then((function(e){return e.projects}))}},{key:"send",value:function(e){var n=e.url,t=e.data,a={headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify(t)};return fetch(n,a).then(this.getData)}},{key:"get",value:function(e){var n=this;return fetch(e,{headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(e){return n.getData(e)}))}},{key:"getData",value:function(e){return e.json()}}]),e}();function O(){var e=Object(m.a)(["\n  color: red;\n"]);return O=function(){return e},e}function E(){var e=Object(m.a)(["\n  padding: 10px 20px;\n"]);return E=function(){return e},e}function C(){var e=Object(m.a)(["\n  padding: 10px 20px;\n"]);return C=function(){return e},e}function P(){var e=Object(m.a)(["\n  padding: 10px 0;\n  width: 100%;\n"]);return P=function(){return e},e}function k(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: column;\n  border-radius: 5px;\n  width: 30vw;\n"]);return k=function(){return e},e}function N(){var e=Object(m.a)(["\n  display: flex;\n  width: 30vw;\n"]);return N=function(){return e},e}function S(){var e=Object(m.a)([""]);return S=function(){return e},e}var I=v.a.div(S()),A=v.a.div(N()),z=v.a.div(k()),D=v.a.a(P()),q=v.a.button(C()),J=v.a.button(E()),M=v.a.p(O()),T=function(e){Object(l.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(i.a)(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=n.call.apply(n,[this].concat(c))).state={classes:[],inputError:!1,newClassName:""},e.addClass=function(){var n=e.state,t=n.classes,a=n.newClassName;/^[ A-Za-z0-9_@.#&+-]*$/.test(a)?p.a.includes(t,a)?e.setState({inputError:"Class Name already used"}):e.setState({classes:[].concat(Object(f.a)(t),[p.a.trim(a)]),inputError:!1}):e.setState({inputError:"Invalid character(s)"})},e.handleChange=function(n){return e.setState({newClassName:n.target.value})},e.renderClass=function(e){return r.a.createElement(D,null,e)},e.createProject=function(){var n=e.props.selectedProject,t=e.state,a=(t.projectName,t.classes);y.createProject({projectName:n,classes:a}),e.props.next()},e}return Object(s.a)(t,[{key:"render",value:function(){var e=this.state,n=e.newClassName,t=e.classes,a=e.inputError;return r.a.createElement(I,null,r.a.createElement(A,null,r.a.createElement(x,{value:n,placeHolder:"Enter a Class name",onChange:this.handleChange}),r.a.createElement(q,{onClick:this.addClass},"ADD")),a&&r.a.createElement(M,null,a),r.a.createElement(z,null,p.a.map(t,this.renderClass)),r.a.createElement(J,{onClick:this.createProject},"Proceed"))}}]),t}(a.Component),$=t(17);function B(){var e=Object(m.a)(["\n  color: white;\n  cursor: pointer;\n  background: ",";\n  text-align: center;\n  border-radius: 10px;\n  padding: 1.2vw 1.2vw;\n  font-weight: 500;\n  font-size: 1vw;\n  margin: 3px 0;\n  border: none;\n  @media only screen and (min-width: ",") {\n    border-radius: 13px;\n    font-size: 18px;\n    padding: 23px;\n  }\n"]);return B=function(){return e},e}function F(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: space-between;\n  min-width: 300px;\n"]);return F=function(){return e},e}function W(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  img {\n    width: 300px;\n    border-radius: 1vw;\n    object-fit: cover;\n    height: fit-content;\n  }\n"]);return W=function(){return e},e}function Z(){var e=Object(m.a)(["\n  background-color: #f9f9f9;\n  border-radius: 4vw;\n  padding: 2vw 2vw;\n  position: sticky;\n  top: 0;\n  @media only screen and (max-width: ",") {\n    width: 100%;\n    border-radius: 6vw;\n    padding: 0 2vw 2vw 2vw;\n    position: relative;\n  }\n  @media only screen and (min-width: ",") {\n    border-radius: 36px;\n    padding: 38.4px 19.2px;\n  }\n  width: 30vw;\n  margin: 0 auto;\n  label {\n    margin-top: 10px;\n    display: block;\n  }\n"]);return Z=function(){return e},e}function _(){var e=Object(m.a)(["\n  display: flex;\n  flex-direction: column;\n"]);return _=function(){return e},e}function H(){var e=Object(m.a)(["\n  display: flex;\n  justify-content: center;\n"]);return H=function(){return e},e}var L=v.a.div(H()),G=v.a.div(_()),K=v.a.div(Z(),b,"1900px"),Q=v.a.div(W()),R=v.a.div(F()),U=v.a.button(B(),"#604cd5","1900px"),V=function(e){Object(l.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=n.call.apply(n,[this].concat(r))).state={},e.componentDidMount=function(){y.requestNewImage(e.props.selectedProject).then(e.loadNewImage)},e.loadNewImage=function(n){console.log({res:n}),e.setState(Object($.a)({},n))},e.classify=function(){var n=e.state,t=n.img,a=n.selectedClass,r=e.props.selectedProject;y.classifyImage({imageClass:a,project:r,image:t}).then(e.loadNewImage)},e.selectClass=function(n){return e.setState({selectedClass:n.target.value})},e}return Object(s.a)(t,[{key:"discard",value:function(){var e=this.state.img,n=this.props.selectedProject;y.discardImage({project:n,image:e}).then(this.loadNewImage)}},{key:"render",value:function(){var e=this,n=this.state,t=n.classes,a=n.img,c=n.selectedClass;return r.a.createElement(L,null,r.a.createElement(Q,null,r.a.createElement("img",{src:a,alt:"car image"})),r.a.createElement(G,null,r.a.createElement(K,null,r.a.createElement("div",{style:{margin:"0 auto",width:"fit-content"}},p.a.map(t,(function(n){return r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"classes",value:n,checked:c===n,onChange:e.selectClass}),p.a.upperFirst(n))}))),r.a.createElement(R,null,r.a.createElement(U,{onClick:this.classify},"Submit"),r.a.createElement(U,{onClick:this.discard},"Discard Image")))))}}]),t}(a.Component);function X(){var e=Object(m.a)(["\n  color: red;\n"]);return X=function(){return e},e}function Y(){var e=Object(m.a)(["\n  color: white;\n  cursor: pointer;\n  background: ",";\n  text-align: center;\n  border-radius: 10px;\n  padding: 1.2vw 1.2vw;\n  font-weight: 500;\n  font-size: 1vw;\n  margin: 3px 0;\n  border: none;\n  @media only screen and (min-width: ",") {\n    border-radius: 13px;\n    font-size: 18px;\n    padding: 23px;\n  }\n"]);return Y=function(){return e},e}function ee(){var e=Object(m.a)(["\n  display: block;\n  padding: 10px 0;\n  border-top: 1px solid #ececec;\n  border-bottom: 1px solid #ececec;\n  text-align: center;\n  width: 100%;\n"]);return ee=function(){return e},e}function ne(){var e=Object(m.a)(["\nwidth: 30vw;\n"]);return ne=function(){return e},e}function te(){var e=Object(m.a)(["\n  border-radius: 5px;\n  width: 30vw;\n"]);return te=function(){return e},e}function ae(){var e=Object(m.a)(["\nwidth: 40vw;\nmargin: 5vw auto;\n"]);return ae=function(){return e},e}var re=v.a.div(ae()),ce=v.a.div(te()),oe=Object(v.a)(x)(ne()),ie=v.a.a(ee()),se=v.a.button(Y(),"#604cd5","1900px"),ue=v.a.p(X()),le=function(e){Object(l.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(i.a)(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=n.call.apply(n,[this].concat(c))).state={newProjectName:"",error:null},e.handleChange=function(n){return e.setState({newProjectName:n.target.value})},e.createProject=function(){var n=e.props,t=n.projects,a=n.selectProject,r=(n.next,e.state.newProjectName);/^[ A-Za-z0-9_@.#&+-]*$/.test(r)?p.a.includes(t,r)?e.setState({error:"Project Name exists. Please try another name"}):a(r):e.setState({error:"Invalid character(s)"})},e.render=function(){var n=e.props,t=n.selectProject,a=n.projects,c=e.state,o=c.newProjectName,i=c.error;return r.a.createElement(re,null,a&&a.error&&r.a.createElement("p",null,"Error loading Projects"),r.a.createElement("p",null,"Select a project to continue classifying"),r.a.createElement(ce,null,a&&0===p.a.size(a)&&r.a.createElement(ie,null,"No projects found"),!a&&r.a.createElement(ie,null,"Loading"),p.a.map(a,(function(e,n){return r.a.createElement(ie,{onClick:function(){return t(n)}},n)}))),r.a.createElement("p",null,"Or Create A New Project"),r.a.createElement(oe,{placeholder:"New Project Name",value:o,onChange:e.handleChange}),r.a.createElement(se,{onClick:e.createProject},"Add new Project"),r.a.createElement(ue,null,i))},e}return t}(a.Component),de=function(e){Object(l.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(i.a)(this,t);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return(e=n.call.apply(n,[this].concat(c))).state={page:0},e.next=function(){return e.setState({page:e.state.page+1})},e.setProjects=function(n){return e.setState({projects:n})},e.selectProject=function(n){var t=e.state.projects;e.setState({selectedProject:p.a.trim(n)}),p.a.includes(p.a.keys(t),n)?e.setState({page:2}):e.next()},e.renderPage=function(){var n=e.state,t=n.page,a=n.selectedProject,c=n.projects;switch(t){case 0:return r.a.createElement(le,{selectProject:e.selectProject,next:e.next,projects:c});case 1:return r.a.createElement(T,{selectedProject:a,next:e.next});case 2:return r.a.createElement(V,{selectedProject:a})}},e}return Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;y.getProjectsAvailable().then(this.setProjects).catch((function(n){console.log({error:n}),e.setProjects({error:!0})}))}},{key:"render",value:function(){return this.renderPage()}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(de,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.7b05b2e3.chunk.js.map