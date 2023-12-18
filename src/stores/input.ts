import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInputStore = defineStore('input', () => {
  const input = ref(new Map())
  const selected = computed(() => [...input.value.keys()])
  const printInput = computed(() => JSON.stringify([...input.value.keys()]))
  // function increment() {
  //   count.value++
  // }
  const checkboxChange = (string: string) => {
    if (input.value.has(string)) {
      input.value.delete(string)
    } else {
      input.value.set(string, true)
    }
  }

  return { input, selected, printInput, checkboxChange }
})
