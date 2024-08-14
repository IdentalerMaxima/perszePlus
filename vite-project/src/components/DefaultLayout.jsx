import { Fragment, useEffect, useState } from 'react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import { Menu, Transition, Disclosure, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import Pusher from 'pusher-js';
import { useRef } from 'react';

export default function DefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken, isAdmin } = useStateContext();
  const { selectedMessageId, setSelectedMessageId, messages, setMessages } = useStateContext();

  const [avatarPath, setAvatarPath] = useState(currentUser.avatar_path || '');
  const [unreadMessages, setUnreadMessages] = useState(0);

  const pusherRef = useRef(null);

  const navigate = useNavigate();

  const trimMessage = (message, maxLength) => {
    if (message.length > maxLength) {
      return `${message.slice(0, maxLength)}...`;
    }
    return message;
  };

  const userNavigation = [
    { name: 'Your Profile', to: '/profile' },
  ];
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  useEffect(() => {
    const getMessagesOfUser = async () => {
      if (userToken) {
        try {
          const response = await axiosClient.get('/messages', {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
  
    getMessagesOfUser();
  }, [userToken, selectedMessageId]); // The effect runs only when userToken is set or selectedMessageId changes
  
  

  useEffect(() => {
    if (!pusherRef.current) {
      pusherRef.current = new Pusher('802a39c17b905cc66240', {
        cluster: 'eu',
        encrypted: true,
      });
    }

    const channel = pusherRef.current.subscribe(`user.${currentUser.id}`);
    channel.bind('message.sent', function (data) {
      setMessages((prevMessages) => [data.message, ...prevMessages.slice(0, 4)]);
      setUnreadMessages((prevCount) => prevCount + 1);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [currentUser.id]);


  useEffect(() => {
    setAvatarPath(currentUser.avatar_path || '');
  }, [currentUser]);

  useEffect(() => {
    if (!userToken) {
      setUserToken(null);
      navigate('/login');
    }
  }, [userToken]);

  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout')
      .then(() => {
        setCurrentUser({});
        setUserToken(null);
      });
  };

  const handleMessageClick = async (messageId) => {
    setSelectedMessageId(messageId);
    try {
      await axiosClient.put(`/messages/${messageId}/read`);

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId ? { ...message, read: true } : message
        )
      );


      navigate('/messages');
    } catch (error) {
      console.error('Failed to mark message as read', error);
    }
  };

  const navigation = [
    { name: 'Főoldal', to: '/' },
    { name: 'Hírek', to: '/news' },
    { name: 'Naptár', to: '/calendar' },
    { name: 'Kurzusok', to: '/courses' },
    { name: 'Jelenléti', to: '/attendance' },
    { name: 'Tagok', to: '/members' },
    { name: 'Statisztikák', to: '/stats' },
    { name: 'Üzenetek', to: '/messages' },
  ];

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) => classNames(
                              isActive
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Notification button */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <div className="relative">
                              <BellIcon className="h-6 w-6" aria-hidden="true" />
                              {unreadMessages > 0 && (
                                <span className="absolute top-0 right-0 inline-flex h-3 w-3 items-center justify-center rounded-full text-white text-xs font-bold bg-gray-800">
                                  {unreadMessages}
                                </span>
                              )}
                            </div>
                          </MenuButton>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-y-auto">
                            {messages && messages.length === 0 ? (
                              <div className="px-4 py-2 text-sm text-gray-700">No messages</div>
                            ) : (
                              messages?.map((message) => (
                                <ListItemButton
                                  key={message.id}
                                  className="flex items-start p-4 border-b border-gray-200"
                                  onClick={() => handleMessageClick(message.id)}
                                >
                                  <Avatar src={message.senderAvatar} alt={message.senderName} />
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{message.senderName}</div>
                                    <div className={`text-sm text-gray-500 truncate ${!message.read ? 'font-bold' : ''}`} style={{ maxWidth: '200px' }}>
                                      {trimMessage(message.message, 50)}
                                    </div>
                                  </div>
                                </ListItemButton>
                              ))
                            )}
                          </MenuItems>
                        </Transition>
                      </Menu>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full overflow-hidden">
                                <img className="h-full w-full object-cover" src={avatarPath || "../../src/assets/defaultAvatar.PNG"} alt="" />
                              </div>
                            </div>
                          </MenuButton>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.to}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </MenuItem>
                            ))}

                            {/* Render Admin menu item if the user is an admin */}
                            {isAdmin && (
                              <MenuItem>
                              {({ active }) => (
                                <Link
                                  to={'/admin'}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {'Admin Dashboard'}
                                </Link>
                              )}
                            </MenuItem>
                            )}

                            <MenuItem>
                              <button
                                onClick={(ev) => logout(ev)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Sign out
                              </button>
                            </MenuItem>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Menu as="div">
                      <div className="relative ml-auto flex items-center">
                        <MenuButton
                          type="button"
                          className="absolute top-1 right-3 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <div className="relative">
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                            {unreadMessages > 0 && (
                              <span className="absolute top-0 right-0 inline-flex h-3 w-3 items-center justify-center rounded-full text-white text-xs font-bold bg-gray-800">
                                {unreadMessages}
                              </span>
                            )}
                          </div>
                        </MenuButton>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-4 top-11 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-y-auto">
                          {messages.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-gray-700">No messages</div>
                          ) : (
                            messages.map((message) => (
                              <ListItemButton
                                key={message.id}
                                className="flex items-start p-4 border-b border-gray-200"
                                onClick={() => handleMessageClick(message.id)}
                              >
                                <Avatar src={message.senderAvatar} alt={message.senderName} />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{message.senderName}</div>
                                  <div className={`text-sm text-gray-500 truncate ${!message.read ? 'font-bold' : ''}`} style={{ maxWidth: '200px' }}>
                                    {trimMessage(message.message, 50)}
                                  </div>
                                </div>
                              </ListItemButton>
                            ))
                          )}
                        </MenuItems>
                      </Transition>
                    </Menu>
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>

                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({ isActive }) => classNames(
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <div className="relative">
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                        {unreadMessages > 0 && (
                          <span className="absolute top-0 right-0 inline-flex h-3 w-3 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-bold">
                            {unreadMessages}
                          </span>
                        )}
                      </div>
                    </button>
                  </div>

                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </NavLink>
                    ))}

                    <Disclosure.Button
                      as="a"
                      href="#"
                      onClick={(ev) => logout(ev)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="bg-slate-300 min-h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
}
