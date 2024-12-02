const categories = {
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

        const chip = document.createElement('button');
            chip.textContent = 'Все';
            chip.classList.add('chip');
            chip.classList.add('chip-active');
        const chipsContainer = document.createElement('div');
        chipsContainer.classList.add('chips-container');
        chipsContainer.appendChild(chip);
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
    const chipsContainers = document.querySelectorAll('.chips-container');
    chipsContainers.forEach(container => {
        const chips = container.querySelectorAll('.chip');
        chips.forEach(chip => {
            chip.addEventListener('click', function () {
                chips.forEach(chip => {
                    chip.className = 'chip';
                });

                chip.className = 'chip-active';

                const selectedKind = chip.getAttribute('data-kind');
                const categorySection = container.closest('.dishes');
                const categoryDishes = categorySection.querySelectorAll('.dish');

                categoryDishes.forEach(dish => {
                    if (
                        selectedKind === 'Все' ||
                        dish.classList.contains(selectedKind)
                    ) {
                        dish.style.display = 'block';
                    } else {
                        dish.style.display = 'none';
                    }
                });
            });
        });
    });
}
function setupAddButtons() {
    const addButtons = document.querySelectorAll('.add-button');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
            const keyword = this.getAttribute('data-keyword');
            const selectedDish = dishes.find(dish => dish.keyword === keyword);
            addToOrder(selectedDish);
            const category = selectedDish.category;
            let categorySection = null;
            const sections = document.querySelectorAll('.dishes');
            sections.forEach(section => {
                const header = section.querySelector('h2');
                if (header && header.textContent === categories[category]) {
                    categorySection = section;
                }
            });

            if (categorySection) {
                const categoryDishes = categorySection.querySelectorAll('.dish');
                categoryDishes.forEach(dish => {
                    dish.classList.remove('dish-active');
                    const button = dish.querySelector('.add-button');
                    button.style.backgroundColor = '';
                    button.textContent = 'Добавить';
                });

                const currentDish = this.parentElement.parentElement;
                currentDish.classList.add('dish-active');
                this.style.backgroundColor = '#f10f40';
                this.textContent = 'Добавлено';
            }
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
        const currentDish = orderItems.find(item => item.category === dish.category);
        if (currentDish) {
            totalPrice -= currentDish.price;
            orderItems = orderItems.filter(item => item.keyword !== currentDish.keyword);
        }
        
        orderItems.push(dish);
        totalPrice += dish.price;
        elementDish.textContent = `${dish.name} ${dish.price}₽`;
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
document.addEventListener('DOMContentLoaded', function () {
    displayDishes();
    setupChips();
    setupAddButtons();
});
