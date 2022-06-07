import { useEffect, useState } from "react"

import io from "socket.io-client"

export const useFetch = (url, setLoading = null) => {
	const [rows, setRows] = useState([])

	useEffect(() => {
		fetch(url)
			.then(async (res) => setRows(await res.json()))
			.catch((err) => console.error(err))
			.finally(() => setLoading && setLoading(false))
	}, [url, setLoading])

	return { rows, setRows }
}

export const useSocket = () => {
	try {
		return io(process.env.REACT_APP_WS_API, {
			transports: ["websocket"],
		})
	} catch (err) {
		console.error(err)
	}

	return null
}
