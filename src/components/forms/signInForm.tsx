import PrimaryButton from "@components/elements/buttons/primaryButton";
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import Image from "@components/elements/images/image";
import FormGroup from "@components/elements/inputs/formGroup";
import useApp from "@data/hooks/UseApp";
import useAuth from "@data/hooks/UseAppAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignInForm({ setOpen }) {
  const [isNewUser, setIsNewUser] = useState(false)
  const [message, setMessage] = useState(null)
  const { register, handleSubmit } = useForm()
  const { shop } = useApp()
  const { signIn, register: registerUser } = useAuth()

  async function handleSignIn(data) {
    if (isNewUser) {
      await registerUser(data).then(response => {
        response ? setOpen(false) : setMessage("Houve um erro ao cadastrar")
      })
    } else {
      await signIn(data).then(response => {
        response ? setOpen(false) : setMessage("Não foi possível realizar login")
      })
    }
  }

  function renderSignInForm() {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <FormGroup register={register} id="userName" placeholder="Email" label="Email" required type="email" />
        </div>
        <div className="space-y-1">
          <FormGroup register={register} id="password" placeholder="Senha" label="Senha" required type="password" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              {...register("remember")}
              type="checkbox"
              className="h-4 w-4 text-th-accent-medium hover:text-th-accent-dark border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm">
              Lembrar-se
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-th-accent-medium hover:text-th-accent-dark">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <PrimaryButton
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm"
          >
            Entrar
          </PrimaryButton>
          <SecondaryButton
            className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm"
            onClick={() => setIsNewUser(true)}
          >
            Criar conta
          </SecondaryButton>
        </div>
      </div>
    )
  }

  function renderRegisterForm() {
    return (
      <div className="space-y-6">
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
            onClick={() => setIsNewUser(false)}
          >
            Já possui uma conta?
          </SecondaryButton>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            {shop?.brandImageUrl ? (
              <Image
                className="h-12 w-auto"
                src={shop?.brandImageUrl}
                alt="Logo da loja"
              />
            ) : null}
            <h2 className="mt-6 text-3xl font-extrabold">
              {isNewUser ? "Criar uma conta" : "Entre com sua conta"}
            </h2>
            <h2 className="mt-6 text-base text-red-400 font-bold">
              {message}
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
                {isNewUser ? renderRegisterForm() : renderSignInForm()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
