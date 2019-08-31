import React from 'react'
import './index.scss'
import { Grid, Typography, ListItemText } from '@material-ui/core'
export const LeftHeader = props => {
  const { classes } = props
  return (
    <Grid item xs={12} container alignItems="center">
      <Grid item xs={12} container justify="center" alignItems="center">
        <div className="circle__div">
          <ListItemText
            primary={
              <Typography className={'Headline-6'}>
                {props.weight_kg}
              </Typography>
            }
            secondary={<Typography className={'caption'}>kg</Typography>}
          />
        </div>
        <div className={classes.circle_div__img}>
          <img
            alt="thumb"
            src={`https://i.pravatar.cc/120?img=36`}
            className="image_profile"
          />
        </div>
        <div className="circle__div">
          <ListItemText
            primary={
              <Typography className={'Headline-6'}>
                {props.height_cm}
              </Typography>
            }
            secondary={<Typography className={'caption'}>cm</Typography>}
          />
        </div>
      </Grid>
    </Grid>
  )
}
