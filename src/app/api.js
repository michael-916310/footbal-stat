
const cache = new Map();

export function fetchURL(URL, fnCallback, cacheKey=''){
  return fetch(URL, {
    headers: {
      'X-Auth-Token': '3c1fb01dbfcc49219a80e91dd11ec639'
    }
  }).then((response)=>{
    return response.json();
  }).then((data)=>{
    if (cacheKey) {
      cache.set(cacheKey, data);
    }
    fnCallback(data);
  })
}


export function fetchData(url, fnCallback, cacheKey){
  if (cache.has(cacheKey)) {
    fnCallback(cache.get(cacheKey));
  } else {
    return fetchURL(url, fnCallback, cacheKey);
  }
}