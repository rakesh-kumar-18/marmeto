document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const loader = document.getElementById("loader");
    const API_URL =
        "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

    let cartData = [];
    let selectedItemToRemove = null;

    // Show loader
    function showLoader() {
        loader.classList.add("visible");
    }

    // Hide loader
    function hideLoader() {
        loader.classList.remove("visible");
    }

    showLoader();

    // Fetch cart data from API
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            cartData = loadCartDataFromLocalStorage() || data.items;
            renderCartItems(cartData);
            const newSubtotal = cartData.reduce(
                (acc, item) => acc + item.presentment_price * item.quantity,
                0
            );
            updateTotals(newSubtotal, newSubtotal);
        })
        .catch((error) => console.error("Error fetching cart data:", error))
        .finally(() => {
            hideLoader();
        });

    // Render cart items
    function renderCartItems(items) {
        if (items.length === 0) {
            cartItemsContainer.innerHTML = `
        <tr>
            <td colspan="6" class="empty-cart-message">No items in the cart</td>
        </tr>`;
        } else {
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
    }

    // Update totals
    function updateTotals(subtotal, total) {
        subtotalElement.textContent = `Rs. ${subtotal.toLocaleString("en-IN")}.00`;
        totalElement.textContent = `Rs. ${total.toLocaleString("en-IN")}.00`;
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

                    saveCartDataToLocalStorage();
                    renderCartItems(cartData);

                    const newSubtotal = cartData.reduce(
                        (acc, item) => acc + item.presentment_price * item.quantity,
                        0
                    );
                    updateTotals(newSubtotal, newSubtotal);
                }
            });
        });

        // Remove item confirmation modal
        trashIcons.forEach((icon) => {
            icon.addEventListener("click", (event) => {
                const itemId = parseInt(event.target.dataset.id);
                selectedItemToRemove = itemId;
                showModal();
            });
        });
    }

    const modal = document.getElementById("confirmModal");
    const confirmButton = document.getElementById("confirmRemove");
    const cancelButton = document.getElementById("cancelRemove");

    function showModal() {
        modal.style.display = "flex";
    }

    function hideModal() {
        modal.style.display = "none";
    }

    const checkoutItems = () => {
        cartData = [];
        renderCartItems(cartData);
        updateTotals(0, 0);
        saveCartDataToLocalStorage();
    };

    // Confirm removal
    confirmButton.addEventListener("click", () => {
        if (selectedItemToRemove !== null) {
            cartData = cartData.filter((item) => item.id !== selectedItemToRemove);

            saveCartDataToLocalStorage();
            renderCartItems(cartData);
            const newSubtotal = cartData.reduce(
                (acc, item) => acc + item.presentment_price * item.quantity,
                0
            );
            updateTotals(newSubtotal, newSubtotal);

            selectedItemToRemove = null;
        }
        hideModal();
    });

    // Cancel removal
    cancelButton.addEventListener("click", () => {
        selectedItemToRemove = null;
        hideModal();
    });

    // Checkout button functionality
    const checkoutButton = document.querySelector(".checkout-button");
    checkoutButton.addEventListener("click", () => {
        if (cartData.length > 0) {
            alert("Proceeding to checkout...");
            checkoutItems();
        } else {
            alert("Cart is empty");
        }
    });

    // Save cart data to localStorage
    function saveCartDataToLocalStorage() {
        localStorage.setItem("cartData", JSON.stringify(cartData));
    }

    // Load cart data from localStorage
    function loadCartDataFromLocalStorage() {
        const storedCartData = localStorage.getItem("cartData");
        return storedCartData ? JSON.parse(storedCartData) : null;
    }
});
