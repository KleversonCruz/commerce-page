import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PrimaryButton from '@components/elements/buttons/primaryButton'
import { AddCartContext, CartContext } from '@data/contexts/CartContext'
import CartItems from '@components/shoppingCart/cartItems'
import { XIcon } from '@heroicons/react/outline'
import Link from '@components/elements/links/link'

export default function ShoppingCartModal() {
    const { items, isBagOpen, setBagOpen, cartTotal } = useContext(CartContext);
    const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

    const addItems = useContext(AddCartContext);
    useEffect(() => {
        let prev_items = JSON.parse(localStorage.getItem('cart')) || [];
        if (items.length == 0) {
            addItems(prev_items)
        }
        setIsInitiallyFetched(true)
    }, [])


    useEffect(() => {
        if (isInitiallyFetched) {
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }, [items]);

    return (
        <Transition.Root show={isBagOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-hidden" onClose={setBagOpen}>
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
                                <div className="z-50 h-full flex flex-col shadow-xl bg-white dark:bg-warmGray-800 text-gray-900 dark:text-gray-100" >
                                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium">Carrinho</Dialog.Title>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={() => setBagOpen(false)}
                                                    tabIndex={-1}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <CartItems />
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-300 dark:border-warmGray-700 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium">
                                            <p>Subtotal</p>
                                            <p>{cartTotal}</p>
                                        </div>
                                        <div className="mt-6">
                                            <Link path='pagamento'>
                                                <a href="">
                                                    <PrimaryButton
                                                        className={"w-full justify-center items-center px-6 py-3 shadow-sm text-base font-medium"}
                                                    >
                                                        Finalizar
                                                    </PrimaryButton>
                                                </a>
                                            </Link>
                                        </div>
                                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                            <p>
                                                ou{' '}
                                                <button
                                                    type="button"
                                                    className="text-th-accent-medium font-medium hover:text-th-accent-dark"
                                                    onClick={() => setBagOpen(false)}
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
