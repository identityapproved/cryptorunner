import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = ({ handleClose }) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const { setAlert } = CryptoState()

   const handleSubmit = async () => {
      if (password !== confirmPassword) {
         setAlert({
            open: true,
            message: 'Passwords do not match',
            type: 'error'
         })
      }
      try {
         const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );

         setAlert({
            open: true,
            message: `Successfully. Welcome ${result.user.email}`,
            type: 'success'
         })

         handleClose()
      } catch (error) {
         setAlert({
            open: true,
            message: error.message,
            type: 'error'
         })
         return
      }

   }

   return (
      <Box
         p={3}
         style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
         <TextField
            variant='outlined'
            type='email'
            label='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
         />
         <TextField
            variant='outlined'
            type='password'
            label='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
         />
         <TextField
            variant='outlined'
            type='password'
            label='Repeat your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
         />
         <Button
            variant='contained'
            size='large'
            style={{ backgroundColor: '#2ec4b6' }}
            onClick={handleSubmit}
         >Sign Up</Button>
      </Box>
   )
}

export default Signup