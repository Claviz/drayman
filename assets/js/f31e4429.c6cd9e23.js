"use strict";(self.webpackChunk_drayman_docs=self.webpackChunk_drayman_docs||[]).push([[8182],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=a.createContext({}),c=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},p=function(e){var n=c(e.components);return a.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(t),m=i,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return t?a.createElement(f,r(r({ref:n},p),{},{components:t})):a.createElement(f,r({ref:n},p))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,r=new Array(o);r[0]=u;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var c=2;c<o;c++)r[c]=t[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},5378:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return u}});var a=t(7462),i=t(3366),o=(t(7294),t(3905)),r=["components"],l={title:"Handling events",sidebar_position:3},s=void 0,c={unversionedId:"components-in-depth/handling-events",id:"components-in-depth/handling-events",isDocsHomePage:!1,title:"Handling events",description:"Each element attribute which starts with an on prefix is considered by Drayman as an event. All events are fired in browser and then executed server-side (if you want to execute something insde browser, you can use Browser object).",source:"@site/docs/components-in-depth/handling-events.mdx",sourceDirName:"components-in-depth",slug:"/components-in-depth/handling-events",permalink:"/docs/components-in-depth/handling-events",editUrl:"https://github.com/Claviz/drayman/blob/main/docs/docs/components-in-depth/handling-events.mdx",version:"current",sidebarPosition:3,frontMatter:{title:"Handling events",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Default props",permalink:"/docs/components-in-depth/default-props"},next:{title:"Handling errors",permalink:"/docs/components-in-depth/handling-errors"}},p=[{value:"Basic event usage",id:"basic-event-usage",children:[{value:"Generic data",id:"generic-data",children:[]},{value:"Data for keyboard events",id:"data-for-keyboard-events",children:[]},{value:"Data for mouse events",id:"data-for-mouse-events",children:[]},{value:"Data for <code>oninput</code>, <code>onchange</code> events",id:"data-for-oninput-onchange-events",children:[]},{value:"Data for third-party Drayman component elements",id:"data-for-third-party-drayman-component-elements",children:[]}]},{value:"Handling file upload events",id:"handling-file-upload-events",children:[]},{value:"Configuring events",id:"configuring-events",children:[{value:"Event configuration options",id:"event-configuration-options",children:[]},{value:"<code>debounce</code>",id:"debounce",children:[]}]}],d={toc:p};function u(e){var n=e.components,t=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Each element attribute which starts with an ",(0,o.kt)("inlineCode",{parentName:"p"},"on")," prefix is considered by Drayman as an event. All events are fired in browser and then executed server-side (if you want to execute something insde browser, you can use ",(0,o.kt)("a",{parentName:"p",href:"./helpers/the-browser-object"},"Browser object"),")."),(0,o.kt)("h2",{id:"basic-event-usage"},"Basic event usage"),(0,o.kt)("p",null,"You can use any known ",(0,o.kt)("a",{parentName:"p",href:"https://html.spec.whatwg.org/multipage/indices.html#attributes-3"},"HTML element event")," when developing Drayman components. Simply add required event as an attribute and assign an ",(0,o.kt)("inlineCode",{parentName:"p"},"async")," function which will be executed when event is fired:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},"export const component: DraymanComponent = async ({ forceUpdate }) => {\n  let text: string;\n\n  return () => {\n    return (\n      <>\n        <input\n          //highlight-start\n          oninput={async ({ value }) => {\n            text = value;\n            await forceUpdate();\n          }}\n          //highlight-end\n        />\n        <h3>{text}</h3>\n      </>\n    );\n  };\n};\n")),(0,o.kt)("p",null,"Some events provide useful data when it is fired. In example above, ",(0,o.kt)("inlineCode",{parentName:"p"},"oninput")," event provides a ",(0,o.kt)("inlineCode",{parentName:"p"},"value")," which is a user-typed text. You can find full list of emitted data below."),(0,o.kt)("h3",{id:"generic-data"},"Generic data"),(0,o.kt)("p",null,"All ",(0,o.kt)("a",{parentName:"p",href:"#configuring-events"},"configured events")," emit this data in addition to event-specific data:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},"trailing, leading\n")),(0,o.kt)("h3",{id:"data-for-keyboard-events"},"Data for keyboard events"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},"altKey, shiftKey, ctrlKey, metaKey, code, key, location, repeat\n")),(0,o.kt)("h3",{id:"data-for-mouse-events"},"Data for mouse events"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},"altKey, shiftKey, ctrlKey, metaKey, x, y, pageX, pageY, screenX, screenY, offsetX, offsetY\n")),(0,o.kt)("h3",{id:"data-for-oninput-onchange-events"},"Data for ",(0,o.kt)("inlineCode",{parentName:"h3"},"oninput"),", ",(0,o.kt)("inlineCode",{parentName:"h3"},"onchange")," events"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},"value\n")),(0,o.kt)("h3",{id:"data-for-third-party-drayman-component-elements"},"Data for third-party Drayman component elements"),(0,o.kt)("p",null,"Please refer to specific third-party element documentation to check which data is emitted."),(0,o.kt)("h2",{id:"handling-file-upload-events"},"Handling file upload events"),(0,o.kt)("p",null,"In addition to data object all events emit files array. This array can be used to check uploaded file info and save it to file system. It is usually used within ",(0,o.kt)("inlineCode",{parentName:"p"},'<input type="file" />')," element."),(0,o.kt)("p",null,"Let's for example create a component which displays directory contents and saves files to it. Before adding this component, create an ",(0,o.kt)("inlineCode",{parentName:"p"},"uploaded")," directory in the root of your project."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'import fs from "fs/promises";\n\nexport const component: DraymanComponent = async ({ forceUpdate }) => {\n  const uploadedDir = "./uploaded";\n\n  return async () => {\n    return (\n      <>\n        <input\n          multiple\n          type="file"\n          oninput={async ({}, files) => {\n            for (const file of files) {\n              await fs.writeFile(\n                `${uploadedDir}/${file.originalname}`,\n                file.buffer\n              );\n            }\n            await forceUpdate();\n          }}\n        />\n        <pre>{(await fs.readdir(uploadedDir)).join("\\n")}</pre>\n      </>\n    );\n  };\n};\n')),(0,o.kt)("p",null,"Notice how ",(0,o.kt)("inlineCode",{parentName:"p"},"oninput")," event of ",(0,o.kt)("inlineCode",{parentName:"p"},"input")," element accepts ",(0,o.kt)("inlineCode",{parentName:"p"},"files")," as a second parameter of event function. It is an array which is used to save files to file system using ",(0,o.kt)("inlineCode",{parentName:"p"},"writeFile"),"."),(0,o.kt)("h2",{id:"configuring-events"},"Configuring events"),(0,o.kt)("p",null,"In addition to function which will be executed on event, you can pass some configuration. Lets modify our previous example a bit:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},"export const component: DraymanComponent = async ({ forceUpdate }) => {\n  let text: string;\n\n  return () => {\n    return (\n      <>\n        <input\n          //highlight-start\n          oninput={[\n            async ({ value, trailing }) => {\n              text = value;\n              await forceUpdate();\n            },\n            { debounce: { wait: 500, trailing: true } },\n          ]}\n          //highlight-end\n        />\n        <h3>{text}</h3>\n      </>\n    );\n  };\n};\n")),(0,o.kt)("p",null,"Now we pass an array to ",(0,o.kt)("inlineCode",{parentName:"p"},"oninput")," event. First element of this array is a function which needs to be executed on event. Second element - event configuration. In our case we tell to debounce our event for 500ms and execute a function on a trailing edge. In addition to ",(0,o.kt)("inlineCode",{parentName:"p"},"value")," data, our event also receives ",(0,o.kt)("inlineCode",{parentName:"p"},"trailing")," indicator, which will be ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," because function was executed on a trailing edge."),(0,o.kt)("p",null,"You can use a shorthand for this configuration:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},"export const component: DraymanComponent = async ({ forceUpdate }) => {\n  let text: string;\n\n  return () => {\n    return (\n      <>\n        <input\n          oninput={[\n            async ({ value, trailing }) => {\n              text = value;\n              await forceUpdate();\n            },\n            //highlight-next-line\n            { debounce: 500 },\n          ]}\n        />\n        <h3>{text}</h3>\n      </>\n    );\n  };\n};\n")),(0,o.kt)("p",null,"It is also possible to configure element events globally using ",(0,o.kt)("a",{parentName:"p",href:"../introduction/configuration#elementoptions"},"elementOptions")),(0,o.kt)("h3",{id:"event-configuration-options"},"Event configuration options"),(0,o.kt)("h3",{id:"debounce"},(0,o.kt)("inlineCode",{parentName:"h3"},"debounce")),(0,o.kt)("p",null,"Delays invoking event until ",(0,o.kt)("inlineCode",{parentName:"p"},"wait")," milliseconds have elapsed since the last time the debounced event was invoked."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"debounce")," accepts ",(0,o.kt)("inlineCode",{parentName:"p"},"number")," (ms to delay) or an object with options:"),(0,o.kt)("h4",{id:"wait"},(0,o.kt)("inlineCode",{parentName:"h4"},"wait")),(0,o.kt)("p",null,"Number of ms to delay."),(0,o.kt)("h4",{id:"trailing"},(0,o.kt)("inlineCode",{parentName:"h4"},"trailing")),(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", invokes event on the trailing edge."),(0,o.kt)("h4",{id:"leading"},(0,o.kt)("inlineCode",{parentName:"h4"},"leading")),(0,o.kt)("p",null,"If ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", invokes event on the leading edge."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},"export const component: DraymanComponent = async ({ forceUpdate }) => {\n  let text: string;\n\n  return () => {\n    return (\n      <>\n        <h3>{text}</h3>\n        <p>Debounce with ms</p>\n        <input\n          value={text}\n          oninput={[\n            async ({ value }) => {\n              text = value;\n              await forceUpdate();\n            },\n            { debounce: 500 },\n          ]}\n        />\n        <p>Debounce on trailing edge</p>\n        <input\n          value={text}\n          oninput={[\n            async ({ value }) => {\n              text = value;\n              await forceUpdate();\n            },\n            { debounce: { wait: 500, trailing: true } },\n          ]}\n        />\n        <p>Debounce on leading edge</p>\n        <input\n          value={text}\n          oninput={[\n            async ({ value }) => {\n              text = value;\n              await forceUpdate();\n            },\n            { debounce: { wait: 500, leading: true } },\n          ]}\n        />\n      </>\n    );\n  };\n};\n")))}u.isMDXComponent=!0}}]);