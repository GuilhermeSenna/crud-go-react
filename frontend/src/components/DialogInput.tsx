import { TextField } from '@mui/material'
import React from 'react'
import { ICustomer } from '../types/customer'

interface Iinput {
  id: string
  label: string
  type?: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<ICustomer>>
}

const DialogInput = ({
  id,
  label,
  type = 'text',
  value,
  setValue
}: Iinput): JSX.Element => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id={id}
      label={label}
      value={value}
      onChange={(e) =>
        setValue((prevState) => ({
          ...prevState,
          [id]: e.target.value
        }))
      }
      type={type}
      fullWidth
      variant="standard"
    />
  )
}

export default DialogInput
