// DOM Selection
const Name = document.getElementById("name");
const roll = document.getElementById("roll");
const address = document.getElementById("address");
const entryform = document.getElementById("entryform");

const transcript = document.querySelector("aside");
const btn_output = document.querySelector(".btn_output");
const show_data = document.querySelector(".output");

// Counter for number of users stored
let i = parseInt(localStorage.getItem("counter")) || 0;

// Form submit event
entryform.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page refresh

    if (!Name.value.trim() || !address.value.trim() || !roll.value.trim()) {
        alert("All fields are required!");
        return;
    }
    if (+roll.value <= 0) {
        alert("Roll number must be a positive number!");
        return;
    }

    i++; // increase counter

    // Create object from input values
    const user_object = {
        data_name: Name.value,
        data_roll: Number(roll.value),
        data_address: address.value
    };

    // Store data in localStorage
    localStorage.setItem(`user${i}`, JSON.stringify(user_object));
    localStorage.setItem("counter", i);

    // Update transcript section
    UpdateTranscript(user_object);

    // Clear input fields
    entryform.reset();
});

// Show Output button click
btn_output.addEventListener("click", function () {
    show_data.innerHTML = ""; // clear previous output

    let total = parseInt(localStorage.getItem("counter")) || 0;

    for (let j = 1; j <= total; j++) {
        const user_retrieve = JSON.parse(localStorage.getItem(`user${j}`));
        if (user_retrieve) {
            ShowOutput(user_retrieve, j);
        }
    }
});

// -------- Functions given in question --------

function UpdateTranscript(obj) {
    transcript.innerHTML = `
        <h2>Transcript</h2>
        ${description_list(obj)}
    `;
}

function ShowOutput(obj, j) {
    show_data.innerHTML += `
        <div class="border">
            <h2>User ${j}</h2>
            ${description_list(obj)}
        </div>
    `;
}

function description_list(obj) {
    return `
        <dl class="details">
            <dt>Name:</dt>
            <dd>${obj.data_name}</dd>

            <dt>Roll:</dt>
            <dd>${obj.data_roll}</dd>

            <dt>Address:</dt>
            <dd>${obj.data_address}</dd>
        </dl>
    `;
}
