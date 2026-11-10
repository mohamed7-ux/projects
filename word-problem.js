// المسائل الكلامية (صورة أو نص) عبر قدرة sample في claude.ai
let wimg=null;
const WP=`You are a digital logic assistant. The input is a word problem (Arabic or English), possibly in an attached image, that describes a digital logic situation. Identify at most 4 binary input variables, name them A, B, C, D in order, and write the output function F as a Boolean expression. Use only: letters A-D, ' for complement, + for OR, * for AND, parentheses, ^ for XOR. If the problem gives a truth table or minterms or maxterms, write the equivalent sum of products. Reply with JSON only: {"variables":{"A":"short meaning in Arabic"},"expression":"...","explanation":"short Arabic explanation of how you derived it"}. If it cannot be expressed with at most 4 variables or is not a logic problem, reply {"error":"short Arabic reason"}.`;
async function shrink(f){const bm=await createImageBitmap(f),k=Math.min(1,1600/Math.max(bm.width,bm.height)),c=document.createElement("canvas");c.width=Math.round(bm.width*k);c.height=Math.round(bm.height*k);c.getContext("2d").drawImage(bm,0,0,c.width,c.height);return new Promise(r=>c.toBlob(r,"image/jpeg",.88))}
async function solveWord(){const err=$("#werr"),out=$("#wout"),btn=$("#wgo");err.textContent="";out.innerHTML="";
 const txt=$("#wtxt").value.trim();if(!wimg&&!txt){err.textContent="ارفع صورة أو اكتب المسألة الأول";return}
 let sample=null;try{sample=await claude.use("sample")}catch(e){}
 if(!sample){err.textContent="الميزة دي بتشتغل بس لما تفتح الصفحة من claude.ai";return}
 btn.disabled=true;btn.textContent="جاري التحليل…";
 try{const o={modelTier:"default",cache:false};
  if(wimg){const l=await sample.limits();if(!l.images)throw{code:"images_unavailable"};o.images=[wimg]}
  const r=await sample.json(WP+(txt?"\n\nProblem text:\n"+txt:""),o);
  if(r.error){err.textContent=r.error;return}
  const vs=Object.entries(r.variables||{}).map(([k,v])=>`<code>${esc(k)}</code> = ${esc(v)}`).join(" ، ");
  out.innerHTML=`<div class="wbox"><b>المتغيرات:</b> ${vs}<br><b>الدالة:</b> <code>F = ${esc(r.expression)}</code><br>${esc(r.explanation||"")}</div>`;
  solveExpr(null,r.expression,"w")}
 catch(e){err.textContent=({not_granted:"لازم توافق على استخدام Claude عشان تتحلل المسألة",rate_limited:"طلبات كتير، استنى شوية وجرّب",images_unavailable:"رفع الصور مش متاح هنا، اكتب المسألة نص"})[e.code]||"حصلت مشكلة في التحليل، جرّب تاني"}
 finally{btn.disabled=false;btn.textContent="حلّل المسألة"}}
$("#wgo").onclick=solveWord;
$("#wclr").onclick=()=>{wimg=null;$("#wtxt").value="";$("#wout").innerHTML="";$("#werr").textContent="";$("#wprev").innerHTML="<b>اضغط لرفع صورة المسألة</b><small>أو اكتب المسألة في الخانة اللي تحت</small>"};
$("#wfile").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;try{wimg=await shrink(f);$("#wprev").innerHTML="";const im=new Image();im.src=URL.createObjectURL(wimg);$("#wprev").appendChild(im)}catch(x){$("#werr").textContent="مقدرتش أقرا الصورة، جرّب صورة تانية"}});
