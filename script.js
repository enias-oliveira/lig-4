let player1;
let player2;

document.getElementById("start").addEventListener("click", start);
function start() {
  player1 = document.getElementById("fplayer").value;
  player2 = document.getElementById("splayer").value;
  document.getElementById("players").classList.add("Hidden");
  document.getElementById("main").classList.remove("Hidden")
}

document.getElementById("restart").addEventListener("click", restart);

function restart() {
  location.reload();
}
