import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  //clear cart function
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  //remove item
  const remove = id => {
    dispatch({ type: 'REMOVE', payload: id })
  }
  //increase quantity
  const increase = id => {
    dispatch({ type: 'INCREASE', payload: id })
  }
  //increase quantity
  const decrease = id => {
    dispatch({ type: 'DECREASE', payload: id })
  }
  //fetch data for api
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }
  //trigger fetchdata function at first load
  useEffect(() => {
    fetchData()
  }, [])
  //useEffect to get totals everytime cart state changes
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])
  //refractering increase and decrease quantity into a single function
  //toggleAmount
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
