/* MUTANTFOOTS — vanilla JS, no dependencies */
const CONFIG = {
  SUBMIT_URL: "",                          // POST endpoint. Empty = demo mode (stored in this browser only)
  X_URL: "https://x.com/mutantfoots",      // project X profile
  X_HANDLE: "@mutantfoots",                // used in the share post
  SITE_URL: "https://mutantfoots.example", // used in the share post
  ALLOW_SAPLING: false,                    // also accept zs1 Sapling addresses
  MINT_DATE: "TBA",
  MINT_PRICE: "TBA",
};

(() => {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia("(prefers-reduced-motion: reduce)");
const reduced = () => RM.matches;

/* ---------- Specimens ---------- */
const SPECIMENS = [
  { src: "01", bg: "Teal",  skin: "Pink",     face: "Melting",     ears: "Ear 04", eyes: "Cyclops",          nose: "Plain",       mouth: "Forked Tongue",  chest: "Stitched Jacket" },
  { src: "02", bg: "Sky",   skin: "Green",    face: "Exposed Jaw", ears: "Ear 06", eyes: "Acid Drip",        nose: "Slime Nose",  chest: "Hazmat Suit",    weapon: "Serum Katana" },
  { src: "03", bg: "Lemon", skin: "Grey",     face: "Melting",     costume: "Hammer-Gold Shark", eyes: "Laser Serum", nose: "Plain", mouth: "Fanged Grin", chest: "Villain Suit", weapon: "Chainsaw" },
  { src: "04", bg: "Lilac", skin: "Lavender", face: "Melting",     ears: "Ear 08", eyes: "Hypno Spiral",     nose: "Pig Snout",   mouth: "Scream",         chest: "Lab Coat", weapon: "Cleaver Staff" },
  { src: "05", bg: "Mint",  skin: "Slate",    face: "Melting",     costume: "Purple Dragon", eyes: "Cyclops", nose: "Plain", mouth: "Scream", chest: "Black Gi" },
  { src: "06", bg: "Rust",  skin: "Slate",    face: "Exposed Jaw", ears: "Ear 02", eyes: "Laser Serum",      nose: "Cyber Nose",  chest: "Burnt Hoodie",   weapon: "Rusty Katana" },
  { src: "07", bg: "Teal",  skin: "Cyan",     face: "Melting",     ears: "Ear 05", eyes: "Toxic Hellfire",   nose: "Nose Ring",   mouth: "Waterfall",      chest: "Bare Chest" },
  { src: "08", bg: "Sky",   skin: "Cyan",     face: "Melting",     costume: "Ice Beast", eyes: "Reptile Slit", nose: "Plain", mouth: "Void Spew", chest: "Bone Armor",  weapon: "Bone Sword" },
  { src: "09", bg: "Lemon", skin: "Brown",    face: "Exposed Jaw", ears: "Ear 01", eyes: "Reptile Slit",     nose: "Bloody Nose", chest: "Bone Armor",     weapon: "Toxic Trident" },
  { src: "10", bg: "Lilac", skin: "Green",    face: "Melting",     costume: "Toxic Green Shark", eyes: "Molten Toxic", nose: "Plain", mouth: "Acid Drool", chest: "Lab Coat" },
  { src: "11", bg: "Mint",  skin: "Green",    face: "Melting",     ears: "Ear 06", eyes: "Molten Toxic",     nose: "Slime Nose",  mouth: "Acid Drool",     chest: "Bare Chest", weapon: "Serum Katana" },
  { src: "12", bg: "Rust",  skin: "Brown",    face: "Melting",     costume: "Lava Beast", eyes: "Serum M1", nose: "Plain", mouth: "Lavafall", chest: "Villain Suit", weapon: "Chainsaw" },
  { src: "13", bg: "Teal",  skin: "Slate",    face: "Melting",     ears: "Ear 07", eyes: "Swollen Mismatch", nose: "Skull Hole",  mouth: "Void Spew",      chest: "Black Gi" },
  { src: "14", bg: "Sky",   skin: "Grey",     face: "Exposed Jaw", ears: "Ear 03", eyes: "Serum M1",         nose: "Serum M1",    chest: "Bare Chest", weapon: "Bone Sword" },
  { src: "15", bg: "Lemon", skin: "Lavender", face: "Melting",     costume: "Ghost Purple Shark", eyes: "Hypno Spiral", nose: "Plain", mouth: "Stitched Mouth", chest: "Stitched Jacket", weapon: "Rusty Katana" },
  { src: "16", bg: "Lilac", skin: "Pink",     face: "Exposed Jaw", ears: "Ear 04", eyes: "Serum M1",         nose: "Plain",       mouth: "Fanged Grin",    chest: "Bare Chest" },
].map(s => ({ ...s, url: `assets/m/${s.src}.png`, name: s.costume || s.eyes }));
const TRAIT_KEYS = [["costume","Costume"],["skin","Skin"],["face","Face"],["eyes","Eyes"],["nose","Nose"],["mouth","Mouth"],["ears","Ears"],["chest","Chest"],["weapon","Weapon"],["bg","Background"]];
const TRAIT_FILE_OVERRIDES = {
  costume: {
    "Hammer-Gold Shark": "shark-hammer-gold-costume",
    "Purple Dragon": "dragon-purple-costume",
    "Toxic Green Shark": "shark-toxic-green-costume",
    "Ghost Purple Shark": "shark-ghost-purple-costume"
  },
  weapon: {
    "Bone Sword": "01-bone-sword", "Rusty Katana": "02-rusty-katana", "Serum Katana": "03-serum-katana",
    "Toxic Trident": "05-toxic-trident", "Cleaver Staff": "06-cleaver-staff", "Chainsaw": "07-chainsaw"
  }
};
const CDN = {
  serumCalm: "https://id-preview--6b184a85-d85b-4d54-8732-baeab7bf94a8.lovable.app/__l5e/assets-v1/1d772da7-cf59-43e6-924f-1af910c12ddd/serum-calm.png",
  serumMutated: "https://id-preview--6b184a85-d85b-4d54-8732-baeab7bf94a8.lovable.app/__l5e/assets-v1/c8bf6833-9574-446a-874d-4d5b78ce4906/serum-mutated.png",
};
const HOTSPOTS = [
  { id:"tube-pink", label:"Pink serum tube", kind:"spec", i:0, x:8.8, y:13.8, w:7.5, h:20 },
  { id:"tube-lime", label:"Lime specimen tube", kind:"spec", i:1, x:15.6, y:11.5, w:7.3, h:21 },
  { id:"tube-blue", label:"Blue specimen tube", kind:"spec", i:3, x:21.3, y:8.2, w:7.1, h:22 },
  { id:"tube-green", label:"Green specimen tube", kind:"spec", i:4, x:17.7, y:17.5, w:7.3, h:20 },
  { id:"tube-cyan", label:"Cyan specimen tube", kind:"spec", i:7, x:24.3, y:15.3, w:7.3, h:20 },
  { id:"tube-purple", label:"Purple specimen tube", kind:"spec", i:9, x:29.6, y:8.2, w:7.4, h:22 },
  { id:"bottle", label:"Sealed control bottle", kind:"spec", i:13, x:40.6, y:4.5, w:7.2, h:19 },
  { id:"plate-top", label:"Upper specimen plate", kind:"spec", i:14, x:52.5, y:2.3, w:18, h:15 },
  { id:"flask-purple", label:"Purple mutation flask", kind:"spec", i:15, x:68.9, y:3, w:17, h:25 },
  { id:"rack-green", label:"Upper green tube", kind:"spec", i:10, x:87, y:0, w:6.5, h:14 },
  { id:"rack-orange", label:"Upper orange tube", kind:"spec", i:11, x:93.2, y:0, w:6.5, h:16 },
  { id:"flask-green", label:"Green mutation flask", kind:"spec", i:11, x:83.8, y:17.8, w:16.2, h:27 },
  { id:"flask-blue", label:"Blue mutation flask", kind:"spec", i:7, x:0, y:73.5, w:16.2, h:26.5 },
  { id:"plate-lime", label:"Lava Beast culture plate", kind:"feature", feature:"lava", x:13, y:77, w:17.5, h:20 },
  { id:"slide-right-a", label:"Hypno Spiral slide", kind:"feature", feature:"hypno", x:89, y:51.5, w:11, h:16 },
  { id:"slide-right-b", label:"Dragon culture slide", kind:"feature", feature:"dragon", x:91, y:65, w:9, h:15 },
  { id:"microscope", label:"Microscope specimen viewer", kind:"zoom", i:3, x:0, y:23, w:25, h:49 },
  { id:"face", label:"Clipboard face traits", kind:"face", i:14, x:52, y:18, w:17, h:23 },
  { id:"portrait-row", label:"Clipboard specimen profiles", kind:"spec", i:12, x:33, y:37, w:39, h:15 },
  { id:"dna", label:"DNA mutation sequence", kind:"dna", x:34.5, y:52, w:31, h:18 },
  { id:"cell-plate", label:"Cell division plate", kind:"spec", i:5, x:60, y:53, w:16, h:18 },
  { id:"jar-row", label:"Six archived samples", kind:"spec", i:8, x:35, y:71, w:24, h:18 },
  { id:"sample-row", label:"Control sample strip", kind:"feature", feature:"dragon", x:57.5, y:72, w:17, h:17 },
  { id:"pipette", label:"Serum pipette", kind:"dna", x:76, y:30, w:8, h:25 },
  { id:"injector", label:"Mutation injector", kind:"dna", x:77, y:45, w:9, h:27 },
];

/* ---------- Mutation index (every trait, one at a time) ---------- */
const TRAIT_CDN = "https://cdn.jsdelivr.net/gh/0xDarkSeidBull/nft@main/files/mutantfoots/";
const TRAIT_DIR = { background: "bacground", skin: "face", weapon: "weapons" };
const tUrl = (dir, file) => `${TRAIT_CDN}${TRAIT_DIR[dir] || dir}/${file}.png`;
const T = (dir, list) => list.map(([f, n]) => ({ n, f: tUrl(dir, f) }));
const INDEX = [
  { id: "background", title: "Backgrounds", crop: [0,0,44,44], full: true, items: T("background", [["sky","Sky"],["mint","Mint"],["lemon","Lemon"],["lilac","Lilac"],["rust","Rust"],["teal","Teal"]]) },
  { id: "skin", title: "Skins", crop: [12,10,20,34], bg: "#1d6f73", items: T("skin", [["melting-pink","Pink"],["melting-lavender","Lavender"],["melting-cyan","Cyan"],["melting-green","Green"],["melting-grey","Grey"],["melting-brown","Brown"],["melting-slate","Slate"]]) },
  { id: "face", title: "Faces", crop: [12,10,20,34], bg: "#e3d6ff", items: T("face", [["melting-green","Melting"],["exposed-jaw-green","Exposed Jaw"]]) },
  { id: "eyes", title: "Eyes", crop: [18,6,26,26], bg: "#9ff0fc", items: T("eyes", [["acid-drip","Acid Drip"],["cyclops","Cyclops"],["hypno-spiral","Hypno Spiral"],["laser-serum","Laser Serum"],["molten-toxic","Molten Toxic"],["reptile-slit","Reptile Slit"],["serum-m1","Serum M1"],["swollen-mismatch","Swollen Mismatch"],["toxic-hellfire","Toxic Hellfire"]]) },
  { id: "nose", title: "Noses", crop: [17,17,17,17], bg: "#fff3a6", items: T("nose", [["bloody-nose","Bloody Nose"],["cyber-nose","Cyber Nose"],["nose-ring","Nose Ring"],["nose-serum-m1","Serum M1"],["pig-snout","Pig Snout"],["skull-hole","Skull Hole"],["slime-nose","Slime Nose"]]) },
  { id: "mouth", title: "Mouths", crop: [14,23,22,21], bg: "#b8f2c9", items: T("mouth", [["acid-drool","Acid Drool"],["blood-drip","Blood Drip"],["fanged-grin","Fanged Grin"],["forked-tongue","Forked Tongue"],["lavafall","Lavafall"],["scream","Scream"],["stitched-mouth","Stitched Mouth"],["void-spew","Void Spew"],["waterfall","Waterfall"]]) },
  { id: "ears", title: "Ears", crop: [7,13,16,16], bg: "#e0785a", items: T("ears", ["01","02","03","04","05","06","07","08"].map(n => ["ear-" + n, "Ear " + n])) },
  { id: "chest", title: "Chests", crop: [4,26,28,18], bg: "#9ff0fc", items: T("chest", [["bare-chest-green","Bare Chest"],["black-gi","Black Gi"],["bone-armor","Bone Armor"],["burnt-hoodie","Burnt Hoodie"],["hazmat-suit","Hazmat Suit"],["lab-coat","Lab Coat"],["stitched-jacket","Stitched Jacket"],["villain-suit","Villain Suit"]]) },
  { id: "costume", title: "Costumes", crop: [0,0,44,44], bg: "#fff3a6", note: "6 Sharks · 6 Beasts · 2 Dragons", items: T("costume", [["shark-costume","Classic Shark"],["shark-great-white-costume","Great White Shark"],["shark-blood-red-costume","Blood Red Shark"],["shark-ghost-purple-costume","Ghost Purple Shark"],["shark-toxic-green-costume","Toxic Green Shark"],["shark-hammer-gold-costume","Hammer-Gold Shark"],["blood-beast","Blood Beast"],["ice-beast","Ice Beast"],["lava-beast","Lava Beast"],["serum-beast","Serum Beast"],["void-beast","Void Beast"],["zombie-beast","Zombie Beast"],["dragon-purple-costume","Purple Dragon"],["dragon-black-costume","Black Dragon"]]) },
  { id: "weapon", title: "Weapons", crop: [0,4,20,40], bg: "#e3d6ff", items: T("weapon", [["01-bone-sword","Bone Sword"],["02-rusty-katana","Rusty Katana"],["03-serum-katana","Serum Katana"],["05-toxic-trident","Toxic Trident"],["06-cleaver-staff","Cleaver Staff"],["07-chainsaw","Chainsaw"]]) },
];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

/* ---------- Seeded RNG (stable layouts) ---------- */
let seed = 606;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

/* ---------- Build DOM ---------- */
function build() {
  if ($("#hotlabSpots")) $("#hotlabSpots").innerHTML = HOTSPOTS.map((h, i) => `<button class="anahot" type="button" data-anahot="${i}" aria-label="Inspect ${esc(h.label)}" style="--x:${h.x}%;--y:${h.y}%;--w:${h.w}%;--h:${h.h}%"><span>${esc(h.label)}</span></button>`).join("");
  // Specimen shelves (glassware rendered after preload)
  const SHAPE_ORDER = ["flask", "tube", "beaker", "tube", "flask", "beaker", "beaker", "flask", "tube"];
  const counts = { all: SPECIMENS.length, costume: SPECIMENS.filter(s => s.costume).length,
    melting: SPECIMENS.filter(s => s.face === "Melting").length, jaw: SPECIMENS.filter(s => s.face === "Exposed Jaw").length };
  $$("[data-count]").forEach(el => (el.textContent = counts[el.dataset.count]));

  // Ribbons (vanilla port of InfiniteRibbon: content doubled, track slides -50%)
  const words = ["SPECIMEN ESCAPED", "SERUM M1", "CONTAINMENT FAILED", "606 MUTANTS", "OWNERS SHIELDED"];
  const sets = {
    specimens: SPECIMENS.map(s => `<span class="ribbon__item"><span class="art"><img src="${s.url}" alt=""></span>${esc(s.name)}</span>`).join(""),
    words: [...words, ...words].map(w => `<span class="ribbon__item">${w} ◆</span>`).join(""),
  };
  $$("[data-ribbon]").forEach(t => { const s = sets[t.dataset.ribbon]; t.innerHTML = s + s; });

  // Drip dividers
  $$("[data-drip]").forEach(d => {
    let h = "";
    for (let i = 0; i < 480; i++) {
      const r = rnd(), ht = r < .55 ? 8 : r < .8 ? 16 : r < .93 ? 24 + Math.floor(rnd() * 3) * 8 : 40;
      const drop = ht >= 24 && rnd() < .4 ? `<b style="--d:${(rnd() * 3.4).toFixed(2)}s"></b>` : "";
      h += `<i style="height:${ht}px">${drop}</i>`;
    }
    d.innerHTML = h;
  });

  $$("[data-pt]").forEach(el => (el.innerHTML = ptHTML()));

  // Camera noise tile
  const n = document.createElement("canvas"); n.width = n.height = 48;
  const nx = n.getContext("2d"), nd = nx.createImageData(48, 48);
  for (let i = 0; i < nd.data.length; i += 4) { const v = rnd() * 255 | 0; nd.data[i] = nd.data[i + 1] = nd.data[i + 2] = v; nd.data[i + 3] = 255; }
  nx.putImageData(nd, 0, 0);
  document.documentElement.style.setProperty("--noise", `url(${n.toDataURL()})`);

  // Config text
  $$("[data-mint-date]").forEach(e => (e.textContent = CONFIG.MINT_DATE));
  $$("[data-mint-price]").forEach(e => (e.textContent = CONFIG.MINT_PRICE));
  $$("[data-x-link]").forEach(a => (a.href = CONFIG.X_URL || "#"));
  if (!CONFIG.SUBMIT_URL) $("#demoNote").hidden = false;
}

/* ---------- Interactive laboratory anahots ---------- */
function hotlab() {
  const dlg = $("#hotdrawer"), body = $("#hotdrawerBody"), title = $("#hotdrawerTitle"), code = $("#hotdrawerCode");
  let loadTimer = 0, mutateTimer = 0, faceTimer = 0;
  const dnaLoader = `<div class="hotdrawer__loading" role="status"><svg class="ld-ekg" viewBox="0 0 64 32" aria-hidden="true"><polyline points="0,16 14,16 20,6 28,26 34,16 64,16" /></svg><b>DECODING SAMPLE...</b></div>`;
  const traitList = s => `<dl class="hotdrawer__traits">${TRAIT_KEYS.filter(([k]) => s[k]).map(([k,l]) => `<dt>${l}</dt><dd>${esc(s[k])}</dd>`).join("")}</dl>`;
  const specimen = i => {
    const s = SPECIMENS[i];
    return `<div class="hotdrawer__spec"><div class="hotdrawer__pixel"><img src="${s.url}" alt="${esc(s.name)} mutant specimen"></div><div><p class="sheet__k">Specimen ${String(i + 1).padStart(3,"0")} / 606</p><h3>${esc(s.name)}</h3>${traitList(s)}</div></div>`;
  };
  const feature = key => {
    const data = key === "hypno"
      ? { title:"Hypno Spiral", img:tUrl("eyes","hypno-spiral"), note:"Optical mutation · Eyes", traits:[["Class","Face feature"],["Signal","Spiral lock"],["Observed in","Specimens 004 + 015"]] }
      : key === "lava"
      ? { title:"Lava Beast", img:tUrl("costume","lava-beast"), note:"Full mutation · Costume", traits:[["Class","Beast"],["Mouth","Lavafall"],["Weapon","Chainsaw"]] }
      : { title:"Dragon pair", img:tUrl("costume","dragon-purple-costume"), note:"Rare mutation · 2 variants", traits:[["Variants","Purple / Black"],["Class","Dragon"],["Supply group","10 Dragons"]] };
    return `<div class="hotdrawer__spec"><div class="hotdrawer__pixel"><img src="${data.img}" alt="${data.title} trait"></div><div><p class="sheet__k">${data.note}</p><h3>${data.title}</h3><dl class="hotdrawer__traits">${data.traits.map(([a,b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl></div></div>`;
  };
  const dna = () => `<div class="hotdrawer__dna"><div class="hotdrawer__dnaframe"><img id="dnaState" src="${CDN.serumCalm}" alt="Calm specimen suspended in blue serum"></div><div><p class="sheet__k">Serum M1 · live sequence</p><h3 id="dnaTitle">Control specimen</h3><p id="dnaCopy">Cell structure stable. Mutation compound approaching.</p><div class="hotdrawer__meter"><i></i></div></div></div>`;
  const face = i => {
    const s = SPECIMENS[i], sets = [["eyes","nose","mouth"],["face","skin","ears"],["chest","weapon","bg"]];
    return `<div class="hotdrawer__spec"><div class="hotdrawer__pixel hotdrawer__pixel--face"><img src="${s.url}" alt="Face scan for ${esc(s.name)}"></div><div><p class="sheet__k">Rotating face scan</p><h3>${esc(s.name)}</h3><dl class="hotdrawer__traits" id="faceTraits"></dl><p class="hotdrawer__cycle" id="faceCycle">Set 1 / 3</p></div></div><script type="application/json" id="faceSets">${JSON.stringify(sets)}</script>`;
  };
  const zoom = i => {
    const s = SPECIMENS[i];
    return `<div class="hotdrawer__zoom"><div class="zoomstage" id="zoomstage"><img id="zoomimg" src="${s.url}" alt="Magnified ${esc(s.name)} specimen"></div><div class="zoomtools" aria-label="Microscope zoom controls"><button type="button" data-zoom="out" aria-label="Zoom out">−</button><button type="button" data-zoom="reset" aria-label="Reset zoom">1:1</button><button type="button" data-zoom="in" aria-label="Zoom in">+</button></div><div><p class="sheet__k">Microscope feed · Specimen ${String(i+1).padStart(3,"0")}</p><h3>${esc(s.name)}</h3>${traitList(s)}</div></div>`;
  };
  const wireZoom = () => {
    const stage = $("#zoomstage"), img = $("#zoomimg"); if (!stage || !img) return;
    let z = 4, ox = 0, oy = 0, drag = null;
    const paint = () => { img.style.transform = `translate(${ox}px,${oy}px) scale(${z})`; };
    const setZoom = (next, px = stage.clientWidth/2, py = stage.clientHeight/2) => { next = Math.max(1,Math.min(16,next)); const k=next/z; ox=px-(px-ox)*k; oy=py-(py-oy)*k; z=next; paint(); };
    const wheel = e => { e.preventDefault(); const r=stage.getBoundingClientRect(), dy=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?100:1); setZoom(z*Math.exp(-dy*.0015),e.clientX-r.left,e.clientY-r.top); };
    stage.addEventListener("wheel", wheel, { passive:false });
    stage.addEventListener("pointerdown", e => { drag={x:e.clientX,y:e.clientY,ox,oy}; stage.setPointerCapture(e.pointerId); });
    stage.addEventListener("pointermove", e => { if(!drag)return; ox=drag.ox+e.clientX-drag.x; oy=drag.oy+e.clientY-drag.y; paint(); });
    stage.addEventListener("pointerup", () => drag=null); stage.addEventListener("pointercancel", () => drag=null);
    $$("[data-zoom]",body).forEach(b => b.addEventListener("click",()=>{ const a=b.dataset.zoom; if(a==="reset"){z=4;ox=oy=0;paint();} else setZoom(z*(a==="in"?1.5:1/1.5)); })); paint();
  };
  const wireFace = i => {
    const s=SPECIMENS[i], sets=[["eyes","nose","mouth"],["face","skin","ears"],["chest","weapon","bg"]]; let at=0;
    const draw=()=>{ const keys=sets[at].filter(k=>s[k]); $("#faceTraits").innerHTML=keys.map(k=>`<dt>${esc(TRAIT_KEYS.find(([x])=>x===k)?.[1]||k)}</dt><dd>${esc(s[k])}</dd>`).join(""); $("#faceCycle").textContent=`Set ${at+1} / ${sets.length}`; };
    draw(); faceTimer=setInterval(()=>{at=(at+1)%sets.length;draw();},1800);
  };
  const show = h => {
    clearTimeout(loadTimer); clearTimeout(mutateTimer); clearInterval(faceTimer);
    title.textContent=h.label; code.textContent=`MF-606 · ${h.id.toUpperCase()}`; body.innerHTML=dnaLoader;
    if(!dlg.open) dlg.showModal();
    loadTimer=setTimeout(()=>{
      body.innerHTML=h.kind==="spec"?specimen(h.i):h.kind==="feature"?feature(h.feature):h.kind==="dna"?dna():h.kind==="face"?face(h.i):zoom(h.i);
      body.classList.remove("is-reveal"); void body.offsetWidth; body.classList.add("is-reveal");
      if(h.kind==="zoom") wireZoom();
      if(h.kind==="face") wireFace(h.i);
      if(h.kind==="dna") mutateTimer=setTimeout(()=>{ const img=$("#dnaState"); if(!img)return; img.classList.add("is-mutating"); setTimeout(()=>{ img.src=CDN.serumMutated; img.alt="Mutated specimen suspended in green serum"; $("#dnaTitle").textContent="Mutation confirmed"; $("#dnaCopy").textContent="Serum M1 bonded. Cell structure rewritten."; },260); },1200);
    }, reduced()?0:420);
  };
  $$("[data-anahot]").forEach(b=>b.addEventListener("click",()=>show(HOTSPOTS[+b.dataset.anahot])));
  const close=()=>{clearTimeout(loadTimer);clearTimeout(mutateTimer);clearInterval(faceTimer);dlg.close();};
  $("#hotdrawerClose").addEventListener("click",close);
  dlg.addEventListener("click",e=>{if(e.target===dlg)close();});
  dlg.addEventListener("cancel",()=>{clearTimeout(loadTimer);clearTimeout(mutateTimer);clearInterval(faceTimer);});
  document.addEventListener("mf:specimen",e=>show({id:`shelf-${e.detail+1}`,label:`Specimen shelf ${String(e.detail+1).padStart(2,"0")}`,kind:"spec",i:e.detail}));
}

/* ---------- Preloader ---------- */
const IMG = new Map(); // url -> {img, bg}
function loadImg(url) {
  if (IMG.has(url)) return IMG.get(url).p;
  const img = new Image(); if (/^https?:/.test(url)) img.crossOrigin = "anonymous"; img.decoding = "sync";
  const rec = { img, bg: null };
  const loaded = new Promise(r => { img.onload = r; img.onerror = r; });
  img.src = url;
  const decoded = img.decode && !document.hidden ? img.decode().catch(() => loaded) : loaded;
  rec.p = Promise.race([decoded, loaded.then(() => new Promise(r => setTimeout(r, 1500))), new Promise(r => setTimeout(r, 5000))])
    .then(() => {
      try { const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
        x.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1); const d = x.getImageData(0, 0, 1, 1).data;
        if (d[3] > 0) rec.bg = `rgb(${d[0]},${d[1]},${d[2]})`; } catch (e) {}
      return rec;
    }).catch(() => rec);
  IMG.set(url, rec);
  return rec.p;
}
function preload() {
  const urls = [...new Set([...$$("img").map(i => i.getAttribute("src")), ...SPECIMENS.map(s => s.url), ...INDEX.flatMap(c => c.items.map(i => i.f)), "assets/devil-1.png", "assets/devil-2.png", "assets/control.png"])];
  const fontJobs = document.fonts ? Promise.race([
    Promise.all(['900 16px Archivo', '800 16px Archivo', '600 16px Archivo', '16px Silkscreen'].map(f => document.fonts.load(f))).then(() => document.fonts.ready),
    new Promise(r => setTimeout(r, 6000)),
  ]) : Promise.resolve();
  const total = urls.length + 1; let done = 0;
  const pct = $("#loaderPct"), log = $("#loaderLog");
  const logs = ["Warming tanks", "Splicing skins", "Growing teeth", "Sharpening weapons", "Cracking glass", "Shielding owners"];
  const tick = label => { done++; const p = Math.round(done / total * 100); pct.textContent = p + "%"; log.textContent = label || logs[Math.min(logs.length - 1, Math.floor(done / total * logs.length))]; };
  return Promise.race([
    Promise.all([...urls.map(u => loadImg(u).then(() => tick())), fontJobs.then(() => tick("Fonts locked"))]),
    new Promise(r => setTimeout(r, 9000)),
  ]);
}

