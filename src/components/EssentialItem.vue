<script setup lang="ts">
import { useOutputStore } from '@/stores/output'
import ChecklistItem from '@/components/ChecklistItem.vue'
import { computed, ref } from 'vue'

const outputStore = useOutputStore()

const essentialSet = new Set([
    ...outputStore.outputGroup.get('essential'),
    ...outputStore.outputGroup.get('address')
])

const filteredItems = computed(() =>
    outputStore.outputDb.filter((item) => essentialSet.has(item.id) === true)
)

const items = ref(
    filteredItems.value.map((item) => {
        return {
            id: item.id,
            heading: item.name,
            source: item.source
        }
    })
)
</script>

<template>
    <div class="essentials">
        <h1>Essential stuff</h1>
        <div class="output">
            <template v-for="item in items" :key="item.id">
                <ChecklistItem :id="item.id">
                    <template #heading>
                        {{ item.heading }}
                    </template>
                    <template #hints v-if="item.source"> usually from: {{ item.source }} </template>
                </ChecklistItem>
            </template>
        </div>
    </div>
</template>

<style scoped>
.essentials {
    background-color: #564211;
}
</style>
