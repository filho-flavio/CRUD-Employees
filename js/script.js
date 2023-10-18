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
  //inId: undefined,
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
  createEmployee(content);
  readEmployee();
}

function clearDisplay() {
  for (let num in content) {
    content[num].value = "";
  }
}

function createEmployee(employee) {
  let storedList = localStorage.getItem("dbClient");
  let parsedList = storedList ? JSON.parse(storedList) : [];

  let dataEmployees = {
    name: employee.inName.value,
    position: employee.inPosition.value,
    office: employee.inOffice.value,
    age: employee.inAge.value,
    startDate: employee.inStartDate.value,
    telephone: employee.inTelephone.value,
    salary: employee.inSalary.value,
  };

  parsedList.push(dataEmployees);

  localStorage.setItem("dbClient", JSON.stringify(parsedList));

  clearDisplay();
  toggleFormVisibility();
}

function readEmployee() {
  let data = JSON.parse(localStorage.getItem("dbClient"));
  //console.log(data);

  data.forEach((employee) => {
    let table = document.querySelector("table");
    const row = table.insertRow();

    // Você precisa percorrer as propriedades do objeto `employee`
    for (let key in employee) {
      const cell = row.insertCell();
      cell.textContent = employee[key]; // Use a chave (`key`) para acessar o valor correto no objeto `employee`
    }

    const actionsCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btEdit";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btDelete";
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    actionsCell.className = "btActions";
  });
}

readEmployee();

let btEdit = document.querySelectorAll(".btEdit");
btEdit.forEach((element, index) => {
  element.addEventListener("click", () => {
    updateEmployee(index);
  });
});

function updateEmployee(index) {
  let storedList = localStorage.getItem("dbClient");
  let parsedList = storedList ? JSON.parse(storedList) : [];
  let selectedEmployee;

  if (index >= 0 && index < parsedList.length) {
    selectedEmployee = parsedList[index];
  }

  fillForm(selectedEmployee);
}

function fillForm(employee) {
  let content = {
    inName: document.querySelector("#inName"),
    inPosition: document.querySelector("#inPosition"),
    inOffice: document.querySelector("#inOffice"),
    inAge: document.querySelector("#inAge"),
    inStartDate: document.querySelector("#inStartDate"),
    inTelephone: document.querySelector("#inTelephone"),
    inSalary: document.querySelector("#inSalary"),
  };

  content.inName.value = employee.name;
  content.inPosition.value = employee.position;
  content.inOffice.value = employee.office;
  content.inAge.value = employee.age;
  content.inStartDate.value = employee.startDate;
  content.inTelephone.value = employee.telephone;
  content.inSalary.value = employee.salary;

  formVisibility();
}

function formVisibility() {
  const divAdd = document.querySelector("#div-add");
  divAdd.classList.toggle("hidden");
  divAdd.classList.toggle("content");

  if (divAdd.classList.contains("content")) {
    btEdit.disabled = true;
  } else {
    btEdit.disabled = false;
  }
}
