/* ==========================================================================
   ATELIER LUXE — Flagship E-Commerce Application Logic (app.js)
   Features:
   - 12 Curated Luxury Products with Photography, Sizes, Colors, & Ratings
   - Real-time Search, Category Filtering, Wishlist Filtering, & Multi-Sorting
   - Interactive Quick-View Modal with Size Selection
   - Slide-over Mini Cart Drawer + Free Shipping Progress Meter
   - Full Checkout Page with Promo Codes (LUXE20 / WELCOME10), Shipping Tiers,
     and Printable/Detailed Order Invoice Receipt Modal
   ========================================================================== */

const FREE_SHIPPING_THRESHOLD = 1000000;

const PRODUCTS = [
  {
    id: 1,
    name: "Milanese Double-Breasted Wool Blazer",
    category: "outerwear",
    price: 1850000,
    oldPrice: 2190000,
    rating: 4.9,
    reviews: 128,
    badge: "Bestseller",
    badgeType: "dark",
    colors: ["#1a1a1a", "#6e6259", "#d8cfc4"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    desc: "Blazer berpotongan arsitektural dari 100% Virgin Wool Italia. Dilengkapi struktur bahu lembut, kancing tanduk alami, dan lapisan dalam sutra cupro yang sejuk."
  },
  {
    id: 2,
    name: "Pure Mongolian Cashmere Crewneck",
    category: "tops",
    price: 1290000,
    oldPrice: null,
    rating: 5.0,
    reviews: 94,
    badge: "Capsule",
    badgeType: "gold",
    colors: ["#e8e1d5", "#2b2b2b", "#8c7a6b"],
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    desc: "Rajutan 12-gauge dari serat kasmir Grade-A Mongolia Dalam. Sangat ringan, hangat, dan semakin lembut setiap kali dikenakan."
  },
  {
    id: 3,
    name: "Pleated Wide-Leg Tailored Trousers",
    category: "trousers",
    price: 890000,
    oldPrice: 1050000,
    rating: 4.9,
    reviews: 215,
    badge: "Sale -15%",
    badgeType: "sale",
    colors: ["#1f1f1f", "#d2c8b8", "#4f584e"],
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    desc: "Celana panjang high-waist dengan detail lipit ganda di bagian depan. Memberikan siluet jenjang yang jatuh sempurna untuk tampilan formal maupun kasual."
  },
  {
    id: 4,
    name: "Florentine Calfskin Architectural Tote",
    category: "accessories",
    price: 2450000,
    oldPrice: null,
    rating: 5.0,
    reviews: 67,
    badge: "Artisanal",
    badgeType: "gold",
    colors: ["#141414", "#6b4423"],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    desc: "Dibuat tangan di Florence menggunakan kulit anak sapi samak nabati full-grain. Muat laptop 15 inci dengan kompartemen ritsleting berlapis suede."
  },
  {
    id: 5,
    name: "Belgian Linen Relaxed Atelier Shirt",
    category: "tops",
    price: 640000,
    oldPrice: null,
    rating: 4.8,
    reviews: 183,
    badge: "Essential",
    badgeType: "dark",
    colors: ["#ffffff", "#dcd5c9", "#9db0bd"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    desc: "Kemeja santai dari linen Flax Belgia bersertifikasi OEKO-TEX. Memiliki sirkulasi udara optimal untuk iklim tropis dengan kancing mutiara asli."
  },
  {
    id: 6,
    name: "Oversized Gabardine Trench Coat",
    category: "outerwear",
    price: 2690000,
    oldPrice: 2990000,
    rating: 4.9,
    reviews: 52,
    badge: "Limited",
    badgeType: "gold",
    colors: ["#cbbba0", "#181818"],
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    desc: "Mantel trench klasik tahan percikan air dengan detail storm flap, ikat pinggang gesper kulit, dan potongan raglan yang elegan."
  },
  {
    id: 7,
    name: "Sculpted Merino Ribbed Cardigan",
    category: "tops",
    price: 980000,
    oldPrice: null,
    rating: 4.8,
    reviews: 76,
    badge: null,
    badgeType: null,
    colors: ["#222222", "#f2efe9"],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    desc: "Cardigan rajut merino ekstra halus dengan siluet pas badan yang anggun. Dapat dikenakan sendiri sebagai atasan maupun sebagai outer layer."
  },
  {
    id: 8,
    name: "Minimalist Acetate Sunglasses",
    category: "accessories",
    price: 750000,
    oldPrice: 890000,
    rating: 4.7,
    reviews: 112,
    badge: "New",
    badgeType: "dark",
    colors: ["#111111", "#5c3c24"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    desc: "Bingkai Mazzucchelli cellulose acetate buatan tangan dengan lensa nilon CR-39 berproteksi 100% UV400 dan engsel titanium."
  },
  {
    id: 9,
    name: "Raw Japanese Selvedge Denim",
    category: "trousers",
    price: 1150000,
    oldPrice: null,
    rating: 4.9,
    reviews: 141,
    badge: "Kurabo Mill",
    badgeType: "dark",
    colors: ["#1c2838", "#121212"],
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    desc: "Denim 13.5oz tenunan alat tenun antik Okayama, Jepang. Potongan straight-leg modern yang akan membentuk patina unik seiring pemakaian."
  },
  {
    id: 10,
    name: "Tuscany Cropped Suede Jacket",
    category: "outerwear",
    price: 3150000,
    oldPrice: null,
    rating: 5.0,
    reviews: 39,
    badge: "Archive",
    badgeType: "gold",
    colors: ["#8a6240", "#2b2623"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    desc: "Jaket suede lembut berpotongan boxy dengan ritsleting dua arah Riri Swiss dan saku minimalis tersembunyi."
  },
  {
    id: 11,
    name: "Chronograph Brushed Steel Watch",
    category: "accessories",
    price: 2100000,
    oldPrice: 2400000,
    rating: 4.9,
    reviews: 88,
    badge: "Sapphire",
    badgeType: "dark",
    colors: ["#d9d9d9", "#111111"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    desc: "Jam tangan minimalis 38mm dengan kaca kristal safir anti-gores, mesin kuarsa presisi Jepang, dan tali kulit calfskin Prancis."
  },
  {
    id: 12,
    name: "Silk-Blend Relaxed Lounge Trousers",
    category: "trousers",
    price: 920000,
    oldPrice: null,
    rating: 4.8,
    reviews: 64,
    badge: "New",
    badgeType: "dark",
    colors: ["#e5dfd3", "#181818"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    desc: "Perpaduan sutra mulberry dan Tencel yang sangat halus di kulit, dengan pinggang elastis tersembunyi untuk kemewahan tanpa usaha."
  }
];

const PROMO_CODES = {
  LUXE20: { rate: 0.20, label: "Diskon 20% (LUXE20)" },
  WELCOME10: { rate: 0.10, label: "Diskon 10% (WELCOME10)" }
};

// ===== STATE =====
let activeCategory = "all";
let searchQuery = "";
let activeSort = "featured";
let activeQuickViewProduct = null;
let selectedQuickViewSize = "M";
let appliedPromo = null;

// ===== HELPERS =====
const formatIDR = (num) => "Rp " + Math.round(num).toLocaleString("id-ID");

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem("atelier_luxe_cart") || "[]");
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem("atelier_luxe_cart", JSON.stringify(cart));
  updateAllCartUI();
};

const getWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("atelier_luxe_wishlist") || "[]");
  } catch {
    return [];
  }
};

const saveWishlist = (list) => {
  localStorage.setItem("atelier_luxe_wishlist", JSON.stringify(list));
  updateWishlistBadge();
};

// ===== TOAST NOTIFICATION =====
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✦</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

// ===== WISHLIST LOGIC =====
function toggleWishlist(productId) {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  const product = PRODUCTS.find((p) => p.id === productId);
  if (idx > -1) {
    list.splice(idx, 1);
    showToast(`${product ? product.name : "Item"} dihapus dari Wishlist`);
  } else {
    list.push(productId);
    showToast(`♥ ${product ? product.name : "Item"} disimpan ke Wishlist`);
  }
  saveWishlist(list);
  renderCatalog();
}

function updateWishlistBadge() {
  const badge = document.getElementById("wishlistCount");
  if (badge) {
    badge.textContent = getWishlist().length;
  }
}

// ===== CART LOGIC =====
function addToCart(productId, size = "M", openDrawerAfter = true) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const key = `${productId}_${size}`;
  const existing = cart.find((item) => item.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      size,
      qty: 1
    });
  }

  saveCart(cart);
  showToast(`Ditambahkan: ${product.name} (Size ${size})`);
  if (openDrawerAfter && document.getElementById("cartDrawer")) {
    openCartDrawer();
  }
}

