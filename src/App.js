import React, { useState } from 'react'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react'
import solaceConnection from './solace-handler'
import Paho from 'paho-mqtt'
import options from './solace-credentials'
// const client = new Paho.Client(
//   options.invocationContext.host,
//   Number(options.invocationContext.port),
//   options.invocationContext.clientId
// )
// const client = new Paho.Client(
//   'mr-connection-rk4tzl653xg.messaging.solace.cloud',
//   8443,
//   'example'
// )

// const onConnect = () => {
//   console.log('connected')
//   client.subscribe('button')
// }
// // client.onMessageArrived = (message) => {
// //   console.log(message)
// // }

// client.connect({
//   onSuccess: onConnect,
//   reconnect: true,
//   userName: 'solace-cloud-client',
//   password: 'sg835eck7glfctk3plj7k686ei',
// })

function App() {
  const [counter, setCounter] = useState(0)

  solaceConnection.connectWithPromise().then((response) => {
    // console.log('connected:', solaceConnection())
    solaceConnection.subscribe('exampletopic')
    solaceConnection.register((message) => {
      console.log(message)
    })
  })

  const handleClick = () => {
    const message = new Paho.Message(JSON.stringify({ text: 'counterUp' }))
    message.destinationName = 'exampletopic'
    solaceConnection.send(message)
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign='center' fontSize='xl'>
        <Flex minH='100vh' alignItems='center' justifyContent='center' p={3}>
          <VStack>
            <Heading>{counter}</Heading>
            <Button onClick={handleClick}>counter</Button>
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default App
