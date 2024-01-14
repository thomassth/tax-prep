import { defineStore } from 'pinia'
import { outputDb } from '../data/outputDb'

export const useOutputStore = defineStore('output', () => {
  const outputGroup = new Map()
  outputGroup.set('essential', new Set(['ssn']))
  outputGroup.set('address', new Set(['healthCard', 'driversLicense']))
  outputGroup.set('work', new Set(['T4']))
  outputGroup.set('rent', new Set(['rental']))
  // TODO: better solution than this?
  return { outputGroup, outputDb }
})
