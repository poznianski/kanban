import { IBoardContext } from '@/types'

export const initialTasks = [
  {
    id: '19ae654a-6538-46d2-8fd3-f65eb609851d',
    title: 'Task 0',
    description: 'This is task 0',
    status: 'Done',
    boardId: 'b6343f1c-a730-4591-a43e-f5690c1b182b',
    position: 0,
    createdAt: '2024-02-16T13:18:26.431Z',
    updatedAt: '2024-02-18T19:02:42.112Z',
  },
  {
    id: '9ef3fafd-6b3a-4b71-9264-1672d1ffba3f',
    title: 'Task 1',
    description: 'This is task 1',
    status: 'In Progress',
    boardId: 'b6343f1c-a730-4591-a43e-f5690c1b182b',
    position: 1,
    createdAt: '2024-02-16T13:18:26.431Z',
    updatedAt: '2024-02-18T19:31:38.802Z',
  },
  {
    id: '18e4114d-9855-4d19-accb-d2bd8a50ca4d',
    title: 'Task 2',
    description: 'This is task 2',
    status: 'ToDo',
    boardId: 'b6343f1c-a730-4591-a43e-f5690c1b182b',
    position: 2,
    createdAt: '2024-02-16T13:18:26.431Z',
    updatedAt: '2024-02-18T20:06:38.685Z',
  },
  {
    id: '2e0efa05-0eff-4404-b399-c883e8b673e9',
    title: 'Task 3',
    description: 'finish the CRUD',
    status: 'ToDo',
    boardId: 'b6343f1c-a730-4591-a43e-f5690c1b182b',
    position: 3,
    createdAt: '2024-02-18T20:18:14.930Z',
    updatedAt: '2024-02-18T20:18:14.930Z',
  },
]

export const initialState: IBoardContext = {
  board: null,
  error: '',
  fetchBoardById: () => {
    throw new Error('fetchBoardById placeholder')
  },
  // updateTaskClient: () => {
  //   throw new Error('updateTaskClient placeholder')
  // },
  // updateTaskTitle: () => {
  //   throw new Error('updateTaskTitle placeholder')
  // },
}
