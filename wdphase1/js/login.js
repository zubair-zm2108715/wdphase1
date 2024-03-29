window.addEventListener('DOMContentLoaded', () => {
  users = JSON.parse(localStorage.getItem('users'))
});

function validateForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let login = document.getElementById('login')
  
    if (username === '' || password === '') {
      console.log('Username and password must be filled out');
      return false;
    }
    
    let validUser = users.customers.find(
      (customer) => customer.username === username && customer.password === password
    );
    let validSeller = users.sellers.find(
      (seller) => seller.username === username && seller.password === password
    );
    
    if (validUser) {
      alert('Customer logged in');
      validUser.isLogged = true;
      localStorage.setItem('users', JSON.stringify(users));
      login.action='index.html';
    } 
    else if (validSeller) {
      alert('Seller logged in');
      validSeller.isLogged = true;
      localStorage.setItem('users', JSON.stringify(users));
      login.action='seller.html';
    } 
    else {
      console.log('Invalid username or password');
      alert('Invalid username or password');
      return false;
    }
  }