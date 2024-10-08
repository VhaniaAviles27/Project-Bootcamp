"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Declaro la variable cartCount de tipo number e inicializo el valor con 0
// cartCount almacena la cantidad de productos del carrito (solo cantidad según el número de clicks dado)
let cartCount = 0;
// Defino una función updateCartCount
const updateCartCount = () => {
    // Busco el elemento con el id cart-count
    const cartCountElement = document.getElementById('cart-count');
    // Si encuentra el elemento actualiza su contenido con el valor cartCount
    if (cartCountElement) {
        // Actualiza y convierte a cadena toString()
        cartCountElement.textContent = cartCount.toString();
    }
};
// Defino una función addToCart
const addToCart = () => {
    // Incremento en uno y luego llamo a updateCartCount
    cartCount++;
    updateCartCount();
};
// Defino un listener que escuche cada vez que hago click en el botón .cardButton
const addCartEventListeners = () => {
    const addToCartButtons = document.querySelectorAll('.cardButton');
    addToCartButtons.forEach(button => {
        // Por cada click aumenta el contador
        button.addEventListener('click', addToCart);
    });
};
// Defino una función fetchProducts que realiza una solicitud fetch a la API para obtener los productos
const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://dummyjson.com/products');
        if (!response.ok) {
            // respuesta no exitosa
            throw new Error(`Error al obtener productos: ${response.status}`);
        }
        const data = yield response.json();
        // respuesta exitosa
        return data.products;
    }
    catch (error) {
        // error
        console.error('Error al obtener los productos:', error);
        return [];
    }
});
// Creo dinámicamente la tarjeta de los productos en el DOM
const createProductCard = (product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('cardAddContainer');
    const imageProduct = document.createElement('img');
    imageProduct.classList.add('cardImage');
    imageProduct.src = product.thumbnail;
    const button = document.createElement('button');
    button.classList.add('cardButton');
    const iconCart = document.createElement('span');
    iconCart.classList.add('fa', 'fa-shopping-cart');
    const buttonText = document.createTextNode('Añadir');
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
    // Imprimo los datos
    cardDetails.appendChild(title);
    cardDetails.appendChild(description);
    cardDetails.appendChild(price);
    productCard.appendChild(imageProduct);
    productCard.appendChild(button);
    button.appendChild(iconCart);
    button.appendChild(buttonText);
    productCard.appendChild(cardDetails);
    return productCard;
};
// Obtengo los productos de la API y los renderizo en el contenedor .productContainer
const loadProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield fetchProducts();
    const productContainer = document.querySelector('.productContainer');
    if (productContainer) {
        productContainer.textContent = '';
        products.forEach(product => {
            // Creo y agrego una tarjeta de producto usando createProductCard
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
    }
    // Añade el listener creado anteriormente para añadir el producto al carrito
    addCartEventListeners();
});
// Defino una función fetchCategories que realiza una solicitud fetch a la API para obtener las categorías
const fetchCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://dummyjson.com/products/categories');
        if (!response.ok) {
            throw new Error(`Error al obtener categorías: ${response.status}`);
        }
        const categories = yield response.json();
        return categories;
    }
    catch (error) {
        console.error('Error al obtener las categorías:', error);
        return [];
    }
});
// Creo dinámicamente el contenedor para seleccionar mi categoría respectiva
const loadCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield fetchCategories();
    if (Array.isArray(categories) && categories.length > 0) {
        const selectContainer = document.querySelector('.selectContainer');
        if (selectContainer) {
            selectContainer.textContent = '';
            const defaultOption = document.createElement('option');
            defaultOption.textContent = '-- Selecciona una opción --';
            defaultOption.value = '';
            selectContainer.appendChild(defaultOption);
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.slug;
                option.textContent = category.name.charAt(0).toUpperCase() + category.name.slice(1);
                selectContainer.appendChild(option);
            });
        }
    }
    else {
        console.error('No categories found or invalid data format');
    }
});
// Defino mi función para la búsqueda de mis productos
const filterProductsBySearch = (query, products) => {
    const productContainer = document.querySelector('.productContainer');
    if (productContainer) {
        productContainer.textContent = '';
        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
    }
    addCartEventListeners();
};
// Defino mi función para el filtrado de mis categorías según la opción seleccionada
const filterProductsByCategory = (selectedCategory, allProducts) => {
    const productContainer = document.querySelector('.productContainer');
    if (productContainer) {
        productContainer.textContent = '';
        const filteredProducts = allProducts.filter(product => product.category === selectedCategory);
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
    }
    addCartEventListeners();
};
// Defino una función con mi pantalla de carga durante la renderización de mis datos
const showLoading = (isLoading) => {
    const loadingElement = document.querySelector('.loadingScreen');
    if (loadingElement) {
        console.log(`Loading screen display: ${isLoading ? 'flex' : 'none'}`);
        loadingElement.style.display = isLoading ? 'flex' : 'none';
    }
    else {
        console.error('Loading screen element not found.');
    }
};
// Inicialización del DOM
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    // Mostrar la pantalla de carga
    showLoading(true);
    // Imprime en consola para definir que la pantalla de carga a inicializado
    console.log('Loading started');
    // Carga de productos y categorías
    try {
        const products = yield fetchProducts();
        yield loadProducts();
        yield loadCategories();
        // Manejo del campo de búsqueda
        const searchInput = document.querySelector('.inputContainer');
        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                const target = event.target;
                const query = target.value;
                filterProductsBySearch(query, products);
            });
        }
        // Manejo del campo de selección de categoría
        const categorySelect = document.querySelector('.selectContainer');
        if (categorySelect) {
            categorySelect.addEventListener('change', (event) => {
                const target = event.target;
                const selectedCategory = target.value;
                if (selectedCategory !== '-- Selecciona una opción --') {
                    filterProductsByCategory(selectedCategory, products);
                }
                else {
                    loadProducts();
                }
            });
        }
    }
    catch (error) {
        console.error('Error loading products or categories:', error);
    }
    console.log('Loading finished');
    // Ocultar la pantalla de carga
    showLoading(false);
}));
