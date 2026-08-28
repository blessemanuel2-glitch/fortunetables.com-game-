const SUPABASE_URL='https://clxyekczujdcfhfpbnoo.supabase.co';
const SUPABASE_KEY='sb_publishable_92NFR3gxbBtioyNE9UFGmw_9c28SVKZ';
const db=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const message=document.getElementById('message');
const showJoin=document.getElementById('showJoin');
if(showJoin) showJoin.onclick=()=>document.getElementById('joinBox').classList.toggle('hidden');
const createBtn=document.getElementById('createGame');
if(createBtn) createBtn.onclick=async()=>{
 message.textContent='Creating your table...';
 const {data,error}=await db.rpc('ft_create_game',{p_banker_pin:null});
 if(error){message.textContent=error.message;return;}
 const game=Array.isArray(data)?data[0]:data;
 localStorage.setItem('ft_banker_token',game.banker_token);
 localStorage.setItem('ft_table_code',game.table_code);
 window.location.href='banker.html';
};
const joinBtn=document.getElementById('joinGame');
if(joinBtn) joinBtn.onclick=async()=>{
 const code=document.getElementById('tableCode').value.trim();
 const name=document.getElementById('playerName').value.trim();
 const symbol=document.getElementById('symbol').value;
 if(!code||!name){message.textContent='Enter your table code and player name.';return;}
 message.textContent='Taking your seat...';
 const {data,error}=await db.rpc('ft_join_game',{p_table_code:code,p_player_name:name,p_symbol:symbol});
 if(error){message.textContent=error.message;return;}
 const player=Array.isArray(data)?data[0]:data;
 localStorage.setItem('ft_player_token',player.player_token);
 localStorage.setItem('ft_table_code',player.table_code);
 window.location.href='player.html';
};