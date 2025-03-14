
export interface ICompanyInfo {
  data: {
    "ОКВЭД": {
      "Код": string
      "Наим": string
    }
  }
}

export interface IItemCompany {
  "ОГРН": string,
  "ИНН": string,
  "КПП": string,
  "НаимСокр": string,
  "НаимПолн": string,
  "ДатаРег": string,
  "Статус": string,
  "РегионКод": string,
  "ЮрАдрес": string,
  "ОКВЭД": string,
  "isAdded": boolean
}

export interface ICompaniesList {
  "data": {
    "ЗапВсего": number
    "СтрВсего": number
    "СтрТекущ": number
    "Записи": Array<IItemCompany>
  }
}



type NumOrUndefned = number | undefined

export interface IYears {
  [key: string]: {
    "1300": NumOrUndefned
    "1600": NumOrUndefned
    "2110": NumOrUndefned
    "2200": NumOrUndefned
    "2400": NumOrUndefned
  }
}
export interface IFinancesReport {
  "company": {
    "ОГРН": string,
    "ИНН": string,
    "КПП": string,
    "НаимСокр": string,
    "НаимПолн": string,
    "ДатаРег": string,
    "Статус": string,
    "РегионКод": string,
    "ЮрАдрес": string,
    "ОКВЭД": string,
  }
  data: IYears
}
