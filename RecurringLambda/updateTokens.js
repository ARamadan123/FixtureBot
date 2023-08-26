import { LambdaClient, UpdateFunctionConfigurationCommand } from "@aws-sdk/client-lambda";

const updateTokens = async (accessToken, newRefreshToken) => {
    
    const client = new LambdaClient({region: "us-east-2"});

    const input = {
        FunctionName: "RecurringTargetLambda",
        Environment: { 
          Variables: {
            "ACCESS_TOKEN": accessToken,
            "REFRESH_TOKEN": newRefreshToken,
            "CLIENT_ID": process.env.CLIENT_ID,
            "CLIENT_SECRET": process.env.CLIENT_SECRET,
            "API_KEY": process.env.API_KEY
          },
        },
    };

    try {
        const command = new UpdateFunctionConfigurationCommand(input);
        const response = await client.send(command);
        return 200;
    }
    catch (error) {
        console.log(error)
        return 400;
    }


}

export default updateTokens;