import {createServer} from 'node:http';
import './build.mjs';
const {default:worker}=await import('../dist/server/index.js');
const portArgument = process.argv.indexOf('--port');
const port=Number((portArgument >= 0 ? process.argv[portArgument+1] : process.env.PORT)||3000);
createServer(async (incoming,outgoing)=>{
  try{
    const chunks=[];
    for await(const chunk of incoming)chunks.push(chunk);
    const body=Buffer.concat(chunks);
    const request=new Request(`http://${incoming.headers.host}${incoming.url}`,{method:incoming.method,headers:incoming.headers,...(body.length?{body}:{})});
    const response=await worker.fetch(request);
    outgoing.writeHead(response.status,Object.fromEntries(response.headers));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  }catch{
    outgoing.writeHead(500).end();
  }
}).listen(port,'0.0.0.0',()=>process.stdout.write(`Grammar Studio dev listening on ${port}\n`));
