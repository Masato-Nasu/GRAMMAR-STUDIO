import {lessons, levels} from './lessons.js?v=__GRAMMAR_REVISION__';

const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, '0');
const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const sentence = value => escape(value).replace(/\{([savox]):([^{}]+)\}/g, '<span class="token $1">$2</span>');
const STORAGE = 'grammar-studio:progress:1';
const read = () => {
  try {return JSON.parse(localStorage.getItem(STORAGE)) || {};} catch {return {};}
};
const saved = read();
const completed = new Set(Array.isArray(saved.completed) ? saved.completed : []);
let lessonIndex = Math.max(0, lessons.findIndex(item=>item.id===saved.current));
let boardIndex = Number.isInteger(saved.board) ? Math.min(Math.max(0,saved.board),lessons[lessonIndex].steps.length-1) : 0;
let questionIndex = 0;
let answer = '';
let graded = false;
let correct = 0;
let finished = false;
let apiKey = '';
const tutorRequests = {};
let timer;
const expanded = new Set([lessons[lessonIndex].level]);
const persist = () => {
  try {localStorage.setItem(STORAGE, JSON.stringify({completed:[...completed],current:lessons[lessonIndex].id,board:boardIndex}));}
  catch { /* Practice remains available when browser storage is restricted. */ }
};
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollToElement = el => el.scrollIntoView({block:'start',behavior:reduceMotion.matches?'instant':'smooth'});

function sidebar() {
  const total = lessons.length;
  $('progressText').textContent = `${completed.size} / ${total} 単元を学習済み`;
  $('progressBar').setAttribute('aria-valuemax', total);
  $('progressBar').setAttribute('aria-valuenow', completed.size);
  $('progressBar').firstElementChild.style.width = `${completed.size/total*100}%`;
  $('units').innerHTML = levels.map(level => {
    const rows = lessons.map((item,i)=>({item,i})).filter(({item})=>item.level===level.id);
    return `<details class="syllabus-group" data-level="${level.id}" ${expanded.has(level.id)?'open':''}><summary>${level.name} <small>${rows.length}単元</small></summary><div class="unit-list">${rows.map(({item,i})=>`<button type="button" class="unit-link" data-unit="${i}" aria-current="${i===lessonIndex}"><span class="unit-no">${pad(i+1)}</span><span>${escape(item.title)}</span><span class="tick" aria-label="${completed.has(item.id)?'学習済み':''}">${completed.has(item.id)?'✓':''}</span></button>`).join('')}</div></details>`;
  }).join('');
  $('units').querySelectorAll('details').forEach(node=>node.addEventListener('toggle',()=>{
    if(node.open) expanded.add(node.dataset.level);
    else expanded.delete(node.dataset.level);
  }));
}

function renderLesson() {
  const item = lessons[lessonIndex];
  const level = levels.find(level=>level.id===item.level);
  $('lesson').innerHTML = `
    <div class="lesson-head"><div><div class="micro eyebrow">LESSON ${pad(lessonIndex+1)} / ${escape(item.en)}</div><h1 id="lessonTitle" tabindex="-1">${escape(item.title)}</h1><p class="goal">${escape(item.goal)}</p></div><span class="tag">${level.name}</span></div>
    <div class="workspace">
      <section class="board" id="board" aria-label="英文法の板書"></section>
      <div class="workspace-side">
        <section class="card"><div class="micro">GRAMMAR NOTE</div><h2>ここがポイント</h2><p class="rule">${escape(item.rule)}</p></section>
        <section class="card tutor" id="tutor">
          <div class="micro">ASK A TEACHER</div><h2>板書について質問</h2>
          <p id="tutorIntro"></p>
          <button type="button" id="connectTutor" class="quiet">APIキーを設定</button>
          <form id="tutorForm" hidden>
            <label for="tutorPrompt">分からない文法や例文</label>
            <textarea id="tutorPrompt" maxlength="2200" placeholder="例文の語順はなぜこうなるの？"></textarea>
            <div class="tutor-tools"><button type="submit" id="askSubmit" class="solid">質問を送る</button></div>
          </form>
          <p id="tutorStatus" role="status"></p><p class="answer-text" id="tutorReply"></p>
        </section>
      </div>
    </div>
    <section class="card quiz" id="quiz" aria-label="確認問題"></section>
    ${item.level==='first'?'<p class="course-note">B2 Firstを目指すためのオリジナル練習です。<br><a href="https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/" target="_blank" rel="noopener noreferrer">Cambridge Englishの試験形式を見る ↗</a></p>':''}`;
  $('connectTutor').addEventListener('click', openSettings);
  $('tutorForm').addEventListener('submit', ev=>{ev.preventDefault();askTeacher(false);});
  renderTutor();
  renderBoard();
  renderQuestion();
}

