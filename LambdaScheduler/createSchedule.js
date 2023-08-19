
import { SchedulerClient, CreateScheduleCommand } from "@aws-sdk/client-scheduler";

const createSchedule = async (event) => {

    const client = new SchedulerClient({region:process.env.REGION});
    let STATUS_CODE = 400;

    const input = {
        Name: event["fixtureId"].toString(),
        ScheduleExpression: `at(${event["time"]})`,
        Description: event["description"],
        ScheduleExpressionTimezone: "America/New_York",
        State: "DISABLED", // change to ENABLE for PROD
        Target: {
            Arn: process.env.TARGET_ARN,
            RoleArn: process.env.TARGET_ROLE_ARN,
            RetryPolicy: {
            MaximumRetryAttempts: Number("5"),
            },
            Input: JSON.stringify({
               "fixtureId": event["fixtureId"],
            }),
        },
        FlexibleTimeWindow: {
          Mode: "FLEXIBLE",
          MaximumWindowInMinutes: Number("1"),
        },
        ActionAfterCompletion: "DELETE",
    };
    
    try {
        const command = new CreateScheduleCommand(input);
        const responseClient = await client.send(command);
        STATUS_CODE = 200; 
    }
    catch (err){
        console.error(err)
        STATUS_CODE = 400;
    }

    // ******* DELETE IN PROD ******************
    const input2 = {
        Name: "EXAMPLE",
        ScheduleExpression: `at(2023-08-18T20:55:00)`,
        Description: event["description"],
        ScheduleExpressionTimezone: "America/New_York",
        State: "ENABLED", // change to ENABLE for PROD
        Target: {
            Arn: process.env.TARGET_ARN,
            RoleArn: process.env.TARGET_ROLE_ARN,
            RetryPolicy: {
            MaximumRetryAttempts: Number("5"),
            },
            Input: JSON.stringify({
               "fixtureId": event["fixtureId"],
            }),
        },
        FlexibleTimeWindow: {
          Mode: "FLEXIBLE",
          MaximumWindowInMinutes: Number("1"),
        },
        ActionAfterCompletion: "DELETE",
    };

    try {
        if (event["counter"] == 0) {
            const command = new CreateScheduleCommand(input2);
            const responseClient = await client.send(command);
            STATUS_CODE = 200; 
        }
    }
    catch (err){
        console.error(err)
        STATUS_CODE = 400;
    }

    // ************* END OF DELETE ***********
    return STATUS_CODE;
}

export default createSchedule;