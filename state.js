// الحالة العامة والثوابت والدوال المساعدة
let NM="ABCD";
const $=s=>document.querySelector(s),COL=["#e11d48","#2563eb","#16a34a","#d97706","#9333ea","#0891b2","#db2777","#65a30d"];
let xon={},xterms=[],tab="k",n=3,mode="sop",cells=[],groups=[];
const dim=()=>n==2?[1,1]:n==3?[1,2]:[2,2],gr=b=>b==1?[0,1]:[0,1,3,2],bin=(v,w)=>v.toString(2).padStart(w,"0");
const esc=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
