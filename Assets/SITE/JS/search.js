let threeSecCnt = document.querySelector(".threeSecCnt")

let db
document.addEventListener('DOMContentLoaded', function () {  
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm = searchParams.get('search');
  
    axios.get('https://dummyjson.com/products')
      .then(res => {
        db = res.data.products
        const filteredItems = db.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
        filteredItems.forEach(item => {
          let searchDiv = document.createElement('div');
          searchDiv.className = "searchDiv"
          searchDiv.innerHTML = `
          <img src="${item.thumbnail}" alt="">
          <div>
          <p>${item.title}<button class="wishbtn" onclick="addToWish(${item.id})"><i class="fa-regular fa-heart" style="color: #0d6efd;"></i></button></p>
          <h2>${item.price}</h2>
          <span>${item.description}</span>
          </div>
          `
        threeSecCnt.append(searchDiv)
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });

  function addToWish(productIndex) {
	let wish = JSON.parse(localStorage.getItem("wish")) || [];
	wish.push(db.find((item) => item.id == productIndex));
	localStorage.setItem("wish", JSON.stringify(wish));
}