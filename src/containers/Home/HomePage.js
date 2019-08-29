import React, { useContext } from 'react'
import { Grid, makeStyles, Typography, Divider } from '@material-ui/core'
import './index.scss'
import GridList from '../../components/GridList'
import { DataContext } from '../../contexts/dataContext'
import { LeftBody } from './LeftBody'
import { LeftHeader } from './LeftHeader'

const useStyles = makeStyles(theme => ({
  grid_container: {
    flexGrow: 1
  },
  grid_item__left: {
    padding: theme.spacing(2),
    backgroundColor: '#F5F5F5'
    // maxHeight: 530
  },
  grid_item__left__child: {
    padding: `${theme.spacing(4)}px 0px`
  },
  grid_item__left_child_sm: {
    padding: `${theme.spacing(2)}px 0px`
  },
  circle_div: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff'
  },
  circle_div__img: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    backgroundColor: 'red',
    color: '#fff',
    backgroundImage: `url(https://i.pravatar.cc/120?img=36)`
    // margin: '0px 10px'
  }
}))

const HomePage = () => {
  const { data } = useContext(DataContext)
  const classes = useStyles()
  if (data) {
    const {
      first_name,
      last_name,
      daily_goal,
      data_points,
      currentIndex
    } = data

    const { intake_list } = data_points[currentIndex]

    return (
      <div>
        <Grid container className={classes.grid_container}>
          <Grid
            item
            xs={12}
            md={4}
            container
            className={classes.grid_item__left}
          >
            <LeftHeader classes={classes} {...data} />
            <Grid item xs={12}>
              <Typography variant="h4" style={{ textAlign: 'center' }}>
                {first_name + ' ' + last_name}
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.grid_item__left__child}>
              <Divider />
            </Grid>
            <LeftBody
              classes={classes}
              intake_list={intake_list}
              daily_goal={daily_goal}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <GridList showSubtitle data={intake_list} />
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return null
  }
}

export default HomePage
