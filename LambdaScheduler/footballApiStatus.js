import fetch, {Headers} from 'node-fetch'

const footballApiStatus = async () => {

    let STATUS_CODE = 400;
    // check if status of api is good: 2 conditions
    // 1) ["response"]["subscription"]["active"] = true
    // 2) ["response"]["requests"]["current"] < 50
    
    const statusUrl = `https://v3.football.api-sports.io/status`;
    
    let myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", process.env.API_KEY);
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    try {
        // Make request
        const response = await fetch(statusUrl, requestOptions)
        // Status Check
        if (response.ok) {
            const data = await response.json();

            // check if subscription is active and day limit hasn't been met
            if((data["response"]["subscription"]["active"] == true) && (
                data["response"]["requests"]["current"] < 75
            )) {
                STATUS_CODE = 200;
            }

        }
        else {
            STATUS_CODE = 400;

        }
    }
    catch (err){
        STATUS_CODE = 400;

    }


    return STATUS_CODE;
}

export default footballApiStatus
