let categories = {
        fruitsAndVegetables: 'Фрукты и овощи',
        drinks: 'Напитки',
        dairy: 'Молочные продукты',
        bakery: 'Выпечка',
        things: 'Вещи'
    };
const kinds = {
        fruit: 'Фрукты',
        vegetable: "Овощи",
        activia: 'Активиа',
        forKids: "Для детей",
        milk: 'Молоко',
        hearty: 'Сытное',
        sweet: 'Сладкое',
        noFilling: 'Без начинки',
        water: 'Вода',
        juice: 'Сок',
        soda: 'Газировка',
        decoration: 'Украшения',
        toy: 'Игрушки',
        office: 'Канцеляриия'
    };

const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));
const categorizeDishes = (dishes) => {
    return dishes.reduce((acc, dish) => {
        if (!acc[dish.category]) {
            acc[dish.category] = new Set();
        }
        acc[dish.category].add(dish.kind);
        return acc;
    }, {});
};
const categoriesWithKinds = categorizeDishes(dishes);
function displayDishes() {
    for (const category in categoriesWithKinds) {
        categoriesWithKinds[category] = Array.from(categoriesWithKinds[category]);
    }

    for (const category in categoriesWithKinds) {
        const dishSection = document.createElement('section');
        dishSection.classList.add('dishes');
        const header = document.createElement('h2');
        header.textContent = categories[category];
        dishSection.appendChild(header);

        const chipsContainer = document.createElement('div');
        chipsContainer.classList.add('chips-container');
        categoriesWithKinds[category].forEach(kind => {
            const chip = document.createElement('button');
            chip.textContent =kinds[kind];
            chip.classList.add('chip');
            chip.setAttribute('data-kind', kind);
            chipsContainer.appendChild(chip);
        });

        dishSection.appendChild(chipsContainer);

        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        sortedDishes.forEach(dish => {
            if (dish.category === category) {
                const dishDiv = document.createElement('div');
                dishDiv.classList.add('dish', dish.kind);
                dishDiv.innerHTML = `
                    <img src="${dish.image}" alt="${dish.name}" />
                    <div class="dish-content">
                        <p class="dish-title">${dish.name}</p>
                        <p class="dish-price">Цена: ${dish.price}₽</p>
                        <p class="dish-weight">Объем: ${dish.count}</p>
                        <button class="add-button" data-keyword="${dish.keyword}">Добавить</button>
                    </div>`;
                categoryDiv.appendChild(dishDiv);
            }
        });

        dishSection.appendChild(categoryDiv);
        document.querySelector('main').insertBefore(dishSection, document.querySelector('.order'));
    }
}
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
function setupChips() {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function () {
            const selectedKind = this.getAttribute('data-kind');
            const allDishCategories = document.querySelectorAll('.dishes');
            allDishCategories.forEach(dc =>{
                dc.querySelectorAll(".dish").forEach(dish => {
                let valueCategory = dc.getElementsByTagName("h2")[0].innerHTML;
                let category = getKeyByValue(categories, valueCategory);
                console.log(dc.getElementsByTagName("h2"));
               if (dish.classList.contains(selectedKind) || !categoriesWithKinds[category].includes(selectedKind)) {
                    dish.style.display = 'block';
                } else {
                    dish.style.display = 'none';
                }
            });
        });
            })
            
    });
}
function setupAddButtons() {
    const addButtons = document.querySelectorAll('.add-button');
    console.log(addButtons);
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const keyword = this.getAttribute('data-keyword');
            const selectedDish = dishes.find(dish => dish.keyword === keyword);
            addToOrder(selectedDish);
            this.parentElement.parentElement.classList.add('selected');
        });
    });
}

let orderItems = [];
let totalPrice = 0;
const totalDiv = document.getElementById('summaryPrice');

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
        orderItems.push(dish);
        totalPrice += dish.price;
    } else {
        if (orderItems.some(item => item.keyword === dish.keyword)) {
            elementDish.textContent = "Блюдо не выбрано";
            totalPrice -= dish.price;
            orderItems = orderItems.filter(item => item.keyword !== dish.keyword);
        } else {
            orderItems = orderItems.filter(item => item.category !== dish.category);
            orderItems.push(dish);
            totalPrice = orderItems.reduce((total, item) => total + item.price, 0);
            elementDish.textContent = `${dish.name} ${dish.price}₽`;
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

    if (orderItems.length === 0) {
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

    const orderCategories = orderItems.map(i => i.category);
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

document.addEventListener('DOMContentLoaded', function () {
    displayDishes();
    setupChips();
    setupAddButtons();
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
function sendForm(){
    event.preventDefault();

    const form = document.querySelector("form");

    if (!form.checkValidity()) {
        highlightInvalidFields(form);
        showModal("Пожалуйста, заполните все обязательные поля.");
        return;
    }

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "keywords";
    hiddenInput.value = orderItems.map(it => it.keyword).join(",");
    form.appendChild(hiddenInput);

    form.submit();
}
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
    hiddenInput.type = "hidden";
    hiddenInput.name = "keywords";
    hiddenInput.value = orderItems.map(it => it.keyword).join(",");
    form.appendChild(hiddenInput);


    form.submit();
}
const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api/dishes';

function loadDishes() {

    fetch(apiUrl)
        .then(response => response.json())
        .then(dishes => {
            console.log(d);
            const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

            const categoriesWithKinds = categorizeDishes(sortedDishes);
            displayDishes(categoriesWithKinds, sortedDishes);
        })
        .catch(error => {
            console.error('Ошибка загрузки данных:', error);
        });
}
loadDishes();