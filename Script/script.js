const btn = document.getElementById("btn");
const table = document.getElementById("table");
let items = JSON.parse(localStorage.getItem("TODO"));

btn.addEventListener("click", (e) => {
    const text = document.getElementById("text").value.trim();

    if (text === "") {
        alert("Please write anything in the text box!");
    } else if (items.some(item => item.text === text)) {
        alert("This item already exists in the to-do list!");
    } else {
        items.push({ text, completed: false });
        localStorage.setItem("TODO", JSON.stringify(items));
        display();
        document.getElementById("text").value = "";
    }
});

display();

function display() {
    table.innerHTML = '';
    items.forEach((item, index) => {
        let data = document.createElement("div");
        data.classList.add('data');
        data.innerHTML = `
            <input class="check" type="checkbox" name="checkbox" ${item.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
            <span class="${item.completed ? 'completed' : ''}">${item.text}</span>
            <img class="cut" src="./Assets/delete.png" alt="Delete" onclick="deleteItem(${index})">
        `;
        table.appendChild(data);
    });
}

function toggleComplete(index) {
    items[index].completed = !items[index].completed;
    localStorage.setItem("TODO", JSON.stringify(items));
    display();
}

function deleteItem(index) {
    items.splice(index, 1);

    localStorage.setItem("TODO", JSON.stringify(items));
    display();
}
