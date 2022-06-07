import { useState } from "react"

import InfoIcon from "@mui/icons-material/Info"

import { Alert, Button, CircularProgress } from "@mui/material"

import ImageList from "@mui/material/ImageList"
import IconButton from "@mui/material/IconButton"
import ListSubheader from "@mui/material/ListSubheader"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import { Snackbar } from "@mui/material"

import { useFetch, useSocket } from "../hooks/useFetch"

export default function RequestRecipe() {
	const socket = useSocket()
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState("request send")

	const [loading, setLoading] = useState(true)

	const { rows } = useFetch(process.env.REACT_APP_MS_API + "/api/recipes", setLoading)

	if (loading) {
		return (
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<CircularProgress />
			</div>
		)
	}

	const handleOpen = (message) => {
		setMessage(message)
		setOpen(true)
	}

	socket.on("recipe-state-response", (data) => {
		const { recipe } = data

		const messages = {
			ready: `${recipe.name} is Ready`,
			prepare: `Cooking ${recipe.name} Recipe`,
		}

		handleOpen(messages[data.requestState])
	})

	return (
		<>
			<Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)}>
				<Alert id="alert" onClose={() => setOpen(false)} severity="info" sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
			<Button
				variant="contained"
				onClick={() => {
					handleOpen("Random Recipe Send")
					const clientId = socket.id
					const recipe = rows[Math.floor(Math.random() * rows.length)]

					const data = {
						clientId,
						foodReady: false,
						requestState: "cook",
						recipe: {
							id: recipe.id,
							name: recipe.name,
							ingredients: recipe.ingredients.map(({ name, RecipeIngredient }) => {
								return { name, count: RecipeIngredient.count }
							}),
						},
					}
					console.log("req", data)

					socket.emit("create-room", socket.id)
					socket.emit("recipe-request", data)
				}}
			>
				Free Food!
			</Button>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<ImageList sx={{ width: 500 }}>
					<ImageListItem key="Subheader" cols={2}>
						<ListSubheader component="div">
							<strong>Recipes Available</strong>
						</ListSubheader>
					</ImageListItem>
					{rows.map((recipe, index) => {
						const { name, imageUrl, ingredients } = recipe
						return (
							<ImageListItem key={index}>
								<img src={`${imageUrl}?w=248&fit=crop&auto=format`} srcSet={`${imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`} alt={name} loading="lazy" />
								<ImageListItemBar
									title={name}
									subtitle={`ingredients : ${ingredients.length}`}
									actionIcon={
										<IconButton
											sx={{ color: "rgba(255, 255, 255, 0.54)" }}
											aria-label={`info about ${name}`}
											onClick={() => {
												const ingredients = recipe.ingredients.map(({ name, RecipeIngredient }) => {
													return { name, count: RecipeIngredient.count }
												})

												alert(
													`recipe ${recipe.name.toUpperCase()}\n${ingredients
														.map((i) => {
															return `${i.name.toUpperCase()} ${i.count}`
														})
														.join("\n")}`
												)
											}}
										>
											<InfoIcon />
										</IconButton>
									}
								/>
							</ImageListItem>
						)
					})}
				</ImageList>
			</div>
		</>
	)
}
