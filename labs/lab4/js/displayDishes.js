const sortedDishes = dishes.sort((a, b) => a.name.localeCompare(b.name));

function displayDishes() {
    const categories = {
        fruitsAndVegetables: 'Фрукты и овощи',
        dairy: 'Молочные продукты',
        bakery: 'Выпечка'
    };

    for (const category in categories) {
        const dishSection = document.createElement('section');
        dishSection.classList.add('dishes');
        const header = document.createElement('h2');
        header.textContent = categories[category];
        dishSection.appendChild(header);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        sortedDishes.forEach(dish => {
            if (dish.category === category) {
                const dishDiv = document.createElement('div');
                dishDiv.classList.add('dish');
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

function setupAddButtons() {
    const addButtons = document.querySelectorAll('.add-button');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const keyword = this.getAttribute('data-keyword');
            const selectedDish = dishes.find(dish => dish.keyword === keyword);
            addToOrder(selectedDish);
            this.parentElement.parentElement.classList.add('selected'); // выделение карточки
        });
    });
}

let orderItems = [];
let totalPrice = 0;
const totalDiv = document.getElementById('summaryPrice');

function addToOrder(dish) {
    let elementDish;
    switch (dish.category) {
        case "fruitsAndVegetables":
            elementDish = document.getElementById('selectFV');
            break;
        case "dairy":
            elementDish = document.getElementById('selectMP');
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
document.addEventListener('DOMContentLoaded', function () {
    displayDishes();
    setupAddButtons();
});
document.getElementById("bt-form-send").addEventListener("click", (event) => {
    event.preventDefault();
    if (orderItems.length != 3) {
        alert("Пожалуйста, выберите все блюда перед отправкой.");
    } else {
        const form = document.querySelector("form");
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "keywords";
        hiddenInput.value = orderItems.map(it => it.keyword).join(","); 
        form.appendChild(hiddenInput);
        form.submit();
    }
});

