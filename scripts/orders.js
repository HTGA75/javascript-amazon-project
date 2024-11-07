import { orders, addOrder } from "../data/order.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProduct, loadProductsFetch, products } from "../data/products.js";

export async function createOrderGrid() {
    let html = '';
    await loadProductsFetch();
    orders.forEach((element) => {
        let productDetailsHtml = '';
        element.products.forEach((product) => {
          console.log(product);
          console.log(product.productId);
          const currentProduct = getProduct(product.productId);
          console.log(currentProduct);
          productDetailsHtml += `
          <div class="product-image-container">
              <img src="${currentProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${currentProduct.name}
              </div>
              <div class="product-delivery-date">
                ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=123&prductId=145">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
        })

        html += `<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(element.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${element.totalCostCents / 100}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${element.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productDetailsHtml}
          </div>
        </div>`;
    });

    document.querySelector('.js-orders-grid').innerHTML = html;
}

createOrderGrid();