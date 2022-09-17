let db;

const request = indexedDB.open("PWA-budget-tracker", 1);

request.onupdateneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("new_transaction", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    uploadTransactions();
  }
};

request.onerror = function (event) {
  // log error here
  console.log(event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["new_transaction"], "readwrite");

  const transactionObjectStore = transaction.objectStore("new_transaction");

  transactionObjectStore.add(record);
}

function uploadTransactions() {
  const transaction = db.transaction(["new_transaction"], "readwrite");
  const transactionObjectStore = transaction.objectStore("new_transaction");
  const getAll = transactionObjectStore.getAll();
}
