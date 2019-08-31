import React, { useState, useContext, useEffect } from 'react'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import {
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FilledInput,
  FormControl,
  ListItemText,
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { convertToUpper } from '../../assets/convertToUpper'
import { DataContext } from '../../contexts/dataContext'
import { BASE_URL, headers } from '../../api'
import axios from 'axios'
import { DialogTitle } from './DialogTitle'
import './index.scss'

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
    width: 64,
    height: 64,
    border: '0px solid white',
    backgroundColor: '#FFF',
    borderRadius: 4
  },
  imgBox: {
    width: 64,
    height: 64,
    borderRadius: 4
  },
  formControl__lg: {
    margin: `${theme.spacing(1)}px 0px`
  },
  caption: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)'
  }
}))

export default function ModalPopup({
  branded = false,
  itemNameId,
  onSubmit,
  handleClose
}) {
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (branded && itemNameId) {
      axios
        .get(`${BASE_URL}/search/item`, {
          headers: headers,
          params: {
            nix_item_id: itemNameId
          }
        })
        .then(res => setItem(res.data.foods[0]))
        .catch(e => console.log(e))
    } else {
      fetch(`${BASE_URL}/natural/nutrients`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: itemNameId
        })
      })
        .then(res => res.json())
        .then(resJson => {
          setItem(resJson.foods[0])
        })
        .catch(e => console.log(e))
    }
  }, [])

  const [values, setValues] = useState({
    serving_size: 1.0,
    meal_type: 'breakfast'
  })
  const { addItem } = useContext(DataContext)
  const classes = useStyles()

  function handleChange(e) {
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
    onSubmit()
    const {
      food_name,
      serving_qty,
      serving_unit,
      serving_weight_grams,
      nf_calories,
      photo: { thumb }
    } = item

    const newItem = {
      food_name,
      serving_qty,
      serving_unit,
      serving_weight_grams,
      nf_calories,
      thumb,
      ...values
    }
    addItem(newItem)
  }

  if (item) {
    const {
      photo: { thumb },
      food_name,
      nf_calories,
      serving_weight_grams,
      serving_unit
    } = item

    return (
      <Dialog
        open
        onClose={() => handleClose()}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            margin: 16,
            maxWidth: 'none'
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle
            thumb={thumb}
            classes={classes}
            onClose={handleClose}
            id="form-dialog-title"
          >
            <Typography variant="h5">{convertToUpper(food_name)}</Typography>
            {branded && (
              <Typography color="textSecondary" variant="body1">
                {item.brand_name}
              </Typography>
            )}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <TextField
                  error
                  id="filled-number"
                  label="Servings"
                  value={values.serving_size}
                  onChange={handleChangeServing}
                  name="serving_size"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 0.1
                  }}
                  placeholder="Serving"
                  type="number"
                  fullWidth
                  variant="filled"
                />
                <div style={{ paddingLeft: 12, paddingTop: 3 }}>
                  <Typography className="caption" color="primary">
                    {serving_unit}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <ListItemText
                  style={{ display: 'flex', flexDirection: 'column' }}
                  primary={
                    <Typography className={'Headline-5'}>
                      {Math.floor(values.serving_size * serving_weight_grams)}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" className={classes.caption}>
                      grams
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={3} style={{ textAlign: 'right' }}>
                <ListItemText
                  style={{ display: 'flex', flexDirection: 'column' }}
                  primary={
                    <Typography className={'Headline-5'}>
                      {Math.floor(values.serving_size * nf_calories)}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" className={classes.caption}>
                      calories
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogContent style={{ overflowX: 'hidden' }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography className={classNames('overline')}>
                  ADD TO TODAY
                </Typography>
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
              <Grid
                item
                xs={12}
                container
                justify="flex-end"
                style={{ padding: '16px 0' }}
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={'add__button'}
                >
                  ADD
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
    )
  } else {
    return null
  }
}
