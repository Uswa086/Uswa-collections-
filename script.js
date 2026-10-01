
const WHATSAPP = "923157540218";

const products = [
  { id: 1, name: "Floral Summer Lawn", category: "Ladies", fabric: "Lawn", quality: "Premium", price: 1850, tag: "Popular", image: "photo-1610030469983-98e550d6193c" },
  { id: 2, name: "Classic Cotton Fabric", category: "Ladies", fabric: "Cotton", quality: "Standard", price: 1450, tag: "Everyday", image: "photo-1590736969955-71cc94901144" },
  { id: 3, name: "Luxury Embroidered Lawn", category: "Ladies", fabric: "Lawn", quality: "Luxury", price: 3200, tag: "Premium", image: "photo-1583391733956-6c78276477e3" },
  { id: 4, name: "Soft Cambric Fabric", category: "Ladies", fabric: "Cambric", quality: "Premium", price: 2200, tag: "New", image: "photo-1604881988758-f76ad2f7aac1" },
  { id: 5, name: "Winter Khaddar", category: "Ladies", fabric: "Khaddar", quality: "Standard", price: 1900, tag: "Winter", image: "photo-1558618666-fcd25c85cd64" },
  { id: 6, name: "Elegant Linen Fabric", category: "Ladies", fabric: "Linen", quality: "Premium", price: 2600, tag: "Elegant", image: "photo-1523381210434-271e8be1f52b" },
  { id: 7, name: "Printed Lawn Collection", category: "Ladies", fabric: "Lawn", quality: "Standard", price: 1650, tag: "Popular", image: "photo-1617627143750-d86bc21e42bb" },
  { id: 8, name: "Premium Cotton Fabric", category: "Ladies", fabric: "Cotton", quality: "Luxury", price: 2800, tag: "Luxury", image: "photo-1598033129183-c4f50c736f10" },
  { id: 9, name: "Classic Wash & Wear", category: "Gents", fabric: "Wash & Wear", quality: "Standard", price: 2200, tag: "Essential", image: "photo-1598033129183-c4f50c736f10" },
  { id: 10, name: "Premium Gents Cotton", category: "Gents", fabric: "Cotton", quality: "Premium", price: 2500, tag: "Popular", image: "photo-1603252109303-2751441dd157" },
  { id: 11, name: "Luxury Gents Linen", category: "Gents", fabric: "Linen", quality: "Luxury", price: 3500, tag: "Luxury", image: "photo-1596755094514-f87e34085b2c" },
  { id: 12, name: "Winter Gents Khaddar", category: "Gents", fabric: "Khaddar", quality: "Premium", price: 2700, tag: "Winter", image: "photo-1617137968427-85924c800a22" },
  { id: 13, name: "Classic Formal Fabric", category: "Gents", fabric: "Wash & Wear", quality: "Premium", price: 3000, tag: "Formal", image: "photo-1618354691373-d851c5c3a990" },
  { id: 14, name: "Everyday Cotton", category: "Gents", fabric: "Cotton", quality: "Standard", price: 1750, tag: "Everyday", image: "photo-1521572163474-6864f9cf17ab" },
  { id: 15, name: "Soft Linen Blend", category: "Gents", fabric: "Linen", quality: "Premium", price: 2850, tag: "New", image: "photo-1618354691373-d851c5c3a990" },
  { id: 16, name: "Premium Summer Fabric", category: "Gents", fabric: "Cotton", quality: "Luxury", price: 3200, tag: "Premium", image: "photo-1603252109303-2751441dd157" }
];

let cart = [];

const $ = (selector) => document.querySelector(selector);
const money = (amount) => "Rs. " + amount.toLocaleString("en-PK");

