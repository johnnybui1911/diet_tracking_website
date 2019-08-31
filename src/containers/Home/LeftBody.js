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
    <Grid
      item
      xs={12}
      container
      justify="space-between"
      alignItems="center"
      className={classes.leftBody}
    >
      <Grid item xs={6} style={{ textAlign: 'left' }}>
        <Typography className="Headline-5">{total} cal</Typography>
        <Typography className="caption" color="textSecondary">
          consumed
        </Typography>
      </Grid>
      <Grid item xs={6} style={{ textAlign: 'right' }}>
        <Typography className="Headline-5">{daily_goal} cal</Typography>
        <Typography className="caption" color="textSecondary">
          daily goal
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ padding: '16px 0px' }}>
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
      >
        {mealList.map((item, index) => {
          const total = getTotalKcal(
            intake_list.filter(row => row.meal_type === item)
          )
          return (
            <Grid key={index} item xs={3}>
              <Typography className="Headline-6">{total}</Typography>
              <Typography className="caption" color="textSecondary">
                {convertToUpper(item)}
              </Typography>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}
