"use strict";

function showProducts(category) {
  var productDisplay = document.getElementById('productDisplay');
  productDisplay.innerHTML = ''; // Clear previous products

  var products = {
    mobiles: [{
      image: 'mobile/i1.png',
      title: 'Iphone 16 Pro Max 256GB',
      price: '232,499.00',
      page: 'ip15.html'
    }, {
      image: 'mobile/s1.png',
      title: 'Samsung Galaxy S24 Ultra',
      price: '184,999.00',
      page: 's24.html'
    }],
    watches: [{
      image: 'watch/w1.jpg',
      title: 'Smart Watch',
      price: '4,499.00',
      page: 'dd.html'
    }]
  };

  if (!products[category]) {
    console.error("Category \"".concat(category, "\" not found."));
    return;
  }

  products[category].forEach(function (product, index) {
    console.log("Loading product #".concat(index, ":"), product); // Debugging

    if (!product.title || !product.price || !product.image) {
      console.error('Error: Missing product data', product);
      return;
    }

    var productCard = document.createElement('div');
    productCard.classList.add('product-card');
    var productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;

    productImage.onclick = function () {
      openProductPage(product.image, product.title, product.price, product.page || '#');
    };

    var productTitle = document.createElement('h2');
    productTitle.textContent = product.title;
    var productPrice = document.createElement('p');
    productPrice.classList.add('texx');
    productPrice.textContent = "NPR ".concat(product.price);
    var buyButton = document.createElement('a');
    buyButton.href = "#";
    buyButton.classList.add('buy-button');
    buyButton.innerHTML = '<i class="fal fa-shopping-cart cart"></i>';
    buyButton.addEventListener('click', function (event) {
      event.preventDefault();
      console.log('Button clicked for:', product.title, product.price, product.image);
      addToCart(product);
    });
    productCard.appendChild(productImage);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);
    productCard.appendChild(buyButton);
    productDisplay.appendChild(productCard);
  });
} // Function to add product to cart


