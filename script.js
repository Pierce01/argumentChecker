function getTextAreas() {
    const areas = document.getElementsByTagName("textarea");
    const formatted = [];

    for(let area in areas) {
        let text = areas[area].value;
        if(!text) continue;
        text = text.split(' ');

        let fields = {
            launchOptions: [],
            classPaths: [],
        };

        for(let item in text) {
            if(text[item].includes('libraries')) {
                let sep = ";";
                if(!text[item].includes(sep)) sep = ":";
                let paths = text[item].split(sep);
                for(let path in paths) fields.classPaths.push(paths[path].split('\\').slice(-1)[0]);
                continue;
            }
            fields.launchOptions.push(text[item])
        }
        formatted.push(fields);
    }

    let response = {
        message: "success",
        duplicates: null,
        missingLibs: [],
        rawWrap: {...formatted}
    };

    let array = [];
    let pog = [];
    for(let item in formatted[1].classPaths) {
        if(array.includes(formatted[1].classPaths[item])) {
            response.message = "success, but dupes were found. Make sure you're using the latest MCLC!";
            pog.push(formatted[1].classPaths[item])
        }
        array.push(formatted[1].classPaths[item]);
    }
    array = [];
    response.duplicates = {
        dupes: pog
    };

    for(let lib in formatted[0].classPaths) {
        if(!formatted[0].classPaths) alert("format broke!!");
        if(!formatted[1].classPaths.includes(formatted[0].classPaths[lib])) {
            response.missingLibs.push(formatted[0].classPaths[lib])
        }
    }
    document.getElementsByClassName('formatted')[0].innerText = JSON.stringify(response, null, 4);
}
