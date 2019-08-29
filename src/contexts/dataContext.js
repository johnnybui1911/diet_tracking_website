import React, { createContext, useState, useEffect } from 'react'
import mockData from '../library/mockData'

export const DataContext = createContext()

export const DataContextProvider = props => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData({ ...mockData, currentIndex: 0 })
  }, [])

  const addItem = item => {
    const { data_points } = data
    data_points[0].intake_list.push(item)
    setData({ ...data, data_points })
  }

  const goNext = () => {
    let { currentIndex } = data
    if (currentIndex > 0) {
      currentIndex--
    }
    setData({ ...data, currentIndex })
  }

  const goPrev = () => {
    const { data_points } = data
    let { currentIndex } = data
    if (currentIndex < data_points.length - 1) {
      currentIndex++
    }
    setData({ ...data, currentIndex })
  }

  return (
    <DataContext.Provider value={{ data, goNext, goPrev, addItem }}>
      {props.children}
    </DataContext.Provider>
  )
}
