# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code へのガイドです。

## プロジェクト概要

**task-board** — タスクを管理するボードアプリケーション。

- 技術スタック: React 19 + Vite（JavaScript / JSX）
- 主なファイル: `src/App.jsx`（画面とタスクの状態管理）、`src/App.css`（スタイル）
- タスクは state で管理し、変更のたびに localStorage（キー: `task-board.tasks`）へ保存、起動時に読み込む

### コマンド

- 依存関係のインストール: `npm install`
- 開発サーバー起動: `npm run dev`
- ビルド: `npm run build`
- Lint: `npm run lint`（oxlint）

変更後は `npm run build` と `npm run lint` が通ることを確認してからコミットする。

### デプロイ（GitHub Pages）

- `main` へのプッシュで `.github/workflows/deploy.yml` が動き、lint・ビルド後に GitHub Pages へ自動デプロイされる
- 公開 URL: https://workkondokyouyu-byte.github.io/task-board/
- `vite.config.js` でビルド時のみ `base: '/task-board/'` にしている。リポジトリ名を変えた場合はここも変更する

## コーディング規約

- 既存コードの命名・書き方・コメント量に合わせる
- 1つの変更は1つの目的に絞り、小さく保つ
- 不要になったコードやファイルは残さず削除する

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
