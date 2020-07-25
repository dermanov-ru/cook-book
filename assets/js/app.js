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
        this.initDemoData();
        this.initDaysMealsStruct();
        this.initDemoDaysMeals();
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
        }
    },
    computed: {
        totalProducts: function () {
            if (!this.daysMeals)
                return {};

            var productsToBuyWithCount = [];

            for (let dayKey in this.days) {
                for (let eatTimeKey in this.eatTimes) {
                    var eatTime = this.daysMeals[dayKey][eatTimeKey];
                    var eatTimeProducts = eatTime.getProducts();

                    productsToBuyWithCount = productsToBuyWithCount.concat(eatTimeProducts);
                }
            }


            var countGroupedByProducts = {};

            for (let item of productsToBuyWithCount){
                let addCount = round(item.count, 2) * this.peoples;

                if (!countGroupedByProducts.hasOwnProperty(item.product.name)){
                    countGroupedByProducts[ item.product.name ] = {
                        product : item.product,
                        countToBuy : addCount,
                    };
                } else {
                    let oldCount = countGroupedByProducts[ item.product.name ].countToBuy;
                    countGroupedByProducts[ item.product.name ].countToBuy = round(oldCount + addCount, 2);
                }
            }
            console.log(countGroupedByProducts);

            return countGroupedByProducts
        }
    }
});
