// api.js

import { createEffect, createEvent, createStore } from 'effector';
import axios from 'axios';
import config from '@/config';
import type { ICompaniesList, ICompanyInfo, IFinancesReport, IItemCompany } from './types';
const op = "fetchCompanyData: "
const fetchCompanyData = createEffect<{ inn: string; kpp: string }, ICompanyInfo>(async (params) => {
  const { inn, kpp } = params
  console.log(op, inn, kpp)
  const response = await axios.get<ICompanyInfo>(config.URL_COMPANY)
  return response.data
});

const $company = createStore<ICompanyInfo | null>(null)
  .on(fetchCompanyData.doneData, (_, data) => data)
  .on(fetchCompanyData.failData, (_, error) => {
    console.warn(op, error.message)
    return null
  }

  );

const fetchListCompanies = createEffect<{ okved: string }, ICompaniesList>(async (params) => {
  const { okved } = params
  console.log(op, okved)
  const response = await axios.get<ICompaniesList>(config.URL_SEARCH)
  console.log(response.data)
  return response.data
})
const updateIsAdded = createEvent<{ inn: string, index: number }>()
const $listCompanies = createStore<ICompaniesList | null>(null)
  .on(fetchListCompanies.doneData, (_, data) => data)
  .on(fetchListCompanies.failData, (_, error) => {
    console.warn(op, error.message)
    return null
  })
  .on(updateIsAdded, (state, companyData) => {
    if (state !== null) {
      if (state.data.Записи[companyData.index].ИНН === companyData.inn) {
        state.data.Записи[companyData.index].isAdded = true
      }
    }
    return {...state} as ICompaniesList
  });


const fetchListFinancesReports = createEffect(async () => {
  console.log($listCompanies.getState())
  // some logic might be there...
  const response = await axios.get<IFinancesReport[]>(config.URL_FINANCES)
  return response.data
})

const $listFinancesReports = createStore<IFinancesReport[] | null>(null)
  .on(fetchListFinancesReports.doneData, (_, data) => data)
  .on(fetchListFinancesReports.failData, (_, error) => {
    console.warn(op, error.message)
    return null
  });



const addCompanyToAnalyzeMap = createEvent<IItemCompany>()

const $mapCompaniesToAnalyze = createStore<Map<string, IItemCompany>>(new Map()).on(
  addCompanyToAnalyzeMap, (state, company: IItemCompany) => {
    state.set(company.ИНН, company)
    return state
  }
)

export { fetchCompanyData, updateIsAdded, $company, fetchListCompanies, $listCompanies, fetchListFinancesReports, $listFinancesReports, $mapCompaniesToAnalyze, addCompanyToAnalyzeMap };


