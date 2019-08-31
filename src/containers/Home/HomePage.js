import React, { useContext } from 'react'
import {
  Grid,
  makeStyles,
  Typography,
  Divider,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import './index.scss'
import GridList from '../../components/GridList'
import { UserContext } from '../../contexts/userContext'
import { LeftBody } from './LeftBody'
import { LeftHeader } from './LeftHeader'
import NavBar from '../../components/NavBar'
import { ControllerBox } from '../../components/ControllerBox'
import { MobileNavBar } from './MobileNavBar'

const useStyles = makeStyles(theme => ({
  grid_item__left: {
    backgroundColor: '#F5F5F5',
    height: 'fit-content',
    padding: '24px 0px'
  },
  containerLeft: {
    backgroundColor: '#F5F5F5'
  },
  leftBody: {
    padding: `24px 16px 16px 16px`
  },
  circle_div__img: {
    margin: '0px 24px'
  }
}))

const HomePage = () => {
  const theme = useTheme()
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyles()

  const { user } = useContext(UserContext)
  if (user) {
    const {
      first_name,
      last_name,
      daily_goal,
      data_points,
      currentIndex
    } = user

    const { intake_list } = data_points[currentIndex]

    if (matchesDesktop) {
      return (
        <div>
          <NavBar />
          <Grid container className="grid_container">
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              container
              className={classes.containerLeft}
            >
              <Grid item xs={12} container className={classes.grid_item__left}>
                <LeftHeader classes={classes} {...user} />
                <Grid item xs={12} style={{ paddingTop: 12 }}>
                  <Typography className={'Headline-5--center'}>
                    {first_name + ' ' + last_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ padding: '32px 0px 0px 0px' }}>
                  <Divider />
                </Grid>
                <LeftBody
                  classes={classes}
                  intake_list={intake_list}
                  daily_goal={daily_goal}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <GridList intakeList={intake_list} />
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <MobileNavBar classes={classes} user={user} />
          <Grid container>
            <Grid
              item
              xs={12}
              container
              alignItems="center"
              justify="center"
              style={{ padding: '16px 0', textAlign: 'center' }}
            >
              <ControllerBox />
              <LeftBody
                classes={classes}
                intake_list={intake_list}
                daily_goal={daily_goal}
              />
            </Grid>
            <Grid item xs={12} style={{ padding: '0px 0px 0px 0px' }}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <GridList intakeList={intake_list} />
            </Grid>
          </Grid>
        </div>
      )
    }
  } else {
    return null
  }
}

export default HomePage
