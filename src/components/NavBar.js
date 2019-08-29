import React, { useContext } from 'react'
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CustomizedInputBase from './CustomInputBase'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'
import { DataContext } from '../contexts/dataContext'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    cursor: 'pointer'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}))

const NavBar = () => {
  const classes = useStyles()
  const { goNext, goPrev, data } = useContext(DataContext)

  const renderDate = () => {
    if (data) {
      switch (data.currentIndex) {
        case 1:
          return 'Yesterday'
        case 0:
          return 'Today'
        case 2:
          return '2 days ago'
        default:
          return 'Today'
      }
    } else {
      return 'Today'
    }
  }

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
            style={{ padding: '10px 0' }}
          >
            <Grid item xs={12} sm={6}>
              <CustomizedInputBase />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justify="center"
            style={{ textAlign: 'center' }}
          >
            <Grid item xs={4} sm={2}>
              <div
                aria-label="add"
                className={classes.fab}
                onClick={() => goPrev()}
              >
                <KeyboardArrowLeft />
              </div>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Typography variant="h5">{renderDate()}</Typography>
            </Grid>
            <Grid item xs={4} sm={2}>
              <div
                aria-label="add"
                className={classes.fab}
                onClick={() => goNext()}
              >
                <KeyboardArrowRight />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar
