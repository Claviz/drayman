"use strict";(self.webpackChunk_drayman_docs=self.webpackChunk_drayman_docs||[]).push([[977],{3905:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return u}});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},c=Object.keys(e);for(o=0;o<c.length;o++)t=c[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)t=c[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=o.createContext({}),p=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=p(e.components);return o.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,c=e.originalType,s=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),m=p(t),u=r,h=m["".concat(s,".").concat(u)]||m[u]||d[u]||c;return t?o.createElement(h,i(i({ref:n},l),{},{components:t})):o.createElement(h,i({ref:n},l))}));function u(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var c=t.length,i=new Array(c);i[0]=m;var a={};for(var s in n)hasOwnProperty.call(n,s)&&(a[s]=n[s]);a.originalType=e,a.mdxType="string"==typeof e?e:r,i[1]=a;for(var p=2;p<c;p++)i[p]=t[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9246:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return l},default:function(){return m}});var o=t(7462),r=t(3366),c=(t(7294),t(3905)),i=["components"],a={title:"The ComponentInstance object",sidebar_position:6},s=void 0,p={unversionedId:"components-in-depth/helpers/the-component-instance-object",id:"components-in-depth/helpers/the-component-instance-object",isDocsHomePage:!1,title:"The ComponentInstance object",description:"The ComponentInstance object can be used to check component instance ID or handle lifecycle events.",source:"@site/docs/components-in-depth/helpers/the-component-instance-object.mdx",sourceDirName:"components-in-depth/helpers",slug:"/components-in-depth/helpers/the-component-instance-object",permalink:"/docs/components-in-depth/helpers/the-component-instance-object",editUrl:"https://github.com/Claviz/drayman/blob/main/docs/docs/components-in-depth/helpers/the-component-instance-object.mdx",version:"current",sidebarPosition:6,frontMatter:{title:"The ComponentInstance object",sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"The EventHub object",permalink:"/docs/components-in-depth/helpers/the-event-hub-object"},next:{title:"PostCSS and Tailwind CSS",permalink:"/docs/postcss-and-tailwind-css"}},l=[{value:"ComponentInstance properties",id:"componentinstance-properties",children:[{value:"<code>id</code>",id:"id",children:[]}]},{value:"ComponentInstance methods",id:"componentinstance-methods",children:[{value:"<code>onDestroy()</code>",id:"ondestroy",children:[]}]}],d={toc:l};function m(e){var n=e.components,t=(0,r.Z)(e,i);return(0,c.kt)("wrapper",(0,o.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"The ",(0,c.kt)("inlineCode",{parentName:"p"},"ComponentInstance")," object can be used to check component instance ID or handle ",(0,c.kt)("a",{parentName:"p",href:"../component-lifecycle"},"lifecycle events"),"."),(0,c.kt)("h2",{id:"componentinstance-properties"},"ComponentInstance properties"),(0,c.kt)("h3",{id:"id"},(0,c.kt)("inlineCode",{parentName:"h3"},"id")),(0,c.kt)("p",null,"Unique ID of the current component instance. Can be used to differentiate connected users, for example, in chat."),(0,c.kt)("h2",{id:"componentinstance-methods"},"ComponentInstance methods"),(0,c.kt)("h3",{id:"ondestroy"},(0,c.kt)("inlineCode",{parentName:"h3"},"onDestroy()")),(0,c.kt)("p",null,"Override this function with your own and it will be executed when component instance gets destroyed."),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},"export const component: DraymanComponent = async ({ ComponentInstance }) => {\n\n  //highlight-start\n  ComponentInstance.onDestroy = () => {\n    console.log(`Component instance was destroyed!`);\n  };\n  //highlight-end\n\n  return () => {\n    return <h3>Hello, world!</h3>;\n};\n")))}m.isMDXComponent=!0}}]);