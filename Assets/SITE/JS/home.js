let sixSecProdCnt = document.querySelector(".sixSecProdCnt");
let db;

function renderProducts() {
	axios
		.get("https://dummyjson.com/products"+'?limit=10')
		.then((res) => {
			db = res.data.products;
			db.map((item) => {
				let miniDiv = document.createElement("div");
				miniDiv.className = "miniDiv";
				miniDiv.innerHTML = `
                <img src="${item.thumbnail}" alt="productimg"/>
                <div class="productfeature">
                    <p>$${item.price}</p>
                    <button onclick="addToCart(${item.id})"><i class="fa-light fa-cart-shopping" style="color: #0d6efd;"></i>Move to cart</button>
                </div>
                <button class="wishbtn" onclick="addToWish(${item.id})"><i class="fa-regular fa-heart" style="color: #0d6efd;"></i></button>
            `;
				sixSecProdCnt.append(miniDiv);
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

function addToWish(productIndex) {
	let wish = JSON.parse(localStorage.getItem("wish")) || [];
	wish.push(db.find((item) => item.id == productIndex));
	localStorage.setItem("wish", JSON.stringify(wish));
}


window.onload = () => {
	renderProducts();
};

function redirectToResults() {
	const searchInput = document.getElementById('searchInput');
	const searchTerm = searchInput.value.trim();
  
	// Redirect to the results page with the search term as a URL parameter
	window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
  }
