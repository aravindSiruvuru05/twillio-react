import React, { useEffect, useState } from 'react'

import { Client as TwilioClient } from 'twilio-chat'
import { generateRandomName } from './utils'
import ChatsList from './ChatsList'
import CreateNewChat from './CreateNewChat'
import ChatWindow from './ChatWindow'

const ChatScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [currChat, setCurrChat] = useState(null)
  const [chatClient, setChatClient] = useState(null)
  const [userIdentity, setUserIdentity] = useState('')

  console.log(userIdentity, "useiude----", chatClient, "-- chatclietnt")
  useEffect(() => {
    const userIdty = generateRandomName()
    setUserIdentity(userIdty)
    setIsLoading(true)
    getChatClient(userIdty)
      .then((client) => {
        setChatClient(client)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const getChatClient = async (userIdty) => {
    if (!userIdty) {
      console.log('user Identity not provided to generate access token.')
      return null
    }
    try {
      const res = await fetch(`http://localhost:3000/token/${userIdty}`)
      const accessToken = await res.json()
      const client = await TwilioClient.create(accessToken.token)
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
  console.log(chatClient, "chat cliuent ----")
  return (
    <div style={{ display: 'flex', alignItems: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <h5>Current User: {userIdentity}</h5>
        <CreateNewChat chatClient={chatClient} userIdentity={userIdentity} onCreateChat={handleChatChange} />
        <ChatsList chatClient={chatClient} currChatName={currChat?.uniqueName} userIdentity={userIdentity} onChatChange={handleChatChange} />
      </div>
      <hr class="solid"></hr>
      <ChatWindow currChat={currChat} />
    </div>
  )
}

export default ChatScreen
