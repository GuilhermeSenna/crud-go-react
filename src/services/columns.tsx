import React from 'react'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'

interface IHandleColumns {
  changeCustomerId: (customerId?: number) => void
  updateCustomer: (customerId: number) => void
  deleteCustomer: (customerId: number) => void
}

export const handleColumns = ({
  changeCustomerId,
  updateCustomer,
  deleteCustomer
}: IHandleColumns): GridColDef[] => {
  return [
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
          onClick={() => updateCustomer(Number(params.id))}
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
          onClick={() => deleteCustomer(Number(params.id))}
        >
          <DeleteIcon />
        </Button>
      )
    }
  ]
}
