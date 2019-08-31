import React from 'react'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default function(props) {
  const classes = useStyles()
  return (
    <Fab {...props} className={classes.fab} color="primary">
      <AddIcon />
    </Fab>
  )
}
