(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const tableCode=localStorage.getItem('ft_table_code')||'—';

  const style=document.createElement('style');
  style.textContent=`
    body.ft-banker-shell{margin:0;background:#030303;color:#fff}
    .ft-banker-shell .landing{min-height:100vh;display:block;text-align:left;padding:0 0 0 252px}
    .ft-banker-shell .landing>.crown,.ft-banker-shell .landing>h1,.ft-banker-shell .landing>h2,.ft-banker-shell .landing>#tableLabel{display:none}
    .ft-banker-shell .panel.wide{width:min(1080px,calc(100% - 36px));max-width:none;margin:22px auto;padding:22px;background:#050505;border:1px solid #59491e;box-shadow:none}
    .banker-side{position:fixed;z-index:500;inset:0 auto 0 0;width:252px;background:linear-gradient(180deg,#090909,#030303 60%);border-right:1px solid #59491e;padding:18px 12px;overflow:auto;box-shadow:8px 0 30px #0008}
    .banker-brand{text-align:center;font-family:Georgia,serif;color:#d4af37;font-size:25px;line-height:1}.banker-brand span{display:block;color:#ff2d7a;font-style:italic;font-size:20px;margin-top:4px}
    .banker-profile{margin:18px 0 15px;padding:16px 12px;border:1px solid #ff2d7a;background:radial-gradient(circle at 50% 0,#3a0d23,#080808 65%);border-radius:12px;text-align:center;box-shadow:0 0 20px #ff2d7a22}
    .banker-avatar{width:68px;height:68px;margin:0 auto 8px;border-radius:50%;display:grid;place-items:center;border:2px solid #d4af37;font-size:35px;color:#d4af37;background:#090909;box-shadow:0 0 22px #d4af3733}
    .banker-role{color:#ff2d7a;font-size:11px;letter-spacing:2px;font-weight:800}.banker-name{font-family:Georgia,serif;font-size:20px;margin:3px 0}.banker-meta{font-size:11px;color:#cdbf9b;line-height:1.6}.banker-count{color:#d4af37;font-weight:800}
    .banker-menu a{display:flex;gap:9px;align-items:center;color:#eee;text-decoration:none;padding:11px 12px;border-radius:8px;border:1px solid transparent;margin:3px 0;font-size:13px}.banker-menu a:hover,.banker-menu a.active{background:#281018;border-color:#ff2d7a;color:#fff}.banker-menu .goldlink{color:#d4af37;border-color:#d4af3733}.banker-menu .pinklink{color:#ff2d7a;border-color:#ff2d7a33}.banker-menu .dangerlink{color:#ff809f;border-color:#7b102e55}
    .banker-side .session{margin-top:14px;padding-top:12px;border-top:1px solid #32280f}.banker-side button{font-size:11px;padding:10px;margin:5px 0}
    .banker-mobile-head{display:none}.banker-anchor{scroll-margin-top:18px}
    @media(max-width:820px){.ft-banker-shell .landing{padding-left:0;padding-top:70px}.banker-side{transform:translateX(-105%);transition:.2s;width:270px}.banker-side.open{transform:translateX(0)}.banker-mobile-head{display:flex;position:fixed;z-index:480;left:0;right:0;top:0;height:62px;background:#050505eF;border-bottom:1px solid #59491e;align-items:center;justify-content:space-between;padding:8px 12px}.banker-mobile-head b{font-family:Georgia,serif;color:#d4af37}.banker-mobile-head button{width:auto;padding:9px 12px;margin:0}.ft-banker-shell .panel.wide{width:calc(100% - 20px);margin:10px auto}.banker-side:after{content:'';position:fixed;left:270px;top:0;bottom:0;width:100vw;background:#0009;pointer-events:none}.banker-side:not(.open):after{display:none}}
  `;
  document.head.appendChild(style);
  document.body.classList.add('ft-banker-shell');
  const startInput=$('#startingCash');
  if(startInput && startInput.value==='10') startInput.value='50';

  function markSection(headingText,id){
    const el=$$('h2,h3').find(h=>h.textContent.toUpperCase().includes(headingText));
    if(!el)return;
    const section=el.closest('.section')||el.parentElement;
    section.id=id; section.classList.add('banker-anchor');
  }
  markSection('DIGITAL BANK MODE','bank-digital');
  markSection('WINNER / LOSER','bank-winner');
  markSection('BANKER LIVE ALERTS','bank-alerts');
  markSection('ISSUE CHILD SUPPORT','bank-support');
  markSection('TRANSFER TABLES','bank-transfer');
  markSection('PROPERTY RENT DEADLINES','bank-rent');
  markSection('ASSIGN NEW PROPERTY','bank-assign');
  markSection('TRANSACTION HISTORY','bank-history');
  const players=$('#players'); if(players){const p=players.parentElement;p.id='bank-players';p.classList.add('banker-anchor')}

  const side=document.createElement('aside');
  side.className='banker-side';
  side.innerHTML=`
    <div class="banker-brand">FORTUNE<span>TABLES</span></div>
    <section class="banker-profile">
      <div class="banker-avatar">♛</div>
      <div class="banker-role">MASTER BANKER</div>
      <div class="banker-name">THE BANKER</div>
      <div class="banker-meta">TABLE <b>${tableCode}</b><br><span class="banker-count" id="sidePlayerCount">0 / 6 PLAYERS</span><br>DIGITAL BANK + GAME CONTROL</div>
    </section>
    <nav class="banker-menu">
      <a class="active" href="#bank-players">▦ <span>DASHBOARD / PLAYERS</span></a>
      <a class="pinklink" href="#bank-digital">💳 <span>DIGITAL BANK</span></a>
      <a href="properties.html">🏛 <span>PROPERTY CONTROL</span></a>
      <a class="goldlink" href="auction.html">🔨 <span>AUCTIONS</span></a>
      <a href="#bank-rent">🏠 <span>RENT / REPOSSESSION</span></a>
      <a href="#bank-assign">🎁 <span>ISSUE / AWARD PROPERTY</span></a>
      <a href="#bank-transfer">↔ <span>TRANSFER TABLES</span></a>
      <a href="#bank-support">👶 <span>CHILD SUPPORT</span></a>
      <a href="#bank-alerts">🔔 <span>LIVE ALERTS</span></a>
      <a href="#bank-history">🧾 <span>TRANSACTION HISTORY</span></a>
      <a href="leaderboard.html">♛ <span>LEADERBOARD</span></a>
      <a class="goldlink" href="#bank-winner">🏆 <span>WINNER CONTROL</span></a>
      <a href="board.html">🎲 <span>DIGITAL BOARD</span></a>
      <a href="chat.html">💬 <span>LIVE CHAT</span></a>
    </nav>
    <div class="session"><button class="secondary" id="copyTableCode">COPY TABLE CODE</button><button class="dangerlink" id="bankerExit">EXIT BANKER SESSION</button></div>
  `;
  document.body.prepend(side);

  const mobile=document.createElement('div');
  mobile.className='banker-mobile-head';
  mobile.innerHTML=`<button id="bankMenuBtn">☰</button><b>♛ BANKER • ${tableCode}</b><button onclick="location.href='auction.html'">🔨</button>`;
  document.body.prepend(mobile);

  $('#bankMenuBtn')?.addEventListener('click',()=>side.classList.toggle('open'));
  $$('.banker-menu a',side).forEach(a=>a.addEventListener('click',()=>side.classList.remove('open')));
  $('#copyTableCode')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(tableCode);const b=$('#copyTableCode');b.textContent='COPIED ✓';setTimeout(()=>b.textContent='COPY TABLE CODE',1200)}catch{prompt('TABLE CODE',tableCode)}});
  $('#bankerExit')?.addEventListener('click',()=>{if(confirm('Exit the Banker session on this device?')){localStorage.removeItem('ft_banker_token');location.href='index.html'}});

  function syncProfile(){
    const count=(window.players&&Array.isArray(window.players))?window.players.length:$$('#players .player-card').length;
    const el=$('#sidePlayerCount'); if(el)el.textContent=`${count} / 6 PLAYERS`;
    const active=$('.banker-menu a.active',side); if(active)active.classList.remove('active');
    const hash=location.hash||'#bank-players';
    const match=$(`.banker-menu a[href="${hash}"]`,side); if(match)match.classList.add('active');
  }
  setInterval(syncProfile,1000); syncProfile();
  addEventListener('hashchange',syncProfile);
})();