// Our own hand-built vector (SVG) storybook art — free, instant, offline, no API.
const sky = (id, t, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`;
const bg = (id) => `<rect width="800" height="480" fill="url(#${id})"/>`;

// soft glow made of translucent ellipses (no filter ids -> safe with transitions)
const glow = (x, y, r) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r}" fill="#FFF8D8" opacity="0.18"/><ellipse cx="${x}" cy="${y}" rx="${r * 0.66}" ry="${r * 0.66}" fill="#FFF3B0" opacity="0.22"/>`;
const sun = (x, y, r) => `${glow(x, y, r * 2.2)}${Array.from({ length: 12 }).map((_, k) => { const a = k * 30 * Math.PI / 180; return `<line x1="${x + Math.cos(a) * (r + 6)}" y1="${y + Math.sin(a) * (r + 6)}" x2="${x + Math.cos(a) * (r + 26)}" y2="${y + Math.sin(a) * (r + 26)}" stroke="#FFE08A" stroke-width="4" stroke-linecap="round" opacity=".7"/>`; }).join('')}<circle cx="${x}" cy="${y}" r="${r}" fill="#FFE08A"/><circle cx="${x}" cy="${y}" r="${r * 0.72}" fill="#FFD25A"/>`;

// layered rolling hills with depth
const hills = (c1, c2, c3) => `<ellipse cx="160" cy="450" rx="380" ry="150" fill="${c1}"/><ellipse cx="660" cy="460" rx="400" ry="160" fill="${c2 || c1}"/><ellipse cx="400" cy="500" rx="520" ry="150" fill="${c3 || c2 || c1}"/>`;

const flower = (x, y, c) => `<g transform="translate(${x},${y})">${[0,72,144,216,288].map(a => `<circle cx="${Math.cos(a*Math.PI/180)*6}" cy="${Math.sin(a*Math.PI/180)*6}" r="5" fill="${c}"/>`).join('')}<circle r="4" fill="#FFD25A"/></g>`;
const blade = (x, y, h) => `<path d="M${x} ${y} q6 -${h} 0 -${h + 8}" stroke="#3FA34D" stroke-width="4" fill="none" stroke-linecap="round"/>`;
const grass = () => `<path d="M0 430 Q200 405 400 425 T800 420 V480 H0 Z" fill="#5FBF60"/><path d="M0 450 Q220 432 460 448 T800 444 V480 H0 Z" fill="#4CA94D"/>${[60,140,250,560,640,720].map((x,i)=>blade(x,476,18+i%3*6)).join('')}${flower(110,452,'#F472B6')}${flower(330,462,'#C084FC')}${flower(620,456,'#60A5FA')}${flower(710,466,'#FBBF24')}`;
const butterfly = (x, y, c) => `<g transform="translate(${x},${y})"><ellipse cx="-6" cy="0" rx="6" ry="9" fill="${c}"/><ellipse cx="6" cy="0" rx="6" ry="9" fill="${c}"/><line x1="0" y1="-8" x2="0" y2="8" stroke="#333" stroke-width="2"/></g>`;

const tree = (x, y, s) => `<rect x="${x - 7 * s}" y="${y}" width="${14 * s}" height="${50 * s}" rx="5" fill="#8B5A2B"/><ellipse cx="${x}" cy="${y - 4 * s}" rx="${40 * s}" ry="${36 * s}" fill="#2F8F47"/><circle cx="${x - 26 * s}" cy="${y + 6 * s}" r="${24 * s}" fill="#3FA34D"/><circle cx="${x + 26 * s}" cy="${y + 6 * s}" r="${24 * s}" fill="#4CB963"/><circle cx="${x}" cy="${y - 20 * s}" r="${22 * s}" fill="#56C96E"/>`;
const cloud = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="46" ry="26" fill="#fff"/><ellipse cx="36" cy="6" rx="34" ry="20" fill="#fff"/><ellipse cx="-36" cy="6" rx="34" ry="20" fill="#f1f5ff"/></g>`;
const rain = (n) => `<g stroke="#cfe4f5" stroke-width="3" stroke-linecap="round" opacity=".8">${Array.from({ length: n }).map((_, i) => `<line x1="${40 + i * 48}" y1="110" x2="${30 + i * 48}" y2="180"/>`).join('')}</g>`;
const rainbow = `${[['#FF6B6B',0],['#FFD93D',12],['#6BCB77',24],['#4D96FF',36]].map(([c,o]) => `<path d="M120 250 A300 300 0 0 1 680 250" fill="none" stroke="${c}" stroke-width="11" transform="translate(0,${o})" opacity=".9"/>`).join('')}`;

// characters
const crow = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="44" ry="31" fill="#2b2b2b"/><ellipse cx="0" cy="2" rx="30" ry="20" fill="#3a3a3a"/><circle cx="34" cy="-15" r="21" fill="#2b2b2b"/><polygon points="52,-17 90,-10 52,-3" fill="#F5A623"/><circle cx="41" cy="-19" r="6" fill="#fff"/><circle cx="42" cy="-19" r="3" fill="#000"/><path d="M-26 -10 -74 -30 -32 10Z" fill="#1a1a1a"/><path d="M-30 18 q-8 16 4 18" stroke="#1a1a1a" stroke-width="5" fill="none"/></g>`;
const lion = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="-6" cy="46" rx="62" ry="30" fill="#C97B30"/><rect x="-44" y="60" width="15" height="34" rx="7" fill="#B86A28"/><rect x="2" y="62" width="15" height="34" rx="7" fill="#B86A28"/><rect x="34" y="60" width="15" height="34" rx="7" fill="#A85F22"/><path d="M52 40 q40 -6 30 34" stroke="#B86A28" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="84" cy="78" r="8" fill="#5a3210"/><circle cx="-58" cy="6" r="50" fill="#B5651D"/><circle cx="-58" cy="6" r="38" fill="#E8A45C"/><circle cx="-72" cy="0" r="5" fill="#222"/><circle cx="-44" cy="0" r="5" fill="#222"/><polygon points="-58,10 -66,20 -50,20" fill="#7a4a20"/><path d="M-58 20 q-10 10 -20 6 M-58 20 q10 10 20 6" stroke="#7a4a20" stroke-width="3" fill="none"/></g>`;
const mouse = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="18" fill="#9AA0A6"/><circle cx="20" cy="-7" r="13" fill="#9AA0A6"/><circle cx="13" cy="-17" r="8" fill="#C7B3C7"/><circle cx="27" cy="-17" r="8" fill="#C7B3C7"/><circle cx="26" cy="-8" r="2.6" fill="#000"/><circle cx="32" cy="-4" r="2" fill="#111"/><path d="M-22 4 q-24 8 -28 -6" stroke="#9AA0A6" stroke-width="3" fill="none"/></g>`;
const peacock = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><g>${[-44,-22,0,22,44].map(a => `<g transform="rotate(${a})"><ellipse cx="0" cy="-72" rx="11" ry="36" fill="#1FA2A6"/><circle cx="0" cy="-95" r="10" fill="#2E5BBA"/><circle cx="0" cy="-95" r="5" fill="#F4C20D"/></g>`).join('')}</g><ellipse cx="0" cy="2" rx="22" ry="32" fill="#15396b"/><circle cx="0" cy="-28" r="14" fill="#1f7a8c"/><polygon points="11,-28 26,-25 11,-22" fill="#F4A300"/><line x1="0" y1="-42" x2="0" y2="-52" stroke="#1f7a8c" stroke-width="3"/><circle cx="0" cy="-54" r="4" fill="#1FA2A6"/></g>`;
const pot = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-32 -40 L32 -40 L25 38 Q0 50 -25 38 Z" fill="#C06A22"/><path d="M-32 -40 L32 -40 L28 -10 Q0 -2 -28 -10 Z" fill="#B5651D"/><ellipse cx="0" cy="-40" rx="32" ry="9" fill="#8B4513"/><ellipse cx="0" cy="-40" rx="23" ry="6" fill="#3A7CA5"/></g>`;

const S = (inner) => `<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">${inner}</svg>`;
const scene = (id, t, b, body) => S(sky(id, t, b) + bg(id) + body);

export const STORY_SCENES = [
  [ // The Thirsty Crow
    scene('s1','#FFD27A','#FFEFC2', sun(660,90,46)+hills('#E8C36B','#D9B25A','#CDAA52')+grass()+butterfly(150,150,'#F472B6')+crow(380,250,2.3)),
    scene('s2','#9AD7EE','#DCF3FB', glow(420,120,150)+hills('#7FC65B','#69B84A','#5FAF44')+grass()+pot(430,300,1.6)+crow(250,200,1.7)),
    scene('s3','#9AD7EE','#DCF3FB', hills('#7FC65B','#69B84A','#5FAF44')+grass()+pot(440,300,1.6)+crow(250,195,1.6)+`<circle cx="180" cy="430" r="11" fill="#8a8a8a"/><circle cx="214" cy="442" r="13" fill="#9a9a9a"/><circle cx="150" cy="446" r="9" fill="#7a7a7a"/>`),
    scene('s4','#9AD7EE','#DCF3FB', hills('#7FC65B','#69B84A','#5FAF44')+grass()+pot(420,300,1.7)+crow(300,165,1.5)+`<circle cx="420" cy="298" r="7" fill="#8a8a8a"/><circle cx="408" cy="312" r="7" fill="#9a9a9a"/><circle cx="432" cy="312" r="7" fill="#7a7a7a"/>`),
    scene('s5','#FFD27A','#FFEFC2', sun(140,90,46)+hills('#E8C36B','#D9B25A','#CDAA52')+grass()+pot(420,300,1.7)+`<ellipse cx="420" cy="262" rx="21" ry="6" fill="#3A7CA5"/>`+crow(420,232,1.6)+butterfly(640,150,'#FBBF24'))
  ],
  [ // The Lion and the Mouse
    scene('m1','#BDE7C9','#EAF9EF', glow(400,120,150)+hills('#6FB94E','#5BA641','#52983A')+tree(110,250,1.4)+tree(700,260,1.2)+grass()+lion(400,250,2.4)),
    scene('m2','#BDE7C9','#EAF9EF', hills('#6FB94E','#5BA641','#52983A')+tree(120,255,1.2)+grass()+lion(430,250,2.4)+mouse(285,300,1.6)),
    scene('m3','#BDE7C9','#EAF9EF', hills('#6FB94E','#5BA641','#52983A')+tree(700,255,1.2)+grass()+lion(400,250,2.3)+mouse(475,315,1.5)+butterfly(200,140,'#C084FC')),
    scene('m4','#CFE6D6','#EEF8F1', hills('#6FB94E','#5BA641','#52983A')+tree(140,255,1.1)+grass()+`<path d="M315 195 H525 V345 H315 Z" fill="none" stroke="#7a5230" stroke-width="8"/><path d="M315 235 H525 M315 285 H525 M365 195 V345 M415 195 V345 M475 195 V345" stroke="#7a5230" stroke-width="5"/>`+lion(420,285,1.9)),
    scene('m5','#FFE6A6','#FFF6DD', sun(135,90,44)+hills('#6FB94E','#5BA641','#52983A')+grass()+lion(375,265,2.0)+mouse(525,300,1.7)+butterfly(640,150,'#F472B6'))
  ],
  [ // The Peacock and the Rain
    scene('q1','#FFD27A','#FFEFC2', sun(650,95,46)+hills('#E8C36B','#D9B25A','#CDAA52')+grass()+peacock(400,330,1.6)+butterfly(180,150,'#4D96FF')),
    scene('q2','#A8BECF','#DCE8F0', cloud(210,90,1.2)+cloud(570,72,1.0)+hills('#7FB36A','#6AA055','#5F994E')+grass()+peacock(400,330,1.6)),
    scene('q3','#7E97AC','#B4C8D8', cloud(220,80,1.3)+cloud(580,62,1.1)+rain(14)+hills('#5F994E','#4f8042','#477339')+grass()+peacock(400,330,1.6)),
    scene('q4','#8AA1B6','#C0D2E0', cloud(200,72,1.2)+rain(16)+hills('#5F994E','#4f8042','#477339')+grass()+peacock(400,320,1.9)),
    scene('q5','#9AD7EE','#E4F6FF', rainbow+glow(400,120,160)+hills('#6FB94E','#5BA641','#52983A')+grass()+peacock(400,330,1.8)+butterfly(150,160,'#FBBF24')+butterfly(660,150,'#F472B6'))
  ]
];
