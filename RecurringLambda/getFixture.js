import fetch from "node-fetch";
import { Headers } from "node-fetch";

const getFixtures = async (fixtureId) => {
    
    //const fixtureID = 1035055;
    
    const fixtureUrl = `https://v3.football.api-sports.io/fixtures?id=${fixtureId}`;
    
    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", 	process.env.API_KEY);
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


    }
    catch (err){
        console.error(err);
        return 400;
    }
    // If Games status is not equal to "Not Started" then abort
    if(data["response"][0]["fixture"]["status"]["short"] != "NS") {
        return 400;
    }

    const homeTeam = data["response"][0]["lineups"][0]["team"]["name"];
    const homeTeamFormation = data["response"][0]["lineups"][0]["formation"];
    const awayTeam = data["response"][0]["lineups"][1]["team"]["name"];
    const awayTeamFormation = data["response"][0]["lineups"][1]["formation"];


    let homeTeamLineup = []
    let awayTeamLineup = []
    for(let i = 0; i < 11; i++) {
        let homeObj = {
            "name": data["response"][0]["lineups"][0]["startXI"][i]["player"]["name"],
            "number": data["response"][0]["lineups"][0]["startXI"][i]["player"]["number"]
        }
        let awayObj = {
            "name": data["response"][0]["lineups"][1]["startXI"][i]["player"]["name"],
            "number": data["response"][0]["lineups"][1]["startXI"][i]["player"]["number"] 
        }
        homeTeamLineup[i] = homeObj;
        awayTeamLineup[i] = awayObj;

    }

    const returnObj = {
        "homeTeam": homeTeam,
        "homeTeamFormation": homeTeamFormation,
        "homeTeamLineup": homeTeamLineup,
        "awayTeam": awayTeam,
        "awayTeamFormation": awayTeamFormation,
        "awayTeamLineup": awayTeamLineup,
    }
    return returnObj;
}

export default getFixtures;