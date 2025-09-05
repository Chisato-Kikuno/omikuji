'use strict';

// おみくじの確立の調整
const omikuji = [
  '大吉','大吉',
  '中吉','中吉','中吉','中吉',
  '小吉','小吉','小吉','小吉','小吉',
  '吉','吉','吉','吉',
  '末吉','末吉',
  '凶','凶',
  '大凶'
];

// 画像と効果音と文章をオブジェクトに指定
const resultData = {
  '大吉': {
    image: 'images/daikichi.PNG',
    sound: 'sound/キラッ1.mp3',
    text: 'すべてが思うままに進むかも?!',
  },
  '中吉': {
    image: 'images/chukichi.PNG',
    sound: 'sound/キラッ2.mp3',
    text: 'いいことがたくさん起きるかも?!',
  },
  '小吉': {
    image: 'images/shokichi.PNG',
    sound: 'sound/ジャン！.mp3',
    text: 'ハッピーなことが起こりそうな予感',
  },
  '吉': {
    image: 'images/kichi.PNG',
    sound: 'sound/和太鼓でカカッ.mp3',
    text: 'いつも通りの日々が一番素晴らしい',
  },
  '末吉': {
    image: 'images/suekichi.PNG',
    sound: 'sound/和太鼓でドドン.mp3',
    text: '今日の努力はいつかは必ず返ってくる',
  },
  '凶': {
    image: 'images/kyo.PNG',
    sound: 'sound/ドーン.mp3',
    text: '気を引き締めて注意した方がいいかも?',
  },
  '大凶': {
    image: 'images/daikyo.PNG',
    sound: 'sound/チーン1.mp3',
    text: '今日は調子が悪いと割り切ることも大事',
  }
};

// 結果によって表示がかわるコンテンツの定義
const resultWrapper = document.getElementById('resultWrapper');
const images = document.getElementById('images');
const result = document.getElementById('result');
const resultText = document.getElementById('resultText');
const omikujiText = document.getElementById('omikujiText');
const button = document.getElementById('button');

// 画像をプリロード
for (const cache in resultData) {
  const img = new Image();
  img.src = resultData[cache].image;
}

button.addEventListener('click', () => {
  // おみくじの結果を決定
  const index = Math.floor(Math.random() * omikuji.length);
  const omikujiResult = omikuji[index];
  
  // おみくじ画像をフェードアウト
  resultWrapper.style.transition = 'opacity 1.5s ease-in';
  resultWrapper.style.opacity = 0;
    
  // おみくじを引いた時の効果音
  const omikujiSound = new Audio('sound/琴の滑奏.mp3');
  omikujiSound.play();
  
  // ドキドキさせるために少し遅れて結果を表示
  resultWrapper.addEventListener('transitionend', () => {
    images.src = resultData[omikujiResult].image;
    result.textContent = omikujiResult
    resultText.textContent = resultData[omikujiResult].text;
    result.style.display = 'block';
    resultText.style.display = 'block';
    const resultSound = new Audio(resultData[omikujiResult].sound);
    resultSound.play();
  
    // 一回引いたようにボタンやコメントを変更
    button.textContent = 'もう一度引く';
    omikujiText.textContent = '結果に納得するまで引くのもアリ';

    // フェードイン
    requestAnimationFrame(() => {
      // レイアウト確定後に実行
      resultWrapper.style.transition = 'opacity 0.5s ease-out';
      resultWrapper.style.opacity = 1;
      });
    }, { once: true });
});
