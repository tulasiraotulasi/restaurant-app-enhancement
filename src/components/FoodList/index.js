import {BiFoodTag} from 'react-icons/bi'
import FoodButton from '../FoodButton'
import './index.css'

const FoodList = props => {
  const {cartList, isActive} = props
  let displayDishes = []
  for (let i = 0; i < cartList.table_menu_list.length; i += 1) {
    if (cartList.table_menu_list[i].menu_category_id === isActive) {
      displayDishes = cartList.table_menu_list[i].category_dishes
    }
  }
  return (
    <ul className="foodItems">
      {displayDishes.map(foods => (
        <li key={foods.dish_id} className="foodListMain">
          <div className="divLeft">
            <BiFoodTag className={foods.dish_Type === 1 ? 'nonVeg' : 'veg'} />
            <div>
              <h1>{foods.dish_name}</h1>
              <p>
                {foods.dish_currency} {foods.dish_price}
              </p>
              <p>{foods.dish_description}</p>
              {foods.dish_Availability ? (
                <>
                  <FoodButton id={foods.dish_id} foods={foods} />
                  <p className="custom">
                    {foods.addonCat.length > 0
                      ? 'Customizations available'
                      : ''}
                  </p>
                </>
              ) : (
                <p className="notavaialbe">Not Available</p>
              )}
            </div>
          </div>
          <div className="divRight">
            <p className="calories">{foods.dish_calories} calories</p>
            <div>
              <img
                className="foodImage"
                src={foods.dish_image}
                alt="foodImage"
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default FoodList
