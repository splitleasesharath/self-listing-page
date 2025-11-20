import React, { useEffect, useRef, useState } from 'react';

interface NightlyPriceSliderProps {
  initialP1?: number;
  initialDecay?: number;
  n2?: number;
  n3?: number;
  n4?: number;
  n5?: number;
  onPricesChange?: (data: {
    nightly: number[];
    cumulative: number[];
    total: number;
    decay: number;
    p1: number;
  }) => void;
}

export const NightlyPriceSlider: React.FC<NightlyPriceSliderProps> = ({
  initialP1 = 100,
  initialDecay = 0.95,
  n2,
  n3,
  n4,
  n5,
  onPricesChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mounted) return;

    const container = containerRef.current;
    const shadowRoot = container.attachShadow({ mode: 'open' });

    // Build the Shadow DOM content
    shadowRoot.innerHTML = `
      <style>
        :host { all: initial; }
        .app{ font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; color:#111827; background:#fff; max-width:1100px; width:100%; margin:0; padding:12px; box-sizing:border-box; }
        .row{ display:grid; grid-template-columns: 1fr auto auto; gap:16px; align-items:end; margin: 8px 0 16px; }
        .field{ display:grid; gap:6px; min-width:0; }
        .label{ font-size:13px; color:#6b7280; }
        .num{ font: inherit; padding:10px 12px; border-radius:12px; border:1px solid #e5e7eb; width:100%; box-sizing:border-box; }
        .spin{ display:inline-flex; align-items:center; gap:8px; width:100%; }
        .spin .buttons{ display:flex; flex-direction:column; }
        .spin .btn{ width:32px; height:24px; border:1px solid #e5e7eb; border-radius:8px; background:#fff; cursor:pointer; line-height:1; font-size:12px; }
        .spin .btn + .btn{ margin-top:6px; }

        .track-wrap{ position:relative; height:64px; }
        .track{ position:absolute; left:0; right:0; top:50%; transform:translateY(-50%); height:10px; background:linear-gradient(#9ea0a3,#9ea0a3) center/100% 10px no-repeat, #c9c9c9; border-radius:999px; }
        .ranges{ position:absolute; inset:0; display:grid; place-items:center; pointer-events:none; }
        .ranges input[type=range]{ pointer-events:auto; -webkit-appearance:none; appearance:none; position:absolute; top:50%; transform:translateY(-50%); background:transparent; height:36px; width:auto; }
        #slw-r1{ left:0; width:49%; }
        #slw-r5{ right:0; width:49%; }
        .ranges input[type=range]::-webkit-slider-runnable-track{ height:10px; background:transparent; }
        .ranges input[type=range]::-moz-range-track{ height:10px; background:transparent; }
        .ranges input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; appearance:none; width:34px; height:34px; border-radius:10px; background:#5b3bb3; border:0; box-shadow:0 6px 16px rgba(0,0,0,.12); cursor:pointer; margin-top:-12px; }
        .ranges input[type=range]::-moz-range-thumb{ width:34px; height:34px; border-radius:10px; background:#5b3bb3; border:0; box-shadow:0 6px 16px rgba(0,0,0,.12); cursor:pointer; }
        .tag{ position:absolute; top:0; transform:translateX(-50%); color:#111827; font-size:12px; font-weight:700; white-space:nowrap; }
        .value{ position:absolute; bottom:-18px; transform:translateX(-50%); font-size:14px; font-weight:600; }

        .grid{ margin-top:20px; border:1px solid #f1f5f9; border-radius:14px; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        table{ width:100%; min-width:420px; border-collapse:collapse; font-variant-numeric: tabular-nums; }
        th, td{ padding:12px 14px; text-align:right; border-top:1px solid #f1f5f9; }
        th:first-child, td:first-child{ text-align:left; }
        thead th{ background:#fafafa; color:#4b5563; font-weight:600; }

        @media (max-width: 640px){
          .row{ grid-template-columns: 1fr; gap:12px; }
          .spin{ gap:10px; }
          .spin .btn{ width:40px; height:32px; font-size:14px; }
          .track-wrap{ height:80px; }
          .ranges input[type=range]{ height:44px; }
          .ranges input[type=range]::-webkit-slider-thumb{ width:40px; height:40px; border-radius:12px; margin-top:-15px; }
          .ranges input[type=range]::-moz-range-thumb{ width:40px; height:40px; border-radius:12px; }
          .value{ bottom:-30px; font-size:15px; }
        }
        #slw-decay::-webkit-outer-spin-button,
        #slw-decay::-webkit-inner-spin-button{ -webkit-appearance:none; margin:0; }
        #slw-decay{ -moz-appearance:textfield; appearance:textfield; }
      </style>

      <div class="app">
        <div class="row">
          <div class="field">
            <div class="label">1-night price</div>
            <div class="spin">
              <input id="slw-p1" class="num" type="number" min="0" step="1" inputmode="numeric" value="100" />
              <div class="buttons">
                <button class="btn" id="slw-p1-up" aria-label="Increase 1-night">▲</button>
                <button class="btn" id="slw-p1-down" aria-label="Decrease 1-night">▼</button>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="label">Decay per additional night (0.700–1.000)</div>
            <div class="spin">
              <input id="slw-decay" class="num" type="number" min="0.7" max="1" step="0.001" inputmode="decimal" value="0.950" />
              <div class="buttons">
                <button class="btn" id="slw-decay-up" aria-label="Increase decay">▲</button>
                <button class="btn" id="slw-decay-down" aria-label="Decrease decay">▼</button>
              </div>
            </div>
          </div>
          <div class="field">
            <div class="label">5-night total</div>
            <input id="slw-total" class="num" type="text" inputmode="numeric" value="" readonly />
          </div>
        </div>

        <div class="track-wrap">
          <div class="track"></div>
          <div class="ranges">
            <input id="slw-r1" type="range" min="0" max="600" step="1" value="100" aria-label="1-night price" />
            <input id="slw-r5" type="range" min="0" max="2000" step="1" value="0" aria-label="5-night total" />

            <div id="slw-tag1" class="tag">1 night price</div>
            <div id="slw-val1" class="value">$100</div>
            <div id="slw-tag5" class="tag">5 night total</div>
            <div id="slw-val5" class="value">$0</div>
          </div>
        </div>

        <div class="grid">
          <table>
            <thead>
              <tr><th>Night</th><th>Price That Night</th><th>Cumulative Total</th></tr>
            </thead>
            <tbody id="slw-rows"></tbody>
          </table>
        </div>
      </div>
    `;

    // JavaScript logic (converted from the HTML document)
    const script = shadowRoot.ownerDocument.createElement('script');
    script.textContent = `
      (() => {
        const N = 5;
        const DECAY_MIN = 0.7;
        const DECAY_MAX = 1.0;

        const root = document.currentScript.getRootNode();
        const $ = sel => root.getElementById(sel);
        const fmt0 = n => n.toLocaleString(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0});
        const roundUp = n => Math.ceil(n);

        const p1El = $('slw-p1');
        const decayEl = $('slw-decay');
        const totalEl = $('slw-total');
        const r1 = $('slw-r1');
        const r5 = $('slw-r5');
        const rows = $('slw-rows');
        const tag1 = $('slw-tag1');
        const tag5 = $('slw-tag5');
        const val1 = $('slw-val1');
        const val5 = $('slw-val5');
        const p1Up = $('slw-p1-up');
        const p1Down = $('slw-p1-down');
        const dUp = $('slw-decay-up');
        const dDown = $('slw-decay-down');

        let nightly = Array(N).fill(0);
        let currentDecay = ${initialDecay};

        const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
        const sum = arr => arr.reduce((a,b)=>a+b,0);

        function sumSeries(p1, d) {
          if (Math.abs(1 - d) < 1e-10) return p1 * N;
          return p1 * (1 - Math.pow(d, N)) / (1 - d);
        }

        function solveDecay(p1, S) {
          if (p1 <= 0) return DECAY_MIN;
          const Smin = sumSeries(p1, DECAY_MIN);
          const Smax = sumSeries(p1, DECAY_MAX);
          const T = clamp(S, Smin, Smax);
          if (Math.abs(T - Smin) < 1e-6) return DECAY_MIN;
          if (Math.abs(T - Smax) < 1e-6) return DECAY_MAX;
          let lo = DECAY_MIN, hi = DECAY_MAX, mid;
          for (let i=0;i<50;i++) {
            mid = (lo+hi)/2;
            const Sm = sumSeries(p1, mid);
            if (Sm < T) lo = mid; else hi = mid;
          }
          return clamp((lo+hi)/2, DECAY_MIN, DECAY_MAX);
        }

        function updateBounds() {
          const p1 = +r1.value || 0;
          const minTotal = sumSeries(p1, DECAY_MIN);
          const maxTotal = sumSeries(p1, DECAY_MAX);
          r5.min = Math.round(minTotal);
          r5.max = Math.round(Math.max(maxTotal, minTotal));
        }

        function rebuildFrom(p1, d) {
          nightly[0] = roundUp(+p1);
          for (let k=1;k<N;k++) nightly[k] = roundUp(nightly[k-1] * d);
          syncUI();
        }

        function placeTags() {
          const wrap = root.querySelector('.ranges');
          const rectWrap = wrap.getBoundingClientRect();
          const pad = 12;
          const minGap = 84;

          const posOn = (input) => {
            const r = input.getBoundingClientRect();
            const min = +input.min, max = +input.max, val = +input.value;
            const t = (val - min) / (max - min || 1);
            return (r.left - rectWrap.left) + r.width * t;
          };

          let x1 = posOn(r1);
          let x5 = posOn(r5);

          const clampX = (x) => Math.max(pad, Math.min(rectWrap.width - pad, x));
          if (Math.abs(x1 - x5) < minGap) {
            const mid = (x1 + x5) / 2;
            x1 = mid - minGap / 2;
            x5 = mid + minGap / 2;
          }
          x1 = clampX(x1);
          x5 = clampX(x5);

          tag1.style.left = x1 + 'px';  val1.style.left = x1 + 'px';
          tag5.style.left = x5 + 'px';  val5.style.left = x5 + 'px';

          val1.textContent = fmt0(+r1.value);
          val5.textContent = fmt0(+r5.value);
        }

        function renderTable() {
          let cum = 0; const body = [];
          for (let i=0;i<N;i++) {
            cum += nightly[i];
            body.push(\`<tr><td>\${i+1}</td><td>\${fmt0(nightly[i])}</td><td>\${fmt0(cum)}</td></tr>\`);
          }
          rows.innerHTML = body.join('');
        }

        function broadcast() {
          const payload = {
            nightly: nightly.map(v => Math.round(v)),
            total: sum(nightly),
            decay: +currentDecay.toFixed(3),
            p1: Math.round(+p1El.value || +r1.value || nightly[0] || 0)
          };

          const cumulative = [];
          let running = 0;
          for (let v of payload.nightly){
            running += v;
            cumulative.push(running);
          }

          // Dispatch to parent React component
          const event = new CustomEvent('nightly-prices-update', {
            detail: { ...payload, cumulative },
            bubbles: true,
            composed: true
          });
          root.host.dispatchEvent(event);
        }

        function syncUI() {
          const p1 = nightly[0];
          const total = sum(nightly);
          p1El.value = Math.round(p1);
          decayEl.value = currentDecay.toFixed(3);
          totalEl.value = Math.round(total);
          r1.value = Math.round(p1);
          updateBounds();
          const Sclamped = clamp(total, +r5.min, +r5.max);
          r5.value = Math.round(Sclamped);
          placeTags();
          renderTable();
          broadcast();
        }

        function commitP1() {
          const raw = (p1El.value||'').trim(); if (!raw) return;
          const p1 = Math.max(0, parseFloat(raw)); if (!isFinite(p1)) return;
          const d = currentDecay;
          rebuildFrom(p1, d);
        }

        function commitDecay() {
          const raw = (decayEl.value||'').trim(); if (!raw) return;
          let d = parseFloat(raw); if (!isFinite(d)) return;
          d = clamp(d, DECAY_MIN, DECAY_MAX);
          currentDecay = d;
          const p1 = Math.max(0, parseFloat(p1El.value||r1.value||'0'));
          rebuildFrom(p1, d);
        }

        function onDragP1(val) {
          const p1 = Math.max(0, val);
          updateBounds();
          const Sfixed = clamp(+r5.value || 0, +r5.min, +r5.max);
          const d = solveDecay(p1, Sfixed);
          currentDecay = d;
          rebuildFrom(p1, d);
          r5.value = Math.round(Sfixed);
          placeTags();
        }

        function onDragTotal(Sval) {
          const p1 = +r1.value || 0;
          updateBounds();
          const S = clamp(Sval, +r5.min, +r5.max);
          const d = solveDecay(p1, S);
          currentDecay = d;
          rebuildFrom(p1, d);
          r1.value = Math.round(p1);
          placeTags();
        }

        // Events
        p1El.addEventListener('keydown', e => { if (e.key === 'Enter') commitP1(); });
        p1El.addEventListener('blur', commitP1);
        decayEl.addEventListener('input', commitDecay);
        decayEl.addEventListener('change', commitDecay);
        decayEl.addEventListener('keydown', e => { if (e.key === 'Enter') commitDecay(); });
        decayEl.addEventListener('blur', commitDecay);
        r1.addEventListener('input', () => onDragP1(parseFloat(r1.value)));
        r5.addEventListener('input', () => onDragTotal(parseFloat(r5.value)));

        // Spinners
        p1Up.addEventListener('click', () => { p1El.value = Math.round(+p1El.value||0) + 1; commitP1(); });
        p1Down.addEventListener('click', () => { p1El.value = Math.max(0, Math.round(+p1El.value||0) - 1); commitP1(); });
        dUp.addEventListener('click', () => {
          currentDecay = clamp(currentDecay + 0.001, DECAY_MIN, DECAY_MAX);
          decayEl.value = currentDecay.toFixed(3);
          const p1 = Math.max(0, parseFloat(p1El.value||r1.value||'0'));
          rebuildFrom(p1, currentDecay);
        });
        dDown.addEventListener('click', () => {
          currentDecay = clamp(currentDecay - 0.001, DECAY_MIN, DECAY_MAX);
          decayEl.value = currentDecay.toFixed(3);
          const p1 = Math.max(0, parseFloat(p1El.value||r1.value||'0'));
          rebuildFrom(p1, currentDecay);
        });

        // Resize observer
        const ro = new ResizeObserver(() => placeTags());
        ro.observe(root.host);

        // Initialize
        const p1 = ${initialP1};
        const d = ${initialDecay};
        currentDecay = d;
        nightly = Array(N).fill(0);
        nightly[0] = p1;
        for (let i=1;i<N;i++) nightly[i] = roundUp(nightly[i-1]*d);
        r1.value = Math.round(p1);
        r5.value = Math.round(sumSeries(p1,d));
        syncUI();
      })();
    `;
    shadowRoot.appendChild(script);

    setMounted(true);

    // Listen for price updates from Shadow DOM
    const handlePriceUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (onPricesChange && customEvent.detail) {
        onPricesChange(customEvent.detail);
      }
    };

    container.addEventListener('nightly-prices-update', handlePriceUpdate);

    return () => {
      container.removeEventListener('nightly-prices-update', handlePriceUpdate);
    };
  }, [mounted, initialP1, initialDecay, onPricesChange]);

  return <div ref={containerRef} style={{ width: '100%', minHeight: '400px' }} />;
};
