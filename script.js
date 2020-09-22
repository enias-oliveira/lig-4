let player1;
let player2;

document.getElementById("start").addEventListener("click", start);
function start() {
  player1 = document.getElementById("fplayer").value;
  player2 = document.getElementById("splayer").value;
}

document.getElementById("start").addEventListener("click", restart);

function restart() {
  location.reload();
}
