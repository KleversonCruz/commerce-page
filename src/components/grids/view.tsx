import PrimaryButton from '@components/elements/buttons/primaryButton'
import { AddCartContext } from '@data/contexts/CartContext';
import CartItem from '@data/core/CartItem';
import Product from '@data/core/Product';
import useApp from '@data/hooks/UseApp';
import { api } from '@data/services/api';
import { GetProductById } from '@data/services/productServices';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function View() {
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const { register, handleSubmit, setValue } = useForm()
    const { shop } = useApp()

    // const id = props.product?.id

    // setValue('id', id);
    // setValue('name', props.product.name);
    // setValue('desc', props.product.desc);
    // setValue('price', props.product.price);
    // setValue('isActive', props.product.isActive);
    // setValue('categoryId', props.product.categoryId);
    // setValue('imageUrl', props.product.imageUrl);

    useEffect(() => {
        async function fetchInitialData() {
            const res = await GetProductById({ productId: router.query.produtoId || 0 }).then(response => {
                return response
            })
            setProduct(res)
        }
        fetchInitialData()
    }, [setProduct, router.query.produtoId])

    const addItems = useContext(AddCartContext);

    const handleClick = (item: Product) => {
        addItems(item);
    };

    if (product && product.shopId == shop.id) {
        return (
            <div>
                <section className="mt-12 h-screen">
                    <div className="lg:grid lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">

                        <div className="lg:col-span-2 lg:border-r  lg:pr-8 lg:border-gray-300 lg:dark:border-warmGray-700">
                            {product?.imageUrl ? (
                                <img
                                    src={`${api.defaults.baseURL}/images/${product.imageUrl}`}
                                    alt={product.name}
                                    className="w-full h-full object-center object-cover rounded-md"
                                />
                            ) : (
                                null
                            )}
                        </div>

                        <div className="mt-4 lg:mt-0 lg:row-span-3 lg:col-span-2">
                            <div className="space-y-4">
                                <h1 className="text-2xl font-bold tracking-tight sm:text-2xl">{product.name}</h1>
                                <p className="text-3xl">R$ {product.price}</p>
                                <p className="text-base">{product.desc}</p>
                            </div>

                            <PrimaryButton
                                className={"mt-10 w-full flex items-center justify-center text-base font-medium py-3 px-8"}
                                onClick={() => handleClick(product)}
                            >
                                Comprar
                            </PrimaryButton>
                        </div>
                    </div>
                </section>
            </div>
        )
    } else {
        return (
            <div className="h-screen" />
        )
    }
}
