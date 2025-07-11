


document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Create Notification Element
    let notification = document.createElement("div");
    notification.classList.add("cart-notification");
    document.body.appendChild(notification);

    function showNotification(message) {
        notification.innerText = message;
        notification.style.display = "block";
        notification.style.opacity = "1";

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => {
                notification.style.display = "none";
            }, 500);
        }, 2000); // Show for 2 seconds
    }

    function addToCart(name, price, image) {
        price = parseFloat(price);
        let existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        showNotification("✅ Item added to cart!");
        updateCartDisplay();
    }
   

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.getAttribute("data-name");
            let price = this.getAttribute("data-price");
            let image = this.getAttribute("data-image");
            addToCart(name, price, image);
        });
    });

    function updateCartDisplay() {
        let cartTable = document.querySelector("#cart tbody");
        let subtotalElement = document.getElementById("cart-subtotal");
        let totalElement = document.getElementById("cart-total");

        cartTable.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            let itemSubtotal = item.price * item.quantity;
            subtotal += itemSubtotal;

            let row = `
                <tr>
                    <td><button class="remove-item" data-index="${index}">❌</button></td>
                    <td><img src="${item.image}" width="50"></td>
                    <td>${item.name}</td>
                    <td>NPR ${item.price}</td>
                    <td><input type="number" class="quantity" data-index="${index}" value="${item.quantity}" min="1"></td>
                    <td>NPR ${itemSubtotal}</td>
                </tr>
            `;
            cartTable.innerHTML += row;
        });

        subtotalElement.innerText = subtotal;
        totalElement.innerText = subtotal + 199;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });

        document.querySelectorAll(".quantity").forEach(input => {
            input.addEventListener("input", function () {
                let index = this.getAttribute("data-index");
                cart[index].quantity = parseInt(this.value) || 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    updateCartDisplay();
});






//expire coupon


// Coupon codes with their respective discounts and usage limits
const coupons = {
    "JHOLANP": { discount: 50, usesLeft: 120 },
    "DISCOUNT60": { discount: 60, usesLeft: 120 },
    "DISCOUNT10": { discount: 10, usesLeft: 120 },
    "DISCOUNT20": { discount: 20, usesLeft: 120 },
    "DISCOUNT35": { discount: 35, usesLeft: 120 },
    "NEWUSER": { discount: 100, usesLeft: 1 },

};

function applyCoupon() {
    let couponInput = document.getElementById("coupon-code").value.trim().toUpperCase(); // Convert to uppercase
    let message = document.getElementById("coupon-message");
    let cartSubtotalElement = document.getElementById("cart-subtotal");
    let cartTotalElement = document.getElementById("cart-total");

    let cartSubtotal = parseFloat(cartSubtotalElement.innerText);

    if (coupons[couponInput]) {
        let coupon = coupons[couponInput];

        if (coupon.usesLeft > 0) {
            let discountAmount = cartSubtotal * (coupon.discount / 100); // Calculate discount
            let newTotal = cartSubtotal - discountAmount + 199;
            newTotal = Math.max(newTotal, 0); // Prevent negative total

            // Apply discount and reduce usage count
            cartTotalElement.innerText = newTotal.toFixed(2);
            coupon.usesLeft--;

            message.style.color = "green";
            message.innerText = `Coupon Applied! `;
        } else {
            message.style.color = "red";
            message.innerText = "This coupon has expired!" ;
        }
    } else {
        message.style.color = "red";
        message.innerText = "Invalid Coupon Code!";
    }
}





