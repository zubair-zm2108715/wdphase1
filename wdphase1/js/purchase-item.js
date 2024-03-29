users = JSON.parse(localStorage.getItem('users'));
items = JSON.parse(localStorage.getItem('items'));
container=document.querySelector(".grid-container");
let params = new URLSearchParams(window.location.search);
let id = params.get('id');
let product = items.items.find((item) => item.id == id);
console.log(product)
document.addEventListener("DOMContentLoaded",function(){
  if(product==undefined){
    window.location.href="index.html";
    container.innerHTML="";
  }
  productimg=document.querySelector(".img")
  console.log(productimg.innerHTML);
  productimg.src=product.image;
  document.querySelector('.productName').textContent=product.name;
  document.querySelector('.price').textContent=product.price+"$";
  document.querySelector('.description').textContent=product.description;
})
function purchaseItem() {
  let username = params.get('username');
  let purchaseQuantity = document.getElementById('p_quantity').value;
  let purchaseAddress = document.getElementById('p_address').value;
  let totalCost = product.price * purchaseQuantity;

  // Check if quantity is available
  if (product.quantity < purchaseQuantity) {
      alert('Insufficient quantity');
      return;
  }

  // Find customer and check balance
  let customer = users.customers.find((customer) => customer.username === username);
  if (customer.money_balance < totalCost) {
      alert('Insufficient funds');
      return;
  }
  window.location.replace(`index.html?username=${username}`);
  // Deduct quantity from product
  product.quantity -= purchaseQuantity;

  // Deduct cost from customer's balance
  customer.money_balance -= totalCost;

  // Create purchase object
  purchaseQuantity = parseInt(purchaseQuantity);
  let purchase = {
      username: username,
      product_id: id,
      productName: product.name,
      quantity: purchaseQuantity,
      price: product.price,
      image: product.image,
      totalCost: totalCost,
      address: purchaseAddress,
      seller: product.seller,
  };

 
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('items', JSON.stringify(items));

  // Add purchase to purchases array
  let purchases = JSON.parse(localStorage.getItem('purchases')) || { purchases: [] };
  purchases.purchases.push(purchase);
  localStorage.setItem('purchases', JSON.stringify(purchases));

  alert(`You have successfully purchased ${purchaseQuantity} ${product.name}(s) for a total cost of $${totalCost}. Your remaining balance is $${customer.money_balance}.`);

}
function backToHome(){
  location.href='index.html'
}