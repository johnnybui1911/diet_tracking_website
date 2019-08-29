import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import { ListSubheader, ListItemSecondaryAction } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import ModalPopup from './ModalPopup'
import { convertToUpper } from '../assets/convertToUpper'

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  box: {
    width: 50,
    height: 50,
    border: '0px solid white',
    backgroundColor: '#FFF'
    // backgroundImage: `url(https://i.pravatar.cc/50?img=36)`
  },
  typo_bold: {
    fontWeight: 'bold'
  }
}))

const fakeData = [
  {
    food_name: 'fried eggs',
    serving_qty: 1,
    serving_unit: 'large',
    serving_weight_grams: 46,
    nf_calories: 90.16,
    serving_size: 2,
    meal_type: 'breakfast',
    thumb: 'https://d2xdmhkmkbyw75.cloudfront.net/1741_thumb.jpg'
  },
  {
    food_name: 'chicken salad',
    serving_qty: 0.5,
    serving_unit: 'cup',
    serving_weight_grams: 112.1,
    nf_calories: 253.99,
    serving_size: 1,
    meal_type: 'lunch',
    thumb: 'https://d2xdmhkmkbyw75.cloudfront.net/3121_thumb.jpg'
  }
]

export default function GridList({ showSubtitle = false, data = fakeData }) {
  const classes = useStyles()
  const [openModal, setOpenModal] = React.useState(false)
  const [chosenItem, setChosen] = React.useState(null)

  function handleOpen() {
    setOpenModal(true)
  }
  function handleClose() {
    setOpenModal(false)
  }

  // const handleClick = item => {
  //   setChosen(item)
  // }

  const renderDialog = () => {
    return (
      chosenItem && (
        <ModalPopup
          item={chosenItem}
          openModal={openModal}
          handleClose={handleClose}
        />
      )
    )
  }

  return (
    <div>
      {renderDialog()}
      <List
        subheader={
          !showSubtitle && (
            <ListSubheader component="div" id="nested-list-subheader">
              COMMON
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
              <ListItem
                button={showSubtitle ? false : true}
                disableGutters
                onClick={() => {
                  !showSubtitle && handleOpen()
                }}
              >
                <ListItemAvatar>
                  <Box
                    m={2}
                    // border={1}
                    borderRadius="borderRadius"
                    className={classes.box}
                    // style={{ backgroundImage: `url(${thumb})` }}
                  >
                    <img
                      alt="thumb"
                      src={thumb}
                      style={{ width: 50, height: 50 }}
                    />
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={classes.typo_bold}>
                      {convertToUpper(food_name)}
                    </Typography>
                  }
                  secondary={`${
                    showSubtitle
                      ? `${serving_size} ${serving_unit} (${total_weight} g)`
                      : ''
                  }`}
                />
                <ListItemSecondaryAction style={{ paddingRight: 24 }}>
                  <ListItemText
                    style={{ textAlign: 'right' }}
                    primary={
                      <Typography className={classes.typo_bold}>
                        {`${total_kcal} cal`}
                      </Typography>
                    }
                    secondary={`${
                      showSubtitle ? `${convertToUpper(meal_type)}` : ''
                    }`}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {index !== data.length - 1 && (
                <Divider
                  variant="inset"
                  component="li"
                  style={{ marginLeft: 86 }}
                />
              )}
            </div>
          )
        })}
      </List>
    </div>
  )
}