/* ---------- Pixel snapping (whole-number device-pixel scale) ---------- */
const arts = [];
function initArt(el) {
  const media = el.querySelector(":scope > img, :scope > canvas");
  if (!media) return;
  const crop = (el.dataset.crop || "0,0,44,44").split(",").map(Number);
  const a = { el, media, crop, chs: null, eyes: el.querySelector(".eyes") };
  if (media.tagName === "IMG" && (el.classList.contains("glitchable") || el.closest(".glitchable"))) {
    const chs = document.createElement("span"); chs.className = "chs"; chs.setAttribute("aria-hidden", "true");
    chs.innerHTML = `<img class="ch ch--r" alt=""><img class="ch ch--gb" alt="">`;
    el.appendChild(chs); a.chs = chs; syncChannels(a);
  }
  el.style.setProperty("--cell", "4px");
  arts.push(a); el._art = a;
}
function syncChannels(a) { if (a.chs) $$(".ch", a.chs).forEach(i => (i.src = a.media.src)); }
function layoutArt(a) {
  const { el, media, crop } = a, w = el.clientWidth, h = el.clientHeight;
  if (!w || !h) return;
  const [x, y, cw, ch] = crop, dpr = window.devicePixelRatio || 1;
  const cell = Math.max(1, Math.floor(Math.min(w / cw, h / ch) * dpr + 1e-6)) / dpr;
  const size = 44 * cell;
  const left = Math.round(((w - cw * cell) / 2 - x * cell) * dpr) / dpr;
  const full = cw === 44 && ch === 44;
  const top = full ? Math.round((h - size) * dpr) / dpr : Math.round(((h - ch * cell) / 2 - y * cell) * dpr) / dpr;
  const st = `width:${size}px;height:${size}px;left:${left}px;top:${top}px`;
  media.style.cssText = st;
  el.style.setProperty("--cell", cell + "px");
  if (a.chs) { a.chs.style.cssText = `left:${Math.max(0,left)}px;top:${Math.max(0,top)}px;right:auto;bottom:auto;width:${Math.min(w,size)}px;height:${Math.min(h,size)}px`;
    $$(".ch", a.chs).forEach(i => (i.style.cssText = `width:${size}px;height:${size}px;left:${Math.min(0,left)}px;top:${Math.min(0,top)}px`)); }
  if (a.eyes) {
    a.eyes.style.cssText = st;
    $$(".eye", a.eyes).forEach(e => { const [ex, ey, ew, eh] = e.dataset.eye.split(",").map(Number);
      e.style.left = ex * cell + "px"; e.style.top = ey * cell + "px"; e.style.width = ew * cell + "px"; e.style.height = eh * cell + "px"; });
  }
  const rec = media.tagName === "IMG" && IMG.get(media.getAttribute("src"));
  if (rec && rec.bg && !el.dataset.keepBg) el.style.backgroundColor = rec.bg;
}
let ro;
function initArts() {
  $$(".art").forEach(initArt);
  arts.forEach(layoutArt);
  ro = new ResizeObserver(es => es.forEach(e => e.target._art && layoutArt(e.target._art)));
  arts.forEach(a => ro.observe(a.el));
  let lastDpr = devicePixelRatio;
  addEventListener("resize", () => { if (devicePixelRatio !== lastDpr) { lastDpr = devicePixelRatio; arts.forEach(layoutArt); } });
}

