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
        <th>Номер</th>
        <th>Продукт</th>
        <th>Требуется</th>
    </tr>
    
    <tr v-for="(item, productName, index) in productsPerDay( dayKey )">
        <td>{{ index + 1 }}</td>
        <td>{{ findProduct(item.product).name }}</td>
        <td>{{ round(item.countToBuy) }} {{ productMeasureName(item.product) }}</td>
    </tr>
</table>