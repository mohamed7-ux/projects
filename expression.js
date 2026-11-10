// التبويبات وحل المعادلة المكتوبة
function syncTabs(){document.querySelectorAll("[data-p]").forEach(x=>x.hidden=x.dataset.p!=tab);
 document.querySelectorAll("[data-show]").forEach(x=>x.hidden=!x.dataset.show.split(",").includes(tab));
 [...$("#tabs").children].forEach(x=>x.classList.toggle("on",x.dataset.tab==tab));syncSegs()}
function solveExpr(ev,s0,t0){NM="ABCD";const err=$(t0=="w"?"#werr":"#eerr");err.textContent="";const s=s0||$("#ein").value.trim();
 if(!s){err.textContent="اكتب المعادلة الأول";return}
 let r;try{r=parseExp(s)}catch(x){err.textContent=x.message;return}
 n=Math.max(2,r.mx+1);
 cells=[];for(let i=0;i<(1<<n);i++){const v=[0,1,2,3].map(j=>j<n?(i>>(n-1-j))&1:0);cells.push(r.f(v)&1)}
 tab=t0||"e";syncTabs();clearRes();sync();setX(s);render();solve()}
