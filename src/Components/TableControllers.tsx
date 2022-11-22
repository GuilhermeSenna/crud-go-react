/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { Button, Stack } from '@mui/material'
import { GridSelectionModel } from '@mui/x-data-grid'

interface ITableControllers {
  selectionModel?: GridSelectionModel
  toggleCustomerHandleDialog: () => void
  deleteMultipleCustomers: () => void
}

const TableControllers = ({
  selectionModel,
  toggleCustomerHandleDialog,
  deleteMultipleCustomers
}: ITableControllers): JSX.Element => {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <Button
        variant="outlined"
        color="success"
        onClick={toggleCustomerHandleDialog}
      >
        Add customer
      </Button>
      <Button
        variant="outlined"
        color="error"
        disabled={!selectionModel?.length}
        onClick={deleteMultipleCustomers}
      >
        Delete customers
      </Button>
    </Stack>
  )
}

export default TableControllers
