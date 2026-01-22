// javaScript/trending.js
// Tracks "order/add" clicks (shop + index) and renders Trending products on index.
// Requires: products.js defining window.MUSE_PRODUCTS = [{id,name,description,price,image,whatsapp}, ...].

const STORAGE_KEY = "muse_product_clicks";
let trackingInitialized = false;

function getClicks() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function setClicks(clicks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clicks));
}

function incrementClick(productId) {
    const clicks = getClicks();
    clicks[productId] = (clicks[productId] || 0) + 1;
    setClicks(clicks);
}

// ---------- SHOP + INDEX: Track clicks (run once) ----------
function initShopTracking() {
    if (trackingInitialized) return;
    trackingInitialized = true;

    document.querySelectorAll(".order-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.productId;
            if (id) incrementClick(id);
        });
    });
}

// ---------- INDEX: Card HTML ----------
function productCardHTML(p) {
    const priceText = `$${Number(p.price).toFixed(2)}`;

    return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="card h-100 border-0 shadow-sm product-card-modern">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-muted small">${p.description}</p>
          <div class="fw-bold mb-3">${priceText}</div>
          <a href="${p.whatsapp}"
             class="btn btn-primary mt-auto w-100 order-btn"
             data-product-id="${p.id}">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  `;
}

// ---------- INDEX: Render trending (dedupes by id) ----------
function renderTrending({ containerId = "trendingProducts", limit = 4 } = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const products = window.MUSE_PRODUCTS || [];
    const clicks = getClicks();

    // Deduplicate by product id (prevents showing same product twice)
    const uniqueProducts = Array.from(
        new Map(products.map((p) => [p.id, p])).values()
    );

    // Sort by most clicked (descending). If no clicks, original order remains.
    const sorted = [...uniqueProducts].sort(
        (a, b) => (clicks[b.id] || 0) - (clicks[a.id] || 0)
    );

    const picked = sorted.slice(0, limit);

    // Replace contents (prevents duplicates across re-renders)
    container.innerHTML = picked.map(productCardHTML).join("");

    // The trending cards include .order-btn buttons too, so attach tracking once.
    // But trackingInitialized guard prevents double-binding.
    initShopTracking();
}

// ---------- Auto-init ----------
document.addEventListener("DOMContentLoaded", () => {
    // If this page contains a trending container, render it
    if (document.getElementById("trendingProducts")) {
        renderTrending({ containerId: "trendingProducts", limit: 4 });
    }

    // If this page contains order buttons (shop page), enable click tracking
    if (document.querySelector(".order-btn")) {
        initShopTracking();
    }
});