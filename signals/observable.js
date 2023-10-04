function createObservable(subscribeFn) {
	function subscribe(observer) {
		return subscribeFn(subscriber(observer, subscription()))
	}

	return { subscribe }
}

function subscriber(observer, subscription) {
	let closed = false

	subscription.add(() => (closed = true))

	function next(value) {
		!closed && observer.next(value)
	}

	function error(error) {
		if (!closed) {
			closed = true
			observer.error(error)
			subscription.unsubscribe()
		}
	}

	function complete() {
		if (!closed) {
			closed = true
			observer.complete()
			subscription.unsubscribe()
		}
	}

	return { next, error, complete }
}

function subscription() {
	let teardowns = []

	function add(teardown) {
		teardowns.push(teardown)
	}

	function unsubscribe() {
		teardowns.forEach((teardown) => teardown())
		teardowns = []
	}

	return { add, unsubscribe }
}

const observerable = createObservable((subscriber) => {
	let count = 0

	const intervalId = setInterval(() => {
		count++
		console.log(`Timer: ${count}`)
		subscriber.next(count)
	}, 1000)

	setTimeout(() => subscriber.complete(), 3000)

	return () => {
		console.log('Cleanup')
		clearInterval(intervalId)
	}
})

const unsubscribe = observerable.subscribe({
	next: (value) => console.log(value),
	error: (error) => console.log(error),
	complete: () => console.log('Completed!'),
})

unsubscribe()
