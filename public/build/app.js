webpackJsonp([1],{0:function(e,t,a){"use strict";var n=a(9).default,l=a(4),r=n(l),u=a(236),s=n(u),d=a(170),o=n(d),i=a(164),c=n(i),f=a(168),m=n(f),h=a(153),p=a(101),v=n(p),g=a(183),E=(0,g.root)(v.default,o.default);s.default.render(r.default.createElement(h.Router,{history:h.hashHistory},r.default.createElement(h.Route,{path:"/",component:E},r.default.createElement(h.IndexRedirect,{to:"/canvas"}),r.default.createElement(h.Route,{path:"canvas",component:c.default}),r.default.createElement(h.Route,{path:"statistics",component:m.default}),r.default.createElement(h.Redirect,{from:"*",to:"/canvas"}))),document.getElementById("app"))},99:function(e,t,a){"use strict";var n=a(102).default,l=a(171).default,r=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var u=a(336),s=r(u),d=a(101),o=r(d),i=a(100),c=r(i);t.default={getColorSvg:function(e){return new n(function(t,a){s.default.get("http://localhost:9000/colors/"+e).set("Accept","image/svg+xml").end(function(n,l){200===l.status?(o.default.set(["svg",e],l.text),t(l.text)):a("error")})})},loadImage:function(e){return new n(function(t,a){var n=new Image;n.src=e,n.onload=function(){var e=n.src,a=n.height,l=n.width;o.default.set("image",{src:e,height:a,width:l});var r=Math.ceil(n.width/c.default.TILE_WIDTH),u=r/n.width,s=Math.ceil(n.height/c.default.TILE_HEIGHT),d=s/n.height;o.default.set("scaled",{height:s,width:r,scalex:u,scaley:d}),o.default.set("mosaic",{height:s*c.default.TILE_HEIGHT,width:r*c.default.TILE_WIDTH,data:[]}),o.default.set("status","loaded"),o.default.set(["progress","bar"],0),t(n)}})},getScaledImageData:function(e){return new n(function(t,a){var n=o.default.select("scaled"),r=n.get(),u=r.height,s=r.width,d=l(e.getImageData(0,0,s,u).data);n.set("data",d),o.default.set("status","ready"),t(d)})},setStatus:function(e){o.default.set("status",e)},setColorStat:function(e){var t=o.default.select("stat","colors"),a=o.default.select("stat","total");t.get(e)?t.set(e,t.get(e)+1):t.set(e,1),a.get()?a.set(a.get()+1):a.set(1)},saveDrawResults:function(e){var t=l(e),a=o.default.select("mosaic","data");a.get()?a.set(a.get().concat(t)):a.set(t)},setProgress:function(e,t){var a=o.default.select("scaled"),n=a.get("width")*a.get("height"),l=e+t*a.get("width"),r=Math.round(l/n*100);o.default.set("progress",{bar:r,x:e,y:t})}},e.exports=t.default},100:function(e,t){"use strict";e.exports={TILE_WIDTH:8,TILE_HEIGHT:8}},101:function(e,t,a){"use strict";var n=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var l=a(40),r=n(l),u={elements:{canvas:"canvas",buffer:"buffer",link:"download-link"},menu:[{title:"Canvas",link:"canvas"},{title:"Statistics",link:"statistics"}],image:{},scaled:{},mosaic:{},stat:{},svg:{},status:null,progress:{}};t.default=new r.default(u),e.exports=t.default},163:function(e,t,a){"use strict";var n=a(20).default,l=a(21).default,r=a(19).default,u=a(18).default,s=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var d=a(99),o=s(d),i=a(44),c=a(61),f=s(c),m=a(4),h=s(m),p=function(e){function t(){var e=this;u(this,a),n(Object.getPrototypeOf(a.prototype),"constructor",this).apply(this,arguments),this.onSelected=function(e){var t=URL.createObjectURL(e.target.files[0]);o.default.loadImage(t)},this.onRender=function(){o.default.setStatus("render")},this.onSave=function(){var t=e.props.elements,a=document.getElementById(t.canvas),n=document.getElementById(t.link);a&&n&&(n.href=a.toDataURL(),n.download="mosaic.png")}}l(t,e),r(t,[{key:"render",value:function(){var e=this.props,t=e.elements,a=e.status,n=t.link,l="render"===a,r="ready"===a,u="done"===a;return h.default.createElement("div",null,h.default.createElement("div",{className:"form"},h.default.createElement("button",{className:"ui button button-file"},h.default.createElement("i",{className:"upload icon"}),"Select image",h.default.createElement("input",{onChange:this.onSelected,type:"file"})),h.default.createElement("button",{className:(0,f.default)("ui button",{show:r,hide:!r}),onClick:this.onRender},h.default.createElement("i",{className:"cube icon"}),"Render"),h.default.createElement("a",{id:n,className:(0,f.default)("ui button",{show:u,hide:!u}),onClick:this.onSave},h.default.createElement("i",{className:"save icon"}),"Save image"),l&&h.default.createElement("div",{className:"layer"})),r&&h.default.createElement("div",{className:"ui positive message"},"Image loaded. Click ",h.default.createElement("b",null,"Render")," or ",h.default.createElement("b",null,"Select another image")))}}]);var a=t;return t=(0,i.branch)({elements:["elements"],status:["status"]})(t)||t}(h.default.Component);t.default=p,e.exports=t.default},164:function(e,t,a){"use strict";var n=a(20).default,l=a(21).default,r=a(19).default,u=a(18).default,s=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var d=a(163),o=s(d),i=a(165),c=s(i),f=a(4),m=s(f),h=function(e){function t(){u(this,t),n(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return l(t,e),r(t,[{key:"render",value:function(){return m.default.createElement("div",null,m.default.createElement("h1",null,"Canvas"),m.default.createElement(o.default,null),m.default.createElement(c.default,null))}}]),t}(m.default.Component);t.default=h,e.exports=t.default},165:function(e,t,a){"use strict";var n=a(20).default,l=a(21).default,r=a(19).default,u=a(18).default,s=a(179).default,d=a(102).default,o=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var i=a(99),c=o(i),f=a(44),m=a(100),h=o(m),p=a(61),v=o(p),g=a(167),E=o(g),y=a(4),b=o(y),I=function(e){function t(e){var t=this;u(this,a),n(Object.getPrototypeOf(a.prototype),"constructor",this).call(this,e),this.scaleToCanvas=function(){var e=t.props,a=e.elements,n=e.image,l=e.scaled,r=n.src;if(r){var u=document.getElementById(a.canvas),s=u.getContext("2d"),d=new Image;d.src=r,s.scale(l.scalex,l.scaley),s.drawImage(d,0,0),c.default.getScaledImageData(s)}},this.renderToCanvas=function(e,a){var n=t.props,l=n.elements,r=n.mosaic,u=n.scaled,d=void 0,o=e||0,i=a||0;if(0==o&&0==i){var f=document.getElementById(l.canvas),m=f.getContext("2d");f.width=r.width,f.height=r.height,m.clearRect(0,0,r.width,r.height)}if(i===u.height-1&&o===u.width)return void c.default.setStatus("done");o===u.width&&(o=0,i++);var p=4*o+i*u.width*4,v=p+4,g=u.data.slice(p,v),E=s(g,3),y=E[0],b=E[1],I=E[2];c.default.setProgress(o,i),d=t.rgbToHex(y,b,I),c.default.setColorStat(d),t.renderRow(d,o*h.default.TILE_WIDTH,i*h.default.TILE_WIDTH).then(function(){t.renderToCanvas(o+1,i)})},this.renderRow=function(e,a,n){return new d(function(l,r){t.getHexSvg(e).then(function(e){var r=t.props,u=r.elements,s=r.mosaic,d=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),o=self.URL||self.webkitURL||self,i=o.createObjectURL(d),f=new Image,m=document.getElementById(u.buffer),p=document.getElementById(u.canvas);f.src=i,f.onload=function(){if(m){var e=m.getContext("2d");if(e.drawImage(f,a,0),a===s.width-h.default.TILE_WIDTH){if(p){var t=p.getContext("2d"),e=m.getContext("2d"),r=e.getImageData(0,0,s.width,h.default.TILE_HEIGHT);c.default.saveDrawResults(r.data),t.putImageData(r,0,n),e.clearRect(0,0,s.width,h.default.TILE_HEIGHT),l("done")}}else l("done")}}})})},this.renderToCanvasFromCashe=function(){var e=t.props,a=e.mosaic,n=e.progress,l=e.status,r=document.getElementById(t.props.elements.canvas),u=r.getContext("2d"),s=void 0;r.width=a.width,r.height=a.height;var d=new Uint8ClampedArray(a.data);s="done"==l?a.height:n.y*h.default.TILE_HEIGHT;var o=new ImageData(d,a.width,s);u.putImageData(o,0,0),"render"==l&&(c.default.setProgress(0,n.y),t.renderToCanvas(0,n.y))},this.getHexSvg=function(e){return new d(function(a,n){var l=t.props.svg,r=e.slice(1);void 0!==l[r]?a(l[r]):c.default.getColorSvg(r).then(function(e){a(e)})})},this.rgbToHex=function(e,t,a){return"#"+((1<<24)+(e<<16)+(t<<8)+a).toString(16).slice(1)}}l(t,e),r(t,[{key:"componentDidMount",value:function(){var e=this.props.status;"render"!=e&&"done"!=e||this.renderToCanvasFromCashe()}},{key:"componentDidUpdate",value:function(e){e.image.src!==this.props.image.src&&this.scaleToCanvas(),"ready"===e.status&&"render"===this.props.status&&this.renderToCanvas()}},{key:"render",value:function(){var e=this.props,t=e.mosaic,a=e.scaled,n=e.elements,l=e.status,r="render"==l,u="done"==l;return b.default.createElement("div",{className:"canvas__container"},b.default.createElement("canvas",{className:(0,v.default)({show:r||u}),id:n.canvas,height:a.height,width:a.width}),b.default.createElement("canvas",{id:n.buffer,height:h.default.TILE_HEIGHT,width:t.width}),b.default.createElement(E.default,null))}}]);var a=t;return t=(0,f.branch)({elements:["elements"],image:["image"],scaled:["scaled"],mosaic:["mosaic"],svg:["svg"],status:["status"],progress:["progress"]})(t)||t}(b.default.Component);t.default=I,e.exports=t.default},166:function(e,t,a){"use strict";var n=a(20).default,l=a(21).default,r=a(19).default,u=a(18).default,s=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var d=a(44),o=a(153),i=a(4),c=s(i),f=function(e){function t(){u(this,a),n(Object.getPrototypeOf(a.prototype),"constructor",this).apply(this,arguments),this.renderItem=function(e){var t=e.link,a=e.title;return c.default.createElement(o.Link,{activeClassName:"active",className:"item",key:t,to:t},a)}}l(t,e),r(t,[{key:"render",value:function(){var e=this;return c.default.createElement("div",{className:"ui pointing menu"},this.props.menu.map(function(t){return e.renderItem(t)}))}}]);var a=t;return t=(0,d.branch)({menu:["menu"]})(t)||t}(c.default.Component);t.default=f,e.exports=t.default},167:function(e,t,a){"use strict";var n=a(20).default,l=a(21).default,r=a(19).default,u=a(18).default,s=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var d=a(44),o=a(61),i=s(o),c=a(4),f=s(c),m=function(e){function t(){u(this,a),n(Object.getPrototypeOf(a.prototype),"constructor",this).apply(this,arguments)}l(t,e),r(t,[{key:"render",value:function(){var e=this.props,t=e.progress,a=e.status;return f.default.createElement("div",{className:(0,i.default)("progressbar",{show:"render"===a})},f.default.createElement("span",null,t.bar?t.bar+"%":""))}}]);var a=t;return t=(0,d.branch)({status:["status"],progress:["progress"]})(t)||t}(f.default.Component);t.default=m,e.exports=t.default},168:function(e,t,a){"use strict";var n=a(20).default,l=a(21).default,r=a(19).default,u=a(18).default,s=a(177).default,d=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var o=a(44),i=a(4),c=d(i),f=a(169),m=d(f),h=function(e){function t(){var e=this;u(this,a),n(Object.getPrototypeOf(a.prototype),"constructor",this).apply(this,arguments),this.sortStats=function(){var t=e.props.stat,a=t.colors||{},n=[];return s(a).forEach(function(e){n.push({hex:e,value:a[e]})}),n.sort(function(e,t){return t.value-e.value}),n}}l(t,e),r(t,[{key:"render",value:function(){var e=this.props.stat.total,t=this.sortStats();return c.default.createElement("div",null,c.default.createElement("h1",null,"Statistic"),c.default.createElement(m.default,{data:t,total:e}))}}]);var a=t;return t=(0,o.branch)({stat:["stat"]})(t)||t}(c.default.Component);t.default=h,e.exports=t.default},169:function(e,t,a){"use strict";var n=a(20).default,l=a(21).default,r=a(19).default,u=a(18).default,s=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var d=a(4),o=s(d),i=function(e){function t(){var e=this;u(this,t),n(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments),this.getPercentValue=function(e,t){return(e/t*100).toFixed(2)+"%"},this.renderTable=function(){var t=e.props.data;return o.default.createElement("table",{className:"ui celled table"},o.default.createElement("thead",null,o.default.createElement("tr",null,o.default.createElement("th",null,"Color"),o.default.createElement("th",null,"Usage"))),o.default.createElement("tbody",null,t.map(function(t){return e.renderTableItem(t.hex,t.value)})))},this.renderTableItem=function(t,a){var n=e.props.total;return o.default.createElement("tr",{key:t},o.default.createElement("td",{style:{background:t}},o.default.createElement("span",null,t)),o.default.createElement("td",null,a+" - "+e.getPercentValue(a,n)))},this.renderEmptyState=function(){return o.default.createElement("div",{className:"ui positive message"},"No information")}}return l(t,e),r(t,[{key:"render",value:function(){var e=this.props.data,t=!e.length;return o.default.createElement("div",null,t?this.renderEmptyState():this.renderTable())}}]),t}(o.default.Component);t.default=i,e.exports=t.default},170:function(e,t,a){"use strict";var n=a(20).default,l=a(21).default,r=a(19).default,u=a(18).default,s=a(9).default;Object.defineProperty(t,"__esModule",{value:!0});var d=a(166),o=s(d),i=a(4),c=s(i),f=function(e){function t(){u(this,t),n(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,arguments)}return l(t,e),r(t,[{key:"render",value:function(){var e=this.props.location;e.pathname;return c.default.createElement("div",null,c.default.createElement(o.default,null),this.props.children)}}],[{key:"propTypes",value:{location:c.default.PropTypes.object.isRequired},enumerable:!0}]),t}(c.default.Component);t.default=f,e.exports=t.default}});
//# sourceMappingURL=app.js.map