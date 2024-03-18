import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import Task from '@/app/components/Task/Task'
import { ITask } from '@/types/types'

describe('Task', () => {
  it('should render a Task component with initial title and description', () => {
    const task: ITask = {
      id: 1,
      title: 'Initial Title',
      description: 'Initial Description',
      position: 1,
      status: 'In Progress',
      boardId: '1234',
    }

    render(<Task {...task} />)

    const taskComponent = screen.getByTestId('task')
    expect(taskComponent).toBeInTheDocument()
  })

  it('should display TaskInfo component when editMode is false', () => {
    const task: ITask = {
      id: 1,
      title: 'Initial Title',
      description: 'Initial Description',
      position: 1,
      status: 'In Progress',
      boardId: '1234',
    }

    render(<Task {...task} />)

    const taskInfoComponent = screen.getByTestId('task-info')
    expect(taskInfoComponent).toBeInTheDocument()
  })

  it('should display TaskInfoEditMode component when editMode is true', () => {
    const task: ITask = {
      id: 1,
      title: 'Initial Title',
      description: 'Initial Description',
      position: 1,
      status: 'In Progress',
      boardId: '1234',
    }

    render(<Task {...task} />)
    const editButton = screen.getByTestId('edit-button')
    fireEvent.click(editButton)

    const taskInfoEditModeComponent = screen.getByTestId('task-info-edit-mode')
    expect(taskInfoEditModeComponent).toBeInTheDocument()
  })

  it('should update title state when handleChange is called with valid input', () => {
    const task: ITask = {
      id: 1,
      title: 'Initial Title',
      description: 'Initial Description',
      position: 1,
      status: 'In Progress',
      boardId: '1234',
    }

    render(<Task {...task} />)
    const editButton = screen.getByTestId('edit-button')
    fireEvent.click(editButton)
    const titleInput = screen.getByTestId(
      'task_title-input',
    ) as HTMLInputElement
    fireEvent.change(titleInput, { target: { value: 'New Title' } })

    expect(titleInput.value).toBe('New Title')
  })
})