function changeCartQty(key, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.key === key);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    const idx = cart.indexOf(item);
    cart.splice(idx, 1);
  }
  saveCart(cart);
}

function removeCartItem(key) {
  const cart = getCart().filter((i) => i.key !== key);
  saveCart(cart);
  showToast("Item dihapus dari keranjang");
}

function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartTotalQty() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// ===== UPDATE ALL CART UI (BADGE, DRAWER, CART PAGE) =====
function updateAllCartUI() {
  const countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.textContent = getCartTotalQty();
    countEl.style.transform = "scale(1.25)";
    setTimeout(() => (countEl.style.transform = "scale(1)"), 220);
  }

  renderCartDrawer();
  renderCartPage();
}

// ===== SHIPPING PROGRESS HELPER =====
function updateShippingMeter(textElId, fillElId) {
  const textEl = document.getElementById(textElId);
  const fillEl = document.getElementById(fillElId);
  if (!textEl || !fillEl) return;

  const subtotal = getCartSubtotal();
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  fillEl.style.width = `${pct}%`;

  if (subtotal === 0) {
    textEl.innerHTML = `Belanja <strong>${formatIDR(FREE_SHIPPING_THRESHOLD)}</strong> untuk mendapatkan <strong>Free Express Shipping</strong>`;
  } else if (subtotal < FREE_SHIPPING_THRESHOLD) {
    const diff = FREE_SHIPPING_THRESHOLD - subtotal;
    textEl.innerHTML = `Tambah <strong>${formatIDR(diff)}</strong> lagi untuk klaim <strong>Free Express Shipping!</strong>`;
  } else {
    textEl.innerHTML = `✦ Selamat! Pesanan Anda mendapatkan <strong>Complimentary Express Shipping</strong>`;
  }
}

