// document.addEventListener("DOMContentLoaded", function () {
//   function toggleFormVisibility() {
//     const divAdd = document.querySelector("#div-add");
//     divAdd.classList.toggle("hidden");
//     divAdd.classList.toggle("content");

//     let btAddEmployee = document.querySelector("#addEmployee");
//     if (divAdd.classList.contains("content")) {
//       document.querySelector("h3").textContent = "Add new employee";
//       btAddEmployee.disabled = true;
//       let btSubmit = document.createElement("button");
//       btSubmit.setAttribute("type", "submit");
//       btSubmit.innerHTML = "Add";
//       btSubmit.id = "btSubmit";
//       document.querySelector(".form").appendChild(btSubmit);
//       const btnSubmit = document.querySelector("#btSubmit");
//       btnSubmit.addEventListener("click", validateForm);
//       document.querySelector(".form").removeChild(btUpdate);
//     } else {
//       btAddEmployee.disabled = false;
//     }

//     clearDisplay();
//   }

//   document
//     .querySelector("#addEmployee")
//     .addEventListener("click", toggleFormVisibility);
//   document
//     .querySelector("#close")
//     .addEventListener("click", toggleFormVisibility);

//   let content = {
//     inName: document.querySelector("#inName"),
//     inPosition: document.querySelector("#inPosition"),
//     inOffice: document.querySelector("#inOffice"),
//     inAge: document.querySelector("#inAge"),
//     inStartDate: document.querySelector("#inStartDate"),
//     inTelephone: document.querySelector("#inTelephone"),
//     inSalary: document.querySelector("#inSalary"),
//   };

//   function validateForm() {
//     for (let num in content) {
//       if (content[num].value === "") {
//         alert("All fields must be filled");
//         return;
//       }
//     }
//     createEmployee(content);
//   }

//   function clearDisplay() {
//     for (let num in content) {
//       content[num].value = "";
//     }
//   }

//   function createEmployee(employee) {
//     let storedList = localStorage.getItem("dbClient");
//     let parsedList = storedList ? JSON.parse(storedList) : [];

//     let dataEmployees = {
//       name: employee.inName.value,
//       position: employee.inPosition.value,
//       office: employee.inOffice.value,
//       age: employee.inAge.value,
//       startDate: employee.inStartDate.value,
//       telephone: employee.inTelephone.value,
//       salary: employee.inSalary.value,
//     };

//     parsedList.push(dataEmployees);

//     localStorage.setItem("dbClient", JSON.stringify(parsedList));

//     toggleFormVisibility();
//     readEmployee();
//   }

//   function readEmployee() {
//     let data = JSON.parse(localStorage.getItem("dbClient"));

//     data.forEach((employee) => {
//       let table = document.querySelector("table");
//       const row = table.insertRow();

//       for (let key in employee) {
//         const cell = row.insertCell();
//         cell.textContent = employee[key];
//       }

//       const actionsCell = row.insertCell();
//       const editButton = document.createElement("button");
//       editButton.textContent = "Edit";
//       editButton.className = "btEdit";
//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "Delete";
//       deleteButton.className = "btDelete";
//       actionsCell.appendChild(editButton);
//       actionsCell.appendChild(deleteButton);
//       actionsCell.className = "btActions";
//     });
//   }

//   readEmployee();

//   let btEdit = document.querySelectorAll(".btEdit");
//   btEdit.forEach((element, index) => {
//     element.addEventListener("click", () => {
//       updateEmployee(index);
//     });
//   });

//   function updateEmployee(index) {
//     let storedList = localStorage.getItem("dbClient");
//     let parsedList = storedList ? JSON.parse(storedList) : [];
//     let selectedEmployee;

//     const fillForm = (employee) => {
//       content.inName.value = employee.name;
//       content.inPosition.value = employee.position;
//       content.inOffice.value = employee.office;
//       content.inAge.value = employee.age;
//       content.inStartDate.value = employee.startDate;
//       content.inTelephone.value = employee.telephone;
//       content.inSalary.value = employee.salary;

//       formVisibility(index); // Passe o índice para a função formVisibility.
//     };

//     if (index >= 0 && index < parsedList.length) {
//       selectedEmployee = parsedList[index];
//       fillForm(selectedEmployee);
//     }
//   }

