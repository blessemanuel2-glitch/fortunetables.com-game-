(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const tableCode=localStorage.getItem('ft_table_code')||'—';

  const style=document.createElement('style');
  style.textContent=`
    body.ft-banker-shell{margin:0;background:#030303;color:#fff}
    .ft-banker-shell .landing{min-height:100vh;display:block;text-align:left;padding:0 0 0 252px}
    .ft-banker-shell .landing>.crown,.ft-banker-shell .landing>h1,.ft-banker-shell .landing>h2,.ft-banker-shell .landing>#tableLabel{display:none}
    .ft-banker-shell .panel.wide{width:min(1120px,calc(100% - 36px));max-width:none;margin:22px auto;padding:22px;background:#050505;border:1px solid #59491e;box-shadow:none;border-radius:16px}
    .banker-side{position:fixed;z-index:500;inset:0 auto 0 0;width:252px;background:linear-gradient(180deg,#090909,#030303 60%);border-right:1px solid #59491e;padding:18px 12px;overflow:auto;box-shadow:8px 0 30px #0008}
    .banker-brand{text-align:center;font-family:Georgia,serif;color:#d4af37;font-size:25px;line-height:1}.banker-brand span{display:block;color:#ff2d7a;font-style:italic;font-size:20px;margin-top:4px}
    .banker-profile{margin:18px 0 15px;padding:16px 12px;border:1px solid #ff2d7a;background:radial-gradient(circle at 50% 0,#3a0d23,#080808 65%);border-radius:12px;text-align:center;box-shadow:0 0 20px #ff2d7a22}
    .banker-avatar{width:68px;height:68px;margin:0 auto 8px;border-radius:50%;display:grid;place-items:center;border:2px solid #d4af37;font-size:35px;color:#d4af37;background:#090909;box-shadow:0 0 22px #d4af3733}
    .banker-role{color:#ff2d7a;font-size:11px;letter-spacing:2px;font-weight:800}.banker-name{font-family:Georgia,serif;font-size:20px;margin:3px 0}.banker-meta{font-size:11px;color:#cdbf9b;line-height:1.6}.banker-count{color:#d4af37;font-weight:800}
    .banker-menu a{display:flex;gap:9px;align-items:center;color:#eee;text-decoration:none;padding:11px 12px;border-radius:8px;border:1px solid transparent;margin:3px 0;font-size:13px}.banker-menu a:hover,.banker-menu a.active{background:#281018;border-color:#ff2d7a;color:#fff}.banker-menu .goldlink{color:#d4af37;border-color:#d4af3733}.banker-menu .pinklink{color:#ff2d7a;border-color:#ff2d7a33}.banker-menu .purplelink{color:#b896ff;border-color:#8d55ff55}.banker-menu .dangerlink{color:#ff809f;border-color:#7b102e55;background:#16060c}
    .banker-side .session{margin-top:14px;padding-top:12px;border-top:1px solid #32280f}.banker-side button{font-size:11px;padding:10px;margin:5px 0}
    .banker-mobile-head{display:none}.banker-anchor{scroll-margin-top:18px}
    .approval-panel,.repo-panel,.messy-panel{border-top:1px solid #59491e;margin-top:22px;padding-top:18px}.approval-panel h3,.repo-panel h3,.messy-panel h3{color:#d4af37}.approval-list,.repo-list{display:grid;gap:10px}.approval-card,.repo-card{border:1px solid #d4af37;background:linear-gradient(145deg,#120d03,#070707);padding:14px;border-radius:10px}.approval-card .requester,.repo-card .requester{color:#ff2d7a;font-weight:800}.approval-card .price,.repo-card .price{color:#d4af37;font-family:Georgia,serif;font-size:20px}.approval-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.approval-actions .approve{background:#1f6f3e;border-color:#46c978;color:#fff}.approval-actions .decline{background:#7b102e;border-color:#ff2d7a;color:#fff}.approval-empty,.repo-empty{border:1px dashed #59491e;padding:14px;color:#aaa;border-radius:8px}.repo-card{border-color:#ff2d7a;background:linear-gradient(145deg,#1b070d,#070707)}.repo-badge{display:inline-block;border:1px solid #ff2d7a;color:#ff7ca9;background:#230811;padding:5px 8px;border-radius:999px;font-size:10px;letter-spacing:1px;font-weight:800}.repo-btn{background:linear-gradient(135deg,#7b102e,#ba1748);border-color:#ff2d7a;color:#fff;margin-top:10px}
    .messy-panel{border:1px solid #ff2d7a55;border-top:2px solid #ff2d7a;background:radial-gradient(circle at 90% 0,#370b1d,#090909 55%);padding:18px;border-radius:14px}.messy-head{display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap}.messy-badge{border:1px solid #ff2d7a;color:#ff8bb5;background:#210812;border-radius:999px;padding:5px 8px;font-size:10px;font-weight:900;letter-spacing:1px}.messy-grid{display:grid;grid-template-columns:1.3fr .8fr 1.5fr auto;gap:8px;align-items:end}.messy-grid label{font-size:10px;color:#b7aa87;letter-spacing:1px}.messy-grid input,.messy-grid select{margin-top:4px}.double-btn{background:linear-gradient(135deg,#5b001f,#c31859);border-color:#ff2d7a;color:white;white-space:nowrap}.messy-preview{margin-top:9px;color:#ff8bb5;font-size:12px;font-weight:800}
    @media(max-width:980px){.messy-grid{grid-template-columns:1fr 1fr}.messy-grid .reason{grid-column:1/-1}.messy-grid .double-btn{grid-column:1/-1}}
    @media(max-width:820px){.ft-banker-shell .landing{padding-left:0;padding-top:70px}.banker-side{transform:translateX(-105%);transition:.2s;width:280px}.banker-side.open{transform:translateX(0)}.banker-mobile-head{display:flex;position:fixed;z-index:480;left:0;right:0;top:0;height:62px;background:#050505f5;border-bottom:1px solid #59491e;align-items:center;justify-content:space-between;padding:8px 12px;backdrop-filter:blur(14px)}.banker-mobile-head b{font-family:Georgia,serif;color:#d4af37}.banker-mobile-head button{width:auto;padding:9px 12px;margin:0}.ft-banker-shell .panel.wide{width:calc(100% - 20px);margin:10px auto;padding:16px}.banker-side:after{content:'';position:fixed;left:280px;top:0;bottom:0;width:100vw;background:#0009;pointer-events:none}.banker-side:not(.open):after{display:none}}
    @media(max-width:560px){.messy-grid{grid-template-columns:1fr}.messy-grid .reason,.messy-grid .double-btn{grid-column:auto}.approval-actions{grid-template-columns:1fr}}
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

  const approvalSection=document.createElement('div');
  approvalSection.className='approval-panel banker-anchor';
  approvalSection.id='bank-home-approvals';
  approvalSection.innerHTML=`<h3>🏠 HOME / PROPERTY APPROVALS</h3><p><small>When a player requests to buy a Bank-owned home or property, approve or decline it here. APPROVE charges the listed price and transfers the property automatically.</small></p><div id="homeApprovalList" class="approval-list"><div class="approval-empty">No pending home requests.</div></div>`;
  const playerHeading=$$('h3').find(h=>h.textContent.toUpperCase().includes('BANKER DASHBOARD'));
  if(playerHeading) playerHeading.before(approvalSection);
  else $('.panel.wide')?.appendChild(approvalSection);

  const repoSection=document.createElement('div');
  repoSection.className='repo-panel banker-anchor';
  repoSection.id='bank-stolen-repo';
  repoSection.innerHTML=`<h3>🏦 STOLEN PROPERTY REPOSSESSION</h3><p><small>Properties a thief successfully escaped with stay flagged as stolen while that thief still owns them. The Bank can repossess any flagged property and return it to Bank ownership.</small></p><div id="stolenRepoList" class="repo-list"><div class="repo-empty">No stolen properties eligible for repossession.</div></div>`;
  approvalSection.after(repoSection);

  const messySection=document.createElement('div');
  messySection.className='messy-panel banker-anchor';
  messySection.id='bank-messy';
  messySection.innerHTML=`<div class="messy-head"><div><h3 style="margin:0">😈 MESSY BANKER</h3><small>The Banker can hit a player with a double charge. If they cannot cover it, the unpaid part becomes debt.</small></div><span class="messy-badge">BANKER POWER</span></div><div class="messy-grid"><label>PLAYER<select id="messyPlayer"><option>Loading players...</option></select></label><label>BASE CHARGE<input id="messyAmount" type="number" min="1" value="2"></label><label class="reason">REASON<input id="messyReason" maxlength="120" value="Banker got messy"></label><button id="messyChargeBtn" class="double-btn">😈 DOUBLE CHARGE</button></div><div id="messyPreview" class="messy-preview">2 TABLES becomes a 4 TABLES charge.</div>`;
  repoSection.after(messySection);

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
      <a class="dangerlink" href="#bank-messy">😈 <span>MESSY BANKER</span></a>
      <a class="goldlink" href="#bank-home-approvals">🏠 <span>HOME APPROVALS</span></a>
      <a class="dangerlink" href="#bank-stolen-repo">🏦 <span>REPO STOLEN PROPERTY</span></a>
      <a href="properties.html">🏛 <span>PROPERTY CONTROL</span></a>
      <a class="dangerlink" href="theft.html">🚨 <span>CATCH PROPERTY THIEVES</span></a>
      <a class="purplelink" href="market-crash.html">📉 <span>MARKET CRASH DECK</span></a>
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
  mobile.innerHTML=`<button id="bankMenuBtn">☰</button><b>♛ BANKER • ${tableCode}</b><button onclick="location.href='#bank-messy'">😈</button>`;
  document.body.prepend(mobile);

  $('#bankMenuBtn')?.addEventListener('click',()=>side.classList.toggle('open'));
  $$('.banker-menu a',side).forEach(a=>a.addEventListener('click',()=>side.classList.remove('open')));
  $('#copyTableCode')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(tableCode);const b=$('#copyTableCode');b.textContent='COPIED ✓';setTimeout(()=>b.textContent='COPY TABLE CODE',1200)}catch{prompt('TABLE CODE',tableCode)}});
  $('#bankerExit')?.addEventListener('click',()=>{if(confirm('Exit the Banker session on this device?')){localStorage.removeItem('ft_banker_token');location.href='index.html'}});

  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  async function loadHomeApprovals(){
    const list=$('#homeApprovalList');
    if(!list || typeof db==='undefined' || typeof token==='undefined')return;
    const {data,error}=await db.rpc('ft_get_banker_property_requests',{p_banker_token:token});
    if(error){list.innerHTML=`<div class="approval-empty">${esc(error.message)}</div>`;return}
    const rows=data||[];
    list.innerHTML=rows.length?rows.map(r=>`<article class="approval-card"><div class="requester">${esc(r.player_name)} WANTS TO BUY</div><h4 style="margin:5px 0">${esc(r.property_name)}</h4><div class="price">${r.price} TABLES</div><div><small>RENT ${r.rent} TABLES • REQUESTED ${new Date(r.created_at).toLocaleString()}</small></div><div class="approval-actions"><button class="approve" data-request="${r.request_id}" data-name="${esc(r.property_name)}" data-player="${esc(r.player_name)}">✓ ACCEPT</button><button class="decline" data-request="${r.request_id}" data-name="${esc(r.property_name)}" data-player="${esc(r.player_name)}">✕ DECLINE</button></div></article>`).join(''):'<div class="approval-empty">No pending home or property requests.</div>';
    $$('.approval-actions .approve',list).forEach(b=>b.addEventListener('click',()=>respondHomeRequest(Number(b.dataset.request),true,b.dataset.name,b.dataset.player)));
    $$('.approval-actions .decline',list).forEach(b=>b.addEventListener('click',()=>respondHomeRequest(Number(b.dataset.request),false,b.dataset.name,b.dataset.player)));
  }
  async function respondHomeRequest(requestId,approve,propertyName,playerName){
    if(!confirm(`${approve?'ACCEPT':'DECLINE'} ${playerName}'s request for ${propertyName}?`))return;
    const {error}=await db.rpc('ft_banker_respond_property_request',{p_banker_token:token,p_request_id:requestId,p_approve:approve});
    const messageEl=$('#message');
    if(messageEl)messageEl.textContent=error?error.message:(approve?`✓ APPROVED: ${playerName} now owns ${propertyName}.`:`✕ DECLINED: ${playerName}'s request for ${propertyName}.`);
    if(!error){await loadHomeApprovals(); if(typeof load==='function')load();}
  }

  async function loadStolenRepos(){
    const list=$('#stolenRepoList');
    if(!list || typeof db==='undefined' || typeof token==='undefined')return;
    const {data,error}=await db.rpc('ft_get_banker_stolen_properties',{p_banker_token:token});
    if(error){list.innerHTML=`<div class="repo-empty">${esc(error.message)}</div>`;return}
    const rows=data||[];
    list.innerHTML=rows.length?rows.map(r=>`<article class="repo-card"><span class="repo-badge">STOLEN / ESCAPED</span><div class="requester" style="margin-top:8px">HELD BY ${esc(r.thief_name)}</div><h4 style="margin:5px 0">${esc(r.property_name)}</h4><div class="price">VALUE ${r.price} TABLES</div><div><small>${esc(r.category||'PROPERTY')} • RENT ${r.rent} TABLES • ESCAPED ${r.escaped_at?new Date(r.escaped_at).toLocaleString():'RECENTLY'}</small></div><button class="repo-btn" data-theft="${r.theft_id}" data-name="${esc(r.property_name)}" data-player="${esc(r.thief_name)}">🏦 REPOSSESS TO BANK</button></article>`).join(''):'<div class="repo-empty">No stolen properties eligible for repossession.</div>';
    $$('.repo-btn',list).forEach(b=>b.addEventListener('click',()=>repossessStolen(Number(b.dataset.theft),b.dataset.name,b.dataset.player)));
  }
  async function repossessStolen(theftId,propertyName,playerName){
    if(!confirm(`REPOSSESS ${propertyName} from ${playerName}?\n\nThe property will return to Bank ownership immediately.`))return;
    const {data,error}=await db.rpc('ft_banker_repossess_stolen_property',{p_banker_token:token,p_theft_id:theftId});
    const messageEl=$('#message');
    if(messageEl)messageEl.textContent=error?error.message:(data||`🏦 ${propertyName} repossessed to the Bank.`);
    if(!error){await loadStolenRepos();if(typeof load==='function')load();}
  }

  async function loadMessyPlayers(){
    const sel=$('#messyPlayer'); if(!sel||typeof db==='undefined'||typeof token==='undefined')return;
    const keep=sel.value; const {data,error}=await db.rpc('ft_get_banker_state',{p_banker_token:token});
    if(error)return; const rows=data||[];
    sel.innerHTML=rows.length?rows.map(p=>`<option value="${p.player_id}">${esc(p.player_name)} • ${p.cash}T • DEBT ${p.debt}</option>`).join(''):'<option value="">No players yet</option>';
    if(keep&&[...sel.options].some(o=>o.value===keep))sel.value=keep;
  }
  function updateMessyPreview(){const n=Math.max(0,Number($('#messyAmount')?.value||0));const el=$('#messyPreview');if(el)el.textContent=`${n} TABLES becomes a ${n*2} TABLES charge.`}
  async function doubleCharge(){
    const id=Number($('#messyPlayer')?.value||0),base=Number($('#messyAmount')?.value||0),reason=$('#messyReason')?.value.trim()||'Banker got messy';
    if(!id||base<=0)return;
    const total=base*2; const name=$('#messyPlayer')?.selectedOptions?.[0]?.textContent?.split(' • ')[0]||'this player';
    if(!confirm(`DOUBLE CHARGE ${name} ${total} TABLES?\n\nBase ${base} × 2 = ${total}. If cash runs out, the rest becomes debt.`))return;
    const btn=$('#messyChargeBtn');if(btn){btn.disabled=true;btn.textContent='CHARGING...'}
    const {data,error}=await db.rpc('ft_banker_double_charge',{p_banker_token:token,p_player_id:id,p_base_amount:base,p_reason:reason});
    if(btn){btn.disabled=false;btn.textContent='😈 DOUBLE CHARGE'}
    const row=Array.isArray(data)?data[0]:data;const messageEl=$('#message');
    if(messageEl)messageEl.textContent=error?error.message:`😈 DOUBLE CHARGED ${name} ${row?.charged||total} TABLES. Cash taken ${row?.cash_taken||0}; debt added ${row?.debt_added||0}.`;
    if(!error){loadMessyPlayers();if(typeof load==='function')load();}
  }
  $('#messyAmount')?.addEventListener('input',updateMessyPreview);$('#messyChargeBtn')?.addEventListener('click',doubleCharge);updateMessyPreview();

  function syncProfile(){
    const count=(window.players&&Array.isArray(window.players))?window.players.length:$$('#players .player-card').length;
    const el=$('#sidePlayerCount'); if(el)el.textContent=`${count} / 6 PLAYERS`;
    const active=$('.banker-menu a.active',side); if(active)active.classList.remove('active');
    const hash=location.hash||'#bank-players';
    const match=$(`.banker-menu a[href="${hash}"]`,side); if(match)match.classList.add('active');
  }
  setInterval(syncProfile,1000); syncProfile();
  setInterval(loadHomeApprovals,2500); loadHomeApprovals();
  setInterval(loadStolenRepos,2000); loadStolenRepos();
  setInterval(loadMessyPlayers,3000); loadMessyPlayers();
  addEventListener('hashchange',syncProfile);
})();