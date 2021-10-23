import Shell from '@components/layout/shell'
import ImageHero from "@components/heros/imageHero"
import InfinityScroll from "@components/grids/infinityScroll"
import CategoriasGrid from '@components/grids/categoriasGrid'

export default function Loja() {
    return (
        <Shell title="Início">
            <CategoriasGrid/>
            <section className="mt-12">
                <h2 className="pb-6 text-2xl font-semibold text-th-accent-medium">Produtos</h2>
                <InfinityScroll maxLength={24} />
            </section>
        </Shell>
    )
}