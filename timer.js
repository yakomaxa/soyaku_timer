document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById("timer");
    const phaseDisplay = document.getElementById("phase");
    const startButton = document.getElementById("start");
    const skipButton = document.getElementById("skip");
    const resetButton = document.getElementById("reset");

    const phases = [9 * 60, 1 * 60, 9 * 60]; // 9 min + 1 min + 9 min
    const phaseNames = ["9-Min Presentation", "1-Min Margin", "9-Min Q&A"];
    let currentPhase = 0;
    let timeLeft = phases[currentPhase];
    let timerRunning = false;
    let timerInterval;
    let lastTimestamp;

    function updateDisplay() {
        const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
        const secs = String(timeLeft % 60).padStart(2, "0");
        timerDisplay.textContent = `${mins}:${secs}`;
        phaseDisplay.textContent = phaseNames[currentPhase];
    }

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            lastTimestamp = Date.now();
            timerInterval = setInterval(() => {
                const now = Date.now();
                const elapsed = Math.floor((now - lastTimestamp) / 1000);
                if (elapsed > 0) {
                    timeLeft -= elapsed;
                    lastTimestamp = now;
                    updateDisplay();
                }
                if (timeLeft <= 0) {
                    nextPhase();
                }
            }, 500);
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

