import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
const table=process.env.tableName;

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: table,
    Item: {
      // The attributes of the item to be created
      username: event.requestContext.identity.cognitoIdentityId,
      orderId: uuid.v1(), // A unique uuid
      createdAt: new Date().toISOString(), // Current Unix timestamp
      name: data.name, // nome do produto
      preco: data.preco, // preço
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});