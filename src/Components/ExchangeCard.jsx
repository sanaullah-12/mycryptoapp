import { Heading, VStack ,Text } from '@chakra-ui/react'
import React from 'react'

export default function ExchangeCard({name,image,rank,url}) {
  return (
  <>
    <a href={url} target={'blank'}>
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


      <img src={image} w={'10'} h={'10'} objectfit={'contain'} alt='img'/>
      <Heading size={'md'} noOfLines={1}>{rank}</Heading>
     <Text noOfLines={1}>{name}</Text>
     </VStack>
    </a>
  </>
  )
}
