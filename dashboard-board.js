(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .dashGame{grid-column:1/-1;border:1px solid #d4af3766;background:radial-gradient(circle at 50% 35%,#2c0920 0,#090909 48%,#030303 100%);padding:18px;border-radius:16px;box-shadow:0 18px 40px #0007;overflow:hidden}
    .dashGameHead{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}.dashGameHead h2{margin:0;color:#d4af37;letter-spacing:.05em;padding:0}.dashGameHead p{margin:3px 0 0;color:#aaa;font-size:12px}.dashGameHead button{width:auto;margin:0}
    .dashTableLayout{display:grid;grid-template-columns:minmax(380px,1fr) 250px;gap:16px;align-items:start}.dashBoard{position:relative;aspect-ratio:1;border:3px solid #d4af37;background:radial-gradient(circle,#3c0b2b 0,#0b0809 34%,#020202 72%);overflow:hidden;box-shadow:inset 0 0 45px #000,0 0 25px #d4af3718}
    .dashSpace{position:absolute;width:11.111%;height:11.111%;border:1px solid #59491e;background:#090909;display:flex;align-items:center;justify-content:center;text-align:center;padding:2px;font-size:clamp(5px,.7vw,9px);line-height:1.05;color:#d8d0be}.dashSpace.steal,.dashSpace.confession{border-color:#ff2d7a;color:#ff9cbd;background:#250711;font-weight:800}.dashSpace.jackpot{border-color:#d4af37;color:#ffe38a;background:#2b2102;font-weight:800}.dashSpace.market{border-color:#8d55ff;color:#c8afff;background:#160c27;font-weight:800}.dashSpace.jail{border-color:#ff2d7a;color:#ff8caf}.dashSpace.wealth{border-color:#d4af37;color:#ffe38a}
    .dashCenter{position:absolute;inset:23%;border:1px solid #ff2d7a66;background:#050505ee;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;text-align:center}.dashLogo{font-family:Georgia,serif;color:#d4af37;font-size:clamp(18px,3vw,38px);line-height:.95}.dashLogo span{display:block;color:#ff2d7a;font-size:.72em;letter-spacing:.12em}.dashTurn{font-size:10px;color:#ccc;margin:7px 0 9px}.miniDecks{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;width:100%;max-width:310px}.miniCard{aspect-ratio:2.5/3.5;border-radius:6px;border:1px solid #59491e;background:#0b0b0b;padding:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;transition:.15s;box-shadow:0 5px 12px #0008}.miniCard:hover{transform:translateY(-3px);filter:brightness(1.15)}.miniCard b{font-size:8px;line-height:1}.miniCard small{font-size:6px;color:#aaa}.miniCard.steal{border-color:#ff2d7a;color:#ff7aaa}.miniCard.jackpot{border-color:#d4af37;color:#f1cf6a}.miniCard.confession{border-color:#ff2d7a;color:#ffd2e2}.miniCard.market{border-color:#8d55ff;color:#c7aaff}
    .dashToken{position:absolute;z-index:20;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#050505;border:2px solid #fff;font-size:12px;font-weight:900;box-shadow:0 0 13px #ff2d7a88;transition:.35s;transform:translate(4px,4px)}.dashToken.me{border-color:#d4af37;box-shadow:0 0 18px #d4af37aa}.dashToken .n{position:absolute;right:-5px;bottom:-5px;width:13px;height:13px;border-radius:50%;background:#ff2d7a;color:#fff;font-size:7px;display:grid;place-items:center;border:1px solid #fff}
    .seatPanel{border:1px solid #59491e;background:#070707;padding:13px;border-radius:12px}.seatPanel h3{margin:0 0 9px;color:#d4af37}.seatGrid{display:grid;gap:7px}.seat{display:grid;grid-template-columns:36px 1fr auto;gap:9px;align-items:center;border:1px solid #33270a;background:#0b0907;padding:8px;border-radius:9px;min-height:50px}.piece{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:2px solid #ff2d7a;background:#050505;font-size:18px}.seat.me{border-color:#d4af37}.seat.me .piece{border-color:#d4af37;box-shadow:0 0 12px #d4af3766}.seatName{font-size:12px;font-weight:800}.seatPos{font-size:9px;color:#aaa}.seatNum{font-family:Georgia,serif;color:#d4af37;font-size:16px}.emptySeat{opacity:.45}.deckShelf{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:12px}.deckCard{min-height:112px;border-radius:12px;padding:12px;display:flex;flex-direction:column;justify-content:flex-end;cursor:pointer;position:relative;overflow:hidden;transition:.16s;background:#080808;border:1px solid #59491e}.deckCard:before{position:absolute;right:10px;top:8px;font-size:34px;opacity:.8}.deckCard:hover{transform:translateY(-2px);filter:brightness(1.1)}.deckCard b{font-family:Georgia,serif;font-size:16px}.deckCard small{color:#bbb}.deckCard.steal{border-color:#ff2d7a}.deckCard.steal:before{content:'🕶'}.deckCard.jackpot{border-color:#d4af37}.deckCard.jackpot:before{content:'💰'}.deckCard.confession{border-color:#ff2d7a}.deckCard.confession:before{content:'💋'}.deckCard.market{border-color:#8d55ff}.deckCard.market:before{content:'📉'}
    @media(max-width:980px){.dashTableLayout{grid-template-columns:1fr}.seatGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:650px){.dashGame{padding:10px}.dashTableLayout{display:block}.seatPanel{margin-top:10px}.seatGrid{grid-template-columns:1fr 1fr}.deckShelf{grid-template-columns:1fr 1fr}.dashToken{width:22px;height:22px;font-size:10px}.dashCenter{inset:24%}.miniDecks{gap:3px}.miniCard b{font-size:6px}.miniCard small{display:none}}
  `;
  document.head.appendChild(style);

  const names=['START','CROWN TAX','VELVET LOFT','FORTUNE','PINK ROOM','STEAL','PAY RENT','GOLD MARKET','CHAOS','MARBLE MANOR','BONUS','MIDNIGHT CLUB','CONFESSION','CHILD SUPPORT','DIAMOND ESTATE','FORTUNE','VIP LOUNGE','BANK FEE','ROYAL PALACE','MARKET CRASH','CHAOS','FORTUNE BOUTIQUE','PAY RENT','FANTASY HOTEL','JACKPOT','BONUS','GOLD TOWER','FORTUNE','PRIVATE MARINA','JAIL','LUXURY YACHT CLUB','WEALTH'];
  const icon={Crown:'♛',Lips:'💋',Diamond:'💎',Snake:'🐍'};
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const section=document.createElement('section');
  section.className='dashGame';
  section.innerHTML=`<div class="dashGameHead"><div><h2>🎲 LIVE GAME TABLE</h2><p>The board, all six player seats and the four action decks are now on your dashboard.</p></div><button class="goldBtn" onclick="location.href='board.html'">OPEN FULL BOARD</button></div><div class="dashTableLayout"><div id="dashBoard" class="dashBoard"><div class="dashCenter"><div class="dashLogo">FORTUNE<span>TABLES</span></div><div id="dashTurn" class="dashTurn">SYNCING LIVE TABLE...</div><div class="miniDecks"><div class="miniCard steal" onclick="location.href='theft.html'"><b>STEAL</b><small>25</small></div><div class="miniCard jackpot" onclick="location.href='hijack.html'"><b>JACKPOT</b><small>25</small></div><div class="miniCard confession" onclick="location.href='confession.html'"><b>CONFESS</b><small>25</small></div><div class="miniCard market" onclick="location.href='market-crash.html'"><b>CRASH</b><small>30</small></div></div></div></div><aside class="seatPanel"><h3>6 PLAYER PIECES</h3><div id="dashSeats" class="seatGrid"></div></aside></div><div class="deckShelf"><div class="deckCard steal" onclick="location.href='theft.html'"><b>STEAL ACTION</b><small>Draw a chaos move and go after property.</small></div><div class="deckCard jackpot" onclick="location.href='hijack.html'"><b>JACKPOT / HIJACK</b><small>Draw a one-time code and hit the Bank.</small></div><div class="deckCard confession" onclick="location.href='confession.html'"><b>CONFESSION</b><small>Draw it. Read it. Tell the truth.</small></div><div class="deckCard market" onclick="location.href='market-crash.html'"><b>MARKET CRASH</b><small>Trigger a market event for the table.</small></div></div>`;
  const grid=document.querySelector('main.content .grid');
  if(!grid)return;
  const insertAt=grid.children[2]||null;
  grid.insertBefore(section,insertAt);

  const board=document.getElementById('dashBoard');
  const spaces=[];
  const coords=[];
  for(let i=0;i<9;i++)coords.push([i*(100/9),100-(100/9)]);
  for(let i=1;i<8;i++)coords.push([100-(100/9),100-(100/9)-i*(100/9)]);
  for(let i=8;i>=0;i--)coords.push([i*(100/9),0]);
  for(let i=1;i<8;i++)coords.push([0,i*(100/9)]);
  names.forEach((name,i)=>{
    const s=document.createElement('div');
    const special=i===5?'steal':i===12?'confession':i===19?'market':i===24?'jackpot':i===29?'jail':i===31?'wealth':'';
    s.className='dashSpace '+special;s.textContent=name;s.style.left=coords[i][0]+'%';s.style.top=coords[i][1]+'%';board.appendChild(s);spaces.push(s);
  });

  function renderSeats(rows){
    const seats=document.getElementById('dashSeats');
    const padded=[...rows]; while(padded.length<6)padded.push(null);
    seats.innerHTML=padded.slice(0,6).map((p,i)=>p?`<div class="seat ${current&&p.player_id===current.id?'me':''}"><div class="piece">${icon[p.symbol]||'●'}</div><div><div class="seatName">${esc(p.player_name)}</div><div class="seatPos">SPACE ${p.board_position} • ${esc(p.symbol||'PLAYER')}</div></div><div class="seatNum">${i+1}</div></div>`:`<div class="seat emptySeat"><div class="piece">+</div><div><div class="seatName">OPEN SEAT</div><div class="seatPos">WAITING FOR PLAYER</div></div><div class="seatNum">${i+1}</div></div>`).join('');
  }

  function renderTokens(rows){
    board.querySelectorAll('.dashToken').forEach(x=>x.remove());
    rows.slice(0,6).forEach((p,i)=>{
      const s=spaces[Number(p.board_position||0)%32]; if(!s)return;
      const t=document.createElement('div');t.className='dashToken '+(current&&p.player_id===current.id?'me':'');t.innerHTML=`${icon[p.symbol]||'●'}<span class="n">${i+1}</span>`;t.title=p.player_name;t.style.left=`calc(${s.style.left} + ${(i%3)*6}px)`;t.style.top=`calc(${s.style.top} + ${Math.floor(i/3)*7}px)`;board.appendChild(t);
    });
  }

  async function syncDashBoard(){
    if(typeof db==='undefined'||typeof token==='undefined'||!token)return;
    const [{data:rows,error},{data:turn}]=await Promise.all([db.rpc('ft_get_board_state',{p_session_token:token}),db.rpc('ft_get_turn_state',{p_session_token:token})]);
    if(error)return;
    const ps=rows||[];renderSeats(ps);renderTokens(ps);
    const tr=Array.isArray(turn)?turn[0]:turn;
    document.getElementById('dashTurn').textContent=tr?`TURN ${tr.turn_number} • ${String(tr.current_player_name||'WAITING').toUpperCase()}`:`${ps.length} / 6 PLAYERS`;
  }
  syncDashBoard();setInterval(syncDashBoard,2200);
})();