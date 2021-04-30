/* import { useEffect, useState } from 'react'


export const useAsync = (fn, deps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [res, setRes] = useState();
    useEffect(() => {
       setLoading(true);
       let cancel = false;
       fn().then(res => {
          if (cancel) return;
          setLoading(false);
          setRes(res)
       }, error => {
          if (cancel) return;
          setLoading(false);
          setError(error);
       })
       return () => {
          cancel = false;
       }
    }, deps)
    return {loading, error, res};
 }  */

 export function ensureArray(possibleArray) {
   const array = [];
   if (!Array.isArray(possibleArray)) {
     const singleDocument = possibleArray;
 
     array.push(singleDocument);
     return array;
   } else {
     return possibleArray;
   }
 }