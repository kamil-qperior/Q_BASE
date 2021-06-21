//TODO get from DB

import {
  atom,
  
} from "recoil";

export const projectNames = [
  { title: "Project Name", year: 1994 },
];

export const policies = [
  "pm contact approved - always",
  "pm contact approved - on request",
  "pm contact not approved",
  "tbd",
  "string",
];

export const industires = ["consulting", "service company", "services", "automative/public sector", "insurance"];

export const technologies = ["SAP", "Java"];

export const procedures = ["business analysis", "cost reduction"];

export const status = ["tbd", "approved", "approval on request"];

const filterStatusData = atom({
  key: "filterStatusData", // unique ID (with respect to other atoms/selectors)
  default: status.map((el) => {
      return {
          "data": el,
          "selected": false,
          "visible": true
      }
  }), // default value (aka initial value)
});

export const languageObjects = [
  {
    label: "English",
    value: "EN",
  },
  {
    label: "Deutsch",
    value: "DE",
  },
];

export const countries = {
  AT: {
    EN: "Austria",
    DE: "Österreich",
    migrationSource: "Wattens (Österreich)",
  },
  CH: {
    EN: "Switzerland",
    DE: "Schweiz",
    migrationSource: "Pensionskassen",
  },
  DE: {
    EN: "Germany",
    DE: "Deutschland",
    migrationSource: "Giessen (Deutschland)",
  },
  LI: {
    EN: "Liechtenstein",
    DE: "Liechtenstein",
    migrationSource: "Schaan (Liechtenstein)",
  },
  US: {
    EN: "United States",
    DE: "USA",
    migrationSource: "Industrieunternehmen (Diverse)",
  },
  IN: {
    EN: "Canada",
    DE: "Indien",
    migrationSource: "Indien)",
  },
  FR: {
    EN: "France",
    DE: "Frankreich",
    migrationSource: "Paris (Frankreich)",
  },
  ES: {
    EN: "Spain",
    DE: "Spanien",
    migrationSource: "Zaragoza (Spanien)",
  },
  RO: {
    EN: "Romania",
    DE: "Rumänien",
    migrationSource: "Bukarest (Rumänien)",
  },
  GR: {
    EN: "Greece",
    DE: "Griechenland",
    migrationSource: "Athen (Griechenland)",
  },
  SI: {
    EN: "Slovenia",
    DE: "Slowenien",
    migrationSource: "Wien (Österreich) / Ljubljana (Slowenien)",
  },
  GB: {
    EN: "United Kingdom",
    DE: "Vereinigtes Königreich",
    migrationSource: "UK",
  },
  CA: {
    EN: "Canada",
    DE: "Kanada",
    migrationSource: "Munich Re",
  },
  IT: {
    EN: "Switzerland",
    DE: "Italien",
    migrationSource: "Versicherung",
  },
  LU: {
    EN: "Luxembourg",
    DE: "Luxemburg",
    migrationSource: "Luxemburg",
  },
};

