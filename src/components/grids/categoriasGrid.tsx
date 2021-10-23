import Category from "@data/core/Category"
import useApp from "@data/hooks/UseApp"
import { api } from "@data/services/api"
import { PlusIcon } from "@heroicons/react/outline"
import Link from 'next/link'
import { useRouter } from "next/router"


export default function CategoriasGrid() {
    const { shop } = useApp();
    const categories = shop?.categories;
    const router = useRouter();

    return (
        <section className="mt-12">
            <h2 className="text-2xl font-semibold text-th-accent-medium">Categorias</h2>

            <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {categories.map((item) => (
                    <div key={item.id} className="group relative">
                        <div className="relative w-full h-80 rounded-md overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                            {item?.imageUrl ? (
                                <img
                                    src={`${api.defaults.baseURL}/images/${item.imageUrl}`}
                                    alt={item.name}
                                    className="w-full h-full object-center object-cover"
                                />
                            ) : (
                                <span className="h-full w-full rounded-md overflow-hidden bg-gray-100 dark:bg-warmGray-800 flex items-center justify-center" />
                            )}
                        </div>
                        <p className="mt-6 text-base font-semibold">
                            <Link
                                href={{
                                    pathname: `${shop.url}/produtos`,
                                    query: { categoria: item.id },
                                }}
                                passHref
                                shallow
                                replace
                            >
                                <a >
                                    <span className="absolute inset-0" />
                                    {item.name}
                                </a>
                            </Link>
                        </p>
                        <h3 className=" text-sm text-gray-500">
                            {item.desc}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    )
}