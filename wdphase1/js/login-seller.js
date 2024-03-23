users = JSON.parse(localStorage.getItem('users'))

function validateForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
  
    if (username === '' || password === '') {
      console.log('Username and password must be filled out');
      return false;
    }
    
    let validSeller = users.sellers.find(
      (seller) => seller.username === username && seller.password === password
    );
    
    if (validSeller) {
      console.log('Seller logged in');
      validSeller.isLogged = true;
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      console.log('Invalid username or password');
      return false;
    }
  }