import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import PlayerTeamFace from 'components/players/PlayerTeamFace';
import PlayerName from 'components/players/PlayerName';
import PlayerStat from 'components/players/PlayerStat';

const columns = [
  {
    headerName: ' ',
    field: 'teamAbbreviation',
    width: 95,
    renderCell: ({ row }) => (
      <PlayerTeamFace
        firstName={row.firstName}
        lastName={row.lastName}
        apiId={row.apiId} 
        teamApiId={row.team.apiId} 
        teamAbbreviation={row.team.abbreviation} 
        gameToday={row.team.gameToday} 
        active={row.active}
      />
    )
  },
  { 
    field: 'lastName', headerName: 'Name', flex: 1,
    renderCell: ({ row }) => (
      <PlayerName
        firstName={row.firstName}
        lastName={row.lastName}
        active={row.active}
        injury={row.injury}
      />
    )
  },
  { field: 'points', headerName: 'P', width: 40, align: 'center',
    renderCell: ({ row, value }) => (
      <PlayerStat active={row.active} value={value} />
    )
  },
  { field: 'goals', headerName: 'G', width: 40, align: 'center', 
    renderCell: ({ row, value }) => (
      <PlayerStat active={row.active} value={value} />
    )
  },
  { field: 'assists', headerName: 'A', width: 40, align: 'center',
    renderCell: ({ row, value }) => (
      <PlayerStat active={row.active} value={value} />
    )
  },
  { field: 'firstName', headerName: 'First name', hide: true }
];

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDataGrid-iconButtonContainer': {
      position: 'absolute', left: -4, top: -10,
      color: theme.palette.secondary.main
    },
    '& .MuiDataGrid-columnSeparator': {
      pointerEvents: 'none',
    },
    '& .MuiDataGrid-sortIcon': {
      fill: theme.palette.secondary.main
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      minHeight: 39
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
    assists: stats ? stats.assists : 0,
    active: stats ? stats.active : false,
    injury: stats ? stats.injury : undefined,
    teamAbbreviation: player.team ? player.team.abbreviation : undefined
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
      disableColumnSelector
      disableSelectionOnClick
      hideFooter
      disableColumnSelector
      autoHeight
    />
  );
}

export default PlayersGrid;