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
    },
    mounted : function() {
        var daysMeals = {
            pn : {
                zavtrak : clone(this.eatTimes.zavtrak),
                obed : clone(this.eatTimes.obed),
                poldnik : clone(this.eatTimes.zavtrak),
                yjin : clone(this.eatTimes.zavtrak),
            },
            vt : {
                zavtrak : clone(this.eatTimes.zavtrak),
                obed : clone(this.eatTimes.obed),
                poldnik : clone(this.eatTimes.zavtrak),
                yjin : clone(this.eatTimes.zavtrak),
            },
            sr : {
                zavtrak : clone(this.eatTimes.zavtrak),
                obed : clone(this.eatTimes.obed),
                poldnik : clone(this.eatTimes.zavtrak),
                yjin : clone(this.eatTimes.zavtrak),
            },
            ch : {
                zavtrak : this.eatTimes.zavtrak,
                obed : this.eatTimes.zavtrak,
                poldnik : this.eatTimes.zavtrak,
                yjin : this.eatTimes.zavtrak,
            },
            pt : {
                zavtrak : clone(this.eatTimes.zavtrak),
                obed : clone(this.eatTimes.obed),
                poldnik : clone(this.eatTimes.zavtrak),
                yjin : clone(this.eatTimes.zavtrak),
            },
        };

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
    }
});
