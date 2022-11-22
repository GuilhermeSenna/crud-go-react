/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React from 'react'
import { api } from '../server/api'
// import { api } from '../server/api'
// import { ICustomer } from '../types/customer'

interface IDeleteUserDialog {
  customerId?: number
  openDeleteCustomerDialog: boolean
  toggleCustomerDeleteDialog: () => void
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  getCustomers: () => Promise<void>
}

const HandleUserDeleteDialog = ({
  customerId,
  openDeleteCustomerDialog,
  toggleCustomerDeleteDialog,
  isLoading,
  setIsLoading,
  getCustomers
}: IDeleteUserDialog): JSX.Element => {
  const handleDeleteCustomer = async (): Promise<void> => {
    try {
      // Change true to loading due to fetch API
      setIsLoading(true)

      // Check customerId
      if (!customerId) return

      // Fetch API to delete customer
      await api.delete(`/customers/${customerId}`)

      // Close Dialog
      toggleCustomerDeleteDialog()

      // List new customers info
      await getCustomers()
    } catch (error) {
      console.log(error)
    } finally {
      // Set false to loading status
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Dialog
        open={openDeleteCustomerDialog}
        onClose={toggleCustomerDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="error">
          Delete customer - ID {customerId}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will delete the chosen customer!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleCustomerDeleteDialog}>Cancel</Button>
          <Button
            onClick={() => {
              void handleDeleteCustomer()
            }}
            color="error"
            autoFocus
            disabled={isLoading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default HandleUserDeleteDialog
