

export function fetchGameArea(fnCallback){
  console.log(`started: fetchGameArea`);
  return fetch('https://api.football-data.org/v2/areas', {
    headers: {
      'X-Auth-Token': '3c1fb01dbfcc49219a80e91dd11ec639'
    }
  }).then((response)=>{
    return response.json();
  }).then((data)=>{
    console.log(data);
    fnCallback(data);
  })
}