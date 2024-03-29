// Function to add item to cart
function addToCart(name, price, imgUrl) {
    // Retrieve cart items from local storage
    let cartItems = localStorage.getItem('cart') ? localStorage.getItem('cart').split(';') : [];
    // Add item to cart
    cartItems.push(`${name}-${price}-${imgUrl}`);
    // Update local storage
    localStorage.setItem('cart', cartItems.join(';'));
    // Alert user that item was added to cart
    alert(`${name} added to cart`);
    // Refresh cart display
    displayCartItems();
}

document.addEventListener('DOMContentLoaded', function() {
    const cartItemsString = localStorage.getItem('cart');
    const cartList = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');

    let total = 0;

    if (cartItemsString) {
        const cartItems = cartItemsString.split(';');
        cartItems.forEach(item => {
            const [name, price, imgUrl] = item.split('-');
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="item-details">
                    <p>Item Name: ${name}</p>
                    <p>Price: ₱${price}</p>
                </div>
                <button class="remove-btn" data-name="${name}" data-price="${price}">Remove</button>`;
            cartList.appendChild(cartItem);

            total += parseFloat(price);
        });
    } else {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartList.appendChild(emptyCartMessage);
        checkoutBtn.disabled = true;
    }

    totalAmount.textContent = total.toFixed(2);

    checkoutBtn.addEventListener('click', function() {
        /*alert('Thank you for your purchase! Your items have been checked out.');*/
        clearCart();
        cartList.innerHTML = '';
        total = 0;
        totalAmount.textContent = total.toFixed(2);
    });

    cartList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));
            removeItem(name, price);
            event.target.parentElement.remove();
            total -= price;
            totalAmount.textContent = total.toFixed(2);
        }
    });
});

function removeItem(name, price) {
    let cartItems = localStorage.getItem('cart') ? localStorage.getItem('cart').split(';') : [];
    cartItems = cartItems.filter(item => {
        const [itemName, itemPrice] = item.split('-');
        return itemName !== name || parseFloat(itemPrice) !== price;
    });
    localStorage.setItem('cart', cartItems.join(';'));
}

function clearCart() {
    localStorage.removeItem('cart');
}