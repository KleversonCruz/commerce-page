import SecondaryButton from "@components/elements/buttons/secondaryButton";
import ImageInput from "@components/elements/images/image";
import Link from '@components/elements/links/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

interface HeroProps {
    lgHero?: boolean
    callActionText?: string
    title?: string
    text?: string
    imageUrl?: string
}

export default function Hero(props: HeroProps) {
    return (
        <div className="relative">
            <div className={classNames(
                props.lgHero
                    ? 'xl:aspect-h-3'
                    : 'xl:aspect-h-2',
                'w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7  bg-gray-100 dark:bg-warmGray-800'
            )}>
                <div className="absolute inset-0">
                    <ImageInput src={props.imageUrl} alt="Hero shop image" className="w-full h-full object-center object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-warmGray-300 via-warmGray-600 to-warmGray-800 mix-blend-multiply rounded-md" />
                    <div className="absolute bottom-0 w-full text-center text-gray-100 mb-4 lg:mb-16">
                        <h1 className="text-2xl my-4 font-bold text-th-accent-medium">{props.title}</h1>
                        <h1 className="text-xl my-4 mx-10">{props.text}</h1>
                        <Link path="produtos">
                            <a href="">
                                <SecondaryButton className="text-gray-900 dark:text-gray-100 text-base px-10 py-3">
                                    {props.callActionText}
                                </SecondaryButton>
                            </a>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}