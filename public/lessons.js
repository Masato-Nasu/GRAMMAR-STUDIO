export const levels = [
  {id:'core', name:'中学の基礎', en:'FOUNDATION', note:'文を組み立てる'},
  {id:'high', name:'高校英文法', en:'STRUCTURE', note:'節と構文を読み解く'},
  {id:'first', name:'B2 First 対策', en:'EXAM PRACTICE', note:'文脈の中で使い分ける'}
];

const step = (title, example, note, translation = '') => ({title, example, note, translation});
const pick = (prompt, options, answer, hint, why, diagnoses = {}) =>
  ({prompt, options, answers:[answer], hint, why, diagnoses});
const write = (prompt, answers, hint, why, extra = {}) =>
  ({prompt, answers, hint, why, ...extra});
const unit = (id, level, title, en, goal, rule, steps, questions) =>
  ({id, level, title, en, goal, rule, steps, questions});

export const lessons = [
unit('be','core','be動詞と一般動詞','BE & ACTION VERBS',
  '「どんな状態か」と「何をするか」を見分け、疑問文を作れる。',
  'be動詞がある文は be を主語の前に。現在の一般動詞だけの文は do / does を使う。',
  [
    step('状態を表す','{s:You} {a:are} {x:ready}.','are は主語 you と状態 ready を結びます。ready は「準備ができた」という形容詞です。','あなたは準備ができています。'),
    step('行動を表す','{s:You} {v:play} tennis.','play は「する」という動作を表す一般動詞です。現在の習慣や普段の行動を表せます。','あなたはテニスをします。'),
    step('質問に変える','{a:Are} {s:you} ready? / {a:Do} {s:you} {v:play} tennis?','be動詞は自分で前に移れます。一般動詞 play は元の位置に残り、その前に質問の目印 do を置きます。','準備はできていますか？／テニスをしますか？'),
    step('主語が she のとき','{s:She} {v:likes} music. → {a:Does} {s:she} {v:like} music?','肯定文の likes の -s は主語 she に対応します。疑問文では does がその役目を受け持つため、like は原形になります。')
  ],[
    pick('「あなたは疲れていますか？」に合うのは？',['Are you tired?','Do you tired?','Do you are tired?'],'Are you tired?','tired は動作を表す動詞でしょうか？','tired は形容詞です。You are tired. の are を主語の前に出します。',{'Do you tired?':'do の後ろに来る一般動詞がありません。tired は形容詞です。','Do you are tired?':'are がすでにあるので、疑問文を作るための do は不要です。'}),
    write('She likes music. を疑問文にしよう。',['Does she like music?'],'she のときは do と does のどちら？ does の後ろの動詞の形も確認しよう。','Does が主語 she に対応するので、likes は原形 like に戻ります。'),
    pick('「彼は毎朝走りません。」に合うのは？',['He isn’t run every morning.','He doesn’t runs every morning.','He doesn’t run every morning.'],'He doesn’t run every morning.','run は一般動詞。否定を表すのは doesn’t です。','doesn’t の後ろには原形 run を置きます。',{'He doesn’t runs every morning.':'does がすでに三人称単数の形を持っています。runs の -s を外します。'})
  ]),
unit('past','core','過去形と did','THE PAST SIMPLE',
  '過去の出来事を肯定・疑問・否定の３通りで言える。',
  '肯定文では動詞の過去形。一般動詞の疑問・否定では did が過去を表し、後ろは原形。',
  [
    step('過去の出来事','{s:Mika} {v:watched} a film yesterday.','watch に -ed を付けます。不規則に変わる動詞もあり、go の過去形は went です。','ミカは昨日、映画を見ました。'),
    step('過去の質問','{a:Did} {s:Mika} {v:watch} a film yesterday?','過去の目印が watched から did に移ります。watch に -ed を付けません。'),
    step('過去の否定','{s:Mika} {a:did not} {v:watch} a film yesterday.','did not は didn’t と短くできます。be動詞は別の型で、She was tired. → Was she tired? のように変えます。')
  ],[
    pick('Did you ___ to school yesterday?',['went','go','going'],'go','過去を表している語はどれ？','did が過去を表すので、その後ろは原形の go です。',{'went':'went 自体は正しい過去形です。この文では did が過去を表しています。'}),
    write('They played outside. を短縮形を使って否定文にしよう。',["They didn’t play outside."],'did not の短縮形を使い、played を変えよう。','didn’t が否定と過去を受け持つため、play は原形です。'),
    pick('「彼女は昨日忙しかったですか？」',['Did she be busy yesterday?','Was she busy yesterday?','Were she busy yesterday?'],'Was she busy yesterday?','この文の動詞は be です。','主語 she に対応する過去形は was。疑問文では was を前に移します。')
  ]),
unit('aspect','core','現在形と進行形','HABITS & ACTIONS IN PROGRESS',
  '習慣と進行中の行動を区別し、状態動詞にも注意できる。',
  '現在形は習慣・一般的な事実。進行形は be ＋ -ing で、進行中の行動や一時的な状況を表す。',
  [
    step('習慣','{s:Kai} {v:walks} to school every day.','every day という頻度の手がかりがあります。現在形は、その瞬間に歩いているかどうかとは無関係です。','カイは毎日、歩いて学校に行きます。'),
    step('今やっていること','{s:Kai} {a:is} {v:walking} to school now.','be動詞は主語と時制に合わせ、-ing で動作が進行中であることを表します。','カイは今、歩いて学校に向かっています。'),
    step('状態を表す動詞','{s:I} {v:know} the answer. / {s:I} {a:am} {v:thinking} about it.','know は知っている状態なので、普通は進行形にしません。think about は「考えている最中」を表せます。think that の「〜だと思う」は普通、現在形です。')
  ],[
    pick('Look! It ___ outside.',['rains','is raining','rain'],'is raining','Look! は今起きていることを指しています。','今目の前で起きていることなので is raining。'),
    write('She reads a book. を「今、本を読んでいる」という文にしよう。',['She is reading a book now.','She is reading a book.'],'she に合う be動詞と、read の -ing 形を使おう。','is reading で進行中の動作を表します。now は文脈から明らかなら省けます。'),
    pick('「私はその答えを知っています。」',['I know the answer.','I am knowing the answer.','I do knowing the answer.'],'I know the answer.','「知っている」は状態です。','know は状態動詞です。この意味では現在形が自然です。')
  ]),
unit('modal','core','助動詞と義務・可能性','MODAL VERBS',
  'can、must、should、may を区別し、否定で意味が変わる例を説明できる。',
  '助動詞の後ろは動詞の原形。否定は助動詞に not を足す。mustn’t と don’t have to は意味が違う。',
  [
    step('能力・可能性','{s:Mia} {a:can} {v:swim}. / It {a:may} {v:rain}.','can は能力や可能性、may は不確かな可能性を表せます。can / may の後ろに swims や rains は置きません。'),
    step('助言と義務','You {a:should} rest. / You {a:must} wear a helmet.','should は「そうしたほうがよい」、must は強い必要性です。ルールの根拠や状況に応じて選びます。'),
    step('禁止と不要','You {a:mustn’t} enter. / You {a:don’t have to} come.','mustn’t は「してはいけない」。don’t have to は「する必要がない」で、するかどうかは自由です。')
  ],[
    pick('「来なくてもいいよ」に合うのは？',['You mustn’t come.','You don’t have to come.','You may not come.'],'You don’t have to come.','来ることは禁止されていますか、それとも任意ですか？','必要性を否定するので don’t have to です。'),
    write('He swims well. を can を使って「彼は上手に泳げる」にしよう。',['He can swim well.'],'can の後ろは原形。','主語が he でも can に -s を付けず、swim も原形にします。'),
    pick('「鍵がかかっているかもしれない。」 The door ___ locked.',['may be','should to be','can is'],'may be','助動詞の後ろに置く be の形は？','may で可能性を表し、be は原形です。')
  ]),
unit('perfect','core','現在完了と過去形','THE PRESENT PERFECT',
  '過去の一点と、過去から現在につながる事柄を区別できる。',
  'have / has ＋ 過去分詞。現在とのつながりを示す。yesterday や in 2022 で終わった時を示すときは通常、過去形。',
  [
    step('終わった時を指定する','{s:I} {v:lost} my key yesterday.','いつ起きたかを yesterday で示します。この文だけでは、今も鍵がないかどうかは分かりません。','私は昨日、鍵をなくしました。'),
    step('現在の状況につなげる','{s:I} {a:have} {v:lost} my key.','今も見つからない、という現在の結果が重要です。過去分詞は lost。went と gone のように過去形と違う場合もあります。','鍵をなくしてしまいました。'),
    step('継続と経験','I {a:have} lived here {x:since 2022}. / I {a:have} visited York twice.','since は起点、for は期間。経験では「今までに」を範囲にして回数を言えます。具体的な訪問日を尋ねるなら When did you go? が自然です。')
  ],[
    pick('I ___ this book last week.',['have bought','bought','have buy'],'bought','last week は今も続く期間ですか？','last week は終わった過去の期間なので、通常は過去形 bought を使います。'),
    pick('We’ve lived here ___ five years.',['since','for','during'],'for','five years は起点か、期間か？','five years は長さなので for。since なら since 2021 のように起点が続きます。'),
    write('「彼女はもう昼食を食べました。」を現在完了で。',['She has already eaten lunch.',"She’s already eaten lunch.",'She has eaten lunch already.','She’s eaten lunch already.'],'主語 she には has。eat の過去分詞は eaten。','has eaten が現在完了。already は has と eaten の間や文末に置けます。')
  ]),
unit('passive','core','受動態と文の焦点','THE PASSIVE VOICE',
  '行う側と受ける側を区別し、時制を保って受動態にできる。',
  '目的語を主語にして be ＋ 過去分詞。時制を持つのは be。行為者が必要なら by で示す。',
  [
    step('行う人を主語にする','{s:The staff} {v:clean} {o:the room} every day.','staff が行為者。the room は clean される対象です。','スタッフはその部屋を毎日掃除します。'),
    step('対象を主語にする','{s:The room} {a:is} {v:cleaned} every day.','部屋について説明しているので the room が主語です。行為者が明らかなら省けます。','その部屋は毎日掃除されます。'),
    step('過去や助動詞を組み合わせる','The room {a:was} {v:cleaned} yesterday. / It {a:must be} {v:cleaned} today.','過去は is を was に。must の後ろは be の原形です。どちらも cleaned は過去分詞のままです。')
  ],[
    pick('This bridge ___ in 1998.',['built','is built','was built'],'was built','橋は建てる側ですか？ 時を表す語句は？','橋は建てられる対象で、1998年の出来事なので was built。'),
    write('People speak English here. を English から始まる受動態に。',['English is spoken here.'],'speak の過去分詞は spoken。','English を主語にし、現在の is と spoken を組み合わせます。'),
    pick('The form must ___ by Friday.',['be sent','is sent','send'],'be sent','must の直後は原形。提出されるのは用紙です。','must の後ろに原形 be を置き、過去分詞 sent を続けます。')
  ]),
unit('clauses','high','文型と名詞節','CLAUSE STRUCTURE',
  '主節と従属節を見分け、間接疑問で平叙文の語順を使える。',
  '一つの節が主語や目的語になれる。間接疑問の中は疑問詞 ＋ 主語 ＋ 動詞の語順。',
  [
    step('文の中に節を置く','{s:I} {v:know} {o:[that she likes music]}.','know の目的語は角括弧全体です。that 節の内部には別の主語 she と動詞 likes があります。'),
    step('疑問文をそのまま入れない','Where {a:does} {s:he} {v:live}? → I wonder {o:[where he lives]}.','主節の中に入った疑問は where he lives。疑問文を作るためだけの does は消え、lives に -s が戻ります。'),
    step('疑問詞が主語の場合','{s:Who} {v:called} you? → I know {o:[who called you]}.','who 自体が主語なので、もともと who の直後に動詞が来ます。Yes / No で答える疑問を埋め込むときは whether または if を使えます。')
  ],[
    pick('Could you tell me ___?',['where is the station','where the station is','where does the station be'],'where the station is','where の後ろは主語が先です。','Could you tell me が質問を作ります。埋め込まれた節は the station is の語順です。'),
    write('Where does she work? を I don’t know に続けよう。',["I don't know where she works.",'I do not know where she works.'],'does を外したあと、work の形は？','where she works が know の目的語。主語 she に合わせて works とします。'),
    pick('「会議が始まったかどうか分かりません。」 I don’t know ___ the meeting has started.',['that','what','whether'],'whether','元の質問は Yes / No で答えられます。','whether は「〜かどうか」。that は内容を事実として述べる節を導きます。')
  ]),
unit('relatives','high','関係詞と説明の範囲','RELATIVE CLAUSES',
  '関係節がどの名詞を説明するか、情報を絞るか補足するかを判断できる。',
  '名詞の後ろに説明を付ける。関係詞が節の主語なら省略不可。目的語なら限定用法で省略できる。',
  [
    step('主語の席を埋める','The student {x:[who called me]} is in my class.','who は called の主語で、the student を指します。「電話した生徒」と対象を絞っています。'),
    step('目的語の席を埋める','The book {x:[(that) I bought __]} was expensive.','I が節の主語で、bought の目的語は先行詞 the book。ここでは that を省略できます。'),
    step('コンマで補足する','My bike, {x:[which I bought last year]}, needs a repair.','どの自転車かは my bike で特定済み。関係節は補足です。この型では that を使ったり関係詞を省いたりしません。')
  ],[
    pick('The woman ___ helped me was a nurse.',['who','whom','省略できる'],'who','helped の主語がどこにありますか？','who が helped の主語です。主語なので省略不可です。'),
    write('The bag is mine. I left it here. を that を使って一文に。',['The bag that I left here is mine.'],'it の役割を that が引き受けます。','that I left here が bag を限定します。left の後ろの it は取り除きます。'),
    pick('My sister, ___ lives in Osaka, is visiting next week.',['that','who','省略できる'],'who','コンマで挟まれた補足の関係節です。','人への補足では who を使います。that はコンマ付きの非限定用法に使えません。')
  ]),
unit('verb-patterns','high','動名詞と不定詞','VERB PATTERNS',
  '動詞の後ろの型を選び、型によって意味が変わる場合を説明できる。',
  'enjoy / avoid は -ing、decide / hope は to ＋ 原形。stop や remember は型で意味が変わる。',
  [
    step('後ろの型をセットで覚える','I {v:enjoy} {o:reading}. / I {v:decided} {o:to read}.','enjoy reading は読書を楽しむ、decided to read は読むことに決めた。動詞ごとに取れる型があります。'),
    step('stop の後ろで意味が変わる','I {v:stopped} {o:running}. / I {v:stopped} {x:to rest}.','stopped running は走るのをやめた。stopped to rest は休むために立ち止まった。to rest は止まった目的です。'),
    step('remember の時間関係','Remember {o:to lock} the door. / I remember {o:locking} it.','to lock はこれから忘れずにすること。locking はすでにしたことの記憶です。')
  ],[
    pick('She avoided ___ the same mistake.',['make','to make','making'],'making','avoid の後ろの型を思い出そう。','avoid は -ing を取ります。'),
    pick('「写真を撮るために立ち止まった。」 We stopped ___ a photo.',['taking','to take','take'],'to take','写真撮影をやめたのか、撮ることが止まった目的なのか？','目的を示す to take を選びます。'),
    write('「窓を閉めるのを忘れないで。」を Remember で始めよう。',['Remember to close the window.'],'閉めるのはこれから。','remember to do はこれからすることを忘れずに行う、という意味です。')
  ]),
unit('participles','high','分詞と分詞構文','PARTICIPLE CLAUSES',
  '分詞が説明する対象を見つけ、分詞構文の意味上の主語を確認できる。',
  '名詞を説明する -ing / 過去分詞と、主節に状況を足す分詞構文を見分ける。',
  [
    step('名詞を後ろから説明する','The boy {x:[waiting at the door]} is my brother. / The cake {x:[made by Ana]} looks great.','boy は待つ側なので waiting。cake は作られる側なので made。分詞のまとまりは直前の名詞を説明します。'),
    step('主節に状況を添える','{x:[Feeling tired]}, {s:I} {v:went} home early.','疲れを感じていたのは主節の主語 I。ここでは Because I felt tired のように理由を補います。文脈によって時や付帯状況を示すこともあります。'),
    step('誰がその動作をするか','{x:[Walking home]}, {s:I} noticed the sky.','Walking の意味上の主語は通常、主節の主語と同じです。Walking home, the sky turned pink. では、空が歩くように読めてしまいます。')
  ],[
    pick('The windows ___ in the storm were replaced.',['breaking','broken','broke'],'broken','窓は壊された側です。','broken in the storm が windows を修飾し、文全体の動詞は were replaced です。'),
    pick('分詞の意味上の主語が自然なのは？',['Driving home, the rain began.','Driving home, I saw a rainbow.','Driving home, the road was wet.'],'Driving home, I saw a rainbow.','運転していたのは誰？','運転者は I。分詞構文と主節で主語が一致します。'),
    write('Because I felt nervous, I spoke slowly. を Feeling で始めよう。',['Feeling nervous, I spoke slowly.'],'Feeling nervous の後ろに主節を残そう。','分詞構文にすると because と従属節の主語 I を落とせます。意味上の主語は主節の I です。')
  ]),
unit('conditional','high','条件文と仮定法','CONDITIONALS',
  '現実的な条件、現在の仮定、過去の反事実を区別できる。',
  '過去形は仮定との距離にも使う。過去の反事実は if ＋ had ＋ 過去分詞、結果は would have ＋ 過去分詞。',
  [
    step('起こりうる条件','{x:If it rains tomorrow}, we {a:will} stay home.','明日のことでも、通常の条件を述べる if 節では現在形 rains を使います。will は結果の側に置きます。'),
    step('現在と距離のある仮定','{x:If I had more time}, I {a:would} learn French.','had は今の状況から距離を取った仮定。現実には時間が足りない、という含みがあります。'),
    step('変えられない過去を想像する','{x:If I had left earlier}, I {a:would have} caught the train.','実際は早く出ず、電車に間に合わなかったという過去の反事実です。had left は条件、would have caught は結果です。')
  ],[
    pick('If I ___ you, I would ask for help.',['am','were','had been'],'were','今の状況を仮に入れ替えています。','If I were you は現在の仮定を使った助言です。'),
    pick('If we had booked earlier, we ___ seats.',['would get','will have got','would have got'],'would have got','予約も座席の確保も、すでに終わった過去です。','過去の反事実の結果は would have ＋ 過去分詞。got はここではイギリス英語の形です。'),
    write('If you leave now, you ___ the bus. 「バスに間に合うでしょう」',["will catch"],'起こりうる未来の結果です。','if 節は leave の現在形。結果の節に will catch を置きます。')
  ]),
unit('reported','high','話法と時制の視点','REPORTED SPEECH',
  '直接話法を間接話法に変え、時制や時を表す語の変化を説明できる。',
  '発言を別の時点から伝えるときは時制を一段戻すことが多い。代名詞や時の語は伝える視点に合わせる。',
  [
    step('発言の時点に戻る','“I {a:am} tired,” she said. → She said she {a:was} tired.','am は発言時の現在。said の時点から伝えると was にできます。この was は「発言より前に疲れていた」という意味にはなりません。'),
    step('時の語を視点に合わせる','“I will call you tomorrow.” → He said he {a:would} call me {x:the next day}.','tomorrow は元の話者が話した日の翌日。別の日から伝える例では the next day に変えます。'),
    step('現在も事実なら','She said she {v:lives} in Kyoto. / She said she {v:lived} in Kyoto.','今も京都に住んでいることを話し手が現在の事実として扱うなら lives も自然です。lived は元の発言を過去の視点から伝えます。')
  ],[
    pick('昨日「明日電話する」と言った内容を、翌週に伝える。 He said he ___ call me the next day.',['will','would','had'],'would','元の will を過去の発言の視点から伝えます。','will を would にします。the next day は元の発言の翌日です。'),
    write('“Where are you going?” he asked me. → He asked me ...',['He asked me where I was going.','where I was going.'],'疑問節の中では主語 I が先です。','間接疑問の語順は where I was going。you は話を伝える人の I になります。'),
    pick('“I can help.” → She said she ___ help. 過去の発言として伝えよう。',['could','had could','would can'],'could','can の過去の視点に対応する形です。','この話法では can は could に変わります。')
  ]),
unit('inference','high','助動詞と推量','DEDUCTION & EVIDENCE',
  '根拠に応じて現在・過去の推量を言い分けられる。',
  'must は強い肯定の推量、might は可能性、can’t は強い否定の推量。過去は have ＋ 過去分詞を続ける。',
  [
    step('証拠から推測する','The lights are on. Someone {a:must be} inside.','ここでの must は義務ではなく、「きっと〜だ」という根拠に基づく推測です。'),
    step('否定の推量をする','That {a:can’t be} Sam. He’s abroad this week.','can’t be は「〜のはずがない」。この意味で mustn’t を使うと、禁止など別の意味に読まれやすくなります。'),
    step('過去に何があったか考える','I {a:might have} {v:left} my keys at school.','過去の可能性なので might have left。must have left なら強い確信になります。')
  ],[
    pick('She knows every detail. She ___ the report already.「きっと読んだはずだ」',['must read','must have read','must be read'],'must have read','読むという出来事はすでに終わっています。','過去についての強い推量は must have ＋ 過去分詞。'),
    pick('This ___ be his coat. His coat is blue and this one is red.',['must','can’t','mustn’t'],'can’t','色が違うので、その可能性を強く否定します。','can’t be が「〜のはずがない」を表します。'),
    write('「彼女は道に迷ったのかもしれない。」 She ___ lost. イギリス英語で。',['might have got','may have got','could have got'],'過去の可能性は might / may / could ＋ have ＋ 過去分詞。','get lost の過去の可能性を might have got lost などで表せます。')
  ]),
unit('contrast','high','譲歩・目的・結果','CONNECTING IDEAS',
  '接続詞と前置詞の後ろの形を見分け、論理関係を示せる。',
  'although は節、despite は名詞や -ing。so that は目的の節。so ＋ 形容詞 ＋ that は結果。',
  [
    step('意外な対比を示す','{x:Although it was raining}, we went out. / {x:Despite the rain}, we went out.','although の後ろには主語と動詞。despite の後ろには名詞句が来ます。節を使うなら despite the fact that ... の形です。'),
    step('目的を示す','I wrote it down {x:so that I wouldn’t forget}.','「忘れないために」がメモした目的。主語が同じなら I wrote it down so as not to forget. とも言えます。'),
    step('結果を示す','It was {x:so cold that the lake froze}.','so が cold の程度を強め、that 以下が結果を示します。such a cold day that ... では such の後ろに名詞句が来ます。')
  ],[
    pick('___ being tired, he finished the work.',['Although','Despite','Because'],'Despite','being tired は主語と時制を持つ節ですか？','despite は -ing を取れます。although なら although he was tired が自然です。'),
    pick('It was ___ a long journey that we stayed overnight.',['so','such','too'],'such','a long journey 全体は名詞句です。','such ＋ 名詞句 ＋ that。so なら so long that のように形容詞を直接修飾します。'),
    write('Although it was noisy, I could concentrate. を Despite から始めよう。',['Despite the noise, I could concentrate.','Despite it being noisy, I could concentrate.','Despite the fact that it was noisy, I could concentrate.','Despite its being noisy, I could concentrate.'],'noisy を名詞の noise に置き換えられます。','Despite the noise は前置詞と名詞句です。despite the fact that を使えば元の節も残せます。')
  ]),
unit('open','first','文脈から補う空所補充','USE OF ENGLISH · PART 2',
  '文の形と前後の論理を手掛かりに、空所に入る一語を判断できる。',
  'まず空所の文法上の役割を決める。次に、前後の意味と自然な語の組み合わせで候補を絞る。',
  [
    step('空所の後ろから考える','We are looking forward {x:___} meeting the other teams.','look forward to は決まった組み合わせ。ここでの to は前置詞なので後ろは meeting になります。'),
    step('前の文に戻る','I expected the workshop to be difficult. It turned {x:___} to be quite easy.','turn out to be は「結果的に〜だと分かる」。前の予想と実際の結果の対比をつなぎます。'),
    step('文全体に戻して確かめる','There were {x:so} many visitors {x:that} we had to wait outside.','so many ＋ 名詞 ＋ that で程度と結果を表します。空所だけを見ずに、that 以下も確認します。')
  ],[
    write('We expected very few visitors. In fact, there were so many people ___ we had to turn some away.',['that'],'so many people が後ろの結果とつながります。','so many ... that ... が「とても多かったので〜」の構文です。',{limit:[1,1]}),
    write('I have been interested ___ photography since I was twelve.',['in'],'interested と組み合わさる前置詞です。','be interested in ＋ 名詞で「〜に関心がある」。',{limit:[1,1]}),
    write('The club is run by volunteers, many of ___ are still at school.',['whom'],'many of の後ろで volunteers を指します。','前置詞 of の目的語にあたる人の関係代名詞は whom。',{limit:[1,1]})
  ]),
unit('formation','first','語形成と品詞の見分け','USE OF ENGLISH · PART 3',
  '空所に必要な品詞と意味を判断して、与えられた語を変形できる。',
  '品詞 → 肯定・否定 → 単数・複数 → つづりの順に確認。語尾だけで決めず、文全体で読む。',
  [
    step('品詞の席を見る','The instructions were surprisingly {x:clear}.','were の後ろで主語を説明し、surprisingly に修飾される場所なので形容詞 clear が入ります。'),
    step('意味から接頭辞を選ぶ','The instructions were {x:unclear}, so nobody knew what to do.','後半に「誰も何をすべきか分からなかった」とあるので、否定の un- を足します。'),
    step('つづりと数を確認する','The club offers several {x:activities} for new members.','ACTIVE から activity、several があるので複数形 activities。語尾 -y を -ies にします。')
  ],[
    write('No one had predicted a storm, and the match was cancelled ___ just before it began. [EXPECT]',['unexpectedly'],'cancelled の起こり方を説明します。文脈上「予想外に」。','expect → expected → unexpected → unexpectedly。空所は副詞で、否定の接頭辞が必要です。'),
    write('We are looking for an ___ solution to the problem. [EFFECT]',['effective'],'solution の直前なので、その性質を説明する品詞です。','effect → effective。「効果のある」という形容詞です。'),
    write('Several ___ have been made to the original design. [IMPROVE]',['improvements'],'several と have を手掛かりに。','improve → improvement → improvements。複数名詞が必要です。')
  ]),
unit('transform','first','同じ意味への書き換え','USE OF ENGLISH · PART 4',
  '意味・時制・否定・比較を保ち、指定語を変えずに２〜５語で書き換えられる。',
  '元の文の意味の核を拾い、指定語を使う構文に移す。空所の前後までつなげて確認する。',
  [
    step('語数と指定語を確認する','It’s two years since I last saw Ana. → I {x:have not seen} Ana for two years.','指定語 SEEN は変えません。空所の have not seen は３語。練習では短縮形は展開した形で数えます。'),
    step('禁止と不要を区別する','You don’t need to bring a towel. → You {x:do not have to} bring a towel.','指定語 HAVE。不要を表すので must not は選べません。'),
    step('主体と比較の向きを確認する','Mia is taller than Leo. → Leo is {x:not as tall as} Mia.','指定語 AS。主語を Leo に替えたので、比較の向きを逆にし、元と同じ事実を表します。')
  ],[
    write('I last visited Bristol three years ago.\nI ___ Bristol for three years. [VISITED]',["have not visited","haven’t visited"],'「３年間訪れていない」という現在完了の否定にします。','have not visited で「過去から今まで訪れていない」。for の後ろは期間です。',{limit:[2,5],key:'visited'}),
    write('Although it was raining, they played outside.\nThey played outside ___ it was raining. [FACT]',['despite the fact that'],'despite を使うと４語です。空所の後ろに it was raining が続きます。','despite the fact that ＋ 節で譲歩を表せます。',{limit:[2,5],key:'fact'}),
    write('The last train was too crowded for us to get on.\nThere ___ for us to get on the last train. [ENOUGH]',["was not enough room","wasn’t enough room","was not enough space","wasn’t enough space"],'too crowded を、乗るだけの空きがなかったと言い換えます。','not enough room / space で乗るための空きが不足していたことを表せます。',{limit:[2,5],key:'enough'})
  ]),
unit('collocation','first','語の組み合わせと意味の差','USE OF ENGLISH · PART 1',
  '選択肢の意味が似ていても、語の組み合わせと文脈で区別できる。',
  '単語一つの和訳より、前後と自然に結び付くまとまりを読む。前置詞や後ろの型も手掛かりにする。',
  [
    step('名詞との組み合わせ','It took me a while to {x:make a decision}.','make a decision は決断するというまとまり。do も「する」と訳せますが、ここでは組み合わせが違います。'),
    step('句動詞は前置詞まで見る','The new manager will {x:take over} next month.','take over は仕事や責任などを引き継ぐ。take up は活動を始める、take after は人に似る、という意味になります。'),
    step('似た語の役割を見る','The coach {x:raised} the issue at the meeting. / Prices {x:rose}.','raise は目的語を取り「何かを上げる・提起する」。rise は主語が「上がる」。意味に加え、後ろに目的語があるかで区別します。')
  ],[
    pick('We need to ___ a solution before Friday.',['do','find','take','hold'],'find','「解決策を見つける」の自然な組み合わせ。','find a solution が自然です。do / take / hold a solution はこの意味になりません。'),
    pick('I decided to take ___ photography after school.',['over','after','off','up'],'up','新しく趣味を始める場面です。','take up は趣味や活動を始める、という意味です。'),
    pick('The speaker ___ an important question about privacy.',['rose','raised','grew','climbed'],'raised','question は動詞の目的語です。','raise a question は質問や論点を提起する、という組み合わせです。')
  ]),
unit('essay','first','エッセイの論理を組み立てる','WRITING · ESSAY',
  '主張・理由・具体例をつなげ、課題に対する立場を一貫して示せる。',
  '設問の論点をすべて扱う。主張を述べ、理由を説明し、例で具体化してから結論へ進む。',
  [
    step('設問から構成を作る','Should schools give students less homework?','「家庭での時間」と「学習の習慣」が指定されたと仮定します。自分の論点として「宿題の量より質」を加え、３つとも本文で扱います。'),
    step('理由を一段掘る','Shorter assignments could improve focus {x:because} students would have a clearer goal.','単に「良いと思う」で終わらず、なぜ良いのかを一文で説明します。could / may で根拠以上の断定を避けられます。'),
    step('譲歩して判断する','{x:Although} homework can build good habits, carefully chosen tasks may be more useful than longer ones.','反対側の利点を認めてから、自分の判断へ戻します。B2 Firstの本番では指定の語数と課題の指示に従います。')
  ],[
    pick('「宿題は習慣作りに役立つ。それでも量は減らすべき」を表すつなぎ語は？',['For example,','However,','As a result,'],'However,','後半は前半と対照的な判断です。','However は対比をつなぎます。As a result は因果、For example は例示です。'),
    pick('理由を一番具体的に示す文は？',['Homework is important because it matters.','Homework is important in many ways.','Regular short tasks help students notice what they still need to practise.'],'Regular short tasks help students notice what they still need to practise.','何が、どう学習に役立つかを説明している文を探そう。','短い課題が弱点に気づく機会を作る、という理由まで書いています。'),
    write('___ homework can build good habits, long assignments may leave students too tired to learn.',['Although','Though','Even though','While','Whilst'],'前半の良い点を認め、後半で対比します。','Although / Though / Even though は譲歩。While / Whilst もこの文脈では対比を表せます。')
  ])
];

