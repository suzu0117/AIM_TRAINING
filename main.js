let game_area = document.querySelector('.game_area');
let enemy = document.createElement('img');
enemy.src = './images.png';
game_area.appendChild(enemy);
let count = 0;
let starttime = null;
let endtime = null;
const se = new Audio('se.mp3');

function times(){
    count = count + 1;
    return;
};

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

function randomposition() {
    const randomx = Math.random() * 960;
    const randomy = Math.random() * 560;
    enemy.style.left = `${randomx}px`;
    enemy.style.top = `${randomy}px`;
    enemy.style.transform = `translate(0%,0%)`;
}

enemy.addEventListener('click', () => {
	se.currentTime = 0;
	se.play();
    times();
    time();
    randomposition(); 
});

document.querySelector('.again_button').addEventListener('click', () => {
    document.querySelector('.result').innerText = ``;
    document.querySelector('.again_button').innerText = ``;
    count = 0;
    game_area.appendChild(enemy);
    enemy.style.left = `50%`;
    enemy.style.top = `50%`;
    enemy.style.transform = `translate(0%,0%)`;
});
