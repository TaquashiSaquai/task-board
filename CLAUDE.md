# CLAUDE.md

このファイルは、Claude Code がこのプロジェクトで作業する際のガイドです。

## プロジェクト概要

- プロジェクト名: task-board（Samurai Sprint）
- 内容: タスク管理ボード

## 技術スタック

- UI: React 18（関数コンポーネント + Hooks）
- ビルドツール: Vite 5（`@vitejs/plugin-react`）
- 言語: JavaScript（JSX）。TypeScript は未導入
- スタイル: プレーンCSS（`src/index.css`）
- データ保存: ブラウザの `localStorage`（キー: `task-board:tasks`）。バックエンドなし
- ホスティング: GitHub Pages（GitHub Actions で自動デプロイ）
- Node.js: 22

## 基本ルール

- 回答・コミットメッセージ・コメントは原則として日本語で書く
- 変更は依頼された範囲に絞り、無関係なリファクタリングは行わない
- 既存のコードスタイルや命名規則に従う
- 秘密情報（APIキー、トークン、`.env` など）はコミットしない

## Git運用ルール

- **コードを変更するたびに、変更内容をコミットして GitHub にプッシュする。**
  - 変更 → コミット → `git push` を1セットとし、ローカルに未プッシュの変更を溜めない
  - 1つのコミットには1つの論理的な変更だけを含める
- コミットメッセージは「何を・なぜ変更したか」が分かるように簡潔に書く
- `main` ブランチへ直接作業する場合も、プッシュ前に動作確認（テストやビルド）を行う
- 強制プッシュ（`git push --force`）や履歴の書き換えは、ユーザーの明示的な指示がない限り行わない
- リモートリポジトリ（`origin`）が未設定の場合は、プッシュ前にユーザーへ確認する

## コンポーネントの命名規約

- コンポーネント名・ファイル名は PascalCase にする（例: `TaskList.jsx`、`TaskItem.jsx`）
- コンポーネントファイルの拡張子は `.jsx`、1ファイルにつき1コンポーネントとし、`export default` する
- コンポーネント以外のファイル（フック・ユーティリティ）は camelCase にする（例: `useTasks.js`）
- カスタムフックは `use` で始める
- イベントハンドラは、定義側は動詞で始め（`addTask`、`toggleTask`、`deleteTask`）、props で渡すときは `on` + 動詞（`onToggle`、`onDelete`）とする
- state は `[名詞, set名詞]` の形で命名する（例: `[tasks, setTasks]`）
- 真偽値は `done` や `isOpen` のように状態が分かる名前にする
- CSSクラス名は小文字のケバブケース（例: `task-list`）、状態は修飾クラスで表す（例: `task done`）
- 定数は UPPER_SNAKE_CASE にする（例: `STORAGE_KEY`）
- 現在は `src/App.jsx` に全機能があるため、機能追加で肥大化する場合は上記の規約に沿ってコンポーネントを分割する

## 開発コマンド

```bash
npm install       # 依存関係のインストール
npm run dev       # 開発サーバー起動
npm run build     # 本番ビルド（動作確認に使用）
```

## デプロイ先

https://TaquashiSaquai.github.io/task-board/

## 公開（GitHub Pages）

- `main` へプッシュすると、GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルド・公開する
- `vite.config.js` の `base` はリポジトリ名（`/task-board/`）に合わせてある。リポジトリ名を変える場合は一緒に変更する
