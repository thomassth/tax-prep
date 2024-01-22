import { defineStore } from 'pinia'
import { output } from '../data/outputDb.js'

export const useOutputStore = defineStore('output', () => {
  const outputGroup = new Map()
  outputGroup.set('essential', new Set(['name', 'ssn']))
  outputGroup.set('address', new Set(['address', 'phone', 'email']))
  outputGroup.set(
    'work',
    new Set(['T4', 'work_expense', 'tradeperson', 'teacher', 'work_condition', 'home_office'])
  )
  outputGroup.set('study', new Set(['tuition', 'tuition_dependent', 'student_loans']))
  outputGroup.set('newcomer', new Set(['permit', 'arrivalDate', 'previous_income']))
  outputGroup.set('rent', new Set(['rental']))
  // TODO: better solution than this?
  return { outputGroup, outputDb: output.items }
})
