import React from 'react'
import { Grid, Typography, ListItemText } from '@material-ui/core'
import NavBar from '../../components/NavBar'

export const MobileNavBar = ({ classes, user }) => {
  return (
    <NavBar mobile>
      <Grid item xs={6} container alignItems="center">
        <img
          alt="thumb"
          src={`https://i.pravatar.cc/120?img=36`}
          className="image_profile"
        />
        <div style={{ paddingLeft: 12 }}>
          <Typography className={'Headline-6 '} style={{ color: '#fff' }}>
            {user.first_name}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={6} container justify="flex-end">
        <div className="circle__div">
          <ListItemText
            primary={
              <Typography className={'Headline-6'}>{user.weight_kg}</Typography>
            }
            secondary={<Typography className={'caption'}>kg</Typography>}
          />
        </div>
        <div className="circle__div" style={{ marginLeft: 8 }}>
          <ListItemText
            primary={
              <Typography className={'Headline-6'}>{user.height_cm}</Typography>
            }
            secondary={<Typography className={'caption'}>cm</Typography>}
          />
        </div>
      </Grid>
    </NavBar>
  )
}
