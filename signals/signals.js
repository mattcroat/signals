const context = []

// function createEffect(fn) {
// 	function execute() {
// 		context.push(running)
// 		fn()
// 		context.pop()
// 	}

// 	const running = {
// 		execute,
// 		dependencies: new Set(),
// 	}

// 	execute()
// }

let currentListener = null

function createEffect(fn) {
	currentListener = fn
	fn()
	currentListener = null
}

function createSignal(value) {
	const subscriptions = new Set()

	function getValue() {
		// const running = context.at(-1)
		// if (running) {
		// 	subscriptions.add(running, subscriptions)
		// 	running.dependencies.add(subscriptions)
		// }

		if (currentListener) {
			subscriptions.add(currentListener)
		}

		return value
	}

	function updateValue(newValue) {
		value = newValue

		// subscriptions.forEach((subscription) => {
		// 	subscription.execute()
		// })

		subscriptions.forEach((subscription) => subscription())
	}

	return [getValue, updateValue]
}

// 1. create signal
const [count, setCount] = createSignal(0)

// 2. create reaction
createEffect(() => console.log('The count is', count()))

// 3. set count to 5
console.log('Set count to 5')
setCount(5)

// 4. set count to 10
console.log('Set count to 10')
setCount(10)

/*
const [name, setName] = createSignal('Matia')
const [selected, setSelected] = createSignal(false)

const el = document.createElement('div')

createEffect(() => (el.textContent = `Hi ${name()}`))
createEffect(() => (el.className = selected() ? 'selected' : ''))

document.body.appendChild(el)

function createCounter(element) {
	const [count, setCount] = createSignal(0)

	const btnEl = document.createElement('button')
	btnEl.addEventListener('click', () => setCount(count + 1))
	element.appendChild(btnEl)

	return { count, setCount }
}
*/
