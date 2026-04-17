import NavbarItem from './NavbarItem';
import IconBook from '../icons/IconBook';
import IconBag from '../icons/IconBag';
import IconCompas from '../icons/IconCompas';
import IconProfile from '../icons/IconProfile';

export default function Navbar() {
  return (
    <div className='fixed z-20 w-full sm:w-fit px-2 mt-5 text-text pointer-events-auto'>
      <div className='relative py-2 px-2 flex gap-2 justify-center w-full overflow-hidden rounded-full'>
        <div className='absolute inset-0 z-0 backdrop-blur-sm bg-section-50'></div>

        <div className='relative z-10 flex gap-2 justify-between w-full'>
          <NavbarItem icon={<IconBook />} text="Collection" link='/collection' />
          <NavbarItem icon={<IconBag />} text="Shopping List" link='/shopping-list' />
          <NavbarItem icon={<IconCompas />} text="Explore" link='/explore' />
          <NavbarItem icon={<IconProfile />} text="Profile" link='/profile' />
        </div>
      </div>
    </div>
  );
}