const reading = 'The school’s repair café was meant to be a one-day event. The organisers expected people to bring broken objects, leave them on a table and come back later. Instead, most visitors stayed to watch, and several asked to try the repairs themselves. By the end of the afternoon, the volunteers had fixed only half the objects, but they had a list of twenty people who wanted to help at the next event. The organisers were surprised. Until then, they had counted success in repairs completed. Now they are planning shorter repair sessions with more time for visitors to learn.';
const listening = 'Ella: The online advert said the photography workshop started at half past ten. I arrived early, but the studio was locked. Ben: They changed the time to eleven on Thursday. Did you see the message? Ella: I did, but it said the afternoon group would start later. I thought it didn’t apply to us. The receptionist explained that both groups had moved. I nearly went home, but I stayed because the tutor let us borrow cameras. I hadn’t been able to bring mine.';

lessons.push(
unit('reading','first','筆者の見方を読む','READING · MULTIPLE CHOICE',
  '事実・推測・筆者の態度を分け、根拠の箇所を探せる。',
  '各選択肢を本文に戻して、同じ事実を表すか確認する。話題が同じだけの選択肢には注意。',
  [
    step('まず変化をつかむ','{x:At first}, the club measured success by ticket sales. {x:Later}, it looked at how many students returned.','At first と Later は時間の対比です。この例では、販売枚数から、再び来た生徒の数へと成功の基準が移りました。'),
    step('数字と筆者の評価を分ける','The team sold {x:only fifteen} tickets, {x:but} everyone who came signed up for another event.','only は販売枚数が期待ほど多くなかったことを示し、but の後ろに別の成果が来ます。数字だけで失敗と判断すると後半を取り落とします。')
  ],[
    {...pick('What surprised the organisers most?',['Visitors wanted to take part.','The repairs took less time than planned.','People brought very few objects.','The event ended earlier than expected.'],'Visitors wanted to take part.','Instead の後ろで、訪問者の行動がどう変わったか確認しよう。','Instead, most visitors stayed ... and several asked to try ... が根拠です。'),passage:reading},
    {...pick('What will probably be different next time?',['Visitors will have to pay for repairs.','The event will focus more on teaching.','Volunteers will repair every object.','The café will stop accepting broken objects.'],'The event will focus more on teaching.','最後の文の with more time の後ろに注目。','with more time for visitors to learn が根拠です。支払いや受け付けについては述べていません。'),passage:reading}
  ]),
unit('listening','first','聞き取りで言い換えを拾う','LISTENING · SHORT DIALOGUE',
  '発話の途中の訂正や、判断の理由を聞き取れる。',
  '数字や単語の一致だけで決めず、何に対する数字か、話者が実際にしたことは何かを聞く。',
  [
    step('聞く前に焦点を決める','{x:What changed?} / {x:Why did she stay?}','選択肢を先に読み、時間の変更と行動の理由を聞き分けます。'),
    step('対比と訂正を待つ','I thought ... {x:but} ... / The receptionist {x:explained} ...','最初の思い込みが後から訂正されることがあります。but や explained の前後を一組として聞きます。'),
    step('２回目で根拠を確かめる','{x:because} I had promised to help','because の後ろは行動の直接の理由です。この練習の音声は端末の読み上げです。')
  ],[
    {...pick('Why did Ella arrive before the new start time?',['She wanted to borrow a camera before class.','She thought the change was for another group.','She had not received any message.','She had arranged to meet Ben early.'],'She thought the change was for another group.','メッセージを読んだかどうかと、どう解釈したかを分けよう。','I did, but ... I thought it didn’t apply to us. が根拠です。'),audio:listening},
    {...pick('Why did Ella decide to stay?',['She could use a camera from the workshop.','She had already taken some good photos.','The receptionist promised her a refund.','She wanted to wait for a friend.'],'She could use a camera from the workshop.','I stayed because ... の後ろを聞こう。','the tutor let us borrow cameras が理由です。'),audio:listening}
  ]),
unit('speaking','first','比較して理由を話す','SPEAKING · COMPARISON',
  '状況を比較し、共通点と違いを示して、理由を添えられる。',
  '共通点 → 対照 → 質問への答え。写真の細部を順に列挙する前に、２つを結ぶ観点を決める。',
  [
    step('共通点から入る','{x:Both} situations involve learning a new skill.','一方では放課後に友人と練習、もう一方では自宅で動画を見て練習する、と想像します。両方に共通することから話すと比較の軸が伝わります。'),
    step('違いを一文につなぐ','{x:Whereas} the first learner can ask for help, the second can practise at their own pace.','whereas で２つの状況を対比します。at their own pace は「自分のペースで」。'),
    step('好みと理由を言う','I’d prefer the first option {x:because} immediate feedback would help me improve.','意見に理由を一つ添えます。写真から断定できない内容には might や seems to を使えます。')
  ],[
    pick('２つの練習方法を比較している文は？',['There is a laptop in one situation.','Both involve practice, but only the first offers direct feedback.','I think people like learning.'],'Both involve practice, but only the first offers direct feedback.','両方を結び付けている文を探そう。','Both で共通点を示し、but で違いを言っています。'),
    {prompt:'話す練習（１分）\nA: 放課後、友人たちと楽器を練習する。\nB: 自宅で動画を見ながら一人で練習する。\nHow might the learners feel, and which way would you prefer?',model:'Both learners are trying to improve, but their experiences may be quite different. The first might feel encouraged by the group, whereas the second could feel more relaxed practising alone. I’d prefer to practise with friends because we could point out each other’s mistakes and share ideas.',check:'共通点と違いの両方を言ったか。気持ちについて可能性として話したか。自分の好みに理由を添えたか。',speaking:true}
  ])
);

