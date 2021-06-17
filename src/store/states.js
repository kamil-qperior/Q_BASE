import {
    atom,
    selector
} from "recoil";

import certificationFilter from '../data/certificationFilter.json'
import certificationClusters from '../data/certificationCluster.json'
import employees from '../data/employeesNew.json'

const certificationCluster = atom({
    key: "certificationCluster", // unique ID (with respect to other atoms/selectors)
    default: certificationClusters.map((el) => {
        const theKey = Object.keys(el)
        const selected = false
        return {
            "data": el[theKey].map((val) => {
                const secondKeyKey = Object.keys(val)
                return {
                    "data": val[secondKeyKey].map((value) => {
                        return {
                            selected,
                            value,
                        }
                    }),
                    selected,
                    "value": secondKeyKey[0],
                };
            }),
            selected,
            "value": theKey[0]
        }
    }), // default value (aka initial value)
});

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

const switchFilterLogic = atom({
    key: "switchFilterLogic", // unique ID (with respect to other atoms/selectors)
    default: false
})


const CVsData = atom({
    key: "CVsData", // unique ID (with respect to other atoms/selectors)
    default:
        employees.map(item => {
            var certificates = {};
            item.certificates = item.certificates.filter(function (val) {
                if (certificates[val.name] || val.name === "unknown") {
                    return false;
                }
                certificates[val.name] = true;
                return true;
            });
            return item
        })
});

const filterTopicChapterDataLevel1 = selector({
    key: "filterTopicChapterDataLevel1", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        let filteredCVsDataRaw = get(certificationCluster);
        return filteredCVsDataRaw.map((el) => {
            return {
                "selected": el.selected,
                "value": el.value
            }
        })

    },
    set: ({ set, get }, newValue) => {
        let filteredCVsDataRaw = get(certificationCluster);
        let theFilterCertificationData = get(filterCertificationData);
        var copyFilteredCVsDataRaw = JSON.parse(JSON.stringify(filteredCVsDataRaw));
        copyFilteredCVsDataRaw.find(el => el.value === newValue.value).selected = !newValue.selected
        copyFilteredCVsDataRaw.find(el => el.value === newValue.value).data.forEach((item, index, arr) => {
            item.selected = !newValue.selected
            item.data.forEach((item) => {
                item.selected = !newValue.selected
            })
        })
        set(filterCertificationData, getUpdatedCertificationFilter(copyFilteredCVsDataRaw, theFilterCertificationData));
        set(certificationCluster, copyFilteredCVsDataRaw)
    }
});

const filterTopicChapterDataLevel2 = selector({
    key: "filterTopicChapterDataLevel2", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        let filteredCVsDataRaw = get(certificationCluster);
        return filteredCVsDataRaw.filter(val => val.selected).map((el) => {
            return el.data.map((value) => {
                return {
                    "selected": value.selected,
                    "value": value.value,
                }
            })
        }).flat()
    },
    set: ({ set, get }, newValue) => {
        let filteredCVsDataRaw = get(certificationCluster);
        let theFilterCertificationData = get(filterCertificationData);
        var copyFilteredCVsDataRaw = JSON.parse(JSON.stringify(filteredCVsDataRaw));
        copyFilteredCVsDataRaw.forEach((item) => {
            let foundItem = item.data.find((val) => val.value === newValue.value);
            if (foundItem) {
                foundItem.selected = !newValue.selected
                if (foundItem.selected) {
                    foundItem.data.forEach((innerItem) => {
                        innerItem.selected = true
                    })
                } else {
                    foundItem.data.forEach((innerItem) => {
                        innerItem.selected = false
                    })
                }
            }
        })
        set(filterCertificationData, getUpdatedCertificationFilter(copyFilteredCVsDataRaw, theFilterCertificationData));
        set(certificationCluster, copyFilteredCVsDataRaw)
    }
});

const filterTopicChapterDataLevel3 = selector({
    key: "filterTopicChapterDataLevel3", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        let filteredCVsDataRaw = get(certificationCluster);
        let selectedValues = [];
        let myArray = filteredCVsDataRaw.filter(val => val.selected).map((el) => {
            return el.data.filter(val => val.selected).map((value) => {
                return value.data.map((value1) => {
                    if (value1.selected) {
                        selectedValues.push(value1.value);
                    }
                    return value1.value
                })
            })
        }).flat(2)
        return [...new Set(myArray)].map((value) => {
            return {
                "selected": selectedValues.indexOf(value) >= 0,
                value
            }

        })

    },
    set: ({ set, get }, newValue) => {
        let filteredCVsDataRaw = get(certificationCluster);
        let theFilterCertificationData = get(filterCertificationData);
        var copyFilteredCVsDataRaw = JSON.parse(JSON.stringify(filteredCVsDataRaw));
        copyFilteredCVsDataRaw.forEach((item) => {
            item.data.forEach((innerItem) => {
                innerItem.data.forEach((innerstItem) => {
                    if (innerstItem.value === newValue.value) {
                        innerstItem.selected = !newValue.selected
                    }
                })
            })
        });

        let selectedValues = [];
        copyFilteredCVsDataRaw.filter(val => val.selected).map((el) => {
            return el.data.filter(val => val.selected).map((value) => {
                return value.data.map((value1) => {
                    if (value1.selected) {
                        selectedValues.push(value1.value);
                    }
                })
            })
        }).flat(2)
        set(filterCertificationData, getUpdatedCertificationFilter(copyFilteredCVsDataRaw, theFilterCertificationData));
        set(certificationCluster, copyFilteredCVsDataRaw)
    }
});

const getUpdatedCertificationFilter = (copyFilteredCVsDataRaw, theFilterCertificationData) => {
    let selectedValues = [];
    copyFilteredCVsDataRaw.filter(val => val.selected).map((el) => {
        return el.data.filter(val => val.selected).map((value) => {
            return value.data.map((value1) => {
                if (value1.selected) {
                    selectedValues.push(value1.value);
                }
            })
        })
    }).flat(2)
    return theFilterCertificationData.map((el) => {
        return {
            data: el.data,
            selected: selectedValues.indexOf(el.data) >= 0,
            visible: el.visible,
        };
    })
}

const CVsDataWithFilter = selector({
    key: "CVsDataWithFilter", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
        let filteredCVsData = get(CVsData);
        let filterLevelDataRaw = get(filterLevelData);
        let filterTopicChapterDataRaw = get(filterTopicChapterData);
        let filterCertificationDataRaw = get(filterCertificationData);
        let switchFilterLogicRaw = get(switchFilterLogic);


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

        if (switchFilterLogicRaw) {
            if (!!filterCertificationDataRaw.find(el => el.selected === true)) {
                filteredCVsData = filteredCVsData.filter((dasCV) => {
                    let x = filterCertificationDataRaw.filter(el => el.selected).map(el => el.data)
                    let y = dasCV.certificates.map(cer => cer.name)
                    return x.every(v => y.includes(v))
                })
            }
        } else {
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
        }


        return filteredCVsData





    },
});

export { filterLevelData, switchFilterLogic, filterTopicChapterData, CVsData, CVsDataWithFilter, filterCertificationData, certificationCluster, filterTopicChapterDataLevel3, filterTopicChapterDataLevel2, filterTopicChapterDataLevel1 };

