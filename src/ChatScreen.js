import React, { useEffect, useState } from 'react'

import { Client as TwilioClient } from 'twilio-chat'
import ChatsList from './ChatsList'
import CreateNewChat from './CreateNewChat'
import ChatWindow from './ChatWindow'

const tokens = [
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNMejZEdWlRcVF6YXAweFV1QkF0eiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wdmYyZzJ1c29ubndpNDRyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDI1ODQyNDUyMDFkNWVmMTQ1NjNmNzEiLCJhdWQiOlsiaHR0cHM6Ly9yZWRnaXN0cnkuY29tIiwiaHR0cHM6Ly9kZXYtMHZmMmcydXNvbm53aTQ0ci51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjgxOTc1NDA5LCJleHAiOjE2ODIwNjE4MDksImF6cCI6IkdBQTBHWFBtOWdzUHJJSXBMS0N0c0p6aUNJcUFpSGVZIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBhZGRyZXNzIHBob25lIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.b3_lJ29r7Af4dhYZeY22Or6SJ9qNKi_he-gZtAss_1OP0uAJZWLtrIvCO1k6EeYsanZu4ZaSAzxLqwjXe0vZpSf6Hn-Tyg7xEAwPztVodkmvOCWI4hbx2KtyqhJK11buHQUDSA06kHOxlmvcHv-gOvi-h90NBs7Yb-XQ4m12NacAtY6XYMFjG8WZQ1Tc6QFxPpx5tJh3PnX5rNlNf4u6fXmzs1--FkhSCnRV3J9MALX6CMedbqOpmGo_9z8BqN07HsndWUmf1aasKsi1_QpgD7S8sxOJ-SGxc0PYyqV1tr_b_G2gqTtt3WOYek4W-y17EAWLcem_SozAiB3uP_Qnkg',
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNMejZEdWlRcVF6YXAweFV1QkF0eiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wdmYyZzJ1c29ubndpNDRyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDQyN2ZlMTkzNmMyYzQ3YzdiZjhjYjMiLCJhdWQiOlsiaHR0cHM6Ly9yZWRnaXN0cnkuY29tIiwiaHR0cHM6Ly9kZXYtMHZmMmcydXNvbm53aTQ0ci51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjgyMDc5NzE0LCJleHAiOjE2ODIxNjYxMTQsImF6cCI6IkdBQTBHWFBtOWdzUHJJSXBMS0N0c0p6aUNJcUFpSGVZIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBhZGRyZXNzIHBob25lIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.SxCMdxOeHd0Y2FlOhiMMgqYP0OyTheJM53Z8WC3KAplsvKuaOfFELl6CpWxfi-v5dT8tMy-eag1g9lEPeDtcgdcHLAUR48Mafv8rkrWGzAOsJ-pjTa6Al6736pKNzJn_GLf7V1gOvBb4Xq3UdvazPhB29X-HeeF6e-4yl5RTGuOXIA3iJKxJOUKbL8v8z8kudtDX-bA4bHhnQAlnkS8A7yNgBGNB5yhWUS5-ntxQZj-OIbQHZLKx6wN0oc8HNsT4T0LA7BKNrJGUcduSC5_KOaJ3vtBaueDRak6Gw9XI3yVFeagMNOVwLPtpC_ZPYQKaDGwoEr4ycoi2uxDRwVs6TA',
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNMejZEdWlRcVF6YXAweFV1QkF0eiJ9.eyJpc3MiOiJodHRwczovL2Rldi0wdmYyZzJ1c29ubndpNDRyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NDQyODJmNzkzNmMyYzQ3YzdiZjhkMjIiLCJhdWQiOlsiaHR0cHM6Ly9yZWRnaXN0cnkuY29tIiwiaHR0cHM6Ly9kZXYtMHZmMmcydXNvbm53aTQ0ci51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjgyMDgwNTAzLCJleHAiOjE2ODIxNjY5MDMsImF6cCI6IkdBQTBHWFBtOWdzUHJJSXBMS0N0c0p6aUNJcUFpSGVZIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBhZGRyZXNzIHBob25lIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.UytgABvk_UpFEdGyGGTiu02lNdLaJ95nQisLkMNNe9iV4tAEHa1zfETY7Lk4jGdrOk5GT4OpedcNnTTvmFjTsLORjvovUGpG4QXWo1Ku4YzieLoetRGjvaZGNjErNBnSMF0Wn51xnTpB397Ob0VrtvjfXywRatBYCl194gFQlZQnfB3qikNAjtH2ujDa11uf56Xfydvr1DfGjLKRNo9ubyXw498dGc5iQA4dyeLaYGcW4JRo43rwh0-V6zIkI4W2bknmsvFt6IYSRRo1Uu93Va5AksemFyH94b1GsyiFOTzHACPar6349zqHWhoE4cuXTk2n7yPXqsoHUWERNa05KA',
]
const ChatScreen = () => {
  const [accessTokenIdx, setAccessTokenIdx] = useState(-1)
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
  }, [accessTokenIdx])

  const getChatClient = async () => {
    try {
      const res = await fetch('https://2mdtmkwci2.execute-api.us-east-1.amazonaws.com/dev/twilio/token', {
        headers: {
          Authorization: `Bearer ${tokens[accessTokenIdx]}`,
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
    <>
      <div>
        select user: <br />
        {tokens.map((t, idx) => (
          <label>
            {idx + 1}
            <input type='radio' checked={idx === accessTokenIdx} value={idx} onChange={() => setAccessTokenIdx(idx)} />
          </label>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'space-evenly' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h5>Current User: {userIdentity}</h5>
          <CreateNewChat chatClient={chatClient} userIdentity={userIdentity} onCreateChat={handleChatChange} />
          <ChatsList chatClient={chatClient} currChatName={currChat?.uniqueName} userIdentity={userIdentity} onChatChange={handleChatChange} />
        </div>
        <hr class='solid'></hr>
        <ChatWindow currChat={currChat} />
      </div>
    </>
  )
}

export default ChatScreen
