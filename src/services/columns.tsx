import React from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 30 },
  { field: 'firstname', headerName: 'First name', flex: 1, minWidth: 150 },
  { field: 'lastname', headerName: 'Last name', flex: 1, minWidth: 150 },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 150
  },
  {
    field: 'edit',
    headerName: 'Edit',
    renderCell: (params: GridRenderCellParams<string>) => (
      <Button
        variant="outlined"
        size="small"
        color="warning"
        // tabIndex={params.hasFocus ? 0 : -1}
      >
        <EditIcon />
      </Button>
    ),
    width: 80
  },
  {
    field: 'delete',
    headerName: 'Delete',
    renderCell: (params: GridRenderCellParams<string>) => (
      <Button
        variant="outlined"
        size="small"
        color="error"
        // tabIndex={params.hasFocus ? 0 : -1}
      >
        <DeleteIcon />
      </Button>
    )
  }
]
