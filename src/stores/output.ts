import { defineStore } from 'pinia'
import { output } from '../data/outputDb'

export const useOutputStore = defineStore('output', () => {
  const outputGroup = new Map()
  outputGroup.set('essential', new Set(['name', 'ssn']))
  outputGroup.set('address', new Set(['address', 'phone', 'email']))
  outputGroup.set('work', new Set(['T4']))
  outputGroup.set('newcomer', new Set(['permit', 'arrivalDate']))
  outputGroup.set('rent', new Set(['rental']))
  // TODO: better solution than this?
  return { outputGroup, outputDb: output.items }
})
