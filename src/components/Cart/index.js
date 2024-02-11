import CartItems from '../CartItems'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const removeCartItems = () => {
        removeAllCartItems()
      }

      console.log(cartList)
      return (
        <>
          <Header />
          <div className="cart-empty-view-container">
            {cartList.length === 0 && (
              <>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  className="cart-empty-img"
                  alt="cart empty"
                />
                <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
              </>
            )}
            {cartList.length > 0 && (
              <>
                <div className="removeBtn">
                  <button type="button" onClick={removeCartItems}>
                    Remove All
                  </button>
                </div>
                <ul className="cartDiv">
                  {cartList.map(items => (
                    <CartItems items={items} key={items.id} />
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
