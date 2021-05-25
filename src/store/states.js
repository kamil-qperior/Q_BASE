import {
    atom,
    selector
} from "recoil";

import certificationFilter from '../data/certificationFilter.json'
import employees from '../data/employes.json'

const filterLevelData = atom({
    key: "filterLevelData", // unique ID (with respect to other atoms/selectors)
    default: certificationFilter.level.map((el) => {
        return {
            "data": el,
            "selected": false,
            "visible": true
        }
    }), // default value (aka initial value)
});

const filterTopicChapterData = atom({
    key: "filterTopicChapterData", // unique ID (with respect to other atoms/selectors)
    default: certificationFilter.topicChapter.map((el) => {
        return {
            "data": el,
            "selected": false,
            "visible": true
        }
    }), // default value (aka initial value)
});

const filterCertificationData = atom({
    key: "filterCertificationData", // unique ID (with respect to other atoms/selectors)
    default: certificationFilter.certificates.map((el) => {
        return {
            "data": el,
            "selected": false,
            "visible": true
        }
    }), // default value (aka initial value)
});



const CVsData = atom({
    key: "CVsData", // unique ID (with respect to other atoms/selectors)
    default: employees, // default value (aka initial value)
});


const CVsDataWithFilter = selector({
    key: "CVsDataWithFilter", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        let filteredCVsData = get(CVsData);
        let filterLevelDataRaw = get(filterLevelData);
        let filterTopicChapterDataRaw = get(filterTopicChapterData);
        let filterCertificationDataRaw = get(filterCertificationData);



        if (!!filterTopicChapterDataRaw.find(el => el.selected === true)) {
            filteredCVsData = filteredCVsData.filter((dasCV) => {
                return filterTopicChapterDataRaw.find((el) => {
                    if (el.selected && el.data === dasCV.topicChapter) {
                        return true
                    }
                    return false
                })
            })
        }


        if (!!filterLevelDataRaw.find(el => el.selected === true)) {
            filteredCVsData = filteredCVsData.filter((dasCV) => {
                return filterLevelDataRaw.find((el) => {
                    if (el.selected && el.data === dasCV.level) {
                        return true
                    }
                    return false
                })
            })
        }

        if (!!filterCertificationDataRaw.find(el => el.selected === true)) {
            filteredCVsData = filteredCVsData.filter((dasCV) => {
                return filterCertificationDataRaw.find((el) => {
                    if (el.selected && !!dasCV.certificates.find(certi => certi['name'] === el.data)) {
                        return true
                    }
                    return false
                })
            })
        }

        return filteredCVsData





    },
});

export { filterLevelData, filterTopicChapterData, CVsData, CVsDataWithFilter, filterCertificationData };

