import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import TaskItem from '../TaskItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class AddTask extends Component {
  state = {
    taskList: [],
    userInput: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  addTask = event => {
    const {userInput, selectTag} = this.state
    event.preventDefault()
    const eachTask = {
      id: uuid(),
      taskInput: userInput,
      tagType: selectTag,
    }
    if (userInput.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, eachTask],
        userInput: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  updateInput = event => {
    this.setState({userInput: event.target.value})
  }

  updateTag = event => {
    this.setState({selectTag: event.target.value})
  }

  clickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderAddTask = () => {
    const {userInput, activeTag, selectTag} = this.state
    console.log(activeTag)
    return (
      <div className="add-task-main-container">
        <h1 className="heading">Create a task!</h1>
        <form className="form-container" onSubmit={this.addTask}>
          <div className="input-container">
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              className="input"
              placeholder="Enter the task here"
              onChange={this.updateInput}
              value={userInput}
            />
          </div>
          <div className="input-container">
            <label htmlFor="tags">Tags</label>
            <select
              id="tags"
              className="input"
              onChange={this.updateTag}
              value={selectTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId}>{each.displayText}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="button">
            Add Task
          </button>
        </form>
      </div>
    )
  }

  renderTaskList = () => {
    const {taskList, activeTag} = this.state
    const filteredList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tagType === activeTag)

    console.log(filteredList)
    return (
      <div className="task-list-container">
        <div>
          <h1>Tags</h1>
          <ul className="tags-list-container ">
            {tagsList.map(each => (
              <li key={each.optionId}>
                <button
                  type="button"
                  value={each.optionId}
                  className="tag-button"
                  onClick={this.clickTag}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>Tasks</h1>
          {filteredList.length !== 0 ? (
            <ul>
              {filteredList.map(each => (
                <TaskItem key={each.id} taskDetails={each} />
              ))}
            </ul>
          ) : (
            <div className="no-task-container">
              <p>No Tasks Added Yet</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  render() {
    const {taskList} = this.state
    console.log(taskList)
    return (
      <>
        {this.renderAddTask()}
        {this.renderTaskList()}
      </>
    )
  }
}
export default AddTask
