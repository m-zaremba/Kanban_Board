const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
const columnsList = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

let updatedOnLoad = false;

// Initialize default arrays
let listsArray = [];
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];

let draggedItem;
let dragging = false;
let currentColumn;

// Get arrays from localStorage or set default values if not available
const getSavedColumns = () => {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["Learn Japanese", "Get 3 dan in Kyudo"];
    progressListArray = ["Read 'Power of the Bow'", "Listen to music"];
    completeListArray = ["Get 2 dan in Kyudo", "Read 'Digital Minimalism'"];
    onHoldListArray = ["Procrastinate"];
  }
};

// Set localStorage Arrays
const updateSavedColumns = () => {
  listsArray = [
    backlogListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = ["backlog", "progress", "complete", "onHold"];

  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(
      `${arrayName}Items`,
      JSON.stringify(listsArray[index])
    );
  });
};

const filterArray = (array) => {
  console.log(array);
  const filteredArray = array.filter((item) => item !== null);
  console.log(filteredArray);
  return filteredArray;
};

const createItemEl = (columnEl, column, item, index) => {
  // Create list item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "dragItem(event)");
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`);

  columnEl.appendChild(listEl);
};

const updateDOM = () => {
  // Check contents of localStorage on initial page load
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  // Create Backlog column
  backlogList.textContent = "";
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  });
  backlogListArray = filterArray(backlogListArray);

  // Create Progress Column
  progressList.textContent = "";
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);

  // Create Complete Column
  completeList.textContent = "";
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);

  // Create On Hold Column
  onHoldList.textContent = "";
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);

  updatedOnLoad = true;
  updateSavedColumns();
};

const updateItem = (id, column) => {
  const selectedArray = listsArray[column];
  const selectedColumnEl = columnsList[column].children;
  if (!dragging) {
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
};

// Update arrays with dropped item
const rebuildArrays = () => {
  backlogListArray = Array.from(backlogList.children).map(
    (element) => element.textContent
  );
  progressListArray = Array.from(progressList.children).map(
    (element) => element.textContent
  );
  completeListArray = Array.from(completeList.children).map(
    (element) => element.textContent
  );
  onHoldListArray = Array.from(onHoldList.children).map(
    (element) => element.textContent
  );
  updateDOM();
};

const dragItem = (event) => {
  draggedItem = event.target;
  dragging = true;
};

const dragEnter = (column) => {
  columnsList[column].classList.add("over");
  currentColumn = column;
};

const allowDrop = (event) => {
  event.preventDefault();
};

const drop = (event) => {
  event.preventDefault();

  columnsList.forEach((column) => {
    column.classList.remove("over");
  });

  const parent = columnsList[currentColumn];
  parent.appendChild(draggedItem);
  dragging = false;
  rebuildArrays();
};

const addTask = (column) => {
  const itemText = addItems[column].textContent;
  const selectedArray = listsArray[column];
  selectedArray.push(itemText);
  updateDOM(column);
};

const showInputBox = (column) => {
  addBtns[column].style.visibility = "hidden";
  saveItemBtns[column].style.display = "flex";
  addItemContainers[column].style.display = "flex";
};

const hideInputBox = (column) => {
  addBtns[column].style.visibility = "visible";
  saveItemBtns[column].style.display = "none";
  addItemContainers[column].style.display = "none";
  addTask(column);
};

updateDOM();
