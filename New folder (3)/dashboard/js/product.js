const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";

if (!isLoggedIn) {
    window.location.href = "../login/signup.html";
}

const logoutLink = document.querySelector('.logout');
logoutLink.addEventListener('click', function(event) {
    event.preventDefault();
    sessionStorage.removeItem("isLoggedin");
    window.location.href = "../login/signup.html";
});

document.addEventListener("DOMContentLoaded", function() {
    // Form elements and buttons
    const addUserButton = document.getElementById("addUserButton");
    const closeCreateForm = document.getElementById("closeUserForm");
    const createProductForm = document.getElementById("productPopupForm");
    const closeEditForm = document.getElementById("closeEditForm");
    const editProductForm = document.getElementById("editProductForm");
    const overlay = document.getElementById("overlay");

    // Function to show the create form
    function showCreateForm() {
        createProductForm.classList.add("active");
        overlay.classList.add("active");
        document.getElementById('content').classList.add('blurred');    

    }

    // Function to close any form
    function closeForm() {
        createProductForm.classList.remove("active");
        editProductForm.classList.remove("active");
        overlay.classList.remove("active");
        document.getElementById('content').classList.remove('blurred');    

    }

    // Show the create form when the plus icon is clicked
    addUserButton.addEventListener("click", showCreateForm);

    // Close the create form when its close icon or the overlay is clicked
    closeCreateForm.addEventListener("click", closeForm);
    overlay.addEventListener("click", closeForm);

    // Close the edit form when its close icon or the overlay is clicked
    closeEditForm.addEventListener("click", closeForm);

    // Prevent clicks inside the forms from closing them
    createProductForm.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    editProductForm.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    // Show the edit form with the overlay
    function showEditForm() {
        editProductForm.classList.add("active");
        overlay.classList.add("active");
        document.getElementById('content').classList.add('blurred');    
    }

    // Attach event listeners to edit buttons
    document.querySelectorAll('.edit-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            // Populate edit form if needed, e.g., populateEditForm(productId);
            showEditForm();
        });
    });

    // Handle form submission for product creation
    const createProductFormElement = document.getElementById("createProductForm");

    createProductFormElement.addEventListener("submit", function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the input values from the form
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const stockQuantity = document.getElementById("stockQuantity").value;
        const categoryID = document.getElementById("categoryID").value;
        const image = document.getElementById("image").files[0]; // Get the selected file

        // Create a FormData object to send in the POST request
        const formData = new FormData();
        formData.append("categoryID", categoryID);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stockQuantity", stockQuantity);
        formData.append("image", image);

        // Send a POST request using the Fetch API
        fetch('http://localhost/api-AMM/api/prodect/insert.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Display the response message in an alert
            location.reload();
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            // Display an error message in case of a network issue or other error
            alert('An error occurred. Please try again.');
        });
    });

    fetchAndPopulateCategories();
    fetchData();
});

// Sidebar and other UI interactions
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function() {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function() {
    sidebar.classList.toggle('hide');
});

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function(e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function() {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

//  switchMode event listener


const switchMode = document.getElementById('switch-mode');
const storageKey = 'userMode';

// Check if there's a mode stored in localStorage and set it if available
const storedMode = localStorage.getItem(storageKey);
if (storedMode === 'dark') {
    document.body.classList.add('dark');
    switchMode.checked = true;
}

switchMode.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem(storageKey, 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem(storageKey, 'light');
    }
});


// Function to fetch data from the API
function fetchData() {
    fetch('http://localhost/api-AMM/api/prodect/select.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the parsed JSON data
            console.log('Data:', data);
            updateproductTable(data);
        })
        .catch(error => {
            // Check if response is defined before accessing its properties
            const responseStatus = error.response ? error.response.status : 'N/A';
            console.error(`Error fetching product: ${error.message}`, 'Response status:', responseStatus);

            // If there's no response object, handle the error accordingly
            if (!error.response) {
                console.error('Network error or invalid JSON response.');
            }
        });
}

// Function to update the product table

