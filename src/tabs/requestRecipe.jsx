import { useState } from "react"

import InfoIcon from "@mui/icons-material/Info"

import { CircularProgress } from "@mui/material"

import ImageList from "@mui/material/ImageList"
import IconButton from "@mui/material/IconButton"
import ListSubheader from "@mui/material/ListSubheader"
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar"

import { useFetch } from "../hooks/useFetch"

export default function RequestRecipe() {
	const [loading, setLoading] = useState(true)
	const { rows } = useFetch(process.env.REACT_APP_MS_API + "/api/recipes", setLoading)

	if (loading) {
		return (
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
				<CircularProgress />
			</div>
		)
	}

	return (
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
									<IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }} aria-label={`info about ${name}`}>
										<InfoIcon />
									</IconButton>
								}
							/>
						</ImageListItem>
					)
				})}
			</ImageList>
		</div>
	)
}
