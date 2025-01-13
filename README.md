# **Shopping Cart UI**

## **Overview**
This project is a responsive and dynamic **Shopping Cart UI** built with **HTML**, **CSS**, and **JavaScript**. The cart fetches product data from an API and dynamically renders cart items. Users can manage their cart by updating quantities, removing items, and proceeding to checkout. The project also features local storage for persisting cart data and a loading animation for enhanced user experience.

---

## **Features**
1. **Dynamic Cart Rendering**:
   - Fetch cart data from an API.
   - Dynamically display product details like image, title, price, and subtotal.

2. **Interactive Quantity Management**:
   - Update product quantities directly in the cart.
   - Automatically recalculate and display the updated subtotal and total.

3. **Remove Items with Confirmation**:
   - A modal popup for confirming item removal before deletion.

4. **Empty Cart State**:
   - Display a **"No items in the cart"** message when the cart is empty.

5. **Local Storage Integration**:
   - Cart data is saved in local storage, ensuring the cart persists after a page refresh.

6. **Checkout Button**:
   - Clear the cart and display a checkout alert when the "Checkout" button is clicked.

7. **Loading Animation**:
   - A spinner animation is shown while fetching cart data from the API.

8. **Responsive Design**:
   - Fully responsive layout optimized for desktop, tablet, and mobile views.

---

## **Technologies Used**
- **HTML**: For structuring the webpage.
- **CSS**: For styling the UI and ensuring responsiveness.
- **JavaScript**: For dynamic behavior and interactivity.
- **Local Storage**: To persist cart data across page refreshes.

---

## **Project Structure**
```
├── index.html         # Main HTML file
├── styles.css         # Styling for the project
├── script.js          # JavaScript functionality
├── images/            # Folder containing images (logo, icons, product images)
└── README.md          # Project documentation
```

---

## **Setup Instructions**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rakesh-kumar-18/marmeto.git
   cd marmeto
   ```

2. **Open the Project**:
   - Open the `index.html` file in your preferred browser.

3. **Run the Project**:
   - The cart will fetch data from the API and render dynamically.

---

## **Usage**
1. **View Cart Items**:
   - The cart items are fetched from the API and displayed in a table.

2. **Update Quantities**:
   - Adjust the product quantity using the input field. Totals will update automatically.

3. **Remove Items**:
   - Click the trash icon. A modal will prompt you to confirm the removal.

4. **Checkout**:
   - Click the "Checkout" button to clear the cart.

5. **Reload the Page**:
   - The cart contents persist, thanks to local storage integration.

---

## **API Details**
The cart data is fetched from the following API:
```
https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889
```
