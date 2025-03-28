define(["exports","@uif-js/core/jsx-runtime","@uif-js/core","N/log","@uif-js/component","N/query","N/record","N/runtime"],(function(e,t,o,n,s,i,a,r){"use strict";function c(){return t.jsx(s.Heading,{type:s.Heading.Type.PAGE_TITLE,children:"Task List"})}const l={ADD_TODO:Symbol("addToDo"),FETCH_TODOS:Symbol("fetchToDo"),TOGGLE_TODO:Symbol("toggleToDo"),REMOVE_TODO:Symbol("removeToDo"),FILTER_TODO:Symbol("filterToDo")},u={addToDo:e=>async t=>{const o=await async function(e){const t=await a.create.promise({type:"task"});t.setValue("title",e),t.setValue("assigned",r.getCurrentUser().id);const o=await t.save.promise();return String(o)}(e);t({type:l.ADD_TODO,id:o,title:e})},fetchToDo:()=>async e=>{const t=await async function(){const e=[],t=(await i.runSuiteQL.promise({query:`SELECT id, title, status FROM task WHERE assigned = ${r.getCurrentUser().id}`})).asMappedResults();for(const o of t)e.push({id:String(o.id),title:o.title,completed:"COMPLETE"==o.status});return e}();e({type:l.FETCH_TODOS,todos:t})},toggleToDo:e=>async t=>{(async function(e){const t=(await i.runSuiteQL.promise({query:`SELECT status FROM task WHERE id = ${e}`})).asMappedResults();a.submitFields.promise({type:"task",id:e,values:{status:"COMPLETE"==t[0].status?"PROGRESS":"COMPLETE"}}).then((e=>{console.log("apiUpdateTaskCompleted - task updated",e,new Date)})).catch((e=>{alert(e)}))})(e).then((()=>{t({type:l.TOGGLE_TODO,id:e})}))},removeToDo(e){var t;return t=e,a.delete.promise({type:"task",id:t}).then((()=>{console.log("apiDeleteTask - task deleted successfully",t,new Date)})),{type:l.REMOVE_TODO,id:e}},filterToDos:e=>({type:l.FILTER_TODO,filter:e})};function d(e,t){return{todos:p(e.todos,t),filter:T(e.filter,t)}}function T(e,t){return t.type==l.FILTER_TODO?t.filter:e}function p(e,t){switch(t.type){case l.FETCH_TODOS:return t.todos;case l.ADD_TODO:return[{id:t.id,title:t.title,completed:!1},...e];case l.TOGGLE_TODO:return e.map((e=>e.id==t.id?{...e,completed:!e.completed}:e),[]);case l.REMOVE_TODO:return e.filter((e=>e.id!=t.id));default:return e}}function f(e){const n=o.useDispatch();return t.jsxs("div",{style:{width:400,height:25},children:[t.jsx(s.CheckBox,{value:e.completed,label:e.title,action:function(t){"click"==t.reason&&(console.log("handleToggle - now",t.value,"was",t.previousValue,"at",new Date),n(u.toggleToDo(e.id)))}}),t.jsx(s.Button,{icon:o.SystemIcon.DELETE,action:function(){n(u.removeToDo(e.id))}})]})}function m(){const e=o.useSelector((e=>e.filter)),n=o.useSelector((e=>e.todos)),s=o.useMemo((()=>{switch(console.log("TodoList - filteredTodos",e,n),e){case"active":return n.filter((e=>!e.completed));case"completed":return n.filter((e=>!0===e.completed));default:return n}}),[e,n]).map((e=>t.jsx(f,{...e})));return t.jsx("div",{children:s})}function D(){const[e,n]=o.useState(""),i=o.useDispatch();return t.jsx(o.VDom.Fragment,{children:t.jsxs("div",{width:"300px",children:[t.jsx(s.TextBox,{type:s.TextBox.Type.TEXT,placeholder:"Enter new task...",onTextChanged:function(e){n(e.text)},text:e}),t.jsx(s.Button,{label:"Add",action:function(){e&&(i(u.addToDo(e)),n(""))}})]})})}function O(e){const n=o.useDispatch();const s={color:"blue",cursor:"pointer",fontWeight:o.useSelector((e=>e.filter))==e.name?"bold":"normal"};return t.jsx("span",{style:s,onClick:function(){console.log("handleFilter",e.name),n(u.filterToDos(e.name))},children:e.name})}function E(){return t.jsxs("div",{children:[t.jsx("span",{children:"Filter: "}),t.jsx(O,{name:"all"})," / ",t.jsx(O,{name:"active"})," / ",t.jsx(O,{name:"completed"})]})}const h={todos:[],filter:"all"};function x(){n.debug("App",`Initializing at ${new Date}`);const[e,i]=o.useState(h),a=o.useMemo((()=>o.Store.create({reducer:d,state:e,onStateChanged:({currentState:e})=>i(e)})));return o.useEffect((()=>a.subscribe((()=>i(a.getState())))),[]),o.useEffect((()=>{console.log("useEffect - fetchToDo",new Date),a.dispatch(u.fetchToDo())}),[]),t.jsx(o.Store.Provider,{store:a,children:t.jsxs(s.StackPanel,{alignment:s.StackPanel.Alignment.START,orientation:s.StackPanel.Orientation.VERTICAL,children:[t.jsx(s.StackPanel.Item,{children:t.jsx(c,{})}),t.jsx(s.StackPanel.Item,{children:t.jsx(D,{})}),t.jsx(s.StackPanel.Item,{children:t.jsx(m,{})}),t.jsx(s.StackPanel.Item,{children:t.jsx(E,{})})]})})}e.run=function(e){console.log("SpaClient version 250328a - run",e),e.setLayout("application"),e.setContent(t.jsx(x,{}))}}));
