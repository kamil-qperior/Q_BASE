import {
    atom,
    atomFamily,
    selectorFamily,
    selector
} from "recoil";


import {  fetchReferenceDatabyParam, fetchAllReferenceData, fetchReferenceDatabyParamArrays } from '../services/referenceService'
import {referenceTextFields} from "../components/referenceForm"




  //used for 3 different atoms lists of different contents
  const contentListsState = atomFamily({
      key: 'contentListsState',
      default:[]
    });


  const refTextFieldsState = atom({
    key: 'refTextFieldsState',
    default: referenceTextFields.reduce((o, key) => ({ ...o, [key.apiParam]: key.default || ""}), {})
  });

  const chosenRefsState = atom({
    key: 'chosenRefsState',
    default: []
  });



  const contentListsAccess = selectorFamily({
    key: "content-access",
    get:  (title) => ({ get }) => {

      const atom = get(contentListsState(title));
      console.log('for no reaason');
      return atom;
    },
    set: (title) => ({set}, contentList) => {
        set(contentListsState(title), contentList);
     
    }
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


        

export {  searchQueryState,  filteredReferences, contentListsState, refTextFieldsState, chosenRefsState };

