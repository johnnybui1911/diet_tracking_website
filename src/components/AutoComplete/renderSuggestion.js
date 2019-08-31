import React from 'react'
import {
  ListItem,
  ListItemAvatar,
  Box,
  Divider,
  Typography,
  ListItemText
} from '@material-ui/core'
import { convertToUpper } from '../../assets/convertToUpper'
export function renderSuggestion(suggestionProps) {
  const { handleClick, suggestion, index, itemProps, classes } = suggestionProps
  const { nix_item_id, brand_name } = suggestion
  return (
    <div key={index}>
      <ListItem
        {...itemProps}
        button
        disableGutters={true}
        onClick={() => {
          if (nix_item_id) {
            handleClick(nix_item_id)
          } else {
            handleClick(suggestion.food_name)
          }
        }}
        style={{ padding: 0 }}
      >
        <ListItemAvatar>
          <Box m={2} className={classes.box}>
            <img
              alt="thumb"
              src={suggestion.photo.thumb}
              style={{ width: 40, height: 40, borderRadius: 4 }}
            />
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
              {convertToUpper(suggestion.food_name)}
            </Typography>
          }
          secondary={nix_item_id ? brand_name : ''}
        />
      </ListItem>
      {index !== 4 && <Divider variant="inset" />}
    </div>
  )
}
