import React from 'react'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { IconButton, Box } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
export const DialogTitle = props => {
  const { children, classes, onClose = true } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Box borderRadius="borderRadius" className={classes.box}>
        <img alt="thumb" src={props.thumb} className={classes.imgBox} />
      </Box>
      <div style={{ padding: '8px 0' }}>{children}</div>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon color="primary" />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
}
