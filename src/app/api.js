
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

export function fetchGameArea(fnCallback){
  if (cache.has('areas')) {
    fnCallback(cache.get('areas'));
  } else {
    return fetchURL('https://api.football-data.org/v2/areas', fnCallback, 'areas');
  }
}
