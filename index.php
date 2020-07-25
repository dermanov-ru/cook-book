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
    <h2>Единицы измерения</h2>
    
    <table border="1">
        <tr >
            <td>Id</td>
            <td>Name</td>
        </tr>
        
        <tr v-for="(m, index) in measures">
            <td>{{ index + 1 }}</td>
            <td><input type="text" v-model="m.name"></td>
        </tr>
    </table>
    <button @click="addMeasure">Add measure</button>
    
    
    
    <h2>Продукты</h2>
    
    <table border="1">
        <tr >
            <td>Id</td>
            <td>Name</td>
            <td>Measure</td>
        </tr>
        
        <tr v-for="(product, index) in products">
            <td>{{ index + 1 }}</td>
            <td><input type="text" v-model="product.name"></td>
            <td>
                <select name="" id="" v-model="product.measure">
                    <option v-for="m in measures" :value="m">{{m.name}}</option>
                </select>
            </td>
        </tr>
    </table>
    <button @click="addProduct">Add product</button>
    
    
    <h2>Блюда</h2>
    
    <template v-for="meal in meals">
        <h3>{{ meal.name || "Укажите название блюда" }}</h3>
        <h3><input type="text" v-model="meal.name"></h3>
        
        <h4>Состав и количество на 1 порцию</h4>
        <table border="1">
            <tr >
                <td>Id</td>
                <td>Продукт</td>
                <td>Количество (ед. изм.)</td>
                <td>ед. изм.</td>
            </tr>
        
            <tr v-for="(productAndCount, index) in meal.productsAndCounts">
                <td>{{ index + 1 }}</td>
                
                <td>
                    <select name="" id="" v-model="productAndCount.product">
                        <option v-for="p in products" :value="p">{{p.name}}</option>
                    </select>
                </td>
                
                <td><input type="text" v-model="productAndCount.count" ></td>
                <td>
                    <template v-if="productAndCount.product">{{ productAndCount.product.measure.name }}</template>
                </td>
            </tr>
            
            <tr >
                <td colspan="3" align="right"><button @click="addProductCount(meal)">Add</button></td>
            </tr>
        </table>
    </template>
    
    <br>

    <h3>Добавить блюдо</h3>
    <button @click="addMeal">Add</button>
    
    
    <h2>Расписание</h2>
    
    <table border="1" width="100%" v-if="daysMeals">
        <tr>
            <td>Прием пищи</td>
            <td>Понедельник</td>
            <td>Вторник</td>
            <td>Среда</td>
            <td>Четверг</td>
            <td>Пятница</td>
        </tr>
        
        <template v-for="(eatTime, eatTimeKey, eatTimeIndex) in eatTimes">
            <tr>
                <td>{{ eatTimes[eatTimeKey].name  }}</td>
    
                <template v-for="(day, dayKey, dayIndex) in days">
                    <td>
                        <table>
                            <template  v-for="(meal, mealIndex) in daysMeals[dayKey][eatTimeKey].meals">
                                <tr>
                                    <td>
                                        <select name="" id="" v-model="meal.value">
                                            <option value="">- Выбрать -</option>
                                            <option v-for="m in meals" :value="m">{{m.name}}</option>
                                        </select>
                                        <button @click="removeDayEatTimeMeal(daysMeals[dayKey][eatTimeKey].meals, mealIndex)">X</button>
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
    </table>
    
    <br>
    <br>
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
    <script src="/assets/js/lib/<?=basename($jsFile)?>"></script>
    
<? } ?>

<script src="/assets/js/functions.js"></script>
<script src="/assets/js/app.js"></script>