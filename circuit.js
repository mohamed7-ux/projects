// رسم الدائرة المنطقية بالبوابات (SVG)
function gate(type,x,y,h,c){const m=y+h/2;
 return type=="and"?[`<path class="g" style="stroke:${c}" d="M${x} ${y}H${x+22}A22 ${h/2} 0 0 1 ${x+22} ${y+h}H${x}Z"/>`,44]
 :[`<path class="g" style="stroke:${c}" d="M${x} ${y}Q${x+14} ${m} ${x} ${y+h}Q${x+36} ${y+h} ${x+50} ${m}Q${x+36} ${y} ${x} ${y}Z"/>`,50]}
function circuit(){
 const P=56,bx=i=>40+i*P,bc=i=>bx(i)+36,pu=new Set(),nu=new Set();
 groups.forEach(g=>g.L.forEach(l=>(l.c?nu:pu).add(l.i)));
 const tt=mode=="sop"?"and":"or",ft=mode=="sop"?"or":"and",gx=40+n*P+20;
 let cur=70,body="",outs=[],gw=50;
 groups.forEach((g,t)=>{const c=COL[t%8],m=g.L.length;
  if(m==1){const y=cur+13,x=g.L[0].c?bc(g.L[0].i):bx(g.L[0].i);body+=`<circle cx="${x}" cy="${y}" r="3.5" fill="${c}"/>`;outs.push([x,y,c]);cur+=40;return}
  const h=Math.max(44,18*m+8),y0=cur,[sh,w]=gate(tt,gx,y0,h,c);gw=Math.max(gw,w);
  g.L.forEach((l,j)=>{const y=y0+h/(m+1)*(j+1),x=l.c?bc(l.i):bx(l.i);body+=`<path class="w" style="stroke:${c}" d="M${x} ${y}H${gx}"/><circle cx="${x}" cy="${y}" r="3.5" fill="${c}"/>`});
  body+=sh+`<text x="${gx+w/2}" y="${y0-5}" font-size="11" text-anchor="middle" style="fill:${c}">${g.t}</text>`;outs.push([gx+w,y0+h/2,c]);cur+=h+24});
 const xm=t=>gx+gw+16+t*8,yt=70,yb=cur-24,top=outs.length;let fx=gx+gw+30+top*8,W,tail="";
 if(top==1){const [ox,oy,c]=outs[0];fx=gx+gw+30;tail=`<path class="w" style="stroke:${c}" d="M${ox} ${oy}H${fx+40}"/><text x="${fx+50}" y="${oy+5}" font-size="16" font-weight="700">F</text>`;W=fx+80}
 else{const fh=Math.max(44,18*top+8),fy=(yt+yb)/2-fh/2+10,[sh,w]=gate(ft,fx,fy,fh,"var(--tx)");
  outs.forEach(([ox,oy,c],t)=>{const iy=fy+fh/(top+1)*(t+1);tail+=`<path class="w" style="stroke:${c}" d="M${ox} ${oy}H${xm(t)}V${iy}H${fx}"/>`});
  tail+=sh+`<path class="w" d="M${fx+w} ${fy+fh/2}h40"/><text x="${fx+w+50}" y="${fy+fh/2+5}" font-size="16" font-weight="700">F</text>`;W=fx+w+80}
 const H=Math.max(cur+6,120),bot=H-14;let top_="";
 for(let i=0;i<n;i++){const u=pu.has(i),v=nu.has(i);if(!u&&!v)continue;
  top_+=`<text x="${bx(i)}" y="14" text-anchor="middle" font-size="15" font-weight="700">${NM[i]}</text><path class="w" d="M${bx(i)} 20V${u?bot:40}"/>`;
  if(v)top_+=`<path class="w" d="M${bx(i)} 40H${bx(i)+6}"/><path class="w" style="fill:var(--card)" d="M${bx(i)+6} 32V48L${bx(i)+22} 40Z"/><circle cx="${bx(i)+25}" cy="40" r="3" class="w" style="fill:var(--card)"/><path class="w" d="M${bx(i)+28} 40H${bc(i)}V${bot}"/><text x="${bc(i)}" y="30" text-anchor="middle" font-size="12" style="fill:var(--mut)">${NM[i]}′</text>`}
 return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W*1.4}px;min-width:${Math.min(W,420)}px">${top_}${body}${tail}</svg>`}
