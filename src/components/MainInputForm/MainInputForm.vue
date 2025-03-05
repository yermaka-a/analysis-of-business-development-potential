<script setup lang="ts">

</script>

<template>
  <div class="form-container">
      <form class="form-main">
          <h2>Ввод данных</h2>
            <div class="form-group">
                <label for="okved">ОКВЭД:</label>
                <input type="text" id="okved" name="okved" required>
            </div>
            <div class="form-group">
                <label for="inn">ИНН:</label>
                <input type="number" id="inn" name="inn" required>
            </div>
            <div class="form-group">
                <label for="komitet">Наименование:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <input type="submit" value="Отправить">
        </form>
    </div>
</template>



<style lang="scss" scoped>
   .form-container {
            max-width: 400px;
            margin: auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            background-color: #f9f9f9;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .form-main{
          padding: 5%;
        }
        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        input[type="submit"] {
            background-color: #0056A0; /* Синий цвет */
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
        }

        input[type="number"] {
            appearance: textfield;
        }

        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none; /* Для Chrome, Safari и Opera */
            margin: 0; /* Убираем отступы */
        }

        input[type="submit"]:hover {
            background-color: #A50034; /* Красный цвет при наведении */
        }
</style>
