import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import { ListSubheader } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { convertToUpper } from '../assets/convertToUpper'

const useStyles = makeStyles(theme => ({
  root: {},
  inline: {
    display: 'inline'
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 4
  },
  imgBox: {
    width: 40,
    height: 40,
    borderRadius: 4
  },
  typo_bold: {
    fontWeight: 'bold'
  }
}))

export default function GridList({ data = [] }) {
  const classes = useStyles()

  return (
    <div>
      <List
        subheader={
          data.length === 0 && (
            <ListSubheader component="div" id="nested-list-subheader">
              NO RESULTS
            </ListSubheader>
          )
        }
      >
        {data.map((item, index) => {
          const {
            food_name,
            thumb,
            meal_type,
            serving_qty,
            serving_size,
            nf_calories,
            serving_unit,
            serving_weight_grams
          } = item

          const total_weight = Math.floor(
            serving_weight_grams * serving_qty * serving_size
          )

          const total_kcal = Math.floor(
            nf_calories * serving_qty * serving_size
          )
          return (
            <div key={index}>
              <ListItem style={{ padding: '8px 16px' }}>
                <ListItemAvatar>
                  <Box borderRadius="borderRadius" className={classes.box}>
                    <img alt="thumb" src={thumb} className={classes.imgBox} />
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className="Subtitle-1">
                      {convertToUpper(food_name)}
                    </Typography>
                  }
                  secondary={
                    <Typography className="Body-2">
                      {`${serving_size} ${serving_unit} (${total_weight} g)`}
                    </Typography>
                  }
                />
                <ListItemText
                  style={{ textAlign: 'right' }}
                  primary={
                    <Typography className="Subtitle-1">
                      {`${total_kcal} cal`}
                    </Typography>
                  }
                  secondary={
                    <Typography className="Body-2">
                      {convertToUpper(meal_type)}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )
        })}
      </List>
    </div>
  )
}
