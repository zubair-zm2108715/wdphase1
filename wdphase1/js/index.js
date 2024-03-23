


var users = { "username": "user1", "password": "pass1" }; // Your JSON object

    function validateForm() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (users.username == username && users.password == password) {
            return true;
        } else {
            alert('Invalid username or password');
            return false;
        }
    }




    function viewSales() {
        // Add code here to handle viewing sales for the item
    }

    document.getElementById("itemForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        var itemName = document.getElementById("itemName").value;
        var price = document.getElementById("price").value;
        var quantity = document.getElementById("quantity").value;
        var picture = document.getElementById("picture").value;
        var details = document.getElementById("details").value;

        // Check if item already exists
        var existingItem = localStorage.getItem(itemName);
        if (existingItem) {
            // Item already exists, update quantity
            var item = JSON.parse(existingItem);
            item.quantity += parseInt(quantity);
            localStorage.setItem(itemName, JSON.stringify(item));
        } else {
            // Item does not exist, create new item
            var newItem = {
                itemName: itemName,
                price: price,
                quantity: quantity,
                picture: picture,
                details: details
            };
            localStorage.setItem(itemName, JSON.stringify(newItem));
        }

        // Clear form inputs
        document.getElementById("itemName").value = "";
        document.getElementById("price").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("picture").value = "";
        document.getElementById("details").value = "";

        alert("Item uploaded successfully!");
    });