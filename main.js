// ربط الأحداث وبدء التشغيل
document.addEventListener("click",e=>{
 const xb=e.target.closest(".xchip");if(xb){const k=decodeURIComponent(xb.dataset.k);xon[k]=xon[k]?0:1;render();return}
 const ex=e.target.closest(".ex");if(ex){$("#ein").value=ex.textContent;solveExpr();return}
 const tb=e.target.closest("#tabs button");
 if(tb){tab=tb.dataset.tab;mode="sop";xon={};NM="ABCD";$("#werr").textContent="";$("#eerr").textContent="";$("#wout").innerHTML="";if(tab=="t")applyVars();else reset();syncTabs();return}
 const tv=e.target.closest(".tv");if(tv){$("#tvars").value=tv.textContent;applyVars();return}
 const tc=e.target.closest("[data-ti]");
 if(tc){const i=+tc.dataset.ti;cells[i]=1-cells[i];clearRes();sync();render();return}
 const c=e.target.closest("#map .cell");
 if(c){const i=+c.dataset.i;cells[i]=1-cells[i];clearRes();sync();render();return}
 const b=e.target.closest(".nSeg button");if(b){n=+b.dataset.n;reset();syncSegs();return}
 const m=e.target.closest("#mSeg button");if(m){mode=m.dataset.m;reset();syncSegs();return}
 const r=e.target.closest(".rSeg button");if(r){mode=r.dataset.m;syncSegs();solve(true)}});
$("#tin").addEventListener("input",fromInputs);$("#tvars").addEventListener("input",applyVars);$("#tcols").addEventListener("input",()=>{applyCols();render()});
document.querySelectorAll(".solve").forEach(b=>b.onclick=solve);document.querySelectorAll(".reset").forEach(b=>b.onclick=reset);
$("#esolve").onclick=solveExpr;$("#ein").addEventListener("keydown",e=>{if(e.key=="Enter")solveExpr()});
reset();syncTabs();
