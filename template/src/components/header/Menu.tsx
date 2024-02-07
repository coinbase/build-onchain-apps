import Navbar from './Navbar';
import NavbarMobile from './NavbarMobile';

function Menu() {
  return (
    <>
      <div className="fixed z-10 h-[72px] md:hidden">
        <NavbarMobile />
      </div>
      <div className="container fixed z-10 hidden h-[72px] md:block">
        <Navbar />
      </div>
    </>
  );
}

export default Menu;
