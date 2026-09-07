export interface InfoBlock {
    type    : 'heading' | 'paragraph' | 'hyperlink',
    content : string | string[]
    link?   : string
}

export const INFO_CONFIG : InfoBlock[] = [
    {
        type    : 'heading', 
        content : 'Andmete allikad',
    },
    {
        type    : 'paragraph', 
        content : 'Eesti metsandusega seonduvaid andmeid on palju, siiski on andmete allikad killustunud ning tihti ei kattu. Antud projekti raames oli raske leida andmeid, mis kattuksid nii maakondlikku arvestuse kui ka ajalise vahemiku poolest. Seetõttu on ka mõningatel aastatel vastavad graafikud või isegi kaardikihid puudulikud, sest antud andmed ei ole avalikult saadavad või lihtsalt ei eksisteeri.'
    },
    {
        type    : 'paragraph', 
        content : 'Rakenduse raames kasutatud andmed on saadavad Eesti riigi erinevatest avalikest andmeallikatest.'
    },
    {
        type    : 'hyperlink', 
        content : 'Metsakihtide jaoks on kasutatud Maa- ja Ruumiameti Eesti Topograafia Andmekogu.',
        link    : 'https://geoportaal.maaamet.ee/est/ruumiandmed/eesti-topograafia-andmekogu-p79.html'
    },
    {
        type    : 'hyperlink', 
        content : 'Metsaraie maakondlikud andmed tulenevad Eesti Statistikaameti tabelist MM04.',
        link    : 'https://andmed.stat.ee/et/stat/majandus__metsamajandus/MM04',
    },
    {
        type    : 'hyperlink', 
        content : 'Metsauuendamise maakondlikud andmed tulenevad Eesti Statistikaameti tabelist MM10.',
        link    : 'https://andmed.stat.ee/et/stat/majandus__metsamajandus/MM10'
    },
    {
        type    : 'hyperlink', 
        content : 'Korraldatud metsamaa andmed tulenevad Keskkonnaagentuuri aastaraamatutest "Mets".',
        link    : 'https://keskkonnaportaal.ee/et/metsa-aastaraamatud'
    },
    {
        type    : 'heading',
        content : 'Projekti juured'
    },
    {
        type    : 'paragraph',
        content : 'Antud projekt on isiklik edasiarendus häkatonil "Metsikult andmetes 2026" loodud prototüübist. Käesolev kaardirakendus jagab algse lahendusega üleüldist kasutajaliidese paigutust ning kasutatavaid andmeid.'
    },
    {
        type    : 'hyperlink',
        content : 'Häkatoni prototüübi jaoks kasutati programmeerimiskeelt JavaScript ja React raamistikku, lahendus on leitav siit.',
        link    : 'https://github.com/Natashik777/Metsaavastaja'
    },
    {
        type    : 'hyperlink',
        content : 'Käesolev kaardirakendus on nullist ümber kirjutatud programmeerimiskeeles TypeScript koos React raamistikuga. Lahendus on leitav siit.',
        link    : 'https://github.com/karlnoupuu/forest-map'
    },
]