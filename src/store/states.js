import {
    atom,
    selector
} from "recoil";

import certificationFilter from '../data/certificationFilter.json'
import employees from '../data/employees.json'

const filterLevelData = atom({
    key: "filterLevelData", // unique ID (with respect to other atoms/selectors)
    default: certificationFilter.level.map((el) => {
        return {
            "Position": el,
            "selected": false
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
        const filteredCVsData = get(CVsData);
        let filterLevelDataRaw = get(filterLevelData);
        if (!filterLevelDataRaw.find(el => el.selected === true)) {
            return filteredCVsData;

        } else {

            return filteredCVsData.filter((dasCV) => {
                return filterLevelDataRaw.find((el) => {
                    if (el.selected && el.Position === dasCV.level) {
                        return true
                    }
                    return false
                })
            })



        }





    },
});

export { filterLevelData, CVsData, CVsDataWithFilter };

