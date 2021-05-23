import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const columns = [
  {
    headerName: ' ',
    field: 'team',
    width: 50,
    renderCell: ({ value }) => (
      <img
        style={{ width: 50, height: 50, marginLeft: -10 }}
        src={`//www-league.nhlstatic.com/images/logos/teams-20202021-light/${value.apiId}.svg`}
      />
    )
  },
  {
    headerName: ' ',
    field: 'apiId',
    width: 50,
    renderCell: ({ value }) => (
      <img
        style={{ width: 50, height: 50, marginLeft: -10 }}
        src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${value}.jpg`}
      />
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
    }
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
    <div style={{ height: 400, width: '100%' }}>
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
    </div>
  );
}

export default PlayersGrid;