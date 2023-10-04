function createSubscribable() {
	const subscribers = new Set()

	function subscribe(fn) {
		subscribers.add(fn)

		return () => {
			subscribers.delete(fn)
		}
	}

	function publish(msg) {
		subscribers.forEach((fn) => fn(msg))
	}

	return { subscribe, publish }
}

const subscribable = createSubscribable()
const unsub = subscribable.subscribe(console.log)

subscribable.publish('Hello')
subscribable.publish('Woof')
unsub()
subscribable.publish('Meow')
