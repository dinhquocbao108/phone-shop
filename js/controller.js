var getCartId = document.getElementById('cart');
function openCart() {
	$('#myModal').modal('show');
	getCartId.style.width = '30%';
}

function closeCart() {
	getCartId.style.width = '0';
	setTimeout(() => {
		$('#myModal').modal('hide');
	}, 500);
}

// Loading
function turnOnLoading() {
	document.getElementById('modal-loader').style.display = 'flex';
}

function turnOffLoading() {
	document.getElementById('modal-loader').style.display = 'none';
}

// Render products
function renderProducts(data, id) {
	id.innerHTML = '';
	data.forEach((product) => {
		return (id.innerHTML += `
	    <div class="item" data-key=${product.id}>
	        <div class="img">
	            <img src=${product.img} alt="">
	        </div>
	        <div class="content">
	            <div class="title">
	                ${product.name}
	            </div>
	            <div class="desc">
	                ${product.desc}

	            </div>

	            <div class="camera">
	                <div>Màn hình: ${product.screen}</div>
	                <div>Camera sau: ${product.backCamera}</div>
	                <div>Camera trước: ${product.frontCamera}</div>
	            </div>

	            <div class="price">
	            Giá: <p>${product.price}$</p>
	            </div>

	            <div class="units">
					<div class="btn minus" onclick="changeQuantity('minus', ${product.id})">-</div>
					<div class="number">${product.quantity}</div>
					<div class="btn plus" onclick="changeQuantity('plus', ${product.id})" >+</div>
				</div>

	            <span class="types">Thể loại: <p>${product.type}</p></span>
	            <button onclick="addToCart(${product.id})" class="add">Thêm vào giỏ hàng</button>
	            <button onclick='removeItemFromCart(${product.id})' class="remove">
	                <i class="fa-solid fa-trash"></i>
	            </button>

	        </div>
	    </div>
	    `);
	});
}

function renderSubtotal() {
	let totalPrice = 0;
	totalItems = 0;

	cart.forEach((item) => {
		totalPrice += item.price * item.quantity;
		totalItems += item.quantity;
	});

	subTotal.innerHTML = `Tổng (${totalItems} sản phẩm): $${totalPrice.toFixed(
		2
	)}`;
	countCart.innerHTML = totalItems;
}

function updateCart() {
	renderProducts(cart, listCart);
	renderSubtotal();
	localStorage.setItem('CART', JSON.stringify(cart));
}

function removeItemFromCart(id) {
	cart = cart.filter((item) => {
		return item.id != id;
	});
	renderProducts(cart, listCart);
	updateCart();
}

function clearCart() {
	cart = [];
	renderProducts(cart, listCart);
	renderSubtotal();
	localStorage.setItem('CART', JSON.stringify(cart));
}
