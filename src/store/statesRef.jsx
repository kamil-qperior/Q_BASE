import {
  atom,
  atomFamily,

  selector
} from "recoil";
import { referenceTextFields } from "../components/referenceForm";
import { fetchAllReferenceData, fetchReferenceContent, fetchReferenceDatabyParam } from '../services/referenceService';






  //used for 3 different atoms lists of different contents
  const contentListsState = atomFamily({
      key: 'contentListsState',
      default:[]
    });
    const variantNameState = atomFamily({
      key: 'variantNameState',
      default: null
    });

    const variantContentListsState = atomFamily({
      key: 'variantContentListsState',
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


/* 

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
  }); */


const searchQueryState = atom({
    key: 'searchQueryState',
    default: {value: null, param: "name"},
  });

  
  const activeStepState = atom({
    key: 'activeStepState',
    default: 0
  });

  const refIdForVariantState = selector({
    key: 'refIdForVariantState',
    default: "",
    get: async ({get}) => {
      const step = get(activeStepState) 
      const chosenRefs= get(chosenRefsState) 
      const refs = chosenRefs.map(r => r.referenceID )
      return refs[step-1]  //-1 since we also have a language section with no reference
    }
  });

  const referenceVariantState = atom({
    key: 'referenceVariantState',
    default: {
      name: "name",
      language: "DE",
      referenceContents : {
        title: "title",
        goals: [],
        procedures: [],
        results: [],
        
      },
      creator:"",
      referenceId: ""
    },
  });




  const referenceVariantSelectionState = atom({
    key: 'referenceVariantSelectionState',
    default: []
  });

  const referenceVariantIdsFromResult = atom({
    key: 'referenceVariantIdsFromResult',
    default: []
  });

  const chosenVariantLanguageState = atom({
    key: 'chosenVariantLanguageState',
    default: 'DE',
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


 /*  let saveVariantState = selector({
    key: 'saveVariantState',  
    default: false,
    get: async ({get}) => {


    },
    set: async ({set}, newValue) => {
      const referenceVariantSelection = get(referenceVariantSelectionState) 
      console.log('referenceVariantSelection before saving', referenceVariantSelection);

      if (referenceVariantSelection ) {

        for await (const referenceVariant of referenceVariantSelection) {
          const res =  await saveReferenceVariant(referenceVariant)

        }
          return "res"
         
        }
        return {};



    }
  })
  */

  let filteredReferenceContents = selector({
    key: 'filteredReferenceContents',  //dont use queryState otherwise circular
    default: [],
    get: async ({get}) => {
       
       const refId = get(refIdForVariantState) 
       const language = get(chosenVariantLanguageState) 
      

        if (refId ) {

            const res =  await fetchReferenceContent(refId, language)
            return res
           
          }
          else {
            console.log('No ref Id found while searching for content ', refId);
            return []
          }
        },
      });




      const formOpenState = atom({
        key: 'formOpenState',
        default: false,
      });
      
        

export {
  searchQueryState, filteredReferences, contentListsState, refTextFieldsState,
  chosenRefsState, refIdForVariantState,
  filteredReferenceContents,
  referenceVariantSelectionState,
  referenceVariantState,
  variantContentListsState,
  variantNameState,
  activeStepState,
  referenceVariantIdsFromResult,
  formOpenState,
  chosenVariantLanguageState

};

