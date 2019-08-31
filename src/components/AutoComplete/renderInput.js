import React from 'react'
import { Paper, InputBase, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
export const renderInput = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps
  return (
    <Paper className={classes.inputPaper}>
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search foods"
        fullWidth
        style={{
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.5,
          color: 'rgba(0, 0, 0, 0.87)'
        }}
        {...other}
        {...InputProps}
      />
    </Paper>
  )
}
