const apiUrl = 'http://192.168.1.36:8080/dish/';
let basketDishes  = JSON.parse(localStorage.getItem('selectedDishes')) || [];
let categories = {
        fruitsAndVegetables: 'Фрукты и овощи',
        drinks: 'Напитки',
        dairy: 'Молочные продукты',
        bakery: 'Выпечка',
        things: 'Вещи'
    };

let totalPrice = 0;
let totalDiv = document.getElementById('summaryPrice');
async function loadBasket() {
    totalDiv = document.getElementById('summaryPrice');
    if (basketDishes.length === 0) {
        showEmptyBasketMessage();
        return;
    }
        renderBasket(basketDishes);
        try{
        clearBasket();
    }catch(error){
        console.log(error)
    }


        totalPrice = 0;
        totalDiv.textContent = `Итого: 0₽`;
        basketDishes.forEach(d => {
            console.log(d)
            addToOrder(d)
    })
}


function renderBasket(dishes) {
    const basketContainer = document.getElementById('basket-container');
    const summary = document.getElementById('summaryPrice');
    basketContainer.innerHTML = '';
    let totalPrice = 0;

    basketDishes.forEach(dish => {
        const dishDiv = document.createElement('div');
        dishDiv.className = 'dish';
        dishDiv.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p>${dish.name}</p>
            <p>Цена: ${dish.price} ₽</p>
            <button class="remove-from-basket" data-id="${dish.id}">Удалить</button>
        `;
        basketContainer.appendChild(dishDiv);
        const removeButton = dishDiv.querySelector('.remove-from-basket');
        removeButton.addEventListener('click', () => removeFromBasket(dish.keyword));
    });
    totalPrice.textContent = "Цена: " + totalPrice;
}
function showEmptyBasketMessage() {
    
    const basketContainer = document.getElementById('basket-container');
    basketContainer.innerHTML = '';
    document.getElementById('nothingSelect').style.display='block';
    document.getElementById("hiddenAction").style.display = 'none'
}

function removeFromBasket(keyword) {
    basketDishes = basketDishes.filter(item => item.keyword != keyword);
    localStorage.setItem('selectedDishes', JSON.stringify(basketDishes));
    console.log(basketDishes)
    if (basketDishes.length === 0) {
        console.log('empty')
        showEmptyBasketMessage();
    } else {
        loadBasket();
    }
}


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

document.addEventListener('DOMContentLoaded', () => {
    loadBasket();
});

function clearBasket(){
    document.getElementById('selectFV').textContent = "Блюдо не выбрано";
    document.getElementById('selectMP').textContent = "Блюдо не выбрано";
    document.getElementById('selectDrinks').textContent = "Блюдо не выбрано";
    document.getElementById('selectThings').textContent = "Блюдо не выбрано";
    document.getElementById('selectBakery').textContent = "Блюдо не выбрано";
}

function addToOrder(dish) {
    console.log(dish)
    let elementDish;
    switch (dish.category) {
        case "fruitsAndVegetables":
            elementDish = document.getElementById('selectFV');
            break;
        case "dairy":
            elementDish = document.getElementById('selectMP');
            break;
        case "drinks":
            elementDish = document.getElementById('selectDrinks');
            break;
        case "things":
            elementDish = document.getElementById('selectThings');   
            break;
        default:
            elementDish = document.getElementById('selectBakery');
    }

    if (elementDish.textContent === "Блюдо не выбрано") {
        elementDish.textContent = `${dish.name} ${dish.price}₽`;
        totalPrice += dish.price;
    } else {
        if (!basketDishes.some(item => item.keyword === dish.keyword)) {
            elementDish.textContent = "Блюдо не выбрано";
        }
    }
    const selectionSection = document.getElementById('hiddenAction');
    const noSelectionMessage = document.getElementById('nothingSelect');
        if (totalPrice != 0){
            selectionSection.style.display='block'
            noSelectionMessage.style.display='none'
        } else {
            noSelectionMessage.style.display='block'
            selectionSection.style.display='none'
        }
    totalDiv.textContent = `Итого: ${totalPrice}₽`;
}

document.getElementById("bt-form-send").addEventListener("click", (event) => {
    event.preventDefault();
    const requiredCategories = [
        { id: "selectFV", name: "Фрукты и овощи" },
        { id: "selectDrinks", name: "Напитки" },
        { id: "selectMP", name: "Молочные продукты" },
        { id: "selectBakery", name: "Выпечка" }
    ];

    if (basketDishes.length === 0) {
        showModal("Ничего не выбрано. Выберите блюда для заказа.");
        return;
    }

    const combos = [
        {fruitsAndVegetables: "Фрукты и овощи", drinks: "Напитки", dairy: "Молочные продукты", bakery: "Выпечка"},
        {drinks: "Напитки", dairy: "Молочные продукты", bakery: "Выпечка"},
        {fruitsAndVegetables: "Фрукты и овощи", drinks: "Напитки", dairy: "Молочные продукты"},
        {fruitsAndVegetables: "Фрукты и овощи", drinks: "Напитки", bakery: "Выпечка"},
        {drinks: "Напитки", bakery: "Выпечка"},

        {fruitsAndVegetables: "Фрукты и овощи", drinks: "Напитки", dairy: "Молочные продукты", bakery: "Выпечка", things: 'Вещи'},
        {drinks: "Напитки", dairy: "Молочные продукты", bakery: "Выпечка", things: 'Вещи'},
        {fruitsAndVegetables: "Фрукты и овощи", drinks: "Напитки", dairy: "Молочные продукты", things: 'Вещи'},
        {fruitsAndVegetables: "Фрукты и овощи", drinks: "Напитки", bakery: "Выпечка", things: 'Вещи'},
        {drinks: "Напитки", bakery: "Выпечка", things: 'Вещи'}
    ];

    const orderCategories = basketDishes.map(i => i.category);
    let sameCombos = combos.filter(combo => {
    return orderCategories.every(c => {
        console.log("Проверяем категорию:", c, "в", Object.keys(combo));
        return Object.keys(combo).includes(c);
    });
});

    if (sameCombos.length > 0 && sameCombos.some(combo => 
        JSON.stringify(Object.keys(combo)) === JSON.stringify(orderCategories)
    )) {
        sendForm();
    } else if (sameCombos.length > 0 && sameCombos.some(combo => {
        const filteredCombo = Object.keys(combo).filter(c => c !== "drinks");
        return filteredCombo.every(c => orderCategories.includes(c));
    })) {
        if(sameCombos.some(combo => Object.keys(combo).every(c => orderCategories.includes(c))))
            sendForm();
        else
            showModal("Добавьте напиток");
    } else {
        const missingCombos = sameCombos.map(combo =>
            Object.keys(combo).filter(c => c !== "drinks" && !orderCategories.includes(c))
        );

        const needsCategories = new Set();

        missingCombos.forEach(combo => {
            combo.forEach(c => {
                if (c !== "drinks" && c !== "things") {
                    needsCategories.add(categories[c]);
                }
            });
        });

        if (needsCategories.size > 0) {
            showModal("Добавьте " + Array.from(needsCategories).join(", "));
        } else {
            requiredCategories.forEach(c => {
                const isInAll = sameCombos.every(combo => Object.values(combo).includes(c.name));
                if (isInAll && !orderCategories.includes(c.name)) {
                    showModal(`Добавьте "${c.name}"`);
                }
            });
        }
    }
});
function showModal(message) {
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    modalText.textContent = message;
    modal.classList.remove("hidden");
}

document.getElementById("modal-ok").addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
});
function highlightInvalidFields(form) {

    const fields = form.querySelectorAll("[required]");

    fields.forEach(field => {
        if (!field.checkValidity()) {
            field.classList.add("error");
        } else {
            field.classList.remove("error");
        }
    });
}

function sendForm() {
    event.preventDefault();

    const form = document.querySelector("form");

    if (!form.checkValidity()) {
        highlightInvalidFields(form);
        showModal("Пожалуйста, заполните все обязательные поля.");
        return;
    }
    const hiddenInput = document.createElement("input");
    basketDishes.forEach(dish => {
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = dish.category;
            hiddenInput.value = dish.keyword;
            form.appendChild(hiddenInput);
        });
    form.appendChild(hiddenInput);


    form.submit();
}