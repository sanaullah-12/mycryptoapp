import React from 'react'
import { VStack,Heading,Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
export default function CoinCard({id,name,image,symbol,price , currencysymbol='₹'}) {
  return (
    <>
   <Link to={`/coindetail/${id}`} >
     <VStack 
     width={'52'} 
     shadow={'lg'} 
     p={'8'} 
     transition={'all 0.3s'} 
     borderRadius={'lg'}
      m={'4'} 
      css={{
        '&:hover':{
          transform: 'scale(1.1)'
        }}}>


      <img src={image} width={'50'} h={'50'} objectfit={'contain'} alt='img'/>
      <Heading size={'md'} noOfLines={1}>{symbol}</Heading>
     <Text noOfLines={1}>{name}</Text>
     <Text noOfLines={1}>{price? `${currencysymbol}${price}`:"NA"}</Text>
     </VStack>
    </Link>
  </>
  )
}
