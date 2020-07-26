var app = new Vue({
    el: '#app',
    data: {
        measures: [],
        products: [],
        meals : [],

        days: {
            pn : new Day("Понедельник"),
            vt : new Day("Вторник"),
            sr : new Day("Среда"),
            ch : new Day("Четверг"),
            pt : new Day("Пятница"),
            sb : new Day("Суббота"),
            vs : new Day("Воскресенье"),
        },
        eatTimes: {
            zavtrak : new EatTime("Завтрак", []),
            obed : new EatTime("Обед", []),
            poldnik : new EatTime("Полдник", []),
            yjin : new EatTime("Ужин", []),
        },
        daysMeals: null,

        peoples: 1,
    },
    mounted : function() {
        // this.initDemoData();
        this.initDaysMealsStruct();
        // this.initDemoDaysMeals();

        this.loadFromStorage();
    },
    methods : {
        initDemoData : function() {
            this.measures = [
                new Measure("Кг"),
                new Measure("Шт"),
                new Measure("Литр"),
                new Measure("Половинка"),
            ];
            this.products = [
                new Product("Мясо", this.measures[0], 1),
                new Product("Картошка", this.measures[0], 10),
                new Product("Хлеб", this.measures[1], 2)
            ];
            this.meals = [
                new Meal("Борщ", [
                    new ProductCount(this.products[0], 0.1),
                    new ProductCount(this.products[1], 0.05),
                ]),
                new Meal("Каша пшённая на молоке", [
                    new ProductCount(this.products[0], 0.1),
                    new ProductCount(this.products[1], 0.05),
                ]),
                new Meal("Бутерброд с сыром", [
                    new ProductCount(this.products[0], 0.1),
                    new ProductCount(this.products[1], 0.05),
                ]),
                new Meal("Какао", [
                    new ProductCount(this.products[0], 0.1),
                    new ProductCount(this.products[1], 0.05),
                ]),
            ];
        },
        initDaysMealsStruct : function() {
            var daysMeals = {};

            daysMeals.pn = {
                zavtrak : new EatTime("Завтрак", []),
                obed : new EatTime("Обед", []),
                poldnik : new EatTime("Полдник", []),
                yjin : new EatTime("Ужин", []),
            };
            daysMeals.vt = {
                zavtrak : new EatTime("Завтрак", []),
                obed : new EatTime("Обед", []),
                poldnik : new EatTime("Полдник", []),
                yjin : new EatTime("Ужин", []),
            };
            daysMeals.sr = {
                zavtrak : new EatTime("Завтрак", []),
                obed : new EatTime("Обед", []),
                poldnik : new EatTime("Полдник", []),
                yjin : new EatTime("Ужин", []),
            };
            daysMeals.ch = {
                zavtrak : new EatTime("Завтрак", []),
                obed : new EatTime("Обед", []),
                poldnik : new EatTime("Полдник", []),
                yjin : new EatTime("Ужин", []),
            };
            daysMeals.pt = {
                zavtrak : new EatTime("Завтрак", []),
                obed : new EatTime("Обед", []),
                poldnik : new EatTime("Полдник", []),
                yjin : new EatTime("Ужин", []),
            };
            daysMeals.sb = {
                zavtrak : new EatTime("Завтрак", []),
                obed : new EatTime("Обед", []),
                poldnik : new EatTime("Полдник", []),
                yjin : new EatTime("Ужин", []),
            };
            daysMeals.vs = {
                zavtrak : new EatTime("Завтрак", []),
                obed : new EatTime("Обед", []),
                poldnik : new EatTime("Полдник", []),
                yjin : new EatTime("Ужин", []),
            };

            this.daysMeals = daysMeals;
        },
        initDemoDaysMeals : function() {
            this.daysMeals.pn.zavtrak.meals.push({value : this.meals[1]});
            this.daysMeals.pn.zavtrak.meals.push({value : this.meals[2]});
            this.daysMeals.pn.zavtrak.meals.push({value : this.meals[3]});

            this.daysMeals.pn.obed.meals.push({value : this.meals[1]});
            this.daysMeals.pn.obed.meals.push({value : this.meals[2]});
            this.daysMeals.pn.obed.meals.push({value : this.meals[3]});
        },
        addMeasure : function() {
            this.measures.push(new Measure(""));
        },
        addProduct : function() {
            this.products.push(new Product("", null));
        },
        addMeal : function() {
            this.meals.push(new Meal('', []));
        },
        removeMeal : function(collection, index) {
            if (!confirm("Точно удалить блюдо? Оно не должно где-то использоваться или будет ошибка!"))
                return;

            collection.splice(index, 1);
        },
        addProductCount : function(meal) {
            meal.productsAndCounts.push(new ProductCount(null, 0));
        },


        addDayEatTimeMeal : function(eatTime) {
            eatTime.meals.push({value: null});
        },

        removeDayEatTimeMeal (collection, index) {
            collection.splice(index, 1);
        },

        formatToBuy (toBuy, actualCount) {
            if (actualCount >= toBuy)
                return "Остатков достаточно";

            return round(toBuy - actualCount, 2);
        },
        loadFromStorage() {
            if (localStorage.measures)
                this.measures = jsonToObject(localStorage.measures);

            if (localStorage.products)
                this.products = jsonToObject(localStorage.products);

            if (localStorage.meals)
                this.meals = jsonToObject(localStorage.meals);

            if (localStorage.daysMeals)
                this.daysMeals = jsonToObject(localStorage.daysMeals);

            if (localStorage.peoples)
                this.peoples = jsonToObject(localStorage.peoples);

            console.log('Данные загружены с диска.');
        },
        saveToStorage() {
            localStorage.measures = objectToJson(this.measures);
            localStorage.products = objectToJson(this.products);
            localStorage.meals = objectToJson(this.meals);
            localStorage.daysMeals = objectToJson(this.daysMeals);
            localStorage.peoples = objectToJson(this.peoples);
            console.log('Данные сохранены на диск.');
        },
        downloadData() {
            this.saveToStorage();

            var obj = localStorage;
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

            var a = document.createElement('a');
            a.href = 'data:' + data;
            a.download = 'cookbook.json';
            a.innerHTML = 'download JSON';

            a.click();
        },
        uploadData(event) {
            var input = event.target;

            var reader = new FileReader();
            reader.onload = function(){
                var fileContent = reader.result;
                var jsonObjectFromDisk = jsonToObject(fileContent);

                localStorage.measures = jsonObjectFromDisk.measures;
                localStorage.products = jsonObjectFromDisk.products;
                localStorage.meals = jsonObjectFromDisk.meals;
                localStorage.daysMeals = jsonObjectFromDisk.daysMeals;
                localStorage.peoples = jsonObjectFromDisk.peoples;

                this.loadFromStorage();

                console.log('Данные загружены из файла.');
            }.bind(this);
            reader.readAsText(input.files[0]);
        },
        clearAll() {
            if (!confirm("Точно все удалить?"))
                return;

            this.initDaysMealsStruct();
            this.meals = [];
            this.products = [];
            this.measures = [];
        },
        clearDaysMeals() {
            if (!confirm("Точно удалить расписание?"))
                return;

            this.initDaysMealsStruct();
        },
        clearDaysMealsAndMeals() {
            if (!confirm("Точно удалить расписание и блюда?"))
                return;

            this.initDaysMealsStruct();
            this.meals = [];
        },
        findMeasure(id) {
            var result = searchByProp(this.measures, "id", id);

            return  result;
        },
        findProduct(id) {
            var result = searchByProp(this.products, "id", id);

            return  result;
        },

        productMeasureName(id) {
            var product = this.findProduct(id);
            var measure = this.findMeasure(product.measure);

            return  measure.name;
        },
    },
    computed: {
        totalProducts: function () {
            if (!this.daysMeals)
                return {};

            var productsToBuyWithCount = [];

            for (let dayKey in this.days) {
                for (let eatTimeKey in this.eatTimes) {
                    var eatTime = this.daysMeals[dayKey][eatTimeKey];
                    var eatTimeProducts = EatTimeHelper.getProducts(eatTime);
                    // var eatTimeProducts = eatTime.getProducts();

                    productsToBuyWithCount = productsToBuyWithCount.concat(eatTimeProducts);
                }
            }

            var countGroupedByProducts = {};

            for (let item of productsToBuyWithCount){
                let addCount = round(item.count, 2) * this.peoples;

                if (!countGroupedByProducts.hasOwnProperty(item.product)){
                    countGroupedByProducts[ item.product ] = {
                        product : item.product,
                        countToBuy : addCount,
                    };
                } else {
                    let oldCount = countGroupedByProducts[ item.product ].countToBuy;
                    countGroupedByProducts[ item.product ].countToBuy = round(oldCount + addCount, 2);
                }
            }
            console.log(countGroupedByProducts);

            return countGroupedByProducts
        }
    }
});
