import React from 'react'

const NewPost = () => {
  const handleSubmit = () => {};

  return (
    <div>
      <p>新規投稿</p>
      <from onSubmit={handleSubmit}>
        <input type="text" placeholder='今どうしてる？' />
        <button type='submit'>投稿</button>
      </from>
    </div>
  )
}
export default NewPost;
