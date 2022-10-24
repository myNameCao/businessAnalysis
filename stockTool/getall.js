stock.getAllStocks().then(({ data }) => {
  console.log(data)
})

stock.getSinaIndustryClassified().then(({ data }) => {
  console.log(data)
})

stock.getSinaConceptsClassified().then(({ data }) => {
  console.log(data)
})
