import React, { useContext } from 'react'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import { InputContext } from '../contexts/inputContext'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

export default function() {
  const { toggleInput } = useContext(InputContext)
  const classes = useStyles()
  return (
    <Fab className={classes.fab} color="primary" onClick={() => toggleInput()}>
      <AddIcon />
    </Fab>
  )
}
