(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{155:function(e,t,n){"use strict";n.r(t);n(40),n(156);var a=n(8),o=n.n(a),r=n(0),i=n.n(r),c=(n(160),13),l=9,s=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).onEnterUpdate=function(e){var n=t.props,a=n.id,o=n.value,r=n.closeLabel,i=n.updateLabel;e.which===c&&o.trim()&&(i(a,o.trim()),r(a))},t.preventFocus=function(e){e.which===l&&e.preventDefault()},t}o()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.textarea.focus()},n.render=function(){var e=this,t=this.props,n=this.onEnterUpdate,a=this.preventFocus,o=t.id,r=t.value,c=t.updateLabel,l=t.isEditMode?"editable-block":"editable-block editable-block_hidden";return i.a.createElement("textarea",{placeholder:"start type here to begin",ref:function(t){return e.textarea=t},value:r,className:l,onKeyDown:a,onKeyPress:n,onChange:function(e){var t=e.target.value;return c(o,t)}})},t}(r.Component),d=(n(161),function(e){var t=e.id,n=e.value,a=e.isEditMode,o=e.switchLabelToEditMode,r=a?"label--text label-text_hidden":"label--text";return i.a.createElement("p",{className:r,onClick:function(){return o(t)}},n)}),u=(n(162),function(e){var t=e.block,n=e.updateLabel,a=e.closeLabel,o=e.switchLabelToEditMode,r={id:t.id,value:t.value,isEditMode:t.isEditMode},c=t.hasChildren?"labels labels_has_children":"labels",l=t.isRoot?"label root":"label";return i.a.createElement("div",{className:c},i.a.createElement("label",{className:l},i.a.createElement(d,Object.assign({},r,{switchLabelToEditMode:o})),i.a.createElement(s,Object.assign({},r,{updateLabel:n,closeLabel:a}))))}),f=(n(163),function e(t){var n=t.block,a=t.blocks,o=t.handlers,r=n.id,c=n.hasChildren,l=n.isEditMode,s=n.isRoot,d=void 0!==s&&s,f=o.removeBlockWithChildren,b=a.filter(function(e){return e.parentID===r}),h=b.length>1,p=!(l||d);return i.a.createElement("div",{className:"block"},i.a.createElement("div",{className:"block--label-container"},i.a.createElement(u,Object.assign({block:n},o)),p&&i.a.createElement("button",{className:"block--remove-button",onClick:function(){return f(r)}})),c&&i.a.createElement("div",{className:"block--children"},h&&i.a.createElement("div",{className:"block--children-separator"}),function(t,n){return t.map(function(t){return i.a.createElement(e,{key:t.id,block:t,blocks:n,handlers:o})})}(b,a)))}),b=function(e){var t=e.exportMap;return i.a.createElement("button",{onClick:t},"export to JSON")},h=function(e){return function(t){var n=t.target,a=new FileReader;a.onload=function(t){var a=t.target.result;e(JSON.parse(a)),n.value=""},a.readAsText(n.files.item(0))}},p=function(e){var t=e.loadMindmap;return i.a.createElement("label",null,"load your own mind map",": ",i.a.createElement("input",{id:"loadJSONId",type:"file",onChange:h(t),accept:".json"}))},m=(n(164),n(41),function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}),v=(n(166),function(){return""+m()+m()+"- "+m()+"-"+m()+"-"+m()+"-"+m()+m()+m()}),k=function(e,t){return{id:e,parentID:t,isEditMode:!0,hasChildren:!1,value:""}},E=["labels","label","label--text","editable-block"],g={id:0,hasChildren:!1,isEditMode:!0,isRoot:!0,value:""},w=13,C=9,M=function(e){function t(t){var n;return(n=e.call(this,t)||this).keyDown=function(e){var t=n.state,a=t.selectedBlockID,o=t.enableCreateNewBlock;if(!t.blocks.some(function(e){return e.isEditMode})){var r=e.which;switch(!0){case r===w&&o:n.createNewSisterBlock(a);break;case r===C:e.preventDefault(),n.createNewChildrenBlock(a);break;default:n.setState({enableCreateNewBlock:!0})}}},n.clickOnEmptySpace=function(e){var t=e.target.className;E.some(function(e){return e===t})||n.closeEditedLabelOnCLick()},n.switchLabelToEditMode=function(e){var t=n.state.blocks;t.find(function(e){var t=e.isEditMode,n=e.value;return t&&!n.trim()})||(t=t.map(function(t){return Object.assign({},t,{isEditMode:t.id===e})}),n.setState({blocks:t,selectedBlockID:e}))},n.updateLabel=function(e,t){var a=n.state.blocks;a=a.map(function(n){return n.id===e?Object.assign({},n,{value:t}):n}),n.setState({blocks:a})},n.closeLabel=function(e){var t=n.state.blocks;t=t.map(function(t){return t.id===e?Object.assign({},t,{isEditMode:!1}):t}),n.setState({blocks:t,selectedBlockID:e})},n.createNewSisterBlock=function(e){if(e!==g.id){var t=n.state.blocks,a=t.find(function(t){return t.id===e}).parentID;n.createAndSelectNewBlock(a,t)}},n.createNewChildrenBlock=function(e){var t=n.state.blocks;t=t.map(function(t){return t.id===e?Object.assign({},t,{hasChildren:!0}):t}),n.createAndSelectNewBlock(e,t)},n.createAndSelectNewBlock=function(e,t){var a=v();n.setState({blocks:[].concat(t,[k(a,e)]),selectedBlockID:a})},n.closeEditedLabelOnCLick=function(){var e=n.state.blocks.reduce(function(e,t){var n=e.blocks,a=e.hasEditedLabel,o=t,r=o.isEditMode,i=o.value;return r&&i.trim()&&(t=Object.assign({},t,{isEditMode:!1}),a=!0),{hasEditedLabel:a,blocks:[].concat(n,[t])}},{blocks:[]}),t=e.hasEditedLabel,a=e.blocks;t&&n.setState({blocks:a})},n.removeBlockWithChildren=function(e){var t="",a=n.state.blocks;a=a.filter(function(n){var a=n.id,o=n.parentID;return a!==e||(t=o,!1)}).map(function(e,a,o){var r=e.id;return n.isRemovedBlockHasNotChildren(o,t,r)?Object.assign({},e,{hasChildren:!1}):e}),a=n.getBlocksWithoutChildrenOfRemoved(a,[e]),n.setState({blocks:a,selectedBlockID:t})},n.isRemovedBlockHasNotChildren=function(e,t,n){return n===t&&!e.find(function(e){return e.parentID===t})},n.getBlocksWithoutChildrenOfRemoved=function(e,t){var a=[],o=e.filter(function(e){var n=e.id,o=e.parentID;return!t.find(function(e){return e===o})||(a.push(n),!1)});return Boolean(a.length)&&(e=n.getBlocksWithoutChildrenOfRemoved(o,a)),e},n.exportMap=function(){var e=n.state.blocks,t="text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e)),a=document.createElement("a");a.href="data:"+t,a.download="mindmap.json",a.click(),a.remove()},n.loadMindmap=function(e){n.setState({selectedBlockID:0,enableCreateNewBlock:!0,blocks:[].concat(e)}),console.log(e)},n.state={selectedBlockID:0,enableCreateNewBlock:!0,blocks:[Object.assign({},g)]},n.handlers={updateLabel:n.updateLabel,closeLabel:n.closeLabel,switchLabelToEditMode:n.switchLabelToEditMode,removeBlockWithChildren:n.removeBlockWithChildren},n}o()(t,e);var n=t.prototype;return n.componentDidMount=function(){document.addEventListener("keydown",this.keyDown,!1),document.addEventListener("mousedown",this.clickOnEmptySpace,!0)},n.componentWillUnmount=function(){document.removeEventListener("keydown",this.keyDown,!1),document.removeEventListener("mousedown",this.clickOnEmptySpace,!0)},n.render=function(){var e=this.state.blocks,t=e[0];return i.a.createElement("div",{className:"mind-map-container"},i.a.createElement(b,{exportMap:this.exportMap}),i.a.createElement(p,{loadMindmap:this.loadMindmap}),i.a.createElement("div",{className:"mind-map"},i.a.createElement(f,{block:t,blocks:e,handlers:this.handlers})))},t}(r.Component);t.default=M},156:function(e,t,n){"use strict";var a=n(9),o=n(157)(5),r=!0;"find"in[]&&Array(1).find(function(){r=!1}),a(a.P+a.F*r,"Array",{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),n(65)("find")},157:function(e,t,n){var a=n(19),o=n(64),r=n(31),i=n(17),c=n(158);e.exports=function(e,t){var n=1==e,l=2==e,s=3==e,d=4==e,u=6==e,f=5==e||u,b=t||c;return function(t,c,h){for(var p,m,v=r(t),k=o(v),E=a(c,h,3),g=i(k.length),w=0,C=n?b(t,g):l?b(t,0):void 0;g>w;w++)if((f||w in k)&&(m=E(p=k[w],w,v),e))if(n)C[w]=m;else if(m)switch(e){case 3:return!0;case 5:return p;case 6:return w;case 2:C.push(p)}else if(d)return!1;return u?-1:s||d?d:C}}},158:function(e,t,n){var a=n(159);e.exports=function(e,t){return new(a(e))(t)}},159:function(e,t,n){var a=n(7),o=n(95),r=n(3)("species");e.exports=function(e){var t;return o(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!o(t.prototype)||(t=void 0),a(t)&&null===(t=t[r])&&(t=void 0)),void 0===t?Array:t}},164:function(e,t,n){"use strict";n(165);var a=n(5),o=n(94),r=n(10),i=/./.toString,c=function(e){n(14)(RegExp.prototype,"toString",e,!0)};n(13)(function(){return"/a/b"!=i.call({source:"a",flags:"b"})})?c(function(){var e=a(this);return"/".concat(e.source,"/","flags"in e?e.flags:!r&&e instanceof RegExp?o.call(e):void 0)}):"toString"!=i.name&&c(function(){return i.call(this)})},165:function(e,t,n){n(10)&&"g"!=/./g.flags&&n(12).f(RegExp.prototype,"flags",{configurable:!0,get:n(94)})}}]);
//# sourceMappingURL=component---src-pages-index-tsx-677cf17ca2e21daf1ef0.js.map