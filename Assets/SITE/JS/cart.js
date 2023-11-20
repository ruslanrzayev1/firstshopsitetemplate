let savedProd = document.querySelector(".savedProd");
let db;

function renderProducts() {
	axios
		.get("https://dummyjson.com/products"+'?limit=4')
		.then((res) => {
			db = res.data.products;
			db.map((item) => {
				let miniDiv = document.createElement("div");
				miniDiv.className = "miniDiv";
				miniDiv.innerHTML = `
                <img src="${item.thumbnail}" alt="productimg"/>
                <div class="productfeature">
                    <p>$${item.price}</p>
                    <p>${item.title}</p>
                    <button onclick="addToCart(${item.id})"><i class="fa-light fa-cart-shopping" style="color: #0d6efd;"></i>Move to cart</button>
                </div>
                
            `;
            savedProd.append(miniDiv);
			});
		})
		.catch((error) => {
			console.error("API isteği başarısız oldu: ", error);
		});
}

function addToCart(productIndex) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.push(db.find((item) => item.id == productIndex));
	localStorage.setItem("cart", JSON.stringify(cart));
	displayCart();
}

let cartProdCnt = document.querySelector(".cartProdCnt")

function removeCart() {
	localStorage.removeItem("cart");
	displayCart();
}

function removeFromCart(index) {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.splice(index, 1);
	localStorage.setItem("cart", JSON.stringify(cart));
	displayCart();
}


function displayCart() {
	let cart = JSON.parse(localStorage.getItem("cart"));

	cartProdCnt.innerHTML = "";

	if (cart) {
		cart.forEach((item, index) => {
			let cartDiv = document.createElement("div");
			cartDiv.className = "cartDiv";
			cartDiv.innerHTML = `

            <div class="cartFirstDiv"><img src="${item.thumbnail}" alt="productimg"/>
            <div class="cartFirstCntx"><p class="prodNamePrice">${item.title}<span>$${item.price}</span></p>
            <p>Brand: ${item.brand}</p>
            <p>Category: ${item.category}</p>
            </div>
            </div>
            <div class="removebtnred"><button onclick="removeFromCart(${index})">Remove</button></div>
            `;

			cartProdCnt.append(cartDiv);
		});
	}
}

window.onload = () => {
	displayCart();
    renderProducts()
};

