import { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'
import GroupChatManage from './GroupChatManage'

const ChatWindow = ({ currChat }) => {
  const [messages, setMessages] = useState([])
  const [currMessage, setCurrMessage] = useState('')
  const [groupMembers, setGroupMembers] = useState([])

  useEffect(() => {
    if (!currChat) return
    console.log(currChat)
    getAllMessages(currChat).then((msgs) => setMessages(msgs))
    getMembers(currChat).then((members) => setGroupMembers(members))

    const messageAddedHandler = (message) => {
      console.log('new message added', message)

      setMessages((messages) => [...messages, message.state])
    }

    const memberJoinedHandler = (member) => {
      console.log('new message added', member)

      setGroupMembers((members) => [...members, member])
    }

    currChat.on('messageAdded', messageAddedHandler)
    currChat.on('memberJoined', memberJoinedHandler)

    // currChat.on('memberJoined', (member) => {
    //   console.log(`Member joined: ${member.identity}`)
    // })

    // currChat.on('memberLeft', (member) => {
    //   console.log(`Member left: ${member.identity}`)
    // })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      currChat.removeListener('messageAdded', messageAddedHandler)
    }
  }, [currChat?.uniqueName])

  const getAllMessages = async (currChat) => {
    try {
      const messages = await currChat.getMessages()
      const newMsgs = messages.items.map((m) => m.state)
      console.log('All messages:', newMsgs)
      return newMsgs
    } catch (e) {
      console.error('Error getting messages:', e)
      return []
    }
  }

  const getMembers = async () => {
    try {
      const members = await currChat.getMembers()
      return members
    } catch (e) {
      console.log(e)
      return []
    }
  }

  const sendMessage = async () => {
    try {
      const message = await currChat.sendMessage(currMessage)
      console.log(message)
      setCurrMessage('')
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <>
      {currChat?.uniqueName ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h5>CHAT NAME: {currChat?.uniqueName}</h5>
          <GroupChatManage currChat={currChat} groupMembers={groupMembers} />
          <ChatMessages messages={messages} />
          <div>
            <input value={currMessage} onChange={(e) => setCurrMessage(e.target.value)} placeholder='type your message here'></input>
            <button onClick={sendMessage}>send</button>
          </div>
        </div>
      ) : (
        <h5> Select a chat from the list to view messages</h5>
      )}
    </>
  )
}

export default ChatWindow
