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

export default function SearchList({ showSubtitle = false, data = [] }) {
  const classes = useStyles()
  const [openModal, setOpenModal] = React.useState(false)
  const [chosenItem, setChosen] = React.useState(null)

  function handleClose() {
    setOpenModal(false)
  }

  const handleClick = item => {
    setOpenModal(true)
    setChosen(item)
  }

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
              {data.length !== 0 ? 'COMMON' : 'NO RESULT'}
            </ListSubheader>
          )
        }
      >
        {data.map((item, index) => {
          const { food_name, thumb } = item
          return (
            <div key={index}>
              <ListItem
                button={showSubtitle ? false : true}
                disableGutters
                onClick={() => {
                  !showSubtitle && handleClick(item)
                }}
              >
                <ListItemAvatar>
                  <Box
                    m={2}
                    borderRadius="borderRadius"
                    className={classes.box}
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
                />
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
