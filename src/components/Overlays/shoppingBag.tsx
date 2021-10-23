import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import PrimaryButton from '@components/elements/buttons/primaryButton'
import { AddCartContext, CartContext, RemoveCartContext } from '@data/contexts/CartContext'
import { api } from '@data/services/api'
import useApp from '@data/hooks/UseApp'



export default function ShoppingBag({ open, setOpen }) {
    const items = useContext(CartContext);
    const removeItem = useContext(RemoveCartContext);
    const [cartTotal, setCartTotal] = useState(0);
    const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);
    const { shop } = useApp()

    const addItems = useContext(AddCartContext);
    useEffect(() => {
        let prev_items = JSON.parse(localStorage.getItem('cart')) || [];
        if (items.length == 0) {
            addItems(prev_items)
        }
        setCartTotal(items.reduce((acc, item) => acc + item.price, 0));
        setIsInitiallyFetched(true)
    }, [])


    useEffect(() => {
        if (isInitiallyFetched) {
            localStorage.setItem("cart", JSON.stringify(items));
            setCartTotal(items.reduce((acc, item) => acc + item.price, 0));
        }
    }, [items]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-warmGray-700 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-md">
                                <div className="z-50 h-full flex flex-col shadow-xl overflow-y-scroll bg-gray-100 dark:bg-warmGray-800 text-gray-900 dark:text-gray-100" >
                                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium">Shopping cart</Dialog.Title>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={() => setOpen(false)}
                                                    tabIndex={-1}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-300 dark:divide-warmGray-700">
                                                    {items.map((product, index) => (
                                                        <li key={index} className="py-6 flex">
                                                            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                                                                <img
                                                                    src={`${api.defaults.baseURL}/images/${product.imageUrl}`}
                                                                    alt={product.name}
                                                                    className="w-full h-full object-center object-cover"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex-1 flex flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium">
                                                                        <h3>
                                                                            <a href={`${shop.url}/produto/${product.id}`}>{product.name}</a>
                                                                        </h3>
                                                                        <p className="ml-4">R$ {product.price}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 flex items-end justify-end text-sm">
                                                                    <div className="flex">
                                                                        <button 
                                                                            type="button" 
                                                                            className="font-medium text-th-accent-medium hover:text-th-accent-dark"
                                                                            onClick={() => removeItem(index)}
                                                                            >
                                                                            Remover
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-300 dark:border-warmGray-700 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium">
                                            <p>Total</p>
                                            <p>{cartTotal}</p>
                                        </div>
                                        <div className="mt-6">
                                            <PrimaryButton className={"w-full justify-center items-center px-6 py-3 shadow-sm text-base font-medium"}>
                                                Finalizar
                                            </PrimaryButton>
                                        </div>
                                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                            <p>
                                                ou{' '}
                                                <button
                                                    type="button"
                                                    className="text-th-accent-medium font-medium hover:text-th-accent-dark"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    continuar comprando<span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
