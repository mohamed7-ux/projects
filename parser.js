// محلل المعادلات البولينية: A' و + و * و ^ والأقواس
function parseExp(src){let s=src.replace(/\s+/g,"").replace(/[′’]/g,"'").replace(/[·∙×∧]/g,"*").replace(/∨/g,"+").replace(/⊕/g,"^").replace(/¬/g,"!");
 if(s.includes("="))s=s.split("=").pop();
 let p=0,mx=-1;const pk=()=>s[p];
 const E=()=>{let l=X();while(pk()=="+"||pk()=="|"){p++;const r=X(),a=l;l=v=>a(v)|r(v)}return l},
 X=()=>{let l=A();while(pk()=="^"){p++;const r=A(),a=l;l=v=>a(v)^r(v)}return l},
 A=()=>{let l=U();for(;;){const c=pk();if(c=="*"||c=="&")p++;else if(!c||!/[A-Za-z01(!~]/.test(c))break;const r=U(),a=l;l=v=>a(v)&r(v)}return l},
 U=()=>{const c=pk();if(c=="!"||c=="~"){p++;const f=U();return v=>f(v)^1}let f=P();while(pk()=="'"){p++;const g=f;f=v=>g(v)^1}return f},
 P=()=>{const c=pk();if(c=="("){p++;const f=E();if(pk()!=")")throw new Error("قوس ناقص");p++;return f}
  if(c=="0"||c=="1"){p++;return()=>+c}
  if(c&&/[A-Za-z]/.test(c)){p++;const L=c.toUpperCase(),i=NM.indexOf(L);if(i<0)throw new Error("المتغير "+L+" مش ضمن المتغيرات ("+NM.split("").join(", ")+")");mx=Math.max(mx,i);return v=>v[i]}
  throw new Error("تعبير غير مفهوم عند: "+(c||"نهاية المعادلة"))};
 const f=E();if(p<s.length)throw new Error("رمز غير متوقع: "+s[p]);return{f,mx}}
