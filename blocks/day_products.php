<?php
/**
 * Created by PhpStorm.
 * Date: 30.07.2020
 * Time: 0:39
 *
 * @author dev@dermanov.ru
 */


?>

<table border="1">
    <tr >
        <td>Id</td>
        <td>Продукт</td>
        <td>Остаток</td>
        <td>Требуется</td>
        <td>Купить</td>
<!--        <td>Ед. изм</td>-->
    </tr>
    
    <tr v-for="(item, productName, index) in productsPerDay( dayKey )">
        <td>{{ index + 1 }}</td>
        <td>{{ findProduct(item.product).name }}</td>
        <td><input type="text" v-model="findProduct(item.product).actualCount" style=" border: 1px dotted;width: 50px;"></td>
        <td>{{ round(item.countToBuy) }}</td>
        <td>{{ formatToBuy(item.countToBuy, findProduct(item.product).actualCount) }}</td>
<!--        <td>{{ productMeasureName(item.product) }}</td>-->
    </tr>
</table>