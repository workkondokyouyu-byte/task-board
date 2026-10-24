# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code へのガイドです。

## プロジェクト概要

**task-board** — タスクの追加・完了切り替え・削除ができるボードアプリケーション。

- 主なファイル: `src/App.jsx`（画面とタスクの状態管理）、`src/App.css`（スタイル）
- タスクは state で管理し、変更のたびに localStorage（キー: `task-board.tasks`）へ保存、起動時に読み込む

## 技術スタック

| 分類 | 使用技術 |
| --- | --- |
| UI ライブラリ | React 19（関数コンポーネント + Hooks） |
| 言語 | JavaScript（JSX）※ TypeScript は未使用 |
| ビルドツール / 開発サーバー | Vite 8（`@vitejs/plugin-react`） |
| Lint | oxlint（設定: `.oxlintrc.json`） |
| スタイル | プレーン CSS（`src/index.css` は全体、`src/App.css` はアプリ用） |
| データ保存 | ブラウザの localStorage（サーバー・DB なし） |
| ホスティング | GitHub Pages（GitHub Actions で自動デプロイ） |
| 実行環境 | Node.js 24 / npm |

新しいライブラリは必要になるまで追加しない。追加する場合はこの表も更新する。

### コマンド

- 依存関係のインストール: `npm install`
- 開発サーバー起動: `npm run dev`
- ビルド: `npm run build`
- Lint: `npm run lint`（oxlint）

変更後は `npm run build` と `npm run lint` が通ることを確認してからコミットする。

## デプロイ先

https://workkondokyouyu-byte.github.io/task-board/

- `main` へのプッシュで `.github/workflows/deploy.yml` が動き、lint・ビルド後に GitHub Pages へ自動デプロイされる（反映まで 1〜2 分）
- `vite.config.js` でビルド時のみ `base: '/task-board/'` にしている。リポジトリ名を変えた場合はここも変更する

## コーディング規約

- 既存コードの命名・書き方・コメント量に合わせる
- 1つの変更は1つの目的に絞り、小さく保つ
- 不要になったコードやファイルは残さず削除する
- 書式: インデントは半角スペース 2 つ、文字列はシングルクォート、セミコロンなし
- 画面に表示する文言は日本語で書く

### コンポーネントの命名規約

| 対象 | 規則 | 例 |
| --- | --- | --- |
| コンポーネント名 | PascalCase の名詞 | `App`、`TaskItem`、`TaskForm` |
| コンポーネントのファイル | コンポーネント名と同じ + `.jsx` | `TaskItem.jsx` |
| コンポーネント専用の CSS | コンポーネントと同じ名前 + `.css` | `TaskItem.css` |
| イベントハンドラ（コンポーネント内） | 動詞 + 名詞の camelCase | `addTask`、`toggleTask`、`deleteTask` |
| ハンドラを渡す props | `on` + 動詞 | `onToggle`、`onDelete` |
| state | 名詞の camelCase。真偽値は `is` / `has` か状態を表す形容詞 | `tasks`、`text`、`done` |
| 定数 | UPPER_SNAKE_CASE | `STORAGE_KEY` |
| CSS クラス名 | kebab-case | `task-form`、`task-list` |

- コンポーネントは `function` 宣言で書き、ファイル末尾で `export default` する（1 ファイル 1 コンポーネント）
- コンポーネント内の処理（ハンドラなど）はアロー関数で書く
- `App.jsx` が大きくなって分割するときは、新しいコンポーネントを `src/components/` に置く
- リストを描画するときの `key` には配列のインデックスではなく、タスクの `id` を使う

## Git 運用ルール

### 基本方針

**コードを変更するたびに、コミットして GitHub にプッシュすること。**
変更をローカルに溜め込まず、作業単位ごとに必ずリモートへ反映する。

### 手順

1. 変更内容を確認する: `git status` / `git diff`
2. 関連するファイルだけをステージする: `git add <ファイル>`
3. 内容が分かるメッセージでコミットする: `git commit -m "..."`
4. GitHub にプッシュする: `git push`

### コミットメッセージ

- 日本語で、何をなぜ変更したかを簡潔に書く
- 例: `タスク追加フォームを実装`、`タスク削除時のエラーを修正`

### 注意事項

- `.env`、APIキー、パスワードなどの機密情報はコミットしない（`.gitignore` に追加する）
- `git push --force` や `git reset --hard` など履歴を壊す操作は、ユーザーの確認を得てから行う
- プッシュに失敗した場合は、原因（リモートとの競合など）を確認してユーザーに報告する
