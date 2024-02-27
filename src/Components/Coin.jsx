import {v4 as uuidv4} from 'uuid'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import Loader from './Loader'

import Errorcomponent from './Errorcomponent'
import CoinCard from './CoinCard'

export default function Coin() {
    const [coin , setCoin] = useState([])
    const [loader , setLoader] = useState(true)
    const [error, seterror] = useState(false)
    const [page,setpage] = useState(1)
    const [currency , setcurrency] = useState('inr')


    const currencysymbol= currency==='pkr'?'Rs: ':currency=== 'eur'?'€':'$'

    const ChangePage = (page)=>{
        setpage(page)
        setLoader(true)
    }

    const btns = new Array(132).fill(1)
    useEffect(()=>{
        const Coindata = async()=>{
            try {
                const {data }= await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`)
            setCoin(data)
            setLoader(false)
            // console.log(data)
                
            } catch (error) {
                seterror(true)
                setLoader(false)
            }
        }
        Coindata()
    },[currency,page])
    if(error) return(<Errorcomponent message={'fetching data is not responding'}/>)
  return (
    <Container maxW={'container.xl'}>
    {
        loader? <Loader/>:

            <>
            <RadioGroup value={currency} onChange={setcurrency} p={'8'}>
                <HStack spacing={'4'}>
                    <Radio value='pkr'>PKR</Radio>
                    <Radio value='usd'>USD</Radio>
                    <Radio value='eur'>EUR</Radio>
                </HStack>
            </RadioGroup>



                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
               {coin.map(b =>{
                
                return(
                    
                   <CoinCard
                    key={uuidv4()}
                   id={b.id}
                    name={b.name}
                    image={b.image}
                    price={b.current_price}
                    symbol={b.symbol}
                   currencysymbol={currencysymbol}
                   />
                )
               
               })}
                </HStack>

                <HStack w={'full'} overflowX={'auto'} p={'8'}>
                    {
                        btns.map((items,index)=>{
                            return(
                                
                                <Button
                                key={items.id}
                     bgColor={'blackAlpha.900'} 
                     color={'white'} 
                     onClick={()=>ChangePage(index+1)}>

                     {index+1}
                     </Button>
                            )
                        })
                    }
                </HStack>
            </>
        
    }

    </Container>
  )
}
