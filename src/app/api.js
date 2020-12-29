
export function fetchURL(URL, fnCallback){
  return fetch(URL, {
    headers: {
      'X-Auth-Token': '3c1fb01dbfcc49219a80e91dd11ec639'
    }
  }).then((response)=>{
    return response.json();
  }).then((data)=>{
    fnCallback(data);
  })
}

export function fetchGameArea(fnCallback){
  return fetchURL('https://api.football-data.org/v2/areas', fnCallback);
  // return fetch('https://api.football-data.org/v2/areas', {
  //   headers: {
  //     'X-Auth-Token': '3c1fb01dbfcc49219a80e91dd11ec639'
  //   }
  // }).then((response)=>{
  //   return response.json();
  // }).then((data)=>{
  //   fnCallback(data);
  // })
}