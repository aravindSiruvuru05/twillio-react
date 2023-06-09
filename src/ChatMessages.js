const ChatMessages = ({messages}) => {
  if (!Array.isArray(messages)) return <p>No messages to display.</p>
  return (
    <>
      <h2>Messages</h2>
      {messages.map((m) => (
        <p>
          {m.author} : {m.body}
        </p>
      ))}
    </>
  )
}

export default ChatMessages;
