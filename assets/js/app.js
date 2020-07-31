var app = new Vue({
    el: '#app',
    data: {
        // режим работы редактора
        editorMode: "daySheduleMode",
        menuEditorShowDays: "workdays",
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

        formatToBuy (productId, toBuyCount, actualCount) {
            if ( round(actualCount, 2) >= round(toBuyCount, 2) )
                return "Остатков достаточно";

            return round( round(toBuyCount, 2) - round(actualCount, 2), 2) + " " + this.productMeasureName(productId);
        },
        loadFromStorage() {
            if (localStorage.days)
                this.days = jsonToObject(localStorage.days);

            if (localStorage.measures)
                this.measures = jsonToObject(localStorage.measures);

            if (localStorage.products)
                this.products = jsonToObject(localStorage.products);

            if (localStorage.meals)
                this.meals = jsonToObject(localStorage.meals);

            if (localStorage.daysMeals)
                this.daysMeals = jsonToObject(localStorage.daysMeals);

            console.log('Данные загружены с диска.');
        },
        saveToStorage() {
            localStorage.days = objectToJson(this.days);
            localStorage.measures = objectToJson(this.measures);
            localStorage.products = objectToJson(this.products);
            localStorage.meals = objectToJson(this.meals);
            localStorage.daysMeals = objectToJson(this.daysMeals);
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

                localStorage.days = jsonObjectFromDisk.days;
                localStorage.measures = jsonObjectFromDisk.measures;
                localStorage.products = jsonObjectFromDisk.products;
                localStorage.meals = jsonObjectFromDisk.meals;
                localStorage.daysMeals = jsonObjectFromDisk.daysMeals;

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
            this.peoples = 1;
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

            return  result || new Product("- Не выбрано -");
        },
        findProduct(id) {
            var result = searchByProp(this.products, "id", id);

            return  result || new Product("- Не выбрано -");
        },
        findMeal(id) {
            var result = searchByProp(this.meals, "id", id);

            return  result || new Meal("- Не выбрано -", []);
        },

        productMeasureName(id) {
            var product = this.findProduct(id);
            var measure = this.findMeasure(product.measure);

            return  measure.name;
        },

        round(number) {
            return  round(number, 2);
        },
        productsPerDay: function (dayKey) {
            var days = {};
            days[ dayKey ] = this.days[dayKey];

            return this.productsForDays( days );
        },
        productsForDays: function (days) {
            if (!this.daysMeals)
                return {};

            var countGroupedByProducts = {};

            for (let dayKey in days) {
                var day = this.days[dayKey];

                for (let eatTimeKey in this.eatTimes) {
                    var eatTime = this.daysMeals[dayKey][eatTimeKey];
                    var eatTimeProducts = this.getEatTimeProducts(eatTime);

                    for (let item of eatTimeProducts){
                        let addCount = round(item.count, 2) * day.peoples;

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
                }
            }

            console.log(countGroupedByProducts);

            return countGroupedByProducts
        },

        getEatTimeProducts : function (eatTime){
            var result = [];

            for (let meal of eatTime.meals){
                if (!meal.value)
                    continue;

                result = result.concat( this.findMeal(meal.value).productsAndCounts );
            }

            return result;
        },

        itemPosition : function (collection, item, withBracket){
            let position = collection.indexOf(item) + 1;

            if (withBracket)
                position += ")";

            return position;
        }
    },
    computed: {
        productsForAllDays: function () {
            var countGroupedByProducts = this.productsForDays(this.days);

            console.log(countGroupedByProducts);

            return countGroupedByProducts
        },
        menuEditorSeelctedDays: function () {
            var menuEditorSeelctedDays = {};

            switch (this.menuEditorShowDays) {
                case "all" :
                    menuEditorSeelctedDays = this.days;
                break;
                case "workdays" :
                    menuEditorSeelctedDays[ "pn" ] = this.days["pn"];
                    menuEditorSeelctedDays[ "vt" ] = this.days["vt"];
                    menuEditorSeelctedDays[ "sr" ] = this.days["sr"];
                    menuEditorSeelctedDays[ "ch" ] = this.days["ch"];
                    menuEditorSeelctedDays[ "pt" ] = this.days["pt"];
                break;
                case "weekend" :
                    menuEditorSeelctedDays[ "sb" ] = this.days["sb"];
                    menuEditorSeelctedDays[ "vs" ] = this.days["vs"];
                break;
                default :
                    menuEditorSeelctedDays[ this.menuEditorShowDays ] = this.days[ this.menuEditorShowDays ];
                break;
            }

            console.log(menuEditorSeelctedDays);

            return menuEditorSeelctedDays
        }
    }
});
