import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { makeExecutableSchema } from "graphql-tools";
import https from "https";
import { Person, PersonQueryParams, EditPersonParams } from "../lib/types";
import path from "path";

import { graphqlExpress, graphiqlExpress } from "apollo-server-express";

// initialize people datastore
let people: Person[] = [];

// load seed people
const options = {
  hostname: "randomuser.me",
  path: "/api/?results=100&inc=name,email,picture",
  method: "GET"
};

const req = https.request(options, res => {
  console.log("Seeding data...");
  let data = "";
  res.on("data", chunk => {
    data += chunk;
  });
  res.on("end", () => {
    people = JSON.parse(data).results;
    people.forEach((p, idx) => (p.id = idx));
    console.log("Data Seeded!");
  });
});
req.end();

// The GraphQL schema in string form
const typeDefs = `
  type Query {
      people: [Person]
      person(id: ID!): Person
    }
  type Mutation {
      editPerson(id: ID!, payload:EditPerson): Person!
  }
  input EditPerson { title: String, first: String last: String, email: String}
  type Name { title: String, first: String, last: String}
  type Picture { large: String, medium: String, thumbnail: String}
  type Person { id: ID!, name: Name, email: String, picture: Picture }
`;

// The resolvers
const resolvers = {
  Query: {
    people: () => people,
    person: (_: any, args: PersonQueryParams) => {
      const idx = people.findIndex(p => p.id === parseInt(args.id));
      if (idx < 0) {
        throw Error("Person not found");
      }
      return people[idx];
    }
  },
  Mutation: {
    editPerson: (_: any, args: EditPersonParams) => {
      const idx = people.findIndex(p => p.id == parseInt(args.id));
      if (idx < 0) {
        throw Error("Person not found");
      }
      if (args.payload.title) {
        people[idx].name.title = args.payload.title;
      }
      if (args.payload.first) {
        people[idx].name.first = args.payload.first;
      }
      if (args.payload.last) {
        people[idx].name.last = args.payload.last;
      }
      if (args.payload.email) {
        people[idx].email = args.payload.email;
      }
      return people[idx];
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();
const buildDir = path.join(process.cwd() + "/build");

app.use(express.static(buildDir));

app.get("/", function(req, res) {
  res.sendFile(path.join(buildDir, "index.html"));
});

app.use(cors());

// The GraphQL endpoint
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.get("/ping", function(req, res) {
  return res.json(`${10 + 4}`);
});

// Start the server
app.listen(8080, () => {
  console.log(
    `Welcome to the Firstbase Frontend Coding Challenge API\n GraphiQL: http://localhost:8080/graphiql\n GOOD LUCK!`
  );
});
