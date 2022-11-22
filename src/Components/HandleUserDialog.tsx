/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { api } from '../server/api'
import { ICustomer } from '../types/customer'
import { checkIfHasEmptyProperties } from '../utils/checkObject'
import { DEFAULT_CUSTOMER_VALUES } from '../utils/constants'
import DialogInput from './DialogInput'

interface IHandleUserDialog {
  customerId?: number
  openHandleCustomerDialog: boolean
  isLoading: boolean
  toggleCustomerHandleDialog: () => void
  resetCustomerInfo: () => void
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  getCustomers: () => Promise<void>
  customerInfo: ICustomer
}

const HandleUserDialog = ({
  customerId,
  customerInfo,
  openHandleCustomerDialog,
  isLoading,
  toggleCustomerHandleDialog,
  setIsLoading,
  getCustomers,
  resetCustomerInfo
}: IHandleUserDialog): JSX.Element => {
  const [customer, setCustomer] = useState<ICustomer>(DEFAULT_CUSTOMER_VALUES)

  const addCustomer = async (): Promise<void> => {
    try {
      // Change true to loading due to fetch API
      setIsLoading(true)

      // Create Or Edit customer
      customerId
        ? await api.put(`/customers/${customerId}`, customer)
        : await api.post('/customers/', customer)

      // Clear customer inputs
      setCustomer(DEFAULT_CUSTOMER_VALUES)

      // Close Dialog
      toggleCustomerHandleDialog()

      // List new customers info
      await getCustomers()

      // Reset customer inputs
      resetCustomerInfo()
    } catch (error) {
      console.log(error)
    } finally {
      // Set false to loading status
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // If is editing customer
    if (customerId) {
      return setCustomer({
        firstname: customerInfo.firstname,
        lastname: customerInfo.lastname,
        email: customerInfo.email,
        password: ''
      })
    }

    // Clear inputs
    setCustomer(DEFAULT_CUSTOMER_VALUES)
  }, [customerId])

  return (
    <Dialog
      open={openHandleCustomerDialog}
      onClose={toggleCustomerHandleDialog}
    >
      <DialogTitle>{customerId ? 'Edit customer' : 'Add customer'}</DialogTitle>
      <DialogContent>
        <DialogInput
          id="firstname"
          label="First Name"
          value={customer.firstname}
          setValue={setCustomer}
        />

        <DialogInput
          id="lastname"
          label="Last Name"
          value={customer.lastname}
          setValue={setCustomer}
        />

        <DialogInput
          id="email"
          label="Email"
          type="email"
          value={customer.email}
          setValue={setCustomer}
        />

        <DialogInput
          id="password"
          label="Password"
          type="password"
          value={customer.password}
          setValue={setCustomer}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleCustomerHandleDialog}>Cancel</Button>
        <Button
          onClick={() => {
            void addCustomer()
          }}
          disabled={checkIfHasEmptyProperties(customer) || isLoading}
        >
          {customerId ? 'Edit' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default HandleUserDialog
