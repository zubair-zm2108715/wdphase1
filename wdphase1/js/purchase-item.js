users = JSON.parse(localStorage.getItem('users'));
items = JSON.parse(localStorage.getItem('items'));
let params = new URLSearchParams(window.location.search);
let id = params.get('id');
let product = items.items.find((item) => item.id == id);
console.log(product)
document.addEventListener("DOMContentLoaded",function(){
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
    // check if quantity is available
    if (product.quantity < purchaseQuantity) {
      alert('Insufficient quantity');
      return location.href = `index.html?username=${username}`;
    }
    product.quantity -= purchaseQuantity;
    
    let customer = users.customers.find(
      (customer) => customer.username === username
    );

    if (customer.money_balance < totalCost) {
      alert('Insufficient funds');
      return location.href = `index.html?username=${username}`;
    }
    customer.money_balance -= totalCost;
      
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('items', JSON.stringify(items));
    purchaseQuantity = parseInt(purchaseQuantity);
    let purchases = JSON.parse(localStorage.getItem('purchases')) || {purchases: []};
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
    console.log(product.seller);
    purchases.purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));
  
    window.users = users;
    window.items = items;
    window.purchases = purchases;
  
    alert(
      `You have successfully purchased ${purchaseQuantity} ${product.name}(s) for a total cost of $${totalCost}. Your remaining balance is $${customer.money_balance}.`
    );
    location.href = `index.html?username=${username}`;
  }

  function backToHome() {
    location.href = 'index.html';
  }