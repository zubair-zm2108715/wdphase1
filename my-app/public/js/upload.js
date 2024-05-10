users = JSON.parse(localStorage.getItem("users"));
items = JSON.parse(localStorage.getItem("items"));
purchases = JSON.parse(localStorage.getItem("purchases"));

function backToHome() {
  location.href = "index.html";
}

function uploadItem() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get("username");
  let itemName = document.getElementById("itemName").value;
  let price = document.getElementById("price").value;
  let quantity = document.getElementById("quantity").value;
  let picture = document.getElementById("picture").value;
  let details = document.getElementById("details").value;
  let category = document.getElementById("category").value;
  let id = items.items.length + 1;
  let item = {
    id: id,
    name: itemName,
    price: price,
    quantity: quantity,
    seller: username,
    image: picture,
    description: details,
    category: category,
  };
  console.log(items);
  items.items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  alert(`You have successfully uploaded ${itemName}`);

}

function goToLogin() {
  location.href = `login.html`;
}
