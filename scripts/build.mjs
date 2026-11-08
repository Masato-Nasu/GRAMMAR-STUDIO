import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {lessons} from '../public/lessons.js';

const files = {
  '/':'index.html','/app.js':'app.js','/lessons.js':'lessons.js','/style.css':'style.css','/icon.svg':'icon.svg',
  '/sw.js':'sw.js','/pwa.js':'pwa.js','/manifest.webmanifest':'manifest.webmanifest',
  '/icon-192.png':'icon-192.png','/icon-512.png':'icon-512.png','/icon-maskable.png':'icon-maskable.png',
  '/apple-touch-icon.png':'apple-touch-icon.png'
};
const assets=Object.fromEntries(await Promise.all(Object.entries(files).map(async ([route,name])=>{
  const encoding=name.endsWith('.png')?'base64':'utf8';
  return [route,await readFile(new URL('../public/'+name,import.meta.url),encoding)];
})));
const revision=createHash('sha256').update(JSON.stringify(assets)).digest('hex').slice(0,16);
for(const route of ['/','/app.js','/sw.js'])assets[route]=assets[route].replaceAll('__GRAMMAR_REVISION__',revision);
const source=await readFile(new URL('../worker.js',import.meta.url),'utf8');
await mkdir('dist/server',{recursive:true});
try {
  await mkdir('dist/.openai',{recursive:true});
  await copyFile('.openai/hosting.json','dist/.openai/hosting.json');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
await writeFile('dist/server/index.js',`const APP_REVISION = "${revision}";\nconst ASSETS = ${JSON.stringify(assets)};\nconst COURSE = ${JSON.stringify(lessons)};\n${source}`);
