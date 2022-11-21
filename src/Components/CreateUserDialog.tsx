import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material'
import React, { useState } from 'react'

interface ICreateUserDialog {
  toggleCustomerDialog: () => void
  openAddCustomerDialog: boolean
}

const CreateUserDialog = ({
  openAddCustomerDialog,
  toggleCustomerDialog
}: ICreateUserDialog): JSX.Element => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <Dialog open={openAddCustomerDialog} onClose={toggleCustomerDialog}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <DialogContentText>Add new customer</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="firstname"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastname"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleCustomerDialog}>Cancel</Button>
        <Button
          onClick={toggleCustomerDialog}
          disabled={
            firstName === '' ||
            lastName === '' ||
            email === '' ||
            password === ''
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateUserDialog
