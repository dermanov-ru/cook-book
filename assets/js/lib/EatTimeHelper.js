/**
 * Created by PhpStorm.
 * Date: 25.07.2020
 * Time: 20:47
 *
 * @author dev@dermanov.ru
 */

var EatTimeHelper = {
     getProducts : function (eatTime){
        var result = [];

        for (let meal of eatTime.meals){
            if (!meal.value)
                continue;

            result = result.concat(meal.value.productsAndCounts);
        }

        return result;
    }
};