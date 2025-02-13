//右クリック,ドラッグ無効化
document.oncontextmenu = function(){ return false; };
document.body.oncontextmenu = "return false;"
document.onselectstart = function(){ return false; };
document.onmousedown = function(){ return false; };
document.body.onselectstart = "return false;"
document.body.onmousedown = "return false;"

document.querySelector('.result').innerText = '20個の的をクリックするまでのタイムを計測します\n中心の的をクリックするとスタートします'
let game_area = document.querySelector('.game_area');//ゲームエリアの取得
let enemy = document.createElement('img');//img要素を作る
enemy.src = './images.png';//img要素に的の画像を設定
game_area.appendChild(enemy);//ゲームエリアに的を配置
let count = 0;//カウント設定
let starttime = null;//計測開始時間の変数定義
let endtime = null;//計測終了時間の変数定義
const se = new Audio('se.mp3');//音声ファイルを定義

//回数を増やす関数
function times(){
    count = count + 1;
    return;
};

//最初の的を撃った時に計測を開始と最後の的を撃った時に計測を停止して時間を計算する
//また最初の的を撃った時にメッセージを消して最後の的を撃った時は計測した時間とリトライボタンを表示する
function time(){
    if(count === 1){
    starttime = performance.now();
    document.querySelector('.result').innerText = ''
    } else if(count === 20){
    endtime = performance.now();
    const time = (endtime - starttime);
    enemy.remove();
    document.querySelector('.result').innerText = `計測結果\n${time/1000}秒`;
    document.querySelector('.again_button').innerText = `再実施`;
    }
};

//ランダムな場所に的を配置させる関数
function randomposition() {
    const randomx = Math.random() * 960;
    const randomy = Math.random() * 560;
    enemy.style.left = `${randomx}px`;
    enemy.style.top = `${randomy}px`;
    enemy.style.transform = `translate(0%,0%)`;
}

//的を撃った時→音が鳴る,回数を増やす関数の実行,計測関数の実行,的が配置される関数の実行
enemy.addEventListener('click', () => {
	se.currentTime = 0;
	se.play();
    times();
    time();
    randomposition(); 
});

//リトライボタンを押したときにリセットするための処理
document.querySelector('.again_button').addEventListener('click', () => {
	document.querySelector('.result').innerText = '20個の的をクリックするまでのタイムを計測します\n中心の的をクリックするとスタートします'
    document.querySelector('.again_button').innerText = ``;
    count = 0;
    game_area.appendChild(enemy);
    enemy.style.left = `50%`;
    enemy.style.top = `50%`;
    enemy.style.transform = `translate(-50%,-50%)`;
});
