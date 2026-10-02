const EMPLOYEES_KEY = "pemc_employees";
const RECORDS_KEY = "pemc_records";

let employees = JSON.parse(localStorage.getItem(EMPLOYEES_KEY) || "[]");
let records = JSON.parse(localStorage.getItem(RECORDS_KEY) || "[]");

function save() {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

function today() {
  const d = new Date();
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}

function message(text, error = false) {
  const el = document.getElementById("message");
  if (!el) return;
  el.textContent = text;
  el.style.color = error ? "red" : "green";
  setTimeout(() => el.textContent = "", 3000);
}

function getEmployee() {
  const input = document.getElementById("employeeInput");
  return input ? input.value.trim() : "";
}

function findEmployee(name) {
  return employees.find(e =>
    e.name.toLowerCase() === name.toLowerCase()
  );
}

function checkIn() {
  const name = getEmployee();
  const employee = findEmployee(name);

  if (!name) return message("اكتب اسم الموظف أولاً", true);
  if (!employee) return message("الموظف غير موجود", true);

  let record = records.find(r =>
    r.employee === employee.name && r.date === today()
  );

  if (record && record.checkIn)
    return message("تم تسجيل الحضور بالفعل", true);

  if (!record) {
    record = {
      id: Date.now(),
      employee: employee.name,
      date: today(),
      checkIn: new Date().toISOString(),
      checkOut: ""
    };
    records.push(record);
  } else {
    record.checkIn = new Date().toISOString();
  }

  save();
  render();
  message("تم تسجيل الحضور بنجاح");
  document.getElementById("employeeInput").value = "";
}

function checkOut() {
  const name = getEmployee();
  const employee = findEmployee(name);

  if (!name) return message("اكتب اسم الموظف أولاً", true);
  if (!employee) return message("الموظف غير موجود", true);

  const record = records.find(r =>
    r.employee === employee.name && r.date === today()
  );

  if (!record || !record.checkIn)
    return message("لم يتم تسجيل الحضور اليوم", true);

  if (record.checkOut)
    return message("تم تسجيل الانصراف بالفعل", true);

  record.checkOut = new Date().toISOString();

  save();
  render();
  message("تم تسجيل الانصراف بنجاح");
  document.getElementById("employeeInput").value = "";
}

function openEmployeeModal() {
  const m = document.getElementById("employeeModal");
  if (m) m.style.display = "flex";
}

function closeEmployeeModal() {
  const m = document.getElementById("employeeModal");
  if (m) m.style.display = "
