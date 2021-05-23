import { DataGrid } from '@material-ui/data-grid';

const columns = [
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
    field: 'fullName', headerName: 'Name', width: 200,
    valueGetter: ({ row }) => `${row.firstName} ${row.lastName}`
  },,
  { field: 'points', headerName: 'Points', width: 100 },
  { field: 'goals', headerName: 'Goals', width: 100 },
  { field: 'assists', headerName: 'Assists', width: 120 },
  { field: 'firstName', headerName: 'First name', hide: true },
  { field: 'lastName', headerName: 'Last name', hide: true }
];

const PlayersGrid = ({ players }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={players} 
        columns={columns}
        density="compact"
        disableColumnMenu
        disableSelectionOnClick
        hideFooterPagination
        disableColumnSelector
      />
    </div>
  );
}

export default PlayersGrid;