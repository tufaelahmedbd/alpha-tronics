//-----------Elements
const productWrapper = document.querySelector(".products-wrapper");
const addedProductsWrapper = document.querySelector(".added-products");
const cartModal = document.querySelector(".cart-modal");
const cartCloseBtn = document.querySelector(".cart-close");
//-----Fetching all products from local json file
function getProducts() {
    fetch("http://localhost:5000/products").then((res)=>{
        if (!res.ok) throw new Error("Somthing went wrong");
        return res.json();
    }).then((data)=>renderProducts(data)).catch((err)=>renderError(err.message));
}
getProducts();
//--------Currency formatter for price
function currencyFormatted(price) {
    return price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}
//Render all products
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
      <h3>${product.title}</h3>
      <p class="text-2xl text-rose-500 font-semibold">
        ${currencyFormatted(product.price)}<span class="text-gray-600 text-sm">${product.review} reviews</span>
      </p>
      <button data-id="${product.id}"
        class="add-to-cart-btn bg-sky-500 text-sky-50 p-2 px-5 rounded shadow-sky-200 font-semibold hover:bg-rose-500 hover:shadow-rose-200 hover:rose-50 duration-300 self-start mt-3"
      >
        Add to cart
      </button>
    </div>
  </div>`;
        productWrapper.insertAdjacentHTML("afterbegin", html);
    });
    //-------------add to cart event
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    addToCartBtns.forEach((btn)=>{
        btn.addEventListener("click", function(e) {
            const id = e.target.dataset.id;
            //----calling another fetch func
            getSingleProductData(id);
            // cart open
            cartModal.classList.remove("hidden");
        });
    });
}
function getSingleProductData(id) {
    fetch(`http://localhost:5000/products/${id}`).then((res)=>res.json()).then((data)=>renderSingleProduct(data));
}
function renderSingleProduct(product) {
    const html = `
            <div
              class="added-product grid grid-cols-4 border-b pb-2 justify-center gap-2 overflow-hidden items-center"
            >
              <div
                class="img overflow-hidden w-20 rounded flex justify-center items-center"
              >
                <img
                  src="${product.image}"
                  alt="${product.title}"
                  class="block w-full rounded"
                />
              </div>

              <div class="texts flex flex-col gap-2 col-span-2">
                <h4 class="font-semibold">${product.title}</h4>
                <div class="flex justify-between items-center">
                  <p class="price font-bold text-rose-500">${currencyFormatted(product.price)}</p>
                  <p
                    class="font-semibold text-xl overflow-hidden flex items-center bg-sky-100 gap-3"
                  >
                    <span
                      class="bg-sky-500 text-sky-50 px-2 cursor-pointer active:bg-gray-700"
                      >-</span
                    ><span>1</span
                    ><span
                      class="bg-sky-500 text-sky-50 px-2 cursor-pointer active:bg-gray-700"
                      >+</span
                    >
                  </p>
                </div>
              </div>
              <button class="remove-item hover:text-rose-500 justify-self-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
  `;
    addedProductsWrapper.insertAdjacentHTML("beforeend", html);
}
//Error message
function renderError(err) {
    productWrapper.innerHTML = "";
    const html = `
  <p>${err}</p>`;
    productWrapper.insertAdjacentHTML("afterbegin", html);
}
//cart close event
cartCloseBtn.addEventListener("click", function() {
    cartModal.classList.add("hidden");
});

//# sourceMappingURL=index.816e7b21.js.map
