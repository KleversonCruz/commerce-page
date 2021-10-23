import Register from "@components/forms/register";
import SignIn from "@components/forms/signIn";
import PageHead from "@components/layout/pageHead";
import { useState } from "react";

export default function Produtos() {
    const [isRegistering, setIsRegistering] = useState(false)

    return (
        <>
            <PageHead title="Entrar" />

            <div className="min-h-screen flex flex-row-reverse bg-gray-50 dark:bg-warmGray-800 text-gray-900 dark:text-gray-100">
                {isRegistering ? (
                    <Register setIsRegistering={setIsRegistering} />
                ) : (
                    <SignIn setIsRegistering={setIsRegistering} />
                )}

                <div className="hidden lg:block relative w-0 flex-1">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}
