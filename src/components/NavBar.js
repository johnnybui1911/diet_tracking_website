import React from 'react'
import { AppBar, Toolbar, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AutoComplete from './AutoComplete'
import { ControllerBox } from './ControllerBox'

export const useStyles = makeStyles(theme => ({
  fab: {
    cursor: 'pointer'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}))

const NavBar = ({ mobile = false, children }) => {
  return (
    <AppBar position="relative" style={{ boxShadow: '0 0 0 0' }}>
      <Toolbar>
        <Grid container direction="column">
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            style={{ paddingTop: 8 }}
          >
            <Grid item xs={12} sm={6}>
              <AutoComplete />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justify="center"
            style={{ padding: '16px 0', textAlign: 'center' }}
          >
            {mobile ? children : <ControllerBox />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
