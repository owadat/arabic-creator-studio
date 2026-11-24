(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Studio=api;})(globalThis,()=>{
'use strict';
const clean=s=>String(s??'').trim();
function splitScript(s,maxWords=16){maxWords=Math.max(3,Math.min(60,Math.round(Number(maxWords)||16)));return clean(s).split(/\n+|(?<=[.!?؟؛])\s+/u).flatMap(line=>{const words=clean(line).split(/\s+/u).filter(Boolean);const chunks=[];for(let i=0;i<words.length;i+=maxWords)chunks.push(words.slice(i,i+maxWords).join(' '));return chunks;});}
function estimate(text,wpm=125){return Math.max(2,Math.ceil(clean(text).split(/\s+/u).filter(Boolean).length*60/Math.max(30,Math.min(300,Number(wpm)||125))));}
function makeScenes(script,wpm=125,maxWords=16){return splitScript(script,maxWords).map(text=>({text,visual:'',seconds:estimate(text,wpm)}));}
function duration(s){return Math.max(0.5,Math.min(3600,Number(s)||2));}
function stamp(ms){ms=Math.max(0,Math.round(ms));const pad=(v,n=2)=>String(v).padStart(n,'0');return `${pad(Math.floor(ms/3600000))}:${pad(Math.floor(ms/60000)%60)}:${pad(Math.floor(ms/1000)%60)},${pad(ms%1000,3)}`;}
function srt(scenes){let t=0;return scenes.map((s,i)=>{const start=t;t+=Math.round(duration(s.seconds)*1000);return `${i+1}\n${stamp(start)} --> ${stamp(t)}\n${clean(s.text)}\n`;}).join('\n');}
function csv(scenes){const q=x=>'"'+String(x??'').replace(/"/g,'""')+'"';return '\uFEFF'+[['Scene','Narration','Visual','Seconds'],...scenes.map((s,i)=>[i+1,s.text,s.visual,duration(s.seconds)])].map(r=>r.map(q).join(',')).join('\r\n');}
function prompt(s,style,ratio){return [`Create a ${style||'cinematic'} visual for a ${ratio||'9:16'} video.`,s.visual?`Visual direction: ${s.visual}`:'Visual direction: depict the narration as a clear, coherent scene.',`Narration context (Arabic): ${s.text}`,'Use consistent subjects, clear composition, and suitable lighting. No unintended text or logos.'].join('\n');}
function normalize(p){if(!p||!Array.isArray(p.scenes)||p.scenes.length>1000)throw Error('Invalid project');return {title:clean(p.title).slice(0,200),script:String(p.script??''),style:clean(p.style)||'cinematic',ratio:['9:16','16:9','1:1'].includes(p.ratio)?p.ratio:'9:16',scenes:p.scenes.map(s=>({text:clean(s?.text),visual:clean(s?.visual),seconds:duration(s?.seconds)}))};}
return {splitScript,estimate,makeScenes,duration,stamp,srt,csv,prompt,normalize};});
