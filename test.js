const assert=require('node:assert/strict'),S=require('./core.js');
assert.deepEqual(S.splitScript('أهلاً بك. كيف حالك؟\nبخير'),['أهلاً بك.','كيف حالك؟','بخير']);
assert.equal(S.splitScript('أ ب ج د ه و ز',3).length,3);assert.equal(S.estimate('واحد اثنان ثلاثة أربعة',120),2);assert.equal(S.stamp(3661001),'01:01:01,001');
const scenes=[{text:'أهلاً',visual:'سماء',seconds:2.5},{text:'نهاية',visual:'',seconds:3}];assert.match(S.srt(scenes),/00:00:02,500 --> 00:00:05,500/);assert.match(S.csv([{text:'a"b',seconds:1}]),/"a""b"/);assert.match(S.prompt(scenes[0],'cinematic','9:16'),/سماء/);assert.throws(()=>S.normalize({}));assert.equal(S.normalize({scenes:[{seconds:-4}]}).scenes[0].seconds,.5);console.log('9 assertions passed');

const ids=S.makeScenes('أهلا\nمرحبا').map(s=>s.id);assert.equal(new Set(ids).size,2);assert.equal(S.normalize({scenes:[{id:ids[0],text:'test'}]}).scenes[0].id,ids[0]);assert.ok(S.normalize({scenes:[{text:'legacy'}]}).scenes[0].id);console.log('3 migration and ID assertions passed');
