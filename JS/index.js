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
    const totalTicketsInCartEl = document.querySelector(".total-tickets-in-cart");
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
        window.location.href = '../pages/index.html'; 
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


  document.addEventListener("DOMContentLoaded", function () {
    const trips = [
      {
        id: "mars-experience",
        title: "The Classic Mars Experience",
        originalPrice: 25000,
        discountedPrice: 50000,
        rating: 4.5,
        reviews: 36,
        description:
          "Embark on a Mars vacation: red deserts, ancient relics, and towering canyons await. Enjoy low-gravity hiking, rover trips to Olympus Mons, and stargazing under Phobos and Deimos. Unforgettable adventures beckon on the rust-colored landscapes of the Red Planet.",
        details: {
          sku: "SS001",
          shuttle: "The Opulence",
          tags: ["Mars", "Luxury", "Sale"],
          date: "16 June - 19 July",
        },
      },
      {
        id: "cosmic-dive",
        title: "Neptune’s Cosmic Dive",
        originalPrice: 45000,
        rating: 4.0,
        reviews: 24,
        description:
          "Embark on a voyage to Neptune aboard the 'Neptune Voyager.' Witness surreal vistas of swirling clouds and rings. Experience weightlessness and explore frigid oceans. Engage in thrilling spacewalks, observe celestial phenomena, and savor gourmet space cuisine. An unforgettable adventure awaits, blending luxury with cosmic exploration.",
        details: {
          sku: "SS405",
          shuttle: "The Voyager",
          tags: ["Neptune", "Commercial", "Gourmet Experience"],
          date: "4 April - 28 March",
        },
      },
      {
        id: "giant's-journey",
        title: "The Giant's Journey",
        originalPrice: 65000,
        rating: 4.5,
        reviews: 48,
        description:
          "Embark on a Jupiter voyage aboard the 'Jupiter Odyssey.' Witness its majestic storms and swirling atmosphere. Dive into metallic hydrogen oceans. Explore its moons, each a world unto itself. Engage in gravity surfing, comet chasing, and space excursions. Experience cosmic wonder in luxury, blending exploration with adventure.",
        details: {
          sku: "SS606",
          shuttle: "The Odyssey",
          tags: ["Jupiter", "Luxury", "Adventure"],
          date: "15 June - 30 July",
        },
      },
      {
        id: "saturn",
        title: "Ring Around Saturn",
        originalPrice: 40000,
        rating: 5.0,
        reviews: 16,
        description:
          "Embark on a thrilling voyage to Saturn aboard the 'Saturn Explorer.' Marvel at its iconic rings and turbulent storms. Explore its diverse moons, from icy Enceladus to mysterious Titan, with activities including rover expeditions and cave exploration. Experience the wonders of the cosmos amidst luxurious accommodations, where the thrill of discovery intertwines seamlessly with the excitement of adventure.",
        details: {
          sku: "SS333",
          shuttle: "The Explorer",
          tags: ["Saturn", "Luxury", "Adventure"],
          date: "4 April - 28 March",
        },
      },
      {
        id: "uranus",
        title: "Uranus Uncharted",
        originalPrice: 50000,
        rating: 4.5,
        reviews: 12,
        description:
          "Embark on a cosmic adventure to Uranus with our 'Uranus Unveiled' tour. Explore its icy atmosphere and captivating moons. Experience thrilling zero-gravity excursions, witness mesmerizing auroras, and immerse yourself in celestial photography workshops. With luxury accommodations and expert guides, discover the wonders of Uranus in a journey of a lifetime.",
        details: {
          sku: "SS735",
          shuttle: "The Endeavor",
          tags: ["Uranus", "Workshop", "Adventure"],
          date: "16 May - 19 July",
        },
      },
      {
        id: "moonlight",
        title: "Moonlight Meander",
        originalPrice: 15000,
        rating: 4.0,
        reviews: 43,
        description:
          "Experience the ultimate lunar getaway with our 'Moonlight Meander' package. Depart Earth's atmosphere aboard the 'Celestial Cruiser' for a short but unforgettable journey to the Moon. Enjoy lunar walks, breathtaking views of Earthrise, and stargazing under the moon's serene glow. Immerse yourself in luxury accommodations amidst the tranquility of space.",
        details: {
          sku: "SS451",
          shuttle: "The Voyager",
          tags: ["Moon", "Commercial", "Romantic"],
          date: "5 August - 12 August",
        },
      },
    ];
  
    // Initial render
    renderTrips(trips);
  
    // Function to render trips
    function renderTrips(trips) {
      const tripsContainer = document.getElementById("trips-container");
      tripsContainer.innerHTML = "";
  
      trips.forEach((trip) => {
        const tripHTML = `
          <section class="info-section" data-id="${trip.id}">
            <div class="container">
              <div class="image">
                <img src="assets/flight${trip.id.charAt(0).toUpperCase() + trip.id.slice(1)}.png">
              </div>
              <div class="content">
                <h3><b>${trip.title}</b></h3>
                <p class="small-text">
                  <b class="original-price">R ${trip.originalPrice.toLocaleString()}</b>
                  ${trip.discountedPrice ? `<s class="discounted-price">R ${trip.discountedPrice.toLocaleString()}</s>` : ''}
                </p>
                <div class="rating">
                  ${generateStarsHTML(trip.rating)}
                  <span class="vertical-line"></span>
                  <span class="customer-reviews">${trip.reviews} Customer Review${trip.reviews !== 1 ? 's' : ''}</span>
                </div>
                <p>${trip.description}</p>
                <div class="button-group">
                  <button class="quantity-button minus" data-id="${trip.id}">-</button>
                  <button class="quantity-display" data-id="${trip.id}">1</button> 
                  <button class="quantity-button plus" data-id="${trip.id}">+</button>
                  <button class="red-button book-now" data-id="${trip.id}"><b>Book Now</b></button>
                </div>
                <hr>
                <div class="details">
                  <p class="gray-text">SKU: ${trip.details.sku}</p>
                  <p class="gray-text">Shuttle: ${trip.details.shuttle}</p>
                  <p class="gray-text">Tags: ${trip.details.tags.join(", ")}</p>
                  <p class="gray-text">Date: ${trip.details.date}</p>
                </div>
              </div>
            </div>
          </section>
        `;
        tripsContainer.innerHTML += tripHTML;
      });
    }
  
    // Function to generate star icons based on rating
    function generateStarsHTML(rating) {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;
  
      let starsHTML = "";
      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
      }
      if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
      }
      return starsHTML;
    }
  
    
    function filterTrips() {
      const sortOption = document.getElementById("sort-options").value;
      const trips = document.querySelectorAll(".info-section");
      let visibleCount = 0;
  
      trips.forEach((trip) => {
        const price = trip.querySelector(".small-text .original-price").textContent;
        const rating = parseFloat(trip.querySelector(".rating .fa-star").textContent);
  
        
        let showTrip = true;
  
        // Filter by price
        if (sortOption === "price-asc") {
          showTrip = parseInt(price.split("R ")[1]) >= 15000;
        } else if (sortOption === "price-desc") {
          showTrip = parseInt(price.split("R ")[1]) < 50000;
        } else if (sortOption === "rating") {
          showTrip = rating >= 4;
        }
  
        
        if (showTrip) {
          trip.style.display = "flex";
          visibleCount++;
        } else {
          trip.style.display = "none";
        }
      });
  
    
      document.getElementById("result-count").textContent = `${visibleCount}`;
    }
  
    document.getElementById("filter-button").addEventListener("click", filterTrips);
    document.getElementById("sort-options").addEventListener("change", filterTrips);
  
   
    document.querySelectorAll(".quantity-button").forEach(function (button) {
        button.addEventListener("click", function () {
          const itemId = button.getAttribute("data-id");
          const displayElement = document.querySelector(`.quantity-display[data-id="${itemId}"]`);
          let currentValue = parseInt(displayElement.innerText);
    
          if (button.classList.contains("minus") && currentValue > 1) {
            currentValue--;
          } else if (button.classList.contains("plus")) {
            currentValue++;
          }
    
          displayElement.innerText = currentValue;
        });
      });
    });  