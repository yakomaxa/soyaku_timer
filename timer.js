document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById("timer");
    const phaseDisplay = document.getElementById("phase");
    const startButton = document.getElementById("start");
    const skipButton = document.getElementById("skip");
    const resetButton = document.getElementById("reset");
    const phases = [9 * 60, 1 * 60, 9 * 60]; // 9 min + 1 min + 9 min
    const phaseNames = ["First 9-Min Phase", "1-Min Break", "Final 9-Min Phase"];
    let currentPhase = 0;
    let timeLeft = phases[currentPhase];
    let timerRunning = false;
    let timerInterval;

    function updateDisplay() {
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        const secs = String(timeLeft % 60).padStart(2, "0");
        timerDisplay.textContent = `${mins}:${secs}`;
        phaseDisplay.textContent = phaseNames[currentPhase];
    }

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    nextPhase();
                }
            }, 1000);
        }
    }

    function nextPhase() {
        clearInterval(timerInterval);
        if (currentPhase < phases.length - 1) {
            currentPhase++;
            timeLeft = phases[currentPhase];
            updateDisplay();
            timerRunning = false;
            startTimer();
        } else {
            timerRunning = false;
            timerDisplay.textContent = "DONE! ⏰";
            phaseDisplay.textContent = "Timer Completed";
        }
    }

    function skipPhase() {
        if (timerRunning && currentPhase < phases.length - 1) {
            clearInterval(timerInterval);
            currentPhase++;
            timeLeft = phases[currentPhase];
            updateDisplay();
            timerRunning = false;
            startTimer();
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        currentPhase = 0;
        timeLeft = phases[currentPhase];
        updateDisplay();
    }

    startButton.addEventListener("click", startTimer);
    skipButton.addEventListener("click", skipPhase);
    resetButton.addEventListener("click", resetTimer);

    updateDisplay();
});
