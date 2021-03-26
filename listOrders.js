import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
const table=process.env.tableName;

export const main = handler(async (event, context) => {
  const params = {
    TableName: table,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "#user= :username",
    ExpressionAttributeNames:{
        "#user": "username"
    },
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":username": event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDb.query(params);
   if ( ! result.Items) {
        throw new Error("Não há produtos.");
      }

  // Return the matching list of items in response body
  return result.Items;
});