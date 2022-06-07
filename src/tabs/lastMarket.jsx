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
							<strong>Ingredient</strong>
						</TableCell>
						<TableCell align="center">
							<strong>Count</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => {
						return (
							<TableRow key={index} align="center" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									ID
								</TableCell>
								<TableCell component="th" scope="row">
									TIME
								</TableCell>
								<TableCell component="th" scope="row">
									Ingredient
								</TableCell>
								<TableCell component="th" scope="row">
									Count
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