//   function formVisibility(index) {
//     const divAdd = document.querySelector("#div-add");
//     divAdd.classList.toggle("hidden");
//     divAdd.classList.toggle("content");

//     if (divAdd.classList.contains("content")) {
//       btEdit.disabled = true;
//       document.querySelector("h3").textContent = "Update Employee";
//       let btUpdate = document.createElement("button");
//       btUpdate.setAttribute("type", "submit");
//       btUpdate.innerHTML = "Save";
//       btUpdate.id = "btUpdate";
//       document.querySelector(".form").appendChild(btUpdate);
//       document.querySelector(".form").removeChild(btSubmit);
//       let btnUpdate = document.querySelector("#btUpdate");
//       btnUpdate.addEventListener("click", () => {
//         saveChanges(index); // Passe o índice para a função saveChanges.
//       });
//     } else {
//       btEdit.disabled = false;
//     }
//   }

//   const saveChanges = (index) => {
//     let storedList = localStorage.getItem("dbClient");
//     let parsedList = storedList ? JSON.parse(storedList) : [];

//     if (index >= 0 && index < parsedList.length) {
//       let employee = {
//         name: content.inName.value,
//         position: content.inPosition.value,
//         office: content.inOffice.value,
//         age: content.inAge.value,
//         startDate: content.inStartDate.value,
//         telephone: content.inTelephone.value,
//         salary: content.inSalary.value,
//       };

//       parsedList[index] = employee;
//       localStorage.setItem("dbClient", JSON.stringify(parsedList));
//     }
//   };

//   function deleteEmployee(index) {
//     let storedList = localStorage.getItem("dbClient");
//     let parsedList = storedList ? JSON.parse(storedList) : [];

//     if (index >= 0 && index < parsedList.length) {
//       let employeeName = parsedList[index].name;

//       if (confirm(`Are you sure you want to delete ${employeeName}?`)) {
//         let table = document.querySelector("tbody");
//         let tr = document.querySelectorAll("tr")[index];
//         table.removeChild(tr);

//         parsedList.splice(index, 1);
//         localStorage.setItem("dbClient", JSON.stringify(parsedList));
//       }
//     }
//   }

//   let btDelete = document.querySelectorAll(".btDelete");
//   btDelete.forEach((bt, index) => {
//     bt.addEventListener("click", () => deleteEmployee(index));
//   });
// });

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("dbClient")) ?? [];
const setLocalStorage = (dbClient) =>
  localStorage.setItem("dbClient", JSON.stringify(dbClient));

function createEmployee(employee) {
  const dbClient = getLocalStorage();
  dbClient.push(employee);
  setLocalStorage(dbClient);
  toggleModal();
  clearDisplay();
  readEmployee();
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

  // document.querySelector("#btSubmit").addEventListener('click', () => {
  //   employee.name = document.querySelector("#inName").value;
  //   employee.position = document.querySelector("#inPosition").value;
  //   employee.office = document.querySelector("#inOffice").value;
  //   employee.age = document.querySelector("#inAge").value;
  //   employee.startDate = document.querySelector("#inStartDate").value;
  //   employee.phone = document.querySelector("#inTelephone").value;
  //   employee.salary = document.querySelector("#inSalary").value;
  // })

  //dbEmployee[index] = employee;
  //setLocalStorage(deleteEmployee);

  toggleModal();
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
const toggleModal = () => {
  const divModal = document.querySelector("#divModal");
  divModal.classList.toggle("modalOpen");
  divModal.classList.toggle("modalHidden");

  if (divModal.classList.contains("modalOpen")) {
    btnModalOpen();
  }
};

let btnCreate = document.querySelector("#btnCreate");
btnCreate.addEventListener("click", toggleModal);

const btnCloseModal = document.querySelector("#btnCloseModal");
btnCloseModal.addEventListener("click", toggleModal);

function btnModalOpen() {
  const exixtingButton = document.querySelector("#btSubmit");
  if (!exixtingButton) {
    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.textContent = "Add";
    button.id = "btSubmit";
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

// const clearDisplay = () => {
//   for (let key in employee) {
//     employee[key].value = "";
//   }
// };
