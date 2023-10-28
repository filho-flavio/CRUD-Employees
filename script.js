const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("dbClient")) ?? [];
const setLocalStorage = (dbClient) =>
  localStorage.setItem("dbClient", JSON.stringify(dbClient));

function createEmployee(employee) {
  const dbClient = getLocalStorage();
  dbClient.push(employee);
  setLocalStorage(dbClient);
  toggleModal();
  readEmployee();
  clearFormFields();
}

function readEmployee() {
  const dbEmployee = getLocalStorage();

  dbEmployee.forEach((employee) => {
    let table = document.querySelector("table");
    const row = table.insertRow();

    for (let key in employee) {
      const cell = row.insertCell();
      cell.textContent = employee[key];
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

const btEdit = document.querySelectorAll(".btEdit");
btEdit.forEach((bt, index) => {
  bt.addEventListener("click", () => {
    updateEmployee(index);
  });
});

function updateEmployee(index) {
  const dbEmployee = getLocalStorage();

  const employee = dbEmployee[index];

  if (employee) {
    document.querySelector("#inName").value = employee.name;
    document.querySelector("#inPosition").value = employee.position;
    document.querySelector("#inOffice").value = employee.office;
    document.querySelector("#inAge").value = employee.age;
    document.querySelector("#inStartDate").value = employee.startDate;
    document.querySelector("#inTelephone").value = employee.phone;
    document.querySelector("#inSalary").value = employee.salary;
  }

  let btSave = true;

  toggleModal(btSave);

  document.querySelector("#btUpdate").addEventListener("click", () => {
    employee.name = document.querySelector("#inName").value;
    employee.position = document.querySelector("#inPosition").value;
    employee.office = document.querySelector("#inOffice").value;
    employee.age = document.querySelector("#inAge").value;
    employee.startDate = document.querySelector("#inStartDate").value;
    employee.phone = document.querySelector("#inTelephone").value;
    employee.salary = document.querySelector("#inSalary").value;

    dbEmployee[index] = employee;
    setLocalStorage(dbEmployee);
  });
}

function deleteEmployee(index) {
  let storedList = localStorage.getItem("dbClient");
  let parsedList = storedList ? JSON.parse(storedList) : [];

  if (index >= 0 && index < parsedList.length) {
    let employeeName = parsedList[index].name;

    if (confirm(`Are you sure you want to delete ${employeeName}?`)) {
      let table = document.querySelector("tbody");
      let tr = document.querySelectorAll("tr")[index];
      table.removeChild(tr);

      parsedList.splice(index, 1);
      localStorage.setItem("dbClient", JSON.stringify(parsedList));
    }
  }
}

let btDelete = document.querySelectorAll(".btDelete");
btDelete.forEach((bt, index) => {
  bt.addEventListener("click", () => deleteEmployee(index));
});

// Open and close modal
const toggleModal = (btSave) => {
  const divModal = document.querySelector("#divModal");
  divModal.classList.toggle("modalOpen");
  divModal.classList.toggle("modalHidden");

  if (divModal.classList.contains("modalOpen")) {
    btnModalOpen(btSave);
  }
  if (divModal.classList.contains("modalHidden")) {
    clearFormFields();
  }
};

let btnCreate = document.querySelector("#btnCreate");
btnCreate.addEventListener("click", toggleModal);

const btnCloseModal = document.querySelector("#btnCloseModal");
btnCloseModal.addEventListener("click", toggleModal);

function btnModalOpen(btSave) {
  const exixtingButton =
    document.querySelector("#btSubmit") || document.querySelector("#btUpdate");
  if (!exixtingButton) {
    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.textContent = "Add";

    if (btSave) {
      button.id = "btUpdate";
    } else {
      button.id = "btSubmit";
    }

    document.querySelector(".form").appendChild(button);

    button.addEventListener("click", validateForm);
  }
}

const validateForm = () => {
  let employee = {
    name: document.querySelector("#inName").value,
    position: document.querySelector("#inPosition").value,
    office: document.querySelector("#inOffice").value,
    age: document.querySelector("#inAge").value,
    startDate: document.querySelector("#inStartDate").value,
    phone: document.querySelector("#inTelephone").value,
    salary: document.querySelector("#inSalary").value,
  };

  for (let num in employee) {
    if (employee[num] === "") {
      alert("All fields must be filled");
      return;
    }
  }
  createEmployee(employee);
};

function clearFormFields() {
  document.querySelector("#inName").value = "";
  document.querySelector("#inPosition").value = "";
  document.querySelector("#inOffice").value = "";
  document.querySelector("#inAge").value = "";
  document.querySelector("#inStartDate").value = "";
  document.querySelector("#inTelephone").value = "";
  document.querySelector("#inSalary").value = "";
}
