import { useEffect, useState } from 'react'

const ChatsList = ({ chatClient, userIdentity, currChatName, onChatChange }) => {
  const [myChats, setMyChats] = useState([])

  useEffect(() => {
    if (!chatClient) return
    chatClient.on('channelAdded', (channel) => {
      console.log('Channel added:', channel)
      refreshChatList()
      // You can access the channel object and perform actions on the newly added channel here
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatClient])

  useEffect(() => {
    if (!chatClient) return
    refreshChatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatClient, currChatName])

  const refreshChatList = async () => {
    try {
      const chats = await getUserChatsList(chatClient)
      setMyChats(chats)
    } catch (e) {
      console.log('Error in refreshing chat list:', e)
    }
  }

  const getUserChatsList = async (chatClient) => {
    try {
      const channels = await chatClient.getSubscribedChannels()
      console.log('user chat list:', channels)
      const { items } = channels
      if (!Array.isArray(items) || items.length === 0) return []

      // let userAssociatedChats = await Promise.all(
      //   items.map(async (chat) => {
      //     const members = await chat.getMembers()
      //     return chat.createdBy === userIdentity || members.some((member) => member.identity === userIdentity)
      //   })
      // )
      // userAssociatedChats = items.filter((el, idx) => userAssociatedChats[idx] === true)
      return items
    } catch (e) {
      console.log(e)
      return []
    }
  }

  if (!Array.isArray(myChats) || myChats.length === 0) return <><br/>No Chats to display</>

  return (
    <>
      <h6>Your Total Chats {myChats.length}</h6>
      <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {myChats.map((c) => {
          return (
            <li
              style={{ cursor: 'pointer', marginTop: '10px', fontWeight: `${currChatName === c.uniqueName ? 800 : 'inherit'}` }}
              onClick={() => onChatChange(c)}
            >
              <h5>{c.friendlyName}</h5>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ChatsList
