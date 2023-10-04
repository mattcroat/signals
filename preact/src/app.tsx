import { effect, signal } from '@preact/signals'
import './app.css'

const todos = signal([{ text: 'Todo 1' }, { text: 'Todo 2' }])

function addTodo(text: string) {
	todos.value = [...todos.value, { text }]
}

effect(() => {
	console.log(todos.value)
})

addTodo('Tidy up')

export function App() {
	return <h1>Hi</h1>
}
