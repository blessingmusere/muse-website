## MUSE Website

Premium tech essentials storefront built with plain HTML, CSS, and JavaScript. It includes a landing page, product listing, localStorage-backed cart, and WhatsApp checkout handoff.

### What’s inside
- **Landing page (`index.html`)** with hero CTA buttons and a “Trending” section that updates based on user click activity.
- **Shop page (`shopTech.html`)** listing top-selling items with Add to Cart buttons.
- **Cart page (`cart.html`)** showing items, quantity controls, totals, and a WhatsApp checkout link that pre-fills the order message.
- **Shared cart badge** in the header that reflects cart quantity across pages.
- **Product source of truth (`javaScript/products.js`)** consumed by trending logic.
- **Click tracking (`javaScript/trending.js`)** stores per-product click counts in localStorage to sort trending items.
- **Cart logic (`javaScript/cart.js`)** handles add/remove/update, totals, badges, and toast notifications via localStorage.
- **Styling (`style.css`)** with a dark theme, responsive layout, and Bootstrap 5.3.3 for grid/components.

### Tech stack
- HTML5 + CSS3 (custom styles + Bootstrap 5.3.3)
- Vanilla JavaScript (no build step)
- LocalStorage for cart state and trending click counts

### Getting started (local)
1. Clone the repo:  
   `git clone https://github.com/blessingmusere/muse-website.git`
2. Checkout the branch:  
   `cd muse-website && git checkout Ronaldo`
3. Open `index.html` in your browser (or use a static server like VS Code “Live Server”).

### Key files
- `index.html` – landing with hero and trending grid.
- `shopTech.html` – main product listing (Add to Cart buttons use `.order-btn` + `data-product-id`).
- `cart.html` – cart display, totals, quantity controls, WhatsApp checkout.
- `javaScript/products.js` – array of `{ id, name, description, price, image, whatsapp }`.
- `javaScript/trending.js` – click tracking + trending rendering on `index.html`.
- `javaScript/cart.js` – cart storage, badge updates, notifications.
- `style.css` – global theme, layout, responsive tweaks.

### How cart & trending work
- **Cart**: stored in `localStorage` under `muse_cart`; add/update/remove operations update the badge and persist between pages. Cart page recalculates totals and builds a WhatsApp URL containing line items and total.
- **Trending**: click counts saved in `localStorage` under `muse_product_clicks`; items are sorted by clicks and rendered (limited to 4) on the landing page. Deduping prevents duplicate cards.

### Adding products
1. Add an entry in `javaScript/products.js` with `id`, `name`, `description`, `price`, `image`, and `whatsapp` link.
2. Add a card in `shopTech.html` with matching `data-product-id` (and optional `data-product-name`), `.order-btn`, and price text for correct parsing.
3. Place the product image in `images/` and reference it.

### Notes
- No build tools required; it’s a static site.
- Update WhatsApp numbers/links as needed in `products.js` and `cart.html` checkout button.