/* ---------- Shared pixel helpers ---------- */
const hexRGB = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const SPRITES = new Map();
function spriteNoBg(url) {
  if (SPRITES.has(url)) return SPRITES.get(url);
  const c = document.createElement("canvas"); c.width = c.height = 44; const x = c.getContext("2d");
  const rec = IMG.get(url); if (rec && rec.img.complete) x.drawImage(rec.img, 0, 0);
  const d = x.getImageData(0, 0, 44, 44).data, r = d[0], g = d[1], b = d[2], seen = new Uint8Array(1936), st = [];
  d.bg = [r, g, b]; d.full = new Uint8ClampedArray(d);
  for (let k = 0; k < 44; k++) st.push(k, 43 * 44 + k, k * 44, k * 44 + 43);
  while (st.length) { const i = st.pop(); if (seen[i]) continue; seen[i] = 1;
    if (d[i * 4] !== r || d[i * 4 + 1] !== g || d[i * 4 + 2] !== b) continue;
    d[i * 4 + 3] = 0; const px = i % 44, py = (i / 44) | 0;
    if (px > 0) st.push(i - 1); if (px < 43) st.push(i + 1); if (py > 0) st.push(i - 44); if (py < 43) st.push(i + 44); }
  SPRITES.set(url, d); return d;
}
function setCell() {
  const dpr = devicePixelRatio || 1, k = innerWidth < 600 ? 1.5 : innerWidth >= 1500 ? 3 : 2;
  document.documentElement.style.setProperty("--cell", Math.max(1, Math.round(k * dpr)) / dpr + "px");
}