lessons.find(item=>item.id==='essay').questions.push({
  prompt:'自由英作文（B2 First形式の練習）\nSome people think schools should give students less homework. Do you agree?\nWrite about: 1. time with family  2. study habits  3. your own idea.\n目安：140〜190語。',
  model:'Schools should give students less homework, provided that the assignments they keep have a clear purpose.\n\nFirstly, shorter assignments would leave students more time with their families. Having dinner together or helping at home can be just as valuable as spending another hour at a desk.\n\nHowever, homework can develop good study habits. For example, a short weekly review encourages students to organise their notes and find out which topics they still need to understand. Removing homework completely might make this harder.\n\nI also think the quality of the task matters. Writing a short explanation in your own words may teach you more than completing twenty similar exercises. Teachers could therefore give fewer tasks and provide more feedback on each one.\n\nIn conclusion, I would reduce the amount of homework but keep regular, well-designed assignments. This would protect family time while helping students become more independent learners.',
  check:'指定された２点と自分の論点をすべて扱ったか。立場が一貫しているか。各段落に役割があるか。理由と例がつながっているか。',essay:true
});

lessons.splice(lessons.findIndex(item=>item.id==='clauses'),0,
unit('articles','core','冠詞と数え方','ARTICLES & COUNTABILITY',
  'a / an、the、無冠詞を、名詞の数え方と聞き手の知識から選べる。',
  'a / an は不特定の一つ、the は聞き手が特定できるもの。一般論では複数名詞や不可算名詞を無冠詞で使える。',
  [
    step('話に初めて出す','I saw {x:a dog} near the station.','どの犬かを聞き手が特定する必要はありません。a は単数の可算名詞と一緒に使います。an hour は hour の先頭の音が母音なので an です。'),
    step('話し手と聞き手が特定できる','{x:The dog} was wearing a red collar.','直前に話した犬だと分かるので the。初出でも、Close the door. のように場面から分かれば the を使えます。'),
    step('数え方と一般論','{x:Dogs} need exercise. / We need {x:some information}.','犬一般なら無冠詞の複数形です。information は通常は不可算で、an information とは言いません。一件なら a piece of information と表せます。')
  ],[
    pick('I found a wallet. ___ wallet was under a chair.',['A','The','An'],'The','同じ財布がもう一度出ています。','どの財布かを聞き手が特定できるため the。'),
    pick('Could you give me ___ advice about the exam?',['an','some','many'],'some','advice は通常、不可算名詞です。','some advice と言えます。一つの助言なら a piece of advice。'),
    write('「リンゴには食物繊維が含まれます。」をリンゴ一般について Apples から始め、contain と fibre を使って。',['Apples contain fibre.','Apples contain fiber.'],'一般論なので apples に冠詞は必要でしょうか？','無冠詞の複数名詞 Apples がリンゴ一般を指します。fibre は英国式、fiber は米国式です。')
  ]),
unit('comparison','core','比較の向きと程度','COMPARATIVES',
  'than と as ... as を使い分け、差の大きさも表せる。',
  '比較する２つのものと方向を確認する。差は much / a little などで、同程度は as ... as で示す。',
  [
    step('何と何を比べるか','This train is {x:faster than} the bus.','than の後ろは比較の相手。長い形容詞は more reliable のように more を使うことが多く、good は better に変化します。'),
    step('差の大きさを加える','It is {x:much cheaper} to travel by bus.','much は比較級の差を強調します。a little cheaper は差が小さいとき。very cheap は形容詞の程度であり、比較では通常 very cheaper とは言いません。'),
    step('同程度と否定','The bus is {x:not as fast as} the train.','as fast as は同じ速さ、not as fast as はそれほど速くない。どちらを主語にするかで意味の向きが変わります。')
  ],[
    pick('This ticket is ___ cheaper online.「ずっと安い」',['very','much','many'],'much','cheap ではなく cheaper が続いています。','比較級を強める much を使います。'),
    write('The train is faster than the bus. を The bus is not で始めよう。',['The bus is not as fast as the train.'],'not as ... as の間は原級です。','not as fast as で、バスのほうが遅いという同じ意味を保てます。'),
    pick('Their second plan was ___ than their first.「さらに良い」',['more good','better','best'],'better','good は不規則に変化します。','good → better → best。than があるので比較級です。')
  ])
);

