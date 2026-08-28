import{w as y}from"./Base.astro_astro_type_script_index_0_lang.65xM_WgJ.js";function v(a){const u=y(a,"Entropy, cross-entropy & KL, hands on");u.innerHTML=`
    <div class="w-row" style="gap:2rem;align-items:flex-start;flex-wrap:wrap">
      <div style="flex:1;min-width:230px">
        <div style="font-weight:600;font-size:0.8rem;margin-bottom:0.3rem">true distribution p (drag bars)</div>
        <div id="ep-p" style="display:flex;gap:0.6rem;align-items:flex-end;height:150px"></div>
      </div>
      <div style="flex:1;min-width:230px">
        <div style="font-weight:600;font-size:0.8rem;margin-bottom:0.3rem">model's distribution q (drag bars)</div>
        <div id="ep-q" style="display:flex;gap:0.6rem;align-items:flex-end;height:150px"></div>
      </div>
    </div>
    <div id="ep-table" style="overflow-x:auto;margin-top:0.6rem"></div>
    <div class="w-row"><span class="w-out" id="ep-out"></span></div>
    <div class="w-row" style="font-size:0.78rem;color:var(--ink-faint)">
      Make q match p and watch the KL term hit zero — cross-entropy can never go below the entropy of p.
      Now make q confidently wrong about a symbol p actually uses, and watch the −p·log q penalty explode:
      that is exactly the loss a language model pays for putting low probability on the token that occurred.
    </div>`;const f=["a","b","c","d"],r=[.55,.25,.15,.05],l=[.25,.25,.25,.25];function x(e,o){const s=e.reduce((t,n,c)=>c===o?t:t+n,0),d=s>0?(1-e[o])/s:0;for(let t=0;t<e.length;t++)t!==o&&(e[t]=Math.max(.01,e[t]*d));const p=e.reduce((t,n)=>t+n,0);for(let t=0;t<e.length;t++)e[t]/=p}function h(e,o,s){const d=a.querySelector(`#${e}`);d.innerHTML="",o.forEach((p,t)=>{const n=document.createElement("div");n.style.cssText="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;gap:0.2rem";const c=document.createElement("div");c.style.cssText=`width:100%;max-width:56px;background:${s};border-radius:4px 4px 0 0;height:${Math.max(3,p*118)}px;cursor:ns-resize;touch-action:none`,c.dataset.i=String(t),c.dataset.dist=e;const m=document.createElement("div");m.style.cssText="font-family:var(--font-mono);font-size:0.72rem;color:var(--ink-soft)",m.textContent=`${f[t]} ${(p*100).toFixed(0)}%`,n.append(c,m),d.appendChild(n)})}let i=null;a.addEventListener("pointerdown",e=>{const o=e.target;o.dataset.dist&&(i={dist:o.dataset.dist==="ep-p"?r:l,i:Number(o.dataset.i)},e.target.setPointerCapture(e.pointerId),e.preventDefault())}),a.addEventListener("pointermove",e=>{i&&(i.dist[i.i]=Math.min(.97,Math.max(.01,i.dist[i.i]-e.movementY/118)),x(i.dist,i.i),g())}),a.addEventListener("pointerup",()=>i=null);function g(){h("ep-p",r,"#14b8a6"),h("ep-q",l,"#818cf8");const e=t=>Math.log2(t);let o=0,s=0,d="";for(let t=0;t<4;t++){const n=-e(l[t]);o+=-r[t]*e(r[t]),s+=-r[t]*e(l[t]),d+=`<tr>
        <td>${f[t]}</td><td>${r[t].toFixed(2)}</td><td>${l[t].toFixed(2)}</td>
        <td>${(-e(r[t])).toFixed(2)}</td><td>${n.toFixed(2)}</td>
        <td>${(-r[t]*e(l[t])).toFixed(3)}</td></tr>`}const p=s-o;a.querySelector("#ep-table").innerHTML=`
      <table style="border-collapse:collapse;font-family:var(--font-mono);font-size:0.72rem;width:100%">
        <tr style="opacity:0.65"><th>sym</th><th>p</th><th>q</th><th>surprise −log₂p</th><th>surprise −log₂q</th><th>−p·log₂q</th></tr>
        ${d}
      </table>
      <style>#ep-table td, #ep-table th { border:1px solid var(--line); padding:0.2rem 0.5rem; text-align:center }</style>`,a.querySelector("#ep-out").innerHTML=`H(p) = <strong>${o.toFixed(3)}</strong> bits · H(p,q) = <strong>${s.toFixed(3)}</strong> bits · KL(p‖q) = H(p,q) − H(p) = <strong>${p.toFixed(3)}</strong> bits of pure waste`}g()}export{v as default};
