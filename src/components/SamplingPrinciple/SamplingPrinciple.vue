<script setup lang="ts">

</script>

<template>
<div class="sampling-container">
        <h2>Принцип выборки</h2>
        <ul>
            <li><input type="number" value="0"> Кол-во</li>
            <li>С чем-то</li>
            <li>Кол-во</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
 .sampling-container {
            background: linear-gradient(135deg, #0056A1, #8B0000);
            color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            animation: pulse 3s infinite;
        }

        h2 {
            margin-top: 0;
            font-size: 24px;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin: 10px 0;
            font-size: 18px;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }
</style>
