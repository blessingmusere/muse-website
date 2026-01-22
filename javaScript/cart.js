// cart.js
// Shopping cart functionality using localStorage

const CART_STORAGE_KEY = 'muse_cart';

// Cart object structure: { [productId]: { id, name, price, quantity, image } }

/**
 * Get cart from localStorage
 */
function getCart() {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    return cartJson ? JSON.parse(cartJson) : {};
}

/**
 * Save cart to localStorage
 */
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Add product to cart or increase quantity if already exists
 */
function addToCart(productId, productName, productPrice, productImage) {
    const cart = getCart();
    
    if (cart[productId]) {
        // Product already in cart, increase quantity
        cart[productId].quantity += 1;
    } else {
        // New product, add to cart
        cart[productId] = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1,
            image: productImage || ''
        };
    }
    
    saveCart(cart);
    updateCartCount();
    
    // Show feedback to user
    showCartNotification(`${productName} added to cart!`);
}

/**
 * Remove product from cart
 */
function removeFromCart(productId) {
    const cart = getCart();
    delete cart[productId];
    saveCart(cart);
    updateCartCount();
    
    // If on cart page, reload it
    if (window.location.pathname.includes('cart.html')) {
        window.location.reload();
    }
}

/**
 * Update product quantity in cart
 */
function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (cart[productId]) {
        cart[productId].quantity = parseInt(quantity);
        saveCart(cart);
        updateCartCount();
        
        // If on cart page, update total
        if (window.location.pathname.includes('cart.html')) {
            updateCartTotal();
        }
    }
}

/**
 * Get total number of items in cart
 */
function getCartItemCount() {
    const cart = getCart();
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get cart total price
 */
function getCartTotal() {
    const cart = getCart();
    return Object.values(cart).reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

/**
 * Clear entire cart
 */
function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartCount();
}

/**
 * Update cart count badge in header
 */
function updateCartCount() {
    const count = getCartItemCount();
    const cartBadge = document.getElementById('cart-count-badge');
    
    if (cartBadge) {
        if (count > 0) {
            cartBadge.textContent = count;
            cartBadge.style.display = 'inline-block';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

/**
 * Show notification when item is added to cart
 */
function showCartNotification(message) {
    // Remove existing notification if any
    const existing = document.getElementById('cart-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'cart-notification';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--accent, #25D366);
        color: #000;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Initialize cart functionality on page load
 */
function initCart() {
    // Update cart count on page load
    updateCartCount();
    
    // Add click handlers to all order buttons
    document.addEventListener('click', function(e) {
        const orderBtn = e.target.closest('.order-btn');
        if (orderBtn) {
            e.preventDefault();
            
            // Get product data from data attributes
            const productId = orderBtn.getAttribute('data-product-id');
            if (!productId) {
                console.error('Product ID not found on order button');
                return;
            }
            
            // Get product info from card
            const card = orderBtn.closest('.col-6, .col-12, .col-md-4, .col-md-6, .col-lg-3, .col-lg-4');
            const productName = card?.getAttribute('data-product-name') || 
                               card?.querySelector('.card-title')?.textContent?.trim() || 
                               'Product';
            
            // Get price from card
            const priceElement = card?.querySelector('.fw-bold');
            const priceText = priceElement?.textContent?.trim() || '0';
            const productPrice = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
            
            // Get image from card
            const productImage = card?.querySelector('img')?.getAttribute('src') || '';
            
            // Add to cart
            addToCart(productId, productName, productPrice, productImage);
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
} else {
    initCart();
}

// Add CSS animations for notification
if (!document.getElementById('cart-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'cart-notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

