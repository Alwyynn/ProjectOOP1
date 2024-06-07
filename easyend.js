const usernameEasy = document.getElementById('usernameEasy');
const saveScoreBtnEasy = document.getElementById('SaveScoreBtnEasy');
const finalScoreEasy = document.getElementById('finalScoreEasy');
const mostRecentScoreEasy = localStorage.getItem('mostRecentScoreEasy');
let highScoresEasy = JSON.parse(localStorage.getItem('highScoresEasy')) || [];

// Check if the elements exist before manipulating them
if (finalScoreEasy) {
    // Display final score
    finalScoreEasy.innerText = `You Scored ${mostRecentScoreEasy}/100`;
}

if (usernameEasy && saveScoreBtnEasy) {
    // Enable save button when username is entered
    usernameEasy.addEventListener('keyup', () => {
        saveScoreBtnEasy.disabled = !usernameEasy.value;
    });
}

// Save high score function
function saveHighScoreEasy(e) {
    e.preventDefault();

    const score = {
        score: mostRecentScoreEasy,
        name: usernameEasy.value,
    };
    highScoresEasy.push(score);
    highScoresEasy.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScoresEasy', JSON.stringify(highScoresEasy));

    if (parseInt(mostRecentScoreEasy) === 100) { // Compare as number
        alert("Congratulations! You got a perfect score!");
    }

    window.location.reload(); // Reload the page
    saveScoreBtnEasy.removeEventListener('click', saveHighScoreEasy); // Remove event listener after saving
}

if (saveScoreBtnEasy) {
    // Attach click event listener to save button
    saveScoreBtnEasy.addEventListener('click', saveHighScoreEasy);
}