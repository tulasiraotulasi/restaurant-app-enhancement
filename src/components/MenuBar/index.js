import './index.css'

const MenuBar = props => {
  const {isActive, changeCategoryId} = props
  const {items} = props
  const changecategory = () => {
    changeCategoryId(items.menuCategoryId)
  }
  return (
    <li className="menuBarListLi">
      <button
        type="button"
        onClick={changecategory}
        className={`menuButton ${
          isActive === items.menuCategoryId ? 'activeButton' : 'deactiveButton'
        }`}
      >
        {items.menuCategory}
      </button>
    </li>
  )
}

export default MenuBar
