import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MenuBar from '../MenuBar'
import FoodList from '../FoodList'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class WebPage extends Component {
  state = {
    cartList: [],
    isActive: 11,
    menuList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDataFromServer()
  }

  changeCategoryId = id => {
    this.setState({isActive: id})
  }

  retrunNull = () => {
    console.log('error 400')
    return null
  }

  getDataFromServer = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const response = await fetch(apiUrl)
    if (response.status === 400) {
      this.setState(
        {
          apiStatus: apiStatusConstants.failure,
        },
        this.retrunNull(),
      )
    }
    const data = await response.json()
    const updatedMenuList = data[0].table_menu_list.map(list => ({
      menuCategory: list.menu_category,
      menuCategoryId: list.menu_category_id,
    }))
    this.setState({
      cartList: data[0],
      menuList: updatedMenuList,
      isActive: updatedMenuList[0].menuCategoryId,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderSuccessView = () => {
    const {cartList, isActive, menuList} = this.state
    return (
      <div>
        <Header />
        <ul className="menubarList">
          {menuList.map(items => (
            <MenuBar
              items={items}
              key={items.menuCategoryId}
              isActive={isActive}
              changeCategoryId={this.changeCategoryId}
            />
          ))}
        </ul>
        <FoodList cartList={cartList} isActive={isActive} />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="Circles" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <h1>Error Loading Name</h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default WebPage
