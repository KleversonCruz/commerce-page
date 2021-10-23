import useApp from "@data/hooks/UseApp";
import { api } from "@data/services/api";
import { GetProducts } from "@data/services/productServices";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from 'next/link'

const InfinityScroll = ({ maxLength = undefined }) => {
    const router = useRouter();

    const [count, setCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [products, setProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(0)

    const { shop } = useApp()

    useEffect(() => {
        async function fetchInitialData() {
            const res = await GetProducts({ shopId: shop.id, limit: 12, categoryId: selectedCategory }).then(response => {
                return response
            })
            setProducts(res?.items)
        }
        fetchInitialData()
    }, [setProducts, selectedCategory, shop.id])

    useEffect(() => {
        function InitialLoad() {
            setCount(2)
            setSelectedCategory(+router.query.categoria || 0)
            setHasMore(true)
        }
        InitialLoad()
    }, [router.query.categoria])

    const fetchMoreData = async () => {
        if (products?.length >= maxLength) {
            setHasMore(false);
            return;
        }

        const res = await GetProducts({ shopId: shop.id, categoryId: selectedCategory, limit: 12, page: count }).then(response => {
            return response
        })

        setCount(res.currentPage + 1)

        if (res.items?.length == 0) {
            setHasMore(false);
            return;
        }

        setProducts((data) => [...data, ...res?.items]);
    };

    if (products?.length > 0) {
        return (
            <>
                <div className="lg:col-span-3">
                    <InfiniteScroll
                        dataLength={products?.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h3></h3>}
                    >
                        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products?.map((item) => (
                                <div key={item.id} className="group relative">
                                    <div className="w-full min-h-48 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-48 lg:aspect-none bg-gray-100 dark:bg-warmGray-800">
                                        {item?.imageUrl ? (
                                            <img
                                                src={`${api.defaults.baseURL}/images/${item.imageUrl}`}
                                                alt={item.name}
                                                className="w-full h-full object-center object-center lg:w-full lg:h-full"
                                            />
                                        ) : (
                                            <span className="w-full h-full object-center object-cover lg:w-full lg:h-full flex items-center justify-center" />
                                        )}
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                        <p className="text-sm font-medium">R$ {item.price}</p>
                                            <h3 className="text-sm ">
                                                <Link
                                                    href={`/loja/${router.query.lojaId}/produto/${item.id}`}
                                                    shallow
                                                    key={item.id}
                                                >
                                                    <a>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            </h3>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <div className="lg:col-span-3">
                    <div className="h-screen" />
                </div>
            </>
        )
    }
};


export default InfinityScroll;