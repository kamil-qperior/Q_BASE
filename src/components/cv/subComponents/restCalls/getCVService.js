export const token = 'Bearer ' + process.env.REACT_APP_TOKEN
export const cvsUrl = 'http://[::1]:3000/generateCVs?';

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

    // return fetch(
    //     slideDeckUrl, {
    //     headers: new Headers({ 'Authorization': token },

    //     )
    // }).then(res => res.blob())
    //     .then(blob => {
    //         var file = window.URL.createObjectURL(blob);
    //         window.location.assign(file);
    //     });



}