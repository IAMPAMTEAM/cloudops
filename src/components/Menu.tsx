interface MenuAnim {
  title: string;
  logo: string;
}

interface MenuProps {
  title: string;
  menu: MenuAnim[];
}

function Menu({ title, menu }: MenuProps) {
  const mapedMenu = menu.map((menu, index) => {
    return (
      <button className='menu-item' key={index}>
        {menu.title}
        <div className='menu-item__icon-cont'>
          <img className='menu-item__icon' src={menu.logo} />
        </div>
      </button>
    );
  });

  return (
    <div className='menu-cont'>
      <div className='menu__title'>{title}</div>
      <div className='menu-cnt'>{mapedMenu}</div>
    </div>
  );
}

export default Menu;
