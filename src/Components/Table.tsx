/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { api } from '../server/api'
import { columns } from '../services/columns'
import TableControllers from './TableControllers'
import CreateUserDialog from './CreateUserDialog'

const Table = (): JSX.Element => {
  const [rows, setRows] = useState([])
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>()
  const [openAddCustomerDialog, setOpenAddCustomerDialog] =
    useState<boolean>(false)

  const toggleCustomerDialog = (): void => {
    setOpenAddCustomerDialog((prevState) => !prevState)
  }

  // List customers
  useEffect(() => {
    const getCustomers = async (): Promise<void> => {
      try {
        const customers = (await api.get('/customers/')).data
        // Change from 'ID' to 'id'
        const customersFormattted = customers.map(
          ({ ID, ...rest }: { ID: string }) => ({ id: ID, ...rest })
        )
        setRows(customersFormattted)
      } catch (error) {
        console.log(error)
      }
    }

    void getCustomers()
  }, [])

  return (
    <Box sx={{ width: '90%', margin: '0 auto' }}>
      <CreateUserDialog
        openAddCustomerDialog={openAddCustomerDialog}
        toggleCustomerDialog={toggleCustomerDialog}
      />
      <TableControllers
        selectionModel={selectionModel}
        toggleCustomerDialog={toggleCustomerDialog}
      />
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        checkboxSelection
        rowsPerPageOptions={[]} // Remove 'Row per page' component
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel)
        }}
      />
    </Box>
  )
}

export default Table
