import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useInputStore = defineStore('input', () => {
  const categories = [
    { id: 'study', heading: '📚 studied' },
    { id: 'work', heading: '📊 worked' },
    { id: 'work_self', heading: '🔧 & is self employed', under: 'work' },
    { id: 'work_union', heading: '💪 & have a union', under: 'work' },
    { id: 'newcomer', heading: '🇨🇦 first year in Canada' },
    { id: 'healthcare', heading: '💊 Spent money on healthcare' },
    { id: 'rent', heading: '🛏️ Paid rent' },
    { id: 'children', heading: '👶 Spent money on children' },
    { id: 'donation', heading: '😇 donated money' }
  ]
  const input = useLocalStorage('input', new Map())
  const selected = computed(() => [...input.value.keys()])
  const printInput = computed(() => JSON.stringify([...input.value.keys()]))
  const checkboxChange = (string: string) => {
    if (input.value.has(string)) {
      input.value.delete(string)
      categories.forEach((category) => {
        if (category.under === string) {
          input.value.delete(category.id)
        }
      })
    } else {
      input.value.set(string, true)
    }
  }

  return { categories, input, selected, printInput, checkboxChange }
})
