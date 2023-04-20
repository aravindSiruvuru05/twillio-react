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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNMejZEdWlRcVF6YXAweFV1QkF0eiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wdmYyZzJ1c29ubndpNDRyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDI1ODQyNDUyMDFkNWVmMTQ1NjNmNzEiLCJhdWQiOlsiaHR0cHM6Ly9yZWRnaXN0cnkuY29tIiwiaHR0cHM6Ly9kZXYtMHZmMmcydXNvbm53aTQ0ci51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjgxOTc1NDA5LCJleHAiOjE2ODIwNjE4MDksImF6cCI6IkdBQTBHWFBtOWdzUHJJSXBMS0N0c0p6aUNJcUFpSGVZIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBhZGRyZXNzIHBob25lIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.b3_lJ29r7Af4dhYZeY22Or6SJ9qNKi_he-gZtAss_1OP0uAJZWLtrIvCO1k6EeYsanZu4ZaSAzxLqwjXe0vZpSf6Hn-Tyg7xEAwPztVodkmvOCWI4hbx2KtyqhJK11buHQUDSA06kHOxlmvcHv-gOvi-h90NBs7Yb-XQ4m12NacAtY6XYMFjG8WZQ1Tc6QFxPpx5tJh3PnX5rNlNf4u6fXmzs1--FkhSCnRV3J9MALX6CMedbqOpmGo_9z8BqN07HsndWUmf1aasKsi1_QpgD7S8sxOJ-SGxc0PYyqV1tr_b_G2gqTtt3WOYek4W-y17EAWLcem_SozAiB3uP_Qnkg',
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
