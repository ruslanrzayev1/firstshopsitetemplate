let savedProd = document.querySelector(".savedProd");
let db;

function renderProducts() {
	axios
		.get("https://dummyjson.com/products" + "?limit=4")
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
}


function removeWish() {
    localStorage.removeItem("wish");
	displayWish();
}

function removeFromWish(index) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
	wish.splice(index, 1);
	localStorage.setItem("wish", JSON.stringify(wish));
	displayWish();
}

let wishProdCnt = document.querySelector(".wishProdCnt");

function displayWish() {
	let wish = JSON.parse(localStorage.getItem("wish"));

	wishProdCnt.innerHTML = "";

	if (wish) {
		wish.forEach((item, index) => {
			let cartDiv = document.createElement("div");
			cartDiv.className = "cartDiv";
			cartDiv.innerHTML = `

            <div class="cartFirstDiv"><img src="${item.thumbnail}" alt="productimg"/>
            <div class="cartFirstCntx"><p class="prodNamePrice">${item.title}<span>$${item.price}</span></p>
            <p>Brand: ${item.brand}</p>
            <p>Category: ${item.category}</p>
            </div>
            </div>
            <div class="removebtnred"><button onclick="removeFromWish(${index})">Remove</button></div>
            `;

			wishProdCnt.append(cartDiv);
		});
	}
}

window.onload = () => {
	displayWish();
	renderProducts();
};
