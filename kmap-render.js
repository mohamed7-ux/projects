// رسم خريطة كارنو والحلقات الملونة (SVG)
function segs(set,L){const a=[...new Set(set)];if(a.length==L)return[[0,L-1]];
 const s=a.find(x=>!a.includes((x-1+L)%L)),len=a.length;
 return s+len<=L?[[s,s+len-1]]:[[s,L-1],[0,s+len-L-1]]}
const CS=70,HO=62;
function render(){
 const [rb,cb]=dim(),R=gr(rb),C=gr(cb),W=HO+C.length*CS+8,H=HO+R.length*CS+8;
 let s=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W*1.3}px">`;
 s+=`<line x1="4" y1="4" x2="${HO-2}" y2="${HO-2}" class="w" style="stroke-width:1.2"/>
 <text x="8" y="${HO-8}" font-size="15" font-weight="700">${NM.slice(0,rb)}</text>
 <text x="${HO-8}" y="18" font-size="15" font-weight="700" text-anchor="end">${NM.slice(rb,n)}</text>`;
 C.forEach((c,j)=>s+=`<text x="${HO+j*CS+CS/2-3}" y="${HO-10}" text-anchor="middle" font-size="14" fill="var(--mut)">${bin(c,cb)}</text>`);
 R.forEach((r,j)=>s+=`<text x="${HO-14}" y="${HO+j*CS+CS/2+2}" text-anchor="middle" font-size="14">${bin(r,rb)}</text>`);
 R.forEach((r,ri)=>C.forEach((c,ci)=>{const i=(r<<cb)|c,v=cells[i],x=HO+ci*CS,y=HO+ri*CS;
  s+=`<g class="cell v${v}" data-i="${i}"><rect x="${x}" y="${y}" width="${CS-6}" height="${CS-6}" rx="12"/><text class="mn" x="${x+7}" y="${y+14}">${i}</text><text x="${x+(CS-6)/2}" y="${y+(CS-6)/2+9}" text-anchor="middle" font-size="26" font-weight="700">${v}</text></g>`}));
 groups.forEach((g,k)=>{const rs=[...new Set(g.cells.map(i=>R.indexOf(i>>cb)))],cs=[...new Set(g.cells.map(i=>C.indexOf(i&((1<<cb)-1))))],o=2+(k%4)*3;
  segs(rs,R.length).forEach(([r0,r1])=>segs(cs,C.length).forEach(([c0,c1])=>{
   s+=`<rect x="${HO+c0*CS+o}" y="${HO+r0*CS+o}" width="${(c1-c0+1)*CS-6-2*o}" height="${(r1-r0+1)*CS-6-2*o}" rx="16" fill="${COL[k%8]}" fill-opacity=".13" stroke="${COL[k%8]}" stroke-width="3.5" pointer-events="none"/>`}))});
 const svg=s+"</svg>";$("#map").innerHTML=svg;$("#map2").innerHTML=svg;ttable()}
