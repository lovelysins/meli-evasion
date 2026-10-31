// Génère index.html (composition HyperFrames 1080x1920) depuis la config ci-dessous.
// Modifier CONFIG puis lancer :  node build.mjs && npm run check
import { writeFileSync } from "node:fs";

// ─────────────────────────── CONFIG ───────────────────────────
// ⚠ HYPOTHÈSE À CONFIRMER : le numéro des fichiers suit l'ordre de tournage,
// un look = (face puis dos). Corrigez les noms ci-dessous si ce n'est pas le cas.
// "in" = seconde de la rush où commence le plan (à ajuster en regardant les clips).
const LOOKS = [
  {
    n: 1,
    tag: "1 · NOIR BRILLANT",
    mood: "La verticale",
    piece: "Top dentelle · Jupe Inspiration Divine",
    brand: "Scandale",
    face: { file: "assets/IMG_1292.MOV", in: 1.0 },
    dos: { file: "assets/IMG_1293.MOV", in: 1.0 },
  },
  {
    n: 2,
    tag: "2 · NOIR BAROQUE",
    mood: "La provoc",
    piece: "Robe Liaison Fatale",
    brand: "Scandale",
    face: { file: "assets/IMG_1294.MOV", in: 1.0 },
    dos: { file: "assets/IMG_1295.MOV", in: 1.0 },
  },
  {
    n: 3,
    tag: "3 · NOIR MÉTALLIQUE",
    mood: "L'éclat",
    piece: "Robe effet métal · Épaulettes perles de rocaille",
    brand: "Mondin",
    face: { file: "assets/IMG_1296.MOV", in: 1.0 },
    dos: { file: "assets/IMG_1297.MOV", in: 1.0 },
  },
];

const HOOK = { line1: "LE NOIR NE VA PAS", line2: "À TOUT LE MONDE" };
const TEASER = "BRILLANT OU MAT ?";
const OUTRO = { l1: "TU ES LA STAR", l2: "DE TA SOIRÉE", cta: "Dis-moi : 1, 2 ou 3 ?", sub: "Notre œil de styliste lingerie" };
// ──────────────────────────────────────────────────────────────

const HOOK_D = 3, TEASER_D = 3, LOOK_D = 7, HALF = LOOK_D / 2, OUTRO_D = 4;
const TOTAL = HOOK_D + TEASER_D + LOOK_D * 3 + OUTRO_D; // 31 s
const T_LOOKS = HOOK_D + TEASER_D; // 6
const T_OUTRO = T_LOOKS + LOOK_D * 3; // 27

let html = "";
let js = "";
let z = 1;
const vid = (id, src, start, dur, mediaStart, extra = "") =>
  `<video id="${id}" class="clip vid" src="${src}" data-start="${start}" data-duration="${dur}" data-media-start="${mediaStart}" data-track-index="${z++}" muted playsinline style="z-index:${z}"${extra}></video>\n`;

// Hook : plan du look 3 (face) derrière le texte
html += vid("v-hook", LOOKS[2].face.file, 0, HOOK_D, LOOKS[2].face.in + 2);
html += `<div id="hook-shade" class="clip shade" data-start="0" data-duration="${HOOK_D}" data-track-index="${z++}" style="z-index:${z + 5}"></div>\n`;
html += `<div id="hook" class="clip center" data-start="0" data-duration="${HOOK_D}" data-track-index="${z++}" style="z-index:${z + 10}"><div class="hook-l">${HOOK.line1}</div><div class="hook-l gold">${HOOK.line2}</div></div>\n`;
js += `tl.from("#hook .hook-l", { y: 40, opacity: 0, duration: 0.5, stagger: 0.25, ease: "power3.out" }, 0.15);\n`;

// Teaser : 3 flashs de 1 s + question
LOOKS.forEach((L, i) => {
  const s = HOOK_D + i;
  html += vid(`v-teaser-${i}`, L.face.file, s, 1, L.face.in + 1.5);
});
html += `<div id="teaser-shade" class="clip shade" data-start="${HOOK_D}" data-duration="${TEASER_D}" data-track-index="${z++}" style="z-index:${z + 5}"></div>\n`;
html += `<div id="teaser" class="clip center" data-start="${HOOK_D}" data-duration="${TEASER_D}" data-track-index="${z++}" style="z-index:${z + 10}"><div class="teaser-t">${TEASER}</div></div>\n`;
js += `tl.from("#teaser .teaser-t", { scale: 0.85, opacity: 0, duration: 0.45, ease: "back.out(1.6)" }, ${HOOK_D + 0.1});\n`;

