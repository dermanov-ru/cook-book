/**
 * Created by PhpStorm.
 * Date: 25.07.2020
 * Time: 15:02
 *
 * @author dev@dermanov.ru
 */

class Meal {
    constructor(name, productsAndCounts){
        this.name = name;
        this.productsAndCounts = productsAndCounts;
    }

    addProductWithCount = function (product, count){
        this.productsAndCounts.push = new ProductCount(product, count);
    }
}