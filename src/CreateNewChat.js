import { useState } from 'react'

const CreateNewChat = ({ chatClient, userIdentity, onCreateChat }) => {
  const [chatType, setChatType] = useState(null)
  const [name, setName] = useState('')

  const createNewChat = async (chatClient, chatIdentity, chatName) => {
    try {
      const newChat = await chatClient.createChannel({
        uniqueName: chatIdentity,
        friendlyName: chatName,
      })
      await newChat.join()
      console.log("new channel created:", newChat)
      if (chatType === 'PEER') {
        const member = await newChat.add(name)
        console.log('Member added :', member)
      }

      setChatType(null)
      onCreateChat(newChat)
    } catch (e) {
      console.log('Error in channel creation: ', e)
    }
  }

  const handlePeerNameCange = () => {
    const peerChatIdentity = userIdentity > name  ? `${userIdentity}_${name}` : `${name}_${userIdentity}`
    createNewChat(chatClient, `${peerChatIdentity}_peer`, peerChatIdentity)
  }

  const handleGroupNameChange = () => {
    createNewChat(chatClient, `${name}_group`, name)
  }
  return (
    <>
      {chatType ? (
        <div>
          <div onChange={(e) => setChatType(e.target.value)}>
            <input type='radio' value='PEER' name='chat-type' checked={chatType === 'PEER'} /> Peer Chat
            <input type='radio' value='GROUP' name='chat-type' checked={chatType === 'GROUP'} /> Group Chat
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Enter ${chatType === 'PEER' ? 'peer' : 'new group'} name`}
          ></input>
          <button onClick={chatType === 'PEER' ? handlePeerNameCange : handleGroupNameChange}>submit</button>
        </div>
      ) : (
        <button onClick={() => setChatType('PEER')}>New Chat</button>
      )}
    </>
  )
}

export default CreateNewChat
