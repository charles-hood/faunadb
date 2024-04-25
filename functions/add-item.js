const { query, Client } = require('faunadb');

const client = new Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  return client.query(query.Create(query.Collection('items'), { data }))
    .then(response => ({
      statusCode: 200,
      body: JSON.stringify(response)
    }))
    .catch(error => ({
      statusCode: 400,
      body: JSON.stringify(error)
    }));
};

