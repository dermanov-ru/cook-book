<?php
/**
 * Created by PhpStorm.
 * Date: 25.07.2020
 * Time: 14:06
 *
 * @author dev@dermanov.ru
 */


?>
<!-- development version, includes helpful console warnings -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>


<div id="app">
    
    <h2>Режим редактирования</h2>
    <select name="" id="" v-model="editorMode">
        <option value="measuresMode">Единицы измерения</option>
        <option value="productsMode">Продукты</option>
        <option value="receptMode">Рецепты</option>
        <option value="daySheduleMode">Меню</option>
        <option value="storeMode">Закупка</option>
    </select>


    <template v-if="editorMode == 'measuresMode'">
        <h2>Единицы измерения</h2>

        <table border="1">
            <tr >
                <th>Номер</th>
                <th>Название</th>
            </tr>

            <tr v-for="(m, index) in measures">
                <td>{{ index + 1 }}</td>
                <td><input type="text" v-model="m.name"></td>
            </tr>
            <tr >
                <td colspan="2" align="right"><button @click="addMeasure">Добавить</button></td>
            </tr>
        </table>

        <br>
        <br>
        <hr>
        <br>
    </template>

    <template v-if="editorMode == 'productsMode'">
        <h2>Продукты</h2>

        <table border="1">
            <tr >
                <th>Номер</th>
                <th>название</th>
                <th>Ед. изм.</th>
                <th>Остаток в наличии</th>
            </tr>

            <tr v-for="(product, index) in products">
                <td>{{ index + 1 }}</td>
                <td><input type="text" v-model="product.name"></td>
                <td>
                    <select name="" id="" v-model="product.measure">
                        <option v-for="m in measures" :value="m.id">{{m.name}}</option>
                    </select>
                </td>
                <td><input type="text" v-model="product.actualCount"></td>
            </tr>

            <tr >
                <td colspan="4" align="right"><button @click="addProduct">Добавить</button></td>
            </tr>
        </table>

        <br>
        <br>
        <hr>
        <br>
    </template>

    <template v-if="editorMode == 'receptMode'">
        <h2>Рецепты</h2>

        <table border="1">
            <tr >
                <th align="center">Номер</th>
                <th>Название</th>
                <th>Состав и количество на 1 порцию</th>
            </tr>

            <tr v-for="(meal, index) in meals">
                <td>{{ index + 1 }}</td>
                <td>
                    <input type="text" v-model="meal.name">
                    <button @click="removeMeal(meals, index)">X</button>
                </td>
                
                <td>
                    <table border="1">
                        <tr >
                            <th>Номер</th>
                            <th>Продукт</th>
                            <th>Ед. изм.</th>
                            <th>Количество</th>
                        </tr>

                        <tr v-for="(productAndCount, index) in meal.productsAndCounts">
                            <td>{{ index + 1 }}</td>

                            <td>
                                <select name="" id="" v-model="productAndCount.product">
                                    <option v-for="p in products" :value="p.id">{{itemPosition(products, p, true)}} {{p.name}}</option>
                                </select>
                            </td>

                            <td>
                                <template v-if="productAndCount.product">{{ productMeasureName(productAndCount.product) }}</template>
                            </td>

                            <td><input type="text" v-model="productAndCount.count" ></td>
                        </tr>

                        <tr >
                            <td colspan="4" align="right"><button @click="addProductCount(meal)">Добавить</button></td>
                        </tr>
                    </table>
                </td>
            </tr>
            
            <tr >
                <td colspan="2" align="right"><button @click="addMeal">Добавить</button></td>
            </tr>
        </table>
 
    </template>

    
    <template v-if="editorMode == 'daySheduleMode'">
        <h2>Меню</h2>

        <table border="1" width="100%" v-if="daysMeals">
            <tr>
                <th>Прием пищи</th>
                <th v-for="(day, dayKey, dayIndex) in days">{{ days[dayKey].name  }}</th>
            </tr>

            <tr>
                <th>Количество людей</th>
                <td v-for="(day, dayKey, dayIndex) in days">
                    <input type="text" v-model="day.peoples">
                </td>
            </tr>

            <template v-for="(eatTime, eatTimeKey, eatTimeIndex) in eatTimes">
                <tr>
                    <th>{{ eatTimes[eatTimeKey].name  }}</th>

                    <template v-for="(day, dayKey, dayIndex) in days">
                        <td>
                            <table>
                                <template  v-for="(meal, mealIndex) in daysMeals[dayKey][eatTimeKey].meals">
                                    <tr>
                                        <td>
                                            <select name="" id="" v-model="meal.value">
                                                <option value="">- Выбрать -</option>
                                                <option v-for="m in meals" :value="m.id">{{itemPosition(meals, m, true)}} {{m.name}}</option>
                                            </select>
                                            <button @click="removeDayEatTimeMeal(daysMeals[dayKey][eatTimeKey].meals, mealIndex)">X</button>

                                            <br>

                                            (
                                            <template v-if="meal.value">
                                                <template  v-for="(productsAndCount, productsAndCountIndex) in findMeal(meal.value).productsAndCounts">
                                                    {{findProduct(productsAndCount.product).name}} X {{ round( round(productsAndCount.count, 2) * day.peoples) }} {{productMeasureName(productsAndCount.product)}}
                                                    <template v-if="productsAndCountIndex < findMeal(meal.value).productsAndCounts.length - 1">
                                                        ,<br>
                                                    </template>
                                                </template>
                                            </template>
                                            )
                                        </td>
                                    </tr>
                                </template>
                                <tr>
                                    <td><button @click="addDayEatTimeMeal(daysMeals[dayKey][eatTimeKey])">Добавить</button></td>
                                </tr>
                            </table>
                        </td>
                    </template>
                </tr>

            </template>

            <tr>
                <th>Расход продуктов на день</th>
                <td v-for="(day, dayKey, dayIndex) in days">
                    <?
                    require __DIR__ . "/blocks/day_products.php";
                    ?>
                </td>
            </tr>

        </table>
        <br>
    </template>

    <template v-if="editorMode == 'storeMode'">
        <h2>Расход продуктов на неделю, с учетом остатков</h2>

        <table border="1">
            <tr >
                <th>Номер</th>
                <th>Продукт</th>
                <th>Остаток</th>
                <th>Требуется</th>
                <th>Купить</th>
            </tr>

            <tr v-for="(item, productName, index) in productsForAllDays">
                <td>{{ index + 1 }}</td>
                <td>{{ findProduct(item.product).name }}</td>
                <td><input type="text" v-model="findProduct(item.product).actualCount" style=" border: 1px dotted;"></td>
                <td>{{ round(item.countToBuy) }}  {{ productMeasureName(item.product) }}</td>
                <td>{{ formatToBuy(item.product, item.countToBuy, findProduct(item.product).actualCount) }}</td>
            </tr>
        </table>
    </template>
    
    <br>
    <br>
    
    <button @click="saveToStorage" style=" background: greenyellow;">Запомнить данные в браузере</button>
    <button @click="downloadData" style=" background: greenyellow;">Скачать данные на диск</button>
    <br>
    <br>
    Загрузить данные с диска <input type="file" @change="uploadData">
    
    <br>
    <br>
    <hr>
    <br>
    
    <button @click="clearAll" style=" color: red;">Очистить всю таблицу</button>
    <button @click="clearDaysMeals" style=" color: red;">Очистить меню</button>
    <button @click="clearDaysMealsAndMeals" style=" color: red;">Очистить меню и рецепты</button>
    
    <br>
    <br>
    
    
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
</div>



<?php
    $jsFiles = glob(__DIR__ . "/assets/js/lib/*.js");
    //echo '<pre><=== \$files ===></pre><pre>' . print_r($jsFiles, 1) . '</pre><pre><\=== \$files ===></pre>';

    foreach ( $jsFiles as $jsFile ) {
    ?>
    <script src="/assets/js/lib/<?=basename($jsFile)?>?v=<?=filemtime(__DIR__ . "/assets/js/lib/" . basename($jsFile))?>"></script>
    
<? } ?>

<script src="/assets/js/functions.js?v=<?=filemtime(__DIR__ . "/assets/js/functions.js")?>"></script>
<script src="/assets/js/app.js?v=<?=filemtime(__DIR__ . "/assets/js/app.js")?>"></script>