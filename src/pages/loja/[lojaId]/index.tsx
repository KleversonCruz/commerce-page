import Shell from '@components/layout/shell'
import ProductsGrid from "@components/grids/productsGrid"
import CategoriesGrid from '@components/grids/categoriesGrid'
import { ArrowRightIcon } from '@heroicons/react/outline'
import Hero from '@components/heroes/hero'
import Link from '@components/elements/links/link'
import useApp from '@data/hooks/UseApp'

export default function Loja() {
    const { shop } = useApp();

    return (
        <Shell title="Início">
            {shop?.imageUrl ? (
                <section>
                    <Hero
                        title={`Bem vindo à ${shop?.name}`}
                        text={shop?.desc}
                        imageUrl={shop?.imageUrl}
                        callActionText="Descubra agora!"
                        lgHero
                    />
                </section>) : null}
            <section className="mt-12">
                <div className="pb-6 relative flex items-baseline justify-between">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-th-accent-medium">Categorias</h1>
                    </div>
                    <Link path="produtos">
                        <a className="text-th-accent-medium hover:text-th-accent-light">
                            <div className="flex items-center">
                                <div className=" text-sm font-medium">
                                    Todas as categorias
                                </div>
                                <div className="flex items-center">
                                    <ArrowRightIcon className="ml-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>

                <CategoriesGrid />
            </section>



            <section className="my-12">
                <div className="pb-6 relative flex items-baseline justify-between">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-th-accent-medium">Produtos</h1>
                    </div>

                    <Link path="produtos">
                        <a className="text-th-accent-medium hover:text-th-accent-light">
                            <div className="flex items-center">
                                <div className=" text-sm font-medium">
                                    Todos os produtos
                                </div>
                                <div className="flex items-center">
                                    <ArrowRightIcon className="ml-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
                <ProductsGrid maxLength={12} />
            </section>
        </Shell >
    )
}