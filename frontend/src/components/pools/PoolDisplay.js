import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import LineupList from 'components/lineups/LineupList';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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
            abbreviation
            apiId
            gameToday
          }
          stats(where: {year:20202021}) {
            points
            goals
            assists
            active,
            injury {
              status,
              type
              startDate,
              returns
            }
          }
        }
      }
    }
  }
`;

const PoolDisplay = ({ slug }) => 
{
  const { loading, error, data } = useQuery(GET_POOL_LINEUPS, {
    variables: { 
      slug 
    },
  });

  const [expand, setExpand] = useState(true);

  if (error) 
  {
    console.log(error);
    return (
      <Box p={2}>
        <Typography color="error" variant="h1">
          Error Loading Pool!
        </Typography>
      </Box>
    );
  }
  
  if (loading) 
  {
    return (
      <Box p={2}>
        <Typography variant="h1">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (data.pools && data.pools.length === 1) 
  {
    const pool = data.pools[0];
    return (
      <Box p={2}>
        <Box display="flex" alignItems="center">
          <Typography gutterBottom variant="h1">
            {pool.name}
          </Typography>
          <Box ml={2} 
            display="flex"
          >
            <Button onClick={() => setExpand(false)}>
              Collapse All
            </Button>
            <Button onClick={() => setExpand(true)}>
              Expand All
            </Button>
          </Box>
        </Box>
        <LineupList
          expand={expand}
          clearExpand={() => setExpand(null)}
          lineups={pool.lineups}
        />
      </Box>
    );
  }
  return <h1>Add Lineups</h1>;
}

export default PoolDisplay;