/* ---------- Specimen glassware ---------- */
const SHAPES = {
  flask: { W: 84, H: 100, ox: 19, oy: 52, level: 38, top: 8, lip: [6, 8, 30, 53],
    inside: (x, y) => { const dx = x - 41.5, dy = y - 62; return dx * dx + dy * dy < 36.5 * 36.5 || (x >= 34 && x <= 49 && y >= 8 && y < 62); } },
  tube: { W: 54, H: 108, ox: 5, oy: 60, level: 28, top: 10, lip: [8, 10, 1, 52], cork: [0, 9, 7, 46],
    inside: (x, y) => { if (x < 3 || x > 50 || y < 10) return false; if (y <= 82) return true; const dx = x - 26.5, dy = y - 82; return dx * dx + dy * dy < 24 * 24; } },
  beaker: { W: 62, H: 70, ox: 9, oy: 24, level: 18, top: 6, lip: [4, 6, 2, 59], marks: true,
    inside: (x, y) => x >= 5 && x <= 56 && y >= 6 && y <= 67 },
};
function renderGlass(cv, shape, d) {
  const S = SHAPES[shape], { W, H } = S, ctx = cv.getContext("2d");
  cv.width = W; cv.height = H; cv.style.width = `calc(${W} * var(--cell))`; cv.style.height = `calc(${H} * var(--cell))`;
  const out = ctx.createImageData(W, H), P = out.data;
  const put = (x, y, c) => { if (x < 0 || y < 0 || x >= W || y >= H) return; const o = (y * W + x) * 4; P[o] = c[0]; P[o + 1] = c[1]; P[o + 2] = c[2]; P[o + 3] = 255; };
  const rim = hexRGB("#e6e2ff"), glass = hexRGB("#2f2870"), hi = hexRGB("#8f86d6"), liq = d.bg, top = liq.map(v => v + (255 - v) * .45 | 0), bub = liq.map(v => v + (255 - v) * .7 | 0);
  const IN = (x, y) => x >= 0 && y >= 0 && x < W && y < H && S.inside(x, y);
  let seed2 = W * 7 + H;
  const r2 = () => ((seed2 = (seed2 * 1103515245 + 12345) >>> 0) / 4294967296);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!IN(x, y)) continue;
    const hl = !IN(x - 3, y) && IN(x - 2, y) && y < S.level + 10;
    put(x, y, hl ? hi : y < S.level ? glass : y === S.level ? top : liq);
  }
  for (let k = 0; k < 14; k++) { const x = 6 + Math.floor(r2() * (W - 12)), y = S.level + 3 + Math.floor(r2() * (H - S.level - 8)); if (IN(x, y)) put(x, y, bub); }
  if (S.marks) for (let y = S.level + 6; y < H - 6; y += 8) for (let x = 53; x <= 56; x++) put(x, y, hi);
  for (let y = 0; y < 44; y++) for (let x = 0; x < 44; x++) {
    const k = (y * 44 + x) * 4; if (!d[k + 3]) continue; const X = S.ox + x, Y = S.oy + y; if (!IN(X, Y)) continue; put(X, Y, [d[k], d[k + 1], d[k + 2]]);
  }
  for (let y = S.top; y < H; y++) for (let x = 0; x < W; x++) {
    if (IN(x, y)) continue;
    let edge = false; for (let j = -1; j <= 1 && !edge; j++) for (let i = -1; i <= 1; i++) if (IN(x + i, y + j)) { edge = true; break; }
    if (edge) put(x, y, rim);
  }
  const [ly0, ly1, lx0, lx1] = S.lip;
  for (let y = ly0; y <= ly1; y++) for (let x = lx0; x <= lx1; x++) if (!IN(x, y + (y === ly1 ? 1 : 0)) || y < ly1) { if (!(S.cork && x > S.cork[2] && x < S.cork[3] && y <= S.cork[1])) put(x, y, rim); }
  if (S.cork) { const [cy0, cy1, cx0, cx1] = S.cork, cork = hexRGB("#b07a4f"), corkD = hexRGB("#7d5234");
    for (let y = cy0; y <= cy1; y++) for (let x = cx0; x <= cx1; x++) put(x, y, (x === cx0 || x === cx1 || y === cy0) ? corkD : (x + y) % 7 === 0 ? corkD : cork); }
  ctx.putImageData(out, 0, 0);
}
  const glassDone = new Set();
  function drawGlass(b) { const i = +b.dataset.i; if (glassDone.has(i)) return; glassDone.add(i); renderGlass(b.querySelector("canvas"), b.dataset.shape, spriteNoBg(SPECIMENS[i].url)); }

/* ---------- Devil camera feeds ---------- */
function devilCam() {
  const tcs = $$("[data-tc]"), t0 = performance.now(), offs = [3723, 5211];
  const fmt = ms => { const s = Math.floor(ms / 1000), f = Math.floor(ms / 40) % 25; return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60, f].map(n => String(n).padStart(2, "0")).join(":"); };
  const tick = () => { const ms = performance.now() - t0; tcs.forEach((e, i) => (e.textContent = fmt(ms + offs[i] * 1000))); };
  tick(); setInterval(tick, reduced() ? 1000 : 40);
  if (reduced()) return;
  $$(".cam .art").forEach(a => { const loop = () => { a.classList.add("is-jolt"); setTimeout(() => a.classList.remove("is-jolt"), 70 + Math.random() * 60); setTimeout(loop, 1800 + Math.random() * 3200); }; setTimeout(loop, 1000 + Math.random() * 2000); });
}

/* ---------- Lab: serum drop into the flask ---------- */
function flaskLab() {
  const W = 96, H = 136, OX = 26, OY = 88, L = 80;
  const cv = $("#flaskCanvas"); if (!cv) return;
  const ctx = cv.getContext("2d"), box = $("#flask"), rig = box.parentElement;
  const out = ctx.createImageData(W, H), P = out.data;
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const K = { ink: hex("#e6e2ff"), glass: hex("#2f2870"), hi: hex("#8f86d6"), sal: hex("#6fcbe6"), salTop: hex("#a9e6f5"), salBub: hex("#d4f5fc"),
    lime: hex("#b4f04e"), limeTop: hex("#d8ff94"), limeBub: hex("#efffd2"), bulb: hex("#e0785a"), bulbHi: hex("#f3a78d") };

  const sprite = spriteNoBg;
  const CONTROL = sprite("assets/control.png");
  const MUT = SPECIMENS.map(s => sprite(s.url));
  const ORDER = [2, 4, 0, 9, 5, 7, 3, 11, 6, 14, 1, 12, 8, 13, 10, 15];

  // geometry: 1 interior, 2 outline, 3 glass highlight
  const cx = 47.5, cy = 96, R = 38.5, NX0 = 40, NX1 = 55, NY0 = 38;
  const M = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const dx = x - cx, dy = y - cy;
    if (dx * dx + dy * dy < R * R || (x >= NX0 && x <= NX1 && y >= NY0 && y < cy)) M[y * W + x] = 1;
  }
  for (let y = NY0; y < H; y++) for (let x = 0; x < W; x++) {
    if (M[y * W + x]) continue;
    for (let j = -1; j <= 1 && !M[y * W + x]; j++) for (let i = -1; i <= 1; i++) {
      const X = x + i, Y = y + j; if (X >= 0 && X < W && Y >= 0 && Y < H && M[Y * W + X] === 1) { M[y * W + x] = 2; break; }
    }
  }
  for (let y = NY0 - 2; y <= NY0; y++) for (let x = NX0 - 4; x <= NX1 + 4; x++) if (x < NX0 || x > NX1) M[y * W + x] = 2;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (M[y * W + x] !== 1) continue;
    const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy), a = Math.atan2(dy, dx);
    if (d > R - 5 && d < R - 3 && a > -2.75 && a < -2.05) M[y * W + x] = 3;
    if (x === NX0 + 2 && y > NY0 + 2 && y < NY0 + 16) M[y * W + x] = 3;
  }
  const noise = new Float32Array(W * H).map(() => Math.random());
  const dorder = new Float32Array(1936).map((_, i) => ((i / 44) | 0) / 44 * .4 + Math.random() * .6);

  const put = (x, y, c, a = 255) => { if (x < 0 || y < 0 || x >= W || y >= H) return; const o = (y * W + x) * 4; P[o] = c[0]; P[o + 1] = c[1]; P[o + 2] = c[2]; P[o + 3] = a; };
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t | 0, a[1] + (b[1] - a[1]) * t | 0, a[2] + (b[2] - a[2]) * t | 0];

  const T_FORM = 1.0, T_FALL = 1.5, FALL = .45, T_HIT = T_FALL + FALL, T_DONE = T_HIT + .7, T_BACK = 5.5, CYCLE = 6.1, G = 2 * (L - 36) / (FALL * FALL);
  let bubbles = [], splash = [], cyc = 0, t0 = performance.now(), last = t0, running = false, raf = 0, logStep = -1;
  const logs = $$("#obsLog li"), result = $("#obsResult");

  function frame(now) {
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    let t = (now - t0) / 1000;
    if (t >= CYCLE) { t0 = now; t = 0; cyc = (cyc + 1) % ORDER.length; splash = []; }
    const B = MUT[ORDER[cyc]], name = SPECIMENS[ORDER[cyc]].name;
    const hit = t - T_HIT;
    // liquid state
    const back = t > T_BACK ? Math.min(1, (t - T_BACK) / (CYCLE - T_BACK - .1)) : 0;
    const rr = hit > 0 ? hit * 95 : -1;
    const amp = hit > 0 ? 2.2 * Math.exp(-hit * 2.4) : 0;
    const lime = hit > 0 && !back;
    P.fill(0);
    for (let x = 0; x < W; x++) {
      const sy = L + Math.round(amp * Math.sin((x - cx) * .7 - hit * 14));
      for (let y = 0; y < H; y++) {
        const i = y * W + x, m = M[i]; if (m !== 1 && m !== 3) continue;
        if (y < sy) { put(x, y, m === 3 ? K.hi : K.glass); continue; }
        let isLime = false;
        if (hit > 0) { const d = Math.hypot(x - cx, y - L) + noise[i] * 8; isLime = back ? d > back * 120 : d < rr; }
        const top = y === sy;
        put(x, y, m === 3 ? K.hi : isLime ? (top ? K.limeTop : K.lime) : (top ? K.salTop : K.sal));
      }
    }
    // bubbles (behind specimen)
    const rate = lime ? 26 : 5;
    if (Math.random() < rate * dt) { const bx = 30 + Math.floor(Math.random() * 36); bubbles.push({ x: bx, y: 128, v: (lime ? 22 : 9) + Math.random() * 14, s: Math.random() < .3 ? 2 : 1 }); }
    bubbles = bubbles.filter(b => { b.y -= b.v * dt; if (Math.random() < .08) b.x += Math.random() < .5 ? -1 : 1; return b.y > L + 1; });
    for (const b of bubbles) { const bx = Math.round(b.x), by = Math.round(b.y);
      for (let j = 0; j < b.s; j++) for (let i = 0; i < b.s; i++) { const m = M[(by + j) * W + bx + i]; if (m === 1) put(bx + i, by + j, lime ? K.limeBub : K.salBub); } }
    // specimen
    let p = 0;
    if (hit > 0) p = Math.min(1, hit / (T_DONE - T_HIT));
    if (back) p = 1 - Math.min(1, back * 1.6);
    const glitch = (hit > 0 && hit < .75) || (back > 0 && back < .7) ? 1 + (Math.random() < .5) : 0;
    const rowShift = glitch ? Math.floor(Math.random() * 44) : -1, rowSh = (Math.random() < .5 ? -1 : 1) * 2;
    const src = (x, y) => { x = Math.max(0, Math.min(43, x)); const k = y * 44 + x; return dorder[k] < p ? B : CONTROL; };
    for (let y = 0; y < 44; y++) for (let x = 0; x < 44; x++) {
      const X = OX + x, Y = OY + y, m = M[Y * W + X]; if (m !== 1 && m !== 3) continue;
      const xs = y >= rowShift && y < rowShift + 4 ? x + rowSh : x;
      let r, g, b, a;
      if (glitch) {
        const sR = src(xs - glitch, y), sG = src(xs, y), sB = src(xs + glitch, y);
        const kR = (y * 44 + Math.max(0, Math.min(43, xs - glitch))) * 4, kG = (y * 44 + Math.max(0, Math.min(43, xs))) * 4, kB = (y * 44 + Math.max(0, Math.min(43, xs + glitch))) * 4;
        const aR = sR[kR + 3], aG = sG[kG + 3], aB = sB[kB + 3];
        a = Math.max(aR, aG, aB); if (!a) continue;
        r = aR ? sR[kR] : 0; g = aG ? sG[kG + 1] : 0; b = aB ? sB[kB + 2] : 0;
      } else {
        const s = src(x, y), k = (y * 44 + x) * 4; a = s[k + 3]; if (!a) continue; r = s[k]; g = s[k + 1]; b = s[k + 2];
      }
      put(X, Y, [r, g, b]);
    }
    // glass outline
    for (let i = 0; i < W * H; i++) if (M[i] === 2) put(i % W, (i / W) | 0, K.ink);
    // pipette
    for (let y = 0; y <= 14; y++) for (let x = 40; x <= 55; x++) {
      const e = ((x - 47.5) / 6.5) ** 2 + ((y - 7) / 7) ** 2;
      if (e < .72) put(x, y, (x < 46 && y < 7) ? K.bulbHi : K.bulb); else if (e < 1.05) put(x, y, K.ink);
    }
    for (let y = 13; y <= 31; y++) { put(45, y, K.ink); put(50, y, K.ink); for (let x = 46; x <= 49; x++) put(x, y, y > 17 ? K.lime : K.glass); }
    put(46, 32, K.ink); put(49, 32, K.ink); put(47, 32, K.lime); put(48, 32, K.lime); put(47, 33, K.ink); put(48, 33, K.ink);
    // drop
    const drawDrop = (y, hgt) => { for (let j = -1; j <= hgt; j++) for (let i = 46; i <= 49; i++) {
        const inner = j >= 0 && j < hgt && i >= 47 && i <= 48; put(i, y + j, inner ? K.lime : K.ink); } };
    if (t >= T_FORM && t < T_FALL) drawDrop(34, 1 + Math.floor((t - T_FORM) / (T_FALL - T_FORM) * 2.99));
    else if (t >= T_FALL && t < T_HIT) drawDrop(Math.round(34 + .5 * G * (t - T_FALL) ** 2), 3);
    if (hit > 0 && hit < dt + .001 && !splash.length) for (let k = 0; k < 10; k++) splash.push({ x: cx + (Math.random() - .5) * 4, y: L - 1, vx: (Math.random() - .5) * 40, vy: -30 - Math.random() * 40 });
    splash = splash.filter(s => { s.vy += 260 * dt; s.x += s.vx * dt; s.y += s.vy * dt; return s.y < L; });
    for (const s of splash) put(Math.round(s.x), Math.round(s.y), K.lime);
    ctx.putImageData(out, 0, 0);
    // log
    const step = t < T_FORM ? 0 : t < T_HIT ? 1 : t < T_DONE ? 2 : 3;
    if (step !== logStep) { logStep = step; logs.forEach((li, k) => { li.classList.toggle("is-on", k <= step); li.classList.toggle("is-now", k === step); }); result.textContent = name; }
    if (running) raf = requestAnimationFrame(frame);
  }

  const size = () => {
    const cs = getComputedStyle(rig), avail = rig.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const dpr = devicePixelRatio || 1, maxH = Math.max(420, innerHeight * .74);
    const cell = Math.max(1, Math.floor(Math.min(avail / W, maxH / H, 6) * dpr)) / dpr;
    cv.style.width = W * cell + "px"; cv.style.height = H * cell + "px";
  };
  $$(".note", box).forEach(n => n.style.setProperty("--x", n.style.left));
  size(); new ResizeObserver(size).observe(rig);

  if (reduced()) { t0 = performance.now() - (T_DONE + .5) * 1000; last = performance.now(); frame(performance.now()); return; }
  const start = () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(frame); };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  let visible = true;
  new IntersectionObserver(es => { visible = es[0].isIntersecting; visible && !document.hidden ? start() : stop(); }).observe(box);
  document.addEventListener("visibilitychange", () => (document.hidden || !visible ? stop() : start()));
  start();
}

