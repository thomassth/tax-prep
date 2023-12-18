import { defineStore } from 'pinia'

export const useOutputStore = defineStore('output', () => {
    const outputGroup = new Map()
    outputGroup.set('essential', new Set(['ssn']));
    outputGroup.set('address', new Set(['healthCard', 'driversLicense']));
    outputGroup.set('work', new Set(['t4']));
    // TODO: better solution than this?
    const outputDb = [
        { id: 'ssn', name: 'Social security number' },
        { id: 'healthCard', name: 'Health card (for your name and address)' },
        { id: 'driversLicense', name: 'Driver\'s license(for your name and address)' },
        { id: 't4', name: 'T4 tax form', source: 'your employer' }

    ]
    return { outputGroup, outputDb }
})
