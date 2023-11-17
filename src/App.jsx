import { Users } from "./Users"
import { useEffect, useState } from "react"

function App() {
	const [users, setUsers] = useState([])
	const [error, setError] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		setError(undefined)
		setUsers([])
		const controller = new AbortController()
		fetch("https://jsonplaceholder.typicode.com/users", {
			signal: controller.signal,
		})
			.then((res) =>
				res.status === 200 ? res.json() : Promise.reject(res)
			)
			.then((data) => {
				setUsers(data)
			})
			.catch((e) => {
				if (e?.name === "AbortError") return
				setError(e)
			})
			.finally(() => {
				setLoading(false)
			})
		return () => {
			controller.abort()
		}
	}, [])

	return (
		<>
			<h1>Users List</h1>
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<ul>
					{users.map((user) => {
						return <Users key={user.id} name={user.name} />
					})}
				</ul>
			)}
		</>
	)
}

export default App
