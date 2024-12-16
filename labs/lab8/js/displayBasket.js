const apiUrl = 'http://192.168.1.34:8080/dishes/';
let basketDishes = JSON.parse(localStorage.getItem('selectedDishes')) || [];

// Загрузка содержимого корзины
async function loadBasket() {
    if (basketDishes.length === 0) {
        showEmptyBasketMessage();
        return;
    }

    try {
        const dishes = await Promise.all(
            basketDishes.map(id => fetch(`${apiUrl}${id}`).then(res => res.json()))
        );
        renderBasket(dishes);
    } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
    }
}

// Отображение содержимого корзины
function renderBasket(dishes) {
    const basketContainer = document.getElementById('basket-container');
    const summary = document.getElementById('basket-summary');
    const totalPriceEl = document.getElementById('basket-total-price');
    basketContainer.innerHTML = '';
    let totalPrice = 0;

    dishes.forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.className = 'basket-item';
        dishDiv.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p>${dish.name}</p>
            <p>Цена: ${dish.price} ₽</p>
            <button class="remove-from-basket" data-id="${dish.id}">Удалить</button>
        `;
        basketContainer.appendChild(dishDiv);

        const removeButton = dishDiv.querySelector('.remove-from-basket');
        removeButton.addEventListener('click', () => removeFromBasket(dish.id));

        totalPrice += dish.price;
    });

    totalPriceEl.textContent = totalPrice;
    summary.classList.remove('hidden');
}

// Удаление блюда из корзины
function removeFromBasket(dishId) {
    basketDishes = basketDishes.filter(id => id !== dishId);
    localStorage.setItem('selectedDishes', JSON.stringify(basketDishes));
    loadBasket();
}

// Показ сообщения о пустой корзине
function showEmptyBasketMessage() {
    document.getElementById('nothingSelect').classList.remove('hidden');
    document.getElementById('summaryPrice').classList.add('hidden');
}

// Отправка заказа
async function submitOrder() {
    const orderDetails = {
        dishes: basketDishes,
        customer: {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
        },
    };

    try {
        const response = await fetch(`${apiUrl}orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails),
        });

        if (response.ok) {
            alert('Заказ успешно оформлен!');
            localStorage.removeItem('selectedDishes');
            location.reload();
        } else {
            alert('Ошибка оформления заказа.');
        }
    } catch (error) {
        console.error('Ошибка отправки заказа:', error);
    }
}

// Инициализация корзины
document.addEventListener('DOMContentLoaded', () => {
    loadBasket();
    document.getElementById('bt-form-send').addEventListener('click', submitOrder);
});