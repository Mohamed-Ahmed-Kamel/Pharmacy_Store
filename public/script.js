// Add to cart
let addToCart = document.querySelectorAll('.medicine-btn');
let cartCounter = document.querySelector('.cartCounter');

function updateCart(medicines) {
    axios.post('/cart/update-cart', medicines)
    .then((res) => {
        cartCounter.innerHTML = res.data.totalQty
        console.log(res);
    })
}
addToCart.forEach((btn) => {
    btn.addEventListener('click', (ele) => {
        let medicines = JSON.parse(btn.dataset.medicine);
        updateCart(medicines);
    })
})

// Update order status
let statusItems = document.querySelectorAll('.status-item');
let hiddenInput = document.querySelector('#hiddenInput');
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order)
function updateStatus(order) {
    statusItems.forEach((status) => {
        status.classList.remove('completed');
        status.classList.remove('current');
    })
    let stepCompleted = true;
    statusItems.forEach((status) => {
        let dataStatus = status.dataset.status;
        if (stepCompleted) {
            status.classList.add('completed')
        }
        if (dataStatus === order.status) {
            stepCompleted = false;
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })
}
updateStatus(order);

function initAdmin() {
    const orderTableBody = document.querySelector('#orderTableBody');
    let orders = [];
    let markup;
    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then((res) => {
        orders = res.data
        markup = generateMarkup(orders);
        orderTableBody.innerHTML = markup;
        // console.log(markup)
    }).catch((err) => {
        console.log(err);
    });
    function renderItems(items) {
        let parsedItems = Object.values(items);
        return parsedItems.map((menuItem) => {
            return `
                <p>${ menuItem.item.name } - ${ menuItem.qty } pcs</p>
            `
        }).join('')
    }
    function generateMarkup(orders) {
        return orders.map((order) => {
            return `
                <tr>
                    <td class="border px-4 py-2 text-green-900">
                        <p>${ order._id }</p>
                        <div>${ renderItems(order.items) }</div>
                    </td>
                    <td>${ order.userID.userName }</td>
                    <td>${ order.address }</td>
                    <td>
                        <div>
                            <form action='/admin/orders/status' method="POST">
                                <input type="hidden" name="orderID" value="${ order._id }">
                                <select name="status" onchange="this.form.submit()">
                                    <option value="order_placed" ${ order.status === 'order_placed' ? 'selected' : '' }>Placed</option>
                                    <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>Confirmed</option>
                                    <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>Prepared</option>
                                    <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>Delivered</option>
                                    <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>Completed</option>
                                </select>
                            </form>
                        </div>
                    </td>
                    <td>
                        ${ order.createdAt }
                    </td>
                </tr>
            `
        }).join('')
    }
}
initAdmin()

function editProfile() {
  const form = document.getElementById('profileForm');
  const editButton = document.getElementById('editButton');

  if (editButton.innerText === 'Edit') {
    // Make input fields editable
    for (let i = 0; i < form.length; i++) {
      form.elements[i].disabled = false;
    }

    // Change button text to 'Save'
    editButton.innerText = 'Save';
  } else {
    // Make input fields non-editable
    for (let i = 0; i < form.length; i++) {
      form.elements[i].disabled = true;
    }

    // Change button text back to 'Edit'
    editButton.innerText = 'Edit';

    // Send updated data to server
    axios.post('/user/update-profile', {
      userName: form.elements['userName'].value,
      age: form.elements['age'].value,
      address: form.elements['address'].value,
      phone: form.elements['phone'].value,
    })
      .then(res => console.log(res.data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}


// Get the input field
let input = document.querySelector('.search-box input');
    // Listen for keystrokes in the input field
    input.addEventListener('keyup', function(event) {
        // Get the current value of the input field
        let filter = event.target.value.toUpperCase();
        // Get all the medicine boxes
        let medicines = document.querySelectorAll('.medicine');
        // Loop through all the medicine boxes
        medicines.forEach(function(medicine) {
            // Get the title of the medicine
            let title = medicine.querySelector('.medicine-title').textContent;
            // If the title matches the search, show the medicine box, otherwise hide it
            if (title.toUpperCase().indexOf(filter) > -1) {
                medicine.style.display = '';
            } else {
                medicine.style.display = 'none';
            }
        });
    });
