
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


export const createNewReference = async (referenceObj, goals, procedures, results) => {

  const message = mapToApi(referenceObj) //TODO FINISH TAGS AND DATES

  console.log('message in create has : ', message);
  console.log('message in create has : ', goals);

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

    for await (const goal of goals) {
      // const resultRefContent = await createReferenceContent(goal, refID);
      console.log('temmp goal', goal);
    }

    for await (const procedure of procedures) {
      // const resultRefContent = await createReferenceContent(procedure, refID);
      console.log('temmp procedure', procedure);
    }


    for await (const result of results) {
      // const resultRefContent = await createReferenceContent(result, refID);
      console.log('temmp result', result);
    }

  }


  return res
};



const referenceUrl = "https://qperior-reference-mgmt-api.azurewebsites.net/references"


async function createReferenceContent(goal, refID) {
  const goalsMessage = {
    "type": "goal",
    "language": goal.language || "DE",
    "content": goal.text,
    "categoryTag": [
      goal.category || "test"
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
    body: JSON.stringify(goalsMessage)
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

export const createNewReferenceContent = async (goals, procedures, results) => {

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