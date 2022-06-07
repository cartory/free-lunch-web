import { useState, useEffect } from "react"
import { useFetch } from "../hooks/useFetch"

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

export const LastMarketTable = () => {
	const [loading, setLoading] = useState(true)
	const { rows } = useFetch(process.env.REACT_APP_MS_API + "/api/history/market", setLoading)

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
							<strong>Stock</strong>
						</TableCell>
						<TableCell align="center">
							<strong>Minimum Stock</strong>
						</TableCell>
						<TableCell align="center">
							<strong>Ingredient</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => {
						const { ingredient } = row

						return (
							<TableRow key={index} align="center" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell align="center" component="th" scope="row">
									{row.id}
								</TableCell>
								<TableCell align="center" component="th" scope="row">
									{row.createdAt}
								</TableCell>
								<TableCell align="center" component="th" scope="row">
									{ingredient.stock}
								</TableCell>
								<TableCell align="center" component="th" scope="row">
									{ingredient.minimumStock}
								</TableCell>
								<TableCell
									//
									align="center"
									component="th"
									scope="row"
									style={{ backgroundImage: `url(${ingredient.imageUrl})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
								>
									{ingredient.name}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
