import {withRouter, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const [restName, updateRestName] = useState('')
  // const [apiStatus, updateApiStatus] = useState(apiStatusConstants.initial)

  const getDataFromServer = async () => {
    // updateApiStatus(apiStatusConstants.inProgress)
    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const response = await fetch(apiUrl)
    const data = await response.json()
    updateRestName(data[0].restaurant_name)
    // updateApiStatus(apiStatusConstants.success)
  }

  useEffect(() => {
    getDataFromServer()
  })

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const onCartRoute = () => {
          const {history} = props
          history.push('/cart')
        }

        return (
          <div className="header">
            <h1>
              <Link to="/" className="restName">
                {restName}
              </Link>
            </h1>
            <div className="headerInner">
              <button type="button" className="orderBtn" onClick={onCartRoute}>
                My Orders
                <AiOutlineShoppingCart className="icons" data-testid="cart" />
              </button>
              <p>{cartList.length}</p>
            </div>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
// {apiStatus === apiStatusConstants.inProgress && renderLoadingView()}
// {apiStatus === apiStatusConstants.success && renderSuccessView()}
// {apiStatus === apiStatusConstants.failure && renderFailureView()}

//

// if(apiStatus===apiStatusConstants.inProgress){
//   return renderLoadingView()
//   }else if(apiStatus===apiStatusConstants.success){
//     return renderSuccessView()
//   }else if(apiStatus===apiStatusConstants.failure){
//     return renderFailureView()
//   }else{
//     return null
//   }
// }
