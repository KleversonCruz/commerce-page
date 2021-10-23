import { useEffect, useState } from 'react'
import loadingGif from '../../../public/images/load.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import useApp from '@data/hooks/UseApp'
import useAuth from '@data/hooks/UseAppAuth'
import { useRouter } from 'next/router'

interface LoaderProps {
    children: any
}

export default function Loader(props: LoaderProps) {
    const { isLoading } = useApp()
    const { shop } = useApp()

    function renderContent() {
        return (
            props.children
        )
    }

    function renderLoading() {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100 gray dark:bg-warmGray-900">
                <Image src={loadingGif} alt="gif de loading" />
            </div>
        )
    }

    if (!isLoading && shop) {
        return renderContent()
    } else if (isLoading) {
        return renderLoading()
    } else {
        return renderLoading()
    }
}