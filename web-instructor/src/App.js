import router from "./router";
import { RouterProvider } from "react-router-dom";
import { BASE_URL } from "./config";
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
const httpLink = createHttpLink({
  uri: BASE_URL,
});
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      access_token: localStorage.getItem("access_token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;
