import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon, XIcon } from '@heroicons/react/outline'
import PrimaryButton from '@components/elements/buttons/primaryButton'
import { AddCartContext, CartContext, RemoveCartContext } from '@data/contexts/CartContext'
import ImageInput from '@components/elements/images/image'

export default function CartItems() {
    const { items, isBagOpen, setBagOpen } = useContext(CartContext);
    const removeItem = useContext(RemoveCartContext);
    const [cartTotal, setCartTotal] = useState(0);
    const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

    return (
        <>
            <div className="flow-root">
                <ul role="list" className="-my-6">
                    {items.map((product, index) => (
                        <li key={index} className="py-6 flex">
                            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 dark:bg-warmGray-800">
                                {product?.imageUrl ? (
                                    <ImageInput src={product.imageUrl} alt={product.name} className="w-full h-full object-center object-cover" />
                                ) : (
                                    <span className="w-16 h-16 object-center object-cover flex items-center justify-center" />
                                )}
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                    <div className="flex justify-between text-xs font-medium">
                                        <h3>
                                            {product.name}
                                        </h3>
                                        <p className="ml-4 whitespace-nowrap">R$ {product.price}</p>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-end justify-end text-sm">
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="font-medium text-gray-500 hover:text-th-accent-dark"
                                            onClick={() => removeItem(index)}
                                            tabIndex={-1}
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
