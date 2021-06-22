/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const i18n_de = require('./i18n_de.json');
const i18n_en = require('./i18n_en.json');


const i18n = (lang, ...agrs) => {

    lang = lang ? lang.toLowerCase() : 'de';
    // i18next.changeLanguage(lang);
    let searchString = '';
    switch (lang) {
        case 'de':
            searchString = getText(i18n_de, agrs[0]);
            // searchString = i18next.t(agrs[0]);
            return replaceStringWithValues(searchString, agrs);
        case 'en':
            searchString = getText(i18n_en, agrs[0]);
            // searchString = i18next.t(agrs[0]);
            return replaceStringWithValues(searchString, agrs);
        default:
            searchString = getText(i18n_de, agrs[0]);
            return replaceStringWithValues(searchString, agrs);
    }
}

// get value by property string in json object
const getText = (obj, prop, defval) => {
    if (typeof defval == 'undefined') defval = null;
    prop = prop.split('.');
    for (var i = 0; i < prop.length; i++) {
        if (typeof obj[prop[i]] == 'undefined')
            return defval;
        obj = obj[prop[i]];
    }
    return obj;
}


const replaceStringWithValues = (strg, values) => {
    values.slice(1).map((el, index) => {
        strg = strg.replace(`{${index}}`, el)
    });
    return strg;
}


export {
    i18n
}
