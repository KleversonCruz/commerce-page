import Contact from '@components/forms/contactForm'
import Shell from '@components/layout/shell'

export default function Loja() {
    return (
        <Shell title="Contato">
            <section className="my-12">
                <div className="pb-6 pl-6 relative flex items-baseline justify-between">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-th-accent-medium">Entre em contato</h1>
                    </div>
                </div>
                <Contact />
            </section>
        </Shell>
    )
}