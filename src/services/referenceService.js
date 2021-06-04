
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

export const fetchReferenceContent = async (refId, language) => {
    
  console.log('fetching reference cont', refId, language);
  const result = await fetch(
    `${referenceUrl}/${refId}/reference-contents?filter=${encodeURI(JSON.stringify({ "where": { "language": language } }))}`, {
    headers: new Headers({ 'Authorization': token })
  })

  const jsResult = await result.json();

  return jsResult
 }



export const fetchReferenceDatabyParam = async (searchQuery) => {
  console.log('searchQuery inside fetch', searchQuery);
  if (searchQuery?.value === null) {

    return fetchAllReferenceData()
  }
  const param = searchQuery?.param;

  if (param === "technologyTag") {

    return fetchReferenceDatabyParamArrays(searchQuery.value, "technologyTag")
  }



  const filter = createFilter(param, searchQuery);

  const result = await fetch(
    `${referenceUrl}?filter=${encodeURI(JSON.stringify({ "where": filter }))}`, {
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




//https://qperior-reference-mgmt-api.azurewebsites.net/references?filter=%7B%22where%22%3A%7B%22name%22%3A%22test%22%7D%7D


export const createNewReference = async (referenceObj, goals, procedures, results, title) => {

  const message = mapToApi(referenceObj) //TODO FINISH TAGS AND DATES


  const result = await fetch(`${referenceUrl}`, {
    headers: new Headers({
      'Authorization': token,
      accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(message)
  })
  const res = await result.json();

  const refID = res?.referenceID;
  console.log('res', refID);

  if (refID) {
     await createReferenceContent(title,"title", refID);

    for await (const goal of goals) {
        await createReferenceContent(goal,"goal", refID);
      console.log('temmp goal', goal);
    }

    for await (const procedure of procedures) {
        await createReferenceContent(procedure,"procedure", refID);
      console.log('temmp procedure', procedure);
    }


    for await (const result of results) {
       await createReferenceContent(result, "result",refID);
      console.log('temmp result', result);
    }

  }


  return res
};



const referenceUrl = "https://qperior-reference-mgmt-api.azurewebsites.net/references"
const referenceVaraintUrl = "https://qperior-reference-mgmt-api.azurewebsites.net/reference-variants"


async function createReferenceContent(content,type, refID) {
  const message = {
    "type": type,
    "language": content.language || "DE",
    "content": content.text,
    "categoryTag": [
      content.category || "test"
    ],
    "referenceId": refID
  };

  //create content
  const resultRefContent = await fetch(`${referenceUrl}/${refID}/reference-contents`, {
    headers: new Headers({
      'Authorization': token,
      accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(message)
  });
  return resultRefContent;
}

function mapToApi(referenceObj) {
  return {
    "name": referenceObj.name,
    "status": referenceObj.status,
    "client": {
      id: referenceObj.clientId,
      name: referenceObj.clientName
    },
    "industry": referenceObj.industry,
    "country": referenceObj.country,
    "city": referenceObj.city,
    "projectPartner": {
      id: referenceObj.projectPartnerId,
      name: referenceObj.projectPartnerName
    },
    "projectLead": {
      id: referenceObj.projectLeadId,
      name: referenceObj.projectLeadName
    },
    "clientContact": {
      id: referenceObj.clientContactId,
      name: referenceObj.clientContactName
    },
    "policy": referenceObj.policy,
    "projectBegin": "2021-05-26T07:21:11.160Z",
    "projectEnd": "2021-05-26T07:21:11.160Z",
    "personDaysTotal": parseInt(referenceObj.personDaysTotal) || 0,
    "personDaysQTotal": parseInt(referenceObj.personDaysQTotal) || 0,
    "personDaysQIntern": parseInt(referenceObj.personDaysQIntern) || 0,
    "technologyTag": [
      "string"
    ],
    "processTag": [
      "string"
    ],
    "logo": "string",
    "picture": "string",
    "source": "react"
  };
}



function createFilter(param, searchQuery) {

  if (param === "projectBegin") {
    return { [param]: { gte: searchQuery.value } };
  }

  if (param === "projectEnd") {
    return { [param]: { lte: searchQuery.value } };
  }
  return { [param]: { like: searchQuery.value, options: "i" } };
}

/* export const createNewReferenceContent = async (goals, procedures, results) => {

  //const message = mapToApi(referenceObj) //FINISH TAGS AND DATES

  console.log('message in create has : ', "message");

  const result = await fetch(`${referenceUrl}`, {
    headers: new Headers({
      'Authorization': token,
      accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify("message")
  })
  const res = await result.json();
  console.log('res', res);
  return res
};
 */


export const saveReferenceVariant = async (referenceVarant) => {
    
  console.log('referenceVarant', referenceVarant);

   const result = await fetch(
    `${referenceVaraintUrl}`, {
    headers: new Headers({ 'Authorization': token }),
    accept: 'application/json',
    'Content-Type': 'application/json',
    method: 'POST',
    body: JSON.stringify({
      "name": "variantName",
      "referenceContents": {
        "title": "getSelectedCheckboxes(newState)",
      },
      "language": "chosenVariantLanguage",
      "creator": "placeHolder",
      "referenceId": "refId", //TODO
    },)
  }) 

  const jsResult = await result.json();

  return jsResult 
  
 }