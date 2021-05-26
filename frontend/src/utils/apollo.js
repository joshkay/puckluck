import { 
  ApolloClient, 
  InMemoryCache, 
  HttpLink 
} from "@apollo/client";
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        readLineups: {
          
        }
      }
    }
  }
});
// if (typeof window !== "undefined")
// {
//   persistCache({
//     cache,
//     storage: new LocalStorageWrapper(window.localStorage),
//   });
// }

const link = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`
});
const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache,
  link
});

export default client;