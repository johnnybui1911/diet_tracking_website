import React, { useContext } from 'react'
import { Typography, Grid } from '@material-ui/core'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'
import { DataContext } from '../contexts/dataContext'
import { useStyles } from './NavBar'
import { renderDate } from '../assets/renderDate'

export const ControllerBox = () => {
  const classes = useStyles()
  const { goNext, goPrev, data } = useContext(DataContext)
  return (
    <React.Fragment>
      <Grid item xs={1}>
        <div
          aria-label="add"
          className={classes.fab}
          onClick={() => goPrev()}
          style={{ marginBottom: -10 }}
        >
          <KeyboardArrowLeft />
        </div>
      </Grid>
      <Grid item xs={8} sm={4}>
        <Typography className="title">{renderDate(data)}</Typography>
      </Grid>
      <Grid item xs={1}>
        <div
          aria-label="add"
          className={classes.fab}
          onClick={() => goNext()}
          style={{ marginBottom: -10 }}
        >
          <KeyboardArrowRight />
        </div>
      </Grid>
    </React.Fragment>
  )
}
