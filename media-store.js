'use strict';
const MediaStore=(()=>{
 let promise;
 function db(){return promise ||= new Promise((ok,no)=>{const r=indexedDB.open('arabic-creator-studio-media',1);r.onupgradeneeded=()=>r.result.createObjectStore('files');r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error);});}
 async function run(mode,fn){const d=await db();return new Promise((ok,no)=>{const t=d.transaction('files',mode),r=fn(t.objectStore('files'));t.oncomplete=()=>ok(r?.result);t.onerror=()=>no(t.error);t.onabort=()=>no(t.error);});}
 return {get:k=>run('readonly',s=>s.get(k)),put:(k,v)=>run('readwrite',s=>s.put(v,k)),remove:k=>run('readwrite',s=>s.delete(k)),keys:()=>run('readonly',s=>s.getAllKeys())};
})();
