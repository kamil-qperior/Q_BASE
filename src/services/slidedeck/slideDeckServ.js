export const token = 'Bearer ' + process.env.REACT_APP_TOKEN 

export const getDeck = () => {
  return fetch(
    'https://qperior-reference-mgmt-api.azurewebsites.net/slide-deck', {
    headers: new Headers({ 'Authorization': token })
  }).then( res => res.blob() )
  .then( blob => {
    var file = window.URL.createObjectURL(blob);
    window.location.assign(file);
  });

}