export const cities = {
  Vienna: {
    EN: "Vienna",
    DE: "Wien",
    migrationSource: "Wien (Österreich)",
  },
  Baden: {
    EN: "Baden",
    DE: "Baden",
    migrationSource: "Baden (Schweiz)",
  },
  Linz: {
    EN: "Linz",
    DE: "Linz",
    migrationSource: "Linz (Österreich)",
  },
  Steinhausen: {
    EN: "Steinhausen",
    DE: "Steinhausen",
    migrationSource: "Steinhausen (Schweiz)",
  },
  Munich: {
    EN: "Munich",
    DE: "München",
    migrationSource: "Munich (Germany)",
  },
  Bern: {
    EN: "Bern",
    DE: "Bern",
    migrationSource: "Bern (Schweiz)",
  },
  Ingolstadt: {
    EN: "Ingolstadt",
    DE: "Ingolstadt",
    migrationSource: "Ingolstadt (Deutschland)",
  },
  undefined: {
    migrationSource: "Luxemburg",
  },
  Ludwigshafen: {
    EN: "Ludwigshafen",
    DE: "Ludwigshafen am Rhein",
    migrationSource: "Ludwigshafen (Deutschland)",
  },
  Limburgerhof: {
    EN: "Limburgerhof",
    DE: "Limburgerhof",
    migrationSource: "Limburgerhof (Deutschland)",
  },
  "Zeulenroda-Triebes": {
    EN: "Zeulenroda-Triebes",
    DE: "Zeulenroda-Triebes",
    migrationSource: "Zeulenroda (Deutschland)",
  },
  Klosterneuburg: {
    EN: "Klosterneuburg",
    DE: "Klosterneuburg",
    migrationSource: "Klosterneuburg (Österreich)",
  },
  Regensburg: {
    EN: "Regensburg",
    DE: "Regensburg",
    migrationSource: "Regensburg (Deutschland)",
  },
  Berlin: {
    EN: "Berlin",
    DE: "Berlin",
    migrationSource: "Berlin",
  },
  Hanover: {
    EN: "Hanover",
    DE: "Hannover",
    migrationSource: "Hannover",
  },
  Stuttgart: {
    EN: "Stuttgart",
    DE: "Aachen",
    migrationSource: "Medizin- und Kraftwerkstechnik",
  },
  Bonn: {
    EN: "Bonn",
    DE: "Bonn",
    migrationSource: "Bonn (Deutschland)",
  },
  Frankfurt: {
    EN: "Frankfurt",
    DE: "Frankfurt am Main",
    migrationSource: "Frankfurt (Deutschland)",
  },
  Karlsruhe: {
    EN: "Karlsruhe",
    DE: "Karlsruhe",
    migrationSource: "Karlsruhe (Deutschland)",
  },
  Schwertberg: {
    EN: "Schwertberg",
    DE: "Schwertberg",
    migrationSource: "Schwertberg (Österreich)",
  },
  Essen: {
    EN: "Essen",
    DE: "Essen",
    migrationSource: "Essen (Deutschland)",
  },
  Weinheim: {
    EN: "Weinheim",
    DE: "Weinheim",
    migrationSource: "Weinheim (Deutschland)",
  },
  "Rapperswil-Jona": {
    EN: "Rapperswil-Jona",
    DE: "Rapperswil-Jona",
    migrationSource: "Rapperswil-Jona  (Schweiz)",
  },
  Rosenheim: {
    EN: "Rosenheim",
    DE: "Rosenheim",
    migrationSource: "Rosenheim (Deutschland)",
  },
  Limburg: {
    EN: "Limburg",
    DE: "Limburg an der Lahn",
    migrationSource: "Limburg an der Lahn (Deutschland)",
  },
  Ottobrunn: {
    EN: "Ottobrunn",
    DE: "Ottobrunn",
    migrationSource: "Ottobrunn (Deutschland)",
  },
  Reutlingen: {
    EN: "Reutlingen",
    DE: "Reutlingen",
    migrationSource: "Reutlingen (Deutschland)",
  },
  Fürth: {
    EN: "Fürth",
    DE: "Fürth",
    migrationSource: "Fürth (Deutschland)",
  },
  Zürich: {
    EN: "Zürich",
    DE: "Zürich",
    migrationSource: "Pensionskassen",
  },
  Kassel: {
    EN: "Kassel",
    DE: "Kassel",
    migrationSource: "Kassel (Deutschland)",
  },
  Aarau: {
    EN: "Aarau",
    DE: "Aarau",
    migrationSource: "Aarau (Schweiz)",
  },
  Basel: {
    EN: "Basel",
    DE: "Basel",
    migrationSource: "Basel (Schweiz)",
  },
  Offenbach: {
    EN: "Offenbach",
    DE: "Offenbach am Main",
    migrationSource: "Offenbach (Deutschland)",
  },
  Heidelberg: {
    EN: "Heidelberg",
    DE: "Heidelberg",
    migrationSource: "Heidelberg",
  },
  Ditzingen: {
    EN: "Ditzingen",
    DE: "Ditzingen",
    migrationSource: "Ditzingen (Deutschland)",
  },
  "Sterling Heights": {
    EN: "Sterling Heights",
    DE: "Grand Haven",
    migrationSource: "Automobilindustrie",
  },
  Attendorn: {
    EN: "Attendorn",
    DE: "Attendorn",
    migrationSource: "Attendorn (Deutschland)",
  },
  Mannheim: {
    EN: "Mannheim",
    DE: "Mannheim",
    migrationSource: "Mannheim (Deutschland)",
  },
  Nuremberg: {
    EN: "Nuremberg",
    DE: "Nürnberg",
    migrationSource: "Nürnberg",
  },
  Graz: {
    EN: "Graz",
    DE: "Graz",
    migrationSource: "Graz (Österreich)",
  },
  Heroldsberg: {
    EN: "Heroldsberg",
    DE: "Heroldsberg",
    migrationSource: "Heroldsberg (Deutschland)",
  },
  Münster: {
    EN: "Münster",
    DE: "Münster",
    migrationSource: "Münster/",
  },
  Eschborn: {
    EN: "Eschborn",
    DE: "Eschborn",
    migrationSource: "Eschborn (Deutschland)",
  },
  Hamburg: {
    EN: "Hamburg",
    DE: "Hamburg",
    migrationSource: "Hamburg (Deutschland)",
  },
  Düsseldorf: {
    EN: "Düsseldorf",
    DE: "Düsseldorf",
    migrationSource: "Düsseldorf",
  },
  Wuppertal: {
    EN: "Wuppertal",
    DE: "Wuppertal",
    migrationSource: "Wuppertal (Deutschland)",
  },
  Latrobe: {
    EN: "Latrobe",
    DE: "Latrobe",
    migrationSource: "Industrieunternehmen",
  },
  Montréal: {
    EN: "Montréal",
    migrationSource: "Indien)",
  },
  Lenexa: {
    EN: "Lenexa",
    DE: "Lenexa",
    migrationSource: "Pharma & Healthcare (Diverse)",
  },
  Nürnberg: {
    EN: "Nürnberg",
    DE: "Nürnberg",
    migrationSource: "Öffentlicher",
  },
  Horgen: {
    EN: "Horgen",
    DE: "Horgen",
    migrationSource: "Schweiz (laufendes Projekt)",
  },
  Oberbüren: {
    EN: "Oberbüren",
    DE: "Oberbüren",
    migrationSource: "Oberbüren (Schweiz)",
  },
  Neckarsulm: {
    EN: "Neckarsulm",
    DE: "Neckarsulm",
    migrationSource: "Neckarsulm (Deutschland)",
  },
  Wattens: {
    EN: "Wattens",
    DE: "Wattens",
    migrationSource: "Wattens (Österreich)",
  },
  Mainz: {
    EN: "Mainz",
    DE: "Mainz",
    migrationSource: "Mainz",
  },
  Lüdenscheid: {
    EN: "Lüdenscheid",
    DE: "Lüdenscheid",
    migrationSource: "Lüdenscheid",
  },
  Unterföhring: {
    EN: "Unterföhring",
    DE: "Unterföhring",
    migrationSource: "Unterföhring (Deutschland)",
  },
  Oberursel: {
    EN: "Oberursel",
    DE: "Oberursel (Taunus)",
    migrationSource: "Oberursel (Deutschland)",
  },
  Paris: {
    EN: "Paris",
    DE: "Paris",
    migrationSource: "Paris (Frankreich)",
  },
  Cologne: {
    EN: "Cologne",
    DE: "Köln",
    migrationSource: "Cologne (Germany)",
  },
  Winterthur: {
    EN: "Winterthur",
    DE: "Winterthur",
    migrationSource: "Winterthur (Schweiz)",
  },
  "New York": {
    EN: "New York",
    DE: "New York City",
    migrationSource: "New York",
  },
  "Bad Homburg": {
    EN: "Bad Homburg",
    DE: "Bad Homburg vor der Höhe",
    migrationSource: "Bad Homburg (Deutschland)",
  },
  "Frankfurt (Oder)": {
    EN: "Frankfurt (Oder)",
    DE: "Heilbronn",
    migrationSource: "Frankfurt (Deutschland; Filiale Heilbronn)",
  },
  Lucerne: {
    EN: "Lucerne",
    DE: "Luzern",
    migrationSource: "Luzern (Schweiz)",
  },
  Augsburg: {
    EN: "Augsburg",
    DE: "Augsburg",
    migrationSource: "Augsburg (Deutschland)",
  },
  Zaragoza: {
    EN: "Zaragoza",
    DE: "Saragossa",
    migrationSource: "Zaragoza (Spanien)",
  },
  Bucharest: {
    EN: "Bucharest",
    DE: "Bukarest",
    migrationSource: "Bukarest (Rumänien)",
  },
  Athens: {
    EN: "Athens",
    DE: "Athen",
    migrationSource: "Athen (Griechenland)",
  },
  München: {
    EN: "München",
    DE: "München",
    migrationSource: "München/Madrid (Deutschland/Spanien)",
  },
  Dübendorf: {
    EN: "Dübendorf",
    DE: "Bozen",
    migrationSource: "Versicherung",
  },
  "St. Gallen": {
    EN: "St. Gallen",
    DE: "St. Gallen",
    migrationSource: "St. Gallen (Schweiz)",
  },
  Coburg: {
    EN: "Coburg",
    DE: "Coburg",
    migrationSource: "COBURG (Deutschland)",
  },
  Toronto: {
    EN: "Toronto",
    DE: "Toronto",
    migrationSource: "Munich Re",
  },
  Brunswick: {
    EN: "Brunswick",
    DE: "Braunschweig",
    migrationSource: "Braunschweig (Deutschland)",
  },
  Saarbrücken: {
    EN: "Saarbrücken",
    DE: "Saarbrücken",
    migrationSource: "Saarbrücken (Deutschland)",
  },
  Giessen: {
    EN: "Giessen",
    DE: "Gießen",
    migrationSource: "Giessen (Deutschland)",
  },
  Seward: {
    EN: "Seward",
    DE: "Seward",
    migrationSource: "Ausgestaltung",
  },
  "Carl Junction": {
    EN: "Carl Junction",
    DE: "Ardmore",
    migrationSource: "Industrieunternehmen (Diverse)",
  },
};



export { filterStatusData}