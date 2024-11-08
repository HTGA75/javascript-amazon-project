import { orders, getOrder } from "../data/order.js";
import { products, getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function trackOrder() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    const order = getOrder(orderId);
    console.log(order);
    await loadProductsFetch();
    const product = getProduct(productId);
    let productDeliveryTime = '';
    let productQuantity = 0;
    order.products.forEach((element) => {
        if (element.productId === productId) {
            productDeliveryTime = element.estimatedDeliveryTime;
            productQuantity = element.quantity;
        }
    })
    console.log(productDeliveryTime);
    console.log(productQuantity);
    console.log(product);

    let html = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${dayjs(productDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${product.name}
        </div>

        <div class="product-info">
            Quantity: ${productQuantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
            <div class="progress-label">
            Preparing
            </div>
            <div class="progress-label current-status">
            Shipped
            </div>
            <div class="progress-label">
            Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
    </div>`;

    document.querySelector('.js-main').innerHTML = html;
}

trackOrder();