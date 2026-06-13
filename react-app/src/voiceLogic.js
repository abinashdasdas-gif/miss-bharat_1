// Pure helpers for the voice games (ported from the HTML version).

export function generateQuestion(questions, type) {
  const list = (questions && questions[type]) || ['Say something!'];
  return list[Math.floor(Math.random() * list.length)];
}

const NUM_WORDS = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function numberWord(n) {
  n = Math.round(n);
  if (n < 0 || n > 99) return String(n);
  if (n < 20) return NUM_WORDS[n];
  const t = Math.floor(n / 10), o = n % 10;
  return o ? TENS[t] + ' ' + NUM_WORDS[o] : TENS[t];
}
function numberAnswers(n) { return [String(Math.round(n)), numberWord(n)]; }

// Returns array of acceptable answers, or null = open-ended (accept anything)
export function deriveExpected(q) {
  const quoted = q.match(/"([^"]+)"/);
  if (/^(Say|Read|Spell):/i.test(q) && quoted) return [quoted[1].toLowerCase()];
  let m = q.match(/Say a (\w+) color/i); if (m) return [m[1].toLowerCase()];
  m = q.match(/Name a (\w+)/i); if (m) return [m[1].toLowerCase()];
  m = q.match(/(\d+)\s*([+\-×x*÷/])\s*(\d+)/);
  if (m) { const a = +m[1], b = +m[3], op = m[2]; let r;
    if (op === '+') r = a + b; else if (op === '-') r = a - b; else if (/[×x*]/.test(op)) r = a * b; else r = a / b;
    return numberAnswers(r); }
  m = q.match(/(\d*)\s*x\s*([+\-]\s*\d+)?\s*=\s*(\d+)/i);
  if (m) { const coef = m[1] ? +m[1] : 1, add = m[2] ? +m[2].replace(/\s/g, '') : 0, rhs = +m[3], x = (rhs - add) / coef;
    if (Number.isFinite(x)) return numberAnswers(x); }
  return null;
}

function lev(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    dp[i][j] = Math.min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
  return dp[a.length][b.length];
}

export function matchesExpected(alts, expected) {
  if (!expected) return true;
  const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  for (const alt of alts) {
    const full = norm(alt), words = full.split(/\s+/);
    for (const exp of expected) {
      const e = norm(exp); if (!e) continue;
      if (full.includes(e)) return true;
      for (const w of words) { if (w === e) return true; const tol = e.length <= 4 ? 1 : 2; if (lev(w, e) <= tol) return true; }
    }
  }
  return false;
}
