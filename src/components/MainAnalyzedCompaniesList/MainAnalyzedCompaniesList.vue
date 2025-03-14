<script setup lang="ts">
import { $listFinancesReports, $yearsSet } from "@/store"
import type { IFinancesReport, IYears } from "@/store/types"
import { useStore } from "effector-vue/composition"
import MainButton from "@/components/MainButton"
import exportDataToXlsx from "./exportDataToXlsx"
const listFinancesReports = useStore($listFinancesReports)
const yearSet = useStore($yearsSet)





const getCurrentYearData = (setYear: string, years: IYears): string => {
  let codeString = ""
  for (let year in years) {
    if (year === setYear) {
      codeString += `
      <strong>1300</strong>: ${years[year][1300]}<br>
      <strong>1600</strong>: ${years[year][1600]}<br>
      <strong>2110</strong>: ${years[year][2110]}<br>
      <strong>2200</strong>: ${years[year][2200]}<br>
      <strong>2400</strong>: ${years[year][2400]}<br>
      `
      break
    }
  }
  return codeString
}

</script>

<template>
  <div class="table-container">
    <div class="caption-container">
      <MainButton :disabled="false" @click="exportDataToXlsx(listFinancesReports as IFinancesReport[])" classes="btn">Выгрузить данные</MainButton>
      <div class="caption">Финансовая отчетность компаний</div>
    </div>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>ИНН</th>
          <th>Наименование</th>
          <th v-for="year in yearSet" :key="year">
            {{ year }}
          </th>
          <th>ОГРН</th>
          <th>Юридический адрес</th>
          <th>Код региона</th>
        </tr>
      </thead>
      <tbody v-if="listFinancesReports">
        <tr v-for="(report, index) in listFinancesReports" :key="report.company.ИНН">
          <td class="value">
            {{ index + 1 }}
          </td>
          <td>
            {{ report.company.ИНН }}
          </td>
          <td>
            {{ report.company.НаимСокр }},<br />
            {{ report.company.НаимПолн }}
          </td>
          <td v-for="year in yearSet" :key="year" v-html="getCurrentYearData(year, report.data)"></td>
          <td class="value">
            {{ report.company.ОГРН }}
          </td>
          <td>
            {{ report.company.ЮрАдрес }}
          </td>
          <td class="value">
            {{ report.company.РегионКод }}
          </td>
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
td.value {
  text-align: center;
}

.btn {
  display: block;
  align-self: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  font-size: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  margin: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.caption-container {
  position: sticky;
  display: flex;
  flex-direction: column;
  background-color: #ecf0f1;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 10px 10px 0px 10px;
  border-radius: 0px 0px 10px 10px;
}

.caption {
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

.no-data-td {
  text-align: center;
  height: 250px;
  font-size: 1.5rem;
  font-weight: bold;
}

.table-container {
  max-width: 100%;
  max-height: 1000px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #3498db;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #ecf0f1;
  padding: 0px 10px 10px 10px;
}

th,
td {
  padding: 8px;
  text-align: left;
  border: 1px solid #dddddd;
}

th {
  background-color: #3498db;
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
</style>
