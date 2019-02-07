import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import AutoPanelRoutes from 'autopanel/dist/routes/v4'

const App = () => __CLIENT__ && (
  <Route path="" component={AutoPanelRoutes()} />
)

export default App
