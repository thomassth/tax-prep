import { defineStore } from 'pinia'
import { output } from '../data/outputDb.js'

export const useOutputStore = defineStore('output', () => {
  const outputGroup = new Map()
  outputGroup.set('essential', new Set(['name', 'ssn']))
  outputGroup.set('address', new Set(['address', 'phone', 'email']))
  outputGroup.set('study', new Set(['tuition', 'tuition_dependent', 'student_loans']))
  outputGroup.set(
    'work',
    new Set(['T4', 'work_expense', 'tradeperson', 'teacher', 'work_condition', 'home_office'])
  )
  outputGroup.set('work_self', new Set(['selfEarn']))
  outputGroup.set('work_union', new Set(['union']))
  outputGroup.set('pension', new Set(['T4A', 'T4A_P', 'T4A_OAS']))
  outputGroup.set('benefits', new Set(['T4E', 'T4A_P', 'T5007']))
  outputGroup.set('rrsp_out', new Set(['T4_RSP']))
  outputGroup.set('newcomer', new Set(['permit', 'arrivalDate', 'previous_income']))
  outputGroup.set('healthcare', new Set(['healthcare', 'medicalInsurance_out', 'pharmacy']))
  outputGroup.set('rent', new Set(['rental']))
  outputGroup.set('children', new Set(['childSupport_in', 'childCare', 'childSupport_out']))
  outputGroup.set('donation', new Set(['donation', 'political']))

  // TODO: better solution than this?
  return { outputGroup, outputDb: output.items }
})
