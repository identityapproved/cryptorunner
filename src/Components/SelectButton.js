import { makeStyles } from '@material-ui/core'
import React from 'react'

const SelectButton = ({ children, selected, onClick }) => {
   const useStyles = makeStyles({
      selectButton: {
         border: '1px solid darkgray',
         borderRadius: 5,
         padding: 10,
         paddingRight: 20,
         paddingLeft: 20,
         fontFamily: "Poppins",
         cursor: 'pointer',
         backgroundColor: selected ? '#cbf3f0' : '',
         color: selected ? 'black' : '',
         fontWeight: selected ? 700 : 500,
         '&:hover': {
            backgroundColor: '#2ec4b6',
            // color: 'black'
         },
         width: '23%',
         marginTop: 5
      }
   })

   const classes = useStyles()
   return (
      <span
         className={classes.selectButton}
         onClick={onClick}
      >{children}</span>
   )
}

export default SelectButton