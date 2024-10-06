let cartCount = 0;

function addToCart() {
    cartCount++;
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount; 
}

function addCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.cardButton');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.status}`);
        }
        const products = await response.json();
        return products.products;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('cardAddContainer');

    const imageProduct = document.createElement('img');
    imageProduct.classList.add('cardImage');
    imageProduct.src = product.thumbnail;

    const button = document.createElement('button');
    button.classList.add('cardButton');
    const iconCart = document.createElement('span');
    iconCart.classList.add('fa', 'fa-shopping-cart');
    const buttonText = document.createTextNode('Añadir')

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('cardDetails');

    const title = document.createElement('h3');
    title.classList.add('cardTitle');
    title.textContent = product.title;

    const description = document.createElement('h4');
    description.classList.add('cardDescription');
    description.textContent = `Stock: ${product.stock}`;

    const price = document.createElement('h4');
    price.classList.add('cardPrice');
    price.textContent = `Precio: ${product.price}`;
    
    cardDetails.appendChild(title);
    cardDetails.appendChild(description);
    cardDetails.appendChild(price);
    productCard.appendChild(imageProduct);
    productCard.appendChild(button);
    button.appendChild(iconCart);
    button.appendChild(buttonText);
    productCard.appendChild(cardDetails);
    
    return productCard;  
}

async function loadProducts() {
    const products = await fetchProducts();
    const productContainer = document.querySelector('.productContainer');
    productContainer.textContent = '';
    products.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
    addCartEventListeners(); 
}

async function fetchCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        if (!response.ok) {
            throw new Error(`Error al obtener categorías: ${response.status}`);
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        return [];
    }
}

async function loadCategories() {
    const categories = await fetchCategories();
    if (Array.isArray(categories) && categories.length > 0) {
        const selectContainer = document.querySelector('.selectContainer');
        selectContainer.textContent = '';

        const defaultOption = document.createElement('option');
        defaultOption.textContent = '-- Selecciona una opción --';
        defaultOption.value = '';
        selectContainer.appendChild(defaultOption);
        
        categories.forEach(category => {
            if (category.name) {
                const option = document.createElement('option');
                option.value = category.slug;
                option.textContent = category.name.charAt(0).toUpperCase() + category.name.slice(1);
                selectContainer.appendChild(option);
            } else {
                console.warn(`La categoría no tiene un nombre:`, category);
            }
        });
    }
}

function filterProductsBySearch(query, products) {
    const productContainer = document.querySelector('.productContainer');
    productContainer.textContent = '';

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
    addCartEventListeners(); // Agregar event listeners después de filtrar productos
}

async function filterProductsByCategory(selectedCategory, allProducts) {
    const productContainer = document.querySelector('.productContainer');
    productContainer.textContent = '';

    const filteredProducts = allProducts.filter(product => product.category === selectedCategory);
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
    });
    addCartEventListeners(); // Agregar event listeners después de filtrar productos
}


function showLoading(isLoading){
    const loadingElement = document.querySelector('.loadingScreen');
    if(loadingElement) {
        loadingElement.style.display = isLoading ? 'flex' : 'none';
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    
    showLoading(true);

    const products = await fetchProducts();
    loadProducts();
    loadCategories();

    const searchInput = document.querySelector('.inputContainer');
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        filterProductsBySearch(query, products);
    });

    const categorySelect = document.querySelector('.selectContainer');
    categorySelect.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory !== '-- Selecciona una opción --') {
            filterProductsByCategory(selectedCategory, products);
        } else {
            loadProducts();
        }
    });

    showLoading(false);

});
