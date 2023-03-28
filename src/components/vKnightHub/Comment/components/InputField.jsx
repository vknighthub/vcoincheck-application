import React, { useContext, useState, useEffect } from 'react'
import { ActionContext } from './ActionContext'
import Image from 'next/image'

const InputField = ({ cancellor, parentId, child, value, edit, main }) => {
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    setText(value)
  }, [value])

  const actions = useContext(ActionContext)
  return (
    <form
      className="form"
      style={
        !child && !edit && main === undefined
          ? { marginLeft: 36 }
          : { marginLeft: 8 }
      }
    >
      <div className="userImg">
        <Image
          src={actions.userImg}
          style={{ width: 38, height: 38, borderRadius: 38 / 2 }}
          alt='userIcon'
        />
      </div>
      <input
        className="postComment"
        type='text'
        placeholder='Type your reply here.'
        component='input'
        value={text}
        onChange={handleChange}
      />
      <div className="inputActions">
        <button
          className="postBtn"
          onClick={() =>
            edit === true
              ? actions.submit(cancellor, text, parentId, true, setText)
              : actions.submit(cancellor, text, parentId, false, setText)
          }
          type='button'
          disabled={!text}
          style={
            !text
              ? { backgroundColor: '#84dcff' }
              : { backgroundColor: '#30c3fd' }
          }
        >
          Post
        </button>
        {(text || parentId) && (
          <button
            className="cancelBtn"
            onClick={() =>
              edit
                ? actions.handleCancel(cancellor, edit)
                : actions.handleCancel(cancellor)
            }
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default InputField
