document.addEventListener("DOMContentLoaded", function () {
    // Get the plus icon, close icon, and the popup form
    const addUserButton = document.getElementById("addUserButton");
    const closeUserForm = document.getElementById("closeUserForm");
    const userPopupForm = document.getElementById("userPopupForm");
    const overlay = document.getElementById("overlay");

    // Show the popup form when the plus icon is clicked
    addUserButton.addEventListener("click", function () {
        userPopupForm.classList.add("active");
        overlay.classList.add("active");
    });

    // Hide the popup form when the close icon is clicked
    closeUserForm.addEventListener("click", function () {
        userPopupForm.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Hide the popup form when the overlay is clicked
    overlay.addEventListener("click", function () {
        userPopupForm.classList.remove("active");
        overlay.classList.remove("active");
    });

    // Prevent clicks inside the form from closing the form
    userPopupForm.addEventListener("click", function (event) {
        event.stopPropagation();
    });


  

    // Handle form submission for product creation
   // Handle form submission for product creation
const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get the input values from the form
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stockQuantity = document.getElementById("stockQuantity").value;
    const categoryID = document.getElementById("categoryID").value;
    const image = document.getElementById("image").files[0]; // Get the selected file

    // Create an object with the data
    // 

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
        // headers: { 'Content-Type': 'application/json' }, // Comment out this line
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





const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})
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
                <i class='bx bxs-edit-alt f' ></i>Edit
                </span>
            </a>

            <a class="delete-product" data-product-id="${product.ProductID}">
                    <span class="pending status">
                        <i class='bx bxs-trash'></i>Delete
                    </span>
            </a>

        </td>
        `;


        document.getElementById("closeEditForm").addEventListener("click", closeEditForm);
        const editLinks = document.querySelectorAll('.edit-product');
        editLinks.forEach(link => {
            link.addEventListener('click', function () {
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
        link.addEventListener('click', function () {
            const ProductID = this.getAttribute('data-product-id');
            const confirmed = confirm('Are you sure you want to delete this product?');

            if (confirmed) {
               console.log(ProductID)
               deleteProduct(ProductID);
            }
        });
    });
}

// Function to delete a user by ID
function deleteProduct(ProductID) {
//
    fetch('http://localhost/api-AMM/api/prodect/delete.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ProductID: ProductID }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('product deleted successfully:', data.message);
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
            // Handle errors as needed
        });
}

function CategoryDropdown(categories) {
    const categoryDropdown = document.getElementById('categoryID');
    const EditCategories = document.getElementById('editCategoryID');

    if (!categoryDropdown) {
        console.error('Category dropdown not found.');
        return;
    }
    if (!EditCategories) {
        console.error('Category dropdown not found.');
        return;
    }

    // Clear existing options
    
    categoryDropdown.innerHTML = '';
    EditCategories.innerHTML = '';

    // Add categories to the dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.CategoryID;
        option.textContent = category.CategoryName;
        categoryDropdown.appendChild(option);
        categoryDropdown.appendChild(option);
    });
    
}
/// edit form
function showEditForm(productID) {
    const editProductForm = document.getElementById("editProductForm");
    editProductForm.style.display = "block";

    // Assign the productID to a data attribute for later use
    editProductForm.setAttribute("data-product-id", productID);

    
    // Optionally, you can reset the form values here
    // document.getElementById("editForm").reset();
}

function closeEditForm() {
    const editProductForm = document.getElementById("editProductForm");
    editProductForm.style.display = "none";
}

