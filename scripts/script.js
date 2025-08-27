let scoresTotal = 0;

let gameHistory = JSON.parse(localStorage.getItem("gamehistory")) || [];

let scores = {
  wins: 0,
  loses: 0,
  ties: 0,
};

document.querySelector(".js_rock_button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js_scissors_button").addEventListener("click", () => {
  playGame("scissors");
});

document.querySelector(".js_paper_button").addEventListener("click", () => {
  playGame("paper");
});

function renderHistorySectionTitle() {
  if (gameHistory.length < 1) {
    document.querySelector(".history_part").innerHTML = "";
  } else {
    document.querySelector(".history_part").innerHTML = "<h1>History</h1>";
  }
}

renderHistorySectionTitle();

let playGame = (playerMove) => {
  let computerMove = pickComputerMove();

  document.querySelector(".js_choices").innerHTML = `You chose
                <img src="./utils/images/${playerMove}.webp" alt=""> and computer chose
                <img src="./utils/images/${computerMove}.webp" alt="">`;

  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie";
    } else if (computerMove === "paper") {
      result = "lose";
    } else if (computerMove === "scissors") {
      result = "win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "win";
    } else if (computerMove === "paper") {
      result = "tie";
    } else if (computerMove === "scissors") {
      result = "lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "lose";
    } else if (computerMove === "paper") {
      result = "win";
    } else if (computerMove === "scissors") {
      result = "tie";
    }
  }

  document.querySelector(".js_results").innerHTML = result;

  if (result === "win") {
    scores.wins++;
    scoresTotal++;
  } else if (result === "lose") {
    scores.loses++;
    scoresTotal++;
  } else if (result === "tie") {
    scores.ties++;
    scoresTotal++;
  }

  if (document.querySelector(".js_results").innerText === "WIN") {
    document.querySelector(".js_results").classList.add("wins_text");
    document.querySelector(".js_results").classList.remove("loses_text");
    document.querySelector(".js_results").classList.remove("ties_text");
  } else if (document.querySelector(".js_results").innerText === "LOSE") {
    document.querySelector(".js_results").classList.remove("wins_text");
    document.querySelector(".js_results").classList.remove("ties_text");
    document.querySelector(".js_results").classList.add("loses_text");
  } else if (document.querySelector(".js_results").innerText === "TIE") {
    document.querySelector(".js_results").classList.remove("wins_text");
    document.querySelector(".js_results").classList.remove("loses_text");
    document.querySelector(".js_results").classList.add("ties_text");
  }

  renderScores();

  if (scoresTotal === 10) {
    let final = "";
    if (scores.wins > scores.loses) {
      final = "You win against computer";
    } else if (scores.loses > scores.wins) {
      final = "You lose to computer";
    } else {
      final = "You tied with computer";
    }

    let historyDate = getDayTime();

    gameHistory.push({
      final,
      wins: scores.wins,
      ties: scores.ties,
      loses: scores.loses,
      historyDate,
    });

    console.log(historyDate);

    saveGameHistory();

    alert(final);
    renderHistory();

    scoresTotal = 0;

    scores.loses = 0;
    scores.wins = 0;
    scores.ties = 0;

    renderScores();

    renderHistorySectionTitle();

    saveGameHistory();
  }
};

let endNumber = 10;

let renderHistory = () => {
  let historyHtml = "";

  let newGameHistory = gameHistory.slice(0, endNumber);

  document.querySelector(".js_more_button").addEventListener("click", () => {
    endNumber = endNumber + 10;
    renderHistory();
  });

  if (endNumber > gameHistory.length) {
    document.querySelector(".js_more_button").innerHTML = "";
  }

  newGameHistory.map((value, index) => {
    let html = ` <div class='show_history'>
        <span class='history_num'>
        ${index + 1}. 
        </span>
        <div class='history_final'>
        ${value.final}
        </div>
        <div class='history_scores'>
        
         <span class='wins_text'> Wins: 
        ${value.wins}
        </span> <span class='ties_text'>
        Ties: 
        ${value.ties}
        </span> <span class='loses_text'>
        Loses: 
        ${value.loses}
        </span>
        </div> <button class='js_delete_history delete_history'>
        Delete</button></div>`;
    historyHtml += html;
  });
  // console.log(historyHtml)
  document.querySelector(".js_history").innerHTML = historyHtml;

  document.querySelectorAll(".js_delete_history").forEach((button, index) => {
    button.addEventListener("click", () => {
      gameHistory.splice(index, 1);
      renderHistory();
      saveGameHistory();
      renderHistorySectionTitle();
    });
  });
};

