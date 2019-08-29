import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
// import DialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import {
  Typography,
  IconButton,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FilledInput,
  FormControl,
  ListItemText,
  Grid
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { convertToUpper } from '../assets/convertToUpper'
import { DataContext } from '../contexts/dataContext'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  box: {
    width: 50,
    height: 50,
    border: '0px solid white',
    backgroundColor: '#FFF'
  },
  formControl: {},
  formControl__lg: {
    margin: `${theme.spacing(1)}px 0px`
  }
}))

const DialogTitle = props => {
  const { children, classes, onClose = true } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Box borderRadius="borderRadius" className={classes.box}>
        <img alt="thumb" src={props.thumb} style={{ width: 50, height: 50 }} />
      </Box>
      <Typography variant="h6">{children}</Typography>
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

export default function ModalPopup({ handleClose, openModal, item }) {
  const [values, setValues] = useState({
    serving_size: 1,
    meal_type: 'breakfast'
  })
  const { addItem } = useContext(DataContext)
  const classes = useStyles()

  function handleChange(e) {
    console.log(e.target.value)
    if (e.target.name) {
    }
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleChangeServing = e => {
    const { value } = e.target
    if (value >= 0) {
      setValues({ ...values, serving_size: value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    addItem({ ...item, ...values })
  }

  const { thumb, food_name, nf_calories, serving_weight_grams } = item

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle
            thumb={thumb}
            classes={classes}
            onClose={handleClose}
            id="form-dialog-title"
          >
            {convertToUpper(food_name)}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <TextField
                  id="filled-number"
                  label="serving_size"
                  value={values.serving_size}
                  onChange={handleChangeServing}
                  type="number"
                  name="serving_size"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  // margin="normal"
                  fullWidth
                  variant="filled"
                />
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" className={classes.typo_bold}>
                      {Math.floor(values.serving_size * serving_weight_grams)}
                    </Typography>
                  }
                  secondary="grams"
                />
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" className={classes.typo_bold}>
                      {Math.floor(values.serving_size * nf_calories)}
                    </Typography>
                  }
                  secondary="calories"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12}>
                <Typography color="textSecondary">ADD TO TODAY</Typography>
                <FormControl
                  fullWidth
                  variant="filled"
                  className={classes.formControl__lg}
                >
                  <InputLabel>Meal</InputLabel>
                  <Select
                    value={values.meal_type}
                    onChange={handleChange}
                    input={<FilledInput name="meal_type" />}
                  >
                    <MenuItem value="breakfast">Breakfast</MenuItem>
                    <MenuItem value="lunch">Lunch</MenuItem>
                    <MenuItem value="dinner">Dinner</MenuItem>
                    <MenuItem value="snack">Snack</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              type="submit"
              color="primary"
              variant="contained"
            >
              ADD
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
