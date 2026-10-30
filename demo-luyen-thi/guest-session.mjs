// Background checks never refresh activity. Only real input calls noteActivity().
export function createGuestSessionGuard({request,onExpired,onUpdate=()=>{},clock=()=>Date.now(),setTimer=setTimeout,clearTimer=clearTimeout,setPoll=setInterval,clearPoll=clearInterval}){
 let active=false,version=0,deadline=0,timer=null,poll=null,lastTouch=-Infinity,pending=false;
 function stop(){active=false;version++;if(timer!==null)clearTimer(timer);if(poll!==null)clearPoll(poll);timer=poll=null;pending=false;}
 function schedule(snapshot){
  const guest=snapshot.guest;
  deadline=clock()+Math.max(0,Math.min(Date.parse(guest.idleExpiresAt),Date.parse(guest.expiresAt))-Date.parse(guest.serverNow));
  if(timer!==null)clearTimer(timer);timer=setTimer(()=>check(),Math.max(0,deadline-clock())+50);
 }
 function setSession(snapshot){stop();if(!snapshot.guest||snapshot.user||!snapshot.registered)return;active=true;lastTouch=-Infinity;schedule(snapshot);poll=setPoll(()=>check(),60000);}
 async function refresh(resource){
  if(!active||pending)return;const current=version;pending=true;
  try{
   const snapshot=await request(resource);
   if(current!==version)return;
   if(!snapshot.registered||(!snapshot.guest&&!snapshot.user)){stop();onExpired(snapshot.guestStatus||'idle_expired');return;}
   onUpdate(snapshot);
   if(snapshot.user){stop();return;}
   schedule(snapshot);
  }catch(error){
   if(current!==version)return;
   if(error.status===401){stop();onExpired(error.code==='GUEST_ACCESS_EXPIRED'?'expired':'idle_expired');}
   else if(clock()>=deadline){stop();onExpired('unverified');}
  }finally{if(current===version)pending=false;}
 }
 function check(){return refresh('session');}
 function noteActivity(){
  if(!active)return;
  if(clock()>=deadline)return check();
  if(clock()-lastTouch<30000||pending)return;
  lastTouch=clock();return refresh('touch-session');
 }
 return {setSession,noteActivity,check,stop};
}
