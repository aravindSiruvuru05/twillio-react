import { useState } from "react"

const GroupChatManage = ({ currChat, groupMembers }) => {
  const [newMember, setNewMember] = useState('')

  const addMember = async () => {
    const member = await currChat.add(newMember)
    console.log('Member added :', member)
    setNewMember('')
  }
  return (
    <>
      {currChat.uniqueName.includes('group') ? (
        <>
          <input value={newMember} onChange={(e) => setNewMember(e.target.value)}></input>
          <button onClick={addMember}>add member</button>
        </>
      ) : null}
      {currChat.uniqueName.includes('group') ? (
        <>
          <h2>members</h2>
          {groupMembers.map((mem) => (
            <p>{mem.identity}</p>
          ))}
        </>
      ) : null}
    </>
  )
}

export default GroupChatManage