/* ---------- Flask art: specimen sprite with background removed ---------- */
const FLASK_ART = new Map();
function flaskArt(url) {
  if (FLASK_ART.has(url)) return FLASK_ART.get(url);
  const rec = IMG.get(url);
  if (!rec || !rec.img.complete || !rec.img.naturalWidth) return url;
  try {
    const d = spriteNoBg(url), c = document.createElement("canvas"); c.width = c.height = 44;
    c.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(d), 44, 44), 0, 0);
    const out = c.toDataURL(); FLASK_ART.set(url, out); return out;
  } catch (e) { return url; }
}

/* ---------- Interactive research console ---------- */
function researchLab() {
  const selectors = $("#labSelectors"), traits = $("#labTraits"), flask = $("#labFlask");
  if (!traits || !flask) return;
  const rarity = s => s.costume ? "Rare" : s.face === "Exposed Jaw" ? "Uncommon" : "Standard";
  const mutation = s => s.costume || s.face || s.eyes;
  const descriptions = [
    "Cellular structure exhibits a controlled ocular mutation after Serum M1 exposure.",
    "Jaw structure separated during contact while the subject retained full motor response.",
    "A high-energy costume mutation bonded permanently to the specimen membrane.",
    "Neural response remains active despite severe chromatic and facial restructuring."
  ];
  const colors = ["#ff3c82","#37dff4","#96f26c","#ffb84d","#9e64ff"];
  if (selectors) selectors.innerHTML = SPECIMENS.map((s,i)=>`<button class="vial${i===0?" is-active":""}" type="button" data-lab-spec="${i}" aria-label="Load specimen ${String(i+1).padStart(3,"0")}: ${esc(s.name)}" style="--vial:${colors[i%colors.length]}"><img src="${s.url}" alt=""></button>`).join("");
  const fields = {
    specimen: $("#labSpecimen"), specimenNext: $("#labSpecimenNext"), silhouette: $("#labSilhouette"), anatomy: $("#labAnatomy"), reaction: $("#labReaction"),
    title: $("#heroTitle"), selectorId: $("#labSelectorId"), id: $("#labId"), rarity: $("#labRarity"), rarityTag: $("#labRarityTag"),
    mutation: $("#labMutation"), mutationTag: $("#labMutationTag"), classification: $("#labClass"), description: $("#labDescription"), result: $("#labResult")
  };
  const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const traitAsset = (kind,value,s) => {
    if (!value) return "";
    const folder = kind === "weapon" ? "weapon" : kind;
    let file = TRAIT_FILE_OVERRIDES[kind]?.[value] || slug(value);
    if (kind === "face") file = `${file}-${slug(s.skin)}`;
    if (kind === "chest" && value === "Bare Chest") file = `${file}-${slug(s.skin)}`;
    return tUrl(folder, file);
  };
  const traitChoices = s => [
    ["Eyes",s.eyes,"eyes"],
    ["Mouth",s.mouth,"mouth"],
    ["Body",s.chest,"chest"],
    ["Face",s.face,"face"],
    ["Costume",s.costume,"costume"],
    ["Weapon",s.weapon,"weapon"]
  ];
  const stage=$("#anatomyStage"), tip=$("#anaTip");
  let current=SPECIMENS[0], activeIndex=0, colorIndex=0, cycleTimer=0, impactTimer=0, finishTimer=0, busy=false;
  const partInfo={eyes:["Eyes",s=>s.eyes],mouth:["Mouth",s=>s.mouth||s.face],body:["Body",s=>s.chest],weapon:["Weapon",s=>s.weapon],costume:["Costume",s=>s.costume]};
  const hideTip=()=>{tip.classList.remove("is-on");$$(".anahot",stage).forEach(h=>h.classList.remove("is-on"));};
  const showTip=h=>{
    const [label,get]=partInfo[h.dataset.part]; const v=get(current);
    $("#anaTipLabel").textContent=label; $("#anaTipValue").textContent=v||"None detected";
    const sr=stage.getBoundingClientRect(), hr=h.getBoundingClientRect();
    const y=hr.top+hr.height/2-sr.top, x=hr.left+hr.width/2-sr.left;
    tip.style.top=`${y-tip.offsetHeight/2}px`;
    tip.style.setProperty("--len",`${Math.max(20,(sr.width-sr.width*0.02-tip.offsetWidth)-x)}px`);
    $$(".anahot",stage).forEach(o=>o.classList.toggle("is-on",o===h)); tip.classList.add("is-on");
  };
  $$(".anahot",stage).forEach(h=>{h.addEventListener("mouseenter",()=>showTip(h));h.addEventListener("focus",()=>showTip(h));h.addEventListener("click",()=>showTip(h));});
  $(".anatomy__figure",stage).addEventListener("mouseleave",hideTip);
  const fitTitle=()=>{const h=fields.title;if(!h||!h.clientHeight)return;h.style.fontSize="";let fs=parseFloat(getComputedStyle(h).fontSize);while((h.scrollHeight>h.clientHeight+1||h.scrollWidth>h.clientWidth+1)&&fs>18){fs-=2;h.style.fontSize=fs+"px";}};
  let fitT=0; window.addEventListener("resize",()=>{clearTimeout(fitT);fitT=setTimeout(fitTitle,120);}); document.fonts?.ready.then(fitTitle);
  const deckEl=$("#labDeck");
  const specStack=deckEl&&makeStack(deckEl,{
    render:k=>`<div class="ccard__img"><img src="${SPECIMENS[k].url}" alt=""></div>`,
    mount:el=>{const box=el.querySelector(".ccard__img"),im=box.querySelector("img");const fill=()=>{try{const c=document.createElement("canvas");c.width=c.height=1;const x=c.getContext("2d");x.drawImage(im,0,0,1,1,0,0,1,1);const d=x.getImageData(0,0,1,1).data;if(d[3])box.style.background=`rgb(${d[0]},${d[1]},${d[2]})`;}catch(e){}};im.complete&&im.naturalWidth?fill():im.addEventListener("load",fill,{once:true});}
  });
  let deckAt=-1;
  const moveDeck=i=>{if(!specStack)return;const n=SPECIMENS.length;if(deckAt<0||reduced())specStack.reset(n,i);else if(i===(deckAt+1)%n)specStack.next();else if(i===(deckAt-1+n)%n)specStack.prev();else if(i!==deckAt)specStack.reset(n,i);deckAt=i;};
  const render = i => {
    moveDeck(i);
    const s=SPECIMENS[i], id=`MF-606-${String(i+1).padStart(3,"0")}`, name=mutation(s), rank=rarity(s), choices=traitChoices(s);
    fields.silhouette.src=fields.anatomy.src=s.url;
    fields.silhouette.alt=`${name} specimen ${id}`;
    fields.title.textContent=name.toUpperCase(); fitTitle(); fields.id.textContent=id;
    fields.rarity.textContent=fields.rarityTag.textContent=rank; fields.mutation.textContent=name;
    fields.mutationTag.textContent=(s.costume?"COSTUME":s.face==="Exposed Jaw"?"ANATOMICAL":"CELLULAR")+" MUTATION";
    fields.classification.textContent=`${s.face} / ${s.skin}`; fields.description.textContent=descriptions[i%descriptions.length]; if(fields.result) fields.result.textContent=name; 
    current=s; hideTip();
    traits.innerHTML=choices.map(([label,value,kind],k)=>{
      const missing=!value, status=missing ? `${label} scan failed · no trait signature detected` : `${label} · ${value}`;
      return `<button class="traitbtn${k===0?" is-active":""}${missing?" is-unavailable":""}" type="button" data-trait-label="${esc(label)}" data-trait-value="${esc(value||"Scan failed — no trait signature detected")}">${missing?`<span class="traitbtn__missing" aria-hidden="true">SCAN<br>FAILED</span>`:`<img src="${traitAsset(kind,value,s)}" alt="${esc(value)} ${esc(label.toLowerCase())} trait">`}<span>${esc(label)}</span><small>${esc(missing?"No trait detected":value)}</small><i class="sr-only">${esc(status)}</i></button>`;
    }).join("");
    $("#labTraitDetail").textContent=`Eyes · ${s.eyes} isolated trait scan`;
    { const wrap=traits.parentElement, pending=[...traits.querySelectorAll("img")].filter(im=>!(im.complete&&im.naturalWidth));
      wrap.classList.toggle("is-loading",pending.length>0); let left=pending.length;
      pending.forEach(im=>{const done=()=>{if(--left<=0&&current===s)wrap.classList.remove("is-loading");};im.addEventListener("load",done,{once:true});im.addEventListener("error",done,{once:true});}); }
    { const probe=new Image(); probe.onload=()=>{ if(current!==s) return; try{ const c=document.createElement("canvas"); c.width=c.height=1; const x=c.getContext("2d"); x.drawImage(probe,0,0,1,1,0,0,1,1); const d=x.getImageData(0,0,1,1).data; traits.style.setProperty("--spec-bg",`rgb(${d[0]},${d[1]},${d[2]})`);}catch(e){} }; probe.src=s.url; }
    $$("[data-lab-spec]").forEach((b,k)=>{b.classList.toggle("is-active",k===i);b.setAttribute("aria-pressed",String(k===i));});
    activeIndex=i;
  };
  const chamber=flask.closest(".chamber"), artCv=$("#labFlaskArt"), artCtx=artCv.getContext("2d"), artImg=artCtx.createImageData(44,44);
  const spread=$("#lfSpreadC"), dorder=new Float32Array(1936).map((_,k)=>((k/44)|0)/44*.4+Math.random()*.6);
  let fIndex=0, fColor=0, raf=0;
  const sprite=k=>spriteNoBg(SPECIMENS[k].url);
  const paintArt=(A,B,p,glitch)=>{
    const P=artImg.data, row=glitch?Math.floor(Math.random()*44):-1, sh=(Math.random()<.5?-1:1)*2;
    for(let y=0;y<44;y++)for(let x=0;x<44;x++){
      const xs=y>=row&&y<row+4?Math.max(0,Math.min(43,x+sh)):x, k=y*44+xs, S=dorder[k]<p?B:A, o=(y*44+x)*4;
      P[o]=S[k*4];P[o+1]=S[k*4+1];P[o+2]=S[k*4+2];P[o+3]=S[k*4+3];
    }
    artCtx.putImageData(artImg,0,0);
  };
  const setColors=()=>{chamber?.style.setProperty("--serum-color",colors[fColor]);chamber?.style.setProperty("--serum-next",colors[(fColor+1)%colors.length]);};
  const settle=()=>{spread.setAttribute("r","0");paintArt(sprite(fIndex),sprite(fIndex),0,false);setColors();};
  const mutate=()=>{
    cancelAnimationFrame(raf);
    const A=sprite(fIndex), nextI=(fIndex+1)%SPECIMENS.length, B=sprite(nextI), t0=performance.now(), D=reduced()?1:900;
    const step=now=>{
      const p=Math.min(1,(now-t0)/D), e=1-(1-p)**3;
      spread.setAttribute("r",String(e*175)); paintArt(A,B,Math.min(1,p*1.15),p<.8&&Math.random()<.5);
      if(p<1) raf=requestAnimationFrame(step); else {fIndex=nextI;fColor=(fColor+1)%colors.length;settle();}
    };
    raf=requestAnimationFrame(step);
  };
  const schedule = () => { clearTimeout(cycleTimer); cycleTimer=window.setTimeout(runDrop,reduced()?3000:2800); };
  const runDrop = () => {
    if(busy)return;
    busy=true; clearTimeout(cycleTimer);
    if(reduced()){mutate();busy=false;schedule();return;}
    flask.classList.add("is-dropping");
    impactTimer=window.setTimeout(()=>{flask.classList.add("is-splash");mutate();},850);
    finishTimer=window.setTimeout(()=>{flask.classList.remove("is-dropping","is-splash");busy=false;schedule();},1800);
  };
  const select = i => render(i);
  selectors?.addEventListener("click",e=>{const b=e.target.closest("[data-lab-spec]");if(b)select(+b.dataset.labSpec);});
  $("#labPrev")?.addEventListener("click",()=>select((activeIndex-1+SPECIMENS.length)%SPECIMENS.length));
  $("#labNext")?.addEventListener("click",()=>select((activeIndex+1)%SPECIMENS.length));
  flask.addEventListener("click",()=>runDrop());
  flask.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();runDrop();}});
  traits.addEventListener("click",e=>{const b=e.target.closest(".traitbtn");if(!b)return;$$('.traitbtn',traits).forEach(x=>x.classList.toggle('is-active',x===b));$("#labTraitDetail").textContent=`${b.dataset.traitLabel} · ${b.dataset.traitValue}`;});
  render(0);settle();schedule();
}

