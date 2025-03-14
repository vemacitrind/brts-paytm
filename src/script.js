document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("fs-btn");

    button.addEventListener("click", () => {
        const element = document.documentElement;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    });
});

let remainingTime = 2 * 60 * 60 + 30 * 60;

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        document.getElementById("loader").style.display = "none";
    }
});

function updateTimer() {
    let timerElement = document.getElementById('timer');
    const hours = String(Math.floor(remainingTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(remainingTime % 60).padStart(2, '0');

    timerElement.textContent = `${hours} : ${minutes} : ${seconds}`;

    if (remainingTime > 0) {
        remainingTime--;
    }
}

function forwordButton() {
    document.getElementById("loader").style.display = "flex";
    
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.querySelector(".bluecontainer .qrcode").style.display = "block";
        document.querySelector(".bluecontainer").style.backgroundImage = "none";
        document.querySelector(".bluecontainer center").style.display = "none";
        document.querySelector(".bluecontainer .info").style.display = "none";
        document.querySelector(".bluecontainer .info1").style.display = "none";
        document.querySelector(".bluecontainer .passenger-info").style.display = "none";
        document.querySelector(".bluecontainer .mess").style.display = "none";
        document.querySelector(".bluecontainer .rupee").style.display = "none";
        document.querySelector(".bluecontainer .view-ticket").onclick = foo;
    }, 1200);
}

function invertButton() {
    document.getElementById("loader").style.display = "flex";
    
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
        document.querySelector(".bluecontainer .qrcode").style.display = "none";
        document.querySelector(".bluecontainer").style.backgroundImage = "linear-gradient(#dcf7fa 97%, #00B9F1 97% 98.5%, #002E6E 98.5% 100%)"; // Replace with your original background image
        document.querySelector(".bluecontainer center").style.display = "block";
        document.querySelector(".bluecontainer .info").style.display = "block";
        document.querySelector(".bluecontainer .info1").style.display = "block";
        document.querySelector(".bluecontainer .passenger-info").style.display = "flex";
        document.querySelector(".bluecontainer .mess").style.display = "block";
        document.querySelector(".bluecontainer .rupee").style.display = "block";
        document.querySelector(".bluecontainer .view-ticket").onclick = forwordButton;

    }, 1200);
}


function foo(){
    let element = document.querySelector(".lalala");
    if (element) {
    element.style.visibility = "visible";
    }
}
function hideDiv() {
    let element = document.querySelector(".lalala");
    if (element) {
        element.style.visibility = "hidden";
    }
}


function updatePageFromQueryParams() {
    const params = new URLSearchParams(window.location.search);

    const from = params.get('from') || 'Default From';
    const to = params.get('to') || 'Default To';
    const time = params.get('time');
    const rupee = params.get('rupee') || 'Default Price';

    try {
        // Parse time input
        const [hour, minute] = time.split(':').map(Number);

        remainingTime = hour * 60 * 60 + minute * 60;

        setInterval(updateTimer, 1000);

        // Calculate current time - (fix time - input time)
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentTime = new Date();

        const fixTime = new Date();
        fixTime.setHours(3, 0, 0, 0); // Fix time is 03:00

        const inputTime = new Date();
        inputTime.setHours(hour, minute, 0, 0);

        const diffInMilliseconds = fixTime - inputTime;
        const resultTime = new Date(currentTime - diffInMilliseconds);

        // Format result time in hh:mm
        const resultHours = resultTime.getHours().toString().padStart(2, "0");
        const resultMinutes = resultTime.getMinutes().toString().padStart(2, "0");
        const formattedResult = `${resultHours}:${resultMinutes}`;

        // Get today's date
        const today = new Date();
        const day = today.getDay();
        const date = today.getDate();

        // Construct time display string
        const timep = `${date} ${dayNames[day]} ${today.getFullYear()}, ${formattedResult}`;

        // Update UI elements
        document.getElementById('from').textContent = from;
        document.getElementById('to').textContent = to;
        document.querySelector('.date').textContent = timep;
        document.querySelector('.rupee').innerHTML = `&#8377; ${rupee} <img src="img/check.png" alt="Check" style="width: 4vh;">`;

        // Update all elements with the 'rupees' class
        const elements = document.getElementsByClassName('rupees');
        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = `&#8377; ${rupee}`;
        }
    } catch (error) {
        console.error('Error in updatePageFromQueryParams:', error);
    }
}

window.onload = updatePageFromQueryParams;