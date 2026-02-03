## MUSE Website

Premium tech and clothing essentials storefront built with plain HTML, CSS, and JavaScript. It includes a landing page, tech shop, clothing shop, localStorage-backed cart, and WhatsApp checkout handoff.

### What's inside
- **Landing page (`muse.html`)** with hero CTA buttons and a "Trending" section that updates based on user click activity.
- **Tech shop (`shopTech.html`)** listing top-selling items with Add to Cart buttons.
- **Clothing shop** – `shopp.html` and **`Cloths/shopClothing.html`** (shoes, etc.) with `Cloths/ClothingStyle.css`.
- **Cart** – root `cart.html` and **`Cloths/cart.html`**; both show items, quantity controls, totals, and WhatsApp checkout link.
- **Shared cart badge** in the header that reflects cart quantity across pages.
- **Product source of truth (`javaScript/products.js`)** consumed by trending logic.
- **Click tracking (`javaScript/trending.js`)** stores per-product click counts in localStorage to sort trending items.
- **Cart logic (`javaScript/cart.js`)** handles add/remove/update, totals, badges, and toast notifications via localStorage.
- **Styling** – `style.css` (dark theme, responsive, Bootstrap 5.3.3); `Cloths/ClothingStyle.css` for clothing pages.

### Tech stack
- HTML5 + CSS3 (custom styles + Bootstrap 5.3.3)
- Vanilla JavaScript (no build step)
- LocalStorage for cart state and trending click counts

### Getting started (local)
1. Clone the repo:  
   `git clone https://github.com/blessingmusere/muse-website.git`
2. Checkout the branch:  
   `cd muse-website && git checkout Ronaldo`
3. Open `muse.html` in your browser (or use a static server like VS Code "Live Server").

### Key files
- `muse.html` – landing with hero and trending grid.
- `shopTech.html` – tech product listing (Add to Cart uses `.order-btn` + `data-product-id`).
- `shopp.html` – clothing shop; `Cloths/shopClothing.html` – shoes/clothing grid.
- `cart.html` – main cart; `Cloths/cart.html` – clothing cart.
- `about.html` – about page.
- `javaScript/products.js` – array of `{ id, name, description, price, image, whatsapp }`.
- `javaScript/trending.js` – click tracking + trending rendering on `muse.html`.
- `javaScript/cart.js` – cart storage, badge updates, notifications.
- `style.css` – global theme, layout, responsive; `Cloths/ClothingStyle.css` – clothing styles.

### How cart & trending work
- **Cart**: stored in `localStorage` under `muse_cart`; add/update/remove operations update the badge and persist between pages. Cart page recalculates totals and builds a WhatsApp URL containing line items and total.
- **Trending**: click counts saved in `localStorage` under `muse_product_clicks`; items are sorted by clicks and rendered (limited to 4) on the landing page. Deduping prevents duplicate cards.

### Adding products
1. Add an entry in `javaScript/products.js` with `id`, `name`, `description`, `price`, `image`, and `whatsapp` link.
2. Add a card in `shopTech.html` (or `Cloths/shopClothing.html`) with matching `data-product-id` (and optional `data-product-name`), `.order-btn`, and price text for correct parsing.
3. Place the product image in `images/` (or `Cloths/images/` for clothing) and reference it.

### Notes
- No build tools required; it's a static site.
- Update WhatsApp numbers/links as needed in `products.js` and `cart.html` checkout button.
