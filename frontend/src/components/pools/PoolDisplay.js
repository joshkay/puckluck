import { gql, useQuery } from '@apollo/client';
import { useRouter } from "next/router";
import LineupList from 'components/lineups/LineupList';
import { Box, Typography } from '@material-ui/core';

const GET_POOL_LINEUPS = gql`
  query($slug: String!) {
    pools(where: {slug: $slug}) {
      id
      name
      lineups(sort: "points:DESC" ) {
        id
        name
        draftOrder
        points
        players {
          id
          apiId
          firstName
          lastName
          team {
            apiId
          }
          stats(where: {year:20202021}) {
            points
            goals
            assists
          }
        }
      }
    }
  }
`;

const PoolDisplay = () => 
{
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_POOL_LINEUPS, {
    variables: { 
      slug: router.query.slug 
    },
  });

  if (error) 
  {
    console.log(error);
    return "Error Loading Pool";
  }
  
  if (loading) 
  {
    return <h1>Loading ...</h1>;
  }

  if (data.pools && data.pools.length === 1) 
  {
    const pool = data.pools[0];
    return (
      <Box p={2}>
        <Typography gutterBottom variant="h1">
          {pool.name}
        </Typography>
        <LineupList lineups={pool.lineups} />
      </Box>
    );
  }
  return <h1>Add Lineups</h1>;
}

export default PoolDisplay;