<script setup lang="ts">
import { useStore } from "effector-vue/composition"
import { $listCompanies, addCompanyToAnalyzeMap, updateIsAdded, fetchListFinancesReports } from "@/store"
import type { ICompaniesList, IItemCompany } from "@/store/types"
import MainButton from "@/components/MainButton"
import { ref } from "vue"

let listCompanies = useStore<ICompaniesList | null>($listCompanies)
const isDisabled = ref(true)

const addToAnalyze = (company: IItemCompany, index: number) => {
  if (!company.isAdded) {
    updateIsAdded({ inn: company.ИНН, index })
    addCompanyToAnalyzeMap(company)
    isDisabled.value = false
  }
}
</script>

<template>
  <div class="table-container">
    <table>
      <caption>
        <div class="caption-container">
          <span>Информация о компаниях</span>
          <MainButton @click="fetchListFinancesReports" :disabled="isDisabled">Сформировать финансовую отчетность для выбранных компаний</MainButton>
        </div>
      </caption>

  <thead>
    <tr>
      <th>Анализ</th>
      <th>№</th>
      <th>ИНН</th>
      <th>Наименование</th>
      <th>ОГРН</th>
      <th>Юридический адрес</th>
      <th>Код региона</th>
    </tr>
  </thead>
  <tbody v-if="listCompanies && listCompanies.data.Записи">
    <tr v-for="(company, index) in listCompanies?.data.Записи" :key="company.ИНН">
      <td class="value">
        <button v-if="!company.isAdded" @click="addToAnalyze(company, index)" class="add-button"
          id="addButton">+</button>
        <button v-else class="check-button" id="checkButton">✔</button>
      </td>
      <td class="value">{{ index + 1 }}</td>
      <td class="value">{{ company.ИНН }}</td>
      <td>{{ company.НаимСокр }}<br>{{ company.НаимПолн }}</td>
      <td class="value">{{ company.ОГРН }}</td>
      <td>{{ company.ЮрАдрес }}</td>
      <td class="value">{{ company.РегионКод }}</td>
    </tr>
  </tbody>
  <tbody v-else>
    <tr>
      <td colspan="7" class="no-data-td">Нет данных для анализа</td>
    </tr>
  </tbody>
  </table>
  </div>
</template>

<style lang="scss" scoped>
.no-data-td {
  text-align: center;
  height: 250px;
  font-size: 1.5rem;
  font-weight: bold;
}

.table-container {
  max-width: 100%;
  max-height: 390px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #3498db;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ecf0f1;
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  margin: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #dddddd;
}

th {
  background-color: #0073e6;
  color: white;
}

td.value {
  text-align: center;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

caption {
  position: relative;
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50;
  background-color: #ecf0f1;
  padding: 10px;
  border-bottom: 2px solid #3498db;
  text-align: center;
  margin-bottom: 15px;
  border-radius: 5px;
}

.add-button {
  display: inline;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: #0073e6;
  ;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, transform 0.2s;
}

.add-button:hover {
  transform: scale(1.1);
  /* Увеличение при наведении */
}

.add-button:active {
  transform: scale(0.95);
  /* Уменьшение при нажатии */
}

.check-button {
  display: inline;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #2ecc71;
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, transform 0.2s;
}

.check-button:hover {
  background-color: #27ae60;
  transform: scale(1.1);
}

.check-button:active {
  transform: scale(0.95);
}

.caption-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
