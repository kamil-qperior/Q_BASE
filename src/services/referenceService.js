
import { token } from './slidedeck/slideDeckServ.js'


export const fetchAllReferenceData = async () => {
  const result = await fetch(`${referenceUrl}`, {
    headers: new Headers({ 'Authorization': token })
  })

  const dataFromDB = await result.json();
  return dataFromDB
};


export const fetchReferenceDatabyName = async (name) => {
  const result = await fetch(
    `${referenceUrl}?filter=${encodeURI(JSON.stringify({ "where": { "name": name } }))}`, {
    headers: new Headers({ 'Authorization': token })
  })
  const dataFromDB = await result.json();

  return dataFromDB
};

export const fetchReferenceDatabyParam = async (searchQuery) => {

  if (searchQuery.value === null) {

    return fetchAllReferenceData()
  }

  const result = await fetch(
    `${referenceUrl}?filter=${encodeURI(JSON.stringify({ "where": { [searchQuery.param]: { like: searchQuery.value   } } }))}`, {
    headers: new Headers({ 'Authorization': token })
  })

  const dataFromDB = await result.json();

  return dataFromDB
};

//checks if reference with array contains value
export const fetchReferenceDatabyParamArrays = async (value, param) => {


  const result = await fetch(
    `${referenceUrl}?filter=${encodeURI(JSON.stringify({ "where": { [param]: { like: value, options: "i" } } }))}`, {
    headers: new Headers({ 'Authorization': token })
  })

  const dataFromDB = await result.json();

  return dataFromDB
};

const referenceUrl = "https://qperior-reference-mgmt-api.azurewebsites.net/references"



  //https://qperior-reference-mgmt-api.azurewebsites.net/references?filter=%7B%22where%22%3A%7B%22name%22%3A%22test%22%7D%7D
