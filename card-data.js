window.FTCardData=(()=>{
  const steal=[
    ['GRAB & GO','Steal 1 random property from another player. Banker has 20 seconds to catch you.'],
    ['DEED SWIPE','Choose one property worth 12 TABLES or less and steal it.'],
    ['INSIDE JOB','Steal a Bank-owned property without paying.'],
    ['PINK SLIP','Take the cheapest property from the richest player.'],
    ['HOUSE JACK','Steal one HOME property.'],
    ['NIGHT SHIFT','Steal one CLUB property.'],
    ['STICKY FINGERS','Steal one STORE property.'],
    ['ROOM KEY','Steal one HOTEL property.'],
    ['HOSTILE TAKEOVER','Steal one BUSINESS property.'],
    ['LUXURY HEIST','Attempt to steal one LUXURY property. Banker gets extra time to catch you.'],
    ['DEED FORGERY','Swap one of your cheaper properties for another player’s more expensive property.'],
    ['SNAKE MOVE','Steal a property, but if caught your bail is doubled.'],
    ['SMASH & GRAB','Steal a property and 3 TABLES from the same player.'],
    ['NO CAMERAS','Steal a property and reduce the Banker’s catch window by 5 seconds.'],
    ['DISTRACTION','Choose another player to trigger a fake alert while you attempt a steal.'],
    ['GETAWAY CAR','Play after stealing; add 5 seconds to your escape advantage.'],
    ['ALIBI','If the Banker catches you, cancel the catch once.'],
    ['CLEAN GETAWAY','If the Banker fails to catch you, gain +3 TABLES.'],
    ['DOUBLE TAP','Attempt to steal two low-value properties. Banker only needs to catch you once to stop both.'],
    ['TAKE THE KEYS','Steal the highest-rent property from a chosen player.'],
    ['FORECLOSURE FRAUD','Take a property from a player currently in debt.'],
    ['REPO MAN','Steal a property from a player who missed rent.'],
    ['PAPERWORK ERROR','Move one property into your name until the Banker catches the mistake.'],
    ['BLIND SPOT','Banker does not see which property you stole until they open the alert.'],
    ['THE BIG SCORE','Attempt to steal any property in the game. If caught: jail + 10 TABLES bail. If you escape: keep it permanently.']
  ];
  const confession=[
    ['THE REAL TEA','Who at this table would you trust least with your TABLES, and why?'],
    ['BAD INVESTMENT','What is the worst money decision you have ever made?'],
    ['SECRET FAVORITE','Which player do you secretly want to win?'],
    ['FIRST IMPRESSION','What was your first impression of the player to your left?'],
    ['BIGGEST FLEX','What is something you are proud of but rarely say out loud?'],
    ['PETTY CASH','What is the pettiest reason you have ever been mad at someone?'],
    ['TRUST FUND','Who at this table would you trust with your biggest secret?'],
    ['RISKY BUSINESS','What is the biggest risk you have ever taken?'],
    ['GUILTY PLEASURE','Name one harmless guilty pleasure you would normally keep quiet.'],
    ['NO FILTER','What is one thing people often misunderstand about you?'],
    ['POWER MOVE','When was the last time you got your way and knew exactly what you were doing?'],
    ['BROKE BEHAVIOR','What is something cheap you refuse to spend money on?'],
    ['SNAKE CHECK','Have you ever smiled at someone you did not like? Tell the story.'],
    ['SOFT SPOT','What is something that instantly makes you emotional?'],
    ['HIDDEN TALENT','What can you do that most people at this table probably do not know about?'],
    ['CRUSHED IT','What is one moment you felt unstoppable?'],
    ['BAD HABIT','What is one habit you know you should stop?'],
    ['JEALOUSY TAX','What is something you have been jealous of before?'],
    ['THE RECEIPTS','What is the funniest lie you told as a kid?'],
    ['WHO IS MOST LIKELY','Who at this table is most likely to become rich first, and why?'],
    ['CALL YOURSELF OUT','What is one personality flaw you know you have?'],
    ['FORTUNE TELLER','Where do you genuinely think you will be five years from now?'],
    ['KEEP IT 100','What is one opinion you usually keep to yourself?'],
    ['THE APOLOGY','Who is someone you owe an apology to, even a small one?'],
    ['FINAL CONFESSION','Say one true thing about yourself that nobody at this table would guess.']
  ];
  const market=[
    ['MARKET CRASH','Every player loses 10% of their TABLES.'],['RECESSION','All property rent is cut in half until the next round.'],['HOUSING BUBBLE','All HOME properties lose 25% of their value.'],['NIGHTLIFE SLUMP','CLUB properties collect no rent this round.'],['RETAIL COLLAPSE','STORE properties lose their next rent payment.'],['HOTEL STRIKE','HOTEL owners pay 3 TABLES per hotel to the Bank.'],['BUSINESS FAILURE','Every BUSINESS owner pays 5 TABLES to the Bank.'],['LUXURY TAX','Players with LUXURY properties pay 8 TABLES.'],['BANK FREEZE','Nobody can use credit until the next round.'],['CREDIT CRUNCH','Every player’s available credit drops by 5 TABLES temporarily.'],['INTEREST HIKE','Players with debt pay an extra 3 TABLES.'],['FORECLOSURE WAVE','Any player behind on rent risks losing their cheapest property.'],['PROPERTY PANIC','Every player chooses one property to lose 20% of its value.'],['FIRE SALE','Bank-owned properties are 50% off until one is purchased.'],['LIQUIDATION','The player with the least cash may sell one property back to the Bank at full value.'],['BLACK MONDAY','Every player loses 5 TABLES immediately.'],['BANK RUN','All players withdraw 5 TABLES from available credit into cash, adding it to debt.'],['INFLATION','All property prices increase by 25%.'],['RENT SPIKE','All rents increase by 2 TABLES until the next Market Crash card.'],['RENT CONTROL','No property may charge more than 4 TABLES rent this round.'],['BAILOUT','The player with the lowest net worth receives 10 TABLES from the Bank.'],['STIMULUS CHECK','Every player receives 5 TABLES.'],['WEALTH TAX','The richest player pays 10 TABLES to the Bank.'],['ASSET SEIZURE','The richest player returns their cheapest property to the Bank.'],['DEBT RELIEF','Every player removes 5 TABLES of debt.'],['CASH IS KING','Player with the most cash receives +5 TABLES.'],['PROPERTY BOOM','All properties increase in value by 20%.'],['RENT BOOM','Every property owner immediately collects 2 TABLES from the Bank per property.'],['MARKET MANIPULATION','Player who drew this card chooses one property category to increase or decrease in value by 25%.'],['TOTAL COLLAPSE','Everyone loses 10 TABLES, all property rent pauses for one round, and Bank-owned properties go on sale.']
  ];
  const hijackCodes=['CROWN-714','VAULT-808','PINK-404','SNAKE-613','GOLD-229','TABLE-911','FORTUNE-317','LIPS-525','DIAMOND-707','CHAOS-818','ROYAL-212','NEON-606','MARBLE-303','BOLD-515','RISK-919','POWER-414','WEALTH-808','BANK-313','JACKPOT-777','FORTUNE-505','CROWN-909','VAULT-111','BILLION-222','HIGHROLLER-888','TAKESEAT-999'];
  const hijackRewards=[3,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,25,13,14,15,16,18,20];
  function describe(type,no){
    no=Number(no||0); const i=no-1;
    if(type==='steal'&&steal[i])return{type,title:steal[i][0],body:steal[i][1],icon:'🕶',label:'STEAL ACTION',accent:'pink',url:'theft.html'};
    if(type==='confession'&&confession[i])return{type,title:confession[i][0],body:confession[i][1],icon:'💋',label:'CONFESSION',accent:'pink',url:'confession.html'};
    if(type==='market_crash'&&market[i])return{type,title:market[i][0],body:market[i][1],icon:'📉',label:'MARKET CRASH',accent:'purple',url:'market-crash.html'};
    if(type==='hijack'&&hijackCodes[i])return{type,title:no===19?'JACKPOT-777':'BANK HIJACK',body:`CODE ${hijackCodes[i]} • +${hijackRewards[i]} TABLES`,icon:'💰',label:'JACKPOT / HIJACK',accent:'gold',url:'hijack.html',code:hijackCodes[i],reward:hijackRewards[i]};
    return{type,title:'NO CARD DRAWN',body:'Draw a card from one of the action decks.',icon:'♛',label:'CURRENT CARD',accent:'gold',url:null};
  }
  return{steal,confession,market,hijackCodes,hijackRewards,describe};
})();