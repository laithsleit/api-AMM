const isLoggedIn = sessionStorage.getItem("isLoggedin") === "true";

if (!isLoggedIn) {
    window.location.href = "../signup.html";
} 
const logoutLink = document.querySelector('.logout');
logoutLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    sessionStorage.removeItem("isLoggedin"); // Remove the isLoggedIn item from sessionStorage
    window.location.href = "../signup.html"; // Redirect to the signup (or login) page
});

//////////////////////////////////////////


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

/////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector('.table-data tbody');

    // Fetch data from the API using the GET method to get recent orders
    fetch('http://localhost/api-AMM/api/order/order-api.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.orders)) {
                // Clear existing table rows
                tableBody.innerHTML = '';

                // Loop through orders and add rows to the table
                data.orders.forEach(order => {
                    const newRow = document.createElement('tr');
                    const orderDate = new Date(order.OrderDate);
                    const formattedDate = `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;

                    newRow.innerHTML = `
                        <td>
                            <p>${order.Username}</p>
                        </td>
                        <td>${formattedDate}</td>
						<td class="" >$${order.TotalOrderAmount}</td>
                        <td><span class="status completed">Completed</span></td>
                    `;

                    // Append the new row to the table body
                    tableBody.appendChild(newRow);
                });
            } else {
                console.error('Error fetching orders:', data.message || 'Unknown error');
            }
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
});



        // Function to fetch data from the API
        function fetchData() {
            fetch('http://localhost/api-AMM/api/static/static.php')
			
					.then(response => {
						if (!response.ok) {
							throw new Error(`HTTP error! Status: ${response.status}`);
						}
						return response.json();
					})
					.then(data => {
						if (data.success) {
							updateDashboard(data.data);
						} else {
							console.error('API returned an error:', data.message);
						}
					})
					.catch(error => console.error('Error fetching data:', error));
			}
			


       
        // Fetch data when the page loads
     

		// Function to update the dashboard HTML
function updateDashboard(data) {
    const boxInfo = document.querySelector('.box-info');

    // Clear existing content
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

// Fetch data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

    