========================================
hanachan.net — 編集・公開ガイド
========================================

■ フォルダ構成
  index.html   ← ページの内容（テキストはここを編集）
  style.css    ← デザイン（色・フォントはここを編集）
  netlify.toml ← Netlify設定（触らなくてOK）
  images/      ← 画像ファイルをここに入れる


■ テキストを変えたいとき
  index.html をメモ帳やVS Codeで開く。
  「（内容を入力してください）」と書いてある部分を書き換えるだけ。


■ 色を変えたいとき
  style.css の一番上にある :root { } の中の色コードを変える。
  例：--color-primary: #d4547a;  ← この #d4547a を変える


■ 画像の準備
  1. Wixから現在の写真をダウンロードする
     プロフィール写真URL（ブラウザで開いて保存）:
     https://static.wixstatic.com/media/11062b_4b7c9a8e48334d5aad2fd274fddba3bc~mv2.jpg

  2. ファイル名を「profile.jpg」に変更する

  3. images/ フォルダに入れる


■ Netlifyへの公開方法
  1. https://www.netlify.com/ にアクセスしてアカウント作成（無料）
  2. ログイン後「Add new site」→「Deploy manually」
  3. 「hanachan-site」フォルダをブラウザにドラッグ＆ドロップするだけ！
  4. 数秒で公開される


■ お問い合わせフォームの設定
  公開後、Netlify管理画面の「Forms」からメール通知の設定ができます。


■ 独自ドメイン（hanachan.net）の設定
  Netlify管理画面 → 「Domain management」→「Add custom domain」
  → hanachan.net を入力 → ドメイン会社のDNS設定を変更

========================================
