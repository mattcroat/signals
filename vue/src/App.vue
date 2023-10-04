<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

watchEffect(() => {
	console.log(doubleCount.value)
})
</script>

<template>
	<button type="button" @click="count++">
		{{ doubleCount }}
	</button>
</template>
