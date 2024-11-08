export const orders = JSON.parse(localStorage.getItem('orders'))|| [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
    for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        if (element.id === orderId) {
            return element;
        }
    }
}