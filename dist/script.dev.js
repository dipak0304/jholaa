"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var cart = JSON.parse(localStorage.getItem("cart")) || []; // Create Notification Element

  var notification = document.createElement("div");
  notification.classList.add("cart-notification");
  document.body.appendChild(notification);

  function showNotification(message) {
    notification.innerText = message;
    notification.style.display = "block";
    notification.style.opacity = "1";
    setTimeout(function () {
      notification.style.opacity = "0";
      setTimeout(function () {
        notification.style.display = "none";
      }, 500);
    }, 2000); // Show for 2 seconds
  }

  function addToCart(name, price, image) {
    price = parseFloat(price);
    var existingProduct = cart.find(function (item) {
      return item.name === name;
    });

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showNotification("✅ Item added to cart!");
    updateCartDisplay();
  }

  document.querySelectorAll(".add-to-cart").forEach(function (button) {
    button.addEventListener("click", function () {
      var name = this.getAttribute("data-name");
      var price = this.getAttribute("data-price");
      var image = this.getAttribute("data-image");
      addToCart(name, price, image);
    });
  });

  function updateCartDisplay() {
    var cartTable = document.querySelector("#cart tbody");
    var subtotalElement = document.getElementById("cart-subtotal");
    var totalElement = document.getElementById("cart-total");
    cartTable.innerHTML = "";
    var subtotal = 0;
    cart.forEach(function (item, index) {
      var itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;
      var row = "\n                <tr>\n                    <td><button class=\"remove-item\" data-index=\"".concat(index, "\">\u274C</button></td>\n                    <td><img src=\"").concat(item.image, "\" width=\"50\"></td>\n                    <td>").concat(item.name, "</td>\n                    <td>NPR ").concat(item.price, "</td>\n                    <td><input type=\"number\" class=\"quantity\" data-index=\"").concat(index, "\" value=\"").concat(item.quantity, "\" min=\"1\"></td>\n                    <td>NPR ").concat(itemSubtotal, "</td>\n                </tr>\n            ");
      cartTable.innerHTML += row;
    });
    subtotalElement.innerText = subtotal;
    totalElement.innerText = subtotal + 199;
    document.querySelectorAll(".remove-item").forEach(function (button) {
      button.addEventListener("click", function () {
        var index = this.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
      });
    });
    document.querySelectorAll(".quantity").forEach(function (input) {
      input.addEventListener("input", function () {
        var index = this.getAttribute("data-index");
        cart[index].quantity = parseInt(this.value) || 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
      });
    });
  }

  updateCartDisplay();
}); //expire coupon
// Coupon codes with their respective discounts and usage limits

var coupons = {
  "JHOLANP": {
    discount: 50,
    usesLeft: 120
  },
  "DISCOUNT60": {
    discount: 60,
    usesLeft: 120
  },
  "DISCOUNT10": {
    discount: 10,
    usesLeft: 120
  },
  "DISCOUNT20": {
    discount: 20,
    usesLeft: 120
  },
  "DISCOUNT35": {
    discount: 35,
    usesLeft: 120
  },
  "NEWUSER": {
    discount: 100,
    usesLeft: 1
  }
};

function applyCoupon() {
  var couponInput = document.getElementById("coupon-code").value.trim().toUpperCase(); // Convert to uppercase

  var message = document.getElementById("coupon-message");
  var cartSubtotalElement = document.getElementById("cart-subtotal");
  var cartTotalElement = document.getElementById("cart-total");
  var cartSubtotal = parseFloat(cartSubtotalElement.innerText);

  if (coupons[couponInput]) {
    var coupon = coupons[couponInput];

    if (coupon.usesLeft > 0) {
      var discountAmount = cartSubtotal * (coupon.discount / 100); // Calculate discount

      var newTotal = cartSubtotal - discountAmount + 199;
      newTotal = Math.max(newTotal, 0); // Prevent negative total
      // Apply discount and reduce usage count

      cartTotalElement.innerText = newTotal.toFixed(2);
      coupon.usesLeft--;
      message.style.color = "green";
      message.innerText = "Coupon Applied! ";
    } else {
      message.style.color = "red";
      message.innerText = "This coupon has expired!";
    }
  } else {
    message.style.color = "red";
    message.innerText = "Invalid Coupon Code!";
  }
}