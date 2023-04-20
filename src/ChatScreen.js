import React, { useEffect, useState } from 'react'

import { Client as TwilioClient } from 'twilio-chat'
import ChatsList from './ChatsList'
import CreateNewChat from './CreateNewChat'
import ChatWindow from './ChatWindow'

const ChatScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currChat, setCurrChat] = useState(null)
  const [chatClient, setChatClient] = useState(null)
  const [userIdentity, setUserIdentity] = useState('')

  useEffect(() => {
    setIsLoading(true)
    getChatClient()
      .then((client) => {
        setChatClient(client)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const getChatClient = async () => {
    try {
      const res = await fetch('https://2mdtmkwci2.execute-api.us-east-1.amazonaws.com/dev/twilio/token', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNMejZEdWlRcVF6YXAweFV1QkF0eiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wdmYyZzJ1c29ubndpNDRyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2M2U1NDAyNzU5NWM5YTk4NjdmMGM3NjkiLCJhdWQiOlsiaHR0cHM6Ly9yZWRnaXN0cnkuY29tIiwiaHR0cHM6Ly9kZXYtMHZmMmcydXNvbm53aTQ0ci51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTg1ODk3LCJleHAiOjE2ODAwNzIyOTcsImF6cCI6IkdBQTBHWFBtOWdzUHJJSXBMS0N0c0p6aUNJcUFpSGVZIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBhZGRyZXNzIHBob25lIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.T2GSk2OoBioJZNg4w3m2d8W5reaHbzBS0kki89RbKLlj-Je0eIVF2uyCUzxjZYBLQAThfZTeSoLQ1M9S1n4mm-GVvgEQJHCL_BXO4uVohvSBjtNHLMEg4Xri2A5dJJbP7Ahp478Sqs5X3UmI9aNLoLn57IBTTRUhcNYWo81UdI2TRNagAWjXS709-LPlgxL-tT8u1k4kadgJ3L7Y6PIzNDbXqTy0NJ9qZdP4DKtAVvVyjFNS505eBKEmvJoyAPgQpJRfsLq60sbFZWxpfMnbGVzbC7Z6L3sp7qHiK6JAdvuRQeBh8JbqCpKHGaAp2swzRi55ydXt9y9VvH4fl44oTg',
        },
      })
      const response = await res.json()
      const { data } = response
      setUserIdentity(data.identity)

      const client = await TwilioClient.create(data.token)
      return client
    } catch (e) {
      console.log(e)
      return null
    }
  }

  const handleChatChange = (chat) => {
    setCurrChat(chat)
  }

  if (isLoading) return <div style={{ marginTop: '50px' }}>isLoading...</div>
  console.log(chatClient, 'chat cliuent ----')
  return (
    <div style={{ display: 'flex', alignItems: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h5>Current User: {userIdentity}</h5>
        <CreateNewChat chatClient={chatClient} userIdentity={userIdentity} onCreateChat={handleChatChange} />
        <ChatsList chatClient={chatClient} currChatName={currChat?.uniqueName} userIdentity={userIdentity} onChatChange={handleChatChange} />
      </div>
      <hr class='solid'></hr>
      <ChatWindow currChat={currChat} />
    </div>
  )
}

export default ChatScreen
