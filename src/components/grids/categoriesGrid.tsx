import ImageInput from "@components/elements/images/image";
import useApp from "@data/hooks/UseApp"
import { api } from "@data/services/api"
import Link from '@components/elements/links/link'

export default function CategoriesGrid() {
    const { shop } = useApp();
    const categories = shop?.categories;

    return (
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {categories.map((item) => (
                <div key={item.id} className="group relative">
                    <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-10 bg-gray-100 dark:bg-warmGray-800">
                        {item?.imageUrl ? (
                            <div className="absolute inset-0">
                                <ImageInput src={item.imageUrl} alt={item.name} className="w-full h-full object-center object-cover group-hover:opacity-75" />
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-200 to-gray-500 mix-blend-multiply rounded-md" />
                                <div className="absolute bottom-0 w-full text-center text-xl font-semibold text-gray-100 mb-2">
                                    {item.name}
                                </div>
                            </div>
                        ) : (
                            <span className="h-full w-full rounded-md overflow-hidden bg-gray-100 dark:bg-warmGray-800 flex items-center justify-center" />
                        )}
                        <Link path="produtos" query={{ categoria: item.id }}>
                            <a />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}