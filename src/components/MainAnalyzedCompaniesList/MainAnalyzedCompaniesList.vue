<script setup lang="ts">
import { $listFinancesReports, $yearsSet } from "@/store"
import type { IYears } from "@/store/types"
import { useStore } from "effector-vue/composition"
import MainButton from "@/components/MainButton"
import * as ExcelJS from "exceljs"
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
const indicators = [
  "Активы",
  "Собственный капитал",
  "Выручка",
  "Прибыль от продаж",
  "Чистая прибыль"
]
const exportDataToXlsx = async () => {
  if (listFinancesReports.value !== null) {
    const listToXlsx = listFinancesReports.value
    const workbook = new ExcelJS.Workbook()
    const BORDER = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    } as Partial<ExcelJS.Borders>

    console.log("listTOXlsx: ", listToXlsx)
    for (let i = 0; i < listToXlsx.length; i++) {
      const el = listToXlsx[i]
      const worksheet = workbook.addWorksheet(el.company.НаимСокр)
      const fullName = `Таблица ${i + 1} - ` + el.company.НаимСокр + " " + el.company.НаимПолн
      worksheet.mergeCells("A1:Q1")
      const titleCell = worksheet.getCell("A1")
      titleCell.value = fullName
      titleCell.alignment = { horizontal: "center", vertical: "middle" }
      titleCell.font = { bold: true, size: 14 }
      const columns = 5
      const IdxCell = worksheet.getCell('A2')
      IdxCell.value = "№"
      IdxCell.alignment = { horizontal: "center", vertical: "middle" }
      IdxCell.border = BORDER
      for (let i = 1; i <= columns; i++) {
        const ROW = parseInt(IdxCell.row)
        const COL = parseInt(IdxCell.col)
        const workCell = worksheet.getCell(ROW + i, COL)
        workCell.value = i
        workCell.alignment = { horizontal: "center", vertical: "middle" }
        workCell.border = BORDER
      }
      worksheet.columns[0].width = 10
      const IndicatorsCell = worksheet.getCell('B2')
      IndicatorsCell.value = "Показатели"
      IndicatorsCell.alignment = { horizontal: "center", vertical: "middle" }
      IndicatorsCell.border = BORDER
      for (let i = 1; i <= columns; i++) {
        const ROW = parseInt(IndicatorsCell.row)
        const COL = parseInt(IndicatorsCell.col)
        const workCell = worksheet.getCell(ROW + i,COL)
        workCell.value = indicators[i - 1]
        workCell.alignment = { vertical: "middle" }
        workCell.border = BORDER
      }
      worksheet.columns[1].width = indicators[1].length + 2
      const yearStartCell = worksheet.getCell('C2')
      yearStartCell.border = BORDER
      worksheet.columns[2].width = indicators[1].length + 2
      let j = 0
      for (const key in el.data) {
        let ROW = parseInt(yearStartCell.row)
        const COL = parseInt(yearStartCell.col)
        const workCell = worksheet.getCell(ROW, COL + j)
        workCell.value = key
        ROW = parseInt(workCell.row)
        const assetsCell = worksheet.getCell(ROW+ 1, workCell.col)
        assetsCell.value = el.data[key][1600]
        assetsCell.numFmt = '0'
        assetsCell.border = BORDER
        ROW = parseInt(assetsCell.row)
        const ownCapital = worksheet.getCell(ROW + 1, workCell.col)
        ownCapital.value = el.data[key][1300]
        ownCapital.numFmt = '0'
        ownCapital.border = BORDER
        ROW = parseInt(ownCapital.row)
        const revenue = worksheet.getCell(ROW + 1, workCell.col)
        revenue.value = el.data[key][2110]
        revenue.numFmt = '0'
        revenue.border = BORDER
        ROW = parseInt(revenue.row)
        const sellIncome = worksheet.getCell(ROW + 1, workCell.col)
        sellIncome.value = el.data[key][2200]
        sellIncome.numFmt = '0'
        sellIncome.border = BORDER
        ROW = parseInt(sellIncome.row)
        const clearIncome = worksheet.getCell(ROW+ 1, workCell.col)
        clearIncome.value = el.data[key][2400]
        clearIncome.numFmt = '0'
        clearIncome.border = BORDER
        ROW = parseInt(clearIncome.row)
        worksheet.columns[Number(yearStartCell.col) + j].width = indicators[1].length + 2
        j+=1
      }
    }

    // // Задаем размеры ячеек (например, 5 строк и 5 столбцов)
    // const rows = 5;
    // const columns = 5;

    // // Проходим по строкам и столбцам
    // for (let i = 1; i <= rows; i++) {
    //   for (let j = 1; j <= columns; j++) {
    //     // Задаем значение ячейки
    //     const cell = worksheet.getCell(i, j);
    //     cell.value = `Ячейка ${i},${j}`;

    //     // Задаем границы ячейки
    //     cell.border = {
    //       top: { style: 'thin' },
    //       left: { style: 'thin' },
    //       bottom: { style: 'thin' },
    //       right: { style: 'thin' }
    //     };

    //     // Задаем цвет фона (желтый для четных и зеленый для нечетных ячеек)
    //     if ((i + j) % 2 === 0) {
    //       cell.fill = {
    //         type: 'pattern',
    //         pattern: 'solid',
    //         fgColor: { argb: 'FFFF00' } // Желтый цвет
    //       };
    //     } else {
    //       cell.fill = {
    //         type: 'pattern',
    //         pattern: 'solid',
    //         fgColor: { argb: '00FF00' } // Зеленый цвет
    //       };
    //     }
    //   }
    // }

    // Сохраняем файл
    // Генерация файла
    const buffer = await workbook.xlsx.writeBuffer();

    // Создание ссылки для скачивания
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Золотое правило экономики.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
</script>

<template>
  <div class="table-container">
    <div class="caption-container">
      <MainButton :disabled="false" @click="exportDataToXlsx()" classes="btn"
        >Выгрузить данные</MainButton
      >
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
        <tr
          v-for="(report, index) in listFinancesReports"
          :key="report.company.ИНН"
        >
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
          <td
            v-for="year in yearSet"
            :key="year"
            v-html="getCurrentYearData(year, report.data)"
          ></td>
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
