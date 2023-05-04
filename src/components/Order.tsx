import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { OrderItem } from '../interfaces/order'

function Order(props: OrderItem) {
  return (
    <div>
      <Box>
        <Box sx={{display:'flex', flexDirection: 'column'}}>
        <Typography>
            Date: {props.createdAt}
          </Typography>
          <Typography>
            Price: {props.amountPaid}
          </Typography>
          <Typography>
            status: {props.status}
          </Typography>
        </Box>


        <Divider/>
      </Box>
    </div>
  )
}


export default Order

