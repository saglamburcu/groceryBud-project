let inputDOM = document.querySelector("#product")
let form = document.querySelector("form")
let alert = document.querySelector(".alert")
let listContainer = document.querySelector(".list-container")
let submitBtn = document.querySelector("#submit")
let clear = document.querySelector("#clear")
let clearContainer = document.querySelector(".clear")

let editElement;
let editFlag = false;

form.addEventListener("submit", addItem)
clear.addEventListener("click", clearItems)

function addItem(e) {
  e.preventDefault()
  let id = new Date().getTime().toString()

  if (inputDOM.value && !editFlag) {
    let list = document.createElement("DIV")
    let attr = document.createAttribute("id")
    attr.value = id;

    list.setAttributeNode(attr)
    list.classList.add("list")

    list.innerHTML = `
                <p>${inputDOM.value}</p>
                <div class="btn-container">
                  <button type="button" id="correction">
                    <i class="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button type="button" id="delete">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
             
    `
    listContainer.append(list)

    let deleteBtn = list.querySelector("#delete")
    deleteBtn.addEventListener("click", deleteItem)
    let editBtn = list.querySelector("#correction")
    editBtn.addEventListener("click", editItem)
    backToDefault()
    alertTime("Item Added To The List", "rgb(88, 196, 111)")

  } else if (inputDOM.value && editFlag) {
    editElement.innerHTML = inputDOM.value
    alertTime("Value Changed", "rgb(88, 196, 111)")
    backToDefault()
  } else {
    alertTime("Please Enter Value", "rgb(201, 100, 100)")
  }
}

// BACK TO DEFAULT
function backToDefault() {
  editFlag = false;
  submitBtn.innerHTML = "Submit"
  inputDOM.value = ""
}

// ALERT
function alertTime(message, color) {
  alert.innerHTML = message;
  alert.style.backgroundColor = color

  //remove alert
  setTimeout(function () {
    alert.innerHTML = "";
    alert.style.backgroundColor = "white"
  }, 1000)
}


// DELETE ITEM
function deleteItem(e) {
  e.currentTarget.parentElement.parentElement.classList.add("hidden")
  alertTime("Item Removed", "rgb(88, 196, 111)")
}

// EDIT ITEM
function editItem(e) {
  editFlag = true
  editElement = (e.currentTarget.parentElement.previousElementSibling)
  inputDOM.value = editElement.innerHTML
  submitBtn.innerHTML = "Edit"
}


// CLEAR ITEMS ***
function clearItems() {
  let listItem = listContainer.querySelectorAll(".list")
  alertTime("Empty List", "rgb(201, 100, 100)")
  if (listItem.length > 0) {
    listItem.forEach(item => {
      listContainer.removeChild(item)
    })
  }

}

