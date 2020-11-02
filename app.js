'use strict';
const AWS = require('aws-sdk');

async function sampleQuery() {
  const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  const queryResults = await dynamo.query({
    TableName: 'example',
    KeyConditionExpression: 'Hash = :hashval',
    ExpressionAttributeValues: {
      ':hashval': 'browns'
    }
  }).promise();
  return queryResults.Items[0];
}

module.exports = { sampleQuery };
