/**
 * Created by PhpStorm.
 * Date: 25.07.2020
 * Time: 14:34
 *
 * @author dev@dermanov.ru
 */

class Product {
    constructor(name, measure, actualCount) {
        this.name = name;
        this.measure = measure;
        this.actualCount = actualCount || 0;
        this.id = Date.now();
    }
}