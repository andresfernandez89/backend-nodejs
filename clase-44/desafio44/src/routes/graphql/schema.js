const {buildSchema} = require("graphql");

const schema = buildSchema(`
    type Product {
        id: ID!
        title: String!
        price: String!
        thumbnail: String!
    }

    input ProductInput {
        title: String
        price: String
        thumbnail: String
    }

    type Query {
        getById(id: ID!): Product,
        getProducts: [Product]
    }

    type Mutation {
        postProduct(data: ProductInput): Product
        editById(id: ID!, data: ProductInput): Product
        deleteById(id: ID!): Product
    }

`);

module.exports = schema;
