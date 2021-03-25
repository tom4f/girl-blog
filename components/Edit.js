import Meta from './Meta'

const Edit = ( { article } ) => {
  return (
    <div>
      <Meta title='Edit' />
      <h1>Edit</h1>
        <ul>
            <li>{ article.title }</li>
        </ul>
    </div>
  )
}

export default Edit
