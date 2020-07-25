/**
 * Created by PhpStorm.
 * Date: 25.07.2020
 * Time: 16:10
 *
 * @author dev@dermanov.ru
 */

class EatTime {
    constructor(name, meals){
        this.name = name;
        this.meals = meals;
    }

    getProducts(){
        var result = [];

        for (let meal of this.meals){
            if (!meal.value)
                continue;

            result = result.concat(meal.value.getProducts());

            // for (let product of meal.value.getProducts()){
            //     if (result.indexOf(product) < 0)
            //         result.push(product);
            // }
        }
// debugger

        return result;
    }
}