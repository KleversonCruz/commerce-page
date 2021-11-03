import FormGroup from "@components/elements/inputs/formGroup"
import { useForm } from "react-hook-form"
import CartItems from "@components/shoppingCart/cartItems"
import { CartContext } from "@data/contexts/CartContext"
import { useContext, useEffect, useState } from "react"
import PrimaryButton from "@components/elements/buttons/primaryButton"
import SelectInput from "@components/elements/inputs/selectInput"
import States from "@data/core/types/State"
import { getAdressByPostalCode } from "@data/services/thirdPartyServices"
import useAuth from "@data/hooks/UseAppAuth"
import router from "next/router"
import useApp from "@data/hooks/UseApp"

const paymentMethods = [
    { id: 0, name: 'Cartão de crédito' },
    { id: 1, name: 'Cartão de débito' },
    { id: 2, name: 'Boleto' },
    { id: 3, name: 'Pix' },
]

export default function CheckoutForm() {
    const { register, handleSubmit, setValue } = useForm();
    const { cartTotal, items } = useContext(CartContext);
    const { user } = useAuth();
    const { shop, setIsLoading } = useApp();
    const [paymentMethod, setPaymentMethod] = useState(0);
    const orderTotal = (cartTotal + 19.99);

    async function getAdress(postalCode: string) {
        if (postalCode) {
            await getAdressByPostalCode(postalCode).then(response => {
                if (response?.adress) {
                    setValue('order.customer.addresses.0.adress', response.adress?.logradouro);
                    setValue('order.customer.addresses.0.adressDetails', response.adress?.complemento);
                    setValue('order.customer.addresses.0.district', response.adress?.bairro);
                    setValue('order.customer.addresses.0.city', response.adress?.localidade);
                    setValue('order.customer.addresses.0.state', response.adress?.uf);
                }

            })
        }
    }

    useEffect(() => {
        setValue('order.customer', user?.customer);
        setValue('order.total', cartTotal);
        setValue('order.orderItems', items);
        setValue('order.shop', shop);
    }, [user, setValue, cartTotal, items, shop])

    async function handleCheckout(data) {
        console.log(data)
        setIsLoading(true);
        function route(){
            router.push(`${shop.url}/pedido`);
            setIsLoading(false);
        }
        setTimeout(route, 2000)
        
    }

    return (
        <>
            <div className="sm:mt-0 rounded-md bg-white dark:bg-warmGray-900 text-gray-900 dark:text-gray-100">
                <div className="md:grid md:grid-cols-5 md:gap-6">
                    <div className="md:col-span-2 lg:order-2">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="py-5 text-lg font-medium leading-6">Resumo do pedido</h3>
                            <div className="py-5">
                                <CartItems />
                            </div>
                            <div className="py-4 border-t border-gray-200 dark:border-warmGray-700 space-y-2">
                                <div className="flex justify-between">
                                    <p className="font-medium text-sm">Subtotal</p>
                                    <p className="text-sm">R$ {cartTotal}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-medium text-sm">Frete</p>
                                    <p className="text-sm">R$ 19.00</p>
                                </div>
                            </div>
                            <div className="py-4 border-t border-gray-200 dark:border-warmGray-700">
                                <div className="flex justify-between text-base font-medium">
                                    <p>Total</p>
                                    <p>R$ {orderTotal}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-3 lg:order-1">
                        <form onSubmit={handleSubmit(handleCheckout)}>
                            <div className="overflow-hidden ">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="py-5 text-lg font-medium leading-6">Dados básicos</h3>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <FormGroup register={register} id="order.customer.firstName" label="Nome" required />
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <FormGroup register={register} id="order.customer.lastName" label="Sobrenome" required />
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <FormGroup register={register} id="order.customer.telephone" label="Telefone" required />
                                        </div>
                                    </div>
                                    <h3 className="py-5 text-lg font-medium leading-6">Endereço</h3>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <FormGroup register={register} id="order.customer.addresses.0.postalCode" placeholder="00000-000" label="CEP" required onBlur={(e) => getAdress(e.target.value)} />
                                        </div>

                                        <div className="col-span-6">
                                            <FormGroup register={register} id="order.customer.addresses.0.adress" label="Endereço" required />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <FormGroup register={register} id="order.customer.addresses.0.district" label="Bairro" required />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <FormGroup register={register} id="order.customer.addresses.0.adressDetails" label="Complemento" />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <FormGroup register={register} id="order.customer.addresses.0.city" label="Cidade" required />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <SelectInput register={register} id="order.customer.addresses.0.state" label="Estado" required>
                                                {States.List.map(state => {
                                                    return (
                                                        <option key={state.id} value={state.id}>{state.name}</option>
                                                    )
                                                })}
                                            </SelectInput>
                                        </div>

                                    </div>

                                    <h3 className="py-5 text-lg font-medium leading-6">Pagamento</h3>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <SelectInput register={register} id="order.payment.method" label="Método" required value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            >
                                                {paymentMethods.map(method => {
                                                    return (
                                                        <option key={method.id} value={method.id}>{method.name}</option>
                                                    )
                                                })}
                                            </SelectInput>
                                        </div>

                                        {paymentMethod == 0 || paymentMethod == 1 ? (
                                            <>
                                                <div className="col-span-6">
                                                    <FormGroup register={register} id="order.payment.method.0.cardNumber" label="Numero do cartão" required />
                                                </div>
                                                <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                                                    <FormGroup register={register} id="order.payment.method.0.cardName" label="Nome no cartão" />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                                    <FormGroup register={register} id="order.payment.method.0.cardExpires" placeholder="00/00" label="Validade" required />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                                    <FormGroup register={register} id="order.payment.method.0.cardCvc" label="CVC" required />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-4">
                                                    <SelectInput register={register} id="order.payment.method.0.cardParcel" label="Parcelas" required>
                                                        <option value={0}>{`1 x parcela de R$ ${Math.trunc((orderTotal / 1 * 100) / 100)}`}</option>
                                                        <option value={1}>{`2 x parcelas de R$ ${Math.trunc((orderTotal / 2 * 100) / 100)}`}</option>
                                                        <option value={2}>{`3 x parcelas de R$ ${Math.trunc((orderTotal / 3 * 100) / 100)}`}</option>
                                                        <option value={3}>{`4 x parcelas de R$ ${Math.trunc((orderTotal / 4 * 100) / 100)}`}</option>
                                                    </SelectInput>
                                                </div>
                                            </>
                                        ) : null}

                                    </div>
                                    <div className="mt-6">
                                        <PrimaryButton
                                            className={"w-full justify-center items-center px-6 py-3 shadow-sm text-base font-medium"}
                                            type='submit'
                                        >
                                            Finalizar
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
