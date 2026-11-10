// جدول الحقيقة والأعمدة الإضافية (المتممات والحدود) والصيغة القياسية
function vec(i){return[0,1,2,3].map(j=>j<n?(i>>(n-1-j))&1:0)}
function xlist(){const L=[];for(let j=0;j<n;j++)L.push({k:NM[j]+"′",v:i=>((i>>(n-1-j))&1)^1});xterms.forEach(t=>L.push({k:t.label,v:t.f}));return L}
function topTerms(src){let s=src.replace(/\s+/g,"");if(s.includes("="))s=s.split("=").pop();const a=[];let d=0,b="";for(const c of s){if(c=="(")d++;if(c==")")d--;if((c=="+"||c=="|")&&!d){a.push(b);b=""}else b+=c}a.push(b);return a.filter(Boolean)}
function setX(src){xon={};xterms=[];
 (src.match(/[A-Da-d]\s*['′’]/g)||[]).forEach(m=>xon[m[0].toUpperCase()+"′"]=1);
 (src.match(/[!~¬]\s*[A-Da-d]/g)||[]).forEach(m=>xon[m.slice(-1).toUpperCase()+"′"]=1);
 const T=topTerms(src);if(T.length>1)T.forEach(t=>{try{const q=parseExp(t);const l=t.replace(/'/g,"′");xterms.push({label:l,f:i=>q.f(vec(i))&1});xon[l]=1}catch(e){}})}
function mkTT(edit){const on=xlist().filter(c=>xon[c.k]);
 let h="<table class=tt><tr><th>#</th>"+NM.slice(0,n).split("").map(x=>`<th>${x}</th>`).join("")+on.map(c=>`<th class="xh">${esc(c.k)}</th>`).join("")+"<th>F</th></tr>";
 for(let i=0;i<(1<<n);i++){const gi=groups.map((g,k)=>g.cells.includes(i)?`<i class="dot" style="background:${COL[k%8]}"></i>`:"").join("");
  h+=`<tr><td>${i}</td>${bin(i,n).split("").map(b=>`<td>${b}</td>`).join("")}${on.map(c=>`<td class="x${c.v(i)}">${c.v(i)}</td>`).join("")}<td class="f${cells[i]}"${edit?` data-ti="${i}"`:""}>${cells[i]} ${gi}</td></tr>`}
 return h+"</table>"}
function ttable(){$("#tt").innerHTML=mkTT(true);$("#tt2").innerHTML=mkTT(false);$("#xc").innerHTML=xlist().map(c=>`<button class="sec xchip${xon[c.k]?" on":""}" data-k="${encodeURIComponent(c.k)}">${esc(c.k)}</button>`).join("")}
function canon(){const o=[],z=[];cells.forEach((v,i)=>(v===1?o:z).push(i));
 const mt=i=>bin(i,n).split("").map((b,j)=>NM[j]+(b=="1"?"":"′")).join(""),mx=i=>"("+bin(i,n).split("").map((b,j)=>NM[j]+(b=="0"?"":"′")).join(" + ")+")";
 return `Canonical SOP: F = Σm(${o.join(",")}) = ${o.map(mt).join(" + ")||"0"}\nCanonical POS: F = ΠM(${z.join(",")}) = ${z.map(mx).join("·")||"1"}`}
function splitList(s){const a=[];let d=0,b="";for(const c of s){if(c=="(")d++;if(c==")")d--;if((c==","||c=="،"||c==";")&&!d){a.push(b);b=""}else b+=c}a.push(b);return a.map(x=>x.trim()).filter(Boolean)}
function applyCols(){xon={};xterms=[];const bad=[];let msg="";
 splitList($("#tcols").value).forEach(t=>{const l=t.replace(/\s+/g,"").replace(/['’]/g,"′").toUpperCase();
  if(l.length==1&&NM.includes(l))return;
  if(l.length==2&&l[1]=="′"&&NM.includes(l[0])){xon[l]=1;return}
  try{const q=parseExp(t);xterms.push({label:l,f:i=>q.f(vec(i))&1});xon[l]=1}catch(e){bad.push(t);msg=e.message}});
 $("#terr").textContent=bad.length?"عمود غير مفهوم: "+bad.join(" ، ")+" — "+msg:""}
function applyVars(){const L=[...new Set(($("#tvars").value.toUpperCase().match(/[A-Z]/g)||[]))];
 if(L.length<2||L.length>4){$("#terr").textContent="اكتب من 2 إلى 4 متغيرات بحروف مختلفة، مثل A,B,C";return}
 $("#terr").textContent="";NM=L.join("");n=L.length;reset()}
