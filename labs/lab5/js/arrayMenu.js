const dishes = [
    {
        keyword: "banana",
        name: "Бананы",
        price: 150,
        category: "fruitsAndVegetables",
        count: "1кг",
        kind:"fruit",
        image: "img/banana.jpg"
    },
    {
        keyword: "green-apple",
        name: "Яблоки зеленые",
        price: 150,
        category: "fruitsAndVegetables",
        count: "1кг",
        kind:"fruit",
        image: "img/green-apple.jpg"
    },
    {
        keyword: "tomato",
        name: "Помидоры",
        price: 150,
        category: "fruitsAndVegetables",
        kind:"vegetable",
        count: "1кг",
        image: "img/tomato.jpg"
    },
    {
        keyword: "carrot",
        name: "Морковь",
        price: 150,
        category: "fruitsAndVegetables",
        count: "1кг",
        kind:"vegetable",
        image: "img/carrot.jpg"
    },
    {
        keyword: "red-apple",
        name: "Яблоки красные",
        price: 150,
        kind:"fruit",
        category: "fruitsAndVegetables",
        count: "1кг",
        image: "img/red-apple.jpg"
    },
    {
        keyword: "pear",
        name: "Груши",
        price: 250,
        category: "fruitsAndVegetables",
        count: "350г",
        kind:"fruit",
        image: "img/pear.jpg"
    },
    {
        keyword: "activia-strawberry",
        name: "Активиа клубника",
        price: 150,
        category: "dairy",
        kind:"activia",
        count: "1кг",
        image: "img/activia-strawberry.jpg"
    },
    {
        keyword: "activia-blueberry",
        name: "Активиа черника",
        price: 150,
        category: "dairy",
        count: "1кг",
        kind:"activia",
        image: "img/activia-blueberry.jpg"
    },
    {
        keyword: "activia-natural",
        name: "Активиа черника",
        price: 150,
        category: "dairy",
        count: "1кг",
        kind:"activia",
        image: "img/activia-natural.jpg"
    },
    {
        keyword: "activia-cereals",
        name: "Активиа злаки",
        price: 150,
        category: "dairy",
        count: "1кг",
        kind:"activia",
        image: "img/activia-cereals.jpg"
    },
    {
        keyword: "rastishka",
        name: "Растишка",
        price: 250,
        category: "dairy",
        count: "350г",
        kind:"forKids",
        image: "img/rastishka.jpg"
    },
    {
        keyword: "milk",
        name: "Молоко 3.2%",
        price: 250,
        category: "dairy",
        count: "350г",
        kind:"milk",
        image: "img/milk.jpg"
    },
    {
        keyword: "maffin",
        name: "Мафин шоколадный",
        price: 150,
        category: "bakery",
        count: "1кг",
        kind: "sweet",
        image: "img/maffin.jpg"
    },
    {
        keyword: "khachapuri",
        name: "Вкуснейший хачапури с сыром",
        price: 150,
        category: "bakery",
        count: "1кг",
        kind:"hearty",
        image: "img/khachapuri-cheese.jpg"
    },
    {
        keyword: "tongue",
        name: "Язычок",
        price: 250,
        category: "bakery",
        kind:"noFilling",
        count: "350г",
        image: "img/tongue.jpg"
    },
    {
        keyword: "donate-chocolate",
        name: "Донат шоколадный",
        price: 150,
        category: "bakery",
        count: "1кг",
        kind: "sweet",
        image: "img/donate-chocolate.jpg"
    },
    {
        keyword: "donate-marshmello",
        name: "Донат с маршмеллоу",
        price: 150,
        category: "bakery",
        count: "1кг",
        kind: "sweet",
        image: "img/donate-marshmello.jpg"
    },
    {
        keyword: "samsa-chicken",
        name: "Самса с курицей",
        price: 250,
        category: "bakery",
        count: "350г",
        kind: "hearty",
        image: "img/samsa-chicken.jpg"
    },
    {
        keyword: "water-still",
        name: "Вода негазированная",
        price: 14,
        category: "drinks",
        count: "0.5л",
        kind: "water",
        image: "img/water-still.jpg"
    },
    {
        keyword: "water-sparking",
        name: "Вода газированная",
        price: 14,
        category: "drinks",
        count: "0.5л",
        kind: "water",
        image: "img/water-sparking.jpg"
    },
    {
        keyword: "juice-apple",
        name: "Сок яблочный",
        price: 36,
        category: "drinks",
        count: "0.5л",
        kind: "juice",
        image: "img/juice-apple.jpg"
    },
    {
        keyword: "juice-orange",
        name: "Сок апельсиновый",
        price: 36,
        category: "drinks",
        count: "0.5л",
        kind: "juice",
        image: "img/juice-orange.jpg"
    },
    {
        keyword: "juice-tomato",
        name: "Сок томатный",
        price: 36,
        category: "drinks",
        count: "0.5л",
        kind: "juice",
        image: "img/juice-tomato.jpg"
    },
    {
        keyword: "cola",
        name: "Cola Добрый",
        price: 44,
        category: "drinks",
        count: "0.5л",
        kind: "soda",
        image: "img/cola.jpg"
    },
    {
        keyword: "notebook-cat",
        name: "Тетрадь с котятами",
        price: 49,
        category: "things",
        count: "1шт",
        kind: "office",
        image: "img/notebook-cat.jpg"
    },
    {
        keyword: "notebook-simple",
        name: "Тетрадь обычная",
        price: 16,
        category: "things",
        count: "1шт",
        kind: "office",
        image: "img/notebook-simple.jpg"
    },
    {
        keyword: "pen-cat",
        name: "Ручка с котятами",
        price: 49,
        category: "things",
        count: "1шт",
        kind: "office",
        image: "img/pen-cat.jpg"
    },
    {
        keyword: "new-year-set",
        name: "Новогодние украшения",
        price: 549,
        category: "things",
        kind: "decoration",
        count: "1шт",
        image: "img/new-year-set.jpg"
    },
    {
        keyword: "bear-toy",
        name: "Плюшевый мишка",
        price: 349,
        category: "things",
        kind: "toy",
        count: "1шт",
        image: "img/bear-toy.jpg"
    },
    {
        keyword: "dracon-toy",
        name: "Плюшевый дракончик",
        price: 349,
        category: "things",
        kind: "toy",
        count: "1шт",
        image: "img/dracon-toy.jpg"
    }
];
