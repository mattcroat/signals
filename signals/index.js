// const assert = require('node:assert')

let activeEffect = null

function effect(fn) {
	activeEffect = fn
	fn()
	activeEffect = null
}

function signal(value) {
	const effects = new Set()

	return {
		get value() {
			if (activeEffect) {
				effects.add(activeEffect)
			}
			return value
		},
		set value(updatedValue) {
			value = updatedValue
			effects.forEach((effect) => effect())
		},
	}
}

function computed(fn) {
	const computed = signal(fn())

	effect(() => {
		computed.value = fn()
	})

	return {
		get value() {
			return computed.value
		},
	}
}

let count = signal(10)
let doubleCount = computed(() => count.value * 2)

effect(() => console.log(`The count is ${count.value}`))
effect(() => console.log(`The double count is ${doubleCount.value}`))

count.value = 20

// let a = signal(10)
// let b = computed(() => a.value + 1)

// a.value = 20

// assert.equal(21, b.value)
