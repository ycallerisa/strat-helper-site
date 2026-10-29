import{a as e,t}from"./hooks-gDgi_xSW.js";import{t as n}from"./client-D35MNd4v.js";var r=e=>e===`CT`||e===`T`?e:null,i=e=>typeof e==`number`?e:null,a=e=>typeof e==`string`?e:null;function o(e){let t=e?.map??{},n=e?.round??{},o=e?.player??{},s=!!o.steamid&&o.steamid===e?.provider?.steamid,c=s?i(o.state?.health):null,l=t.round_wins;return{map:a(t.name),mode:a(t.mode),mapPhase:a(t.phase),roundPhase:a(n.phase),winTeam:r(n.win_team),bomb:a(n.bomb),side:s?r(o.team):null,ctScore:i(t.team_ct?.score),tScore:i(t.team_t?.score),money:s?i(o.state?.money):null,alive:c===null?null:c>0,roundWins:l&&typeof l==`object`?l:null}}var s=`live/v1`,c=`gamestate_integration_freezetime.cfg`,l=`Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\cfg`,u=e=>/^[0-9a-f]{32}$/.test(e);function d(){try{let e=localStorage.getItem(s);return e&&u(e)?e:null}catch{return null}}function f(){let e=d();if(e)return e;let t=Array.from(crypto.getRandomValues(new Uint8Array(16)),e=>e.toString(16).padStart(2,`0`)).join(``);try{localStorage.setItem(s,t)}catch{}return t}var p=e=>`"Freezetime"
{
  "uri" "${n}/live/${e}"
  "timeout" "5.0"
  "buffer" "0.1"
  "throttle" "0.5"
  "heartbeat" "30.0"
  "data"
  {
    "provider" "1"
    "map" "1"
    "map_round_wins" "1"
    "round" "1"
    "player_id" "1"
    "player_state" "1"
  }
}
`;function m(e){let t=document.createElement(`a`);t.href=URL.createObjectURL(new Blob([p(e)],{type:`text/plain`})),t.download=c,t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}var h=e=>`${location.origin}${location.pathname}${location.search}#/cs2/${e}`;function g(e,t,r){let i={connected:!1,last:null,snap:null},a=e=>t(i={...i,...e}),s=new EventSource(`${n}/live/${e}/flux`);return s.onopen=()=>a({connected:!0}),s.onerror=()=>a({connected:!1}),s.addEventListener(`gsi`,e=>{let t={...o(JSON.parse(e.data)),at:Date.now()};a({last:t.at,snap:t}),r?.(t)}),()=>s.close()}var _=null,v={connected:!1,last:null,snap:null},y=new Set;function b(e){let t=d();t&&_?.id!==t&&(_?.stop(),_={id:t,stop:g(t,e=>{v=e,y.forEach(t=>t(e))},e)})}function x(){_?.stop(),_=null,v={connected:!1,last:null,snap:null},y.forEach(e=>e(v));try{localStorage.removeItem(s)}catch{}}function S(){let[n,r]=e(v);return t(()=>(y.add(r),()=>{y.delete(r)}),[]),n}export{l as CFG_DIR,m as downloadCfg,f as ensureLiveId,u as isLiveId,d as liveId,h as pcLink,b as startLive,x as stopLive,S as useLiveStatus,g as watchLive};