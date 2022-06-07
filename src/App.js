import * as React from "react"
import { Tab, Box, Tabs, Typography } from "@mui/material"

import { LastMarketTable } from "./tabs/lastMarket"
import { LastRecipesTable } from "./tabs/lastRecipes"

import Recipes from "./tabs/requestRecipe"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

export default function App() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }} style={{ textAlign: 'center' }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Free Food" />
          <Tab label="Recipe History" />
          <Tab label="Ingredients History" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Recipes />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h3>Last recipes</h3>
        <LastRecipesTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h3>Last Ingredients</h3>
        <LastMarketTable />
      </TabPanel>
    </Box>
  )
}
