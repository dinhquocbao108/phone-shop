/* app.js */
const productsItem = document.getElementById('product');
const listCart = document.getElementById('list-cart');
const subTotal = document.getElementById('subtotal');
const countCart = document.querySelector('.count__cart');

let BASE__URL = 'https://635f4b14ca0fe3c21a991c87.mockapi.io';

let products = [];

axios({
	url: `${BASE__URL}/CapstoneAPI`,
	method: 'GET',
})
	.then((res) => {
		res.data.forEach((item) => {
			products.push(item);
		});

		renderProducts(products, productsItem);
	})
	.catch((err) => {
		console.log('err', err);
	});

// Cart array
let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();

function addToCart(id) {
	if (cart.some((item) => item.id == id)) {
		changeQuantity('plus', id);
		return;
	} else {
		let item = products.find((product) => {
			return product.id == id;
		});

		cart.push({ ...item, quantity: 1 });
	}

	updateCart();
}

// Filter products
function filterProduct(product) {
	var value = product.value;

	if (value === '') {
		document.getElementById('title-product').innerHTML = `Tất cả sản phẩm`;
		renderProducts(products, productsItem);
	} else if (value === 'Iphone') {
		document.getElementById('title-product').innerHTML = `Iphone`;
		let iphone = products.filter((product) => {
			return product.type == 'Iphone';
		});

		renderProducts(iphone, productsItem);
	} else if (value === 'Samsung') {
		document.getElementById('title-product').innerHTML = `Samsung`;
		let samsung = products.filter((product) => {
			return product.type == 'Samsung';
		});

		renderProducts(samsung, productsItem);
	}
}

// Change number of units for the item
function changeQuantity(action, id) {
	cart = cart.map((item) => {
		let quantity = item.quantity;

		if (item.id == id) {
			if (action == 'minus' && quantity > 1) {
				quantity--;
			}
			if (action == 'plus') {
				quantity++;
			}
		}

		return { ...item, quantity: quantity };
	});

	updateCart();
}
