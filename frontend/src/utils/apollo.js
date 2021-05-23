import { 
  ApolloClient, 
  InMemoryCache, 
  HttpLink 
} from "@apollo/client";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`
});
const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache,
  link
});

export default client;