document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeModal = document.querySelector('.close');
    const viewCartButton = document.querySelector('.view-cart-button');
    const continueShoppingButton = document.getElementById('continue-shopping');
    const checkoutButton = document.getElementById('checkout');
    const bookNowButtons = document.querySelectorAll('.book-now');
    const quantityButtons = document.querySelectorAll('.quantity-button1, .quantity-button2, .quantity-button3, .quantity-button4, .quantity-button5, .quantity-button6');
    let cart = [];

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div> <span>${item.name}</span></div>
                <div>
                    <img src="${item.image}" width="150"; text-align: "center;">
                   
                </div>
                <div>
                    <button class="quantity-button minus" data-id="${item.id}">-</button>
                    <button class="quantity-display">${item.quantity}</button>
                    <button class="quantity-button plus" data-id="${item.id}">+</button>
                </div>
                <div> <button class="remove-item" data-id="${item.id}">Remove</button> </div>
                <div>
                    <span>R ${item.price.toFixed(2)}</span>
                    
                </div>
            `;
            cartItems.appendChild(listItem);
            total += item.price * item.quantity;
    
            // Update quantity display in flight items on the flights page
            const flightItem = document.querySelector(`.info-section[data-id="${item.id}"], .info-section2[data-id="${item.id}"], .info-section3[data-id="${item.id}"], .info-section4[data-id="${item.id}"], .info-section5[data-id="${item.id}"], .info-section6[data-id="${item.id}"]`);
            if (flightItem) {
                flightItem.querySelector('.quantity-display1, .quantity-display2, .quantity-display3, .quantity-display4, .quantity-display5, .quantity-display6').textContent = item.quantity;
            }
        });
        cartTotal.textContent = `Total: R ${total.toFixed(2)}`;
    }
    
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push(item);
        }
        updateCart();
    }

    function adjustQuantity(flightItem, delta) {
        const display = flightItem.querySelector('.quantity-display1, .quantity-display2, .quantity-display3, .quantity-display4, .quantity-display5, .quantity-display6');
        let quantity = parseInt(display.textContent);
        quantity = Math.max(1, quantity + delta);
        display.textContent = quantity;
    }

    function addOrUpdateCartItem(id, name, price, image, delta) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity = Math.max(1, existingItem.quantity + delta);
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }
        updateCart();
    
        // Update quantity display in flight item on the flights page
        const flightItem = document.querySelector(`.info-section[data-id="${id}"], .info-section2[data-id="${id}"], .info-section3[data-id="${id}"], .info-section4[data-id="${id}"], .info-section5[data-id="${id}"], .info-section6[data-id="${id}"]`);
        if (flightItem) {
            flightItem.querySelector('.quantity-display1, .quantity-display2, .quantity-display3, .quantity-display4, .quantity-display5, .quantity-display6').textContent = existingItem ? existingItem.quantity : 1;
        }
    }

    quantityButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const flightItem = event.target.closest('.info-section, .info-section2, .info-section3, .info-section4, .info-section5, .info-section6');
            const delta = event.target.classList.contains('plus') ? 1 : -1;
            adjustQuantity(flightItem, delta);

            const id = flightItem.dataset.id;
            const name = flightItem.querySelector('h3').textContent;
            const price = parseFloat(flightItem.querySelector('p').textContent.replace('R ', '').replace(',', ''));
            const image = flightItem.querySelector('img').src;
            addOrUpdateCartItem(id, name, price, image, delta);
        });
    });

    bookNowButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const flightItem = event.target.closest('.info-section, .info-section2, .info-section3, .info-section4, .info-section5, .info-section6');
            const id = flightItem.dataset.id;
            const name = flightItem.querySelector('h3').textContent;
            const price = parseFloat(flightItem.querySelector('p').textContent.replace('R ', '').replace(',', ''));
            const image = flightItem.querySelector('img').src;
            addOrUpdateCartItem(id, name, price, image, 0);  // Ensures at least one ticket is added
            cartModal.style.display = 'block';
        });
    });

    viewCartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCart();
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    continueShoppingButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    checkoutButton.addEventListener('click', () => {
        window.location.href = 'homepage.html'; 
    });

    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const id = event.target.dataset.id;
            cart = cart.filter(item => item.id !== id);
            updateCart();
        } else if (event.target.classList.contains('quantity-button')) {
            const id = event.target.dataset.id;
            const delta = event.target.classList.contains('plus') ? 1 : -1;
            addOrUpdateCartItem(id, null, null, null, delta);
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#contactForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        // You can add AJAX submission here if needed

        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();

        // Reset the form after submission (optional)
        form.reset();
    });
});


  document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    let currentSlide = 0;

    // Show the first slide initially
    slides[currentSlide].classList.add('active');

    // Function to hide all slides
    function hideAllSlides() {
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
    }

    // Function to show the current slide
    function showSlide() {
      hideAllSlides();
      slides[currentSlide].classList.add('active');
    }

    // Next button click event
    next.addEventListener('click', function () {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide();
    });

    // Previous button click event
    prev.addEventListener('click', function () {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide();
    });
  });


