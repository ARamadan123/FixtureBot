import fetch, {Headers} from 'node-fetch'
import { DateTime } from 'luxon';
import createSchedule from './createSchedule.js';

const fetchGames = async () => {
    
    const leagueId = 39;
    const season = 2023;
    // Get Today's Date
    const date2 = "2023-08-19" // changes date in PROD
    const date = DateTime.now().setZone('America/New_York').plus({day:1}).toString().slice(0,10);
    const timeZone = "America/New_York"
    let numberOfGames = 0

    let returnValue = {
        "STATUS_CODE" : 400,
    };

    
    const fixtureUrl = `https://v3.football.api-sports.io/fixtures?
    league=${leagueId}&season=${season}&date=${date}&timezone=${timeZone}`;
    
    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", process.env.API_KEY);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    let data;
    try {
        // Make request
        const response = await fetch(fixtureUrl, requestOptions)
        data = await response.json();
        numberOfGames = data["response"].length
        returnValue["STATUS_CODE"] = 200
    }
    catch (err){
        returnValue["STATUS_CODE"] = 400
        return returnValue
    }

    let event = {};
    // Schedule an AWS schedule for each game
    for (let i = 0; i < numberOfGames; i++) {
        event["counter"] = i;
        event["fixtureId"] = data["response"][i]["fixture"]["id"];
        event["time"] = DateTime.fromFormat(data["response"][i]["fixture"]["date"].slice(0,19)
        ,'yyyy-MM-dd\'T\'HH:mm:ss').minus({minutes:20}).toString().slice(0,19)
        event["description"] = data["response"][i]["teams"]["home"]["name"] + " vs " + data["response"][i]["teams"]["away"]["name"];
        let code = await createSchedule(event);
        if (code == 400) {
            returnValue["STATUS_CODE"] = 400
        }
    }

    return returnValue;
}

export default fetchGames;

