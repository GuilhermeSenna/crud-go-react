/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { api } from '../server/api'
import { handleColumns } from '../services/columns'
import TableControllers from './TableControllers'
import HandleUserDialog from './HandleUserDialog'
import { ICustomer, ICustomerParams } from '../types/customer'
import { DEFAULT_CUSTOMER_VALUES } from '../utils/constants'
import HandleUserDeleteDialog from './HandleUserDeleteDialog'
import { Stack } from '@mui/system'

const Table = (): JSX.Element => {
  const [rows, setRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectionRows, setSelectionRows] = useState<GridSelectionModel>()
  const [openHandleCustomerDialog, setOpenHandleCustomerDialog] =
    useState(false)
  const [openDeleteCustomerDialog, setOpenDeleteCustomerDialog] =
    useState(false)
  const [customerId, setCustomerId] = useState<number | undefined>()
  const [customerInfo, setCustomerInfo] = useState<ICustomer>(
    DEFAULT_CUSTOMER_VALUES
  )

  const toggleCustomerHandleDialog = (): void => {
    setOpenHandleCustomerDialog((prevState) => !prevState)
    resetCustomerInfo()
  }

  const toggleCustomerDeleteDialog = (): void => {
    setOpenDeleteCustomerDialog((prevState) => !prevState)
  }

  const resetCustomerInfo = (): void => {
    setCustomerId(undefined)
  }

  const updateCustomer = (customerId_: number): void => {
    setCustomerId(customerId_)
    setOpenHandleCustomerDialog(true)

    const customerInfo_ = rows.find((row: ICustomer) => {
      return row.id === customerId_
    })

    if (!customerInfo_) return
    setCustomerInfo(customerInfo_)
  }

  const deleteCustomer = (customerId_: number): void => {
    setCustomerId(customerId_)
    setOpenDeleteCustomerDialog(true)
  }

  const deleteMultipleCustomers = async (): Promise<void> => {
    if (!selectionRows?.length) return

    await Promise.all(
      selectionRows.map(async (row) => {
        try {
          await api.delete(`/customers/${row}`)
        } catch (error) {
          console.log(error)
        }
      })
    )

    await getCustomers()
  }

  const changeCustomerId = (customerId_?: number): void => {
    setCustomerId(customerId_)
  }

  const getCustomers = async (): Promise<void> => {
    try {
      // Get customers
      const customers = (await api.get('/customers/')).data

      // Change from 'ID' to 'id'
      // Ignore password
      const customersFormattted = customers.map(
        ({ ID, firstname, lastname, email, password }: ICustomerParams) => ({
          id: ID,
          firstname,
          lastname,
          email
        })
      )

      // Update Rows
      setRows(customersFormattted)
    } catch (error) {
      console.log(error)
    } finally {
      // Set false to loading status
      setIsLoading(false)
    }
  }

  // List customers
  useEffect(() => {
    void getCustomers()
  }, [])

  return (
    <Box sx={{ width: '90%', margin: '0 auto' }}>
      <HandleUserDialog
        customerId={customerId}
        customerInfo={customerInfo}
        resetCustomerInfo={resetCustomerInfo}
        openHandleCustomerDialog={openHandleCustomerDialog}
        toggleCustomerHandleDialog={toggleCustomerHandleDialog}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        getCustomers={getCustomers}
      />
      <HandleUserDeleteDialog
        toggleCustomerDeleteDialog={toggleCustomerDeleteDialog}
        customerId={customerId}
        openDeleteCustomerDialog={openDeleteCustomerDialog}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        getCustomers={getCustomers}
      />
      <TableControllers
        selectionModel={selectionRows}
        toggleCustomerHandleDialog={toggleCustomerHandleDialog}
        deleteMultipleCustomers={() => {
          void deleteMultipleCustomers()
        }}
      />
      <DataGrid
        autoHeight
        rows={rows}
        columns={handleColumns({
          changeCustomerId,
          updateCustomer,
          deleteCustomer
        })}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No customers found
            </Stack>
          )
        }}
        checkboxSelection
        rowsPerPageOptions={[]} // Remove 'Row per page' component
        onSelectionModelChange={(selectedRows) => {
          setSelectionRows(selectedRows)
        }}
        selectionModel={selectionRows}
      />
    </Box>
  )
}

export default Table
