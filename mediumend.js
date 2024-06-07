const usernameMedium = document.getElementById('usernameMedium'); // Updated ID
const saveScoreBtnMedium = document.getElementById('saveScoreBtnMedium'); // Updated ID
const finalScoreMedium = document.getElementById('finalScoreMedium'); // Updated ID
let mostRecentScoreMedium = localStorage.getItem('mostRecentScoreMedium'); // Updated ID
let highScoresMedium = JSON.parse(localStorage.getItem('highScoresMedium')) || []; // Updated ID

// Check if the elements exist before manipulating them
if (finalScoreMedium) {
    // Display final score
    finalScoreMedium.innerText = `You Scored ${mostRecentScoreMedium !== null ? mostRecentScoreMedium : 0}/100`; // Updated ID
}

if (usernameMedium && saveScoreBtnMedium) {
    // Enable save button when username is entered
    usernameMedium.addEventListener('keyup', () => {
        saveScoreBtnMedium.disabled = !usernameMedium.value;
    });
}

// Save high score function
function saveHighScoreMedium(e) {
    e.preventDefault();

    mostRecentScoreMedium = mostRecentScoreMedium !== null ? mostRecentScoreMedium : 0; // Set default if null
    const score = {
        score: mostRecentScoreMedium,
        name: usernameMedium.value,
    };
    highScoresMedium.push(score);
    highScoresMedium.sort((a, b) => b.score - a.score);

    localStorage.setItem('highScoresMedium', JSON.stringify(highScoresMedium)); // Updated ID

    if (mostRecentScoreMedium === '100') {
        alert("Congratulations! You got a perfect score!");
    }

    window.location.reload(); // Reload the page
    saveScoreBtnMedium.removeEventListener('click', saveHighScoreMedium); // Remove event listener after saving
}

if (saveScoreBtnMedium) {
    // Attach click event listener to save button
    saveScoreBtnMedium.addEventListener('click', saveHighScoreMedium);
}