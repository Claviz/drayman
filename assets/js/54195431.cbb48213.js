"use strict";(self.webpackChunk_drayman_docs=self.webpackChunk_drayman_docs||[]).push([[999],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return m}});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=o.createContext({}),s=function(e){var n=o.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=s(e.components);return o.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(t),m=r,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||a;return t?o.createElement(f,i(i({ref:n},p),{},{components:t})):o.createElement(f,i({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=u;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<a;s++)i[s]=t[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},4882:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return u}});var o=t(7462),r=t(3366),a=(t(7294),t(3905)),i=["components"],c={title:"Component lifecycle",sidebar_position:1},l=void 0,s={unversionedId:"components-in-depth/component-lifecycle",id:"components-in-depth/component-lifecycle",isDocsHomePage:!1,title:"Component lifecycle",description:"To see how component is handled by Drayman, let's take for example, a component which reads data from selected file and shows it to user:",source:"@site/docs/components-in-depth/component-lifecycle.mdx",sourceDirName:"components-in-depth",slug:"/components-in-depth/component-lifecycle",permalink:"/docs/components-in-depth/component-lifecycle",editUrl:"https://github.com/Claviz/drayman/blob/main/docs/docs/components-in-depth/component-lifecycle.mdx",version:"current",sidebarPosition:1,frontMatter:{title:"Component lifecycle",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Configuration",permalink:"/docs/introduction/configuration"},next:{title:"Default props",permalink:"/docs/components-in-depth/default-props"}},p=[],d={toc:p};function u(e){var n=e.components,t=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"To see how component is handled by Drayman, let's take for example, a component which reads data from selected file and shows it to user:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'import fs from "fs/promises";\n\nexport const component: DraymanComponent = async ({\n  forceUpdate,\n  ComponentInstance,\n}) => {\n  ComponentInstance.onDestroy = () => {\n    console.log(`Component instance was destroyed!`);\n  };\n\n  const files = ["", ...(await fs.readdir("."))];\n  let selectedFileContent: string;\n\n  return async () => {\n    return (\n      <>\n        <select\n          onchange={async ({ value }) => {\n            selectedFileContent = await fs.readFile(value, "utf-8");\n            await forceUpdate();\n          }}\n        >\n          {files.map((fileName) => (\n            <option value={fileName}>{fileName}</option>\n          ))}\n        </select>\n        <br />\n        {selectedFileContent && <pre>{selectedFileContent}</pre>}\n      </>\n    );\n  };\n};\n')),(0,a.kt)("p",null,"When user visits a page with this component here is what happens:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"A ",(0,a.kt)("inlineCode",{parentName:"li"},"module.execute")," function gets called with ",(0,a.kt)("a",{parentName:"li",href:"./helpers/introduction"},"helper objects")," and returned function gets stored. Let's call this returned function a ",(0,a.kt)("strong",{parentName:"li"},"render")," function."),(0,a.kt)("li",{parentName:"ul"},"A data returned by ",(0,a.kt)("strong",{parentName:"li"},"render")," function is what user actually sees on the page. This function, in turn, gets called each time a ",(0,a.kt)("inlineCode",{parentName:"li"},"forceUpdate")," function gets called (you can read about ",(0,a.kt)("inlineCode",{parentName:"li"},"forceUpdate")," in detail ",(0,a.kt)("a",{parentName:"li",href:"./helpers/force-update"},"here"),"). To show initial result to user, ",(0,a.kt)("inlineCode",{parentName:"li"},"forceUpdate")," is executed and user's browser receives instructions of what should be rendered on page."),(0,a.kt)("li",{parentName:"ul"},"Next steps of component lifecycle are decided by user.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"If user selects some option, an ",(0,a.kt)("inlineCode",{parentName:"li"},"onchange")," event gets triggered on ",(0,a.kt)("inlineCode",{parentName:"li"},"select")," element. In our component this event reads file contents and calls ",(0,a.kt)("inlineCode",{parentName:"li"},"forceUpdate")," function. As described before, ",(0,a.kt)("inlineCode",{parentName:"li"},"forceUpdate")," function calls ",(0,a.kt)("strong",{parentName:"li"},"render")," function behind the scenes and user receives a new representation of component."),(0,a.kt)("li",{parentName:"ul"},"If user decides to close a page with component or component disappears from DOM, ",(0,a.kt)("inlineCode",{parentName:"li"},"onDestroy")," method of the ",(0,a.kt)("a",{parentName:"li",href:"./helpers/the-component-instance-object"},"ComponentInstance")," gets called printing ",(0,a.kt)("inlineCode",{parentName:"li"},"Component instance was destroyed!")," message to the console and component instance with ",(0,a.kt)("strong",{parentName:"li"},"render")," function gets destroyed.")))))}u.isMDXComponent=!0}}]);