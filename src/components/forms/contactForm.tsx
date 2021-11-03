import TextArea from '@components/elements/inputs/textArea'
import FormGroup from '@components/elements/inputs/formGroup';
import useApp from '@data/hooks/UseApp';
import { useForm } from 'react-hook-form';
import PrimaryButton from '@components/elements/buttons/primaryButton';

export default function Contact() {
  const { register } = useForm()
  
  return (
    <>
      <div className="sm:mt-0 rounded-md bg-white dark:bg-warmGray-900 text-gray-900 dark:text-gray-100">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3 lg:order-1">
            <form >
              <div className="overflow-hidden ">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="py-5 text-lg font-medium leading-6">Dados de contato</h3>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <FormGroup register={register} id="firstName" label="Nome" required />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <FormGroup register={register} id="lastName" label="Sobrenome" required />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <FormGroup register={register} id="telephone" label="Telefone" type='tel' required />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <FormGroup register={register} id="email" label="Email" type='email' required />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <TextArea register={register} id="message" label="Mensagem" rows={6} />
                    </div>
                  </div>
                  <div className="mt-6">
                    <PrimaryButton
                      className={"justify-center items-center px-6 py-3 shadow-sm text-base font-medium"}
                      type='submit'
                    >
                      Enviar
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