// ===== SLIDE-OVER DRAWER (index.html) =====
function openCartDrawer() {
  document.getElementById("drawerBackdrop")?.classList.add("open");
  document.getElementById("cartDrawer")?.classList.add("open");
}

function closeCartDrawer() {
  document.getElementById("drawerBackdrop")?.classList.remove("open");
  document.getElementById("cartDrawer")?.classList.remove("open");
}

function renderCartDrawer() {
  const container = document.getElementById("drawerItems");
  const subtotalEl = document.getElementById("drawerSubtotal");
  if (!container || !subtotalEl) return;

  updateShippingMeter("shippingMeterText", "shippingMeterFill");

  const cart = getCart();
  subtotalEl.textContent = formatIDR(getCartSubtotal());

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:64px 16px; color:var(--text-muted);">
        <div style="font-size:2.4rem; margin-bottom:10px;">🛍️</div>
        <p style="font-weight:600; color:var(--text-primary); margin-bottom:4px;">Tas Belanja Kosong</p>
        <p style="font-size:0.8rem;">Pilih produk favorit Anda dari katalog untuk mulai berbelanja.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
      <div class="drawer-item">
        <img src="${item.image}" alt="${item.name}" />
        <div>
          <div class="drawer-item-title">${item.name}</div>
          <div class="drawer-item-meta">Size: ${item.size} • ${formatIDR(item.price)}</div>
          <div class="drawer-qty">
            <button data-key="${item.key}" data-delta="-1">−</button>
            <span>${item.qty}</span>
            <button data-key="${item.key}" data-delta="1">+</button>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.86rem; font-weight:700; margin-bottom:8px;">
            ${formatIDR(item.price * item.qty)}
          </div>
          <button class="btn-remove-item" data-remove="${item.key}">Hapus</button>
        </div>
      </div>
    `
    )
    .join("");

  container.querySelectorAll("[data-delta]").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeCartQty(btn.dataset.key, Number(btn.dataset.delta));
    });
  });

  container.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCartItem(btn.dataset.remove);
    });
  });
}

// ===== CATALOG RENDERING (index.html) =====
function renderCatalog() {
  const grid = document.getElementById("productGrid");
  const countEl = document.getElementById("resultsCount");
  if (!grid) return;

  const wishlist = getWishlist();

  let filtered = PRODUCTS.filter((p) => {
    if (activeCategory === "wishlist") {
      if (!wishlist.includes(p.id)) return false;
    } else if (activeCategory !== "all" && p.category !== activeCategory) {
      return false;
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (activeSort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (countEl) {
    countEl.textContent = `Menampilkan ${filtered.length} dari ${PRODUCTS.length} koleksi`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:64px 20px; background:var(--bg-secondary); border:1px solid var(--border); border-radius:var(--radius-md);">
        <h3 style="font-family:var(--font-serif); font-size:1.75rem; margin-bottom:8px;">Tidak Ada Produk Ditemukan</h3>
        <p style="color:var(--text-muted); font-size:0.88rem; margin-bottom:20px;">Coba kata kunci lain atau tampilkan semua kategori.</p>
        <button class="btn btn-outline" id="resetFilterBtn">Reset Filter</button>
      </div>
    `;
    document.getElementById("resetFilterBtn")?.addEventListener("click", () => {
      activeCategory = "all";
      searchQuery = "";
      const sInput = document.getElementById("searchInput");
      if (sInput) sInput.value = "";
      document.querySelectorAll(".cat-tab").forEach((t) => t.classList.toggle("active", t.dataset.category === "all"));
      renderCatalog();
    });
    return;
  }

  grid.innerHTML = filtered
    .map((p) => {
      const isWished = wishlist.includes(p.id);
      const badgeClass = p.badgeType === "gold" ? "gold" : p.badgeType === "sale" ? "sale" : "";
      return `
        <article class="product-card">
          <div class="product-media" data-quickview="${p.id}">
            <img src="${p.image}" alt="${p.name}" loading="lazy" />
            <div class="product-badges">
              ${p.badge ? `<span class="tag-badge ${badgeClass}">${p.badge}</span>` : ""}
            </div>
            <button class="wishlist-btn ${isWished ? "active" : ""}" data-wishlist="${p.id}" title="Simpan ke Wishlist">
              ${isWished ? "♥" : "♡"}
            </button>
            <div class="quick-actions-overlay">
              <button class="btn-quick-add" data-add="${p.id}">+ Quick Add (M)</button>
              <button class="btn-quick-view" data-quickview="${p.id}">Detail</button>
            </div>
          </div>

          <div class="product-body">
            <div class="product-meta-top">
              <span class="product-category">${p.category}</span>
              <span class="product-rating"><span class="star">★</span> ${p.rating.toFixed(1)} (${p.reviews})</span>
            </div>

            <h3 class="product-title" data-quickview="${p.id}">${p.name}</h3>

            <div class="product-Colors">
              ${p.colors.map((c) => `<span class="color-dot" style="background:${c};"></span>`).join("")}
            </div>

            <div class="product-footer">
              <div class="price-wrap">
                <span class="product-price">${formatIDR(p.price)}</span>
                ${p.oldPrice ? `<span class="product-old-price">${formatIDR(p.oldPrice)}</span>` : ""}
              </div>
              <span class="stock-label">● In Stock</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  // Events
  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(Number(btn.dataset.add), "M", true);
    });
  });

  grid.querySelectorAll("[data-wishlist]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWishlist(Number(btn.dataset.wishlist));
    });
  });

  grid.querySelectorAll("[data-quickview]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-add]") || e.target.closest("[data-wishlist]")) return;
      openQuickView(Number(el.dataset.quickview));
    });
  });
}

// ===== QUICK VIEW MODAL =====
function openQuickView(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  activeQuickViewProduct = product;
  selectedQuickViewSize = "M";

  document.getElementById("qvImage").src = product.image;
  document.getElementById("qvImage").alt = product.name;
  document.getElementById("qvCategory").textContent = product.category;
  document.getElementById("qvTitle").textContent = product.name;
  document.getElementById("qvPrice").textContent = formatIDR(product.price);
  document.getElementById("qvRating").innerHTML = `<span class="star">★</span> ${product.rating.toFixed(1)} (${product.reviews} ulasan)`;
  document.getElementById("qvDesc").textContent = product.desc;

  document.querySelectorAll("#qvSizes .size-pill").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.size === "M");
  });

  document.getElementById("quickViewBackdrop")?.classList.add("open");
}

function closeQuickView() {
  document.getElementById("quickViewBackdrop")?.classList.remove("open");
}

// ===== CART & CHECKOUT PAGE (cart.html) =====
function renderCartPage() {
  const container = document.getElementById("cartItemsContainer");
  const activeLayout = document.getElementById("cartActiveLayout");
  const emptyState = document.getElementById("emptyCartState");
  const clearBtn = document.getElementById("clearCartBtn");
  if (!container) return;

  updateShippingMeter("cartShippingText", "cartShippingFill");

  const cart = getCart();
  if (cart.length === 0) {
    if (activeLayout) activeLayout.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    if (clearBtn) clearBtn.style.display = "none";
    return;
  }

  if (activeLayout) activeLayout.style.display = "grid";
  if (emptyState) emptyState.style.display = "none";
  if (clearBtn) clearBtn.style.display = "inline-flex";

  container.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-row">
        <img class="cart-row-img" src="${item.image}" alt="${item.name}" />
        <div>
          <div class="product-category">${item.category}</div>
          <div class="cart-row-title">${item.name}</div>
          <div class="cart-row-variant">Ukuran: <strong>${item.size}</strong> • Harga Satuan: ${formatIDR(item.price)}</div>
          <div class="cart-row-controls">
            <div class="qty-stepper">
              <button type="button" data-key="${item.key}" data-delta="-1">−</button>
              <span>${item.qty}</span>
              <button type="button" data-key="${item.key}" data-delta="1">+</button>
            </div>
            <button type="button" class="btn-remove-item" data-remove="${item.key}">Hapus</button>
          </div>
        </div>
        <div style="text-align:right; font-size:1.05rem; font-weight:700;">
          ${formatIDR(item.price * item.qty)}
        </div>
      </div>
    `
    )
    .join("");

  container.querySelectorAll("[data-delta]").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeCartQty(btn.dataset.key, Number(btn.dataset.delta));
    });
  });

  container.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCartItem(btn.dataset.remove);
    });
  });

  updateCheckoutTotals();
}

