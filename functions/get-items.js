const { query, Client } = require('faunadb');

const client = new Client({ secret: process.env.FAUNADB_SECRET });

exports.handler = async () => {
  return client.query(query.Map(
      query.Paginate(query.Documents(query.Collection('items'))),
      query.Lambda('X', query.Get(query.Var('X')))
    ))
    .then(response => ({
      statusCode: 200,
      body: JSON.stringify(response.data.map(item => item.data))
    }))
    .catch(error => ({
      statusCode: 400,
      body: JSON.stringify(error)
    }));
};

