import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { FilterIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import InfinityScroll from '@components/grids/infinityScroll'
import { GetCategories } from '@data/services/categoryServices'
import Link from 'next/link'
import useApp from '@data/hooks/UseApp'


export default function Filter() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [categories, setCategories] = useState(null);
    const router = useRouter()
    const { shop } = useApp()


    useEffect(() => {
        async function loadCategories() {
            const res = await GetCategories({ shopId: shop.id, limit: 50 }).then(response => {
                return response
            })
            setCategories(res.items)
        }
        loadCategories()
    }, [shop.id])

    return (
        <div>
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                                    {categories?.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.name} className="block px-2 py-3">
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </form>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <div className="relative flex items-baseline justify-between pb-6 border-b border-gray-300 dark:border-warmGray-700">
                <h1 className="text-2xl font-semibold tracking-tight text-th-accent-medium">Produtos</h1>

                <div className="flex items-center">
                    <button
                        type="button"
                        className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <span className="sr-only">Filters</span>
                        <FilterIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
                <h2 id="products-heading" className="sr-only">
                    Products
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {/* Filters */}
                    <div className="hidden lg:block">
                        <h3 className="sr-only">Categories</h3>
                        <ul role="list" className="text-sm font-medium space-y-4 pb-6">
                            <Link
                                href={{
                                    pathname: router.pathname,
                                    query: { ...router.query, categoria: 0 },
                                }}
                                passHref
                                shallow
                                replace
                            >
                                <a>Todas categorias</a>
                            </Link>
                            {categories?.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={{
                                            pathname: router.pathname,
                                            query: { ...router.query, categoria: category.id },
                                        }}
                                        passHref
                                        shallow
                                        replace
                                    >
                                        <a>{category.name}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <InfinityScroll />
                </div>
            </section>
        </div>
    )
}
