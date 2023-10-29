const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("dbEmployee")) ?? [];
const setLocalStorage = (dbEmployee) =>
  localStorage.setItem("dbEmployee", JSON.stringify(dbEmployee));

function createEmployee(employee) {
  const dbEmployee = getLocalStorage();
  dbEmployee.push(employee);

  setLocalStorage(dbEmployee);
  toggleModal();
  readEmployee();
  clearFormFields();
}

function readEmployee() {
  // Clear the old table for insert updates
  let tr = document.querySelectorAll("tr");
  if (tr.length > 1) {
    for (let i = 1; i < tr.length; i++) {
      tr[i].remove();
    }
  }

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

function updateEmployee(employee, index) {
  const dbEmployee = getLocalStorage();
  dbEmployee[index] = employee;

  setLocalStorage(dbEmployee);

  readEmployee();
}

const btEdit = document.querySelectorAll(".btEdit");

btEdit.forEach((bt, index) => {
  bt.addEventListener("click", () => edit(index));
});

const edit = (index) => {
  const dbEmployee = getLocalStorage();
  const employee = dbEmployee[index];

  for (const key in employee) {
    const inputField = document.querySelector(
      `#in${key.charAt(0).toUpperCase() + key.slice(1)}`
    );
    if (inputField) {
      inputField.value = employee[key];
    }
  }

  if (index !== "new") {
    document.querySelector("#inName").dataset.index = index;
  }

  toggleModal();
};

function deleteEmployee(index) {
  const dbEmployee = getLocalStorage();

  if (index >= 0 && index < dbEmployee.length) {
    if (confirm(`Are you sure you want to delete ${dbEmployee[index].name}?`)) {
      dbEmployee.splice(index, 1);
      setLocalStorage(dbEmployee);
      readEmployee();
    }
  }
}

const btDelete = document.querySelectorAll(".btDelete");
btDelete.forEach((bt, index) => {
  bt.addEventListener("click", () => deleteEmployee(index));
});

// Open and close modal
const toggleModal = () => {
  const divModal = document.querySelector("#divModal");
  divModal.classList.toggle("modalOpen");
  divModal.classList.toggle("modalHidden");

  if (divModal.classList.contains("modalHidden")) {
    clearFormFields();
  }
};

let btnCreate = document.querySelector("#btnCreate");
btnCreate.addEventListener("click", toggleModal);

const btnCloseModal = document.querySelector("#btnCloseModal");
btnCloseModal.addEventListener("click", toggleModal);

const validateForm = () => {
  const index = document.querySelector("#inName").dataset.index;
  let employee = {
    name: document.querySelector("#inName").value,
    position: document.querySelector("#inPosition").value,
    office: document.querySelector("#inOffice").value,
    age: document.querySelector("#inAge").value,
    startDate: document.querySelector("#inStartDate").value,
    phone: document.querySelector("#inPhone").value,
    salary: document.querySelector("#inSalary").value,
  };

  for (let num in employee) {
    if (employee[num] === "") {
      alert("All fields must be filled");
      return;
    }
  }
  if (index === "new") {
    createEmployee(employee);
  } else {
    updateEmployee(employee, index);
  }
};

const btSave = document.querySelector("#btSave");
btSave.addEventListener("click", validateForm);

function clearFormFields() {
  document.querySelector("#inName").value = "";
  document.querySelector("#inPosition").value = "";
  document.querySelector("#inOffice").value = "";
  document.querySelector("#inAge").value = "";
  document.querySelector("#inStartDate").value = "";
  document.querySelector("#inPhone").value = "";
  document.querySelector("#inSalary").value = "";
}
