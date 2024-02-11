import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class FoodButton extends Component {
  state = {quantity: 0}

  render() {
    const {quantity} = this.state
    const {foods, id} = this.props
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const addFoodItem = () => {
            if (quantity === 0) {
              return
            }
            const foodItem = {
              id,
              dishName: foods.dish_name,
              dishPrice: foods.dish_price,
              dishImage: foods.dish_image,
              foodQuantity: quantity,
              foodDescription: foods.dish_description,
            }
            addCartItem(foodItem, id)
          }

          const incrementbutton = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
          }

          const decrementbutton = () => {
            if (quantity > 0) {
              this.setState(prevState => ({quantity: prevState.quantity - 1}))
            }
          }

          return (
            <>
              <div className="greenBtn">
                <button
                  type="button"
                  className="foodbtn"
                  onClick={decrementbutton}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  type="button"
                  className="foodbtn"
                  onClick={incrementbutton}
                >
                  +
                </button>
              </div>
              <button type="button" onClick={addFoodItem}>
                ADD TO CART
              </button>
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodButton
