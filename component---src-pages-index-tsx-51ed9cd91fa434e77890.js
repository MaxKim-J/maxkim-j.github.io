"use strict";(self.webpackChunkmax_kim_tech_blog=self.webpackChunkmax_kim_tech_blog||[]).push([[691],{652:function(e,t,n){n.r(t),n.d(t,{Head:function(){return H},default:function(){return U}});var l,i=n(959),o=n(4373),a=n(7784),r=n(6069),c=n(6204),m=n(865),u=n(3e3),d=n(1274);!function(e){e[e.all=0]="all",e[e.tech=50]="tech",e[e.essay=100]="essay",e[e.review=150]="review"}(l||(l={}));var s={0:"all",50:"tech",100:"essay",150:"review"};var f=(0,c.zo)("div",{position:"relative"}),g=(0,c.iv)({"-webkit-appearance":"none",width:"200px",backgroundColor:"black",height:"5px",outline:"none",margin:0,"&::-webkit-slider-thumb":{"-webkit-appearance":"none",height:"16px",width:"16px",borderRadius:"50%",backgroundColor:"black",cursor:"pointer"}}),p=(0,c.zo)("input",{cursor:"pointer"}),h=(0,c.zo)("div",{width:"59px"}),b=(0,c.zo)("div",{fontSize:"$mobileDescription",position:"absolute",variants:{index:{0:{left:3},1:{left:59},2:{left:118},3:{left:178}}}}),v=function(){var e=(0,i.useContext)(d.B),t=e.setCategory,n=e.category,o=(0,i.useState)(l[n]),a=o[0],c=o[1],m=(0,r.K2)("388561117");return console.info(m),i.createElement(f,null,i.createElement(p,{className:g(),type:"range",min:"0",max:"150",step:"50",value:a,onChange:function(e){c(e.target.value),t(s[e.target.value])}}),Object.values(s).map((function(e,t){return i.createElement(h,{key:e},i.createElement(b,{index:t},e))})))};var E=(0,c.zo)("div",{marginBottom:"70px"}),x=(0,c.zo)("div",{}),z=(0,c.zo)("span",{fontSize:"$description"}),y=(0,c.zo)("div",{marginBottom:"16px","&>div":{fontSize:"$mainTitle",fontWeight:"$bold","@mobile":{fontSize:"$subTitle"}}}),$=(0,c.zo)(y,{lineHeight:1.3,marginBottom:"38px"}),k=(0,c.zo)("div",{display:"flex",justifyContent:"space-between","@mobile":{display:"block"}}),S=(0,c.zo)("div",{display:"flex",alignItems:"center",minWidth:"180px","&>div":{marginRight:"20px"}}),w=(0,c.zo)("div",{marginBottom:"28px","@mobile":{marginTop:"50px",marginBottom:0}}),B=function(){return i.createElement(E,null,i.createElement(x,null,i.createElement(r.rU,{to:"/"},i.createElement(y,null,i.createElement("div",null,"김맥스 블로그"))),i.createElement($,null,i.createElement("div",null,"그때그때 필요한 엔지니어링"),i.createElement("div",null,"기록이 필요한 생각과 경험들"))),i.createElement(k,null,i.createElement(S,null,i.createElement(m.Z,{tooltip:i.createElement(u.Z,null)},i.createElement("div",null,"theme")),i.createElement("div",null,i.createElement(r.rU,{to:"/pic"},"pic")),i.createElement("div",null,i.createElement(r.rU,{to:"/about"},"about"))),i.createElement(w,null,i.createElement(z,null,"swipe ↔"),i.createElement(v,null))))},C=n(9328);var W=(0,c.zo)("ol",{display:"flex",flexDirection:"column",alignItems:"flex-end","@mobile":{alignItems:"flex-start"}}),I=(0,c.zo)("li",{marginBottom:"48px",display:"flex",flexDirection:"column",alignItems:"flex-end",lineHeight:1.2,"@mobile":{alignItems:"flex-start"}}),T=(0,c.zo)("span",{fontSize:"$subTitle",fontWeight:"$bold","@mobile":{fontSize:"$mobileTitle"}}),Z=(0,c.zo)("span",{fontSize:"$description",marginTop:"6px","@mobile":{fontSize:"12px"}}),_=function(e){var t=e.postList,n=(0,i.useContext)(d.B).category,l=t.allMdx.nodes.filter((function(e){var t=e.frontmatter;return"all"===n?null!==t.category:t.category===n}));return i.createElement(W,null,l.length?l.map((function(e){var t=e.id,n=e.frontmatter,l=e.slug;return i.createElement(r.rU,{to:"/posts/"+l,key:t},i.createElement(I,null,i.createElement(T,null,n.title),i.createElement(Z,null,n.date," - ",n.description)))})):i.createElement("div",null,"No post"))},D=n(7939),U=function(e){var t=e.data;return(0,o.Z)(),i.createElement(a.Z,{header:i.createElement(B,null),footer:i.createElement(C.Z,null)},i.createElement(_,{postList:t}))},H=function(){return i.createElement(D.Z,null)}},4373:function(e,t,n){var l=(0,n(6204).zY)({"*":{fontFamily:"Pretendard"},body:{overflowX:"hidden"},"p, body":{margin:0,padding:0,fontSize:"$body1"},strong:{fontWeight:"$bold"},a:{textDecoration:"none","&:link":{color:"$black"},"&:visited":{color:"$black"}},img:{width:"100%",height:"auto"},ol:{listStyleType:"none",marginBlockStart:0,marginBlockEnd:0,marginInlineStart:0,marginInlineEnd:0,paddingInlineStart:0},h1:{fontSize:"$heading1",fontWeight:"$bold"},h2:{fontSize:"$heading2",fontWeight:"$bold"},h3:{fontSize:"$heading3",fontWeight:"$bold"},h4:{fontSize:"$heading4",fontWeight:"$bold"},h5:{fontSize:"$heading5",fontWeight:"$bold"}});t.Z=l}}]);
//# sourceMappingURL=component---src-pages-index-tsx-51ed9cd91fa434e77890.js.map
