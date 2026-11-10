// إعادة الضبط ومزامنة حقل الأرقام مع الخريطة
function reset(){cells=Array(1<<n).fill(mode=="sop"?0:1);clearRes();sync();render()}
function clearRes(){groups=[];xterms=[];if(tab=="t")applyCols();$("#out").hidden=true}
function parse(s){return s.split(/[,\s]+/).filter(x=>x!=="").map(Number).filter(x=>Number.isInteger(x)&&x>=0&&x<(1<<n))}
function fromInputs(){const t=new Set(parse($("#tin").value)),tv=mode=="sop"?1:0;
 cells=cells.map((_,i)=>t.has(i)?tv:1-tv);clearRes();render()}
function sync(){const tv=mode=="sop"?1:0;
 $("#tin").value=cells.map((v,i)=>v===tv?i:"").filter(x=>x!=="").join(",");
 $("#tl").textContent=mode=="sop"?"Minterms":"Maxterms"}
function syncSegs(){document.querySelectorAll(".nSeg button").forEach(b=>b.classList.toggle("on",+b.dataset.n==n));document.querySelectorAll("#mSeg button,.rSeg button").forEach(b=>b.classList.toggle("on",b.dataset.m==mode))}
