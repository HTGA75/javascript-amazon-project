import { orders, getOrder } from "../data/order.js";
import { products, getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function trackOrder() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    const order = getOrder(orderId);
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
    const today = dayjs();
    console.log(today);
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDeliveryTime);
    console.log(orderTime);
    console.log(deliveryTime);
    const presentProgress = (((today - orderTime) / (deliveryTime - orderTime)) * 100).toFixed(2); 
    console.log(presentProgress);
    const deliveredMessage = today < deliveryTime ? 'Arriving on' : 'Delivered on';

    let html = `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            ${deliveredMessage} ${dayjs(productDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${product.name}
        </div>

        <div class="product-info">
            Quantity: ${productQuantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
            <div class="progress-label ${presentProgress < 50 ? 'current-status' : ''}">
            Preparing
            </div>
            <div class="progress-label ${presentProgress >= 50 ? 'current-status' : ''}">
            Shipped
            </div>
            <div class="progress-label ${presentProgress >= 100 ? 'current-status' : ''}">
            Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${presentProgress}%"></div>
        </div>
    </div>`;

    document.querySelector('.js-main').innerHTML = html;
}

trackOrder();