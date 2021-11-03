import Shell from '@components/layout/shell'
import useApp from '@data/hooks/UseApp'
import { CheckCircleIcon } from '@heroicons/react/outline'

export default function Pagamento() {
    const { shop } = useApp()
    return (
        <Shell title="Pedido">
            <section className="my-12">
                <div className="sm:mt-0 rounded-md bg-white dark:bg-warmGray-900 text-gray-900 dark:text-gray-100">
                    <div className="py-12 text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                        </h2>
                        <div className="mt-4 flex justify-center text-th-accent-medium">
                            <CheckCircleIcon className="h-52 w-52" />
                        </div>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                            Pedido #{new Date().getTime()}
                        </p>
                        <div className="mt-4">
                            <p className=" text-xl">
                                Obrigado por comprar com a {shop?.name}
                            </p>
                            <p className="text-xl">
                                Fique tranquilo, já estamos preparando a entrega!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Shell>
    )
}