function renderBoard() {
  const item = lessons[lessonIndex];
  const slide = item.steps[boardIndex];
  $('board').innerHTML = `<div class="board-top"><div class="micro">01 / 板書</div><span class="board-index">${pad(boardIndex+1)} / ${pad(item.steps.length)}</span></div>
    <h2 id="boardHeading" tabindex="-1">${escape(slide.title)}</h2>
    <div class="board-example" lang="en">${sentence(slide.example)}</div>
    ${slide.translation?`<p class="board-ja">${escape(slide.translation)}</p>`:''}
    <p class="board-note">${escape(slide.note)}</p>
    <div class="legend" aria-label="色分け"><b class="s">主語</b><b class="a">be動詞・助動詞</b><b class="v">一般動詞</b><b class="x">注目する語句</b></div>
    <div class="board-controls"><button type="button" data-board="-1" ${boardIndex===0?'disabled':''}>← 前の板書</button><button type="button" id="sayExample">🔊 読み上げ</button><button type="button" class="board-next" data-board="1">${boardIndex===item.steps.length-1?'練習へ ↓':'次の板書 →'}</button></div>
    <div class="micro" id="speechStatus" role="status" hidden></div>`;
  $('sayExample').addEventListener('click',()=>speak(slide.example.replace(/\{[savox]:([^{}]+)\}/g,'$1').replaceAll('→','. ').replaceAll(' / ','. ').replaceAll('__','').replace(/[\[\]]/g,''),'speechStatus'));
  $('board').querySelectorAll('[data-board]').forEach(button=>button.addEventListener('click',()=>{
    const next = boardIndex + Number(button.dataset.board);
    if(next >= item.steps.length){$('quizHeading').focus({preventScroll:true});scrollToElement($('quiz'));return;}
    boardIndex=next;
    stopSpeech();
    persist();
    renderBoard();
    $('boardHeading').focus({preventScroll:true});
  }));
}

const stopSpeech = () => window.speechSynthesis?.cancel();
function speak(text, statusId) {
  const node = $(statusId);
  if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
    node.hidden=false;node.textContent='このブラウザでは音声を再生できません。';return;
  }
  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang='en-GB';
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(voice=>voice.lang==='en-GB'&&voice.localService) || voices.find(voice=>voice.lang==='en-GB') || null;
  utterance.rate = .91;
  utterance.onerror = event=>{
    if(!['canceled','interrupted'].includes(event.error)&&node.isConnected){node.hidden=false;node.textContent='音声を再生できませんでした。端末の読み上げ設定をご確認ください。';}
  };
  node.hidden=true;
  speechSynthesis.speak(utterance);
}

