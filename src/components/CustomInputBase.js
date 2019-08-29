import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { InputContext } from '../contexts/inputContext'
import SearchList from './SearchList'
import mockSearchData from '../library/mockSearchData'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  autocomplete: {
    position: 'relative'
  },
  autocomplete_item: {
    position: 'absolute',
    top: 55,
    right: 0,
    left: 0,
    zIndex: 99
    // padding: '0px 10px'
  },
  autocomplete_item__div: {
    height: 50,
    width: '100%',
    margin: '10px 0'
  }
}))

export default function CustomizedInputBase() {
  const { open, setOpenInput } = useContext(InputContext)
  const classes = useStyles()
  const [searchText, setSearchText] = useState('')

  const [initialData, setInitialData] = React.useState([])

  useEffect(() => {
    setInitialData(mockSearchData)
  }, [])

  const [searchData, setSearchData] = React.useState([])

  const handleChangeText = text => {
    if (text === '') {
      setOpenInput(false)
      setSearchData(initialData)
    } else {
      setOpenInput(true)
      const filterData = initialData.filter(
        item => item.food_name.indexOf(text.trim().toLowerCase()) > -1
      )
      setSearchData(filterData)
    }
    setSearchText(text)
  }

  return (
    <div className={classes.autocomplete}>
      <Paper className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search foods"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={searchText}
          onChange={e => handleChangeText(e.target.value)}
        />
        {open && (
          <Paper className={classes.autocomplete_item}>
            <SearchList data={searchData} />
            <Divider />
            {/* <SearchList /> */}
          </Paper>
        )}
      </Paper>
    </div>
  )
}
