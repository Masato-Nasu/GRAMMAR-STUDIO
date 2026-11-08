# GRAMMAR STUDIO｜英文法教室

中学の基礎から高校英文法、Cambridge English B2 Firstを目指すための練習まで。英文の構造を色分けした板書で学び、ヒント付きの確認問題で練習できる日本語のWebアプリです。

**[アプリを開く](https://grammar-studio-nasu.sunny-seed-0354.chatgpt.site/)**

## 機能

- 全26単元・76問。中学8単元、高校10単元、B2 First対策8単元
- B2 First向けの空所補充、語形成、書き換え、読解、英作文、聞き取り、口頭練習
- PWA対応。初回のオフライン準備後は、板書・練習・採点をオフラインで利用可能
- 学習進度は使っているブラウザに保存

## AI先生（BYOK）

AI機能を使う場合は「AI設定」に自分のOpenAI APIキーを入力します。「板書について質問」は現在の板書をもとに説明し、「答案をAIに相談」は問題文と入力・選択した答案を送って助言を求めます。

キーはページのメモリで保持します。AIを呼び出すときにこのアプリの同一オリジンのサーバーを経由し、OpenAIのResponses APIに渡します。通常の授業・練習にはキーは不要です。AI機能には通信とOpenAI APIの利用料金が必要です。

## ローカルで動かす

Node.js 22以降。外部のnpm依存関係はありません。

```sh
npm run dev
```

ブラウザで http://localhost:3000 を開きます。ビルドとテストは次のコマンドで実行できます。

```sh
npm run build
npm test
```

ビルド済みのWorkerは `dist/server/index.js` に出力されます。BYOKのAI機能には `/api/tutor` を提供するWorkerが必要です。

B2 First対策の教材は、このアプリのオリジナル練習です。
