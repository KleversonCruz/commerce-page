import CheckoutForm from '@components/forms/checkoutForm'
import Shell from '@components/layout/shell'

export default function Pagamento() {
    return (
        <Shell title="Pagamento">
            <section className="my-12">
                <div className="pb-6 pl-6 relative flex items-baseline justify-between">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-th-accent-medium">Pagamento</h1>
                    </div>
                </div>
                <CheckoutForm />
            </section>
        </Shell>
    )
}