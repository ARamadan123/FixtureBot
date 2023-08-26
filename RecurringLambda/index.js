import { TwitterApi } from 'twitter-api-v2'
import updateTokens from './updateTokens.js';
import postTweet from './postTweet.js';

export const handler = async (event) => {

    let client = new TwitterApi(process.env.ACCESS_TOKEN);

    try {
        await client.v2.me();
    }
    catch (error) {
        
        if(error.code == 401) {
            // code to refresh tokens

            client = new TwitterApi(
            {
                clientId: process.env.CLIENT_ID, 
                clientSecret: process.env.CLIENT_SECRET
            })

            const { client: refreshedClient, accessToken, refreshToken: newRefreshToken }
            = await client.refreshOAuth2Token(process.env.REFRESH_TOKEN);
            
            client = refreshedClient;
            const statusCode = await updateTokens(accessToken, newRefreshToken);

            if (statusCode != 200) {
                const response = {
                    statusCode: statusCode,
                    body: JSON.stringify("Updating not successful"),
                };
                return response;
            }
        }
    }

    const result = await postTweet(client, event["fixtureId"]);

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
    
}