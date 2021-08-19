export const token = 'Bearer ' + process.env.REACT_APP_TOKEN

const host1 = 'http://[::1]:3000'
const host = 'https://qperior-reference-mgmt-api.azurewebsites.net/'
export const cvsUrl = host + '/generateCVs?';
export const cvsDelete = host + '/old-cvs';
export const cvsSetSelection = host + '/all-old-cvs';

const fakeData = [
    {
        "cvFolder": "Phamcccc Quoc-Son (CIS T&I DE)",
        "name": "JAAn Quoc-Son",
        "topicChapter": "CIS T&I DE",
        "level": "Managing Consultant",
        "consultingEmphasis": [
            "Systemeinf\u00fchrungen und Migrationen",
            "Customer Experience",
            "Anwendung agiler Methoden und agiles Coaching",
            "Beratung, Konzeption und Umsetzung von Realtimemonitoring"
        ],
        "industryKnowHow": [
            "Versicherung",
            "Bank",
            "Dienstleister",
            "Logistik",
            "Telekommunikation",
            "Transport"
        ],
        "technicalAndMethodologicalCompetence": [
            "Entwicklung und begleitete Umsetzung von Zielarchitekturen",
            "Analyse und Bewertung von Serviceorientierte Architektur (SOA)",
            "Analyse-, Konzeption und Implementierung von Softwarel\u00f6sungen mit Web- und Open Source Technologien",
            "Umsetzung und Optimierungen von Realtimereportingl\u00f6sungen",
            "Einf\u00fchrung, Umsetzung, Upgrade und Optimierungen von Customer Experience Management L\u00f6sungen",
            "Integration und Migration ",
            "Anwendungsentwicklung",
            "Performance Management",
            "Analytisches Denken und Handeln",
            "Planungs- und Organisationsf\u00e4higkeit",
            "Pr\u00e4sentation",
            "Agile Methoden Scrum (insbesondere die Ausf\u00fchrung der Rolle Scrum Master) und Kanban",
            "Business Agilit\u00e4t (Flight Levels Systems)",
            "IT-Service Management",
            "Kennzahlensysteme, Service Level Agreements",
            "Konzeption und Durchf\u00fchrung von Schulungen",
            "Planung von zeitkritischen Zeitr\u00e4umen mittels Cut-Over-Pl\u00e4nen, Rollout-Pl\u00e4nen und Drehb\u00fcchern"
        ],
        "itCompetence": [
            "Technologien:",
            "PHP, Java, C#, HTML 5, CSS 3, JavaScript, SQL",
            "jQuery, Bootstrap, Smarty, Hibernate, Icefaces, AngularJS, D3",
            "SIP, VoIP",
            "Cloud Computing",
            "Blockchain",
            "Applikationen/Produkte:",
            "MS Project",
            "HP ALM, SoapUI",
            "Windows Server (2003, 2008 und 2012), Linux",
            "Apache Tomcat, Apache http Server, Liferay",
            "MySQL, MSSQL, Oracle, PostgreSQL, DB2",
            "Ityx AI Platform, Response",
            "Purpleview CC-Suite (Enterprise Insight)",
            "Genesys Framework, Interactive Intelligence Framework",
            "Adobe Photoshop, Lightroom"
        ],
        "certificates": [
            {
                "name": "unknown",
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Genesys Certified Inbound Voice 8 Consultant (2015)",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/CV_Pham_Quoc-Son_de_Mai21.docx"
            },
            {
                "name": "ITIL Foundation Certificate in IT Service Management",
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "ITIL\u00ae Foundation Certificate in IT Service Management, Edition 2011 (2018)",
                "nameAccuracy": 0.6216216216216216,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/CV_Pham_Quoc-Son_de_Mai21.docx"
            },
            {
                "name": "Certified ScrumMaster",
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Certified ScrumMaster\u00ae (CSM\u00ae) (2018; 2020)",
                "nameAccuracy": 0.47619047619047616,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/CV_Pham_Quoc-Son_de_Mai21.docx"
            },
            {
                "name": "unknown",
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Flight Levels Systems Architecture (2020)",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/CV_Pham_Quoc-Son_de_Mai21.docx"
            },
            {
                "name": "Certified SAFe 5 Agilist",
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Certified SAFe 5 Agilist (2020)",
                "nameAccuracy": 0.6774193548387096,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/CV_Pham_Quoc-Son_de_Mai21.docx"
            },
            {
                "name": "Certified ScrumMaster",
                "filename": "Quoc-Son_Pham_Flight Levels Systems Architecture Certificate of Completion_20200131.pdf",
                "rawName": "Quoc-Son_Pham_Flight Levels Systems Architecture Certificate of Completion_20200131",
                "nameAccuracy": 0.9649589285254478,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/Quoc-Son_Pham_Flight%20Levels%20Systems%20Architecture%20Certificate%20of%20Completion_20200131.pdf"
            },
            {
                "name": "unknown",
                "filename": "Quoc-Son_Pham_Genesys Certified Inbound Voice 8 Consultant_20150527 - 20170527.pdf",
                "rawName": "Quoc-Son_Pham_Genesys Certified Inbound Voice 8 Consultant_20150527 - 20170527",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/Quoc-Son_Pham_Genesys%20Certified%20Inbound%20Voice%208%20Consultant_20150527%20-%2020170527.pdf"
            },
            {
                "name": "ITIL Foundation Certificate in IT Service Management",
                "filename": "Quoc-Son_Pham_ITIL Foundation Certificate in IT Service Management_20180212.pdf",
                "rawName": "Quoc-Son_Pham_ITIL Foundation Certificate in IT Service Management_20180212",
                "nameAccuracy": 0.9769474416971207,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/Quoc-Son_Pham_ITIL%20Foundation%20Certificate%20in%20IT%20Service%20Management_20180212.pdf"
            },
            {
                "name": "Certified SAFe 5 Agilist",
                "filename": "Quoc-Son_Pham_SAFe 5 Agilist_20201221 - 20211220.pdf",
                "rawName": "Quoc-Son_Pham_SAFe 5 Agilist_20201221 - 20211220",
                "nameAccuracy": 0.9950504414737225,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/Quoc-Son_Pham_SAFe%205%20Agilist_20201221%20-%2020211220.pdf"
            },
            {
                "name": "Certified ScrumMaster",
                "filename": "Quoc-Son_Pham_ScrumAlliance Certified Scrum Master Certificate_20180706 - 20220706.pdf",
                "rawName": "Quoc-Son_Pham_ScrumAlliance Certified Scrum Master Certificate_20180706 - 20220706",
                "nameAccuracy": 0.9651925265789032,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pham%20Quoc-Son%20(CIS%20T%26I%20DE)/Quoc-Son_Pham_ScrumAlliance%20Certified%20Scrum%20Master%20Certificate_20180706%20-%2020220706.pdf"
            }
        ],
        "languages": [
            "Deutsch (Muttersprache)",
            "Englisch (Flie\u00dfend)",
            "Vietnamesisch (Grundkenntnisse)",
            "Franz\u00f6sisch (Grundkentnisse)"
        ],
        "projectexperience": [
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Migration des klassischen Lebensversicherungsbestandes (~5,7 Mio. Vertr\u00e4ge) auf eine Run-Off Plattform auf Basis der msg Life Factory im Joint Venture mit IBM im Programm MLK (Migration Leben Klassik), ERGO, D\u00fcsseldorf, Deutschland (seit Januar 2020)",
                "details": [
                    "Erstellung des Drehbuchs f\u00fcr die Einf\u00fchrung und Migration der ersten Tranche ",
                    "Koordination und Etablierung eines Gesamtprozesses zur Einf\u00fchrung und Migration von Vertr\u00e4gen auf einem HOST-Bestandssystem in eine moderne Run-Off Plattform auf Basis der msg Life Factory (LF)",
                    "Enge Abstimmung mit den betroffenen Bereichen (wie Fachbereich, Inputmanagement, In-/Exkasso, Betrieb) und Systemen (wie LF, SAP, Dokumentenarchiv) der Ist-Umgebung und der Ziel-Umgebung, sowie Sicherstellung das Vertr\u00e4ge im Altsystem \u201egeschlossen\u201c werden.",
                    "Sicherstellung, dass qualitative und quantitative Pr\u00fcfungen im Drehbuchablauf ber\u00fccksichtigt werden (korrekte Transformation und Migration, Vollst\u00e4ndigkeit und Nachverfolgbarkeit von Aussteuerungen, Bilanzpr\u00fcfungen, Wirtschaftspr\u00fcfer, Revision, vertragliche Vereinbarungen, etc.)",
                    "Iterative Verifikation der Drehbuchqualit\u00e4t \u00fcber beispielsweise (Teil-)Verprobungen und Generalproben, die den zeitlichen, technischen sowie fachlichen Ablauf beinhalten",
                    "Durchf\u00fchrung von Drehbuch Deep Dives mit Stakeholdern der beteiligten Unternehmen",
                    "Begleitung der Tests ab dem Zeitpunkt der Migration (bis hin zum kontrollierten Start, z.B. Pr\u00fcfung der Vorschau Dopix-Druckst\u00fccken bis hin zum physischen Druck und Beobachtung vom ersten Lauf der Regelbatches, der Plattform)",
                    "Planung und Besetzung einer Einsatzzentrale und Sicherstellung einer durchgehenden (24/7) Entscheidungsf\u00e4higkeit 24/7 durch einen MOD (Manager on Duty)",
                    "Einrichtung von Informationskan\u00e4len zum aktuellen Status (Dailies morgens und abends, Erreichbarkeit der Einsatzzentrale \u00fcber zentrale Rufnummer, Webseiten mit aktuellem Status, t\u00e4gliche Statusmails an den Vorstand)",
                    "\u00dcbernahme weiterer Aufgaben im Bereich des Einf\u00fchrungsmanagements",
                    "Erstellung und Durchf\u00fchrung von Pr\u00e4sentationen auf Vorstands- und Top Managementebene, u.a. zum Aufzeigen von Konflikten in vertraglich festgelegten Meilensteinen, Entscheidungsvorlagen, etc.",
                    "Regelm\u00e4\u00dfige Durchf\u00fchrung von und Teilnahme an JF mit Programmbereichen innerhalb der Organisation [ERGO] und den beteiligten Partnern [IBM und msg] ",
                    "Definition und Abgrenzung der Aufgaben des Einf\u00fchrungsmanagements",
                    "Durchf\u00fchrung von Workshops zum Einf\u00fchrungsmanagement mit den beteiligten Bereichen aus dem Programm und der Linie",
                    "Agile, standort\u00fcbergreifende Zusammenarbeit mit involvierten Teams nach Flight Level",
                    "Durchf\u00fchrung von Trainings zu Kanban Grundlagen",
                    "Aufbau eines Standort\u00fcbergreifen digitalen Kanban-Boards (Flight Level 2) mit den Teams",
                    "Moderation und Durchf\u00fchrung von Weeklys",
                    "Revisionssichere Dokumentation der Arbeitsergebnisse",
                    "Zusammenarbeit mit der 2nd Line f\u00fcr die Sicherstellung nachvollziehbarer Migrationsergebnisse",
                    "Verst\u00e4ndliche Abbildung hochkomplexer Prozesse (u.a. gemeinsam mit Vorstandsassistenz)"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "",
                "details": []
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Bestandsfehlerkorrektur mit dem R\u00fcWa/KoGe (R\u00fccknahme Wiederansage/Korrektur GeVo) und RNGF (R\u00fccknahme gesamtvertragliche Fortschreibung) Verfahren im NELSON Programm, ERGO, D\u00fcsseldorf, Deutschland (Oktober 2018 \u2013 Dezember 2019)",
                "details": [
                    "\u00dcbernahme der Rolle des Scrum Masters ab Mai 2019",
                    "Planung und Durchf\u00fchrung der Scrum Meetings (Daily, Refinement, Review, Retro, Planning)",
                    "Unterst\u00fctzung des Teams und PO (Product Owner)",
                    "Administration des MS TFS (Team Foundation Server)",
                    "Arbeit nach agiler Vorgehensweise innerhalb eines Scrum Teams",
                    "Anwendung einer Prozessautomatisierungsl\u00f6sung mit\u00a0Robotic Process Automation\u00a0(RPA) auf Basis von Camunda",
                    "Steuerung der Agenten",
                    "Monitoring der Agenten und Durchlaufmengen",
                    "KPI-Reporting an Stakeholder",
                    "Erstellung eines Drehbuchs f\u00fcr einen Korrekturzeitraum von 16 Tagen",
                    "Durchf\u00fchrung von Workshops und Interviews mit den Stakeholdern",
                    "Zusammentragen der einzelnen Teilprozesse im Gesamtprozess",
                    "Identifikation von Voraussetzungen, um die Aktionen im Drehbuch durchzuf\u00fchren",
                    "Ermittlung der fachlichen, technischen und durchf\u00fchrenden Verantwortlichkeiten ",
                    "Definition von Haltepunkten f\u00fcr Managemententscheidungen",
                    "Kommunikationsmatrix mit Kontaktdaten",
                    "Zeitliche Planung des teilweise sequenziellen und teilweise parallelen Ablaufs",
                    "Kontinuierliche Aktualisierung des Drehbuchs",
                    "Aufstellen einer Ressourcenplanung f\u00fcr eine 24/7 Bereitschaft w\u00e4hrend des Korrekturzeitraums",
                    "Erstellung eines Monitoringkonzeptes mit Kennzahlen und Schwellwerten damit der automatisierte Korrekturprozess \u00fcberwacht werden kann",
                    "Erstellung von Managementfolien, u.a. Visualisierung des Gesamtprozesses f\u00fcr das Management",
                    "Verifikation des Plans auf Machbarkeit mittels Generalproben, Lasttests etc.",
                    "Organisation und Betrieb der n\u00f6tigen Einsatzzentrale zur Umsetzung der Massenkorrektur",
                    "Stakeholdermanagement auf Top-Management-Ebene und Einbeziehung aller Experten (Mainframe, DB2, Eingangsmanagement/Dunkelverarbeitung, Bilanz, etc.)",
                    "Erstellung einer revisionssicheren Dokumentation",
                    "Unterst\u00fctzung bei Mainframe Lasttests"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "",
                "details": ["\n"]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Testmanagement im Projekt \u201eVermittlung von KV-Zusatzprodukten der ERGO Direkt durch ERGO Vertriebspartner\u201c, ITERGO, D\u00fcsseldorf, Deutschland (September 2018)",
                "details": [
                    "Initialisierung des Testmanagements",
                    "Strukturierung und Einrichtung des Testtools HP ALM",
                    "Einarbeitung des Testmanagers"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "",
                "details": []
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Testmanagement einer BMC Remedy Suite Einf\u00fchrung im Rahmen des Infrastructure Transformation Programms (ITP), ITERGO, D\u00fcsseldorf, Deutschland (Juli 2017 \u2013 August 2018)",
                "details": [
                    "Infrastructure Transformation Program (ITP):\u00a0 Einf\u00fchrung des globalen IT-Service Management Tools (BMC Remedy Suite), um eine homogene IT-Landschaft mit multi-Provider-Management herzustellen",
                    "Initialisierung des Testmanagements, u. a. Festlegung der Vorgehensweise und Prozesse unter Einbeziehung der verschiedenen Stakeholder",
                    "Aufbau einer Testorganisation mit allen im Programm enthaltenen Projekten",
                    "Managing und Coaching der Test Leads pro Projekt/Prozess",
                    "Erstellung individueller Testpl\u00e4ne",
                    "Informationsweitergabe an alle Testleads",
                    "Strukturierung der Tests",
                    "Aufwandssch\u00e4tzungen",
                    "Probleml\u00f6sungen",
                    "Einf\u00fchrung einer Teststrategie mit Standards und Qualit\u00e4tskriterien (inkl. Testkonzept)",
                    "Strukturierung und Einrichtung des Testtools HP ALM, Erstellung von f\u00fcr das Programm ma\u00dfgeschneiderten Trainingsunterlagen und Einweisung der Beteiligten in HP ALM",
                    "Festlegung des Fehlermanagement Prozesses",
                    "Reporting und Tracking des Fortschritts und Erstellung eines programmweiten Test Status Berichts mit den wichtigsten KPIs"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "",
                "details": []
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Entwicklung einer offlinef\u00e4higen und auf Webtechnologien basierenden Beratungsanwendung, Versicherung, Winterthur, Schweiz (April 2017 \u2013 Juli 2017)",
                "details": [
                    "Umsetzung des vorgegebenen Corporate Designs/Corporate Identity auf Basis von HTML, CSS und Javascript",
                    "Realisierung von Sonderw\u00fcnschen \u00fcber das CI/CD hinaus und Touch Optimierungen",
                    "Implementierung von Anforderungen auf Basis von AngularJS",
                    "Entwicklung von individuellen Diagrammen auf Basis des D3-Frameworks",
                    "Pflege und Wartung der Anwendung",
                    ""
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Entwicklung eines regelbasierten BiPRO Webservice Tarifierung, Angebot, Antrag Zahnzusatzversicherung, Versicherungskammer Bayern, M\u00fcnchen, Deutschland\n(M\u00e4rz 2017 \u2013 April 2017)",
                "details": [
                    "Erstellung von BiPRO und IBM DataPower konformen SOAP-Webserviceanfragen und Tests unter Anwendung von XML Spy und SOAP UI zum Testen des entwickelten Webservices",
                    "Fehlerbehebung der Implementierung auf Basis der verwendeten Technologien JEE, Drools Rule Engine und IBM WebSphere 8.5 ",
                    ""
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Konzeption und Implementierung einer deutschlandweitern Customer Experience Plattform auf Basis von Interactive Intelligence, Bankenbereich, Bonn, Deutschland (Februar 2016 \u2013 Januar 2017)",
                "details": [
                    "Erstellung und Durchf\u00fchrung von Tests zur Qualit\u00e4tssicherung der Lieferleistungen",
                    "Steuerung des Herstellers",
                    "Vorbereitung und Durchf\u00fchrung von Schulungen als Vorbereitung f\u00fcr die Inbetriebnahme",
                    "Begleitung der Inbetriebnahme",
                    "Konzeption und Umsetzung von Supportprozessen mit dem Kunden und Herstellern",
                    "Abstimmung mit Produkthersteller und Auftraggeber",
                    "Betreuung und Weiterentwicklung der Plattform im Last Level Support",
                    "Durchf\u00fchrung Workshop zur Optimierung des Systems",
                    "Umsetzung von Ma\u00dfnahmen zur Optimierung des Systems",
                    "Durchf\u00fchrung von Upgrades von Plattformkomponenten",
                    ""
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Konzeption und Implementierung einer internationalen Customer Experience Plattform auf Basis von Genesys, Bankenbereich, M\u00fcnchen, Deutschland (Oktober 2012 \u2013 Februar 2016)",
                "details": [
                    "Bewertung von Kundenanforderungen",
                    "Durchf\u00fchrung von Proof of Concepts",
                    "Durchf\u00fchrung von Tests zur Qualit\u00e4tssicherung",
                    "Technische Konzeption und Umsetzung von Erweiterungen der Realtimemonitoringl\u00f6sung",
                    "Umsetzung des Supportprozesses mit dem Kunden, Subunternehmern und Herstellern",
                    "Betreuung und Weiterentwicklung der Plattform im Last Level Support",
                    "Umsetzung von Ma\u00dfnahmen zur Optimierung des Systems",
                    "Durchf\u00fchrung von Upgrades von Plattformkomponenten",
                    ""
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Konzeption und Implementierung der \u201eLogistics Mall \u2013 Cloud Computing f\u00fcr die Logistik\u201c im Innovationscluster, Logistik, Dortmund, Deutschland (Dezember 2009 \u2013 September 2012)",
                "details": [
                    "Vergleich und Bewertung von freien L\u00f6sungen f\u00fcr den Bereich Business Intelligence",
                    "Erstellung von JSR286-Portles f\u00fcr Liferay",
                    "Erstellung von Webservices auf XML Basis (SOAP)",
                    "Umsetzung von Templates/Themes unter Ber\u00fccksichtigung vorgegebener Designvorgaben",
                    "Umsetzung des Business Object Model OAGiS 9.5.1 Overlay for Logisitcs",
                    ""
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Konzeption und Umsetzung eines mehrsprachigen Online-Content-Management-Systems zur Eventabwicklung, Logistik, Bonn, Deutschland (2009)",
                "details": [
                    "Erstellung des technischen Konzepts",
                    "Machbarkeitsanalyse zum Einsatz von QR-Codes",
                    "Implementierung des Systems auf Basis von PHP, HTML, CSS, Javascript und XML (SOAP)",
                    "Begleitung der Inbetriebnahme"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "",
                "details": []
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Relaunch einer bestehenden Kundenbindungswebseite im neuen Corporate Design/Corporate Identity, Logistik, Bonn, Deutschland (2009)",
                "details": [
                    "Umsetzung des vorgegebenen Corporate Designs/Corporate Identity auf Basis von HTML, CSS und Javascript",
                    "Begleitung der Inbetriebnahme"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "",
                "details": []
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Konzeption und Implementierung einer Landingpage zur Leadgenerierung, Logistik, D\u00fcsseldorf, Deutschland (2009)",
                "details": [
                    "Aufnahme und Konkretisierung der Anforderungen",
                    "Erstellung des technischen Konzepts",
                    "Realisierung der Landingpage",
                    "Begleitung der Inbetriebnahme"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Konzeption und Umsetzung eines Gadgets f\u00fcr die personalisierte iGoogle Startseite, Logistik, Bonn, Deutschland (2009)",
                "details": [
                    "Erstellung des technischen Konzepts",
                    "Implementierung des Gadgets auf Basis von HTML, CSS, Javascript und XML (SOAP)",
                    "Begleitung der Inbetriebnahme"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "",
                "details": []
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Umsetzung von einer Realtimemonitoringl\u00f6sung zur internen Performance\u00fcberwachung im Contact Center auf Basis von Web Enterprise Monitoring (WEM), Telekommunikation, Bonn, Deutschland (2007 - 2009)",
                "details": [
                    "Erstellen eines Schirms zur Kundendemonstration",
                    "Erstellen der Schirme mit Kennzahlen f\u00fcr den produktivbetrieb",
                    "Begleitung der Inbetriebnahme"
                ]
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "",
                "details": []
            },
            {
                "filename": "CV_Pham_Quoc-Son_de_Mai21.docx",
                "rawName": "Umsetzung eines interaktiven Voice Portals zur Kundenvorqualifizierung auf Basis von VoiceObjects, Versicherungsbranche, Braunschweig, Deutschland (2006)",
                "details": [
                    "Umsetzung des vorgegebenen Voice User Interfaces (VUI) mit VoiceObjects",
                    "Testen und Feintuning der Spracherkennung",
                    "Begleitung der Inbetriebnahme",
                    ""
                ]
            }
        ]
    },
    {
        "cvFolder": "Philipsen, Henry (TTL)",
        "name": "Philipsen, Henry",
        "topicChapter": "TTL",
        "level": null,
        "consultingEmphasis": [
            "Projektmanagement und PMO",
            "Organisations- und Prozessoptimierung",
            "Gesch\u00e4ftsprozess- und Anforderungsmanagement",
            "Mobilit\u00e4tsmanagement",
            "Infrastrukturmanagement",
            "Projektmanagement und PMO",
            "Organisations- und Prozessoptimierung",
            "Gesch\u00e4ftsprozess- und Anforderungsmanagement",
            "Mobilit\u00e4tsmanagement",
            "Infrastrukturmanagement"
        ],
        "industryKnowHow": [
            "Automobilindustrie",
            "Transport und Logistik",
            "Mobilit\u00e4t",
            "Reise und Tourismus",
            "Automobilindustrie",
            "Transport und Logistik",
            "Mobilit\u00e4t",
            "Reise und Tourismus"
        ],
        "technicalAndMethodologicalCompetence": [
            "Konzeption zukunftsorientierter Mobilit\u00e4tsl\u00f6sungen (z.\u00a0B. in Verbindung mit autonomem Fahren)",
            "Innovative City-Logistik-Konzepte (z.\u00a0B. durch Einsatz von innerst\u00e4dtischen Micro-Hubs)",
            "Analyse und Optimierung von strategischen und operativen Logistikprozessen",
            "Prozessmodellierung",
            "Konzeption und Durchf\u00fchrung von Schulungen / Workshops",
            "Projekt Management und Projektmanagement Office",
            "Prozess Management und Gesch\u00e4ftsprozessoptimierung",
            "Interdisziplin\u00e4res Urteilsverm\u00f6gen",
            "Konzeptionelles und analytisches Denken",
            "Planungs- und Organisationsf\u00e4higkeit",
            "Moderation",
            "Pr\u00e4sentation",
            "Konzeption zukunftsorientierter Mobilit\u00e4tsl\u00f6sungen (z.\u00a0B. in Verbindung mit autonomem Fahren)",
            "Innovative City-Logistik-Konzepte (z.\u00a0B. durch Einsatz von innerst\u00e4dtischen Micro-Hubs)",
            "Analyse und Optimierung von strategischen und operativen Logistikprozessen",
            "Prozessmodellierung",
            "Konzeption und Durchf\u00fchrung von Schulungen / Workshops",
            "Projekt Management und Projektmanagement Office",
            "Prozess Management und Gesch\u00e4ftsprozessoptimierung",
            "Interdisziplin\u00e4res Urteilsverm\u00f6gen",
            "Konzeptionelles und analytisches Denken",
            "Planungs- und Organisationsf\u00e4higkeit",
            "Moderation",
            "Pr\u00e4sentation"
        ],
        "itCompetence": [
            "Kenntnisse in SAP-Modulen: MM",
            "Gesch\u00e4ftsprozessmodellierung: ARIS, AENEIS & Visio",
            "CAD-Programme: AutoCAD & Vectorworks",
            "Grafik- und Bildbearbeitung: Adobe Photoshop & CorelDRAW",
            "UI & UX Mockups / Skizzen (Balsamiq)",
            "3D-Modellierung (SketchUP Pro)",
            "Betriebssysteme: Windows & macOS",
            "Kenntnisse in SAP-Modulen: MM",
            "Gesch\u00e4ftsprozessmodellierung: ARIS, AENEIS & Visio",
            "CAD-Programme: AutoCAD & Vectorworks",
            "Grafik- und Bildbearbeitung: Adobe Photoshop & CorelDRAW",
            "UI & UX Mockups / Skizzen (Balsamiq)",
            "3D-Modellierung (SketchUP Pro)",
            "Betriebssysteme: Windows & macOS"
        ],
        "certificates": [],
        "languages": [
            "Deutsch (Muttersprache)",
            "Englisch (flie\u00dfend)",
            "Deutsch (Muttersprache)",
            "Englisch (flie\u00dfend)"
        ],
        "projectexperience": [
            {
                "filename": "CV_Henry_Philipsen_de_Apr_2021.docx",
                "rawName": "Micro-Hub-Strukturen als Grundlage innovativer City-Logistik-Konzepte, Fraunhofer IAO (Juli 2018 \u2013 Dezember 2018)",
                "details": [
                    "Business Analyst",
                    "Durchf\u00fchrung einer Marktanalyse zu Micro-Hubs",
                    "Evaluierung der allgemeinen Anforderungen",
                    "Definition von Micro-Hub-Typen anhand der Anforderungen und bestehender Projekte",
                    "Clusterung der Micro-Hub-Typen",
                    "Praxisbezogene Betrachtung durch Projektion auf ein Untersuchungsgebiet",
                    "Ableitung von Gestaltungsanforderungen und Handlungsempfehlungen",
                    ""
                ]
            },
            {
                "filename": "CV_Henry_Philipsen_de_Mrz_2021.docx",
                "rawName": "Micro-Hub-Strukturen als Grundlage innovativer City-Logistik-Konzepte, Fraunhofer IAO (Juli 2018 \u2013 Dezember 2018)",
                "details": [
                    "Business Analyst",
                    "Durchf\u00fchrung einer Marktanalyse zu Micro-Hubs",
                    "Evaluierung der allgemeinen Anforderungen",
                    "Definition von Micro-Hub-Typen anhand der Anforderungen und bestehender Projekte",
                    "Clusterung der Micro-Hub-Typen",
                    "Praxisbezogene Betrachtung durch Projektion auf ein Untersuchungsgebiet",
                    "Ableitung von Gestaltungsanforderungen und Handlungsempfehlungen",
                    ""
                ]
            }
        ]
    },
    {
        "cvFolder": "Pieczara Karol (SAP BIA AT)",
        "name": "Pieczara Karol",
        "topicChapter": "SAP BIA AT",
        "level": "Senior Consultant",
        "consultingEmphasis": [
            "BI & Analytics Architekturen",
            "Qualit\u00e4tssicherung",
            "Projektreview",
            "Projektmanagement"
        ],
        "industryKnowHow": ["Versicherungen"],
        "technicalAndMethodologicalCompetence": [
            "Langj\u00e4hrige praktische Erfahrungen in allen Phasen eines SAP Implementierungsprojekts im Versicherungsumfeld, von Konzeption \u00fcber Design, Realisierung und Test, bis hin zu Betrieb und Wartung",
            "Umfangreiches Versicherungswissen im Bereich Erstversicherungen",
            "Erfahrung mit rechtlichen und organisatorischen Themen (z.B. IDD, Compliance, FATCA/CRS, etc.)",
            "Sehr gute projekt-, team- und standort\u00fcbergreifende Kommunikation (Zusammenarbeit in virtuellen Teams)",
            "Operative Bearbeitung von Projektmanagement-Tasks in Kundenprojekten (z.B. Planung, Aufwandsch\u00e4tzung, Arbeitskoordination und -kontrolle, Berichtserstattung, etc.)",
            "Scrum Erfahrung",
            "Anleitung und Betreuung junger Teammitglieder"
        ],
        "itCompetence": [
            "SAP: FS-ICM, FS-BP, Organizational Management (OM) in SAP HCM, SAP HANA (Developer Edition und Express Edition), SAP Cloud Platform",
            "msg.Insurance Suite: msg.Business Partner",
            "DB: SQLiteStudio, Microsoft SQL Server, SQL Server Data Tools (SSDT), SQL Server Management Studio (SSMS)",
            "Programmiersprachen: SQL, ABAP, ABAP Objects, SAP GUI Scripting, Visual Basic, VB-Script, XML, XSLT, HTML",
            "Entwicklungswerkzeuge: SAP Business Application Studio, ABAP Workbench, Eclipse (ABAP Development Tools (ADT) for SAP NetWeaver, SAP HANA Tools, SAP Cloud Platform Tools, Modeling Tools for SAP BW/4HANA and SAP BW powered by SAP HANA, Oracle Database Tools, Toad Extension for Eclipse)",
            "Virtualisierungssoftware: Oracle VM VirtualBox",
            "Test-Tools: HP Application Lifecycle Management (HP ALM), JIRA",
            "B\u00fcro Anwendungssoftware: MS Office (Excel, Word und PowerPoint)",
            "Kollaborationssoftware: Confluence, MS SharePoint",
            "BPM Software: MS Visio, Signavio, ARIS",
            "PM Software: MS Project"
        ],
        "certificates": [
            {
                "name": "unknown",
                "filename": "202007_SAP Fiori Overview Design Develop_Confirmation of Participation.pdf",
                "rawName": "202007_SAP Fiori Overview Design Develop_Confirmation of Participation",
                "nameAccuracy": 0.9918215181678534,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/202007_SAP%20Fiori%20Overview%20Design%20Develop_Confirmation%20of%20Participation.pdf"
            },
            {
                "name": "Certified ScrumMaster",
                "filename": "202007_SAP Fiori Overview Design Develop_Record of Achievement.pdf",
                "rawName": "202007_SAP Fiori Overview Design Develop_Record of Achievement",
                "nameAccuracy": 0.9664431922137737,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/202007_SAP%20Fiori%20Overview%20Design%20Develop_Record%20of%20Achievement.pdf"
            },
            {
                "name": "unknown",
                "filename": "cp7_RecordOfAchievement.pdf",
                "rawName": "cp7_RecordOfAchievement",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/cp7_RecordOfAchievement.pdf"
            },
            {
                "name": "unknown",
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "SAP Fiori Overview: Design, Develop and Deploy",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/CV_Karol%20Pieczara_04_2021.docx"
            },
            {
                "name": "unknown",
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "Building Applications with SAP Cloud Application Programming Model",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/CV_Karol%20Pieczara_04_2021.docx"
            },
            {
                "name": "unknown",
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "F\u00fchrungskr\u00e4fte-Ausbildung",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/CV_Karol%20Pieczara_04_2021.docx"
            },
            {
                "name": "Certified ScrumMaster",
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "Certified Scrum Master (CSM\u00ae) Training",
                "nameAccuracy": 0.5263157894736842,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/CV_Karol%20Pieczara_04_2021.docx"
            },
            {
                "name": "unknown",
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "Cambridge Business English Certificate Vantage",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/CV_Karol%20Pieczara_04_2021.docx"
            },
            {
                "name": "unknown",
                "filename": "CV_Karol Pieczara_04_2021.pdf",
                "rawName": "CV_Karol Pieczara_04_2021",
                "nameAccuracy": 0,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/CV_Karol%20Pieczara_04_2021.pdf"
            },
            {
                "name": "Certified ScrumMaster",
                "filename": "fiori3_RecordOfAchievement.pdf",
                "rawName": "fiori3_RecordOfAchievement",
                "nameAccuracy": 0.9664431922137737,
                "sharepointpath": "https://qperior.sharepoint.com/sites/Services/CVs/Documents/Pieczara%20Karol%20(SAP%20BIA%20AT)/fiori3_RecordOfAchievement.pdf"
            }
        ],
        "languages": [
            "Polnisch (Muttersprache)",
            "Deutsch (C1-Niveau)",
            "Englisch (B2-Niveau)",
            "Russisch (A1-Niveau)"
        ],
        "projectexperience": [
            {
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "Auszeit aus pers\u00f6nlichen Gr\u00fcnden\n(08/2018 \u2013 11/2018)",
                "details": [""]
            },
            {
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "Personaleinf\u00fchrung, Q-PERIOR GmbH, Wien, \u00d6sterreich\n(05/2018 \u2013 07/2018)",
                "details": [
                    "Inhaltliche Einarbeitung in das Thema Business Intelligence-Architekturen (z.B. SAP BW/4HANA)",
                    "Implementierung von Key Performance Indicators (KPI) als Fiori Apps mit Smart Business Services (SBS) in der SAP Cloud Platform (SCP)",
                    "\u00dcberpr\u00fcfung von SAP S/4HANA Embedded Analytics M\u00f6glichkeit zur Auswertung von operativen und transaktionalen Daten direkt aus dem ERP System in Real-Time",
                    ""
                ]
            },
            {
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "UNIQA Insurance Platform (UNIQA UIP) f\u00fcr msg life central europe gmbh, Wien, \u00d6sterreich\n(07/2017 \u2013 04/2018)",
                "details": [
                    "Rolle: Business Analyst / msg.Business Partner",
                    "Analyse von fachlichen Anforderungen und Erarbeitung von L\u00f6sungsm\u00f6glichkeiten",
                    "Abstimmung mit anderen Projekte (End-2-End Prozesse, Integration, Compliance, etc.) hinsichtlich Abh\u00e4ngigkeiten",
                    "Abkl\u00e4rung der technischen Machbarkeit",
                    "Unterst\u00fctzung bei der Erstellung von Fachkonzepten und Entscheidungsvorlagen",
                    "Qualit\u00e4tssicherung (z.B. BP Mastersheet, SSBO Umsetzung, etc.)",
                    "Vorbereitung des Workshops und Abstimmung der Agenda",
                    "Unterst\u00fctzung des UNIQA-IT-Projektleiters",
                    ""
                ]
            },
            {
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "UNIQA Insurance Platform (UNIQA UIP) f\u00fcr Innovas GmbH, Wien, \u00d6sterreich\n(08/2017 \u2013 12/2017)",
                "details": [
                    "Rolle: Business Analyst / msg.Insurance Suite mit dem Schwerpunkt msg.Business Partner",
                    "Fachliche Kl\u00e4rung von Anforderungen und Begleitung der Umsetzung",
                    "Ermittlung von Zusammenh\u00e4ngen zwischen den msg.Insurance Suite Komponenten",
                    "Erstellung des Structured Systematic Brief Overview (SSBO)",
                    "Priorisierung der Aufgaben und Koordination der zugeteilten Mitarbeiter",
                    "Unterst\u00fctzung des msg-Projektleiters",
                    ""
                ]
            },
            {
                "filename": "CV_Karol Pieczara_04_2021.docx",
                "rawName": "Umsetzung IDD \u2013 EU-Vermittlerrichtlinie IDD f\u00fcr msg systems ag, M\u00fcnchen, Deutschland\n(03/2017 parallel zu anderen Aufgaben)",
                "details": [
                    "Rolle: Fachlicher Provisionsberater / Mitglied eines msg-Teams",
                    "Erste Analyse der neuen EU-Vermittlerrichtlinie IDD",
                    "Ermittlung auf welche Anforderungsbereiche sich IDD bezieht",
                    "Auswirkung der neuen IDD Regelungen auf Provisionsprodukte",
                    "Erstellung Ma\u00dfgeschneiderte Beratung: IDD-Quick Check & IDD Readiness",
                    "ERGO NVS (Neues Verg\u00fctungssystem) f\u00fcr ERGO Group AG, D\u00fcsseldorf, Deutschland \n(09/2015 \u2013 12/2016)",
                    "Rolle: FS-ICM Technischer Berater / Mitglied eines SCRUM Entwicklungsteams",
                    "Agile Projektarbeit in einem SCRUM-Team",
                    "Kundenberatung im SAP FS-ICM Umfeld",
                    "Erstellung von Grob- und Fachkonzepten (z.B. Rahmenkonzepte, Business Process Specifications)",
                    "Programmierung und Customizing des FS-ICM Systems (NVS Prototype, ERGO Standard Verg\u00fctungsmodell)",
                    "Abstimmung der L\u00f6sungen mit den Fachexperten und Architekten (PO/SPO/IVK)",
                    "Weiterentwicklung und Optimierung des Migrationsprogramms f\u00fcr die Bewegungsdaten (Provisionsf\u00e4lle)",
                    "Durchf\u00fchrung von Migrationen (Segmente Gesundheit und Kraftfahrt)",
                    "Auswertung und Abgleich von Simulation- (SAS) und Migrationsergebnissen (ICM) mit Excel",
                    "Analyse von Auff\u00e4lligkeiten in den Provisionsdaten (SAS und FS-ICM)",
                    "Erstellung von Testf\u00e4llen in HP ALM und Durchf\u00fchrung von Systemtests",
                    "Fehlerdiagnose und -beseitigung",
                    "Schulung von Mitarbeitern des Kunden (Wissenstransfer)",
                    "Optimus Program f\u00fcr MSIG Holdings (Asia) Pte Ltd, Singapur, Republik Singapur\n(06/2015 \u2013 09/2015)",
                    "Rolle: SAP Consultant (FS-ICM Migration)",
                    "Konzipierung einer Workaround-L\u00f6sung f\u00fcr die BZO-Migration",
                    "Entwicklung einer Migrationsstrategie f\u00fcr die BZO-Daten mit SAP Standard API's",
                    "Durchf\u00fchrung von BZO-Testmigrationen",
                    "Migration Fehleranalyse und -korrektur",
                    "Entwicklung einer Migrationsstrategie f\u00fcr die Provisionsvertr\u00e4ge mit EDT",
                    "Erstellen von technischen Dokumentationen in englischer Sprache (BZO- und Provisionsvertrag-Migration Strategie, BZO Datenmodell, etc.)",
                    "Envision Program / Core Insurance f\u00fcr Nan Shan Life Insurance Company, Taipei, Taiwan\n(11/2014 \u2013 05/2015) ",
                    "Rolle: FS-ICM Functional Consultant und FS-ICM Migration Team Leader",
                    "Enge Zusammenarbeit mit Fach- und IT-Abteilungen und Erarbeitung der fachlichen und technischen Anforderungen (z.B. Durchf\u00fchren von Pr\u00e4sentationen und Kundenworkshops, Analyse von realen Beispielen, Erstellung von Anwendungsf\u00e4llen, Unterst\u00fctzung bei Vorstudien, etc.)",
                    "Unterst\u00fctzung bei der Konzeptionierung von neuen Businessanforderungen und funktionalen L\u00fcken (d.h. Perceived Functional Gaps)",
                    "Mitwirkung sowie technischer und analytischer Support bei der Konzipierung von FS-ICM L\u00f6sungen und bei deren Implementierung (z.B. Overriding Organisationsstrukturen f\u00fcr NSL Agency Channel, etc.)",
                    "Entwicklung und Umsetzung des Bestandszuordnungsmodells (BZO) ",
                    "Customizing und Integration der BZO mit den relevanten Umsystemen, d.h. Policy Management System (FS-PM) und Provisionssystem (FS-ICM)",
                    "Durchf\u00fchrung von BZO Integration Tests und Behebung von Defekten",
                    "Erstellung einer fachlichen Spezifikation f\u00fcr die NSL Bank Channel Organizational Struktur",
                    "Planung und Aufwandssch\u00e4tzung f\u00fcr allen Phasen des FS-ICM Migrationsprojekts (d.h. PD-ORG-, Provisionsvertrag-, BZO- und Provisionsfall-Migrationen)",
                    "Entwicklung der Migrationsstrategie f\u00fcr die NSL Agency Channel PDORG Struktur und Provisionsvertr\u00e4gen",
                    "Smile IP Programm f\u00fcr Vienna Insurance Group (VIG) und den beteiligten Versicherungsunternehmen, Wien, \u00d6sterreich\n(08/2010 \u2013 09/2014)\n",
                    "Beteiligte Versicherungsunternehmen der VIG Gruppe:",
                    "Cosmopolitan Life (Kroatien)",
                    "Wiener Osiguranje (Kroatien)",
                    "Donau (\u00d6sterreich)",
                    "Wiener St\u00e4dtische (\u00d6sterreich)",
                    "Compensa Life (Polen)",
                    "Asirom (Rum\u00e4nien)",
                    "Andere Versicherungsunternehmen:",
                    "\u00d6BV (\u00d6sterreich)",
                    "Asirom Life \u2013 Implementierung",
                    "(07/2013 \u2013 09/2014)",
                    "Unterst\u00fctzung bei der Planung und Durchf\u00fchrung von SAP Projekten als Teilprojektleiter",
                    "Moderation sowie die fachliche und technische Begleitung von Kundenworkshops und Interviews",
                    "Erstellung von technischen Dokumentationen in englischer Sprache basierend auf der funktionalen Spezifikation des Systems (z.B. Blueprints, Solution Proposals, Use Cases, etc.)",
                    "Programmierung und Customizing des SAP Systems nach individuellen Kundenanforderungen (z.B. Verg\u00fctungsmodell, Konditionstabellen, etc.)",
                    "Konzeptionierung und Implementierung von Change Requests",
                    "Unterst\u00fctzung von Kunden bei Entwicklung und Umsetzung von innovativen Applikationsl\u00f6sungen und Erweiterungen (z.B. praktische SAP GUI Scripting, etc.)",
                    "Verantwortlich f\u00fcr die Erstellung und Pflege von Organisationsstruktur des Versicherungsunternehmens in SAP Organizational Management (PD-ORG)",
                    "Support des Test Management Teams bei Erstellung von Testf\u00e4llen und der Durchf\u00fchrung von Systemtests",
                    "Verantwortlich f\u00fcr die system\u00fcbergreifende Job-Scheduling und Automatisierung von Gesch\u00e4fts- und IT-Prozesse in der ONE Automation Plattform (ehemals UC4) von AUTOMIC, d.h. Dokumentation, Pr\u00fcfung, Optimierung, \u00dcberwachung und Wartung von erstellten Jobs und Jobpl\u00e4nen",
                    "\u00dcbernahme der Verantwortung f\u00fcr die Umsetzung von komplexen und anspruchsvollen Aufgaben (z.B. Durchf\u00fchrung des Monatsabschlusses, etc.)",
                    "Schulung und Coaching von Mitarbeitern des Kunden (z.B. FS-ICM, PDORG, etc.)",
                    "WStV / Donau Kfz \u2013 Migration",
                    "(07/2011 \u2013 09/2014)",
                    "Erster Ansprechpartner f\u00fcr Kunden und das Projektteam \u00fcber alle Projektphasen hinweg",
                    "Mitarbeit in Workshops zur fachlichen Analyse der Gesch\u00e4ftsprozesse im Quellsystem und Dokumentieren der Workshop-Ergebnisse",
                    "Erstellung von Grob- und Fachkonzepten abgestimmt auf Kundenanforderungen (z.B. Fragebogen, Anforderungskatalog, Migrationsstrategie, etc.)",
                    "Verarbeitung und statistischer Analyse von Massendaten (z.B. Auswertung von Quelldaten f\u00fcr die Migration, etc.)",
                    "Durchf\u00fchrung von Test- und Produktiv-Migrationen sowie die Analyse und Verifikation der migrierten Daten im Zielsystem",
                    "Vorbereitung und Durchf\u00fchrung von Migrationsprojekten unter Ber\u00fccksichtigung anspruchsvoller Ergebnis- Termin-, Aufwands- und Qualit\u00e4tsziele",
                    "Auswertungen und Dokumentationen von Projektergebnissen",
                    "\u00d6BV Sparten\u00fcbergreifend \u2013 Migration",
                    "(05/2014 \u2013 09/2014)",
                    "Durchf\u00fchrung und Kontrolle von Datenextraktionen aus dem SAP-Quellsystem (d.h. FS-ICM) und \u00dcbermittlungen an ein Schnittstellensystem (d.h. Exchange Server)",
                    "Entwicklung von Reports zur Auswertung von Quelldaten und Generierung von Migration Statistikdateien",
                    "Implementierung von Jobs und Jobpl\u00e4nen in der ONE Automation Plattform (d.h. Automatisierung des Extraktionsprozesses)",
                    "Wiener Osiguranje Life \u2013 Implementierung",
                    "(05/2014 \u2013 09/2014)",
                    "Beratung und Unterst\u00fctzung von Applikation- und Problem-Management Teams bei Fehlerbehebung und Anwendungsfragen",
                    "Compensa Life \u2013 Migration",
                    "(06/2012, 08/2014 \u2013 03/2014)",
                    "Durchf\u00fchrung von FS-ICM Testmigrationen",
                    "Organisation und Moderation von Workshops (e.g. Anwendung von SAP PD-ORG) und Pr\u00e4sentationen (e.g. FS-ICM Migration) mit Kunden",
                    "Erstellung und Pflege der Organisationsstruktur des Versicherungsunternehmens in SAP Organisationsmanagement (PDORG)",
                    "Begleitung und Support von Tests",
                    "AT Master Sparten\u00fcbergreifend \u2013 Migration",
                    "(02/2011 \u2013 04/2011)",
                    "Entwicklung eines MS Excel-Makros zur automatischen Verifizierung von FS-ICM Teams und Partnerschaften Daten nach der Migration",
                    "Donau Leben \u2013 Migration",
                    "(11/2010 \u2013 07/2011)",
                    "Koordination und Durchf\u00fchrung von FS-ICM Testmigrationen (d.h. Bestandszuordnung- und Provisionsfallmigrationen)",
                    "Konzipierung neuer Methoden und Werkzeuge f\u00fcr Validierung und Verifikation von Migrationsergebnissen zur Sicherstellung der Korrektheit, Konsistenz, Vollst\u00e4ndigkeit und Integrit\u00e4t der migrierten Daten",
                    "Fehleranalyse und -behebung sowie Optimierung und Erweiterung der bestehenden Programmierungen im FS-ICM",
                    "AT MASTER Kfz \u2013 Implementierung",
                    "(09/2010 \u2013 07/2011)",
                    "Mitarbeit bei der Einf\u00fchrung und Weiterentwicklung des SAP Provisionssystems FS-ICM",
                    "Unterst\u00fctzung der Systemtests und Bearbeitung von Fehlermeldungen (d.h. SMIs)",
                    "Cosmopolitan Life \u2013 Migration",
                    "(08/2010 \u201310/2011)",
                    "Durchf\u00fchrung von Testmigration von Stamm- (d.h. Provisionsvertr\u00e4ge) und Bewegungsdaten (d.h. BZO Daten und Provisionsf\u00e4lle) von Non- SAP-Systemen nach FS-ICM",
                    "Implementierung von Systemkorrekturen nach dem Integrationstest",
                    "Begleitung bei der Produktivmigration vom Quell- ins Zielsystem und Durchf\u00fchrung von Datenbereinigungen (z.B. automatische Nachbearbeitung von Schwebef\u00e4llen mit SAP GUI Skripten)",
                    "Erstellung der Anleitung f\u00fcr die FS-ICM Migration (d.h. How-to Guide)",
                    ""
                ]
            }
        ]
    }]

export const getCVs = (templateID) => {

    var theFilename = templateID === 10 ? "Q_PERIOR CVs" : "SBB CVs"
    const saveFile = (blob, filename) => {
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            var file = window.URL.createObjectURL(blob);
            a.href = file;
            a.download = filename;
            a.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(file);
                document.body.removeChild(a);
            }, 0)
        }
    }

    return fetch(
        cvsUrl + "id=" + templateID, {
        headers: new Headers({ 'Authorization': token },

        )
    }).then(res => res.blob())
        .then(blob => {
            saveFile(blob, theFilename)
        });

}

export const deleteSelectedCVs = () => {


    return new Promise((resolve, reject) => {

        return fetch(
            cvsDelete, {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': token },
            )
        }).then(resolve()).catch(reject())
    })

}

export const setSelectedCVs = (cvs) => {


    return new Promise((resolve, reject) => {

        return fetch(
            cvsSetSelection, {
            method: 'POST',
            headers: new Headers({ 'Authorization': token, 'Content-Type': 'application/json' }),
            body: JSON.stringify(cvs)
        }).then(resolve()).catch(reject())
    })

}