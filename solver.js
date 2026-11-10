// خوارزمية Quine-McCluskey وخطوات الحل
function lits(p){const L=[];for(let i=0;i<n;i++){const b=1<<(n-1-i);if(p.k&b)continue;const one=!!(p.v&b);L.push({i,c:mode=="sop"?!one:one})}return L}
function term(L){if(!L.length)return mode=="sop"?"1":"0";const a=L.map(l=>NM[l.i]+(l.c?"′":""));return mode=="sop"?a.join(""):"("+a.join(" + ")+")"}
function solve(q){
 const N=1<<n,tv=mode=="sop"?1:0,T=[],D=[];cells.forEach((v,i)=>{if(v==="X")D.push(i);else if(v===tv)T.push(i)});
 const st=[];groups=[];$("#out").hidden=false;$("#cc").hidden=true;
 st.push(`الخلايا التي قيمتها ${tv}: <code>${T.join(", ")||"لا يوجد"}</code>${D.length?` — Don't Care: <code>${D.join(", ")}</code>`:""}`);
 let ex;
 if(!T.length){ex=mode=="sop"?"F = 0":"F = 1";st.push("لا توجد خلايا للتجميع، فالدالة ثابتة.")}
 else if(T.length+D.length==N){ex=mode=="sop"?"F = 1":"F = 0";st.push("كل الخريطة تُجمَّع في مجموعة واحدة، فالدالة ثابتة.")}
 else{
  let list=new Map([...T,...D].map(m=>[m+"_0",{v:m,k:0}])),P=[];
  while(list.size){const a=[...list.values()],used=new Set(),nx=new Map();
   for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++){const x=a[i],y=a[j];if(x.k!=y.k)continue;const d=x.v^y.v;
    if(d&&!(d&(d-1))){nx.set((x.v&~d)+"_"+(x.k|d),{v:x.v&~d,k:x.k|d});used.add(i);used.add(j)}}
   a.forEach((p,i)=>{if(!used.has(i))P.push(p)});list=nx}
  P.forEach(p=>{p.cov=T.filter(m=>(m&~p.k)===p.v);p.all=[...Array(N).keys()].filter(m=>(m&~p.k)===p.v)});
  st.push("المجموعات الأولية (Prime Implicants): "+P.map(p=>`<code>${term(lits(p))}</code> {${p.cov.join(",")}}`).join(" ، "));
  const sel=[],left=new Set(T);
  T.forEach(m=>{const c=P.filter(p=>p.cov.includes(m));if(c.length==1&&!sel.includes(c[0]))sel.push(c[0])});
  sel.forEach(p=>p.cov.forEach(m=>left.delete(m)));
  st.push(sel.length?"المجموعات الأساسية (Essential): "+sel.map(p=>`<code>${term(lits(p))}</code>`).join(" ، ")+" — لأن فيها خلية لا تغطيها مجموعة أخرى.":"لا توجد مجموعات أساسية.");
  while(left.size){const b=P.filter(p=>!sel.includes(p)).sort((x,y)=>y.cov.filter(m=>left.has(m)).length-x.cov.filter(m=>left.has(m)).length)[0];
   sel.push(b);b.cov.forEach(m=>left.delete(m));st.push(`لتغطية الخلايا المتبقية أُضيفت <code>${term(lits(b))}</code>.`)}
  groups=sel.map(p=>({L:lits(p),t:term(lits(p)),cells:p.all,p}));if(tab=="k")xterms=groups.map(g=>({label:g.t,f:i=>{const c=g.cells.includes(i)?1:0;return mode=="sop"?c:1-c}}));
  groups.forEach((g,k)=>{const fx=[],vr=[];for(let i=0;i<n;i++){const b=1<<(n-1-i);g.p.k&b?vr.push(NM[i]):fx.push(NM[i]+"="+((g.p.v&b)?1:0))}
   st.push(`المجموعة ${k+1} (${g.cells.length} خلية: ${g.cells.join(",")}): ${fx.length?"المتغيرات الثابتة <code>"+fx.join(" ")+"</code>":"لا ثوابت"}${vr.length?" والمتغيرات التي تتغير <code>"+vr.join(" ")+"</code> تُحذف":""} ← <code>${g.t}</code>`)});
  ex="F = "+groups.map(g=>g.t).join(mode=="sop"?" + ":" · ");
  st.push(mode=="sop"?"نجمع نواتج المجموعات بـ OR (+).":"نضرب نواتج المجموعات بـ AND (·).");
  $("#cc").hidden=false;$("#circ").innerHTML=circuit()}
 $("#expr").textContent=ex;
 $("#legend").innerHTML=groups.map((g,k)=>`<span class="chip"><b style="background:${COL[k%8]}"></b>${g.t}</span>`).join("");
 $("#steps").innerHTML=st.map(s=>`<li>${s}</li>`).join("");
 $("#canon").textContent=canon();
 render();if(q!==true)$("#out").scrollIntoView({behavior:"smooth",block:"start"})}
