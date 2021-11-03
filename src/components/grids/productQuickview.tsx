import { useContext } from 'react'
import PrimaryButton from '@components/elements/buttons/primaryButton'
import Product from '@data/core/Product'
import { AddCartContext, CartContext } from '@data/contexts/CartContext'
import { api } from '@data/services/api'
import ImageInput from '@components/elements/images/image'


export default function ProductQuickview({ product, setOpen }) {
    const addItems = useContext(AddCartContext);
    const { setBagOpen } = useContext(CartContext);

    const handleClick = (item: Product) => {
        addItems(item);
    };

    return (
        <>
            <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8 p-6">
                <div className="aspect-w-1 aspect-h-1 lg:aspect-w-2 lg:aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                    {product?.imageUrl ? (
                        <div className="absolute inset-0">
                            <ImageInput src={product.imageUrl} alt={product.name} className="w-full h-full object-center object-cover group-hover:opacity-75" />
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-200 to-gray-500 mix-blend-multiply rounded-md" />
                        </div>
                    ) : (
                        <span className="w-full h-full object-center object-cover lg:w-full lg:h-full flex items-center justify-center" />
                    )}
                </div>
                <div className="h-full flex flex-col sm:col-span-8 lg:col-span-7">
                    <div className="space-y-4 flex-1">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-2xl">{product.name}</h1>
                        <p className="text-3xl">R$ {product.price}</p>
                        <p className="text-base">{product.desc}</p>
                    </div>
                    <PrimaryButton
                        className={"mt-6 w-full flex items-center justify-center text-base font-medium py-3 px-8"}
                        onClick={() => (handleClick(product), setOpen(false), setTimeout(function () { setBagOpen(true); }, 500))}
                    >
                        Adicionar ao carrinho
                    </PrimaryButton>
                </div>
            </div>
        </>
    )
}