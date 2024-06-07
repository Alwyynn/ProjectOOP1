const usernameHard = document.getElementById('usernameHard'); // Updated ID
const saveScoreBtnHard = document.getElementById('saveScoreBtnHard'); // Updated ID
const finalScoreHard = document.getElementById('finalScoreHard'); // Updated ID
let mostRecentScoreHard = localStorage.getItem('mostRecentScoreHard'); // Updated ID
let highScoresHard = JSON.parse(localStorage.getItem('highScoresHard')) || []; // Updated ID

// Check if the elements exist before manipulating them
if (finalScoreHard) {
    // Display final score
    finalScoreHard.innerText = `You Scored ${mostRecentScoreHard !== null ? mostRecentScoreHard : 0}/100`; // Updated ID
}

if (usernameHard && saveScoreBtnHard) {
    // Enable save button when username is entered
    usernameHard.addEventListener('keyup', () => {
        saveScoreBtnHard.disabled = !usernameHard.value;
    });
}

// Save high score function
function saveHighScoreHard(e) {
    e.preventDefault();

    mostRecentScoreHard = mostRecentScoreHard !== null ? mostRecentScoreHard : 0; // Set default if null
    const score = {
        score: mostRecentScoreHard,
        name: usernameHard.value,
    };
    highScoresHard.push(score);
    highScoresHard.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScoresHard', JSON.stringify(highScoresHard)); // Updated ID

    if (mostRecentScoreHard === '100') {
        alert("Congratulations! You got a perfect score!");
    }

    window.location.reload(); // Reload the page
    saveScoreBtnHard.removeEventListener('click', saveHighScoreHard); // Remove event listener after saving
}

if (saveScoreBtnHard) {
    // Attach click event listener to save button
    saveScoreBtnHard.addEventListener('click', saveHighScoreHard);
}