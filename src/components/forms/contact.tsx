import PrimaryButton from '@components/elements/buttons/primaryButton'
import FormGroup from '@components/elements/inputs/formGroup';
import useApp from '@data/hooks/UseApp';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const { register, handleSubmit } = useForm()
  const { shop } = useApp()

  async function handleSignIn(data) {
  }

  return (
    <div>
      <section className="mt-12 h-screen">
        <div className="lg:grid lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">

          <div className="lg:col-span-2 lg:border-r lg:pr-8">

          </div>

          <div className="mt-4 lg:mt-0 lg:row-span-3 lg:col-span-2">
            <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>

              <div className="mt-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <FormGroup register={register} id="FirstName" label="Nome" required />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <FormGroup register={register} id="lastName" label="Sobrenome" required />
                </div>
              </div>

              <div className="space-y-1">
                <FormGroup register={register} id="email" placeholder="Email" label="Email" required type="email" />
              </div>

              <div className="mt-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <FormGroup register={register} id="password" label="Senha" required type="password" />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <FormGroup register={register} id="confirmPassword" label="Confirmar senha" required type="password" />
                </div>
              </div>

              <div className="space-y-4">
                <PrimaryButton
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm"
                >
                  Criar conta
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
