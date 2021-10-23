import PrimaryButton from "@components/elements/buttons/primaryButton";
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import FormGroup from "@components/elements/inputs/formGroup";
import User from "@data/core/identity/User";
import useApp from "@data/hooks/UseApp";
import useAuth from "@data/hooks/UseAppAuth";
import { api } from "@data/services/api";
import { useForm } from "react-hook-form";

export default function Register(props) {
  const { register, handleSubmit } = useForm()
  const { shop } = useApp()
  const { register: registerUser } = useAuth()

  async function handleSignIn(data) {
    console.log(data)
    registerUser(data)
  }

  return (
    <>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            {shop?.imageUrl ? (
              <img
                className="h-12 w-auto"
                src={`${api.defaults.baseURL}/images/${shop?.imageUrl}`}
                alt="Workflow"
              />
            ) : null}
            <h2 className="mt-6 text-3xl font-extrabold">Criar uma conta</h2>
          </div>

          <div className="mt-8">
            <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>

              <div className="mt-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <FormGroup register={register} id="customer.firstName" label="Nome" required />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <FormGroup register={register} id="customer.lastName" label="Sobrenome" required />
                </div>
              </div>

              <div className="space-y-1">
                <FormGroup register={register} id="userName" placeholder="Email" label="Email" required type="email" />
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
                <SecondaryButton
                  className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm"
                  onClick={() => props.setIsRegistering(false)}
                >
                  Já possui uma conta?
                </SecondaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
