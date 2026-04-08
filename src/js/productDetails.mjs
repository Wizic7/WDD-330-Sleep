import { findProductById } from "./externalServices.mjs";
import { render404, setLocalStorage, getLocalStorage, updateCartIcon } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  if (product == undefined) { 
    render404(document.querySelector(".product-detail"))
    return
  }
  product.Quantity = 1;
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }

  let isDuplicate = false
  cartContents.find((item) => {
    if (item.Id == product.Id) { 
      item.Quantity += 1
      isDuplicate = true;
    } 
  })
  
  
  if (!isDuplicate) {
      cartContents.push(product);
  }
  setLocalStorage("so-cart", cartContents);

  updateCartIcon();
  const cartIcon = document.querySelector(".cart")
  cartIcon.classList.add('shake')
  cartIcon.addEventListener('animationend', () => cartIcon.classList.remove('shake'))
  
}
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = "$" + product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