// Looks : face puis dos
LOOKS.forEach((L, i) => {
  const s = T_LOOKS + i * LOOK_D;
  html += vid(`v-l${L.n}-face`, L.face.file, s, HALF, L.face.in);
  html += vid(`v-l${L.n}-dos`, L.dos.file, s + HALF, HALF, L.dos.in);
  html += `<div id="grad-l${L.n}" class="clip grad" data-start="${s}" data-duration="${LOOK_D}" data-track-index="${z++}" style="z-index:${z + 5}"></div>\n`;
  html += `<div id="flash-l${L.n}" class="clip flash" data-start="${s}" data-duration="0.35" data-track-index="${z++}" style="z-index:${z + 30}"></div>\n`;
  html += `<div id="vline-l${L.n}" class="clip vline" data-start="${s}" data-duration="${LOOK_D}" data-track-index="${z++}" style="z-index:${z + 10}"></div>\n`;
  html += `<div id="badge-face-l${L.n}" class="clip badge" data-start="${s}" data-duration="${HALF}" data-track-index="${z++}" style="z-index:${z + 10}">FACE</div>\n`;
  html += `<div id="badge-dos-l${L.n}" class="clip badge" data-start="${s + HALF}" data-duration="${HALF}" data-track-index="${z++}" style="z-index:${z + 10}">DOS</div>\n`;
  html += `<div id="lab-l${L.n}" class="clip label" data-start="${s}" data-duration="${LOOK_D}" data-track-index="${z++}" style="z-index:${z + 10}">
    <div class="lab-tag">${L.tag}</div><div class="lab-mood">${L.mood}</div>
    <div class="lab-piece">${L.piece}</div><div class="lab-brand">${L.brand}</div></div>\n`;
  js += `tl.fromTo("#flash-l${L.n}", { opacity: 0.9 }, { opacity: 0, duration: 0.3, ease: "power2.out" }, ${s});\n`;
  js += `tl.from("#vline-l${L.n}", { scaleY: 0, transformOrigin: "top", duration: 0.9, ease: "power3.out" }, ${s + 0.1});\n`;
  js += `tl.from("#lab-l${L.n} > div", { y: 30, opacity: 0, duration: 0.45, stagger: 0.12, ease: "power3.out" }, ${s + 0.2});\n`;
  js += `tl.fromTo("#v-l${L.n}-face", { scale: 1.0 }, { scale: 1.06, duration: ${HALF}, ease: "none" }, ${s});\n`;
  js += `tl.fromTo("#v-l${L.n}-dos", { scale: 1.0 }, { scale: 1.06, duration: ${HALF}, ease: "none" }, ${s + HALF});\n`;
});

// Outro : fond noir, texte doré, CTA
html += `<div id="outro" class="clip center outro" data-start="${T_OUTRO}" data-duration="${OUTRO_D}" data-track-index="${z++}" style="z-index:${z + 40}">
  <div class="out-l">${OUTRO.l1}</div><div class="out-l gold">${OUTRO.l2}</div>
  <div class="out-rule"></div><div class="out-sub">${OUTRO.sub}</div><div class="out-cta">${OUTRO.cta}</div></div>\n`;
js += `tl.from("#outro .out-l", { y: 40, opacity: 0, duration: 0.5, stagger: 0.2, ease: "power3.out" }, ${T_OUTRO + 0.1});\n`;
js += `tl.from("#outro .out-rule", { scaleX: 0, duration: 0.6, ease: "power3.out" }, ${T_OUTRO + 0.7});\n`;
js += `tl.from("#outro .out-sub, #outro .out-cta", { opacity: 0, y: 20, duration: 0.5, stagger: 0.2 }, ${T_OUTRO + 0.9});\n`;

const css = `
:root { --ground:#000; --ink:#fff; --gold:#d4af37; --serif: Georgia, "Times New Roman", serif; --sans: "Helvetica Neue", Arial, sans-serif; }
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:1080px; height:1920px; overflow:hidden; background:var(--ground); }
#root { position:relative; width:1080px; height:1920px; overflow:hidden; background:var(--ground); font-family:var(--sans); color:var(--ink); }
.vid { position:absolute; inset:0; width:1080px; height:1920px; object-fit:cover; }
.shade { position:absolute; inset:0; background:rgba(0,0,0,.55); }
.grad { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.35) 28%, rgba(0,0,0,0) 48%); }
.flash { position:absolute; inset:0; background:#fff; }
.center { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 80px; }
.hook-l { font-family:var(--serif); font-weight:700; font-size:84px; line-height:1.12; letter-spacing:.02em; white-space:nowrap; }
.gold { color:var(--gold); }
.teaser-t { font-family:var(--serif); font-weight:700; font-size:112px; letter-spacing:.04em; color:var(--gold); }
.vline { position:absolute; left:64px; top:300px; width:4px; height:900px; background:linear-gradient(to bottom, var(--gold), rgba(212,175,55,0)); }
.badge { background:rgba(0,0,0,.6); position:absolute; top:230px; right:64px; font-size:34px; letter-spacing:.3em; padding:10px 22px; border:2px solid var(--gold); color:var(--gold); }
.label { text-shadow:0 2px 14px rgba(0,0,0,.85); position:absolute; left:96px; right:96px; top:1130px; }
.lab-tag { font-family:var(--sans); font-weight:700; font-size:40px; letter-spacing:.18em; color:var(--gold); }
.lab-mood { font-family:var(--serif); font-style:italic; font-weight:700; font-size:96px; line-height:1.1; margin-top:10px; }
.lab-piece { font-size:38px; line-height:1.3; margin-top:22px; color:#f1f1f1; }
.lab-brand { font-size:34px; letter-spacing:.3em; text-transform:uppercase; margin-top:10px; color:var(--gold); }
.outro { background:#000; }
.out-l { font-family:var(--serif); font-weight:700; font-size:104px; line-height:1.1; }
.out-rule { width:360px; height:3px; background:var(--gold); margin:48px 0 36px; }
.out-sub { font-size:40px; letter-spacing:.14em; text-transform:uppercase; color:#ddd; }
.out-cta { font-family:var(--serif); font-style:italic; font-size:64px; color:var(--gold); margin-top:60px; }
`;

const page = `<!doctype html>
<html lang="fr" data-resolution="portrait">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
<style>${css}</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1080" data-height="1920">
${html}</div>
<script>
window.__timelines = window.__timelines || {};
const tl = gsap.timeline({ paused: true });
${js}window.__timelines["main"] = tl;
tl.seek(0);
</script>
</body>
</html>
`;

writeFileSync(new URL("./index.html", import.meta.url), page);
console.log(`index.html généré : ${TOTAL}s, 1080x1920`);
