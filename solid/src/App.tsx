import { createSignal } from 'solid-js'
import './App.css'

function App() {
	console.log('app')

	const [count, setCount] = createSignal(0)

	return (
		<>
			<button onClick={() => setCount((count) => count + 1)}>{count()}</button>
		</>
	)
}

export default App
