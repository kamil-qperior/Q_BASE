
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

  if (refID) {
    await createReferenceContent(title[0], "title", refID);  //first element of array since we allow only one 

    for await (const goal of goals) {
      await createReferenceContent(goal, "goal", refID);
    }

    for await (const procedure of procedures) {
      await createReferenceContent(procedure, "procedure", refID);
    }


    for await (const result of results) {
      await createReferenceContent(result, "result", refID);
    }

  }


  return res
};



const referenceUrl = "https://qperior-reference-mgmt-api.azurewebsites.net/references"
const referenceVaraintUrl = "https://qperior-reference-mgmt-api.azurewebsites.net/reference-variants"


async function createReferenceContent(content, type, refID) {
  const message = {
    "type": type,
    "language": content?.language || "DE",
    "content": content?.content || "",
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

//to display formal for reference form
export function mapFromApi(ref) {

  return {
    "name":ref.name,
    "status":ref.status,
    "clientId":ref.client.id,
    "clientName":ref.client.name,
    "industry": ref.industry,
    "country": ref.country,
    "city": ref.city,
    "projectPartnerId":  ref.projectPartner.id,
    "projectPartnerName": ref.projectPartner.name, 
    "projectLeadId":  ref.projectLead.id,
    "projectLeadName": ref.projectLead.name,
    "clientContactId":  ref.clientContact.id,
    "clientContactName": ref.clientContact.name,
    "policy": ref.policy,
    "projectBegin": ref.projectBegin?.slice(0,10), //to conform to datepicker format
    "projectEnd": ref.projectEnd?.slice(0,10),   //to conform to datepicker format
    "personDaysTotal": parseInt(ref.personDaysTotal) || 0,
    "personDaysQTotal": parseInt(ref.personDaysQTotal) || 0,
    "personDaysQIntern": parseInt(ref.personDaysQIntern) || 0,
    "technologyTag": ref.technologyTag,
    "processTag": ref.processTag,
    "logo": ref.logo,
    "picture": ref.picture,
    "source": "react"
  }
}

//to format of database
export function mapToApi(referenceObj) {
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
    "projectBegin": new Date(referenceObj.projectBegin).toISOString(),
    "projectEnd":new Date(referenceObj.projectEnd).toISOString() ,   
    "personDaysTotal": parseInt(referenceObj.personDaysTotal) || 0,
    "personDaysQTotal": parseInt(referenceObj.personDaysQTotal) || 0,
    "personDaysQIntern": parseInt(referenceObj.personDaysQIntern) || 0,
    "technologyTag": referenceObj.technologyTag,
    "processTag": referenceObj.processTag,
    "logo": "logo", //TODO
    "picture": "picture", //TODO
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




export const saveReferenceVariant = async (referenceVarant) => {

  console.log('referenceVarant', referenceVarant);

  const result = await fetch(
    `${referenceVaraintUrl}`, {
    headers: new Headers({
      'Authorization': token,
      'Content-Type': 'application/json',
      accept: 'application/json',

    }),
    method: 'POST',
    body: JSON.stringify(referenceVarant)
  })

  const jsResult = await result.json();

  return jsResult

}