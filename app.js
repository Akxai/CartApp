import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://add-to-cart-092-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");

const inputElement = document.getElementById("input-field");
const button = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

button.addEventListener("click", function () {
  let inputValue = inputElement.value;

  if (inputValue.trim() !== "") {
    push(itemsInDB, inputValue);
    inputElement.value = "";
  }
});

onValue(itemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemArray = Object.entries(snapshot.val());

    shoppingList.innerHTML = "";

    itemArray.forEach(function (item) {
      let itemKey = item[0];
      let itemVal = item[1];
      addItem(item);
    });
  } else {
    shoppingList.innerHTML = `<script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
    <lord-icon
        src="https://cdn.lordicon.com/cllunfud.json"
        trigger="loop"
        delay="800"
        id="cart"
        colors="outline:#121331,primary:#646e78,secondary:#ebe6ef"
        style="width:100%;height:100px">
    </lord-icon> \n <p class="add">Cart: 404 Items not found!</p>`;
  }
});

function addItem(item) {
  let itemID = item[0];
  let itemValue = item[1];

  const listItem = document.createElement("li");
  listItem.innerHTML = itemValue;

  listItem.addEventListener("click", function () {
    let clickedItem = ref(database, `items/${itemID}`);
    remove(clickedItem);
  });

  shoppingList.appendChild(listItem);
}
