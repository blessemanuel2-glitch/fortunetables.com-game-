const SUPABASE_URL='https://clxyekczujdcfhfpbnoo.supabase.co';
const SUPABASE_KEY='sb_publishable_92NFR3gxbBtioyNE9UFGmw_9c28SVKZ';
const db=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const message=document.getElementById('message');
const bankerToken=localStorage.getItem('ft_banker_token');
const playerToken=localStorage.getItem('ft_player_token');
const tableCodeSaved=localStorage.getItem('ft_table_code');

function setBusy(btn,on,label){if(!btn)return;if(on){btn.dataset.label=btn.textContent;btn.disabled=true;btn.textContent=label}else{btn.disabled=false;btn.textContent=btn.dataset.label||btn.textContent}}

const resumeBox=document.getElementById('resumeBox');
const resumeGame=document.getElementById('resumeGame');
const resumeText=document.getElementById('resumeText');
if(resumeBox&&(bankerToken||playerToken)){
  resumeBox.style.display='block';
  if(resumeText)resumeText.textContent=`${bankerToken?'Banker':'Player'} session${tableCodeSaved?' • '+tableCodeSaved:''}`;
  if(resumeGame)resumeGame.onclick=()=>location.href=bankerToken?'banker.html':'player.html';
}

const showJoin=document.getElementById('showJoin');
if(showJoin)showJoin.onclick=()=>{const box=document.getElementById('joinBox');box.classList.toggle('hidden');if(!box.classList.contains('hidden'))document.getElementById('tableCode')?.focus()};

const params=new URLSearchParams(location.search);
const joinCode=params.get('code')||params.get('table');
if(joinCode&&document.getElementById('tableCode')){
  document.getElementById('tableCode').value=joinCode.toUpperCase();
  document.getElementById('joinBox')?.classList.remove('hidden');
}

const createBtn=document.getElementById('createGame');
if(createBtn)createBtn.onclick=async()=>{
  if((bankerToken||playerToken)&&!confirm('Start a new Fortune Tables game on this device?'))return;
  setBusy(createBtn,true,'CREATING TABLE...');
  if(message)message.textContent='Setting up the Banker dashboard...';
  const {data,error}=await db.rpc('ft_create_game',{p_banker_pin:null});
  if(error){if(message)message.textContent=error.message;setBusy(createBtn,false);return}
  const game=Array.isArray(data)?data[0]:data;
  localStorage.removeItem('ft_player_token');
  localStorage.setItem('ft_banker_token',game.banker_token);
  localStorage.setItem('ft_table_code',game.table_code);
  location.href='banker.html';
};

const joinBtn=document.getElementById('joinGame');
if(joinBtn)joinBtn.onclick=async()=>{
  const code=document.getElementById('tableCode').value.trim().toUpperCase();
  const name=document.getElementById('playerName').value.trim();
  const symbol=document.getElementById('symbol').value;
  if(!code||!name){if(message)message.textContent='Enter the table code and your player name.';return}
  setBusy(joinBtn,true,'JOINING TABLE...');
  if(message)message.textContent='Taking your seat...';
  const {data,error}=await db.rpc('ft_join_game',{p_table_code:code,p_player_name:name,p_symbol:symbol});
  if(error){if(message)message.textContent=error.message;setBusy(joinBtn,false);return}
  const player=Array.isArray(data)?data[0]:data;
  localStorage.removeItem('ft_banker_token');
  localStorage.setItem('ft_player_token',player.player_token);
  localStorage.setItem('ft_table_code',player.table_code);
  location.href='player.html';
};

const openBoard=document.getElementById('openBoard');
if(openBoard)openBoard.onclick=()=>{
  if(bankerToken||playerToken)location.href='board.html';
  else{
    document.getElementById('joinBox')?.classList.remove('hidden');
    if(message)message.textContent='Create or join a game first, then the digital board will open.';
  }
};