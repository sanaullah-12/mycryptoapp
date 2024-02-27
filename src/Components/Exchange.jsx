import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, HStack} from '@chakra-ui/react'
import Loader from './Loader'
import ExchangeCard from './ExchangeCard'
import Errorcomponent from './Errorcomponent'

export default function Exchange() {
    const [exchanges , setexchanges] = useState([])
    const [loader , setloader] = useState(true)
    const [error, seterror] = useState(false)
    useEffect(()=>{
        const Exchangedata = async()=>{
            try {
                const {data }= await axios.get('https://api.coingecko.com/api/v3/exchanges')
            setexchanges(data)
            setloader(false)
            // console.log(data)
                
            } catch (error) {
                seterror(true)
                setloader(false)
            }
        }
        Exchangedata()
    },[])
    if(error) return(<Errorcomponent message={'fetching data is not responding'}/>)
  return (
    <Container maxW={'container.xl'}>
    {
        loader? <Loader/>:
        
            <>
           
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
               {exchanges.map(i=>{
                
                return(
                   <ExchangeCard
                   key={i.id}
                    name={i.name}
                    image={i.image}
                    rank={i.trust_score_rank}
                    url={i.url}
                   />
                )
               
               })}
                </HStack>
            </>
        
    }

    </Container>
  )
}
