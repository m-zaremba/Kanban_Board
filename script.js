document.addEventListener("DOMContentLoaded", () => {
  const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
  const saveItemBtns = document.querySelectorAll(".solid");
  const addItemContainers = document.querySelectorAll(".add-container");
  const addItems = document.querySelectorAll(".add-item");
  const itemLists = document.querySelectorAll(".drag-item-list");
  const backlogList = document.getElementById("backlog-list");
  const progressList = document.getElementById("progress-list");
  const completeList = document.getElementById("complete-list");
  const onHoldList = document.getElementById("on-hold-list");

  // Initialize default arrays
  let listsArray = [];
  let backlogListArray = [];
  let progressListArray = [];
  let completeListArray = [];
  let onHoldListArray = [];


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
  }

  // Set localStorage Arrays
  const updateSavedColumns = () => {
    listsArray = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const arrayNames = ["backlog", "progress", "complete", "onHold"];

    arrayNames.forEach((arrayName, index) => {
      localStorage.setItem(`${arrayName}Items`, JSON.stringify(listsArray[index]));
    });
  };
  // getSavedColumns();
  // updateSavedColumns();
});
