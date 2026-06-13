// Hand-built vector (SVG) storybook scenes — free, instant, offline, never break.
const sky = (id, t, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`;
const bg = (id) => `<rect width="800" height="480" fill="url(#${id})"/>`;
const sun = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#FFE08A"/><circle cx="${x}" cy="${y}" r="${r * 0.7}" fill="#FFD25A"/>`;
const hills = (c1, c2) => `<ellipse cx="200" cy="430" rx="320" ry="120" fill="${c1}"/><ellipse cx="620" cy="440" rx="340" ry="130" fill="${c2}"/>`;
const tree = (x, y, s) => `<rect x="${x - 6 * s}" y="${y}" width="${12 * s}" height="${40 * s}" rx="4" fill="#8B5A2B"/><circle cx="${x}" cy="${y}" r="${30 * s}" fill="#3FA34D"/><circle cx="${x - 22 * s}" cy="${y + 8 * s}" r="${22 * s}" fill="#4CB963"/><circle cx="${x + 22 * s}" cy="${y + 8 * s}" r="${22 * s}" fill="#4CB963"/>`;
const crow = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="42" ry="30" fill="#222"/><circle cx="34" cy="-14" r="20" fill="#222"/><polygon points="50,-16 86,-10 50,-4" fill="#F5A623"/><circle cx="40" cy="-18" r="4" fill="#fff"/><circle cx="41" cy="-18" r="2" fill="#000"/><polygon points="-30,-8 -70,-26 -34,8" fill="#111"/></g>`;
const lion = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><circle cx="0" cy="0" r="48" fill="#C97B30"/><circle cx="0" cy="0" r="34" fill="#E8A45C"/><circle cx="-14" cy="-6" r="5" fill="#222"/><circle cx="14" cy="-6" r="5" fill="#222"/><polygon points="0,4 -8,14 8,14" fill="#5a3210"/><path d="M0 14 Q-12 26 -24 20 M0 14 Q12 26 24 20" stroke="#5a3210" stroke-width="3" fill="none"/></g>`;
const mouse = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="18" fill="#9AA0A6"/><circle cx="20" cy="-6" r="13" fill="#9AA0A6"/><circle cx="14" cy="-16" r="8" fill="#C7B3C7"/><circle cx="26" cy="-16" r="8" fill="#C7B3C7"/><circle cx="26" cy="-7" r="2.5" fill="#000"/><path d="M-22 4 q-22 6 -28 -6" stroke="#9AA0A6" stroke-width="3" fill="none"/></g>`;
const peacock = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><g>${[-40,-20,0,20,40].map(a => `<g transform="rotate(${a})"><ellipse cx="0" cy="-70" rx="10" ry="34" fill="#1FA2A6"/><circle cx="0" cy="-92" r="9" fill="#2E5BBA"/><circle cx="0" cy="-92" r="4" fill="#F4C20D"/></g>`).join('')}</g><ellipse cx="0" cy="0" rx="20" ry="30" fill="#15396b"/><circle cx="0" cy="-26" r="13" fill="#1f7a8c"/><polygon points="10,-26 24,-23 10,-20" fill="#F4A300"/></g>`;
const pot = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30 -40 L30 -40 L24 36 Q0 48 -24 36 Z" fill="#B5651D"/><ellipse cx="0" cy="-40" rx="30" ry="9" fill="#8B4513"/><ellipse cx="0" cy="-40" rx="22" ry="6" fill="#3A7CA5"/></g>`;
const cloud = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="46" ry="26" fill="#fff"/><ellipse cx="36" cy="6" rx="34" ry="20" fill="#fff"/><ellipse cx="-36" cy="6" rx="34" ry="20" fill="#f1f5ff"/></g>`;
const rain = (n) => `<g stroke="#cfe4f5" stroke-width="3">${Array.from({ length: n }).map((_, i) => `<line x1="${40 + i * 48}" y1="110" x2="${30 + i * 48}" y2="190"/>`).join('')}</g>`;
const pebbles = `<circle cx="180" cy="380" r="10" fill="#777"/><circle cx="210" cy="395" r="12" fill="#888"/><circle cx="150" cy="398" r="9" fill="#666"/>`;
const rainbow = `<path d="M120 240 A280 280 0 0 1 680 240" fill="none" stroke="#FF6B6B" stroke-width="10"/><path d="M120 240 A280 280 0 0 1 680 240" fill="none" stroke="#FFD93D" stroke-width="10" transform="translate(0,14)"/><path d="M120 240 A280 280 0 0 1 680 240" fill="none" stroke="#6BCB77" stroke-width="10" transform="translate(0,28)"/><path d="M120 240 A280 280 0 0 1 680 240" fill="none" stroke="#4D96FF" stroke-width="10" transform="translate(0,42)"/>`;

const S = (inner) => `<svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">${inner}</svg>`;

// page scenes aligned to STORIES order in data.js
export const STORY_SCENES = [
  [ // The Thirsty Crow
    S(sky('s1','#FDB813','#FFE3A3')+bg('s1')+sun(680,80,52)+hills('#E8C36B','#D9B25A')+crow(380,250,2.4)),
    S(sky('s2','#86C5DA','#CFEFF7')+bg('s2')+hills('#9BD770','#7FC65B')+pot(420,300,1.6)+crow(250,210,1.8)),
    S(sky('s3','#86C5DA','#CFEFF7')+bg('s3')+hills('#9BD770','#7FC65B')+pot(430,300,1.6)+crow(250,200,1.7)+pebbles),
    S(sky('s4','#86C5DA','#CFEFF7')+bg('s4')+hills('#9BD770','#7FC65B')+pot(420,300,1.7)+crow(300,170,1.6)+`<circle cx="420" cy="300" r="7" fill="#777"/><circle cx="408" cy="312" r="7" fill="#888"/>`),
    S(sky('s5','#FDB813','#FFE3A3')+bg('s5')+sun(120,80,50)+hills('#E8C36B','#D9B25A')+pot(420,300,1.7)+`<ellipse cx="420" cy="262" rx="20" ry="6" fill="#3A7CA5"/>`+crow(420,235,1.7))
  ],
  [ // The Lion and the Mouse
    S(sky('m1','#A8D8B9','#E6FFF0')+bg('m1')+hills('#8FD46A','#6FB94E')+tree(120,280,1.3)+lion(420,260,2.6)),
    S(sky('m2','#A8D8B9','#E6FFF0')+bg('m2')+hills('#8FD46A','#6FB94E')+lion(420,260,2.6)+mouse(300,300,1.6)),
    S(sky('m3','#A8D8B9','#E6FFF0')+bg('m3')+hills('#8FD46A','#6FB94E')+lion(400,250,2.4)+mouse(470,320,1.5)),
    S(sky('m4','#B7D7C0','#EAF7EE')+bg('m4')+hills('#8FD46A','#6FB94E')+tree(150,280,1.2)+`<path d="M320 200 L520 200 L520 340 L320 340 Z" fill="none" stroke="#7a5230" stroke-width="8"/><path d="M320 230 L520 230 M320 270 L520 270 M320 310 L520 310 M360 200 L360 340 M420 200 L420 340 M480 200 L480 340" stroke="#7a5230" stroke-width="6"/>`+lion(420,290,2.0)),
    S(sky('m5','#FFE3A3','#FFF6DD')+bg('m5')+sun(120,80,46)+hills('#8FD46A','#6FB94E')+lion(380,270,2.1)+mouse(520,300,1.7))
  ],
  [ // The Peacock and the Rain
    S(sky('q1','#FDB813','#FFE3A3')+bg('q1')+sun(660,90,50)+hills('#E8C36B','#D9B25A')+peacock(400,330,1.6)),
    S(sky('q2','#9DB7C9','#D7E6F0')+bg('q2')+cloud(200,90,1.2)+cloud(560,70,1.0)+hills('#7FB36A','#5F994E')+peacock(400,330,1.6)),
    S(sky('q3','#6E89A0','#A9C2D6')+bg('q3')+cloud(220,80,1.3)+cloud(580,60,1.1)+rain(14)+hills('#5F994E','#4f8042')+peacock(400,330,1.6)),
    S(sky('q4','#7B95AC','#B4CADD')+bg('q4')+rain(16)+hills('#5F994E','#4f8042')+peacock(400,320,1.9)),
    S(sky('q5','#88C4E8','#DFF3FF')+bg('q5')+rainbow+hills('#8FD46A','#6FB94E')+peacock(400,330,1.8))
  ]
];
