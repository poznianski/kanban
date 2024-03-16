import { v4 } from 'uuid'

export const generateId = () => Number(v4().replace(/\D+/g, '').slice(0, 6))
