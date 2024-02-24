let stack = []
let store = []
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    store.push(event.target)
    setTimeout(() => {
        event.target.className = 'hide';
    }, 0);

}

function dragend(event) {
    event.target.className = 'box';
}

// Function to handle drop
function drop(event) {
    event.preventDefault();
    let store_data = store.pop();
    let data = store_data.innerHTML;
    let draggedElement = document.getElementById(data);
    let destinationCell = event.target.closest(".cell");
    let originalCell = document.getElementById(data).parentElement;

    // Swap elements with animation
    if (originalCell === destinationCell || event.target === originalCell || event.target === destinationCell) {
        return false;
    }
    destinationCell.innerHTML = "";
    destinationCell.appendChild(draggedElement);
    originalCell.innerHTML = "";
    originalCell.appendChild(event.target);
    stack.push(event.target);
    stack.push(draggedElement);
}

// Function to undo the last action
function undo() {
     if (stack.length == 0) {
        return false;
    } else {
        let firstele = stack.pop()
        let secondele =  stack.pop()
        let destinationCell = secondele.closest(".cell");
        let data = firstele.innerHTML;
        let draggedElement = document.getElementById(data);
        let originalCell = document.getElementById(data).parentElement;
        destinationCell.innerHTML = "";
        destinationCell.appendChild(draggedElement);
        originalCell.innerHTML = "";
        originalCell.appendChild(secondele);
        draggedElement.style.transition = 'all 0.5s ease'; // Slow animation
        draggedElement.style.transform = 'scale(1.2)'; // Enlarge temporarily
        setTimeout(() => {
            draggedElement.style.transform = 'scale(1)'; // Revert to original size
        }, 500);

        originalCell.style.transition = 'all 0.5s ease'; // Slow animation
        originalCell.style.transform = 'scale(1.2)'; // Enlarge temporarily
        setTimeout(() => {
            originalCell.style.transform = 'scale(1)'; // Revert to original size
        }, 500);

     }

}

// Function to add a new row
function addRow() {
    let table = document.getElementById("table");
    let newRow = table.insertRow();
    for (let i = 0; i < 3; i++) {
        let cell = newRow.insertCell();
        cell.className = "cell";
        cell.setAttribute("ondrop", "drop(event)");
        cell.setAttribute("ondragover", "allowDrop(event)");
        let div = document.createElement("div");
        div.style.backgroundColor = 'rgb(' + [ Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)].join(',') + ')';
        let id = parseInt(table.rows.length - 1) * 100 * 3 + (i + 1) * 100;
        div.id = id;
        div.className = "box";
        div.draggable = true;
        div.setAttribute("ondragstart", "drag(event)");
        div.setAttribute("ondragend", "dragend(event)");
        div.innerText = id;
        cell.appendChild(div);
    }
}