function updateCheckoutTotals() {
  const subtotalEl = document.getElementById("summarySubtotal");
  if (!subtotalEl) return;

  const subtotal = getCartSubtotal();
  const shippingSelect = document.getElementById("shippingSelect");
  const shippingTier = shippingSelect ? shippingSelect.value : "regular";

  let shippingCost = 25000;
  if (shippingTier === "express") shippingCost = 55000;
  if (shippingTier === "sameday") shippingCost = 85000;

  // Complimentary express shipping if threshold met
  if (subtotal >= FREE_SHIPPING_THRESHOLD && (shippingTier === "regular" || shippingTier === "express")) {
    shippingCost = 0;
  }

  let discountAmount = 0;
  const discountRow = document.getElementById("summaryDiscountRow");
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    discountAmount = Math.round(subtotal * PROMO_CODES[appliedPromo].rate);
    if (discountRow) {
      discountRow.style.display = "flex";
      document.getElementById("summaryDiscountLabel").textContent = PROMO_CODES[appliedPromo].label;
      document.getElementById("summaryDiscount").textContent = "-" + formatIDR(discountAmount);
    }
  } else if (discountRow) {
    discountRow.style.display = "none";
  }

  const grandTotal = Math.max(0, subtotal - discountAmount) + (subtotal > 0 ? shippingCost : 0);

  subtotalEl.textContent = formatIDR(subtotal);
  document.getElementById("summaryShipping").textContent =
    shippingCost === 0 ? "FREE (Complimentary)" : formatIDR(shippingCost);
  document.getElementById("summaryTotal").textContent = formatIDR(grandTotal);
}

