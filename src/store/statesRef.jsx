import {
  atom,
  atomFamily,

  selector
} from "recoil";
import { referenceTextFields } from "../components/referenceForm";
import { filterStatusData} from "./filter";
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


  const allReferences = atom({
    key: 'allReferencesState',
    default: fetchAllReferenceData(),
  });





  let filteredReferences = selector({
    key: 'filteredReferences',  //dont use queryState otherwise circular
    default:  fetchAllReferenceData(),
    get: async ({get}) => {
       
       //const query = get(searchQueryState) 
       let filteredRefs = get(allReferences)  //currently an array of all selected status
       const status = get(filterStatusData)  //currently an array of all selected status
       const country = get(filterStatusData)  //currently an array of all selected status


   
            console.log('status ', status);
            
            if (!!status.find(el => el.selected === true)) {
              filteredRefs = filteredRefs.filter((ref) => {
                  return status.find((el) => {
                      if (el.selected && el.data === ref.status) {
                          return true
                      }
                      return false
                  })
              })
           }
    
            if (!!country.find(el => el.selected === true)) {
              filteredRefs = filteredRefs.filter((ref) => {
                  return country.find((el) => {
                      if (el.selected && el.data === ref.country) {
                          return true
                      }
                      return false
                  })
              })
           }

            /* console.log('result by query ', res); */
            return filteredRefs
           
          
      /*     else {
            const res = await fetchAllReferenceData()
            console.log('result by default ', res);
            return res
          }
 */


        },
      });



  //dependent on variant
  let filteredReferenceContents = selector({
    key: 'filteredReferenceContents',  
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




   //dependent on edit reference
  let filteredReferenceContentsForEdit = selector({
    key: 'filteredReferenceContentsForEdit',  
    default: [],
    get: async ({get}) => {
       
       const refId = get(refIdForEditState) 
       //const language = get(chosenVariantLanguageState) 
      

        if (refId ) {

            const res =  await fetchReferenceContent(refId, "EN")

            console.log('filtered content based on ref id to edit', res);
            //set(contentListsState(title), contentList);

            return res
           
          }
          else {
            console.log('No ref Id found while searching for content ', refId);
            return []
          }
        },
        set:  ({set}, contents) => {
            
            const title = contents.filter(content => content.type==="title")
            const goals= contents.filter(content => content.type==="goal")
            const procedures = contents.filter(content => content.type==="procedure")
            const results = contents.filter(content => content.type==="result")
                
            
            set(contentListsState("title"), title);  
            set(contentListsState("goal"), goals);  
            set(contentListsState("procedure"), procedures);  
            set(contentListsState("result"), results);  

    


      }});
 

      const formOpenState = atom({
        key: 'formOpenState',
        default: false,
      });
      
      const refIdForEditState = atom({
        key: 'refIdForEditState',
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
  chosenVariantLanguageState,
  refIdForEditState,
  
  filteredReferenceContentsForEdit

};

