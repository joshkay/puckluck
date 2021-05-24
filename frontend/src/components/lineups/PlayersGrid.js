import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const columns = [
  {
    headerName: ' ',
    field: 'image',
    width: 75,
    renderCell: ({ row }) => (
      <Box display="flex" flexDirection="row" 
        justifyContent="center" alignItems="center">
        <img
          style={{ 
            height: 30,
            marginLeft: -15 
          }}
          src={`//www-league.nhlstatic.com/images/logos/teams-20202021-light/${row.team.apiId}.svg`}
        />
        <img
          style={{ 
            height: 40, 
            objectFit: 'cover',
            border: '1px solid rgb(224, 224, 224)',
            borderRadius: '50%',
            width: 35,
            height: 35,
            marginLeft: -5,
            boxShadow: '0 10px 6px -6px #777'
          }}
          src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${row.apiId}.jpg`}
        />
      </Box>
    )
  },
  { 
    field: 'fullName', headerName: 'Name', flex: 1,
    valueGetter: ({ row }) => `${row.firstName} ${row.lastName}`
  },
  { field: 'points', headerName: 'P', width: 40 },
  { field: 'goals', headerName: 'G', width: 40 },
  { field: 'assists', headerName: 'A', width: 40 },
  { field: 'firstName', headerName: 'First name', hide: true },
  { field: 'lastName', headerName: 'Last name', hide: true }
];

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDataGrid-iconButtonContainer': {
      position: 'absolute', left: -4, top: -10,
      color: theme.palette.secondary.main
    },
    backgroundColor: theme.palette.background.paper
  }
}));

const parsePlayers = (players) => players.map(p => 
{
  let player = {...p}
  const stats = player.stats[0];
  delete player.stats;

  return {
    ...player,
    points: stats ? stats.points : 0,
    goals: stats ? stats.goals : 0,
    assists: stats ? stats.assists : 0
  }
});

const sortModel = [{
  field: 'points',
  sort: 'desc'
}];

const PlayersGrid = ({ players }) => 
{
  const classes = useStyles();
  
  return (
    <DataGrid
      className={classes.root}
      rows={parsePlayers(players)} 
      columns={columns}
      sortModel={sortModel}
      density="compact"
      disableColumnMenu
      disableSelectionOnClick
      hideFooter
      disableColumnSelector
      autoHeight
    />
  );
}

export default PlayersGrid;