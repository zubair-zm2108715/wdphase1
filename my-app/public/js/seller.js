window.addEventListener("DOMContentLoaded", async () => {
  users = JSON.parse(localStorage.getItem("users"));
  items = JSON.parse(localStorage.getItem("items"));
  purchases = JSON.parse(localStorage.getItem("purchases"));

  let params = new URLSearchParams(window.location.search);
  let username = params.get("username");
  let sellerItemsDiv = document.querySelector("#item-list");
  let sellerItemsSoldDiv = document.querySelector("#sale-history-list");
  let sellerItems = items.items.filter((item) => item.seller === username);
  if (purchases) {
    let soldItems = Object.values(purchases.purchases).filter((purchase) => {
      return purchase.seller === username;
    });
    function showSellerItemsSold() {
      sellerItemsSoldDiv.innerHTML = soldItems
        .map((item) => itemsToCardSold(item))
        .join("");
    }
    await showSellerItemsSold();
  }
  function showSellerItems() {
    console.log("Seller items:", sellerItems);
    sellerItemsDiv.innerHTML = sellerItems
      .map((item) => itemsToCard(item))
      .join("");
  }
  await showSellerItems();
});


function itemsToCard(item) {
  return `<div class="card" id="card">
            <p hidden>${item.id}</p>
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="Product Image" id="img">
            
            <p><b>Price: </b>${item.price}</p>
            <p hidden><b>Description: </b>${item.description}</p>
            <p hidden><b>Category: </b>${item.category}</p>
            <p><b>Quantity: </b>${item.quantity}</p>
            <button class="Button" id="update" onclick="updateItem('${item.id}');">Update</button>
            <input type="number" id="quantity-${item.id}" placeholder="${item.quantity}" hidden>
            <button class="saveBtn" id="save" onclick="saveItem('${item.id}')" hidden>Save</button>
           
            </div>
        `;
}

function itemsToCardSold(item) {
  return `<div class="card">
            <p hidden>${item.id}</p>
            <h3>${item.productName}</h3>
            <img src="${item.image}" alt="Product Image">
            <p><b>Price: </b>${item.price}</p>
            <p><b>Purchased by: </b>${item.username}</p>
            <p><b>Quantity: </b>${item.quantity}</p>
            </div>
        `;
}

document.addEventListener("click", (e) => {
  if (e.target.id === "update") {
    e.target.nextElementSibling.hidden = false;
    e.target.nextElementSibling.nextElementSibling.hidden = false;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "card") {
    let description = e.target.querySelector("p:nth-child(5)");
    let category = e.target.querySelector("p:nth-child(6)");

    description.hidden = !description.hidden;
    category.hidden = !category.hidden;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "img") {
    e.target.nextElementSibling.nextElementSibling.hidden = false;
    e.target.nextElementSibling.nextElementSibling.nextElementSibling.hidden = false;
  }
});

function updateItem(e) {
  console.log("Item id:", e);
  console.log("Items:", items);
  let itemIndex = items.items.find((item) => item.id == e);
  console.log("Item index:", itemIndex);
}

function saveItem(id) {
  let quantity = document.querySelector(`#quantity-${id}`).value;
  console.log("Quantity:", quantity);
  console.log("Item id:", id);
  let item = items.items.find((item) => item.id == id);
  item.quantity = parseInt(quantity);
  localStorage.setItem("items", JSON.stringify(items));
  window.items = items;
}

function uploadType() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get("username");
  location.href = `uploadtype.html?username=${username}`;
}

function goToSeller() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get("username");
  location.href = `seller.html?username=${username}`;
}

function goToUpload() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get("username");
  location.href = `upload.html?username=${username}`;
}

function backToHome() {
  location.href = "index.html";
}
function goToLogin() {
  location.href = `login.html`;
}

function uploadItem() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get("username");
  let itemName = document.getElementById("itemName").value;
  let price = document.getElementById("price").value;
  let quantity = document.getElementById("quantity").value;
  let picture = document.getElementById("picture").value;
  let details = document.getElementById("details").value;
  let id = items.items.length + 1;
  let item = {
    id: id,
    name: itemName,
    price: price,
    quantity: quantity,
    seller: username,
    image_url: picture,
    description: details,
  };
  console.log(items);
  items.items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  window.items = items;
}
