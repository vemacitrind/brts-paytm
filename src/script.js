

function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        from: params.get('from') || "N/A",
        to: params.get('to') || "N/A",
        time: params.get('time') || "00:00",
        rupee: params.get('rupee') || "0",
        number: params.get('number') || "1"
    };
}

function trimText(text, maxLength = 10) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function subtractTime(givenTime) {
    const now = new Date();

    const [givenHours, givenMinutes] = givenTime.split(":").map(Number);
    const givenDate = new Date();
    givenDate.setHours(givenHours, givenMinutes, 0, 0);

    const differenceMs = now - givenDate;

    const diffHours = Math.floor(differenceMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

    return `${Math.abs(diffHours)}:${Math.abs(diffMinutes)}`;
}

window.onload = function () {
    appear();
    let hours = 2;
    let minutes = 30;
    let seconds = 0;
    const { from, to, time, rupee, number } = getParams();

    document.getElementById('from').textContent = trimText(from);
    document.getElementById('to').textContent = trimText(to);
    document.getElementById('count').textContent = number;

    document.querySelectorAll('.rupee').forEach(el => {
        el.innerHTML = `&#x20B9; ${rupee}`;
    });

    hours = parseInt(time.split(':')[0] || "00");
    minutes = parseInt(time.split(':')[1] || "00");

    const now = new Date();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    final = `${now.getDate()} ${weekdays[now.getDay()]} ${now.getFullYear()}, ${subtractTime(time)}`;
    document.getElementById("date-time").innerHTML = final ;

    length = 11
    document.querySelector('.order-id').innerHTML = "Order ID: "+(Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0'))+`<span class="ms-1" style="color: var(--blue-color);" role="button">copy</span>`;
    document.querySelector('.transaction-id').innerHTML = "Transaction ID: "+(Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0'));


    let timer = setInterval(() => {
        if (seconds === 0) {
        if (minutes === 0) {
            if (hours === 0) {
            clearInterval(timer);
            console.log("Timer Finished");
            return;
            }
            hours--;
            minutes = 59;
        } else {
            minutes--;
        }
        seconds = 59;
        } else {
        seconds--;
        }

        document.querySelectorAll(".col-4")[0].innerText = hours.toString().padStart(2, "0");
        document.querySelectorAll(".col-4")[1].innerText = minutes.toString().padStart(2, "0");
        document.querySelectorAll(".col-4")[2].innerText = seconds.toString().padStart(2, "0");

    }, 1000);
};

function disappear() {
    document.getElementById("loader").style.display = "flex";
    setTimeout(()=>{
        document.getElementById("loader").style.display = "none";
        document.querySelectorAll('.disappear').forEach(el => {
            el.style.setProperty("display", "none", "important");
        });
        document.querySelectorAll('.appear').forEach(el => {
            el.style.setProperty("display", "flex","important");
        });
        document.getElementById('colorContainer').style.backgroundImage='none';
        document.getElementById('view-ticket').onclick=visibilityToggle;
        document.getElementById('back-button').onclick =appear;
    },1200);
}

function visibilityToggle(){
    el = document.querySelector(".qr-grid");
    if(el.style.visibility == 'hidden'){
        el.style.visibility = 'visible';
    }else {el.style.visibility ='hidden';}
}

function appear(){
    document.getElementById("loader").style.display = "flex";
    setTimeout(()=>{
        document.getElementById("loader").style.display = "none";
        document.getElementById('colorContainer').style.backgroundImage=' linear-gradient(#dcf7fa 96%, #00B9F1 96% 98%, #002E6E 98% 100%)';
        document.querySelectorAll('.disappear').forEach(el => {
            el.style.setProperty("display", "flex");
        });
        document.querySelectorAll('.appear').forEach(el => {
            el.style.setProperty("display", "none","important");
        });
        document.getElementById('view-ticket').onclick=disappear;
    },1200);
}
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