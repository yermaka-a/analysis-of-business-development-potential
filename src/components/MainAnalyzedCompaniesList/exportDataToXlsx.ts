import type { IFinancesReport } from "@/store/types"
import * as ExcelJS from "exceljs"
const indicators = [
  "Активы",
  "Собственный капитал",
  "Выручка",
  "Прибыль от продаж",
  "Чистая прибыль"
]
const conditionSigns = ["Та", "Тск", "Тв", "Тп", "Тчп"]
const reportingCodes = ["стр. 1600 ББ", "стр. 1300 ББ", "стр. 2110 ОФР", "стр. 2200 ОФР", "стр. 2400 ОФР"]


 const exportDataToXlsx = async (listFinancesReports: IFinancesReport[] | null) => {
  if (listFinancesReports !== null) {
    const listToXlsx = listFinancesReports
    const workbook = new ExcelJS.Workbook()
    const BORDER = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    } as Partial<ExcelJS.Borders>
    const BOLD_BORDER = {
      top: { style: 'medium' },
      left: { style: 'medium' },
      bottom: { style: 'medium' },
      right: { style: 'medium' }
    } as Partial<ExcelJS.Borders>
    for (let i = 0; i < listToXlsx.length; i++) {
      const el = listToXlsx[i]
      const worksheet = workbook.addWorksheet(el.company.НаимСокр)
      if (Object.keys(listToXlsx[i].data).length !== 0) {
        const fullName = `Таблица ${i + 1} - ` + el.company.НаимСокр + " " + el.company.НаимПолн
        worksheet.mergeCells(1, 1, 1, 4 + Object.keys(el.data).length)
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
          const workCell = worksheet.getCell(ROW + i, COL)
          workCell.value = indicators[i - 1]
          workCell.alignment = { vertical: "middle" }
          workCell.border = BORDER
        }
        // ГОДЫ
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
          workCell.border = BORDER
          ROW = parseInt(workCell.row)
          const assetsCell = worksheet.getCell(ROW + 1, workCell.col)
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
          const clearIncome = worksheet.getCell(ROW + 1, workCell.col)
          clearIncome.value = el.data[key][2400]
          clearIncome.numFmt = '0'
          clearIncome.border = BORDER
          ROW = parseInt(clearIncome.row)
          worksheet.columns[Number(yearStartCell.col) + j].width = indicators[1].length + 2
          j += 1
        }

        const dynamicsTitle = `Динамика, темп прироста, %`
        worksheet.mergeCells(8, 3, 8, 2 + Object.keys(el.data).length)
        const dynamicsTitleCell = worksheet.getCell("C8")
        dynamicsTitleCell.value = dynamicsTitle
        dynamicsTitleCell.alignment = { horizontal: "center", vertical: "middle" }
        dynamicsTitleCell.font = { bold: true, size: 14 }

        const comparingStartCell = worksheet.getCell('C9')
        j = 0
        for (const key1 in el.data) {
          let i = 0
          for (const key2 in el.data) {
            if (key1 !== key2) {
              let ROW = parseInt(comparingStartCell.row)
              const COL = parseInt(comparingStartCell.col)
              const workCell = worksheet.getCell(ROW + i, COL + j)
              workCell.value = `Годы: ${key1}/${key2}`
              workCell.alignment = { wrapText: true }
              workCell.border = BOLD_BORDER
              ROW = parseInt(workCell.row)
              const assetsCell = worksheet.getCell(ROW + 1, COL + j)
              if (el.data[key1][1600] && el.data[key2][1600]) {
                assetsCell.value = (el.data[key1][1600] / el.data[key2][1600] - 1) * 100
                assetsCell.numFmt = '0.00'
              } else {
                assetsCell.value = "Неопределено"
              }
              assetsCell.border = BORDER
              ROW = parseInt(assetsCell.row)

              const ownCapital = worksheet.getCell(ROW + 1, workCell.col)
              if (el.data[key1][1300] && el.data[key2][1300]) {
                ownCapital.value = (el.data[key1][1300] / el.data[key2][1300] - 1) * 100
                ownCapital.numFmt = '0.00'
              } else {
                ownCapital.value = "Неопределено"
              }
              ownCapital.border = BORDER

              ROW = parseInt(ownCapital.row)
              const revenue = worksheet.getCell(ROW + 1, workCell.col)
              if (el.data[key1][2110] && el.data[key2][2110]) {
                revenue.value = (el.data[key1][2110] / el.data[key2][2110] - 1) * 100
                revenue.numFmt = '0.00'
              } else {
                revenue.value = "Неопределено"
              }
              revenue.border = BORDER

              ROW = parseInt(revenue.row)
              const sellIncome = worksheet.getCell(ROW + 1, workCell.col)
              if (el.data[key1][2200] && el.data[key2][2200]) {
                sellIncome.value = (el.data[key1][2200] / el.data[key2][2200] - 1) * 100
                sellIncome.numFmt = '0.00'
              } else {
                sellIncome.value = "Неопределено"
              }
              sellIncome.border = BORDER
              ROW = parseInt(sellIncome.row)
              const clearIncome = worksheet.getCell(ROW + 1, workCell.col)
              if (el.data[key1][2400] && el.data[key2][2400]) {
                clearIncome.value = (el.data[key1][2400] / el.data[key2][2400] - 1) * 100
                clearIncome.numFmt = '0.00'
              } else {
                clearIncome.value = "Неопределено"
              }
              clearIncome.border = BORDER
              ROW = parseInt(clearIncome.row)

              i += 6

            }
          }
          j += 1
        }
        const conditionTitle = "Условное обозначение"
        const conditionSignCell = worksheet.getCell(2, 3 + Object.keys(el.data).length)
        conditionSignCell.value = conditionTitle
        worksheet.columns[parseInt(conditionSignCell.col) - 1].width = conditionTitle.length + 2
        conditionSignCell.border = BORDER

        for (let i = 1; i <= columns; i++) {
          const workCell = worksheet.getCell(parseInt(conditionSignCell.row) + i, parseInt(conditionSignCell.col))
          workCell.value = conditionSigns[i - 1]
          workCell.alignment = { vertical: "middle", horizontal: "center" }
          workCell.border = BORDER
        }

        const reportingTitle = "Код строки отчетности"
        const reportingCell = worksheet.getCell(2, 4 + Object.keys(el.data).length)
        reportingCell.value = reportingTitle
        worksheet.columns[parseInt(reportingCell.col) - 1].width = reportingCodes[reportingCodes.length - 1].length + 4
        reportingCell.border = BORDER
        reportingCell.alignment = { wrapText: true, vertical: "middle", horizontal: "center" }
        for (let i = 1; i <= columns; i++) {
          const workCell = worksheet.getCell(parseInt(reportingCell.row) + i, parseInt(reportingCell.col))
          workCell.value = reportingCodes[i - 1]
          workCell.alignment = { vertical: "middle", horizontal: "center" }
          workCell.border = BORDER
        }

      } else {
        const workCell = worksheet.getCell('A1')
        worksheet.mergeCells("A1:K1")
        workCell.alignment = { horizontal: "center", vertical: "middle" }
        workCell.font = { bold: true, size: 14 }
        workCell.value = "Данные по компании отсутствуют"
      }
    }

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
export default exportDataToXlsx
