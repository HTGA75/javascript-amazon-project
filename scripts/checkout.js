import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
    try {
        //throw new Error("1");
        
        await loadProductsFetch();
        const value = await new Promise((resolve, reject) => {
            //throw 'error2';
            loadCart(() => {
                //reject('error3');
                resolve('value3');
            });
        });
    } catch (error) {
        console.log(error);
        console.log('Unexpected error. Please try again later');
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((value) => {
    console.log(value);
    renderOrderSummary();
    renderPaymentSummary();
})
*/

/*
new Promise((resolve) => {
    loadProducts(()=>{
        resolve();
    });
}).then(() => {
    return new Promise((resolve) => {
        loadCart(()=>{
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})*/

/*loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
})*/