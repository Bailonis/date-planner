let scale = 1;

let datePlan = {    
    foods: "",    
    activities: "",    
    date: ""
};

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

yesBtn.addEventListener("click", () => {
    console.log("I entered the yes button click event");
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    console.log("I finished the yes button click event");
});

function moveNo() {
    

    const x =
        Math.random() * (window.innerWidth - 180);

    const y =
        Math.random() * (window.innerHeight - 100);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    console.log(noBtn.style.left);
    console.log(noBtn.style.top);

    scale += 0.15;

    yesBtn.style.transform =
        `scale(${scale})`;
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("click", moveNo);

document
.querySelectorAll(".option")
.forEach(card => {

    card.addEventListener("click", () => {
        card.classList.toggle("selected");
    });

});

function goActivities() {

    step2.classList.add("hidden");
    step3.classList.remove("hidden");
}

function goDate() {

    step3.classList.add("hidden");
    step4.classList.remove("hidden");
}

function showSummary() {

    const foods =
        [...document.querySelectorAll("#foodGrid .selected")]
        .map(x => x.innerText.trim())
        .join(", ");

    const activities =
        [...document.querySelectorAll("#activityGrid .selected")]
        .map(x => x.innerText.trim())
        .join(", ");

    const date =
        document.getElementById("dateInput").value;

    datePlan.foods = foods || "Surprise";
    datePlan.activities = activities || "Surprise";
    datePlan.date = date || "To be decided";

    document.getElementById("summary").innerHTML = `
        <h3>🍕 Food</h3>
        <p>${datePlan.foods}</p>

        <br>

        <h3>🎬 Activities</h3>
        <p>${datePlan.activities}</p>

        <br>

        <h3>📅 Date</h3>
        <p>${datePlan.date}</p>
    `;

    step4.classList.add("hidden");
    step5.classList.remove("hidden");
}

function finishDate() {

    step5.classList.add("hidden");
    step6.classList.remove("hidden");

    sendNotification();

    startHearts();
}

function startHearts() {

    setInterval(() => {

        const heart =
            document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";
        heart.style.left =
            Math.random() * window.innerWidth + "px";

        heart.style.top = "-20px";
        heart.style.fontSize = "24px";

        document.body.appendChild(heart);

        heart.animate(
            [
                { transform: "translateY(0px)" },
                { transform: `translateY(${window.innerHeight}px)` }
            ],
            {
                duration: 5000
            }
        );

        setTimeout(() => {
            heart.remove();
        }, 5000);

    }, 300);

}

function sendNotification() {

    const formspreeEndpoint = "https://formspree.io/f/mqevopvo";

    fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            message: "New date plan submitted ❤️",
            foods: datePlan.foods,
            activities: datePlan.activities,
            date: datePlan.date
        })
    })
    .then(response => {
        if (response.ok) {
            console.log("Notification sent successfully!");
        } else {
            console.error("Notification failed.");
        }
    })
    .catch(error => {
        console.error("Error sending notification:", error);
    });
}