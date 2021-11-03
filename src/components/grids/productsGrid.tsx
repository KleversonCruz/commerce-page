import useApp from "@data/hooks/UseApp";
import { GetProducts } from "@data/services/productServices";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageInput from "@components/elements/images/image";
import ProductQuickview from "./productQuickview";
import FormModal from "@components/Overlays/formModal";
import Product from "@data/core/Product";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProductsGrid = ({ maxLength = undefined, lgGrid = false, initialCategory = null }) => {
    const router = useRouter();

    const [count, setCount] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [products, setProducts] = useState(null);
    const [isProductCardOpen, SetProductCardOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || null)
    const [filterName, setFilterName] = useState(null)
    const [selectedItem, setSelectectItem] = useState<Product>()

    const { shop } = useApp()

    useEffect(() => {
        async function fetchInitialData() {

            const res = await GetProducts({ shopId: shop.id, limit: 12, categoryId: selectedCategory, name: filterName }).then(response => {
                return response
            })
            setProducts(res?.items)
        }
        fetchInitialData()
    }, [setProducts, selectedCategory, filterName, shop.id])

    useEffect(() => {
        function InitialLoad() {
            setCount(2)
            setSelectedCategory(+router.query.categoria || null)
            setFilterName(router.query.busca || null)
            setHasMore(true)
        }
        InitialLoad()
    }, [router.query.categoria, router.query.busca])

    const fetchMoreData = async () => {
        if (products?.length >= maxLength) {
            setHasMore(false);
            return;
        }

        const res = await GetProducts({ shopId: shop.id, categoryId: selectedCategory, limit: 12, page: count, name: filterName }).then(response => {
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
                        <div
                            className={classNames(
                                lgGrid
                                    ? 'lg:grid-cols-5'
                                    : 'lg:grid-cols-4',
                                'grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-12'
                            )}
                        >
                            {products?.map((item) => (
                                <div key={item.id} className="group relative">
                                    <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 bg-gray-100 dark:bg-warmGray-800">
                                        {item?.imageUrl ? (
                                            <div className="absolute inset-0">
                                                <ImageInput src={item.imageUrl} alt={item.name} className="w-full h-full object-center object-cover group-hover:opacity-75" />
                                                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-200 to-gray-500 mix-blend-multiply rounded-md" />
                                            </div>
                                        ) : (
                                            <span className="w-full h-full object-center object-cover lg:w-full lg:h-full flex items-center justify-center" />
                                        )}
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="mt-4 text-sm">
                                                <button onClick={() => { setSelectectItem(item), SetProductCardOpen(true) }}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {item.name}
                                                </button>
                                            </h3>
                                            <p className="mt-1 text-lg font-medium">R$ {item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>

                <FormModal open={isProductCardOpen} setOpen={SetProductCardOpen}>
                    <ProductQuickview product={selectedItem} setOpen={SetProductCardOpen} />
                </FormModal>

            </>
        );
    }
    else {
        return (
            <>
                <div className="lg:col-span-3">
                    <p className="text-center">
                        Nenhum resultado
                    </p>
                </div>
            </>
        )
    }
};


export default ProductsGrid;