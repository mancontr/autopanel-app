import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { components } from 'autopanel'
const {
  Wrapper,
  MainLayout,
  ProjectLayout,
  ProjectPicker,
  ProviderCallback,
  Dashboard,
  EntityTypes,
  EntityList,
  EntityEdit,
  Settings
} = components

const createRoutes = () => (
  <React.Fragment>
    <Route component={Wrapper}>
      <Route path="/providers/:provider/*" component={ProviderCallback} />,
      <Route path="/" component={MainLayout}>
        <IndexRoute component={ProjectPicker} />
        <Route path="/project/:projectId" component={ProjectLayout}>
          <IndexRoute component={Dashboard} />
          <Route path="entities">
            <IndexRoute component={EntityTypes} />
            <Route path=":entityType">
              <IndexRoute component={EntityList} />
              <Route path="new" component={EntityEdit} />
              <Route path=":entityId" component={EntityEdit} />
            </Route>
          </Route>
          <Route path="settings" component={Settings} />
        </Route>
      </Route>
    </Route>
  </React.Fragment>
)

const serverRoutes = () => <Route path="*" component={() => '...'} />

const _export = __CLIENT__ ? createRoutes : serverRoutes
export default _export // createRoutes