/* ---------- Card stack (vanilla port of AnimatedCardStack) ---------- */
const pad2 = n => String(n).padStart(2, "0");
function makeStack(deck, o) {
  const POS = [[12, 1], [-16, .95], [-44, .9]];
  let n = 0, cur = 0;
  const tf = (y, s) => `translateX(-50%) translateY(${y}px) scale(${s})`;
  const place = (el, k, instant) => {
    if (instant) el.style.transition = "none";
    const [y, s] = POS[k]; el.style.transform = tf(y, s); el.style.opacity = 1; el.style.zIndex = 3 - k; el.dataset.pos = k;
    el.inert = k !== 0; el.setAttribute("aria-hidden", String(k !== 0));
    if (instant) { void el.offsetWidth; el.style.transition = ""; }
  };
  const make = i => { const el = document.createElement("div"); el.className = "cstack__card"; el.innerHTML = o.render(i); o.mount && o.mount(el, i); return el; };
  const live = () => [...deck.children].filter(c => !c.dataset.gone).sort((a, b) => a.dataset.pos - b.dataset.pos);
  const drop = el => { el.dataset.gone = 1; el.inert = true; setTimeout(() => el.remove(), 850); };
  const vis = () => Math.min(3, n), out = () => deck.clientHeight + 40;
  const changed = () => o.onChange && o.onChange(cur, n);
  const enter = (el, y, s, op) => { el.style.transition = "none"; el.style.transform = tf(y, s); el.style.opacity = op; };
  return {
    reset(count, start = 0) {
      n = count; cur = n ? start % n : 0; deck.innerHTML = n ? "" : `<p class="cstack__empty">${o.empty || "Nothing here"}</p>`;
      for (let k = vis() - 1; k >= 0; k--) { const el = make((cur + k) % n); deck.append(el); place(el, k, true); }
      changed();
    },
    next() {
      if (n < 2) return;
      const cs = live(), front = cs[0], v = vis();
      drop(front); front.style.zIndex = 10; front.style.transform = tf(out(), 1);
      cs.slice(1, v).forEach((c, k) => place(c, k));
      const el = make((cur + v) % n); enter(el, -16, .9, 0); el.style.zIndex = 0; deck.prepend(el); void el.offsetWidth; el.style.transition = ""; place(el, v - 1);
      cur = (cur + 1) % n; changed();
    },
    prev() {
      if (n < 2) return;
      const cs = live(), v = vis(), back = cs[v - 1];
      drop(back); back.style.opacity = 0; back.style.transform = tf(-16, .9);
      cs.slice(0, v - 1).forEach((c, k) => place(c, k + 1));
      const el = make((cur - 1 + n) % n); enter(el, out(), 1, 1); deck.append(el); void el.offsetWidth; el.style.transition = ""; place(el, 0);
      cur = (cur - 1 + n) % n; changed();
    },
  };
}
const READ_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" aria-hidden="true"><path d="M9.5 18L15.5 12L9.5 6"/></svg>';
function specCard(i) {
  const s = SPECIMENS[i], bg = IMG.get(s.url)?.bg || "var(--lab-panel)";
  return `<div class="ccard__img" style="background:${bg}"><img src="${s.url}" alt="${esc(s.name)} specimen"></div>
    <div class="ccard__body"><div class="ccard__head"><div><span class="ccard__title">${esc(s.name)}</span><span class="ccard__sub">MF-606-${String(i + 1).padStart(3, "0")}</span></div></div>
    <dl class="ccard__dl">${TRAIT_KEYS.filter(([k]) => s[k]).map(([k, l]) => `<div><dt>${l}</dt><dd>${esc(s[k])}</dd></div>`).join("")}</dl></div>`;
}
function traitCard(c, i) {
  const it = c.items[i];
  return `<div class="ccard__img" style="background:${c.full ? "var(--violet)" : c.bg}"><canvas aria-label="${esc(it.n)}"></canvas></div>
    <div class="ccard__body"><div class="ccard__head"><div><span class="ccard__title">${esc(it.n)}</span><span class="ccard__sub">${esc(c.title)} · ${pad2(i + 1)} / ${pad2(c.items.length)}</span></div></div>
    <dl class="ccard__dl"><div><dt>Element</dt><dd>${c.num} · ${c.sym}</dd></div><div><dt>Group</dt><dd>${esc(c.groupName)}</dd></div><div><dt>Category</dt><dd>${esc(c.title)}</dd></div><div><dt>Types</dt><dd>${c.items.length}</dd></div>${c.note ? `<div class="ccard__wide"><dt>Note</dt><dd>${esc(c.note)}</dd></div>` : ""}</dl></div>`;
}
function drawCrop(cv, url, crop) {
  loadImg(url).then(rec => {
    const img = rec && rec.img; if (!img || !img.naturalWidth) return;
    const [x, y, w, h] = crop, k = img.naturalWidth / 44, S = 8;
    cv.width = w * S; cv.height = h * S;
    const ctx = cv.getContext("2d"); ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, x * k, y * k, w * k, h * k, 0, 0, w * S, h * S);
  });
}
const stackKeys = (el, stack) => el.addEventListener("keydown", e => {
  if (e.target.closest("input,textarea,[role=tab]")) return;
  if (e.key === "ArrowRight") { e.preventDefault(); stack.next(); } else if (e.key === "ArrowLeft") { e.preventDefault(); stack.prev(); }
});

