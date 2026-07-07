let scale = 1;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

yesBtn.addEventListener("click", () => {
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
    console.log("yes button clicked");
});

function moveNo() {

    const x =
        Math.random() * (window.innerWidth - 180);

    const y =
        Math.random() * (window.innerHeight - 100);

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

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

    document.getElementById("summary").innerHTML = `
        <h3>🍕 Food</h3>
        <p>${foods || "Surprise"}</p>

        <br>

        <h3>🎬 Activities</h3>
        <p>${activities || "Surprise"}</p>

        <br>

        <h3>📅 Date</h3>
        <p>${date || "To be decided"}</p>
    `;

    step4.classList.add("hidden");
    step5.classList.remove("hidden");
}

function finishDate() {

    step5.classList.add("hidden");
    step6.classList.remove("hidden");

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