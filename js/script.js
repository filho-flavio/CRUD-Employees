function toggleFormVisibility() {
  const divAdd = document.querySelector("#div-add");
  divAdd.classList.toggle("hidden");
  divAdd.classList.toggle("content");

  let btAddEmployee = document.querySelector("#addEmployee");
  if (divAdd.classList.contains("content")) {
    btAddEmployee.disabled = true;
  } else {
    btAddEmployee.disabled = false;
  }

  clearDisplay();
}

document
  .querySelector("#addEmployee")
  .addEventListener("click", toggleFormVisibility);
document
  .querySelector("#close")
  .addEventListener("click", toggleFormVisibility);

let content = {
  inName: document.querySelector("#inName"),
  inPosition: document.querySelector("#inPosition"),
  inOffice: document.querySelector("#inOffice"),
  inAge: document.querySelector("#inAge"),
  inStartDate: document.querySelector("#inStartDate"),
  inTelephone: document.querySelector("#inTelephone"),
  inSalary: document.querySelector("#inSalary"),
};

let btSubmit = document.querySelector("#btSubmit");
btSubmit.addEventListener("click", validateForm);

function validateForm() {
  for (let num in content) {
    if (content[num].value === "") {
      alert("All fields must be filled");
      return;
    }
  }
  addEmployee(content);
}

function addEmployee(data) {
  let table = document.querySelector("table");
  const row = table.insertRow();

  for (let num in data) {
    const cell = row.insertCell();
    cell.textContent = data[num].value;
  }

  table.appendChild(row);
  const actionsCell = row.insertCell(); // Crie uma célula para os botões de ação.
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "btEdit";
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btDelete";
  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);
  actionsCell.className = "btActions";

  clearDisplay();
}

function clearDisplay() {
  for (let num in content) {
    content[num].value = "";
  }
}