renderHistory();

let saveGameHistory = () => {
  localStorage.setItem("gamehistory", JSON.stringify(gameHistory));
};

renderScores();

function renderScores() {
  document.querySelector(
    ".js_scores"
  ).innerHTML = `<span class='wins_text'>Wins: ${scores.wins}</span> <span class='ties_text'>Ties: ${scores.ties}</span> <span class='loses_text'>
  Loses: ${scores.loses}</span>`;
}

function pickComputerMove() {
  let randomNumber = Math.random();

  let computerMove = "";

  if ((randomNumber >= 0) & (randomNumber < 1 / 3)) {
    computerMove = "rock";
  } else if ((randomNumber >= 1 / 3) & (randomNumber < 2 / 3)) {
    computerMove = "paper";
  } else if ((randomNumber >= 2 / 3) & (randomNumber < 3 / 3)) {
    computerMove = "scissors";
  }

  return computerMove;
}

document.querySelector(".js_reset").addEventListener("click", () => {
  document.querySelector(".js_reset_text").classList.remove("reset_text");
});

document.querySelector(".js_yes_reset").addEventListener("click", () => {
  scores.loses = 0;
  scores.wins = 0;
  scores.ties = 0;

  document.querySelector(".js_results").innerHTML = "";

  scoresTotal = 0;

  renderScores();

  document.querySelector(".js_choices").innerHTML = "";

  document.querySelector(".js_reset_text").classList.add("reset_text");
});

document.querySelector(".js_no_reset").addEventListener("click", () => {
  document.querySelector(".js_reset_text").classList.add("reset_text");
});

let actualDay = "";

let getDayTime = () => {
  let date = new Date().getDate();
  let day = new Date().getDay();
  let thisMonth = new Date().getMonth() + 1;
  let dayTimeHours = new Date().getHours();
  let dayTimeMinutes = new Date().getMinutes();
  let dayTimeSeconds = new Date().getSeconds();

  if (day === 1) {
    actualDay = "Monday";
  } else if (day === 2) {
    actualDay = "Tuesday";
  } else if (day === 3) {
    actualDay = "Wednesday";
  } else if (day === 4) {
    actualDay = "Thursday";
  } else if (day === 5) {
    actualDay = "Friday";
  } else if (day === 6) {
    actualDay = "Saturday";
  } else if (day === 7) {
    actualDay = "Sunday";
  }

  let fulldate = {
    date,
    thisMonth,
    actualDay,
    dayTimeHours,
    dayTimeMinutes,
    dayTimeSeconds,
  };

  return fulldate;
};

console.log(getDayTime());

let getDate = () => {
  let currYear = new Date().getFullYear();
  return currYear;
};

document.querySelector(
  ".js_footer"
).innerHTML = `Copyright ${" "} &copy; ${" "}<span class="js_date"></span>${"   "} | All Rights Reserved.`;

document.querySelector(".js_date").innerHTML = getDate();

console.log(scoresTotal);

let isAutoPlay = false;
let playInterval;

document.querySelector(".js_auto_play").addEventListener("click", () => {
  auto_play();
});

function auto_play() {
  if (!isAutoPlay) {
    playInterval = setInterval(() => {
      let autoMove = pickComputerMove();
      playGame(autoMove);

      console.log(playInterval);

      document.querySelector(".js_auto_play").innerText = "Stop";
      document.querySelector(".js_auto_play").classList.add("is_auto_play");
    }, 2000);
    isAutoPlay = true;
  } else {
    clearInterval(playInterval);
    console.log(playInterval);
    document.querySelector(".js_auto_play").innerText = "Auto Play";
    document.querySelector(".js_auto_play").classList.remove("is_auto_play");
    isAutoPlay = false;
  }
}
