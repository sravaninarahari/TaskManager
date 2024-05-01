import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskInput, tagType} = taskDetails

  return (
    <li className="task-item-container">
      <p>{taskInput}</p>
      <p className="item-button">{tagType}</p>
    </li>
  )
}

export default TaskItem
