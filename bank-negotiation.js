(()=>{
  const bankerToken=localStorage.getItem('ft_banker_token');
  const playerToken=localStorage.getItem('ft_player_token');
  const isBanker=!!bankerToken;
  const sessionToken=isBanker?bankerToken:playerToken;
  if(!sessionToken||typeof db==='undefined')return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const money=n=>`${Number(n||0)} TABLES`;
  const style=document.createElement('style');
  style.textContent=`
    .bankDealDesk{border:1px solid #d4af37;background:radial-gradient(circle at 85% 0,#3b2604,#080808 45%,#030303 100%);padding:18px;border-radius:14px;margin:16px 0;box-shadow:0 14px 35px #0008}.bankDealDesk h2{margin:0;color:#d4af37;font-family:Georgia,serif}.bankDealDesk .dealSub{color:#aaa;font-size:12px;margin:4px 0 14px}.dealGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:11px}.dealOffer{border:1px solid #59491e;background:#080808;padding:13px;border-radius:11px}.dealOffer.countered{border-color:#ff2d7a;background:linear-gradient(145deg,#1a0710,#080808)}.dealOffer .who{color:#ff2d7a;font-size:11px;font-weight:900;letter-spacing:1px}.dealOffer h3{margin:5px 0;color:#fff}.dealOffer .numbers{display:flex;justify-content:space-between;gap:8px;color:#d4af37;font-weight:800;font-size:12px}.dealOffer .dealBtns{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:10px}.dealOffer .dealBtns.two{grid-template-columns:1fr 1fr}.dealOffer button{min-height:42px;padding:8px;font-size:10px;margin:0}.dealOffer .accept{background:linear-gradient(135deg,#155b32,#24884d);border-color:#52d483;color:#fff}.dealOffer .negotiate{background:linear-gradient(135deg,#6c3b00,#bd7b08);border-color:#d4af37;color:#fff}.dealOffer .decline{background:#551020;border-color:#ff2d7a;color:#fff}.negotiationCard{margin-top:10px;border:2px solid #d4af37;border-radius:12px;background:radial-gradient(circle at 80% 0,#3f2600,#0a0703 45%,#020202);padding:13px;position:relative;overflow:hidden}.negotiationCard:after{content:'DEAL';position:absolute;right:-4px;bottom:-10px;font-family:Georgia,serif;font-size:52px;color:#d4af3710;transform:rotate(-8deg)}.negotiationCard .cardNo{font-size:9px;letter-spacing:2px;color:#ff2d7a}.negotiationCard b{display:block;color:#d4af37;font-family:Georgia,serif;font-size:19px;margin:4px 0}.negotiationCard p{font-size:11px;line-height:1.4;margin:0;position:relative;z-index:1}.counterPrice{font-family:Georgia,serif;color:#ff2d7a;font-size:23px;margin-top:8px}.dealEmpty{border:1px dashed #59491e;padding:15px;border-radius:10px;color:#aaa}.playerDealStrip{border:1px solid #d4af37;background:#090704;padding:15px;border-radius:12px;margin:14px 0}.playerDealStrip h3{margin:0 0 8px;color:#d4af37}.playerDealItem{border-top:1px solid #3c3012;padding:11px 0}.playerDealItem:first-of-type{border-top:0}.playerDealItem .state{font-size:10px;letter-spacing:1px;color:#ff2d7a;font-weight:900}.playerDealItem .dealBtns{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:8px}.playerDealItem button{margin:0}.offerToast{position:fixed;z-index:9000;right:18px;bottom:18px;max-width:340px;background:#090909;border:1px solid #d4af37;border-radius:12px;padding:14px;box-shadow:0 16px 45px #000b;display:none}.offerToast.show{display:block}.offerToast b{color:#d4af37}.offerToast p{font-size:12px;margin:5px 0}.banker-menu .dealLink{color:#f1cf6a;border-color:#d4af3744}
    @media(max-width:700px){.bankDealDesk{padding:12px;margin:10px 0}.dealGrid{grid-template-columns:1fr}.dealOffer .dealBtns{grid-template-columns:1fr}.dealOffer .dealBtns.two{grid-template-columns:1fr 1fr}.playerDealStrip{padding:11px}.offerToast{left:10px;right:10px;bottom:74px;max-width:none}}
  `;
  document.head.appendChild(style);

  function toast(title,body){let t=document.getElementById('offerToast');if(!t){t=document.createElement('div');t.id='offerToast';t.className='offerToast';document.body.appendChild(t)}t.innerHTML=`<b>${esc(title)}</b><p>${esc(body)}</p>`;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3500)}

  async function bankerRespond(id,approve){
    const verb=approve?'ACCEPT':'DECLINE';
    if(!confirm(`${verb} this property offer?`))return;
    const {error}=await db.rpc('ft_banker_respond_property_request',{p_banker_token:bankerToken,p_request_id:Number(id),p_approve:approve});
    const m=document.getElementById('message')||document.getElementById('msg');if(m)m.textContent=error?error.message:(approve?'✓ OFFER ACCEPTED. PROPERTY SOLD.':'✕ OFFER DECLINED.');
    if(!error){toast(approve?'DEAL CLOSED':'OFFER DECLINED',approve?'The Bank accepted the player offer.':'The Bank walked away from the offer.');loadBankDeals()}
  }
  async function playNegotiation(id){
    if(!confirm('Play this property’s unique NEGOTIATION CARD? The card will set the Bank counter offer.'))return;
    const {data,error}=await db.rpc('ft_banker_negotiate_property_request',{p_banker_token:bankerToken,p_request_id:Number(id)});
    const m=document.getElementById('message')||document.getElementById('msg');if(error){if(m)m.textContent=error.message;return}const r=Array.isArray(data)?data[0]:data;
    if(m)m.textContent=`🎴 ${r.card_title} — BANK COUNTER ${r.counter_amount} TABLES.`;toast(r.card_title,`Counter sent: ${r.counter_amount} TABLES.`);loadBankDeals();
  }
  window.ftBankerRespondOffer=bankerRespond;
  window.ftPlayNegotiationCard=playNegotiation;

  function bankerCard(r){
    const offered=Number(r.offer_amount??r.price),list=Number(r.price),counter=r.counter_amount==null?null:Number(r.counter_amount);
    return `<article class="dealOffer ${counter!==null?'countered':''}"><div class="who">${esc(r.player_name)} • PROPERTY OFFER</div><h3>${esc(r.property_name)}</h3><div class="numbers"><span>OFFER ${money(offered)}</span><span>LIST ${money(list)}</span></div>${counter!==null?`<div class="negotiationCard"><div class="cardNo">PROPERTY DEAL CARD ${esc(r.negotiation_card_no||'')}</div><b>${esc(r.negotiation_card_title||'BANK COUNTER')}</b><p>${esc(r.negotiation_card_body||'The Bank sent a counter offer.')}</p><div class="counterPrice">COUNTER ${money(counter)}</div></div><div style="font-size:10px;color:#aaa;margin-top:8px">WAITING FOR ${esc(r.player_name)} TO ACCEPT OR WALK AWAY.</div>`:`<div class="dealBtns ${offered>=list?'two':''}"><button class="accept" onclick="ftBankerRespondOffer(${r.request_id},true)">✓ ACCEPT</button>${offered<list?`<button class="negotiate" onclick="ftPlayNegotiationCard(${r.request_id})">🎴 NEGOTIATE</button>`:''}<button class="decline" onclick="ftBankerRespondOffer(${r.request_id},false)">✕ DECLINE</button></div>`}</article>`;
  }

  function ensureBankDesk(){
    let desk=document.getElementById('bankDealDesk');if(desk)return desk;
    desk=document.createElement('section');desk.id='bankDealDesk';desk.className='bankDealDesk banker-anchor';desk.innerHTML=`<h2>🎴 BANK DEAL DESK</h2><div class="dealSub">Approve it, decline it, or get messy and play that property’s one-of-one negotiation card.</div><div id="bankDealList" class="dealGrid"><div class="dealEmpty">No offers waiting on the Bank.</div></div>`;
    const hidden=document.getElementById('bank-home-approvals');if(hidden)hidden.style.display='none';
    const heading=[...document.querySelectorAll('h3')].find(h=>h.textContent.includes('BANKER DASHBOARD'));
    if(heading)heading.before(desk);else(document.querySelector('.panel.wide')||document.querySelector('main.content')||document.body).appendChild(desk);
    const menu=document.querySelector('.banker-menu');if(menu){const old=menu.querySelector('a[href="#bank-home-approvals"]');if(old)old.style.display='none';const a=document.createElement('a');a.className='dealLink goldlink';a.href='#bankDealDesk';a.innerHTML='🎴 <span>BANK DEAL DESK</span>';menu.insertBefore(a,menu.children[2]||null)}
    return desk;
  }

  async function loadBankDeals(){
    if(!isBanker)return;ensureBankDesk();const list=document.getElementById('bankDealList');
    const {data,error}=await db.rpc('ft_get_banker_property_requests',{p_banker_token:bankerToken});
    if(error){list.innerHTML=`<div class="dealEmpty">${esc(error.message)}</div>`;return}const rows=data||[];list.innerHTML=rows.length?rows.map(bankerCard).join(''):'<div class="dealEmpty">No property offers waiting on the Bank.</div>';
  }

  async function sendOffer(id,name){
    const input=document.getElementById('offer'+id);const amount=Number(input?.value);
    if(!Number.isFinite(amount)||amount<1){const m=document.getElementById('message');if(m)m.textContent='ENTER A VALID OFFER AMOUNT.';return}
    if(!confirm(`Offer ${amount} TABLES to the Bank for ${name}? The Banker can accept, decline, or play the property negotiation card.`))return;
    const {error}=await db.rpc('ft_make_bank_property_offer',{p_player_token:playerToken,p_property_id:Number(id),p_offer_amount:amount});
    const m=document.getElementById('message');if(m)m.textContent=error?error.message:'💬 OFFER SENT TO BANKER — WATCH FOR A NEGOTIATION CARD.';
    if(!error){input.value='';toast('OFFER SENT',`${amount} TABLES for ${name}.`);loadPlayerDeals()}
  }
  window.makeOffer=sendOffer;

  async function answerCounter(id,accept){
    if(!confirm(accept?'Accept the Bank counter and buy this property?':'Walk away from this Bank counter?'))return;
    const {data,error}=await db.rpc('ft_player_respond_bank_counter',{p_player_token:playerToken,p_request_id:Number(id),p_accept:accept});
    const m=document.getElementById('message');if(m)m.textContent=error?error.message:data;
    if(!error){toast(accept?'DEAL CLOSED':'YOU WALKED AWAY',String(data||''));loadPlayerDeals();if(typeof load==='function')load()}
  }
  window.ftAnswerBankCounter=answerCounter;

  function ensurePlayerStrip(){
    let box=document.getElementById('playerBankDeals');if(box)return box;
    box=document.createElement('section');box.id='playerBankDeals';box.className='playerDealStrip';box.innerHTML='<h3>🎴 MY BANK DEALS</h3><div id="playerDealList"><div class="dealEmpty">No Bank offers yet.</div></div>';
    const req=document.getElementById('requests');if(req)req.after(box);else(document.querySelector('main.content')||document.body).prepend(box);return box;
  }
  function playerDeal(r){
    const counter=r.counter_amount==null?null:Number(r.counter_amount);const status=String(r.status||'pending').toUpperCase();
    return `<div class="playerDealItem"><div class="state">${status}${counter!==null&&r.status==='pending'?' • BANK COUNTER':''}</div><b>${esc(r.property_name)}</b> • YOUR OFFER ${money(r.offer_amount)} / LIST ${money(r.list_price)}${counter!==null&&r.status==='pending'?`<div class="negotiationCard"><div class="cardNo">PROPERTY DEAL CARD ${esc(r.negotiation_card_no||'')}</div><b>${esc(r.negotiation_card_title||'BANK COUNTER')}</b><p>${esc(r.negotiation_card_body||'The Bank countered your offer.')}</p><div class="counterPrice">${money(counter)}</div></div><div class="dealBtns"><button onclick="ftAnswerBankCounter(${r.request_id},true)">✓ ACCEPT COUNTER</button><button class="secondary" onclick="ftAnswerBankCounter(${r.request_id},false)">WALK AWAY</button></div>`:r.status==='pending'?'<div style="font-size:10px;color:#aaa;margin-top:5px">WAITING ON THE BANKER: ACCEPT • DECLINE • NEGOTIATE</div>':''}</div>`;
  }
  async function loadPlayerDeals(){
    if(isBanker||!playerToken)return;ensurePlayerStrip();const list=document.getElementById('playerDealList');const {data,error}=await db.rpc('ft_get_player_bank_property_requests',{p_player_token:playerToken});
    if(error){list.innerHTML=`<div class="dealEmpty">${esc(error.message)}</div>`;return}const rows=(data||[]).slice(0,8);list.innerHTML=rows.length?rows.map(playerDeal).join(''):'<div class="dealEmpty">No Bank offers yet. Put in an offer on a property below.</div>';
  }

  if(isBanker){setTimeout(loadBankDeals,150);setInterval(loadBankDeals,1800)}else{setTimeout(loadPlayerDeals,150);setInterval(loadPlayerDeals,2200)}
})();