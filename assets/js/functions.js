/**
 * Created by PhpStorm.
 * Date: 25.07.2020
 * Time: 14:31
 *
 * @author dev@dermanov.ru
 */

function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

function searchByColumn(collection, prop, value) {
    // debugger
    for (let item of collection){
        if (item[prop] == value)
            return item;
    }

    return null;
}