// ===== INITIALIZE EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
  // Sticky navbar shadow on scroll
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 12);
  });

  updateWishlistBadge();
  updateAllCartUI();

  // --- Homepage Catalog Events ---
  if (document.getElementById("productGrid")) {
    renderCatalog();

    document.querySelectorAll("#categoryTabs .cat-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll("#categoryTabs .cat-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeCategory = tab.dataset.category;
        renderCatalog();
      });
    });

    document.getElementById("wishlistFilterBtn")?.addEventListener("click", () => {
      activeCategory = "wishlist";
      document.querySelectorAll("#categoryTabs .cat-tab").forEach((t) => {
        t.classList.toggle("active", t.dataset.category === "wishlist");
      });
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
      renderCatalog();
    });

    document.getElementById("searchInput")?.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderCatalog();
    });

    document.getElementById("sortSelect")?.addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderCatalog();
    });
  }

  // --- Drawer Events ---
  document.getElementById("openDrawerBtn")?.addEventListener("click", openCartDrawer);
  document.getElementById("closeDrawerBtn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("continueShoppingBtn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("drawerBackdrop")?.addEventListener("click", closeCartDrawer);

  // --- Quick View Modal Events ---
  document.getElementById("closeQuickViewBtn")?.addEventListener("click", closeQuickView);
  document.getElementById("quickViewBackdrop")?.addEventListener("click", (e) => {
    if (e.target.id === "quickViewBackdrop") closeQuickView();
  });

  document.querySelectorAll("#qvSizes .size-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#qvSizes .size-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      selectedQuickViewSize = pill.dataset.size;
    });
  });

  document.getElementById("qvAddToCartBtn")?.addEventListener("click", () => {
    if (activeQuickViewProduct) {
      addToCart(activeQuickViewProduct.id, selectedQuickViewSize, true);
      closeQuickView();
    }
  });

  // --- Newsletter ---
  document.getElementById("newsletterForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    e.target.reset();
    showToast("Terima kasih! Anda telah terdaftar di Private List Atelier Luxe.");
  });

  // --- Cart & Checkout Page Events ---
  document.getElementById("clearCartBtn")?.addEventListener("click", () => {
    saveCart([]);
    showToast("Keranjang belanja telah dikosongkan");
  });

  document.getElementById("shippingSelect")?.addEventListener("change", updateCheckoutTotals);

  document.getElementById("applyPromoBtn")?.addEventListener("click", () => {
    const input = document.getElementById("promoInput");
    const feedback = document.getElementById("promoFeedback");
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      appliedPromo = code;
      if (feedback) {
        feedback.style.color = "var(--success)";
        feedback.innerHTML = `✓ Kode promo <strong>${code}</strong> berhasil diterapkan!`;
      }
      showToast(`Promo ${code} aktif!`);
      updateCheckoutTotals();
    } else {
      appliedPromo = null;
      if (feedback) {
        feedback.style.color = "var(--danger)";
        feedback.innerHTML = `Kode tidak valid. Gunakan <strong>LUXE20</strong> atau <strong>WELCOME10</strong>`;
      }
      updateCheckoutTotals();
    }
  });

  document.getElementById("checkoutForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = getCart();
    if (cart.length === 0) return;

    const name = document.getElementById("customerName").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const payment = document.getElementById("paymentSelect").value;
    const totalText = document.getElementById("summaryTotal").textContent;
    const orderId = "ATX-" + Math.floor(100000 + Math.random() * 900000);

    const receiptDetails = document.getElementById("receiptDetails");
    if (receiptDetails) {
      receiptDetails.innerHTML = `
        <div class="receipt-row"><span>Nomor Invoice</span><strong>#${orderId}</strong></div>
        <div class="receipt-row"><span>Penerima</span><strong>${name}</strong></div>
        <div class="receipt-row"><span>Tujuan</span><span>${address}</span></div>
        <div class="receipt-row"><span>Pembayaran</span><strong>${payment}</strong></div>
        <div class="receipt-row"><span>Jumlah Item</span><span>${getCartTotalQty()} pcs</span></div>
        <div style="border-top:1px solid var(--border-strong); margin:10px 0; padding-top:10px;" class="receipt-row">
          <span>Total Dibayar</span><strong style="font-size:1rem;">${totalText}</strong>
        </div>
      `;
    }

    document.getElementById("receiptModalBackdrop")?.classList.add("open");
  });

  document.getElementById("finishOrderBtn")?.addEventListener("click", () => {
    localStorage.removeItem("atelier_luxe_cart");
    window.location.href = "index.html";
  });
});