/* ---------- Specimen shelves: one specimen card at a time ---------- */
function wall() {
  const deck = $("#wall");
  const tests = { all: () => true, costume: s => !!s.costume, melting: s => s.face === "Melting", jaw: s => s.face === "Exposed Jaw" };
  let list = SPECIMENS.map((_, i) => i);
  const stack = makeStack(deck, {
    render: k => specCard(list[k]), empty: "No specimens match",
    mount: el => { const box = el.querySelector(".ccard__img"), im = box.querySelector("img");
      const fill = () => { try { const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d"); x.drawImage(im, 0, 0, 1, 1, 0, 0, 1, 1); const d = x.getImageData(0, 0, 1, 1).data; if (d[3]) box.style.background = `rgb(${d[0]},${d[1]},${d[2]})`; } catch (e) {} };
      im.complete && im.naturalWidth ? fill() : im.addEventListener("load", fill, { once: true }); },
    onChange: (c, n) => {
      $("#wallInfo").textContent = n ? `${pad2(c + 1)} / ${pad2(n)}` : "0 / 0";
      $("#wallPrev").disabled = $("#wallNext").disabled = n < 2;
      $("#wallStatus").textContent = n ? `Specimen ${c + 1} of ${n}: ${SPECIMENS[list[c]].name}` : "No specimens";
    },
  });
  $("#wallPrev").addEventListener("click", () => stack.prev());
  $("#wallNext").addEventListener("click", () => stack.next());
  deck.addEventListener("click", e => { const r = e.target.closest("[data-read]"); if (r) document.dispatchEvent(new CustomEvent("mf:specimen", { detail: +r.dataset.read })); });
  $("#filters").addEventListener("click", e => {
    const btn = e.target.closest("[data-filter]"); if (!btn) return;
    $$("[data-filter]").forEach(b => { b.setAttribute("aria-pressed", String(b === btn)); b.classList.toggle("is-on", b === btn); });
    list = SPECIMENS.map((_, i) => i).filter(i => tests[btn.dataset.filter](SPECIMENS[i]));
    stack.reset(list.length);
  });
  stackKeys($("#specimens"), stack);
  stack.reset(list.length);
}

/* ---------- Mutation index (periodic table) ---------- */
const PT = [["background",1,"Bg","env"],0,0,0,["devil",11,"Dv","anom"],
  ["skin",2,"Sk","body"],["face",3,"Fc","body"],["ears",4,"Er","body"],["chest",5,"Ch","body"],["costume",6,"Cs","gear"],
  0,["eyes",7,"Ey","head"],["nose",8,"Ns","head"],["mouth",9,"Mo","head"],["weapon",10,"Wp","gear"]];
const GROUP = { env: "Environment", body: "Body", head: "Face features", gear: "Gear", anom: "Anomaly" };
PT.forEach(p => { if (p && p[0] !== "devil") Object.assign(INDEX.find(c => c.id === p[0]), { num: p[1], sym: p[2], group: p[3], groupName: GROUP[p[3]] }); });
function ptHTML() {
  const tiles = PT.map(p => {
    if (!p) return `<span class="el el--gap" aria-hidden="true"></span>`;
    const [id, num, sym, g] = p;
    if (id === "devil") return `<a class="el g-anom" href="#devil" aria-label="Devils, element 11, 2 one of ones"><span class="el__row"><span>11</span><span>2</span></span><span class="el__s">Dv</span><span class="el__name">Devil 1/1</span></a>`;
    const ci = INDEX.findIndex(c => c.id === id), c = INDEX[ci];
    return `<button class="ttab el g-${g}" type="button" role="tab" data-cat="${ci}" aria-selected="false" aria-label="${esc(c.title)}, element ${num}, ${c.items.length} types"><span class="el__row"><span>${num}</span><span>${c.items.length}</span></span><span class="el__s">${sym}</span><span class="el__name">${esc(c.title)}</span></button>`;
  }).join("");
  return `<div class="ptw">
    <div class="card" data-el-card>
      <div class="card__top"><span class="card__num" data-el-num></span><span class="card__mass" data-el-mass></span></div>
      <div class="card__sym" data-el-sym></div><div class="card__name" data-el-name></div>
      <div class="cstack__deck" data-el-stack></div>
      <div class="card__ctrl"><button class="arrow" type="button" data-el-prev aria-label="Previous variant"><i aria-hidden="true"></i></button>
        <div class="card__item" aria-live="polite"><b data-el-item></b><span data-el-pos></span></div>
        <button class="arrow arrow--next" type="button" data-el-next aria-label="Next variant"><i aria-hidden="true"></i></button></div>
    </div>
    <div><div class="pt" role="tablist" aria-label="Trait categories">${tiles}</div>
      <div class="legend" aria-hidden="true"><span><i class="g-env"></i>Environment</span><span><i class="g-body"></i>Body</span><span><i class="g-head"></i>Face features</span><span><i class="g-gear"></i>Gear</span><span><i class="g-anom"></i>Anomaly</span></div>
      <div class="rare" aria-label="Rarest traits"><span class="tag tag--lemon">10 Dragons</span><span class="tag tag--sky">4 Hammer-Gold Sharks</span><span class="tag tag--red">2 Devils</span></div></div>
  </div>`;
}
function index(root) {
  const q = s => root.querySelector(s);
  const tabs = [...root.querySelectorAll(".ttab")], card = q("[data-el-card]"), deck = q("[data-el-stack]");
  const order = tabs.map(t => +t.dataset.cat);
  let cat = INDEX.findIndex(c => c.id === "costume");
  const stack = makeStack(deck, {
    render: i => traitCard(INDEX[cat], i),
    mount: (el, i) => { const c = INDEX[cat]; drawCrop(el.querySelector("canvas"), c.items[i].f, c.crop); },
    onChange: (i, n) => { const c = INDEX[cat]; q("[data-el-item]").textContent = c.items[i].n; q("[data-el-pos]").textContent = `${pad2(i + 1)} / ${pad2(n)}${c.note ? " · " + c.note : ""}`; },
  });
  const render = () => {
    const c = INDEX[cat];
    card.className = "card g-" + c.group;
    q("[data-el-num]").textContent = c.num; q("[data-el-sym]").textContent = c.sym; q("[data-el-name]").textContent = c.title;
    q("[data-el-mass]").textContent = `${c.items.length} types · ${c.groupName}`;
    tabs.forEach(t => { const on = +t.dataset.cat === cat; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
    stack.reset(c.items.length);
  };
  q("[data-el-prev]").addEventListener("click", () => stack.prev());
  q("[data-el-next]").addEventListener("click", () => stack.next());
  root.addEventListener("click", e => { const t = e.target.closest(".ttab"); if (!t) return; cat = +t.dataset.cat; render(); });
  root.addEventListener("keydown", e => {
    if ((e.key !== "ArrowLeft" && e.key !== "ArrowRight") || !e.target.closest(".ttab")) return;
    e.preventDefault(); const k = (order.indexOf(cat) + (e.key === "ArrowRight" ? 1 : -1) + order.length) % order.length;
    cat = order[k]; render(); tabs[k].focus();
  });
  deck.addEventListener("click", () => stack.next());
  stackKeys(card, stack);
  render();
}

/* ---------- Nav ---------- */
function nav() {
  const burger = $("#burger"), links = $("#navLinks");
  const set = open => { links.classList.toggle("is-open", open); burger.setAttribute("aria-expanded", String(open)); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
  burger.addEventListener("click", () => set(!links.classList.contains("is-open")));
  links.addEventListener("click", e => e.target.closest("a") && set(false));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && links.classList.contains("is-open")) { set(false); burger.focus(); } });
  const map = new Map($$("a", links).map(a => [a.getAttribute("href").slice(1), a]));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { map.forEach(a => a.classList.remove("is-active")); map.get(e.target.id)?.classList.add("is-active"); } }), { rootMargin: "-45% 0px -50% 0px" });
  map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
}

