"use strict";(self.webpackChunk_drayman_docs=self.webpackChunk_drayman_docs||[]).push([[5047],{3905:function(n,e,t){t.d(e,{Zo:function(){return m},kt:function(){return u}});var a=t(7294);function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function i(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function r(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(Object(t),!0).forEach((function(e){o(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function s(n,e){if(null==n)return{};var t,a,o=function(n,e){if(null==n)return{};var t,a,o={},i=Object.keys(n);for(a=0;a<i.length;a++)t=i[a],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(a=0;a<i.length;a++)t=i[a],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(o[t]=n[t])}return o}var l=a.createContext({}),p=function(n){var e=a.useContext(l),t=e;return n&&(t="function"==typeof n?n(e):r(r({},e),n)),t},m=function(n){var e=p(n.components);return a.createElement(l.Provider,{value:e},n.children)},c={inlineCode:"code",wrapper:function(n){var e=n.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(n,e){var t=n.components,o=n.mdxType,i=n.originalType,l=n.parentName,m=s(n,["components","mdxType","originalType","parentName"]),d=p(t),u=o,b=d["".concat(l,".").concat(u)]||d[u]||c[u]||i;return t?a.createElement(b,r(r({ref:e},m),{},{components:t})):a.createElement(b,r({ref:e},m))}));function u(n,e){var t=arguments,o=e&&e.mdxType;if("string"==typeof n||o){var i=t.length,r=new Array(i);r[0]=d;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=n,s.mdxType="string"==typeof n?n:o,r[1]=s;for(var p=2;p<i;p++)r[p]=t[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},7861:function(n,e,t){t.r(e),t.d(e,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return m},default:function(){return d}});var a=t(7462),o=t(3366),i=(t(7294),t(3905)),r=["components"],s={title:"Web Components in Drayman",sidebar_position:1},l=void 0,p={unversionedId:"web-components/web-components-in-drayman",id:"web-components/web-components-in-drayman",isDocsHomePage:!1,title:"Web Components in Drayman",description:"All Drayman components (usually defined at src/components/ folder) are rendered server-side.",source:"@site/docs/web-components/web-components-in-drayman.mdx",sourceDirName:"web-components",slug:"/web-components/web-components-in-drayman",permalink:"/docs/web-components/web-components-in-drayman",editUrl:"https://github.com/Claviz/drayman/blob/main/docs/docs/web-components/web-components-in-drayman.mdx",version:"current",sidebarPosition:1,frontMatter:{title:"Web Components in Drayman",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"The Server object",permalink:"/docs/components-in-depth/helpers/the-server-object"},next:{title:"@drayman/elements",permalink:"/docs/web-components/drayman-elements"}},m=[{value:"Creating a Web Component",id:"creating-a-web-component",children:[{value:"Passing options to Web Component",id:"passing-options-to-web-component",children:[]},{value:"Handling Web Component events",id:"handling-web-component-events",children:[]}]},{value:"Publishing a Web Component",id:"publishing-a-web-component",children:[]},{value:"Installing third-party Web Component package",id:"installing-third-party-web-component-package",children:[]}],c={toc:m};function d(n){var e=n.components,s=(0,o.Z)(n,r);return(0,i.kt)("wrapper",(0,a.Z)({},c,s,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"All Drayman components (usually defined at ",(0,i.kt)("inlineCode",{parentName:"p"},"src/components/")," folder) are rendered server-side.\nThey are built by combining HTML elements and other Drayman components, but sometimes it is difficult to build or reuse UI layout or interactivity which is usually done in the browser.\nIn this case ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Web_Components"},"Web Components")," can be used inside a Drayman components."),(0,i.kt)("p",null,"Web components can be built using vanilla JS or any other Web Component framework/library.\nFor example, official collection of Web Components for Drayman called ",(0,i.kt)("a",{parentName:"p",href:"./drayman-elements"},"@drayman/elements")," was built using ",(0,i.kt)("a",{parentName:"p",href:"https://angular.io/guide/elements"},"Angular Elements"),"."),(0,i.kt)("p",null,"In theory, any existing JavaScript UI library can be used inside a Drayman component if it is wrapped inside a Web Component following some Drayman conventions described below."),(0,i.kt)("h2",{id:"creating-a-web-component"},"Creating a Web Component"),(0,i.kt)("p",null,"Let's start with creating a file called ",(0,i.kt)("inlineCode",{parentName:"p"},"amazing-button.js")," and putting it inside a ",(0,i.kt)("inlineCode",{parentName:"p"},"public")," folder:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="public/amazing-button.js"',title:'"public/amazing-button.js"'},'class AmazingButton extends HTMLElement {\n  constructor() {\n    super();\n  }\n\n  connectedCallback() {\n    this.style.backgroundColor = "#daad86";\n    this.style.height = "50px";\n    this.style.cursor = "pointer";\n    this.style.padding = "5px 10px";\n    this.style.borderRadius = "5px";\n    this.innerHTML = "Button";\n  }\n}\ncustomElements.define("amazing-button", AmazingButton);\n')),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"A ",(0,i.kt)("inlineCode",{parentName:"p"},"connectedCallback")," method used here makes sure that the element is added to the DOM and is ready to be used."))),(0,i.kt)("p",null,"This is a regular Web Component which displays a static element with some styles."),(0,i.kt)("p",null,"To use this component, you'll need to tell Drayman where to find it. To do so, modify your ",(0,i.kt)("inlineCode",{parentName:"p"},"package.json")," file by adding ",(0,i.kt)("inlineCode",{parentName:"p"},"drayman")," section:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="package.json"',title:'"package.json"'},'// ...\n  "drayman": {\n    "elements": {\n      // Web Component name\n      "amazing-button": {\n        // Path to the script\n        "script": "./public/amazing-button.js"\n      }\n    }\n  }\n// ...\n')),(0,i.kt)("p",null,"Finally, use it inside a Drayman component:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},"export const component: DraymanComponent = async ({ forceUpdate }) => {\n  return () => {\n    return <amazing-button />;\n  };\n};\n")),(0,i.kt)("p",null,"In result, you will see something like this:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Web Component button",src:t(3620).Z})),(0,i.kt)("h3",{id:"passing-options-to-web-component"},"Passing options to Web Component"),(0,i.kt)("p",null,"Options can be passed to Web Components like any other options/attributes in Drayman Framework:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'export const component: DraymanComponent = async ({ forceUpdate }) => {\n  return () => {\n    // highlight-next-line\n    return <amazing-button label="Click me!" color="#5cdb95" />;\n  };\n};\n')),(0,i.kt)("p",null,"To make it work inside a Web Component, reference ",(0,i.kt)("inlineCode",{parentName:"p"},"this")," object with required option:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="public/amazing-button.js"',title:'"public/amazing-button.js"'},'class AmazingButton extends HTMLElement {\n  constructor() {\n    super();\n  }\n\n  connectedCallback() {\n    // highlight-next-line\n    this.style.backgroundColor = this.color || "#daad86";\n    this.style.height = "50px";\n    this.style.cursor = "pointer";\n    this.style.padding = "5px 10px";\n    this.style.borderRadius = "5px";\n    // highlight-next-line\n    this.innerHTML = this.label || "Button";\n  }\n}\ncustomElements.define("amazing-button", AmazingButton);\n')),(0,i.kt)("p",null,"In result, button now has a label and custom color:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Web Component button",src:t(2977).Z})),(0,i.kt)("h3",{id:"handling-web-component-events"},"Handling Web Component events"),(0,i.kt)("p",null,"Web Components events can be handled like any other ",(0,i.kt)("a",{parentName:"p",href:"./handling-events"},"events in Drayman"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="public/amazing-button.js"',title:'"public/amazing-button.js"'},'class AmazingButton extends HTMLElement {\n  constructor() {\n    super();\n  }\n\n  connectedCallback() {\n    this.style.backgroundColor = this.color || "#daad86";\n    this.style.height = "50px";\n    this.style.cursor = "pointer";\n    this.style.padding = "5px 10px";\n    this.style.borderRadius = "5px";\n    this.innerHTML = this.label || "Button";\n    // highlight-next-line\n    this.onclick = this.onClick;\n  }\n}\ncustomElements.define("amazing-button", AmazingButton);\n')),(0,i.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Drayman requires special naming convention for events in Web Components. It must start with the ",(0,i.kt)("inlineCode",{parentName:"p"},"on")," prefix and be in camel case."))),(0,i.kt)("p",null,"In the example above, we tell our button to handle Drayman ",(0,i.kt)("inlineCode",{parentName:"p"},"onClick")," event when HTML element ",(0,i.kt)("inlineCode",{parentName:"p"},"onclick")," event is triggered by overriding it."),(0,i.kt)("p",null,"Finally, we can handle this event inside a Drayman component:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'export const component: DraymanComponent = async ({ forceUpdate }) => {\n  return () => {\n    return (\n      <amazing-button\n        label="Click me!"\n        color="#5cdb95"\n        // highlight-next-line\n        onClick={async () => {\n          // highlight-next-line\n          console.log("Button was clicked!");\n          // highlight-next-line\n        }}\n      />\n    );\n  };\n};\n')),(0,i.kt)("p",null,"In result, every time our button is clicked, we will see a message in the server-side console:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Web Component button",src:t(3661).Z})),(0,i.kt)("h2",{id:"publishing-a-web-component"},"Publishing a Web Component"),(0,i.kt)("p",null,"Any Web Component can be published to NPM so it can be used in other projects or by other developers."),(0,i.kt)("p",null,"To do so, create a new folder with two files - ",(0,i.kt)("inlineCode",{parentName:"p"},"amazing-button.js")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"packages.json"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="amazing-button.js"',title:'"amazing-button.js"'},'class AmazingButton extends HTMLElement {\n  constructor() {\n    super();\n  }\n\n  connectedCallback() {\n    this.style.backgroundColor = this.color || "#daad86";\n    this.style.height = "50px";\n    this.style.cursor = "pointer";\n    this.style.padding = "5px 10px";\n    this.style.borderRadius = "5px";\n    this.innerHTML = this.label || "Button";\n    this.onclick = this.onClick;\n  }\n}\ncustomElements.define("amazing-button", AmazingButton);\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="package.json"',title:'"package.json"'},'{\n  "name": "drayman-amazing-button",\n  "version": "1.0.0",\n  "description": "Demo Web Component for Drayman Framework",\n  "license": "MIT",\n  "keywords": ["drayman"],\n  "drayman": {\n    "elements": {\n      // Web Component name\n      "amazing-button": {\n        // Path to the script\n        "script": "./amazing-button.js"\n      }\n    }\n  }\n}\n')),(0,i.kt)("p",null,"Pay attention on how element is defined inside a ",(0,i.kt)("inlineCode",{parentName:"p"},"project.json")," file.\nIt is important to define ",(0,i.kt)("inlineCode",{parentName:"p"},"drayman.elements")," object where all paths of Web Components are defined.\nThis way when a package is installed inside a Drayman project, you don't need to reference it in any way - Drayman will automatically do it for you."),(0,i.kt)("p",null,"Finally, publish your Web Component package to NPM:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"npm publish\n")),(0,i.kt)("h2",{id:"installing-third-party-web-component-package"},"Installing third-party Web Component package"),(0,i.kt)("p",null,"If all requirements from previous steps are met, installing third-party Web Component package into your project is as simple as:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"npm install drayman-amazing-button\n")),(0,i.kt)("p",null,"Drayman will automatically find installed Web Components and add them to your project."))}d.isMDXComponent=!0},3661:function(n,e,t){e.Z=t.p+"assets/images/web-component-button-events-2061f9c54fb1d783f380b5c816f445b0.gif"},2977:function(n,e,t){e.Z=t.p+"assets/images/web-component-button-options-f826f871f4f5b70b52ffbefe70b596ec.png"},3620:function(n,e,t){e.Z=t.p+"assets/images/web-component-button-328b75c868441328247a4a2f5c8d607a.png"}}]);