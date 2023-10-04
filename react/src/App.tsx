import { useState } from 'react'
import './App.css'

function CountA(props) {
	console.log('CountA')
	return <h1>{props.count}</h1>
}

function CountB(props) {
	console.log('CountB')
	return <h1>{props.count}</h1>
}

function App() {
	console.log('App')

	const [count, setCount] = useState(0)

	function increment() {
		setCount((count) => count + 1)
	}

	return (
		<>
			<button onClick={increment}>{count}</button>
			<CountA count={count} />
			<CountB count={count} />
		</>
	)
}

export default App
