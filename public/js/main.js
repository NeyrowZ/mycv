const music = document.getElementById('music');
const icon = document.getElementById('icon');
const listening = document.getElementById('listening');

let currentMusic = '';

async function fetchSpotify() {
    let res = await fetch("https://spotify.aidenwallis.co.uk/u/65d8c3c9c247436a66f4d87a");
    if (res.status == 200) {
        let data = await res.text();
        if (data == currentMusic) return;
        if (data != "User is currently not playing any music on Spotify.") {
            currentMusic = data;
            play();
            return;
        }
    }
    hide();
}

function play() {
    if (music.classList.contains('fade')) music.classList.toggle('fade');
    music.setAttribute('onclick', `window.open('https://www.youtube.com/results?search_query=${currentMusic}', '_blank');`);
    listening.innerHTML = (currentMusic + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').repeat(2);
}

function hide() {
    if (!music.classList.contains('fade')) music.classList.toggle('fade');
}

function getAge(dateOfBirth) {
    return Math.abs(new Date(Date.now() - new Date(dateOfBirth).getTime()).getUTCFullYear() - 1970);
}

function load() {
    document.getElementById('age').innerHTML = getAge("02/01/2006");
    setInterval(function() {
        fetchSpotify();
    }, 15000);   
}