function updateproductTable(products) {
    const tableBody = document.querySelector('.table-data tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through product and add rows to the table
    products.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td>
            <img src="${product.Image}" width="50" height="50">
        </td>
        <td>
                <p>${product.Name}</p>
        </td>
        <td>${product.Description}</td>
        <td>${product.Price}</td>
        <td>
            <a class="edit-product" data-product-id="${product.ProductID}">
                <span class="completed status">
                <i class='bx bxs-edit-alt f' >Edit</i>
                </span>
            </a>
        
            <a class="delete-product" data-product-id="${product.ProductID}">
                    <span class="pending status">
                        <i class='bx bxs-trash'>Delete</i>
                    </span>
            </a>

        </td>
        `;


        document.getElementById("closeEditForm").addEventListener("click", closeEditForm);
        const editLinks = document.querySelectorAll('.edit-product');
        editLinks.forEach(link => {
            link.addEventListener('click', function() {
                const productID = this.getAttribute('data-product-id');
                console.log(productID)
                showEditForm(productID);

            });
        });



        // Append the new row to the table body
        tableBody.appendChild(newRow);
    });

    // Attach event listener to the delete user links
    const deleteLinks = document.querySelectorAll('.delete-product');
    deleteLinks.forEach(link => {
        link.addEventListener('click', function() {
            const ProductID = this.getAttribute('data-product-id');
            const confirmed = confirm('Are you sure you want to delete this product?');

            if (confirmed) {
                console.log(ProductID)
                deleteProduct(ProductID);
            }
        });
    });

    const editLinks = document.querySelectorAll('.edit-product');
    editLinks.forEach(link => {
        link.addEventListener('click', function() {
            const productID = this.getAttribute('data-product-id');
            console.log('Editing product with ID:', productID);

            // Call a function to populate the edit form
            populateEditForm(productID);

            // Show the edit form (you might already have this functionality)
            showEditForm(); // Ensure this function displays the form
        });
    });

}

// JavaScript Code for Deleting a Product

// Function to delete a product by its ID
function deleteProduct(ProductID) {
    // Send a DELETE request to the server API
    fetch(`http://localhost/api-AMM/api/prodect/delete.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ProductID: ProductID
            }), // Send the ProductID in the request body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Product deleted successfully:', data.message);
            // Refresh the product table after deletion
            fetchData();
        })
        .catch(error => {
            console.error('Error deleting product:', error.message);
        });
}




// Fetch data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});



function fetchAndPopulateCategories() {
    fetch('http://localhost/api-AMM/api/Category/select.php')
        .then(response => response.json())
        .then(categories => {
            console.log(categories);
            CategoryDropdown(categories);
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
}

function CategoryDropdown(categories) {
    const categoryDropdown = document.getElementById('categoryID');
    const editCategories = document.getElementById('editCategoryID');

    if (!categoryDropdown || !editCategories) {
        console.error('Category dropdown not found.');
        return;
    }

    // Clear existing options
    categoryDropdown.innerHTML = '';
    editCategories.innerHTML = '';

    // Add categories to the dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.CategoryID;
        option.textContent = category.CategoryName;
        categoryDropdown.appendChild(option.cloneNode(true));
        editCategories.appendChild(option);
    });
}

/// edit form
function showEditForm(productID) {
    const editProductForm = document.getElementById("editProductForm");
    editProductForm.style.display = "block";
    // Assign the productID to a data attribute for later use
    editProductForm.setAttribute("data-product-id", productID);
    editProductForm.classList.add("active");
    overlay.classList.add("active");
    document.getElementById('content').classList.add('blurred'); 
}

function closeEditForm() {
    const editProductForm = document.getElementById("editProductForm");
    editProductForm.style.display = "none";
    overlay.classList.remove("active");
    document.getElementById('content').classList.remove('blurred'); 


}

// Add an event listener for the "keyup" event on the search input field
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    // Get the value from the search input
    const searchQuery = event.target.value;

    // Make a Fetch API request to the endpoint with the search query
    fetch('http://localhost/api-AMM/api/searchPruduct/ProductSearch.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                searchProducts: searchQuery,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data and update the UI
            updateproductTable(data.products);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



// Function to handle product update
function updateProduct(event) {
    event.preventDefault();

    // Assuming you have input fields with these IDs in your update form
    const productID = document.getElementById("editProductID").value;
    const name = document.getElementById("editName").value;
    const description = document.getElementById("editDescription").value;
    const price = document.getElementById("editPrice").value;
    const stockQuantity = document.getElementById("editStockQuantity").value;
    const categoryID = document.getElementById("editCategoryID").value;
    const image = document.getElementById("editImage").files[0];

    const formData = new FormData();
    formData.append("ProductID", productID);
    formData.append("categoryID", categoryID);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    if (image) {
        formData.append("image", image);
    }
    //C:\xampp\htdocs\api-AMM\api\prodect\update.php
    fetch('http://localhost/api-AMM/api/prodect/update.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            // Additional logic after successful update
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}

const updateForm = document.getElementById("editForm");
updateForm.addEventListener("submit", updateProduct);

function populateEditForm(productID) {
    // Prepare the data to send in the POST request
    const postData = JSON.stringify({
        ProductID: productID
    });

    // Send a POST request to the PHP API
    fetch('http://localhost/api-AMM/api/prodect/select.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: postData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(productData => {
            // Populate the form fields with the product data
            document.getElementById("editName").value = productData.Name;
            document.getElementById("editDescription").value = productData.Description;
            document.getElementById("editPrice").value = productData.Price;
            document.getElementById("editStockQuantity").value = productData.StockQuantity;
            document.getElementById("editCategoryID").value = productData.CategoryID;
            document.getElementById("editProductID").value = productID; // Ensure this is the correct ID
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}