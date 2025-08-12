//import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateRoutes, Roles } from '../../models';
import useLogout from '../Logout/Logout';
import { getRoleRoute } from '../../utilities';
import { useAppSelector } from '../../redux/hooks';


type MenuItem = {
  name: string;
  description?: string;
  path?: string;
  links?: { label: string; path: string; }[];
};

const menuItems: MenuItem[] = [
  {
    name: 'Ingresos',
    links: [
      { label: 'Engagement', path: '/admin/1' },
      { label: 'Security', path: '/admin/2' },
      { label: 'Integrations', path: '/admin/3' },
      { label: 'Automations', path: '/admin/4' },
    ],
  },
  {
    name: 'Item 2',
    links: [
      { label: 'Link 3', path: '/link3' },
      { label: 'Link 4', path: '/link4' },
    ],
  },


  {
    name: 'Configuraciones',
    links: [
      { label: 'Link 5', path: '/link5' },
      { label: 'Link 6', path: '/link6' },
    ],
  },
  {
    name: 'Perfil',
    links: [
      { label: 'Perfil', path: PrivateRoutes.PERFIL },
      { label: 'Cerrar sesión', path: PrivateRoutes.LOGOUT }, // Aquí sigue usando el icono solo como referencia visual
    ],
  },
];

const DropdownMenu: React.FC = () => {
   const user = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const logOut = useLogout(); // Obtén la función de logout

  const roleRoute = getRoleRoute(user.role as Roles);


  const toggleMenu = () => setIsOpen(!isOpen);
  const handleItemClick = (item: string) => setActiveItem(item === activeItem ? null : item);
  const handleLinkClick = (path: string) => {
    if (path === PrivateRoutes.LOGOUT) {
      logOut(); 
    } else {
      setIsOpen(false);
      setActiveItem(null);
    }
  };



  return (
<>
      <div>
        <div>
          <div></div>
        </div>
        <div>
          <div className={`absolute top-16 right-0 mt-2 rounded-md ${isOpen ? 'hidden' : 'hidden'} md:static md:flex md:flex-row md:w-auto md:items-center md:justify-center`}>
            
            <Link to={roleRoute} replace className="px-2 py-2 rounded-md mr-2 bg-gray-100 bg-opacity-80 hover:bg-cyan-300 hover:bg-opacity-75 text-black cursor-pointer hover:rounded-full focus:outline-none hover:animate-wiggle">
              INICIO
            </Link>
            <ul className="flex flex-col md:flex-row">
              {menuItems.map((item) => (
                (item.name !== 'Configuraciones' || user.role === Roles.ADMIN) && (
                  <li key={item.name} className="group relative mr-3">
                    <button
                      onClick={() => handleItemClick(item.name)}
                      className="px-2 py-2 bg-gray-100 bg-opacity-80 hover:bg-cyan-300 hover:bg-opacity-75 text-black cursor-pointer hover:rounded-full focus:outline-none hover:animate-wiggle"
                    >
                      {item.name}
                    </button>
                    {/* Submenú en un dropdown vertical */}
                    {activeItem === item.name && (
                      <ul className="flex flex-col bg-gray-50 absolute top-full left-0 mt-1 shadow-lg rounded-md w-48">
                        {item.links?.map((link) => (
                          <li key={link.path}>
                            <Link
                              to={link.path}
                              className="block px-4 py-2 bg-gray-100 bg-opacity-80 hover:bg-gray-200 hover:bg-opacity-75 text-gray-700"
                              onClick={() => handleLinkClick(link.path)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              ))}
            </ul>
          </div>
          {/* Mobile menu */}
          {isOpen && (
            <div className="fixed top-11 right-0 z-50 bg-yellow-50 shadow-lg border border-gray-500 rounded-md md:hidden w-64">
              <ul className="flex flex-col p-4">
                {menuItems.map((item) => (
                  (item.name !== 'Configuraciones' || user.role === Roles.ADMIN) && (
                    <li key={item.name} className="group relative mb-1">
                      <button
                        onClick={() => handleItemClick(item.name)}
                        className="px-2 py-2 bg-cyan-700 bg-opacity-80 hover:bg-cyan-500 hover:bg-opacity-75 text-left text-black cursor-pointer focus:outline-none hover:animate-wiggle"
                      >
                        {item.name}
                      </button>
                      {/* Submenú en un dropdown vertical */}
                      {activeItem === item.name && (
                        <ul className="flex flex-col bg-gray-50 mt-1 shadow-lg rounded-md">
                          {item.links?.map((link) => (
                            <li key={link.path}>
                              <Link
                                to={link.path}
                                className="block px-4 py-2 bg-gray-100 bg-opacity-80 hover:bg-gray-200 hover:bg-opacity-75 text-gray-700"
                                onClick={() => handleLinkClick(link.path)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="h-20 w-full col-span-1 flex justify-center items-center">
          <button
            onClick={toggleMenu}
            className="bg-blue-600 text-white px-4 py-2 rounded-md md:hidden"
          >
            Menu
          </button>
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
