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

function round(number, decimals) {
    var numberWithDot = (number + "").replace(/,/g, '.');

    return parseFloat(numberWithDot).toFixed(decimals) * 1 || 0;
}

function objectToJson(data) {
    return JSON.stringify(data);
}
function jsonToObject(data) {
    return JSON.parse(data);
}

function searchByProp(collection, prop, value) {
    for (let item of collection){
        if (item[prop] == value)
            return item;
    }

    return null;
}