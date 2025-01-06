document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const API_URL =
        "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

    let cartData = [];

    // Fetch cart data
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            cartData = data.items;
            renderCartItems(cartData);
            updateTotals(data.presentment_price, data.original_total_price);
        })
        .catch((error) => console.error("Error fetching cart data:", error));

    // Render cart items
    function renderCartItems(items) {
        cartItemsContainer.innerHTML = items
            .map(
                (item) => `
      <tr data-id="${item.id}">
        <td>
          <div class="cart-item-details">
            <img src="${item.image}" alt="${item.title}">
          </div>
        </td>
        <td>${item.title}</td>
        <td>Rs. ${item.presentment_price.toLocaleString("en-IN")}.00</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
        </td>
        <td>Rs. ${(item.presentment_price * item.quantity).toLocaleString("en-IN")}.00</td>
        <td>
          <span class="material-symbols-outlined trash-icon" data-id="${item.id}">
            delete
          </span>
        </td>
      </tr>
    `
            )
            .join("");

        addEventListeners();
    }

    // Update totals
    function updateTotals(subtotal, total) {
        subtotalElement.textContent = `${subtotal.toLocaleString("en-IN")}.00`;
        totalElement.textContent = `${total.toLocaleString("en-IN")}.00`;
    }

    // Add event listeners for quantity changes and item removal
    function addEventListeners() {
        const quantityInputs = document.querySelectorAll(".quantity-input");
        const trashIcons = document.querySelectorAll(".trash-icon");

        // Update quantity
        quantityInputs.forEach((input) => {
            input.addEventListener("input", (event) => {
                const itemId = parseInt(event.target.dataset.id);
                const newQuantity = parseInt(event.target.value, 10);
                const item = cartData.find((item) => item.id === itemId);

                if (item && newQuantity > 0) {
                    item.quantity = newQuantity;

                    renderCartItems(cartData);
                    const newSubtotal = cartData.reduce(
                        (acc, item) => acc + item.presentment_price * item.quantity,
                        0
                    );
                    updateTotals(newSubtotal, newSubtotal);
                }
            });
        });

        // Remove item
        trashIcons.forEach((icon) => {
            icon.addEventListener("click", (event) => {
                const itemId = parseInt(event.target.dataset.id);
                cartData = cartData.filter((item) => item.id !== itemId);

                renderCartItems(cartData);
                const newSubtotal = cartData.reduce(
                    (acc, item) => acc + item.presentment_price * item.quantity,
                    0
                );
                updateTotals(newSubtotal, newSubtotal);
            });
        });
    }

    // Checkout button functionality
    const checkoutButton = document.querySelector(".checkout-button");
    checkoutButton.addEventListener("click", () => {
        alert("Proceeding to checkout...");
    });
});
