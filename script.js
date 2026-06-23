const template=document.getElementById("product-template");
const productsContainer=document.getElementById("products");
const searchBar = document.getElementById("search");
const sortBtn = document.getElementById("sortBtn");
let products = [];
async function fetchproduct(){

  try{

    let response = await fetch("https://dummyjson.com/products");

    let data = await response.json();

    products = data.products;   // store products

    displayProducts(products);  // call display function

  }
  catch(error){

    console.log(error);

  }
}
function showProductDetails(id) {
  window.open(`details.html?id=${id}`, "_blank");
}
fetchproduct();


/*single product*/
 async function loadSingleProduct() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
          document.getElementById('loading-text').innerText = "No product ID specified.";
          return;
        }

        let response = await fetch(`https://dummyjson.com/products/${productId}`);
        let product = await response.json();

        document.title = `${product.title} - Details`;
        document.getElementById('product-img').src = product.images[0] || product.thumbnail;
        document.getElementById('product-img').alt = product.title;
        document.getElementById('product-category').innerText = product.category;
        document.getElementById('product-title').innerText = product.title;
        document.getElementById('product-rating').innerText = `★ ${product.rating} / 5`;
        document.getElementById('product-price').innerText = `$${product.price}`;
        document.getElementById('product-desc').innerText = product.description;

        document.getElementById('loading-text').style.display = 'none';
        document.getElementById('detail-container').style.display = 'flex';

      } catch (error) {
        console.error("Error displaying product view:", error);
        document.getElementById('loading-text').innerText = "Failed to load product details.";
      }
    }

    loadSingleProduct();

function displayProducts(productList){


  productsContainer.innerHTML = "";


  productList.forEach((product)=>{


    const clone = template.content.cloneNode(true);


    const card = clone.querySelector(".product-card");


    card.setAttribute("data-id", product.id);



    clone.querySelector(".title").innerHTML = product.title;

    clone.querySelector(".image").src = product.thumbnail;

    clone.querySelector(".price").innerHTML = product.price;



    card.addEventListener("click", ()=>{

      showProductDetails(product.id);

    });



    productsContainer.appendChild(clone);



  });


}

searchBar.addEventListener("input", async ()=>{

    let value = searchBar.value.trim();


    if(value === ""){

    displayProducts(products);
    return;

}


    try{

        let response = await fetch(
            `https://dummyjson.com/products/search?q=${value}`
        );


        let data = await response.json();


        console.log(data); // check search result


        displayProducts(data.products);


    }
    catch(error){

        console.log(error);

    }

});
async function sortProducts(){

  try{

    let response = await fetch(
      "https://dummyjson.com/products?sortBy=title&order=asc"
    );

    let data = await response.json();

    displayProducts(data.products);

  }
  catch(error){

    console.log(error);

  }

}



sortBtn.addEventListener("click", ()=>{

    sortProducts();

});
