import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:4000/",
  uri: "https://666d-2404-8000-1004-8506-d08e-8a2e-81bc-8096.ap.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
