import PoolList from "components/pools/PoolList";
//import { gql } from '@apollo/client';
//import client from 'utils/apollo';

// export const getStaticProps = async () => {
//   const { data } = await client.query({
//     query: gql`
//       query Pools {
//         pools {
//           slug
//           name
//           description
//           year
//           league
//           type
//           image {
//             url
//           }
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       pools: data.pools
//     },
//  };
// }

const Pools = () => {
  return (
    <PoolList />
  )
}

export default Pools;