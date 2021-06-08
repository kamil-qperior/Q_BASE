


export const token = 'Bearer ' + process.env.REACT_APP_TOKEN 
export const slideDeckUrl = 'https://qperior-reference-mgmt-api.azurewebsites.net/slide-deck?';
export const local = 'http://[::1]:3000/slide-deck?';

export const getDeck = (variantIds) => {
  
  const init = variantIds.map(variantId => ["id", variantId]);
  
  const searchParams = new URLSearchParams(init)

  console.log('searchParams', searchParams);

 

  return fetch(
    slideDeckUrl+searchParams, {
    headers: new Headers({ 'Authorization': token },
    
    )
  }).then( res => res.blob() )
  .then( blob => {
    var file = window.URL.createObjectURL(blob);
    window.location.assign(file);
  });

}