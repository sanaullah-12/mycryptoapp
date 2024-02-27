import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Stat, StatLabel, StatNumber, StatArrow, StatHelpText, Badge, Progress,  Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Chartss from './Chartss'

export default function CoinDetail() {

  const params = useParams()
  const [coins, setCoin] = useState({})
  const [loader, setLoader] = useState(true)
  const [, seterror] = useState(false)
  const [currency, setcurrency] = useState('inr')
  const [Days, setDays] = useState('24h')
  const [ChartArray, SetChartArray] = useState([])


  const currencysymbol = currency === 'pkr' ? 'Rs ' : currency === 'eur' ? '€' : '$'
  useEffect(() => {
    const FetchCoindata = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
        const { data: ChartData } = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${Days}`)
        setCoin(data)
        SetChartArray(ChartData.prices)

        setLoader(false)


      } catch (error) {

        seterror(true)
        setLoader(false)
      }
    }
    FetchCoindata()
  }, [params.id,currency,Days])
  const btns = ['24h', '7d', '14d' , '30d' , '60d' , '200d' ,  '1y' , 'max']

  const SwitchChartStats= (key)=>{
     switch (key) {
      case '24h':
        setDays('24h')
        setLoader(true)
        break;
        case '7d':
        setDays('7d')
        setLoader(true)
        break;
        case '14d':
        setDays('14d')
        setLoader(true)
        break;
        case '30d':
        setDays('30d')
        setLoader(true)
        break;
        case '60d':
        setDays('60d')
        setLoader(true)
        break;
        case '200d':
        setDays('200d')
        setLoader(true)
        break;
        case '1y':
        setDays('365')
        setLoader(true)
        break;
        case 'max':
        setDays('max')
        setLoader(true)
        break;
      default:
        setDays('24h')
        setLoader(true)
        break;
     }
  }

  return (
    <Container maxW={'container.xl'}>
      {
        loader ? <Loader /> :
          (
            <>





              <Box width={'full'} borderWidth={1}>
                <Chartss arr={ChartArray} Currency={currencysymbol} days={Days} />
              </Box>

              {/* button */}
              <HStack p={'4'} overflowX={'auto'}>
                {
                  btns.map((i)=>(
                    <Button key={i} onClick={()=>SwitchChartStats(i)}>{i}</Button>
                  ))
                }
              </HStack>


              <RadioGroup value={currency} onChange={setcurrency} p={'8'}>
                <HStack spacing={'4'}>
                  <Radio value='pkr'>PKR</Radio>
                  <Radio value='usd'>USD</Radio>
                  <Radio value='eur'>EUR</Radio>
                </HStack>
              </RadioGroup>

              <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
                <Text fontSize={'small'} alignSelf={'center'}>
                  Last Update On{" "} ({Date(coins.market_data.last_updated).split('G')[0]})

                </Text>
                <img src={coins.image.large}
                  alt='img'
                  width={'46'}
                  height={'46'}
                  objectFit={'contain'} />

                <Stat>
                  <StatLabel>{coins.name}</StatLabel>
                  <StatNumber>
                    {currencysymbol}
                    {coins.market_data.current_price[currency]}
                  </StatNumber>

                  <StatHelpText>
                    <StatArrow type={coins.market_data.market_cap_change_24h > 0 ? 'increase' : 'decrease'} />
                    {coins.market_data.market_cap_change_24h}%
                  </StatHelpText>
                </Stat>
                <Badge fontSize={'1xl'}
                  backgroundColor={'blackAlpha.600'}
                  color={'white'}>
                  #{coins.market_cap_rank}
                </Badge>
                <CustomBar high={`${currencysymbol}${coins.market_data.high_24h[currency]}`}
                  low={`${currencysymbol}${coins.market_data.low_24h[currency]}`} />

                <Box w={'full'} p={'4'}>
                  <Items title={'Max Supply'} value={coins.market_data.max_supply} />
                  <Items title={'Circulating Supply'} value={coins.market_data.circulating_supply} />
                  <Items title={'Market Cap '} value={`${currencysymbol}${coins.market_data.market_cap[currency]}`} />
                  <Items title={'All Time High '} value={`${currencysymbol}${coins.market_data.ath[currency]}`} />
                  <Items title={'All Time Low '} value={`${currencysymbol}${coins.market_data.atl[currency]}`} />
                </Box>
              </VStack>
            </>
          )
      }
    </Container>
  )
}


const Items = ({ title, value }) => (
  <HStack width={'full'} justifyContent={'space-between'} padding={'4'}>
    <Text fontFamily={'Bebas Neue'}>{title}</Text>
    <Text fontFamily={'Bebas Neue'}>{value}</Text>
  </HStack>
)



const CustomBar = ({ high, low }) => (
  <VStack width={'full'}>
    <Progress value={'50'} colorScheme='teal' width={'full'} />
    <HStack justifyContent={'space-between'} width={'full'}>
      <Badge children={low} colorScheme='red' />
      <Text fontSize={'sm'}>24 hr</Text>
      <Badge children={high} colorScheme='green' />

    </HStack>
  </VStack>
)
