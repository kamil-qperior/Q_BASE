import { atom, atomFamily, selector } from "recoil";
import { referenceTextFields } from "../components/referenceForm";
import { filterStatusData, 
  filterNameData,
  filterCountryData,
  filterIndustryData,
  filterProcedureData,
  filterPolicyData,
  filterClientData,
  filterTechnologyData,
 } from "./filter";
import {
  fetchAllReferenceData,
  fetchReferenceContent,
  fetchReferenceDatabyParam,
} from "../services/referenceService";

//used for 3 different atoms lists of different contents
const contentListsState = atomFamily({
  key: "contentListsState",
  default: [],
});
const variantNameState = atomFamily({
  key: "variantNameState",
  default: null,
});

const variantContentListsState = atomFamily({
  key: "variantContentListsState",
  default: [],
});

const refTextFieldsState = atom({
  key: "refTextFieldsState",
  default: referenceTextFields.reduce(
    (o, key) => ({ ...o, [key.apiParam]: key.default || "" }),
    {}
  ),
});

const chosenRefsState = atom({
  key: "chosenRefsState",
  default: [],
});

const searchQueryState = atom({
  key: "searchQueryState",
  default: { value: null, param: "name" },
});

const activeStepState = atom({
  key: "activeStepState",
  default: 0,
});

const refIdForVariantState = selector({
  key: "refIdForVariantState",
  default: "",
  get: async ({ get }) => {
    const step = get(activeStepState);
    const chosenRefs = get(chosenRefsState);
    const refs = chosenRefs.map((r) => r.referenceID);
    return refs[step - 1]; //-1 since we also have a language section with no reference
  },
});

const referenceVariantState = atom({
  key: "referenceVariantState",
  default: {
    name: "name",
    language: "DE",
    referenceContents: {
      title: "title",
      goals: [],
      procedures: [],
      results: [],
    },
    creator: "",
    referenceId: "",
  },
});

const referenceVariantSelectionState = atom({
  key: "referenceVariantSelectionState",
  default: [],
});

const referenceVariantIdsFromResult = atom({
  key: "referenceVariantIdsFromResult",
  default: [],
});

const chosenVariantLanguageState = atom({
  key: "chosenVariantLanguageState",
  default: "DE",
});

const allReferences = atom({
  key: "allReferencesState",
  default: fetchAllReferenceData(),
});




let filteredReferences = selector({
  key: "filteredReferences", //dont use queryState otherwise circular
  default: fetchAllReferenceData(),
  get: async ({ get }) => {
    //const query = get(searchQueryState)
    let filteredRefs = get(allReferences); 
    
    //multifilter
    const status = get(filterStatusData); 
    const country = get(filterCountryData); 
    const industry = get(filterIndustryData); 
    const policy = get(filterPolicyData); 
    
    //free text
    const client = get(filterClientData); 
    const name = get(filterNameData); 
    
    //tags
    const techTag = get(filterTechnologyData); 
    const procedureTag = get(filterProcedureData); 
    

    console.log("client ", client);

    filteredRefs = filterData(status, filteredRefs, "status");
    filteredRefs = filterData(country, filteredRefs, "country");
    filteredRefs = filterData(industry, filteredRefs, "industry");
    filteredRefs = filterData(policy, filteredRefs, "policy");

    filteredRefs = filterFreeText(name, filteredRefs);

  /*   if (client?.length > 0) {
      filteredRefs = filteredRefs.filter((ref) =>
        ref.client?.name?.toLowerCase().includes(client.toLowerCase())
      );
    } */

    return filteredRefs;
  },
});

//dependent on variant
let filteredReferenceContents = selector({
  key: "filteredReferenceContents",
  default: [],
  get: async ({ get }) => {
    const refId = get(refIdForVariantState);
    const language = get(chosenVariantLanguageState);

    if (refId) {
      const res = await fetchReferenceContent(refId, language);
      return res;
    } else {
      console.log("No ref Id found while searching for content ", refId);
      return [];
    }
  },
});

//dependent on edit reference
let filteredReferenceContentsForEdit = selector({
  key: "filteredReferenceContentsForEdit",
  default: [],
  get: async ({ get }) => {
    const refId = get(refIdForEditState);
    //const language = get(chosenVariantLanguageState)

    if (refId) {
      const res = await fetchReferenceContent(refId, "EN");

      console.log("filtered content based on ref id to edit", res);
      //set(contentListsState(title), contentList);

      return res;
    } else {
      console.log("No ref Id found while searching for content ", refId);
      return [];
    }
  },
  set: ({ set }, contents) => {
    const title = contents.filter((content) => content.type === "title");
    const goals = contents.filter((content) => content.type === "goal");
    const procedures = contents.filter(
      (content) => content.type === "procedure"
    );
    const results = contents.filter((content) => content.type === "result");

    set(contentListsState("title"), title);
    set(contentListsState("goal"), goals);
    set(contentListsState("procedure"), procedures);
    set(contentListsState("result"), results);
  },
});

const formOpenState = atom({
  key: "formOpenState",
  default: false,
});

const refIdForEditState = atom({
  key: "refIdForEditState",
  default: false,
});

export {
  searchQueryState,
  filteredReferences,
  contentListsState,
  refTextFieldsState,
  chosenRefsState,
  refIdForVariantState,
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
  filteredReferenceContentsForEdit,
};


  function filterFreeText(name, filteredRefs, key) {
    if (name?.length > 0) {
      filteredRefs = filteredRefs.filter((ref) => ref[key]?.toLowerCase().includes(name.toLowerCase())
      );
    }
    return filteredRefs;
  }

  function filterData(filterObj, filteredRefs, key) {
    if (!!filterObj.find((el) => el.selected === true)) {
      filteredRefs = filteredRefs.filter((ref) => {
        return filterObj.find((el) => {
          if (el.selected && el.data === ref[key]) {
            return true;
          }
          return false;
        });
      });
    }
    return filteredRefs;
  }

