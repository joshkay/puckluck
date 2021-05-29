import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PoolListDisplay from './PooListDisplay';

const GET_POOLS = gql`
  query Pools {
    pools {
      slug
      name
      description
      year
      league
      type
      image {
        url
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
}));

const PoolList = () => 
{
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_POOLS);
  if (error) 
  {
    console.log(error);
    return "Error Loading Pools";
  }
  
  if (loading) 
  {
    return <h1>Loading ...</h1>;
  }

  return (
    <Grid className={classes.root} 
      container 
      spacing={2}>
      {
        data.pools !== undefined ? data.pools.map((pool, index) => (
          <Grid key={index} item md={3}>
            <PoolListDisplay {...pool} />
          </Grid>
        )) : null
      }
    </Grid>
  );
}

export default PoolList;