document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.querySelector('.timer');
    const timerModeDisplay = document.querySelector('.timer-mode');
    const startBtn = document.querySelector('.start-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const customTimeInput = document.querySelector('.custom-time');

    let countdown;
    let seconds = 2700; // 45 minutes
    let isPaused = false;
    let timerMode = 'Pomodoro';

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timerDisplay.innerHTML = `<i class="far fa-clock"></i> ${display}`;
    }

    function startTimer() {
        countdown = setInterval(() => {
            if (!isPaused) {
                seconds--;
                if (seconds < 0) {
                    clearInterval(countdown);
                    // Play sound notification
                    new Audio('notification_sound.mp3').play();
                    switchTimerMode();
                    return;
                }
                displayTimeLeft(seconds);
            }
        }, 1000);
    }

    function switchTimerMode() {
        if (timerMode === 'Pomodoro') {
            timerMode = 'Short Break';
            seconds = 300; // 5 minutes short break
        } else if (timerMode === 'Short Break') {
            timerMode = 'Pomodoro';
            seconds = 2700; // 45 minutes pomodoro
        }
        displayTimeLeft(seconds);
        timerModeDisplay.textContent = timerMode;
    }

    startBtn.addEventListener('click', function() {
        if (!isNaN(customTimeInput.value) && customTimeInput.value > 0) {
            seconds = customTimeInput.value * 60; // Convert minutes to seconds
            displayTimeLeft(seconds);
        }
        startTimer();
    });

    pauseBtn.addEventListener('click', function() {
        isPaused = !isPaused;
        pauseBtn.innerHTML = `<i class="fas fa-${isPaused ? 'play' : 'pause'}"></i> ${isPaused ? 'Resume' : 'Pause'}`;
    });

    resetBtn.addEventListener('click', function() {
        clearInterval(countdown);
        seconds = 2700; // Reset to 45 minutes
        displayTimeLeft(seconds);
        isPaused = false;
        pauseBtn.innerHTML = `<i class="fas fa-pause"></i> Pause`;
        timerMode = 'Pomodoro';
        timerModeDisplay.textContent = timerMode;
    });
});