lessons.splice(lessons.findIndex(item=>item.id==='open'),0,
unit('time-contrast','high','完了・進行・時点の視点','PERFECT & PROGRESSIVE ASPECT',
  '完了形と完了進行形の焦点の違いを説明し、過去の基準時を置ける。',
  '完了形は基準時より前の出来事を結び付ける。進行形を重ねると、続いた活動やその過程に焦点を置ける。',
  [
    step('成果と過程','I {a:have} {v:written} three pages. / I {a:have been} {v:writing} all morning.','three pages は書き上げた分量。all morning の例は書く活動が続いたことに焦点があり、今も続く場合や、つい先ほど止めた場合があります。'),
    step('過去の時点に立つ','When I arrived, the film {a:had} already {v:started}.','映画が始まったのは私が着くより前です。過去完了の基準は今ではなく、過去の arrived です。'),
    step('状態と継続を分ける','We {a:have} {v:known} each other for years.','know は状態を表すため、ここでは have been knowing より have known が自然です。継続するからといって常に進行形になるわけではありません。')
  ],[
    pick('I ___ three emails so far.「今までに３通書き終えた」',['have written','have been writing','had written'],'have written','数えられる成果に焦点があります。','現在までに３通を完成させたので have written。'),
    write('When we arrived, the train ___ already ___. leave を使い、空所の語だけを順に書こう。',['had left'],'出発は到着より前の過去。','had ＋ 過去分詞 left で、到着前の出発を表します。'),
    pick('His hands are covered in paint. He ___ the fence all morning.「作業を続けていた」',['paints','has been painting','had painted'],'has been painting','目の前の痕跡と、続いた活動を結び付けます。','has been painting は活動の継続に焦点を置きます。')
  ]),
unit('emphasis','high','強調と倒置','EMPHASIS & INVERSION',
  '強調構文と否定的な語句による倒置を見分け、通常の語順に戻せる。',
  'It is ... that ... は特定の要素を目立たせる。否定的な副詞句を文頭に置くと、助動詞が主語の前に来ることがある。',
  [
    step('焦点を切り出す','It was {x:at the station} that I saw Maya.','I saw Maya at the station. の場所を強調します。that 以下には、強調した場所に対応する位置が空いています。'),
    step('否定的な語を先に置く','{x:Never} {a:have} {s:I} {v:seen} anything like it.','I have never seen anything like it. を強調した語順です。never が文頭に来て、助動詞 have が主語 I の前に移ります。'),
    step('only after と主節','{x:Only after the lesson} {a:did} {s:I} {v:understand} the rule.','倒置するのは主節 did I understand。only after のまとまり自体は通常の語順で、did の後ろは原形 understand です。')
  ],[
    pick('Never ___ such an impressive performance.',['I have seen','have I seen','did I saw'],'have I seen','never が文頭。完了の助動詞をどこに置きますか？','have が主語 I の前に出ます。'),
    write('I realised the mistake only after the test. を Only after the test で始めよう。',['Only after the test did I realise the mistake.','Only after the test did I realize the mistake.'],'主節を did ＋ 主語 ＋ 原形の順に。','文頭の Only after ... に続く主節が倒置します。realise と realize はどちらも可です。'),
    pick('It was ___ that I met Lina.「昨日」を強調する。',['yesterday','did yesterday','I yesterday'],'yesterday','It was と that の間に強調したい要素を入れます。','強調したい時を表す語句 yesterday をそのまま入れます。')
  ])
);
