import { getLocalStorage, renderListWithTemplate, setLocalStorage, updateCartIcon} from "./utils.mjs";

export default function shoppingCart() {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems)
  const outputEl = document.querySelector(".product-list");
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  const total = calculateListTotal(cartItems);
  displayCartTotal(total);

  activateCartButtons();
}

function displayCartTotal(total) {
  if (total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
    document.querySelector(".list-total").innerText = `Total: $${total}`;
  } else {
    document.querySelector(".list-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button type="button" class="cart-card__remove" data-itemid="${item.Id}">x</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity">
    <p>qty: ${item.Quantity}</p>
    <button class="cart-card__amt-btn amt-btn" data-amt="-1" data-itemid="${item.Id}">-</button>
    <button class="cart-card__amt-btn amt-btn" data-amt="1" data-itemid="${item.Id}">+</button>
  </div>

  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice * item.Quantity);
  const total = amounts.reduce((sum, item) => sum + item, 0);
  return total.toFixed(2);
}

function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter(item => item.Id != itemId)
  setLocalStorage("so-cart", cartItems)
  shoppingCart();
}

function handleRemove(event) {
  const removeEl = event.target
  removeFromCart(removeEl.dataset.itemid)
  updateCartIcon();
}

function changeCartAmout(itemId, amount) {
  let cartItems = getLocalStorage("so-cart");
  cartItems.forEach((item, index) => {
    if (item.Id === itemId) {
      item.Quantity = (item.Quantity || 0) + Number(amount);
      if (item.Quantity < 1) {
        cartItems.splice(index, 1);
      }
    }
  });
  setLocalStorage("so-cart", cartItems)
  shoppingCart();
}

function handleAmtChange(event) {
  const amoutEl = event.target
  changeCartAmout(amoutEl.dataset.itemid, amoutEl.dataset.amt)
  updateCartIcon();
}

function activateCartButtons() {
  document.querySelectorAll(".cart-card__remove").forEach(btn => btn.addEventListener("click", handleRemove))
  document.querySelectorAll(".amt-btn").forEach(btn => btn.addEventListener("click", handleAmtChange))
}