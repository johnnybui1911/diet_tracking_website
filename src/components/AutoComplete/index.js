import React, { useRef } from 'react'
import Downshift from 'downshift'
import { Paper, Divider, List, ListSubheader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BASE_URL, headers } from '../../api'
import FixedFab from '../FixedFab'
import axios from 'axios'
import { renderInput } from './renderInput'
import { renderSuggestion } from './renderSuggestion'
import { getSuggestions } from './getSuggestions'
import _ from 'lodash'
import ModalPopup from '../Modal/ModalPopup'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    left: 0,
    right: 0,
    backgroundColor: '#fafafa',
    borderRadius: 4
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  },
  inputPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 4
  }
}))

export default function AutoComplete() {
  const classes = useStyles()
  const [itemNameId, setItemNameId] = React.useState(null)
  const [searchInput, setSearchInput] = React.useState('')
  const [results, setResults] = React.useState({
    common: [],
    branded: [],
    isOpen: false
  })

  const retrieveDataAsync = inputValue => {
    if (inputValue.trim() === '') {
      setResults({ common: [], branded: [], isOpen: false })
    } else {
      axios
        .get(`${BASE_URL}/search/instant`, {
          headers: headers,
          params: {
            query: inputValue
          }
        })
        .then(res => {
          const { common, branded } = res.data
          setResults({
            branded: branded.slice(0, 5),
            common: common.slice(0, 5),
            isOpen: true
          })
        })
        .catch(e => {
          setResults({ common: [], branded: [], isOpen: false })
        })
    }
  }

  const delayedQuery = useRef(_.debounce(q => retrieveDataAsync(q), 500))
    .current

  const handleChangeInput = inputValue => {
    const input = inputValue
    setSearchInput(input)
    setResults({ ...results, isOpen: false })
    delayedQuery(input.toLowerCase())
  }

  const toggleMenu = () => {
    setResults(prev => ({ ...results, isOpen: !prev.isOpen }))
  }

  const handleClose = () => {
    setItemNameId(null)
  }

  const onSubmit = () => {
    setSearchInput('')
    setResults({ common: [], branded: [], isOpen: false })
    setItemNameId(null)
  }

  const handleClick = itemNameId => {
    setItemNameId(itemNameId)
  }

  return (
    <div className={classes.root}>
      {itemNameId && (
        <ModalPopup
          itemNameId={itemNameId}
          branded={itemNameId.length > 20}
          handleClose={handleClose}
          onSubmit={onSubmit}
        />
      )}
      <Downshift id="downshift-options">
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          openMenu,
          selectedItem,
          closeMenu,
          onOuterClick
        }) => {
          const { onBlur, onChange, onFocus } = getInputProps({
            onChange: event => {
              if (event.target.value === '') {
                clearSelection()
              }
              handleChangeInput(event.target.value)
            }
          })

          return (
            <div className={classes.container}>
              <FixedFab onClick={() => toggleMenu()} />
              {renderInput({
                classes,
                InputProps: { onBlur, onChange, onFocus },
                value: searchInput
              })}

              <div {...getMenuProps()}>
                {results.isOpen ? (
                  <Paper className={classes.paper} square>
                    <List
                      subheader={
                        <ListSubheader
                          disableSticky
                          component="div"
                          id="nested-list-subheader"
                        >
                          {results.common.length !== 0
                            ? 'COMMON'
                            : 'NO RESULTS'}
                        </ListSubheader>
                      }
                    >
                      {getSuggestions(results.common, searchInput, {
                        showEmpty: true
                      }).map((suggestion, index) =>
                        renderSuggestion({
                          handleClick,
                          suggestion,
                          index,
                          itemProps: getItemProps({
                            item: suggestion.food_name
                          }),
                          highlightedIndex,
                          selectedItem,
                          classes
                        })
                      )}
                    </List>
                    {results.branded.length !== 0 && <Divider />}
                    <List
                      subheader={
                        <ListSubheader
                          disableSticky
                          component="div"
                          id="nested-list-subheader"
                        >
                          {results.branded.length !== 0 ? 'BRANDED' : ''}
                        </ListSubheader>
                      }
                    >
                      {getSuggestions(results.branded, searchInput, {
                        showEmpty: true
                      }).map((suggestion, index) =>
                        renderSuggestion({
                          handleClick,
                          suggestion,
                          index,
                          itemProps: getItemProps({
                            item: suggestion.food_name
                          }),
                          highlightedIndex,
                          selectedItem,
                          classes
                        })
                      )}
                    </List>
                  </Paper>
                ) : null}
              </div>
            </div>
          )
        }}
      </Downshift>
    </div>
  )
}
