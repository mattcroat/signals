import { component$, useComputed$, useSignal } from '@builder.io/qwik'
import './app.css'

export const App = component$(() => {
	let name = useSignal('Qwik')
	let capitalizedName = useComputed$(() => {
		return name.value.toUpperCase()
	})

	return (
		<>
			<input type="text" bind:value={name} />
			<p>Name: {name.value}</p>
			<p>Capitalized: {capitalizedName.value}</p>
		</>
	)
})

// export const App = component$(() => {
// 	const count = useSignal(0)
// 	const doubleCount = useComputed$(() => count.value * 2)

// 	return (
// 		<>
// 			<button onClick$={() => count.value++}>{doubleCount.value}</button>
// 		</>
// 	)
// })
