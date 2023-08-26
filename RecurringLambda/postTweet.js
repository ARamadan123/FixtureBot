import getFixtures from "./getFixture.js";

const postTweet = async(client, fixtureId) => {

    const tweetInformation = await getFixtures(fixtureId);

    if (tweetInformation == 400) {
        return 400;
    }
    
    const header = `${tweetInformation["homeTeam"]} vs ${tweetInformation["awayTeam"]} lineups`;

    let homeTeamBody = `${tweetInformation["homeTeam"]}: ${tweetInformation["homeTeamFormation"]} \n`;
    let awayTeamBody = `${tweetInformation["awayTeam"]}: ${tweetInformation["awayTeamFormation"]} \n`;

    for (let i = 0; i < 11; i++) {
        let homeNewLine = `${tweetInformation["homeTeamLineup"][i]["name"]}\n`;
        let awayNewLine = `${tweetInformation["awayTeamLineup"][i]["name"]}\n`;
        homeTeamBody = homeTeamBody + homeNewLine;
        awayTeamBody = awayTeamBody + awayNewLine;
    }

    try {
        const response = await client.v2.tweetThread([
            header,
            homeTeamBody,
            awayTeamBody,
        ]);
        return response;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export default postTweet;