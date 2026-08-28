import{w}from"./Base.astro_astro_type_script_index_0_lang.65xM_WgJ.js";function E(p){const g=w(p,"Sampling strategies, side by side");g.innerHTML=`
    <div class="w-row">
      <label>temperature <strong><span id="sp-tv">1.0</span></strong></label>
      <input type="range" id="sp-t" min="-1" max="0.7" step="0.01" value="0" style="flex:1;min-width:110px" />
      <label>method
        <select id="sp-m">
          <option value="none">none (full softmax)</option>
          <option value="topk" selected>top-k</option>
          <option value="topp">top-p (nucleus)</option>
          <option value="minp">min-p</option>
          <option value="greedy">greedy</option>
        </select>
      </label>
      <label id="sp-kwrap">k = <strong><span id="sp-kv">4</span></strong> <input type="range" id="sp-k" min="1" max="10" value="4" style="width:90px"></label>
      <label id="sp-pwrap" style="display:none">p = <strong><span id="sp-pv">0.90</span></strong> <input type="range" id="sp-p" min="0.5" max="1" step="0.01" value="0.9" style="width:90px"></label>
      <label id="sp-mpwrap" style="display:none">min-p = <strong><span id="sp-mpv">0.10</span></strong> <input type="range" id="sp-mp" min="0.01" max="0.5" step="0.01" value="0.1" style="width:90px"></label>
    </div>
    <div id="sp-bars" style="display:flex;gap:0.45rem;align-items:flex-end;height:190px;padding:0.4rem 0"></div>
    <div class="w-row">
      <button id="sp-sample">Sample 20 tokens</button>
      <span class="w-out" id="sp-out"></span>
    </div>
    <div id="sp-samples" style="font-family:var(--font-mono);font-size:0.78rem;line-height:2;min-height:1.6rem"></div>
    <div class="w-row" style="font-size:0.78rem;color:var(--ink-faint)">
      Faded bars are tokens the method cut; the surviving bars are renormalized (teal) before sampling.
      Raise the temperature with top-p on and watch the nucleus widen adaptively — then compare with a fixed top-k, which can't adapt to the distribution's shape.
    </div>`;const v=["Paris","the","a","located","known","France","also","one","home","still"],x=[4.2,1.8,1.2,.9,.6,.3,.1,-.1,-.3,-.5],n=o=>p.querySelector(`#${o}`);function b(){const o=Math.pow(10,Number(n("sp-t").value)),r=n("sp-m").value,m=Math.max(...x),d=x.map(e=>Math.exp((e-m)/o)),a=d.reduce((e,t)=>e+t,0),s=d.map(e=>e/a),c=s.map((e,t)=>t).sort((e,t)=>s[t]-s[e]),i=new Set;if(r==="greedy")i.add(c[0]);else if(r==="topk"){const e=Number(n("sp-k").value);c.slice(0,e).forEach(t=>i.add(t))}else if(r==="topp"){const e=Number(n("sp-p").value);let t=0;for(const l of c)if(i.add(l),t+=s[l],t>=e)break}else if(r==="minp"){const t=Number(n("sp-mp").value)*s[c[0]];c.forEach(l=>s[l]>=t&&i.add(l))}else c.forEach(e=>i.add(e));const u=Array.from(i).reduce((e,t)=>e+s[t],0),h=s.map((e,t)=>i.has(t)?e/u:0);return{T:o,probs:s,kept:i,finalProbs:h}}function f(){const{T:o,probs:r,kept:m,finalProbs:d}=b();n("sp-tv").textContent=o.toFixed(2),n("sp-kv").textContent=n("sp-k").value,n("sp-pv").textContent=Number(n("sp-p").value).toFixed(2),n("sp-mpv").textContent=Number(n("sp-mp").value).toFixed(2);const a=n("sp-m").value;p.querySelector("#sp-kwrap").style.display=a==="topk"?"":"none",p.querySelector("#sp-pwrap").style.display=a==="topp"?"":"none",p.querySelector("#sp-mpwrap").style.display=a==="minp"?"":"none";const s=p.querySelector("#sp-bars");s.innerHTML="",v.forEach((i,u)=>{const h=document.createElement("div");h.style.cssText="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%;gap:0.2rem;min-width:0";const e=m.has(u),t=document.createElement("div");t.style.cssText=`width:100%;max-width:44px;border-radius:4px 4px 0 0;transition:height 0.1s;
        height:${Math.max(2,(e?d[u]:r[u])*150)}px;
        background:${e?"#14b8a6":"var(--line-strong)"};opacity:${e?1:.55}`;const l=document.createElement("div");l.style.cssText="font-family:var(--font-mono);font-size:0.66rem;color:var(--ink-soft);overflow:hidden;text-overflow:ellipsis;max-width:100%",l.textContent=i;const y=document.createElement("div");y.style.cssText="font-family:var(--font-mono);font-size:0.62rem;color:var(--ink-faint)",y.textContent=e?(d[u]*100).toFixed(0)+"%":"·",h.append(t,l,y),s.appendChild(h)});const c=Array.from(m).length;p.querySelector("#sp-out").textContent=`${c} of ${v.length} tokens can be sampled`}p.querySelector("#sp-sample").addEventListener("click",()=>{const{finalProbs:o}=b(),r=[];for(let m=0;m<20;m++){let d=Math.random();for(let a=0;a<o.length;a++)if(d-=o[a],d<=0){r.push(v[a]);break}}p.querySelector("#sp-samples").textContent=r.join(" · ")}),["sp-t","sp-k","sp-p","sp-mp"].forEach(o=>n(o).addEventListener("input",f)),p.querySelector("#sp-m").addEventListener("change",f),f()}export{E as default};
