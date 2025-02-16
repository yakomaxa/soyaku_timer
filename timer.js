document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById("timer");
    const phaseDisplay = document.getElementById("phase");
    const startButton = document.getElementById("start");
    const skipButton = document.getElementById("skip");
    const resetButton = document.getElementById("reset");

    const phases = [9 * 60, 1 * 60, 9 * 60]; // 9 min + 1 min + 9 min
    const phaseNames = ["First 9-Min Phase", "1-Min Break", "Final 9-Min Phase"];
    let currentPhase = 0;
    let startTime;
    let endTime;
    let timerRunning = false;
    let timerInterval;

    function updateDisplay() {
        const now = Date.now();
        const remaining = Math.max(0, Math.round((endTime - now) / 1000));
        const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
        const secs = String(remaining % 60).padStart(2, "0");
        timerDisplay.textContent = `${mins}:${secs}`;
        phaseDisplay.textContent = phaseNames[currentPhase];
        
        if (remaining <= 0) {
            nextPhase();
        } else {
            requestAnimationFrame(updateDisplay); // More accurate than setInterval
        }
    }

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            startTime = Date.now();
            endTime = startTime + phases[currentPhase] * 1000;
            updateDisplay(); // Use requestAnimationFrame for accuracy
        }
    }

    function nextPhase() {
        if (currentPhase < phases.length - 1) {
            currentPhase++;
            startTime = Date.now();
            endTime = startTime + phases[currentPhase] * 1000;
            updateDisplay();
        } else {
            timerRunning = false;
            timerDisplay.textContent = "DONE! ⏰";
            phaseDisplay.textContent = "Timer Completed";
        }
    }

    function skipPhase() {
        if (timerRunning && currentPhase < phases.length - 1) {
            currentPhase++;
            startTime = Date.now();
            endTime = startTime + phases[currentPhase] * 1000;
            updateDisplay();
        }
    }

    function resetTimer() {
        timerRunning = false;
        currentPhase = 0;
        startTime = Date.now();
        endTime = startTime + phases[currentPhase] * 1000;
        updateDisplay();
    }

    startButton.addEventListener("click", startTimer);
    skipButton.addEventListener("click", skipPhase);
    resetButton.addEventListener("click", resetTimer);

    updateDisplay();
});

