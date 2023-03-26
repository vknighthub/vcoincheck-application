import React, { createContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'

export const ActionContext = createContext()
export const ActionProvider = ({
  children,
  currentUser,
  setComment,
  setInsertComment,
  comments,
  signinUrl,
  signupUrl,
  customInput
}) => {
  const [replies, setReplies] = useState([])
  const [user, setUser] = useState()
  const [editArr, setEdit] = useState([])
  useEffect(() => {
    if (currentUser) {
      setUser(true)
    } else {
      setUser(false)
    }
  }, [currentUser])

  const handleAction = (id, edit) => {
    edit ? setEdit([...editArr, id]) : setReplies([...replies, id])
  }
  const handleCancel = (id, edit) => {
    if (edit) {
      const list = [...editArr]
      const newList = list.filter((i) => i !== id)
      setEdit(newList)
    } else if (!edit) {
      const list = [...replies]
      const newList = list.filter((i) => i !== id)
      setReplies(newList)
    }
  }

  const onSubmit = (text, parentId, child) => {
    if (text.length > 0) {
      if (!parentId && !child) {
        setComment([
          ...comments,
          {
            username: currentUser.username,
            comId: uuid(),
            avatarUrl: currentUser.avatarUrl,
            fullname: currentUser.name,
            text: text
          }
        ])
        setInsertComment(
          {
            username: currentUser.username,
            comId: uuid(),
            avatarUrl: currentUser.avatarUrl,
            fullname: currentUser.name,
            text: text
          }
        )
      } else if (parentId && child) {
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        newList[index].replies.push({
          username: currentUser.username,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullname: currentUser.name,
          text: text
        })
        setComment(newList)
        setInsertComment(newList)
      } else if (parentId && !child) {
        const newList = [...comments]
        const index = newList.findIndex((x) => x.comId === parentId)
        const newReplies =
          newList[index].replies === undefined
            ? []
            : [...newList[index].replies]
        newReplies.push({
          username: currentUser.username,
          comId: uuid(),
          avatarUrl: currentUser.avatarUrl,
          fullname: currentUser.name,
          text: text
        })
        newList[index].replies = newReplies
        setComment(newList)
        setInsertComment(newList[index])
      }

    }
  }

  const editText = (id, text, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === id)
      newList[index].text = text
      setComment(newList)
    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const replyIndex = newList[index].replies.findIndex((i) => i.comId === id)
      newList[index].replies[replyIndex].text = text
      setComment(newList)
    }
  }

  const deleteText = (id, parentId) => {
    if (parentId === undefined) {
      const newList = [...comments]
      const filter = newList.filter((x) => x.comId !== id)
      setComment(filter)
    } else if (parentId !== undefined) {
      const newList = [...comments]
      const index = newList.findIndex((x) => x.comId === parentId)
      const filter = newList[index].replies.filter((x) => x.comId !== id)
      newList[index].replies = filter
      setComment(newList)
    }
  }

  const submit = (cancellor, text, parentId, edit, setText, child) => {
    if (edit) {
      editText(cancellor, text, parentId)
      handleCancel(cancellor, edit)
      setText('')
    } else {
      onSubmit(text, parentId, child)
      handleCancel(cancellor)
      setText('')
    }
  }

  return (
    <ActionContext.Provider
      value={{
        onSubmit: onSubmit,
        userImg: currentUser && currentUser.avatarUrl,
        username: currentUser && currentUser.username,
        handleAction: handleAction,
        handleCancel: handleCancel,
        replies: replies,
        setReplies: setReplies,
        editArr: editArr,
        onEdit: editText,
        onDelete: deleteText,
        signinUrl: signinUrl,
        signupUrl: signupUrl,
        user: user,
        customInput: customInput,
        submit: submit
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
