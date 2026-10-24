/* ============================================================
   LUXESTORE — app.js
   Handles: product listing, filtering, cart (localStorage),
            toast notifications, checkout modal
   ============================================================ */

// ===== DATA =====
const PRODUCTS = [
  { id: 1,  name: "Classic White Tee",        category: "tops",        price: 299000,  emoji: "👕", tag: "Bestseller" },
  { id: 2,  name: "Linen Casual Shirt",        category: "tops",        price: 450000,  emoji: "👔", tag: "New" },
  { id: 3,  name: "Cropped Knit Top",          category: "tops",        price: 380000,  emoji: "🧶", tag: null },
  { id: 4,  name: "Slim Chino Pants",          category: "bottoms",     price: 520000,  emoji: "👖", tag: "New" },
  { id: 5,  name: "Wide Leg Trousers",         category: "bottoms",     price: 590000,  emoji: "🩱", tag: null },
  { id: 6,  name: "Cargo Shorts",             category: "bottoms",     price: 340000,  emoji: "🩳", tag: null },
  { id: 7,  name: "Leather Belt",             category: "accessories", price: 220000,  emoji: "🪢", tag: null },
  { id: 8,  name: "Canvas Tote Bag",          category: "accessories", price: 185000,  emoji: "👜", tag: "Bestseller" },
  { id: 9,  name: "Minimal Watch",            category: "accessories", price: 850000,  emoji: "⌚", tag: "Premium" },
  { id: 10, name: "Woven Sneakers",           category: "accessories", price: 720000,  emoji: "👟", tag: "New" },
];

// ===== UTILITY =====
const formatRupiah = (n) =>
  "Rp " + n.toLocaleString("id-ID");

// ===== CART =====
const getCart = () => JSON.parse(localStorage.getItem("luxe_cart") || "[]");
const saveCart = (cart) => localStorage.setItem("luxe_cart", JSON.stringify(cart));

const getCartCount = () => getCart().reduce((s, i) => s + i.qty, 0);

function updateCartBadge() {
  const el = document.getElementById("cartCount");
  if (el) {
    const count = getCartCount();
    el.textContent = count;
    el.style.transform = "scale(1.4)";
    setTimeout(() => el.style.transform = "scale(1)", 280);
  }
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`"${product.name}" added to cart! 🛒`);
}

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// ===== PRODUCT GRID (index.html) =====
function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const filtered = filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = "";

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img">
        ${p.emoji}
        ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <span class="product-price">${formatRupiah(p.price)}</span>
          <button class="add-btn" data-id="${p.id}" title="Add to cart">+</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach events
  grid.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(Number(btn.dataset.id));
    });
  });
}

function initCategoryFilter() {
  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts(btn.dataset.filter);
    });
  });
}

// ===== CART PAGE (cart.html) =====
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartLayout = document.querySelector(".cart-layout");
  if (!cartItems) return;

  const cart = getCart();

  if (cart.length === 0) {
    if (cartLayout) cartLayout.style.display = "none";
    if (emptyCart) emptyCart.style.display = "block";
    return;
  }

  if (cartLayout) cartLayout.style.display = "grid";
  if (emptyCart) emptyCart.style.display = "none";

  cartItems.innerHTML = "";

  cart.forEach(item => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.category}</div>
        <div class="qty-controls">
          <button class="qty-btn" data-id="${item.id}" data-action="dec">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-action="inc">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">${formatRupiah(item.price * item.qty)}</span>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartItems.appendChild(el);
  });

  // Qty controls
  cartItems.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;
      const cart = getCart();
      const item = cart.find(i => i.id === id);
      if (!item) return;
      if (action === "inc") item.qty += 1;
      if (action === "dec") {
        item.qty -= 1;
        if (item.qty <= 0) {
          const idx = cart.indexOf(item);
          cart.splice(idx, 1);
        }
      }
      saveCart(cart);
      renderCart();
      updateCartBadge();
      updateSummary();
    });
  });

  // Remove buttons
  cartItems.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      let cart = getCart();
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
      renderCart();
      updateCartBadge();
      updateSummary();
    });
  });

  updateSummary();
}

function updateSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 25000 : 0;
  const total = subtotal + shipping;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("subtotal", formatRupiah(subtotal));
  set("shipping", shipping > 0 ? formatRupiah(shipping) : "Free");
  set("total", formatRupiah(total));
}

// ===== CHECKOUT MODAL =====
function initCheckout() {
  const checkoutBtn = document.getElementById("checkoutBtn");
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");

  if (!checkoutBtn || !overlay) return;

  checkoutBtn.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) return;
    overlay.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
    localStorage.removeItem("luxe_cart");
    window.location.href = "index.html";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("show");
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  // index.html
  if (document.getElementById("productGrid")) {
    renderProducts();
    initCategoryFilter();
  }

  // cart.html
  if (document.getElementById("cartItems")) {
    renderCart();
    initCheckout();
  }
});
