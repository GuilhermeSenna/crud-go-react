/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { Button, Stack } from '@mui/material'
import { GridSelectionModel } from '@mui/x-data-grid'

interface ITableControllers {
  selectionModel?: GridSelectionModel
  toggleCustomerDialog: () => void
}

const TableControllers = ({
  selectionModel,
  toggleCustomerDialog
}: ITableControllers): JSX.Element => {
  console.log(selectionModel)

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <Button variant="outlined" color="success" onClick={toggleCustomerDialog}>
        Add customer
      </Button>
      <Button
        variant="outlined"
        color="error"
        disabled={!selectionModel?.length}
      >
        Delete customers
      </Button>
    </Stack>
  )
}

export default TableControllers
