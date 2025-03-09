<script setup lang="ts">
import { reactive } from 'vue';
import type { IFormData, IFormValidateFlags } from './types';
import { fetchCompanyData, fetchListCompanies, fetchListFinancesReports } from '@/store';

const FormData = reactive<IFormData>({
  okved: "",
  inn: "",
  kpp: ""
})
const IsNotValidateFlags = reactive<IFormValidateFlags>({
  isInn: false,
  isKpp: false,
  isOkved: false
})

const validateKPP = (kpp: string): boolean => /^\d{9}$/.test(kpp);
const validateINN = (inn: string): boolean => /^\d{10}$/.test(inn); // 10 цифр для компаний
const validateOKVED = (okved: string): boolean => /^\d{2}\.\d{2}$|^\d{2}\.\d{2}\.\d{2}$/.test(okved); // Формат с точками


const validateFormData = async () => {
  const { okved, inn, kpp } = FormData
  if (validateINN(inn)) {
    IsNotValidateFlags.isInn = false
  } else {
    IsNotValidateFlags.isInn = true
  }
  if (okved === "" || validateOKVED(okved)) {
    IsNotValidateFlags.isOkved = false
  } else {
    IsNotValidateFlags.isOkved = true
  }

  if (kpp === "" || validateKPP(kpp)) {
    IsNotValidateFlags.isKpp = false
  } else {
    IsNotValidateFlags.isKpp = true
  }

  if (!(IsNotValidateFlags.isInn && IsNotValidateFlags.isKpp && IsNotValidateFlags.isOkved)) {
    const companyData = await fetchCompanyData({ inn, kpp })
    const chosenOKVED = okved !== "" ? okved : companyData.data.ОКВЭД.Код
    await fetchListCompanies({ okved: chosenOKVED })
    console.log(await fetchListFinancesReports())
  }
}


</script>

<template>
  <div class="form-container">
    <form class="form-main" @submit.prevent="validateFormData">
      <h2>Ввод данных</h2>
      <div class="form-group">
        <label for="inn">ИНН:</label>
        <input :class="{ warning: IsNotValidateFlags.isInn }" type="number" id="inn" name="inn" v-model="FormData.inn"
          required>
      </div>
      <div class="form-group">
        <label for="okved">ОКВЭД:</label>
        <input :class="{ warning: IsNotValidateFlags.isOkved }" type="text" id="okved" name="okved"
          v-model="FormData.okved">
      </div>
      <div class="form-group">
        <label for="komitet">КПП:</label>
        <input :class="{ warning: IsNotValidateFlags.isKpp }" type="text" id="kpp" name="kpp" v-model="FormData.kpp">
      </div>
      <div class="submit-container">
        <input type="submit" value="Отправить">
      </div>
    </form>
  </div>
</template>



<style lang="scss" scoped>
.form-container {

  min-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-main {
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
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
  display: block;
  background-color: #0056A0;
  /* Синий цвет */
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
  -webkit-appearance: none;
  /* Для Chrome, Safari и Opera */
  margin: 0;
  /* Убираем отступы */
}

input[type="submit"]:hover {
  background-color: #A50034;
  /* Красный цвет при наведении */
}

.warning {
  background-color: #ffdddd;
  /* Светлый красный фон */
  color: #d8000c;
  /* Темно-красный текст */
  border: 1px solid #d8000c;
  /* Красная рамка */
  padding: 8px;
  /* Отступы внутри элемента */
  border-radius: 4px;
  /* Скругленные углы */
  font-size: 14px;
  /* Размер шрифта */
  margin-top: 5px;
  /* Отступ сверху */
  display: inline-block;
  /* Чтобы элемент был маленьким */
  margin-bottom: 10px;
}

.submit-container {
  display: flex;
  justify-content: center;
  /* Центрируем кнопку */
  width: 100%;
  /* Делаем контейнер шириной 100% */
}
</style>
