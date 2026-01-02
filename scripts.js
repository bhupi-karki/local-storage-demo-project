//DOM Elements
const Name = document.getElementById("name");
const roll = document.getElementById("roll");
const address = document.getElementById("address");
const password = document.getElementById("password");
const entryform = document.getElementById("entryform");

const transcript = document.querySelector(".transcript");
const btn_output = document.querySelector(".btn_output");
const show_data = document.querySelector(".output");

let i = parseInt(localStorage.getItem("counter")) || 0;

entryform.addEventListener("submit", function (e) {
    e.preventDefault();

    if (
        !Name.value.trim() ||
        !roll.value.trim() ||
        !address.value.trim() ||
        !password.value.trim()
    ) {
        alert("All fields are required!");
        return;
    }

    if (+roll.value <= 0) {
        alert("Roll number must be positive!");
        return;
    }

    // ✅ UPDATED PASSWORD REGEX
    const passwordPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!#%*])[A-Za-z\d@!#%*]{8,}$/;

    if (!passwordPattern.test(password.value)) {
        alert(
            "Password must be at least 8 characters and include:\n" +
            "• 1 uppercase letter\n" +
            "• 1 lowercase letter\n" +
            "• 1 number\n" +
            "• 1 special symbol (@ ! # % *)"
        );
        return;
    }

    i++;

    const user_object = {
        data_name: Name.value,
        data_roll: Number(roll.value),
        data_address: address.value,
        data_password: password.value
    };

    localStorage.setItem(`user${i}`, JSON.stringify(user_object));
    localStorage.setItem("counter", i);

    UpdateTranscript(user_object);
    entryform.reset();
});

btn_output.addEventListener("click", function () {
    show_data.innerHTML = "";
    let total = parseInt(localStorage.getItem("counter")) || 0;

    for (let j = 1; j <= total; j++) {
        const user = JSON.parse(localStorage.getItem(`user${j}`));
        if (user) ShowOutput(user, j);
    }
});

function UpdateTranscript(obj) {
    transcript.innerHTML = `
        <h2>Transcript</h2>
        ${description_list(obj)}
    `;
}

function ShowOutput(obj, j) {
    show_data.innerHTML += `
        <div class="border">
            <h3>User ${j}</h3>
            ${description_list(obj)}
        </div>
    `;
}

function description_list(obj) {
    return `
        <dl class="details">
            <dt>Name:</dt><dd>${obj.data_name}</dd>
            <dt>Roll:</dt><dd>${obj.data_roll}</dd>
            <dt>Address:</dt><dd>${obj.data_address}</dd>
            <dt>Password:</dt><dd>${obj.data_password}</dd>
        </dl>
    `;
}
