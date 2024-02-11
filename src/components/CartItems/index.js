import CartContext from '../../context/CartContext'
import './index.css'

const CartItems = props => {
  const {items} = props
  const {id, dishName, dishPrice, foodQuantity, dishImage} = items
  const {foodDescription} = items

  return (
    <CartContext.Consumer>
      {value => {
        const {
          decrementCartItemQuantity,
          incrementCartItemQuantity,
          removeCartItem,
        } = value

        const decreaseCartQuantity = () => {
          decrementCartItemQuantity(id)
        }

        const increaseCartQuantity = () => {
          incrementCartItemQuantity(id)
        }

        const removeItem = () => {
          removeCartItem(id)
        }

        return (
          <li className="cartItemsList">
            <div className="leftdiv">
              <img className="cartFoodImage" src={dishImage} alt={dishName} />
              <div className="rightdiv">
                <h4 className="dishName">{dishName}</h4>
                <p className="foodDes">{foodDescription}</p>
              </div>
            </div>
            <div className="buttonDiv">
              <button type="button" onClick={decreaseCartQuantity}>
                -
              </button>
              <p>{foodQuantity}</p>
              <button type="button" onClick={increaseCartQuantity}>
                +
              </button>
            </div>
            <button type="button" onClick={removeItem}>
              Remove
            </button>
            <p>Rs {dishPrice * foodQuantity}</p>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItems
