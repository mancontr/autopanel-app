import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { components } from 'autopanel'
const {
  AutoPanel,
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

const settings = {}

const AutoPanelAdapter = ({ match, history }) => {
  const currSettings = {
    ...settings,
    navigate: history.push,
    prefix: match.path
  }
  return (
    <AutoPanel settings={currSettings}>
      <Route path={match.path + '/providers/:provider/*'}
        component={ProviderCallbackAdapter} />
      <Route path={match.path} component={MainLayoutAdapter} />
    </AutoPanel>
  )
}

const ProviderCallbackAdapter = ({ match }) =>
  <ProviderCallback provider={match.params.provider} />

const MainLayoutAdapter = ({ match }) =>
  <MainLayout>
    <Route exact path={match.path} component={ProjectPicker} />
    <Route path={match.path + '/project/:projectId'}
      component={ProjectLayoutAdapter} />
  </MainLayout>

const ProjectLayoutAdapter = ({ match }) =>
  <ProjectLayout projectId={match.params.projectId}>
    <Route exact path={match.path} component={Dashboard} />
    <Route path={match.path + '/entities'} component={EntitiesAdapter} />
    <Route path={match.path + '/settings'} component={Settings} />
  </ProjectLayout>

const EntitiesAdapter = ({ match }) =>
  <React.Fragment>
    <Route exact path={match.path} component={EntityTypes} />
    <Route path={match.path + '/:entityType'} component={EntityTypeAdapter} />
  </React.Fragment>

const EntityTypeAdapter = ({ match }) =>
  <React.Fragment>
    <Route exact path={match.path} component={EntityListAdapter} />
    <Switch>
      <Route path={match.path + '/new'} component={EntityEditAdapter} />
      <Route path={match.path + '/:entityId'} component={EntityEditAdapter} />
    </Switch>
  </React.Fragment>

const EntityListAdapter = ({ match }) =>
  <EntityList entityType={match.params.entityType} />

const EntityEditAdapter = ({ match }) =>
  <EntityEdit
    entityType={match.params.entityType}
    entityId={match.params.entityId}
  />

const App = () => __CLIENT__ && (
  <Route path="" component={AutoPanelAdapter} />
)

export default App
