import PrimaryButton from "@components/elements/buttons/primaryButton";
import SecondaryButton from "@components/elements/buttons/secondaryButton";
import FormGroup from "@components/elements/inputs/formGroup";
import useApp from "@data/hooks/UseApp";
import useAuth from "@data/hooks/UseAppAuth";
import { api } from "@data/services/api";
import { useForm } from "react-hook-form";

export default function SignIn(props) {
  const { register, handleSubmit } = useForm()
  const { shop } = useApp()
  const { signIn } = useAuth()

  async function handleSignIn(data) {
    await signIn(data)
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
            <h2 className="mt-6 text-3xl font-extrabold">Entre com sua conta</h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
                <div className="space-y-1">
                  <FormGroup register={register} id="userName" placeholder="Email" label="Email" required type="email" />
                </div>
                <div className="space-y-1">
                  <FormGroup register={register} id="password" placeholder="Senha" label="Senha" required type="password" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-th-accent-medium hover:text-th-accent-dark border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
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
                    onClick={() => props.setIsRegistering(true)}
                  >
                    Criar conta
                  </SecondaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
