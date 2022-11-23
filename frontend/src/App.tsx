import React from 'react'
import './App.css'
import { Typography } from '@mui/material'
import Table from './components/Table'

const App = (): JSX.Element => {
  return (
    <main>
      {/* <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
    </Alert> */}
      <Typography variant="h5" align="center" sx={{ py: 2 }}>
        Teste frontend - Problem Company
      </Typography>

      <Table />
    </main>
  )
}

export default App
