var app = new Vue({
    el: '#app',
    data: {
        measures: [
            new Measure("Кг"),
            new Measure("Шт"),
            new Measure("Литр"),
            new Measure("Половинка"),
        ],
        products: [
            new Product("Meat", "kg"),
            new Product("Potato", "kg"),
            new Product("Bread", "items")
        ],
        meals : [
            new Meal("Борщ", [
                new ProductCount(new Product("Meat", "kg"), 0.1),
                new ProductCount(new Product("Potato", "kg"), 0.05),
            ]),
            new Meal("Каша пшённая на молоке", [
                new ProductCount(new Product("Meat", "kg"), 0.1),
                new ProductCount(new Product("Potato", "kg"), 0.05),
            ]),
            new Meal("Бутерброд с сыром", [
                new ProductCount(new Product("Meat", "kg"), 0.1),
                new ProductCount(new Product("Potato", "kg"), 0.05),
            ]),
            new Meal("Какао", [
                new ProductCount(new Product("Meat", "kg"), 0.1),
                new ProductCount(new Product("Potato", "kg"), 0.05),
            ]),
        ],


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
        var daysMeals = {};
        // var daysMeals = {
        //     pn : {
        //         zavtrak : clone(this.eatTimes.zavtrak),
        //         obed : clone(this.eatTimes.obed),
        //         poldnik : clone(this.eatTimes.poldnik),
        //         yjin : clone(this.eatTimes.yjin),
        //     },
        //     // vt : {
        //     //     zavtrak : clone(this.eatTimes.zavtrak),
        //     //     obed : clone(this.eatTimes.obed),
        //     //     poldnik : clone(this.eatTimes.zavtrak),
        //     //     yjin : clone(this.eatTimes.zavtrak),
        //     // },
        //     // sr : {
        //     //     zavtrak : clone(this.eatTimes.zavtrak),
        //     //     obed : clone(this.eatTimes.obed),
        //     //     poldnik : clone(this.eatTimes.zavtrak),
        //     //     yjin : clone(this.eatTimes.zavtrak),
        //     // },
        //     // ch : {
        //     //     zavtrak : this.eatTimes.zavtrak,
        //     //     obed : this.eatTimes.zavtrak,
        //     //     poldnik : this.eatTimes.zavtrak,
        //     //     yjin : this.eatTimes.zavtrak,
        //     // },
        //     // pt : {
        //     //     zavtrak : clone(this.eatTimes.zavtrak),
        //     //     obed : clone(this.eatTimes.obed),
        //     //     poldnik : clone(this.eatTimes.zavtrak),
        //     //     yjin : clone(this.eatTimes.zavtrak),
        //     // },
        // };

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

        // daysMeals.vt = clone(daysMeals.pn);
        // daysMeals.sr = clone(daysMeals.pn);
        // daysMeals.ch = clone(daysMeals.pn);
        // daysMeals.pt = clone(daysMeals.pn);

        // daysMeals.pn.zavtrak.meals.push({value : this.meals[1]});
        // daysMeals.pn.zavtrak.meals.push({value : this.meals[2]});
        // daysMeals.pn.zavtrak.meals.push({value : this.meals[3]});



        this.daysMeals = daysMeals;
    },
    methods : {
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
        }
    },
    computed: {
        totalProducts: function () {
            if (!this.daysMeals)
                return {};

            var productsToBuyWithCount = [];

            // v-for="(eatTime, eatTimeKey, eatTimeIndex) in eatTimes"
            //     eatTimes[eatTimeKey].name
            //
            //     v-for="(day, dayKey, dayIndex) in days"
            //         v-for="(meal, mealIndex) in daysMeals[dayKey][eatTimeKey].meals"

            // debugger
            for (let dayKey in this.days) {
                for (let eatTimeKey in this.eatTimes) {
                    var eatTime = this.daysMeals[dayKey][eatTimeKey];

                    // products = products.concat(this.daysMeals[dayKey][eatTimeKey].getProducts());
                    for (let product of this.daysMeals[dayKey][eatTimeKey].getProducts()){
                        if (!searchByColumn(productsToBuyWithCount, "name", product.name)){
                            productsToBuyWithCount.push(product);
                        }

                            // for (let searchProduct in products){
                            // if (searchProduct.name == product.name)
                            //     continue 2;
                        // }
                        // if (products.indexOf(product) < 0)
                        //     products.push(product);
                    }

                    // for (meal of this.daysMeals[dayKey][eatTimeKey].meals) {
                    //     // позиция может быть созадана, но не заполнена еще
                    //     var mealValue = meal.value;
                    //     if (!mealValue)
                    //         continue;
                    //
                    //     for (product of mealValue.getProducts()) {
                    //         // eatTimes[eatTimeKey]
                    //         products.push(product)
                    //     }
                    // }
                }
            }
            // debugger

            return productsToBuyWithCount
        }
    }
});
