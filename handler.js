const TABLE_NAME = process.env.TABLE_NAME.trim();

const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB();

async function handler(event) {
  let response;

  try {
    response = await handleRequest(event);
  } catch (error) {
    console.error("error handling request:", error);

    response = {
      body: JSON.stringify({
        error: error.toString(),
        message: "error handling request"
      }),
      statusCode: 500
    };
  }

  response.headers = response.headers || {};
  response.headers["Access-Control-Allow-Origin"] = "*";
  response.headers["Access-Control-Allow-Credentials"] = true;

  return response;
}

function handleRequest(event) {
  if (TABLE_NAME === "") {
    throw Error(
      `I don't have a TABLE_NAME environment variable, so I don't know where to read and write your entries.`
    );
  }

  const method = event.httpMethod.toUpperCase();
  const path = event.path.toLowerCase();

  console.log("handling request", method, path);

  const baseMatch = path.match(/^\/entries\/?$/);
  const idMatch = path.match(/^\/entry\/([^/]+)\/?$/);

  // if (method === "DELETE" && idMatch) {
  //   return deleteentry(idMatch[1]);
  // }

  if (method === "GET" && baseMatch) {
    return readEntries();
  }

  if (method === "PUT" && idMatch) {
    if (!event.body) {
      return {
        body: "Your request is missing a body.",
        statusCode: 400
      };
    }

    const { organisation, website } = JSON.parse(event.body);

    return writeEntry({ id: idMatch[1], organisation, website });
  }

  return { statusCode: 404 };
}

// async function deleteentry(id) {
//   console.log("deleting entry", id);

//   const parameters = {
//     Key: AWS.DynamoDB.Converter.marshall({ id }),
//     TableName: TABLE_NAME
//   };

//   // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteItem-property
//   await dynamoDb.deleteItem(parameters).promise();

//   console.log("deleted entry", id);

//   return { statusCode: 204 };
// }

//TODO readEntries with pagination somehow, or by month...

async function readEntries() {
  console.log("reading entry(s)");

  const parameters = {
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#scan-property
  const response = await dynamoDb.scan(parameters).promise();

  const rows = response.Items;

  const entries = rows.map(row => AWS.DynamoDB.Converter.unmarshall(row));

  console.log("read", entries.length, "entry(s)");

  return { body: JSON.stringify(entries), statusCode: 200 };
}

async function writeEntry({ id, organisation, website }) {
  console.log("writing entry", id);

  const parameters = {
    Item: AWS.DynamoDB.Converter.marshall({ id, organisation, website }),
    TableName: TABLE_NAME
  };

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
  await dynamoDb.putItem(parameters).promise();

  console.log("wrote entry", id);

  return { statusCode: 204 };
}

module.exports = {
  handler
};
