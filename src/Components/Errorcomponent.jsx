import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

export default function Errorcomponent({message}) {
  return (
    <Alert status={'error'}
     pos={'fixed'}
      bottom={'4'} 
      left={'50%'} 
      transform={'translateX(-50%)'}
       w={'container.lg'}>
      <AlertIcon />
      {message}
    </Alert>
  )
}
