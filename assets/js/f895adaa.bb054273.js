"use strict";(self.webpackChunk_drayman_docs=self.webpackChunk_drayman_docs||[]).push([[9883],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return m}});var o=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var d=o.createContext({}),s=function(e){var n=o.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=s(e.components);return o.createElement(d.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,c=r(e,["components","mdxType","originalType","parentName"]),u=s(t),m=a,g=u["".concat(d,".").concat(m)]||u[m]||p[m]||i;return t?o.createElement(g,l(l({ref:n},c),{},{components:t})):o.createElement(g,l({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,l=new Array(i);l[0]=u;var r={};for(var d in n)hasOwnProperty.call(n,d)&&(r[d]=n[d]);r.originalType=e,r.mdxType="string"==typeof e?e:a,l[1]=r;for(var s=2;s<i;s++)l[s]=t[s];return o.createElement.apply(null,l)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},4084:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return r},contentTitle:function(){return d},metadata:function(){return s},toc:function(){return c},default:function(){return u}});var o=t(7462),a=t(3366),i=(t(7294),t(3905)),l=["components"],r={slug:"building-real-time-todo-app-with-drayman-mongodb-and-tailwind-css",title:"Building a real-time Todo app with Drayman, MongoDB and Tailwind CSS",author:"Yan Ivan Evdokimov",author_url:"https://github.com/jansivans",author_image_url:"https://avatars.githubusercontent.com/u/5667073?v=4",tags:["drayman","mongodb","tailwindcss","guide"]},d=void 0,s={permalink:"/blog/building-real-time-todo-app-with-drayman-mongodb-and-tailwind-css",editUrl:"https://github.com/Claviz/drayman/blob/main/blog/blog/2021-08-30-building-real-time-todo-app-with-drayman-mongodb-and-tailwind-css.mdx",source:"@site/blog/2021-08-30-building-real-time-todo-app-with-drayman-mongodb-and-tailwind-css.mdx",title:"Building a real-time Todo app with Drayman, MongoDB and Tailwind CSS",description:"In this guide we will build a real-time Todo app with Drayman, MongoDB and Tailwind CSS.",date:"2021-08-30T00:00:00.000Z",formattedDate:"August 30, 2021",tags:[{label:"drayman",permalink:"/blog/tags/drayman"},{label:"mongodb",permalink:"/blog/tags/mongodb"},{label:"tailwindcss",permalink:"/blog/tags/tailwindcss"},{label:"guide",permalink:"/blog/tags/guide"}],readingTime:8.125,truncated:!1,nextItem:{title:"Getting started with Drayman",permalink:"/blog/getting-started-with-drayman"}},c=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Setting up Tailwind CSS",id:"setting-up-tailwind-css",children:[]},{value:"Creating a Todo app",id:"creating-a-todo-app",children:[{value:"Adding basic UI",id:"adding-basic-ui",children:[]},{value:"Adding MongoDB support",id:"adding-mongodb-support",children:[]},{value:"Adding functionality to UI elements",id:"adding-functionality-to-ui-elements",children:[]},{value:"Final component script",id:"final-component-script",children:[]}]},{value:"Conclusion",id:"conclusion",children:[]}],p={toc:c};function u(e){var n=e.components,r=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,o.Z)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In this guide we will build a real-time Todo app with ",(0,i.kt)("a",{parentName:"p",href:"http://www.drayman.io/"},"Drayman"),", ",(0,i.kt)("a",{parentName:"p",href:"https://www.mongodb.com/"},"MongoDB")," and ",(0,i.kt)("a",{parentName:"p",href:"https://tailwindcss.com/"},"Tailwind CSS"),"."),(0,i.kt)("p",null,"If you are using regular tools, you would need to create a server with endpoints, a client app using some modern framework or just vanilla JavaScript. With Drayman, however, it will be just a single script with 100 lines of code."),(0,i.kt)("p",null,"If you are new to Drayman, you can go to our ",(0,i.kt)("a",{parentName:"p",href:"http://www.drayman.io/"},"official docs")," to check out how it works or to read other guides."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"This guide assumes that you:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"have ",(0,i.kt)("a",{parentName:"li",href:"http://www.drayman.io/docs/introduction/getting-started"},"installed Drayman project locally")," or you are using it through ",(0,i.kt)("a",{parentName:"li",href:"http://new.drayman.io"},"new.drayman.io"),";"),(0,i.kt)("li",{parentName:"ul"},"have MongoDB installed with ",(0,i.kt)("a",{parentName:"li",href:"https://docs.mongodb.com/manual/changeStreams/"},"Change Stream")," functionality enabled. For this guide you can create a free cloud MongoDB database ",(0,i.kt)("a",{parentName:"li",href:"https://www.mongodb.com/try"},"here"),". This way you get Change Stream functionality enabled by default.")),(0,i.kt)("p",null,"When Drayman project is ready and you have MongoDB up and running, we can start developing our Todo app by adding Tailwind CSS."),(0,i.kt)("h2",{id:"setting-up-tailwind-css"},"Setting up Tailwind CSS"),(0,i.kt)("p",null,"First, you'll need to install ",(0,i.kt)("inlineCode",{parentName:"p"},"autoprefixer")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"tailwindcss"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install -D tailwindcss@latest autoprefixer@latest\n")),(0,i.kt)("p",null,"Next, generate ",(0,i.kt)("inlineCode",{parentName:"p"},"tailwind.config.js")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"postcss.config.js")," files with this command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npx tailwindcss init -p\n")),(0,i.kt)("p",null,"Now modify ",(0,i.kt)("inlineCode",{parentName:"p"},"tailwind.config.js")," file to exclude non-used CSS classes on compile:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="tailwind.config.js"',title:'"tailwind.config.js"'},'module.exports = {\n  purge: [\n    // highlight-next-line\n    "./src/**/*.tsx",\n  ],\n  darkMode: false,\n  theme: {\n    extend: {},\n  },\n  variants: {\n    extend: {},\n  },\n  plugins: [],\n};\n')),(0,i.kt)("p",null,"Create your main CSS file at ",(0,i.kt)("inlineCode",{parentName:"p"},"src/styles.css")," and append this code:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-css",metastring:'title="src/styles.css"',title:'"src/styles.css"'},"@tailwind base;\n@tailwind components;\n@tailwind utilities;\n")),(0,i.kt)("p",null,"The final step is to modify ",(0,i.kt)("inlineCode",{parentName:"p"},"public/index.html")," file to include the generated CSS file. Drayman will generate it to the ",(0,i.kt)("inlineCode",{parentName:"p"},"public/styles.css")," file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html",metastring:'title="public/index.html"',title:'"public/index.html"'},'<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n    <title>Drayman Framework</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <script src="/drayman-framework-client.js"><\/script>\n    \x3c!-- highlight-next-line --\x3e\n    <link rel="stylesheet" href="styles.css" />\n  </head>\n\n  <body>\n    <drayman-element component="home"></drayman-element>\n\n    <script>\n      initializeDraymanFramework();\n    <\/script>\n  </body>\n</html>\n')),(0,i.kt)("h2",{id:"creating-a-todo-app"},"Creating a Todo app"),(0,i.kt)("p",null,"We will start by adding basic UI using Tailwind CSS classes and then improve our solution to include real-time functionality and MongoDB support."),(0,i.kt)("h3",{id:"adding-basic-ui"},"Adding basic UI"),(0,i.kt)("p",null,"Paste this code inside ",(0,i.kt)("inlineCode",{parentName:"p"},"src/components.home.tsx"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'export const component: DraymanComponent = async () => {\n  return async () => {\n    return (\n      <div class="flex justify-center items-center">\n        <div class="flex flex-col pt-8 lg:w-2/5 sm:w-3/5 w-11/12 gap-4">\n          <div class="flex gap-2">\n            <input\n              placeholder="New Todo"\n              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"\n            />\n            <button\n              class={`bg-blue-500 text-white font-bold py-2 px-4 rounded`}\n            >\n              Save\n            </button>\n          </div>\n          <div class="flex items-center gap-2">\n            <div\n              class={`flex flex-grow items-center gap-2 bg-gray-200 p-2 rounded cursor-pointer`}\n            >\n              <input class="flex-none" type="checkbox" />\n              <div class="flex-grow">Grab a coffee</div>\n            </div>\n            <button class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">\n              Delete\n            </button>\n          </div>\n        </div>\n      </div>\n    );\n  };\n};\n')),(0,i.kt)("p",null,"If Tailwind CSS was successfully initialized, you should see this result in your browser:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"final-result",src:t(3332).Z})),(0,i.kt)("h3",{id:"adding-mongodb-support"},"Adding MongoDB support"),(0,i.kt)("p",null,"For this guide we will use ",(0,i.kt)("a",{parentName:"p",href:"https://docs.mongodb.com/manual/changeStreams/"},"Change Stream")," functionality of MongoDB to make our Todo list work in real-time. This way if something gets changed in the database, our application will reflect these changes. Let's modify our ",(0,i.kt)("inlineCode",{parentName:"p"},"src/components/home.tsx")," component and see in detail what is happening inside our script:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'import { MongoClient, ObjectId } from "mongodb";\n\ninterface Todo {\n  _id: ObjectId;\n  text: string;\n  done: boolean;\n}\n\nexport const component: DraymanComponent = async ({\n  forceUpdate,\n  ComponentInstance,\n}) => {\n  const uri = "YOUR_MONGODB_CONNECTION_STRING";\n  const client = new MongoClient(uri);\n  await client.connect();\n  const db = client.db("todo");\n  const todoListCollection = db.collection<Todo>("list");\n\n  let todos = await todoListCollection.find().toArray();\n\n  todoListCollection.watch().on("change", async (x) => {\n    if (x.operationType === "insert") {\n      todos.push(x.fullDocument as Todo);\n    } else if (x.operationType === "update") {\n      todos = todos.map((todo) => {\n        if (todo._id.equals(x.documentKey._id)) {\n          return { ...todo, ...x.updateDescription.updatedFields };\n        }\n        return todo;\n      });\n    } else if (x.operationType === "delete") {\n      todos = todos.filter((todo) => !todo._id.equals(x.documentKey._id));\n    }\n    await forceUpdate();\n  });\n\n  ComponentInstance.onDestroy = async () => {\n    await client.close();\n  };\n\n  return async () => {\n    return (\n      <div class="flex justify-center items-center">\n        <div class="flex flex-col pt-8 lg:w-2/5 sm:w-3/5 w-11/12 gap-4">\n          <div class="flex gap-2">\n            <input\n              placeholder="New Todo"\n              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"\n            />\n            <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded">\n              Save\n            </button>\n          </div>\n          {todos.map((x) => (\n            <div class="flex items-center gap-2">\n              <div\n                class={`flex flex-grow items-center gap-2 ${\n                  x.done ? `bg-green-200 line-through` : `bg-gray-200`\n                } p-2 rounded cursor-pointer`}\n              >\n                <input class="flex-none" checked={x.done} type="checkbox" />\n                <div class="flex-grow">{x.text}</div>\n              </div>\n              <button class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">\n                Delete\n              </button>\n            </div>\n          ))}\n        </div>\n      </div>\n    );\n  };\n};\n')),(0,i.kt)("p",null,"First, we have added a connection to our database (don't forget to change ",(0,i.kt)("inlineCode",{parentName:"p"},"YOUR_MONGODB_CONNECTION_STRING")," to your actual connection string). Then we made the initial fetch of our Todo list by converting it to an array - ",(0,i.kt)("inlineCode",{parentName:"p"},"let todos = await todoListCollection.find().toArray();"),"."),(0,i.kt)("p",null,"Then we added real-time functionality by watching for changes to database ",(0,i.kt)("inlineCode",{parentName:"p"},"todoListCollection.watch()"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"on ",(0,i.kt)("inlineCode",{parentName:"li"},"insert")," a Todo will be pushed to ",(0,i.kt)("inlineCode",{parentName:"li"},"todos")," array;"),(0,i.kt)("li",{parentName:"ul"},"on ",(0,i.kt)("inlineCode",{parentName:"li"},"update")," a specific Todo from ",(0,i.kt)("inlineCode",{parentName:"li"},"todos")," array will be updated;"),(0,i.kt)("li",{parentName:"ul"},"on ",(0,i.kt)("inlineCode",{parentName:"li"},"delete")," a specific Todo from ",(0,i.kt)("inlineCode",{parentName:"li"},"todos")," array will be deleted.")),(0,i.kt)("p",null,"The component will reflect all these changes because we also call the ",(0,i.kt)("a",{parentName:"p",href:"http://www.drayman.io/docs/components-in-depth/helpers/force-update"},"forceUpdate")," function - if any change gets caught, the component will re-render itself."),(0,i.kt)("p",null,"Finally, we are using the ",(0,i.kt)("a",{parentName:"p",href:"http://www.drayman.io/docs/components-in-depth/helpers/the-component-instance-object"},"onDestroy")," lifecycle method to close the connection to the database when a component instance gets destroyed."),(0,i.kt)("p",null,"We also have made changes to our UI by mapping through ",(0,i.kt)("inlineCode",{parentName:"p"},"todos")," array and rendering each Todo and changing CSS classes dynamically when a Todo is done."),(0,i.kt)("p",null,"As a result, any change made inside the database (I am using ",(0,i.kt)("a",{parentName:"p",href:"https://tableplus.com/"},"TablePlus")," for this), gets reflected inside our component:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"mongodb-realtime",src:t(675).Z})),(0,i.kt)("p",null,"Our final step will be to make the input field and buttons work as expected."),(0,i.kt)("h3",{id:"adding-functionality-to-ui-elements"},"Adding functionality to UI elements"),(0,i.kt)("p",null,"We will start by modifying the ",(0,i.kt)("inlineCode",{parentName:"p"},"<input>")," element:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'// ...\nlet newTodo: string;\n// ...\n\nreturn async () => {\n  return (\n    // ...\n    <input\n      placeholder="New Todo"\n      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"\n      value={newTodo}\n      oninput={async ({ value }) => {\n        newTodo = value;\n        await forceUpdate();\n      }}\n    />\n    // ...\n  );\n};\n')),(0,i.kt)("p",null,"The variable ",(0,i.kt)("inlineCode",{parentName:"p"},"newTodo")," was introduced. When the user types in something, the ",(0,i.kt)("inlineCode",{parentName:"p"},"oninput")," event gets triggered that saves the input value to the ",(0,i.kt)("inlineCode",{parentName:"p"},"newTodo")," variable thus providing a single source of truth - the input's value will always be inside ",(0,i.kt)("inlineCode",{parentName:"p"},"newTodo"),"."),(0,i.kt)("p",null,"Let's now modify the ",(0,i.kt)("inlineCode",{parentName:"p"},"<button>Save</button>")," element:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},"<button\n  class={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${\n    newTodo ? `hover:bg-blue-700` : `opacity-50 cursor-not-allowed`\n  }`}\n  disabled={!newTodo}\n  onclick={async () => {\n    await todoListCollection.insertOne({ text: newTodo, done: false });\n    newTodo = null;\n  }}\n>\n  Save\n</button>\n")),(0,i.kt)("p",null,"We have modified ",(0,i.kt)("inlineCode",{parentName:"p"},"class")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"disabled")," attributes to appear disabled when there is no input by the user (",(0,i.kt)("inlineCode",{parentName:"p"},"newTodo")," is empty). When the user clicks a button, ",(0,i.kt)("inlineCode",{parentName:"p"},"onclick")," gets triggered and a new Todo gets inserted into the database. We also don't need to call ",(0,i.kt)("inlineCode",{parentName:"p"},"forceUpdate")," here because it already was managed before when watching for database changes. Now we can input something, click the button and the result will appear in the browser:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"input-save",src:t(4796).Z})),(0,i.kt)("p",null,"Our final step will be to modify ",(0,i.kt)("inlineCode",{parentName:"p"},"todos")," list mapping:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'todos.map((x) => (\n  <div class="flex items-center gap-2">\n    <div\n      onclick={async () => {\n        await todoListCollection.updateOne(\n          { _id: x._id },\n          { $set: { done: !x.done } }\n        );\n      }}\n      class={`flex flex-grow items-center gap-2 ${\n        x.done ? `bg-green-200 line-through` : `bg-gray-200`\n      } p-2 rounded cursor-pointer`}\n    >\n      <input class="flex-none" checked={x.done} type="checkbox" />\n      <div class="flex-grow">{x.text}</div>\n    </div>\n    <button\n      class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"\n      onclick={async () => {\n        await todoListCollection.deleteOne({ _id: x._id });\n      }}\n    >\n      Delete\n    </button>\n  </div>\n));\n')),(0,i.kt)("p",null,"Here we have added the ",(0,i.kt)("inlineCode",{parentName:"p"},"onclick")," event handler for ",(0,i.kt)("inlineCode",{parentName:"p"},"<div>")," to mark a Todo done or undone and the ",(0,i.kt)("inlineCode",{parentName:"p"},"onclick")," event handler for ",(0,i.kt)("inlineCode",{parentName:"p"},"<button>Delete</button>")," to delete a Todo from the database when it is clicked."),(0,i.kt)("p",null,"Our component is now complete and you can open a page with this component in multiple tabs to check real-time functionality:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"todo-list-functionality",src:t(3104).Z})),(0,i.kt)("h3",{id:"final-component-script"},"Final component script"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/components/home.tsx"',title:'"src/components/home.tsx"'},'import { MongoClient, ObjectId } from "mongodb";\n\ninterface Todo {\n  _id: ObjectId;\n  text: string;\n  done: boolean;\n}\n\nexport const component: DraymanComponent = async ({\n  forceUpdate,\n  ComponentInstance,\n}) => {\n  const uri = "YOUR_MONGODB_CONNECTION_STRING";\n  const client = new MongoClient(uri);\n  await client.connect();\n  const db = client.db("todo");\n  const todoListCollection = db.collection<Todo>("list");\n\n  let todos = await todoListCollection.find().toArray();\n  let newTodo: string;\n\n  todoListCollection.watch().on("change", async (x) => {\n    if (x.operationType === "insert") {\n      todos.push(x.fullDocument as Todo);\n    } else if (x.operationType === "update") {\n      todos = todos.map((todo) => {\n        if (todo._id.equals(x.documentKey._id)) {\n          return { ...todo, ...x.updateDescription.updatedFields };\n        }\n        return todo;\n      });\n    } else if (x.operationType === "delete") {\n      todos = todos.filter((todo) => !todo._id.equals(x.documentKey._id));\n    }\n    await forceUpdate();\n  });\n\n  ComponentInstance.onDestroy = async () => {\n    await client.close();\n  };\n\n  return async () => {\n    return (\n      <div class="flex justify-center items-center">\n        <div class="flex flex-col pt-8 lg:w-2/5 sm:w-3/5 w-11/12 gap-4">\n          <div class="flex gap-2">\n            <input\n              placeholder="New Todo"\n              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"\n              value={newTodo}\n              oninput={async ({ value }) => {\n                newTodo = value;\n                await forceUpdate();\n              }}\n            />\n            <button\n              class={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${\n                newTodo ? `hover:bg-blue-700` : `opacity-50 cursor-not-allowed`\n              }`}\n              disabled={!newTodo}\n              onclick={async () => {\n                await todoListCollection.insertOne({\n                  text: newTodo,\n                  done: false,\n                });\n                newTodo = null;\n              }}\n            >\n              Save\n            </button>\n          </div>\n          {todos.map((x) => (\n            <div class="flex items-center gap-2">\n              <div\n                onclick={async () => {\n                  await todoListCollection.updateOne(\n                    { _id: x._id },\n                    { $set: { done: !x.done } }\n                  );\n                }}\n                class={`flex flex-grow items-center gap-2 ${\n                  x.done ? `bg-green-200 line-through` : `bg-gray-200`\n                } p-2 rounded cursor-pointer`}\n              >\n                <input class="flex-none" checked={x.done} type="checkbox" />\n                <div class="flex-grow">{x.text}</div>\n              </div>\n              <button\n                class="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"\n                onclick={async () => {\n                  await todoListCollection.deleteOne({ _id: x._id });\n                }}\n              >\n                Delete\n              </button>\n            </div>\n          ))}\n        </div>\n      </div>\n    );\n  };\n};\n')),(0,i.kt)("h2",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"We have created a real-time Todo app with Drayman, MongoDB and Tailwind CSS in just 100 lines of code, inside a single script."),(0,i.kt)("p",null,"If this felt interesting to you, visit the ",(0,i.kt)("a",{parentName:"p",href:"http://www.drayman.io/"},"official docs")," to deep-dive into Drayman framework!"))}u.isMDXComponent=!0},3332:function(e,n,t){n.Z=t.p+"assets/images/basic-ui-1f54529f506ab6c2684dab33c58122bb.png"},4796:function(e,n,t){n.Z=t.p+"assets/images/input-save-95b68a089b381b7fdaad75fe907f8421.gif"},675:function(e,n,t){n.Z=t.p+"assets/images/mongodb-realtime-0c3f3906c6efad0dc00c280428a2afba.gif"},3104:function(e,n,t){n.Z=t.p+"assets/images/todo-list-functionality-1e18513161a18ca52555293c447b6254.gif"}}]);