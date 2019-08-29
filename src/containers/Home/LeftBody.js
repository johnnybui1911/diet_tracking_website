import React from 'react'
import { Grid, Typography, LinearProgress } from '@material-ui/core'
import { convertToUpper } from '../../assets/convertToUpper'
import { getTotalKcal } from './getTotalKcal'
export const LeftBody = props => {
  const { classes, daily_goal, intake_list } = props
  const mealList = ['breakfast', 'lunch', 'dinner', 'snack']
  const total = getTotalKcal(intake_list)
  const progress = Math.floor((total / daily_goal) * 100)
  return (
    <Grid item xs={12} container justify="space-between" alignItems="center">
      <Grid item xs={6} className={classes.grid_item__left_child_sm}>
        <Typography variant="h5" className={classes.typo_bold}>
          {total} cal
        </Typography>
        <Typography>consumed</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        className={classes.grid_item__left_child_sm}
        style={{ textAlign: 'right' }}
      >
        <Typography variant="h5" className={classes.typo_bold}>
          {daily_goal} cal
        </Typography>
        <Typography>daily goal</Typography>
      </Grid>
      <Grid item xs={12} className={classes.grid_item__left_child_sm}>
        <LinearProgress
          variant="determinate"
          value={progress > 100 ? 100 : progress}
        />
      </Grid>
      <Grid
        item
        container
        xs={12}
        style={{ textAlign: 'center' }}
        justify="center"
        alignItems="center"
        className={classes.grid_item__left_child_sm}
      >
        {mealList.map((item, index) => {
          const total = getTotalKcal(
            intake_list.filter(row => row.meal_type === item)
          )
          return (
            <Grid key={index} item xs={3}>
              <Typography variant="h6">{total}</Typography>
              <Typography>{convertToUpper(item)}</Typography>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}
