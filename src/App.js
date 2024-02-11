import {Component} from 'react'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import CartContext from './context/CartContext'

import LoginForm from './components/LoginForm'
import WebPage from './components/WebPage'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = food => {
    const {cartList} = this.state
    const {id, foodQuantity} = food
    const productFound = cartList.find(item => item.id === id)

    if (productFound) {
      const updatedcartList = cartList.map(item => {
        if (item.id === id) {
          return {...item, foodQuantity: item.foodQuantity + foodQuantity}
        }
        return item
      })
      this.setState({cartList: updatedcartList})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, food]}))
    }
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let flag = 0
    let updatedInCart = cartList.map(items => {
      if (items.id === id) {
        if (items.foodQuantity > 1) {
          return {...items, foodQuantity: items.foodQuantity - 1}
        }
        flag = 1
      }
      return items
    })

    if (flag === 1) {
      updatedInCart = cartList.filter(items => items.id !== id)
    }
    this.setState({cartList: updatedInCart})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList.filter(items => items.id !== id)],
    }))
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedInCart = cartList.map(items => {
      if (items.id === id) {
        return {...items, foodQuantity: items.foodQuantity + 1}
      }
      return items
    })
    this.setState({cartList: updatedInCart})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={WebPage} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
