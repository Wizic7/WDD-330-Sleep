import { getOrders } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function orderCardTemplate(order) {
  return `<tr>
  <td>${order.fname + " " + order.lname}</td><td>${order.orderDate}</td><td>${order.orderTotal}</td>
  </tr>`;
}

export default async function loadTableOrders(selector) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const orders = await getOrders();
  // render out the product list to the element
  renderListWithTemplate(orderCardTemplate, el, orders);
}
