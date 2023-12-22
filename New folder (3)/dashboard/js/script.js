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

// switchMode event listener


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


// Sidebar and other UI interactions
document.addEventListener('DOMContentLoaded', function() {  
    // Sidebar toggle
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');
    menuBar.addEventListener('click', function() {
        sidebar.classList.toggle('hide');
    });

    // Fetch and display dashboard data
    fetchData();

    // Fetch and display orders
    fetchOrders();

    
});

// Fetch dashboard data
function fetchData() {
    fetch('http://localhost/api-AMM/api/static/static.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                updateDashboard(data.data);
            } else {
                console.error('API returned an error:', data.message);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Update dashboard UI
function updateDashboard(data) {
    const boxInfo = document.querySelector('.box-info');
    boxInfo.innerHTML = '';
    data.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <i class='${item.icon}'></i>
            <span class="text">
                <h3>${item.count}</h3>
                <p>${item.label}</p>
            </span>
        `;
        boxInfo.appendChild(li);
    });
}

// Fetch orders and display them
function fetchOrders() {
    const tableBody = document.querySelector('.table-data tbody');
    fetch('http://localhost/api-AMM/api/order/order-api.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.orders)) {
                tableBody.innerHTML = '';
                data.orders.forEach(order => {
                    const orderDate = new Date(order.OrderDate);
                    const formattedDate = `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
                    const newRow = `
                        <tr>
                            <td><p>${order.Username}</p></td>
                            <td>${formattedDate}</td>
                            <td>$${order.TotalOrderAmount}</td>
                            <td><span class="status completed">Completed</span></td>
                            <td><button class="view-order" data-order-id="${order.OrderID}"><i class='bx bx-show'></i>view</button></td>
                        </tr>
                    `;
                    tableBody.innerHTML += newRow;
                });
                attachViewEventListeners();
            } else {
                console.error('Error fetching orders:', data.message || 'Unknown error');
            }
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
}

// Attach event listeners to view buttons
function attachViewEventListeners() {
    document.querySelectorAll('.view-order').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            fetchOrderItems(orderId);
        });
    });
}

// Fetch order items
function fetchOrderItems(orderId) {
    console.log("Fetching order items for ID:", orderId);  // Debugging line
    fetch('http://localhost/api-AMM/api/order-item/order-item-api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ OrderID: orderId })  // Ensure this matches server expectations
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response Data:', data);  // Debugging line
        if (data.success) {
            populateOrderPopup(data.orderItemDetails);
            openOrderPopup();
        } else {
            console.error('Failed to retrieve order items:', data.message);
        }
    })
    .catch(error => console.error('Error fetching order items:', error));
}


// Populate order popup
function populateOrderPopup(items) {
    const tableBody = document.getElementById('orderDetailsTable').querySelector('tbody');
    tableBody.innerHTML = '';
    items.forEach(item => {
        const row = `
            <tr>
                <td>${item.ProductName}</td>
                <td>${item.Quantity}</td>
                <td>$${item.Price}</td>
                <td>$${(item.Quantity * item.Price).toFixed(2)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Open/close order popup
function openOrderPopup() {
    document.getElementById('orderPopup').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.getElementById('content').classList.add('blurred');    
}

function closeOrderPopup() {
    document.getElementById('orderPopup').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.querySelector('#content').classList.remove('blurred'); // Make sure this selector targets your main content area.
}