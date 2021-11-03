import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { LoginIcon, MenuIcon, ShoppingBagIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import useApp from '@data/hooks/UseApp'
import Link from 'next/link'
import Brand from '@components/layout/brand'
import useAuth from '@data/hooks/UseAppAuth'
import { CartContext } from '@data/contexts/CartContext'
import { useTheme } from 'next-themes'
import FormModal from '@components/Overlays/formModal'
import SignInForm from '@components/forms/signInForm'

export default function Navbar() {
    const [isSignInCardOpen, setSignInCardOpen] = useState(false)
    const { shop } = useApp()
    const { isAuthenticated, signOut } = useAuth()
    const { setTheme } = useTheme();
    const { items, setBagOpen } = useContext(CartContext);

    useEffect(() => {
        setTheme(shop?.colorTheme)
    }, [shop, setTheme]);

    const navigation = [
        {
            name: 'Loja',
            href: `${shop.url}`
        },
        {
            name: 'Produtos',
            href: `${shop.url}/produtos`
        },
        {
            name: 'Contato',
            href: `${shop.url}/contato`
        },
    ]

    return (
        <>
            <Disclosure as="nav" className="bg-white dark:bg-warmGray-800 text-gray-900 dark:text-gray-100 top-0 z-10 fixed w-full shadow">
                {({ open }) => (
                    <>
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                            <div className="relative flex items-center justify-between h-16">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-th-accent-medium hover:text-th-accent-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Brand />
                                    </div>
                                    <div className="hidden sm:block sm:ml-6">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                >
                                                    <a className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-warmGray-900 hover:text-th-accent-medium">
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="p-1 rounded-full text-gray-400 hover:text-th-accent-medium focus:outline-none flex items-center"
                                        onClick={() => setBagOpen(true)}
                                    >
                                        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                                        <span className="ml-2 text-sm font-medium text-th-accent-medium">{items.length}</span>
                                    </button>

                                    {!isAuthenticated ? (
                                        <button
                                            className="ml-3 p-1 rounded-full text-gray-400 hover:text-th-accent-medium focus:outline-none"
                                            onClick={() => setSignInCardOpen(true)}
                                        >
                                            <LoginIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    ) : (
                                        <Menu as="div" className="relative">
                                            {({ open }) => (
                                                <>
                                                    <div>
                                                        <Menu.Button className="ml-3 p-1 rounded-full text-gray-400 hover:text-th-accent-medium focus:outline-none">
                                                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items
                                                            static
                                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-100 dark:bg-warmGray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                        >
                                                            <Menu.Item>
                                                                <a className="hover:bg-gray-200 dark:hover:bg-warmGray-900 block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer"
                                                                >
                                                                    Conta
                                                                </a>
                                                            </Menu.Item>

                                                            <Menu.Item>
                                                                <a className="hover:bg-gray-200 dark:hover:bg-warmGray-900 block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer"
                                                                    onClick={() => signOut()}>
                                                                    Sair
                                                                </a>
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </>
                                            )}
                                        </Menu>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                    >
                                        <a
                                            className="hover:bg-gray-200 dark:hover:bg-warmGray-900 hover:text-th-accent-medium block px-3 py-2 rounded-md text-base font-medium">
                                            {item.name}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <FormModal open={isSignInCardOpen} setOpen={setSignInCardOpen}>
                <SignInForm setOpen={setSignInCardOpen} />
            </FormModal>
        </>
    )
}
