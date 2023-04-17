import { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'

const ChatWindow = ({ currChat }) => {
  const [messages, setMessages] = useState([])
  const [currMessage, setCurrMessage] = useState('')

  useEffect(() => {
    if (!currChat) return
    console.log(currChat)
    getAllMessages(currChat).then((msgs) => setMessages(msgs))

    const messageAddedHandler =  (message) => {
      console.log('new message added', message)

      setMessages((messages) => [...messages, message.state])
    }
    currChat.on('messageAdded', messageAddedHandler )

    // currChat.on('memberJoined', (member) => {
    //   console.log(`Member joined: ${member.identity}`)
    // })

    // currChat.on('memberLeft', (member) => {
    //   console.log(`Member left: ${member.identity}`)
    // })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      currChat.removeListener('messageAdded', messageAddedHandler);
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
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <h5>CHAT NAME: {currChat?.uniqueName}</h5>
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
