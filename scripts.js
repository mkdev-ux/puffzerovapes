// --- NAVIGATION TOGGLE ---

const toggleButton = document.querySelector('.toggle-menu');
const navLinks = document.querySelector('.nav-links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  toggleButton.classList.toggle('open');

  // Manage aria-expanded for accessibility
  const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
  toggleButton.setAttribute('aria-expanded', !expanded);
});

// Close mobile menu when clicking a nav link (optional)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      toggleButton.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
});


// --- CART FUNCTIONALITY (STORED IN LOCALSTORAGE) ---

let cart = JSON.parse(localStorage.getItem('puffzero_cart')) || [];

function saveCart() {
  localStorage.setItem('puffzero_cart', JSON.stringify(cart));
}

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
  alert(`${name} added to cart.`);
}

// Add event listeners to all Add to Cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    if (!name || isNaN(price)) {
      console.error('Product data-name or data-price missing or invalid.');
      return;
    }

    addToCart(name, price);
  });
});

// Note: Your "View Cart" button is a link to cart.html —
// You can build the cart.html page to read from localStorage and display items.


// --- SEARCH FUNCTIONALITY ---

const searchInput = document.getElementById('product-search');
const suggestionsList = document.getElementById('search-suggestions');
const productCards = document.querySelectorAll('.product-card');

const productMap = {};
productCards.forEach(card => {
  productMap[card.dataset.name] = card;
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  suggestionsList.innerHTML = '';

  if (!query) {
    suggestionsList.style.display = 'none';
    return;
  }

  const matches = Object.keys(productMap).filter(name => name.toLowerCase().includes(query));

  if (matches.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }

  matches.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    li.tabIndex = 0;
    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      searchInput.value = name;
      suggestionsList.innerHTML = '';
      suggestionsList.style.display = 'none';

      const targetCard = productMap[name];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Optional highlight
        targetCard.style.outline = '2px solid #1e88e5';
        setTimeout(() => targetCard.style.outline = 'none', 1500);
      }
    });

    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        li.click();
      }
    });

    suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = 'block';
});

// Hide suggestions when clicking outside search area
document.addEventListener('click', (e) => {
  if (!e.target.closest('#search')) {
    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';
  }
});


