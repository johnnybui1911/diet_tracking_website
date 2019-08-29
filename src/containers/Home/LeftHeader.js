import React from 'react'
import { Grid, Typography, ListItemText } from '@material-ui/core'
export const LeftHeader = props => {
  const { classes } = props
  return (
    <Grid
      item
      xs={12}
      container
      alignItems="center"
      className={classes.grid_item__left__child}
    >
      <Grid item xs={12} md={4} container justify="center">
        <div className={classes.circle_div}>
          <ListItemText
            primary={
              <Typography variant="h5" className={classes.typo_bold}>
                {props.weight_kg}
              </Typography>
            }
            secondary={<Typography>kg</Typography>}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={4} container justify="center">
        <div className={classes.circle_div__img}></div>
      </Grid>
      <Grid item xs={12} md={4} container justify="center">
        <div className={classes.circle_div}>
          <ListItemText
            primary={
              <Typography variant="h5" className={classes.typo_bold}>
                {props.height_cm}
              </Typography>
            }
            secondary={<Typography>cm</Typography>}
          />
        </div>
      </Grid>
    </Grid>
  )
}
