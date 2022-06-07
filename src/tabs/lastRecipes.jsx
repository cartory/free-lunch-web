import { useState } from "react"

import {
	//
	Paper,
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TableContainer,
	CircularProgress,
} from "@mui/material"

import { useFetch } from "../hooks/useFetch"

export const LastRecipesTable = () => {
	const [loading, setLoading] = useState(true)
	const { rows } = useFetch(process.env.REACT_APP_MS_API + "/api/history/recipes", setLoading)

	if (loading) {
		return (
			<TableContainer component={Paper}>
				<CircularProgress />
			</TableContainer>
		)
	}

	if (!loading && !rows.length) {
		return (
			<TableContainer component={Paper}>
				<h4>No History yet</h4>
			</TableContainer>
		)
	}

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">
							<strong>ID</strong>
						</TableCell>
						<TableCell align="center">
							<strong>TimeStamp</strong>
						</TableCell>
						<TableCell align="center">
							<strong>Food</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => {
						const { recipe } = row
						return (
							<TableRow key={index} align="center" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell align="center" component="th" scope="row">
									{row.id}
								</TableCell>
								<TableCell align="center" component="th" scope="row">
									{row.createdAt}
								</TableCell>
								<TableCell scope="row" align="center" component="th" style={{ backgroundImage: `url(${recipe.imageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
									{recipe.name}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
