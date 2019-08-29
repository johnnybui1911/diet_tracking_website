import React, { createContext, useState } from 'react'

export const InputContext = createContext({
  open: false,
  toggleInput: () => {},
  setOpenInput: () => {}
})

export const InputContextProvider = props => {
  const [open, setOpen] = useState(false)

  const toggleInput = () => {
    setOpen(prev => !prev)
  }

  const setOpenInput = open => {
    setOpen(open)
  }

  return (
    <InputContext.Provider value={{ open, toggleInput, setOpenInput }}>
      {props.children}
    </InputContext.Provider>
  )
}