/* ---------- Validation ---------- */
const RESERVED = new Set(["home","i","intent","share","search","explore","settings","messages","notifications","login","signup","tos","privacy","compose","hashtag"]);
function parseHandle(raw) {
  let s = raw.trim();
  if (!s) return { state: "empty" };
  const m = s.match(/^(?:https?:\/\/)?(?:www\.|mobile\.)?(?:x|twitter)\.com\/(?:#!\/)?@?([^\/?#\s]*)/i);
  if (m) s = m[1];
  else if (/[\/.]/.test(s) && /\.(com|net|io|xyz)/i.test(s)) return { state: "bad", msg: "That link isn't an x.com or twitter.com profile." };
  s = s.replace(/^@+/, "");
  if (!s) return { state: "bad", msg: "No handle found in that link." };
  if (s.length > 15) return { state: "bad", msg: "Too long. X handles are 15 characters max." };
  if (!/^[A-Za-z0-9_]{1,15}$/.test(s)) return { state: "bad", msg: "Only letters, numbers and _ are allowed." };
  if (RESERVED.has(s.toLowerCase())) return { state: "bad", msg: "That's an X page, not a profile." };
  return { state: "ok", value: s };
}

const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const BECH32 = 1, BECH32M = 0x2bc830a3;
function polymod(values) {
  const G = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  let chk = 1;
  for (const v of values) { const b = chk >>> 25; chk = ((chk & 0x1ffffff) << 5) ^ v; for (let i = 0; i < 5; i++) if ((b >>> i) & 1) chk ^= G[i]; }
  return chk >>> 0;
}
const hrpExpand = h => [...h].map(c => c.charCodeAt(0) >> 5).concat([0], [...h].map(c => c.charCodeAt(0) & 31));
function bechVerify(str, constant) {
  const pos = str.lastIndexOf("1"); if (pos < 1 || pos + 7 > str.length) return false;
  const hrp = str.slice(0, pos), data = [];
  for (const c of str.slice(pos + 1)) { const v = CHARSET.indexOf(c); if (v < 0) return false; data.push(v); }
  return polymod(hrpExpand(hrp).concat(data)) === constant;
}
function parseAddress(raw) {
  const s = raw.replace(/\s+/g, "");
  if (!s) return { state: "empty" };
  if (s !== s.toLowerCase() && s !== s.toUpperCase()) return { state: "bad", msg: "Mixed upper and lower case. Paste the address exactly as your wallet shows it." };
  const a = s.toLowerCase();
  if (/^t[13]/.test(a)) return { state: "bad", msg: "Transparent address not allowed. Paste your shielded u1 address." };
  if (/^(utest|ztestsapling)1/.test(a)) return { state: "bad", msg: "That's a testnet address. Paste a mainnet u1 address." };
  if (a.startsWith("zs1")) {
    if (!CONFIG.ALLOW_SAPLING) return { state: "bad", msg: "Sapling zs1 addresses aren't accepted. Paste your Unified u1 address." };
    if (a.length !== 78) return { state: "bad", msg: `A zs1 address is 78 characters. This one is ${a.length}.` };
    const bad = [...a.slice(3)].find(c => !CHARSET.includes(c));
    if (bad) return { state: "bad", msg: `"${bad}" can't appear in a Zcash address. Paste, don't type.` };
    if (!bechVerify(a, BECH32)) return { state: "bad", msg: "Checksum failed. A character is wrong or missing." };
    return { state: "ok", value: a, type: "sapling" };
  }
  if (!a.startsWith("u1")) return { state: "bad", msg: "Not a shielded Zcash address. It should start with u1." };
  const bad = [...a.slice(2)].find(c => !CHARSET.includes(c));
  if (bad) return { state: "bad", msg: `"${bad}" can't appear in a Zcash address. Paste, don't type.` };
  if (a.length < 106) return { state: "bad", msg: `Too short (${a.length} characters). The address looks cut off.` };
  if (!bechVerify(a, BECH32M)) return { state: "bad", msg: "Checksum failed. A character is wrong or missing." };
  return { state: "ok", value: a, type: "unified" };
}
const shortAddr = a => `${a.slice(0, 6)}…${a.slice(-4)}`;

/* ---------- Form ---------- */
function form() {
  const f = $("#form"), hIn = $("#xHandle"), aIn = $("#zAddr"), btn = $("#submitBtn"), status = $("#status");
  const hMsg = $("#xHandleMsg"), aMsg = $("#zAddrMsg"), hF = $("#fHandle"), aF = $("#fAddr");
  const hDef = hMsg.innerHTML, aDef = aMsg.innerHTML;
  let H = { state: "empty" }, A = { state: "empty" }, busy = false, lastOk = null;
  const setField = (field, msgEl, res, def, okText, touched) => {
    field.classList.toggle("is-good", res.state === "ok");
    field.classList.toggle("is-bad", res.state === "bad" && touched);
    field.querySelector(".input").setAttribute("aria-invalid", String(res.state === "bad" && touched));
    msgEl.innerHTML = res.state === "ok" ? `<span class="ok">${esc(okText)} ✓</span>` : res.state === "bad" && touched ? `<span class="err">${esc(res.msg)}</span>` : def;
  };
  const refresh = () => {
    btn.disabled = !(H.state === "ok" && A.state === "ok") || busy;
    $("#formSubject").textContent = H.state === "ok" ? "@" + H.value : "UNREGISTERED";
    $("#formAddrTag").textContent = A.state === "ok" ? `${shortAddr(A.value)} · ${A.type === "unified" ? "Unified" : "Sapling"} · shielded` : "Address pending";
    const n = (H.state === "ok") + (A.state === "ok");
    $("#serum1").classList.toggle("on", n >= 1); $("#serum2").classList.toggle("on", n >= 2); $("#serumPct").textContent = n + "/2";
    let target = "assets/devil-2.png";
    if (n === 2) { let h = 0; for (const c of A.value + H.value.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0; target = SPECIMENS[h % SPECIMENS.length].url; }
    setSpec(target);
  };
  const specEl = $("#formSpec");
  const setSpec = url => {
    const img = specEl.querySelector(":scope > img");
    if (img.getAttribute("src") === url) return;
    img.src = url; syncChannels(specEl._art); layoutArt(specEl._art);
    specEl.classList.toggle("is-live", url !== "assets/devil-2.png");
    if (!reduced()) { specEl.classList.add("is-glitch"); setTimeout(() => specEl.classList.remove("is-glitch"), 500); }
  };
  const touched = { h: false, a: false };
  const vH = () => { H = parseHandle(hIn.value); setField(hF, hMsg, H, hDef, H.value ? "@" + H.value : "", touched.h || H.state === "ok"); refresh(); };
  const vA = () => { A = parseAddress(aIn.value); setField(aF, aMsg, A, aDef, A.value ? shortAddr(A.value) : "", touched.a || A.state === "ok"); refresh(); };
  hIn.addEventListener("input", () => { if (hIn.value.length > 3) touched.h = true; vH(); });
  hIn.addEventListener("blur", () => { touched.h = !!hIn.value; if (H.state === "ok") hIn.value = "@" + H.value; vH(); });
  aIn.addEventListener("input", () => { touched.a = aIn.value.length > 2; vA(); });
  aIn.addEventListener("paste", () => setTimeout(() => { touched.a = true; aIn.value = aIn.value.replace(/\s+/g, ""); vA(); }, 0));
  aIn.addEventListener("blur", () => { touched.a = !!aIn.value; aIn.value = aIn.value.replace(/\s+/g, ""); vA(); });
  aIn.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); if (!btn.disabled) f.requestSubmit(); } });
  $("#pasteBtn").addEventListener("click", async () => {
    try { const t = await navigator.clipboard.readText(); aIn.value = t.replace(/\s+/g, ""); touched.a = true; vA(); aIn.focus(); }
    catch (e) { aIn.focus(); aMsg.innerHTML = `<span class="err">Clipboard blocked. Press Ctrl+V or ⌘V in the box.</span>`; }
  });

  const mutateArt = () => {
    const a = specEl, img = a.querySelector(":scope > img"), keep = img.getAttribute("src");
    if (reduced()) return;
    a.classList.add("is-glitch"); let n = 0;
    const iv = setInterval(() => { img.src = SPECIMENS[Math.floor(Math.random() * SPECIMENS.length)].url; syncChannels(a._art); layoutArt(a._art);
      if (++n > 9) { clearInterval(iv); img.src = keep; syncChannels(a._art); layoutArt(a._art); a.classList.remove("is-glitch"); } }, 90);
  };
  const setStatus = (kind, title, body = "", extra = "") => {
    status.className = "status status--" + kind;
    status.innerHTML = kind ? `<div class="status__box"><div class="status__t">${title}</div>${body ? `<p>${body}</p>` : ""}${extra}</div>` : "";
  };
  const shareUrl = handle => "https://x.com/intent/post?text=" + encodeURIComponent(
    `Just got mutated. @${handle} is registered for ${CONFIG.X_HANDLE} on Zcash.\n\nThe art is loud. The owners stay shielded.\n\n${CONFIG.SITE_URL}`);

  async function send(payload) {
    if (!CONFIG.SUBMIT_URL) {
      await new Promise(r => setTimeout(r, 1300));
      const key = "mf_demo_registrations"; let list = [];
      try { list = JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) {}
      if (list.includes(payload.zec_address)) return "duplicate";
      list.push(payload.zec_address); try { localStorage.setItem(key, JSON.stringify(list)); } catch (e) {}
      return "success";
    }
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 15000);
    try {
      const r = await fetch(CONFIG.SUBMIT_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: ctl.signal });
      let j = null; try { j = await r.json(); } catch (e) {}
      if (r.status === 409 || (j && (j.status === "duplicate" || j.duplicate === true))) return "duplicate";
      return r.ok ? "success" : "error";
    } catch (e) { return "error"; } finally { clearTimeout(to); }
  }

  f.addEventListener("submit", async e => {
    e.preventDefault();
    vH(); vA();
    if (busy || H.state !== "ok" || A.state !== "ok") return;
    if (lastOk === A.value) { setStatus("duplicate", "ALREADY MUTATED", "This address is already registered."); return; }
    busy = true; refresh(); btn.setAttribute("aria-busy", "true");
    setStatus("submitting", "INJECTING SERUM...", "", `<svg class="ld-ekg" viewBox="0 0 64 32" aria-hidden="true"><polyline points="0,16 14,16 20,6 28,26 34,16 64,16" /></svg>`);
    const hp = $("#hpField").value;
    const payload = { x_handle: H.value, zec_address: A.value, address_type: A.type, submitted_at: new Date().toISOString(), hp };
    const res = hp ? (await new Promise(r => setTimeout(r, 900)), "success") : await send(payload);
    busy = false; btn.removeAttribute("aria-busy");
    if (res === "success") {
      lastOk = A.value; mutateArt();
      setStatus("success", "SPECIMEN REGISTERED", `@${esc(H.value)} is on the allowlist with ${esc(shortAddr(A.value))}.`,
        `<a class="btn btn--sm" href="${shareUrl(H.value)}" target="_blank" rel="noopener"><svg width="14" height="14" aria-hidden="true" style="fill:currentColor"><use href="#i-x"/></svg>Share on X</a>`);
    } else if (res === "duplicate") {
      lastOk = A.value;
      setStatus("duplicate", "ALREADY MUTATED", "This address is already on the allowlist. No need to submit again.");
    } else {
      setStatus("error", "INJECTION FAILED", "The lab didn't respond. Your details are still here.", `<button class="btn btn--sm btn--ghost" type="button" id="retryBtn">Retry</button>`);
      $("#retryBtn").addEventListener("click", () => f.requestSubmit());
    }
    refresh();
  });
  [hIn, aIn].forEach(i => i.addEventListener("input", () => { if (status.classList.contains("status--error")) setStatus("", ""); }));
  vH(); vA();
}

/* ---------- Boot ---------- */
let revealed = false;
function reveal() {
  if (revealed) return; revealed = true;
  const loader = $("#loader"), page = $("#page");
  document.body.classList.remove("is-loading");
  page.classList.add("is-in");
  if (reduced() || document.hidden) { loader.remove(); return; }
  loader.classList.add("is-out");
  loader.addEventListener("animationend", () => loader.remove(), { once: true });
  setTimeout(() => loader.isConnected && loader.remove(), 1200);
}
setCell(); addEventListener("resize", setCell);
build();
let booted = false;
preload().then(() => {
  if (booted) return; booted = true;
  initArts();
  researchLab(); flaskLab(); wall(); $$("[data-pt]").forEach(index); nav(); devilCam(); form(); if ($("#hotlabSpots")) hotlab();
  requestAnimationFrame(() => requestAnimationFrame(reveal));
  setTimeout(reveal, 60);
});
window.MF = { parseHandle, parseAddress, bechVerify, polymod, CHARSET, BECH32M };
})();


/* ---------- Collapsible lab reports ---------- */
(() => {
  const reps = [...document.querySelectorAll(".report.is-collapsed, .report[data-collapsible]")];
  reps.forEach(r => r.setAttribute("data-collapsible", ""));
  const set = (r, open) => {
    r.classList.toggle("is-collapsed", !open);
    r.querySelector(".report__head")?.setAttribute("aria-expanded", String(open));
    if (open) requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
  };
  reps.forEach(r => {
    const head = r.querySelector(".report__head");
    head.addEventListener("click", e => { if (e.target.closest("[data-report-close]")) { e.stopPropagation(); set(r, false); return; } if (r.classList.contains("is-collapsed")) set(r, true); });
    head.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && r.classList.contains("is-collapsed")) { e.preventDefault(); set(r, true); } });
  });
  document.addEventListener("click", e => {
    const link = e.target.closest('a[href^="#"]');
    const target = link && reps.find(r => "#" + r.id === link.getAttribute("href"));
    if (target) { set(target, true); return; }
    if (e.target.closest('dialog, [role="dialog"], .hotdrawer, .sheet, .modal')) return;
    reps.forEach(r => { if (!r.classList.contains("is-collapsed") && !r.contains(e.target)) set(r, false); });
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") reps.forEach(r => set(r, false)); });
  const fromHash = () => { const r = reps.find(r => "#" + r.id === location.hash); if (r) set(r, true); };
  window.addEventListener("hashchange", fromHash); fromHash();
})();

/* scanline sweeps only across the anatomy NFT, top to bottom */
(()=>{const stage=document.getElementById("anatomyStage");if(!stage)return;const line=stage.querySelector(".scanline"),img=stage.querySelector(".anatomy__figure img");if(!line||!img)return;
const fit=()=>{const s=stage.getBoundingClientRect(),r=img.getBoundingClientRect();if(!r.height)return;const w=img.naturalWidth&&img.naturalHeight?Math.min(r.width,r.height*img.naturalWidth/img.naturalHeight):r.width,h=img.naturalWidth?w*img.naturalHeight/img.naturalWidth:r.height;
const x=r.left-s.left+(r.width-w)/2,y=r.top-s.top+(r.height-h);line.style.cssText=`left:${x}px;width:${w}px;right:auto;--st:${y}px;--sh:${h}px`;};
img.addEventListener("load",fit);new ResizeObserver(fit).observe(stage);new ResizeObserver(fit).observe(img);fit();})();

/* marquee ribbons over the lab reports: hidden while any report is open */
(()=>{const box=document.querySelector(".reports");if(!box)return;const sync=()=>box.classList.toggle("has-open",!!box.querySelector(".report:not(.is-collapsed)"));
new MutationObserver(sync).observe(box,{subtree:true,attributes:true,attributeFilter:["class"]});sync();})();
