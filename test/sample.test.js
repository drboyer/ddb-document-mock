'use strict';
const AWS = require('aws-sdk');
const { sampleQuery } = require('../app');

describe('example ddb test', () => {
  afterEach(() => {
    AWS.clearAllMocks();
  });

  test('first mock', async () => {
    const ddbStub = AWS.spyOnPromise('DynamoDB.DocumentClient', 'query', {
      Items: [
        {
          Hash: 'browns',
          Rank: 1,
          Description: 'Best breakfast potatoes'
        }
      ],
      Count: 1,
      ScannedCount: 1
    });

    const results = await sampleQuery();
    expect(results).toEqual({
      Hash: 'browns',
      Rank: 1,
      Description: 'Best breakfast potatoes'
    });
    expect(ddbStub).toBeCalledWith({
      TableName: 'example',
      KeyConditionExpression: 'Hash = :hashval',
      ExpressionAttributeValues: {
        ':hashval': 'browns'
      }
    });
  });

  test('second mock', async () => {
    const ddbStub = AWS.spyOnPromise('DynamoDB.DocumentClient', 'query', {
      Items: [
        {
          Hash: 'browns',
          Rank: 100,
          Description: 'Worst breakfast potatoes'
        }
      ],
      Count: 1,
      ScannedCount: 1
    });

    const results = await sampleQuery();
    expect(results).toEqual({
      Hash: 'browns',
      Rank: 100,
      Description: 'Worst breakfast potatoes'
    });
    expect(ddbStub).toBeCalledWith({
      TableName: 'example',
      KeyConditionExpression: 'Hash = :hashval',
      ExpressionAttributeValues: {
        ':hashval': 'browns'
      }
    });
  });
});