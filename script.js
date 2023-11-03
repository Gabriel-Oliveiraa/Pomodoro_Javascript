document.addEventListener("DOMContentLoaded", function () {
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const startButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");
    const resetButton = document.getElementById("reset");
    const workTimeInput = document.getElementById("work-time");
    const breakTimeInput = document.getElementById("break-time");
    const updateTimesButton = document.getElementById("update-times");

    let interval;
    let workMinutes = 25;
    let breakMinutes = 5;
    let currentMinutes = workMinutes;
    let seconds = 0;

    function updateDisplay() {
        minutesDisplay.textContent = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
        secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
    }

    function startTimer() {
        startButton.disabled = true;
        interval = setInterval(function () {
            if (currentMinutes === 0 && seconds === 0) {
                clearInterval(interval);
                if (currentMinutes === workMinutes) {
                    currentMinutes = breakMinutes;
                } else {
                    currentMinutes = workMinutes;
                }
                updateDisplay();
                startTimer();
            } else if (seconds === 0) {
                currentMinutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }

    function pauseTimer() {
        startButton.disabled = false;
        clearInterval(interval);
    }

    function resetTimer() {
        startButton.disabled = false;
        clearInterval(interval);
        currentMinutes = workMinutes;
        seconds = 0;
        updateDisplay();
    }

    function updateTimes() {
        workMinutes = parseInt(workTimeInput.value) || workMinutes;
        breakMinutes = parseInt(breakTimeInput.value) || breakMinutes;
        resetTimer();
    }

    startButton.addEventListener("click", startTimer);
    pauseButton.addEventListener("click", pauseTimer);
    resetButton.addEventListener("click", resetTimer);
    updateTimesButton.addEventListener("click", updateTimes);

    updateDisplay();
});
