import fetch from "node-fetch";
import { Headers } from "node-fetch";

const HDH = async (fixtureId) => {
    
    const fixtureID = 1035055;
    
    const fixtureUrl = `https://v3.football.api-sports.io/fixtures/headtohead?h2h=48-49&last=5`;
    
    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", 	"e6f23f0af9b37475f024361dd2ba22b0");
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
        console.log(data);
       // console.log(data["response"][0]["teams"]["home"]["id"]); // 48 ->westHam
        //console.log(data["response"][0]["teams"]["away"]["id"]); // 49 chelsea
        for(let i = 0; i < data["response"].length; i++) {
            console.log(data["response"][i]["fixture"])
        }

    }
    catch (err){
        console.error(err);
        return 400;
    }

}

HDH();