function productImage(photoId) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=650&q=80`;
}

function renderProducts() {
  const search = $("#searchInput").value.trim().toLowerCase();
  const category = $("#categoryFilter").value;
  const fabric = $("#fabricFilter").value;
  const sort = $("#sortFilter").value;

  let list = products.filter(product => {
    const matchesSearch = `${product.name} ${product.fabric} ${product.quality}`.toLowerCase().includes(search);
    return matchesSearch &&
      (category === "All" || product.category === category) &&
      (fabric === "All" || product.fabric === fabric);
  });

  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  $("#productGrid").innerHTML = list.length ? list.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img src="${productImage(product.image)}" alt="${product.name}" loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/500x650/f0e7da/351321?text=Fabric+Photo'">
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category} · ${product.fabric}</span>
        <h3>${product.name}</h3>
        <p class="product-detail">${product.quality} Quality · Unstitched</p>
        <div class="product-price">${money(product.price)} <small>/ sample price</small></div>
        <div class="product-actions">
          <button class="add-btn" data-add="${product.id}">Add to Bag +</button>
          <button class="buy-btn" data-buy="${product.id}">Order Now ↗</button>
        </div>
      </div>
    </article>
  `).join("") : `<div class="empty-state">No fabrics found. Try another search or filter.</div>`;
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = money(total);

  $("#cartItems").innerHTML = cart.length ? cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return "";
    return `
      <div class="cart-row">
        <img src="${productImage(product.image)}" alt="${product.name}"
          onerror="this.onerror=null;this.src='https://placehold.co/150x180/f0e7da/351321?text=Fabric'">
        <div>
          <h3>${product.name}</h3>
          <p>${product.fabric} · ${product.quality}</p>
          <p>${money(product.price)} each</p>
        </div>
        <div class="qty-control">
          <button data-qty="${product.id}" data-change="-1" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button data-qty="${product.id}" data-change="1" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-btn" data-remove="${product.id}">Remove</button>
      </div>`;
  }).join("") : `<div class="empty-state">Your shopping bag is empty. Explore our fabrics to add your favourites.</div>`;
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  renderCart();
}

function orderOnWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function buyNow(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const message = [
    "Assalam-o-Alaikum Uswa's Collection!",
    "I am interested in this fabric:",
    `Product: ${product.name}`,
    `Category: ${product.category}`,
    `Fabric: ${product.fabric}`,
    `Quality: ${product.quality}`,
    `Listed sample price: ${money(product.price)}`,
    "Please confirm availability, final price and delivery details."
  ].join("\n");

  orderOnWhatsApp(message);
}

$("#productGrid").addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const buyButton = event.target.closest("[data-buy]");

  if (addButton) {
    addToCart(Number(addButton.dataset.add));
    addButton.textContent = "Added ✓";
    setTimeout(() => { addButton.textContent = "Add to Bag +"; }, 1000);
  }

  if (buyButton) buyNow(Number(buyButton.dataset.buy));
});

$("#cartItems").addEventListener("click", event => {
  const qtyButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");

  if (qtyButton) {
    const id = Number(qtyButton.dataset.qty);
    const change = Number(qtyButton.dataset.change);
    const item = cart.find(entry => entry.id === id);
    if (item) item.qty += change;
    cart = cart.filter(entry => entry.qty > 0);
    renderCart();
  }

  if (removeButton) {
    const id = Number(removeButton.dataset.remove);
    cart = cart.filter(item => item.id !== id);
    renderCart();
  }
});

$("#clearCart").addEventListener("click", () => {
  cart = [];
  renderCart();
});

["searchInput", "categoryFilter", "fabricFilter", "sortFilter"].forEach(id => {
  const element = document.getElementById(id);
  element.addEventListener("input", renderProducts);
  element.addEventListener("change", renderProducts);
});

document.querySelectorAll("[data-jump]").forEach(link => {
  link.addEventListener("click", () => {
    $("#categoryFilter").value = link.dataset.jump;
    renderProducts();
  });
});

$("#orderForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) {
    alert("Your shopping bag is empty. Please add a fabric before checkout.");
    location.hash = "shop";
    return;
  }

  const formData = new FormData(event.currentTarget);
  const customer = Object.fromEntries(formData.entries());

  const orderLines = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return `${product.name} (${product.fabric}, ${product.quality}) × ${item.qty} = ${money(product.price * item.qty)}`;
  });

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.qty;
  }, 0);

  const message = [
    "Assalam-o-Alaikum Uswa's Collection!",
    "I would like to place an order:",
    "",
    "CUSTOMER DETAILS",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email || "Not provided"}`,
    `City: ${customer.city}`,
    `Address: ${customer.address}`,
    `Payment preference: ${customer.payment}`,
    "",
    "ORDER ITEMS",
    ...orderLines,
    "",
    `PRODUCT TOTAL: ${money(total)}`,
    "Please confirm availability, delivery charges and final total.",
    "I understand these are unstitched fabrics."
  ].join("\n");

  orderOnWhatsApp(message);
});

$("#menuToggle").addEventListener("click", () => {
  const nav = $("#nav");
  nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded", nav.classList.contains("open"));
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => $("#nav").classList.remove("open"));
});

$("#year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
                                 
