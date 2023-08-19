import fetchGames from "./fetchGames.js";
import footballApiStatus from "./footballApiStatus.js";

export const handler = async (event) => {

  let response = {
    statusCode: 400,
    body: JSON.stringify("Something Went Wrong"),
  };

  const STATUS_CODE = await footballApiStatus();    

  if (STATUS_CODE == 400) {
    response.body = JSON.stringify("Check fb API");
    return response
  }

  const returnValue = await fetchGames();

  if (returnValue["STATUS_CODE"] == 400) {
    response.body = JSON.stringify("Check fetchGames");
    return response
  }

  response.statusCode = 200;
  response.body = JSON.stringify("Check Scheduler");
  
  return response;
};
