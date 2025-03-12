

interface  IConfig
{
  URL_FINANCES: string,
  URL_COMPANY: string,
  URL_SEARCH: string
}

const loadConfig = (): IConfig => {
  return  {
    URL_FINANCES: import.meta.env.VITE_URL_FINANCES,
    URL_COMPANY: import.meta.env.VITE_URL_COMPANY,
    URL_SEARCH: import.meta.env.VITE_URL_SEARCH
  }
}



export default loadConfig()
