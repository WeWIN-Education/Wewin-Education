// One recording at a time; navigation invalidates pending play/error callbacks.
export function createWordPlayer({createAudio=()=>new Audio(),onState=()=>{},onError=()=>{}}={}){
 let player=null,version=0;
 function stop(){version++;if(player){player.pause();player.removeAttribute('src');player.load();player=null;}onState('idle',null);}
 async function play(word){
  stop();const request=version;
  if(!/^vocab-audio\/(starters|movers|flyers)\/\d{3}\.mp3$/.test(word?.audio||'')){onError();return;}
  const audio=createAudio();player=audio;audio.preload='none';audio.src='assets/'+word.audio;
  let failedOnce=false;
  const failed=()=>{if(request!==version||failedOnce)return;failedOnce=true;onState('idle',null);onError();};
  audio.onended=()=>{if(request===version)onState('idle',null);};audio.onerror=failed;
  onState('loading',word.audio);
  try{await audio.play();if(request===version&&!failedOnce)onState('playing',word.audio);}
  catch(error){if(request===version&&error?.name!=='AbortError')failed();}
 }
 return {play,stop};
}
