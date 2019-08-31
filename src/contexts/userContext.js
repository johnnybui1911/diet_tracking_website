import React, { createContext, useState, useEffect } from 'react'
import mockData from '../library/mockData'

export const UserContext = createContext()

export const UserContextProvider = props => {
  const [user, setData] = useState(null)

  useEffect(() => {
    setData({ ...mockData, currentIndex: 0 })
  }, [])

  const addItem = item => {
    const { data_points, currentIndex } = user
    data_points[currentIndex].intake_list.push(item)
    setData({ ...user, data_points })
  }

  const goNext = () => {
    let { currentIndex } = user
    currentIndex > 0 && currentIndex--
    setData({ ...user, currentIndex })
  }

  const goPrev = () => {
    const { data_points } = user
    let { currentIndex } = user
    currentIndex < data_points.length - 1 && currentIndex++
    setData({ ...user, currentIndex })
  }

  return (
    <UserContext.Provider value={{ user, goNext, goPrev, addItem }}>
      {props.children}
    </UserContext.Provider>
  )
}
