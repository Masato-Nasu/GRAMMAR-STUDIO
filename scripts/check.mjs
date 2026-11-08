import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,levels} from '../public/lessons.js';
import app from '../dist/server/index.js';
const endpoint = 'https://grammar.test/api/tutor';
const request = (body,headers={}) => new Request(endpoint,{method:'POST',headers:{Authorization:'Bearer sk-test_placeholder_no_key','Content-Type':'application/json',...headers},body:JSON.stringify(body)});
test('course and questions have unique IDs and valid answer sets',()=>{
  assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);
  for(const level of levels)assert.ok(lessons.filter(l=>l.level===level.id).length>=6);
  for(const item of lessons){
    assert.ok(item.steps.length>=2);
    assert.ok(item.questions.length>=2);
    for(const q of item.questions){
      if(q.model){assert.ok(q.check);continue;}
      assert.ok(q.hint && q.why && q.answers.length);
      if(q.options)assert.ok(q.answers.every(a=>q.options.includes(a)));
      if(q.key)assert.ok(q.answers.every(a=>a.split(/\s+/).includes(q.key)));
    }
  }
});
test('page and app assets are served',async()=>{
  for(const name of ['/','/app.js','/lessons.js','/style.css','/icon.svg']){
    const r=await app.fetch(new Request('https://grammar.test'+name));
    assert.equal(r.status,200);
    assert.ok((await r.text()).length);
  }
});
test('tutor rejects missing key, mismatched origin and invalid lessons',async()=>{
  assert.equal((await app.fetch(request({},{Authorization:''}))).status,401);
  assert.equal((await app.fetch(request({},{Origin:'https://another.test'}))).status,403);
  assert.equal((await app.fetch(request({lesson:'invalid'}))).status,400);
});
test('tutor passes the lesson context to the Responses API and decodes output',async()=>{
  const original=globalThis.fetch;
  globalThis.fetch=async (url,options)=>{
    assert.equal(url,'https://api.openai.com/v1/responses');
    assert.equal(options.headers.Authorization,'Bearer sk-test_placeholder_no_key');
    const payload=JSON.parse(options.body);
    assert.equal(payload.store,false);
    const input=JSON.parse(payload.input);
    assert.equal(input.studentAnswer,'Do you tired?');
    assert.match(input.lesson,/be動詞/);
    assert.match(input.task,/疲れています/);
    return Response.json({output:[{type:'reasoning'},{type:'message',content:[{type:'output_text',text:'tired は形容詞です。'}]}]});
  };
  try{
    const result=await app.fetch(request({lesson:'be',board:0,question:0,useAnswer:true,answer:'Do you tired?'}));
    assert.equal(result.status,200);
    assert.deepEqual(await result.json(),{reply:'tired は形容詞です。'});
  } finally {globalThis.fetch=original;}
});

test('PWA manifest and worker share the published revision, and icons are valid PNGs',async()=>{
  const origin='https://grammar.test';
  const get=path=>app.fetch(new Request(origin+path));
  const html=await get('/');
  const revision=html.headers.get('X-Grammar-Revision');
  assert.match(revision,/^[a-f0-9]{16}$/);
  assert.ok((await html.text()).includes('/pwa.js?v='+revision));
  const manifestResponse=await get('/manifest.webmanifest');
  assert.equal(manifestResponse.headers.get('Content-Type'),'application/manifest+json');
  const manifest=await manifestResponse.json();
  assert.equal(manifest.start_url,'/');
  assert.equal(manifest.display,'standalone');
  for(const icon of manifest.icons){
    const response=await get(icon.src);
    assert.equal(response.headers.get('Content-Type'),'image/png');
    const bytes=Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.equal(icon.sizes,bytes.readUInt32BE(16)+'x'+bytes.readUInt32BE(20));
  }
  const worker=await get('/sw.js');
  assert.ok((await worker.text()).includes(revision));
  const module=await get('/app.js?v='+revision);
  assert.ok((await module.text()).includes('lessons.js?v='+revision));
});

test('offline shell serves the last prepared lesson but defers online access and API requests',async()=>{
  const {runInNewContext}=await import('node:vm');
  const origin='https://grammar.test';
  const get=path=>app.fetch(new Request(origin+path));
  const routes=new Map();
  const handlers=new Map();
  let network='live';
  const resolve=entry=>typeof entry==='string'?new URL(entry,origin).href:entry.url;
  const cache={put:(key,value)=>routes.set(resolve(key),value),match:key=>routes.get(resolve(key))?.clone()};
  runInNewContext(await (await get('/sw.js')).text(),{
    URL,Response,
    self:{location:{origin},addEventListener:(kind,handler)=>handlers.set(kind,handler)},
    caches:{open:async()=>cache},
    fetch:async input=>{
      if(network==='offline')throw new TypeError('Network unavailable');
      if(network==='restricted')return new Response('Sign in required',{status:403});
      return app.fetch(new Request(resolve(input)));
    }
  });
  let task;
  handlers.get('install')({waitUntil:value=>{task=value;}});
  await task;
  const reply=request=>{
    let response;
    handlers.get('fetch')({request,respondWith:value=>{response=value;}});
    return response;
  };
  const navigation={method:'GET',mode:'navigate',url:origin+'/'};
  network='restricted';
  assert.equal((await reply(navigation)).status,403);
  network='offline';
  const shell=await reply(navigation);
  const revision=shell.headers.get('X-Grammar-Revision');
  assert.match(await shell.text(),/GRAMMAR STUDIO/);
  assert.match(await (await reply({method:'GET',url:origin+'/lessons.js?v='+revision})).text(),/現在完了/);
  assert.equal(reply({method:'POST',url:origin+'/api/tutor'}),undefined);
  assert.equal(reply({method:'GET',mode:'navigate',url:origin+'/signin-with-chatgpt'}),undefined);
});