const normalize = text => text.normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?,;:]+/g,' ').trim().replace(/\s+/g,' ');
const wordCount = text => (text.match(/[A-Za-z]+(?:['’\-][A-Za-z]+)*/g)||[]).length;
const examWordCount = text => wordCount(text.replace(/[’‘]/g,"'").replace(/\bcan't\b/gi,'can not').replace(/\bwon't\b/gi,'will not').replace(/n't\b/gi,' not').replace(/'(?:m|re|ve|ll|d|s)\b/gi,' contraction'));
const isAccepted = (question,text) => question.answers?.some(option=>normalize(option)===normalize(text));

function renderQuestion() {
  const item = lessons[lessonIndex];
  const q = item.questions[questionIndex];
  if(finished){
    const checked = item.questions.filter(question=>!question.model).length;
    const next = lessons[lessonIndex+1];
    $('quiz').innerHTML = `<div class="micro">02 / 確認問題</div><h2 id="quizHeading" tabindex="-1">この単元を学習しました</h2><p class="rule">自力で正解 ${correct} / ${checked} 問</p><p class="rule">${escape(item.rule)}</p><div class="complete-actions"><button type="button" id="retry" class="quiet">もう一度練習</button>${next?`<button type="button" class="solid" id="nextUnit">次の単元 · ${escape(next.title)}</button>`:''}</div>`;
    $('retry').addEventListener('click',()=>{resetQuiz();renderQuestion();$('quizHeading').focus({preventScroll:true});});
    $('nextUnit')?.addEventListener('click',()=>openUnit(lessonIndex+1));
    return;
  }
  const mode = q.options ? '選択問題' : q.speaking ? '口頭練習' : q.essay ? '英作文' : '入力問題';
  $('quiz').innerHTML = `<div class="quiz-top"><div><div class="micro">02 / 確認問題</div><h2 id="quizHeading" tabindex="-1">${mode} ${questionIndex+1} / ${item.questions.length}</h2></div></div>
    ${q.passage?`<p class="subnote">本文</p><div class="reading-passage" lang="en">${escape(q.passage)}</div>`:''}
    ${q.audio?'<button type="button" class="quiet" id="playClip">▶ 会話を聞く</button><div id="clipStatus" class="subnote" role="status" hidden></div>':''}
    <p class="question" id="questionPrompt">${escape(q.prompt)}</p>
    ${q.limit?`<p class="subnote">${q.limit[0]===q.limit[1]?`${q.limit[0]}語`:`${q.limit.join('〜')}語`}${q.key?` · 指定語 ${escape(q.key.toUpperCase())} をそのまま使う`:''}</p>`:''}
    <form id="quizForm">
      ${q.options?`<div class="choices" aria-label="選択肢">${q.options.map((option,index)=>`<button type="button" class="choice" data-answer="${index}" aria-pressed="false">${escape(option)}</button>`).join('')}</div>`:q.model?`<textarea aria-describedby="questionPrompt" aria-label="自分の英文" id="answerInput" class="quiz-input" maxlength="2000" spellcheck="false" placeholder="${q.speaking?'声に出して練習。話した英文を入力するとAI先生に相談できます。':'ここに英文を書いてください。'}"></textarea><p class="subnote" id="wordCount">0 語</p>`:`<input aria-describedby="questionPrompt" aria-label="自分の答え" id="answerInput" class="quiz-input" maxlength="320" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="英文を入力">`}
      <div id="feedback" class="feedback" role="status"></div>
      ${q.audio?`<details id="transcript" class="subnote" hidden><summary>会話のスクリプト</summary><p lang="en">${escape(q.audio)}</p></details>`:''}
      <div class="quiz-actions">
        <button type="submit" id="checkAnswer" class="solid" ${q.model?'hidden':'disabled'}>答えを確認</button>
        <button type="button" id="hint" class="quiet" ${q.model?'hidden':''}>ヒント</button>
        ${q.speaking?'<button type="button" id="timer" class="quiet">１分タイマー</button>':''}
        <button type="button" id="reveal" class="quiet">${q.model?'見本と確認ポイント':'正解を見る'}</button>
        <button type="button" id="nextQuestion" class="solid" hidden>${questionIndex+1===item.questions.length?'学習結果へ':'次の問題 →'}</button>
      </div>
    </form>
    <div class="answer-coach">
      <button type="button" id="coach" class="quiet" aria-describedby="coachHelp">答案をAIに相談</button>
      <p class="subnote" id="coachHelp">この問題と、${q.options?'選んだ答え':'入力した答え'}を送ります。</p>
      <p class="subnote" id="coachStatus" role="status"></p><p class="feedback" id="coachReply"></p>
    </div>`;
  $('quizForm').addEventListener('submit',ev=>{ev.preventDefault();checkAnswer(q);});
  $('quiz').querySelectorAll('[data-answer]').forEach(button=>button.addEventListener('click',()=>{
    if(graded)return;
    clearAnswerConsultation();
    answer=q.options[Number(button.dataset.answer)];
    $('quiz').querySelectorAll('[data-answer]').forEach(option=>{option.classList.remove('bad');option.setAttribute('aria-pressed',String(option===button));});
    $('checkAnswer').disabled=false;
  }));
  $('answerInput')?.addEventListener('input',ev=>{
    clearAnswerConsultation();
    answer=ev.target.value;
    $('checkAnswer').disabled=!answer.trim();
    if($('wordCount')) $('wordCount').textContent=`${wordCount(answer)} 語`;
  });
  $('hint').addEventListener('click',()=>feedback(`ヒント\n${q.hint}`));
  $('reveal').addEventListener('click',()=>reveal(q));
  $('playClip')?.addEventListener('click',()=>speak(q.audio,'clipStatus'));
  $('coach').addEventListener('click',()=>askTeacher(true));
  $('timer')?.addEventListener('click',startTimer);
  $('nextQuestion').addEventListener('click',()=>{
    clearAnswerConsultation();
    stopSpeech();
    clearInterval(timer);
    if(questionIndex+1===item.questions.length){
      finished=true;completed.add(item.id);persist();sidebar();
    }else questionIndex++;
    graded=false;answer='';
    renderQuestion();
    $('quizHeading').focus({preventScroll:true});scrollToElement($('quiz'));
  });
}

function feedback(text,error=false){
  $('feedback').classList.toggle('error',error);
  $('feedback').textContent=text;
}
function checkAnswer(q){
  if(graded||!answer.trim())return;
  if(q.limit){
    const count=examWordCount(answer);
    const [min,max]=q.limit;
    if(count<min||count>max){feedback(`語数を確認しよう。入力は ${count} 語です。短縮形は展開した語数で数えます。`,true);return;}
    if(q.key&&!normalize(answer).split(' ').includes(q.key)){feedback(`指定語 ${q.key.toUpperCase()} をそのまま使おう。`,true);return;}
  }
  if(isAccepted(q,answer)){
    correct++;
    feedback(`正解\n${q.why}`);
    lockQuestion(q);
  }else{
    $('quiz').querySelector('.choice[aria-pressed=true]')?.classList.add('bad');
    feedback(`${q.options?'もう一度考えよう':'見本の答えと一致しませんでした'}\n${q.diagnoses?.[answer]||q.hint}${q.options?'':'\n別の正しい言い方だと思ったら、AI先生に答案を相談できます。'}`,true);
  }
}
function reveal(q){
  if(graded)return;
  const message = q.model?`見本\n${q.model}\n\n確認ポイント\n${q.check}`:`正解例\n${q.answers[0]}\n\n${q.why}`;
  feedback(message);
  lockQuestion(q);
}
function lockQuestion(q){
  graded=true;
  $('checkAnswer').hidden=true;
  $('hint').hidden=true;
  $('reveal').hidden=true;
  $('quiz').querySelectorAll('[data-answer]').forEach(node=>{node.disabled=true;});
  if($('answerInput')&&!q.model)$('answerInput').readOnly=true;
  if($('transcript'))$('transcript').hidden=false;
  $('nextQuestion').hidden=false;
}
function startTimer(){
  const button=$('timer');
  if(button.dataset.active==='true'){
    clearInterval(timer);
    button.dataset.active='false';button.textContent='１分タイマー';return;
  }
  const end=Date.now()+60000;
  button.dataset.active='true';
  button.textContent='1:00 · 停止';
  timer=setInterval(()=>{
    const seconds=Math.max(0,Math.ceil((end-Date.now())/1000));
    button.textContent=seconds?`0:${pad(seconds)} · 停止`:'１分タイマー';
    if(!seconds){clearInterval(timer);button.dataset.active='false';feedback('１分経ちました。見本と確認ポイントを開けます。');}
  },200);
}
function resetQuiz(){
  clearAnswerConsultation();
  clearInterval(timer);
  stopSpeech();
  questionIndex=0;answer='';correct=0;finished=false;graded=false;
}
function openUnit(index){
  if(!lessons[index])return;
  cancelTutor('question');
  lessonIndex=index;boardIndex=0;expanded.add(lessons[index].level);
  resetQuiz();
  persist();sidebar();renderLesson();setMobileIndex(false);
  $('lessonTitle').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
}

function openSettings(){
  $('keyInput').value='';
  $('keyStatus').textContent=apiKey?'このページでAI先生が使えます。':'';
  $('forgetKey').disabled=!apiKey;
  $('settingsDialog').showModal();
}
function renderTutor(){
  $('tutorIntro').textContent=apiKey?'質問を書いて送ると、今の板書に沿って説明します。':'APIキーを設定すると、今の板書について質問できます。';
  $('connectTutor').hidden=!!apiKey;
  $('tutorForm').hidden=!apiKey;
}
function cancelTutor(mode){
  tutorRequests[mode]?.abort();
  delete tutorRequests[mode];
}
function clearAnswerConsultation(){
  cancelTutor('answer');
  if(!$('coach'))return;
  $('coach').disabled=false;
  $('coachStatus').textContent='';
  $('coachReply').textContent='';
}
async function askTeacher(useAnswer){
  const mode=useAnswer?'answer':'question';
  if(tutorRequests[mode])return;
  const message=useAnswer?'':$('tutorPrompt').value.trim();
  const currentAnswer=useAnswer?answer.trim():'';
  const status=$(useAnswer?'coachStatus':'tutorStatus');
  if(navigator.onLine===false){status.textContent='AI先生への相談にはインターネット接続が必要です。';return;}
  if(useAnswer&&!currentAnswer){status.textContent='先に答えを入力または選択してください。';return;}
  if(!apiKey){openSettings();return;}
  if(!useAnswer&&!message){$('tutorStatus').textContent='質問を入力してください。';$('tutorPrompt').focus();return;}
  const lesson=lessons[lessonIndex];
  const question=lesson.questions[questionIndex];
  const controller=new AbortController();
  tutorRequests[mode]=controller;
  const reply=$(useAnswer?'coachReply':'tutorReply');
  const button=$(useAnswer?'coach':'askSubmit');
  button.disabled=true;
  status.textContent='先生が考えています…';reply.textContent='';
  try {
    const result=await fetch('/api/tutor',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${apiKey}`},body:JSON.stringify({lesson:lesson.id,board:boardIndex,question:questionIndex,mode:question.model?'composition':'grammar',message,useAnswer,answer:currentAnswer}),signal:controller.signal});
    const payload=await result.json().catch(()=>({}));
    if(!result.ok||typeof payload.reply!=='string')throw new Error(payload.error||'AI先生に接続できませんでした。');
    if(tutorRequests[mode]===controller){
      status.textContent='';
      reply.textContent=payload.reply;
    }
  }catch(error){
    if(tutorRequests[mode]===controller&&error.name!=='AbortError')status.textContent=error.message;
  }finally{
    if(tutorRequests[mode]===controller){
      delete tutorRequests[mode];
      button.disabled=false;
    }
  }
}
function setMobileIndex(open){
  $('syllabus').classList.toggle('open',open);
  $('mobileIndex').setAttribute('aria-expanded',String(open));
}
$('mobileIndex').setAttribute('aria-controls','syllabus');
$('mobileIndex').setAttribute('aria-expanded','false');
$('mobileIndex').addEventListener('click',()=>setMobileIndex(!$('syllabus').classList.contains('open')));
$('units').addEventListener('click',ev=>{
  const button=ev.target.closest('[data-unit]');
  if(button)openUnit(Number(button.dataset.unit));
});
$('settings').addEventListener('click',openSettings);
$('closeSettings').addEventListener('click',()=>$('settingsDialog').close());
$('settingsDialog').addEventListener('close',()=>$('keyInput').value='');
$('forgetKey').addEventListener('click',()=>{
  cancelTutor('question');
  clearAnswerConsultation();
  $('askSubmit').disabled=false;
  apiKey='';$('keyStatus').textContent='接続を解除しました。';$('forgetKey').disabled=true;
  $('tutorStatus').textContent='';$('tutorReply').textContent='';$('keyInput').value='';renderTutor();
});
$('keyForm').addEventListener('submit',ev=>{
  ev.preventDefault();
  const value=$('keyInput').value.trim();
  if(!/^sk-[A-Za-z0-9_-]{12,500}$/.test(value)){$('keyStatus').textContent='sk- で始まる有効な形式のキーを入力してください。';return;}
  apiKey=value;renderTutor();$('settingsDialog').close();
});
sidebar();
renderLesson();
