const productWrapper = document.querySelector(".products-wrapper");
function getProducts() {
    fetch("http://localhost:5000/products").then((res)=>{
        if (!res.ok) throw new Error("Somthing went wrong");
        return res.json();
    }).then((data)=>renderProducts(data)).catch((err)=>renderError(err.message));
}
getProducts();
function currencyFormatted(price) {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}
function renderProducts(products) {
    products.forEach((product)=>{
        const html = `<div
    class="product overflow-hidden w-96 h-auto bg-white/75 backdrop-blur-lg rounded-xl shadow-lg shadow-gray-200"
  >
    <div
      class="product-img h-75 overflow-hidden flex justify-center items-center"
    >
      <img
        src=${product.image}
        alt=${product.title}
        class="w-full block"
      />
    </div>
    <div class="product-texts p-5 flex flex-col gap-1">
      <p
        class="text-sm uppercase font-bold tracking-widest text-sky-500"
      >
        ${product.category}
      </p>
      <h3>Refurbished Apple Watch</h3>
      <p class="text-2xl text-rose-500 font-semibold">
         ${currencyFormatted(product.price)}<span class="text-gray-600 text-sm">${product.review} reviews</span>
      </p>
      <button
        class="bg-sky-500 text-sky-50 p-2 px-5 rounded shadow-sky-200 font-semibold hover:bg-rose-500 hover:shadow-rose-200 hover:rose-50 duration-300 self-start mt-3"
      >
        Add to cart
      </button>
    </div>
  </div>`;
        productWrapper.insertAdjacentHTML("afterbegin", html);
    });
}

//# sourceMappingURL=index.816e7b21.js.map
