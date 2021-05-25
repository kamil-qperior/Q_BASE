import {
    atom,
    selector
} from "recoil";

import certificationFilter from '../data/certificationFilter.json'
import employees from '../data/employees.json'
import {  fetchReferenceDatabyParam, fetchAllReferenceData, fetchReferenceDatabyParamArrays } from '../services/referenceService'



const todoListState = atom({
    key: 'todoListState',
    default: [],
  });


const searchQueryState = atom({
    key: 'searchQueryState',
    default: {value: null, param: "name"},
  });




  let filteredReferences = selector({
    key: 'filteredReferences',  //dont use queryState otherwise circular
    get: async ({get}) => {
       
       const query = get(searchQueryState) 

        if (query ) {
            console.log('query ', query);
            const res =  await fetchReferenceDatabyParam(query)
            console.log('result by query ', res);
            return res
           
          }
          else {
            const res = await fetchAllReferenceData()
            console.log('result by default ', res);
            return res
          }
        },
      });


        

 


export {  todoListState, searchQueryState,  filteredReferences };

