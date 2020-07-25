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
// debugger
//             for (let productsAndCount of meal.value.productsAndCounts) {
//                 let productsAndCountSearch = searchByColumn(result, "product.name", productsAndCount.product.name);
//                 if (!productsAndCountSearch){
//                     result.push(productsAndCount);
//                 } else {
//                     productsAndCountSearch.count += productsAndCount.count;
//                 }
//             }
            result = result.concat(meal.value.productsAndCounts);

            // for (let product of meal.value.getProducts()){
            //     if (result.indexOf(product) < 0)
            //         result.push(product);
            // }
        }
// debugger

        return result;
    }
}