function addToCart(product) {
  if (!product || !product.title || !product.price || !product.image) {
    console.error('Invalid product details:', product);
    showNotification('❌ Error: Missing product details!');
    return;
  }

  console.log('Adding to cart:', product); // Debugging

  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var existingProduct = cart.find(function (item) {
    return item.title === product.title;
  });

  if (existingProduct) {
    showNotification('⚠️ Product already in cart!');
    return;
  }

  cart.push({
    title: product.title,
    price: product.price,
    image: product.image
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification("\u2705 \"".concat(product.title, "\" added to cart!"));
} // Function to show floating notification


function showNotification(message) {
  var notification = document.getElementById('cart-notification');

  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    document.body.appendChild(notification);
  }

  notification.innerText = message;
  notification.classList.add('show');
  setTimeout(function () {
    notification.classList.remove('show');
  }, 3000);
} // Function to load cart items on cart.html


function loadCart() {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  var cartTable = document.querySelector("#cart tbody");
  if (!cartTable) return;
  cartTable.innerHTML = ""; // Clear previous cart items

  cart.forEach(function (item, index) {
    console.log("Cart item ".concat(index, ":"), item); // Debugging

    var row = document.createElement("tr");
    row.innerHTML = "\n            <td><button onclick=\"removeFromCart(".concat(index, ")\">\u274C</button></td>\n            <td><img src=\"").concat(item.image, "\" alt=\"").concat(item.title, "\" width=\"50\"></td>\n            <td>").concat(item.title || "No Title", "</td>\n            <td>NPR ").concat(item.price || "No Price", "</td>\n            <td><input type=\"number\" value=\"1\" min=\"1\" class=\"quantity\"></td>\n            <td>NPR ").concat(item.price, "</td>\n        ");
    cartTable.appendChild(row);
  });
} // Function to remove item from cart


function removeFromCart(index) {
  var cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}
/*

function showProducts(category) {
    let productDisplay = document.getElementById('productDisplay');
    productDisplay.innerHTML = ''; // Clear previous products

    let products = {
        mobiles: [
            { image: 'mobile/i1.png', title: 'Iphone 16 pro max 256GB', price: '232499.00', page: 'ip15.html' },
            { image: 'mobile/s1.png', title: 'Samusumg Galaxy S24 Ultra', price: '184999.00', page: 's24.html' },
            { image: 'mobile/mbl3.jpg', title: 'Redmi Note 14 Pro 5G', price: '39,99900', page: 'red14.html' },
            { image: 'mobile/2a.png', title: 'Nothing 2a (8/128GB)', price: '45999.00', page: 'sproduct.html' }
        ],
        watches: [
            { image: 'watch/w1.jpg', title: 'Smart Watch', price: '4,49900', page: 'dd.html' },
            { image: 'watch/w2.jpg', title: 'D13 Smart Watch', price: '3999.00', page: 'sproduct.html' },
            { image: 'watch/w3.png', title: 'Ultima Watch Circle', price: '3,977.00', page: 'ddd.html' },
            { image: 'glasses/g1.jpg', title: 'Metal Frame Cut Hexagonal', price: '1,099.00' },
            { image: 'glasses/b1.jpg', title: 'Barca Chain' , price: '9,999.00' },
            { image: 'glasses/b22.jpg', title: 'Barca Energy Diamond Chain' , price: '99,999.00' },
            { image: 'girls/ar1.jpg', title: 'Shiny Earings', price: '299.00' },
            { image: 'girls/ar2.jpg', title: '14K Gold Dangle Drop Hoop Earrings ', price: '2,999.00' },
            { image: 'girls/a3.jpg', title:'22K Gold Earrings' , price: '5,999.00' },
            { image: 'girls/ar4.jpg', title: '24K Gold Earrings' , price: '11,549.00' },
            { image: 'girls/ar5.jpg', title:'Butterfly Necklaces' , price: '7,499.00' },
            { image: 'girls/ar6.jpg', title: 'AiliFe Gold Cubic Zirconia Butterfly Necklace' , price: '2,599.00' },
            { image: 'girls/ar7.jpg', title: 'Dainty Butterfly Gold Plated ' , price: '1,549.00' },
            { image: 'girls/ar8.jpg', title:'Gold Plated Butterfly ' , price: '2,799.00' },
            { image: 'girls/ar9.jpg', title: 'Gold Plated Necklace' , price: '3,199.00' }
        ],
        womensClothes: [
           
           
            
        ],
        shoes: [
            { image: 'shoes/air1.jpg', title: 'Air Force 1', price: '4,999.00' },
            { image: 'shoes/jd4.jpg', title: 'Jordan 4 Retro', price: '7,999.00' },
            { image: 'shoes/jd3.jpg', title: 'Jordan 3', price: '8,999.00' },
            { image: 'shoes/aa1.jpg', title: 'Unisex UA SlipSpeed™', price: '3,999.00' },
            { image: 'shoes/aa2.jpg', title: 'Nike Winflo 11', price: '15,999.00' },
            { image: 'shoes/aa3.jpg', title: 'ADIDAS MUNCHEN 24', price: '11,999.00' }

        ],
        mensClothes: [
            { image: 'img/products/prod1.png', title: 'Lymio Casual Shirts', price: '1,800.00' },
            { image: 'shirts/s1.jpg', title: 'Light Blue Cotton', price: ' 3,000.00' },
            { image: 'shirts/s2.jpg', title: 'MSJUHEG Blazer Suit', price: '15,000.00' },
            { image: 'shirts/s4.jpg', title: 'Heritage Shirt Jacket', price: '4,999.00' },
            { image: 'shirts/s5.jpg', title: 'Long Sleeve Shirt', price: '2,000' },
            { image: 'shirts/s3.jpg', title: 'Thicken Cotton Jacket ', price: '19,199.00' }
        ],
        footballjersey: [
            { image: 'img/products/ars1.jpg', title: 'Arsenal Home Jersey', price: '5,599.00' },
            { image: 'img/products/barca1.png', title: 'Barca Home Jersey', price: '5,499.00',page: 'barca.html' },
            { image: 'img/products/ch1.jpg', title: 'Chelsea Home Jersey', price: '5,999.00' },
            { image: 'img/products/mc1.jpg', title: 'Manchester City Home Jersey', price: '5,499.00', page:'mc.html'},
            { image: 'img/products/rm2.jpg', title: 'Real Madrid Home Jersey', price: '4,499.00' },
            { image: 'img/products/mu.jpg', title: 'Manchester United Home Jersey', price: '4,999.00' , page:'mu.html'},

        ],
        footballcleats: [
            { image: 'cleats/NKV111.png', title: 'Nike Vapor Pro 1', price: '12,999.00' },
            { image: 'cleats/NKV2.png', title: 'Nike Vapor Edge Pro 360 2', price: '15,999.00' },
            { image: 'cleats/NKV3.png', title: 'Nike Vapor Edge Speed 360 2', price: '14,999.00' },
            { image: 'cleats/NU1.png', title: 'Nike United Mercurial Vapor 16 Elite', price: '21,999.00' },
            { image: 'cleats/AD1.jpeg', title: 'Adidas F50', price: '17,999.00' },
            { image: 'cleats/AD2.png', title: 'Predator Club Firm', price: '9,999.00' },
           
        ],
    };

    if (products[category]) {
        products[category].forEach(product => {
            let productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" onclick="openProductPage('${product.image}', '${product.title}', '${product.price}', '${product.page || '#'}')">
                <h2>${product.title}</h2>
                <p class="texx">NPR ${product.price}</p>
                <a href="#" class="buy-button" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">
                    <i class="fal fa-shopping-cart cart"></i>
                </a>
            `;

            productDisplay.appendChild(productCard);
        });

        // Add event listeners to "buy buttons"
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                let title = this.getAttribute('data-title');
                let price = this.getAttribute('data-price');
                let image = this.getAttribute('data-image');

                addToCart(title, price, image);
            });
        });
    }
}

// Function to add product to cart
function addToCart(title, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in cart
    let existingProduct = cart.find(item => item.title === title);
    if (existingProduct) {
        showNotification('⚠️ Product already in cart!');
        return;
    }

    cart.push({ title, price, image });

    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification('✅ Product added to cart!');
}

// Function to show floating notification
function showNotification(message) {
    let notification = document.getElementById('cart-notification');

    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        document.body.appendChild(notification);
    }

    notification.innerText = message;
    notification.className = 'show';

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.className = notification.className.replace('show', '');
    }, 3000);
}   



*/
// Function to open the appropriate product page when an image is clicked


function openProductPage(image, title, price, page) {
  // Store product data in sessionStorage
  sessionStorage.setItem("productImage", image);
  sessionStorage.setItem("productTitle", title);
  sessionStorage.setItem("productPrice", price); // Redirect to the appropriate page

  window.location.href = page;
} //sproduct
// Select the main image


var mainImage = document.getElementById("MainImage"); // Select all small images

var smallImages = document.querySelectorAll(".small-img"); // Loop through all small images and add click event

smallImages.forEach(function (img) {
  img.addEventListener("click", function () {
    mainImage.src = this.src; // Update main image with clicked image
  });
}); // Select all product images (for redirection)

var productImages = document.querySelectorAll(".pro img"); // Loop through all product images and add a click event for redirection

productImages.forEach(function (img, index) {
  img.addEventListener("click", function () {
    // Redirect to different pages based on the clicked product image
    switch (index) {
      case 0:
        window.location.href = "sproduct.html"; // Redirect to sproduct.html

        break;

      case 1:
        window.location.href = "dd.html"; // Redirect to dd.html

        break;

      case 2:
        window.location.href = "ddd.html"; // Redirect to ddd.html

        break;

      case 3:
        window.location.href = "default.html"; // Redirect to default.html for 4th product

        break;

      default:
        window.location.href = "default.html"; // Default page redirection

        break;
    }
  });
});