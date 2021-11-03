import ImageInput from "@components/elements/images/image"
import Link from "@components/elements/links/link"
import useApp from "@data/hooks/UseApp"

export default function Brand() {
    const { shop } = useApp()

    return (
        shop?.brandImageUrl ? (
            <Link>
                <a href="">
                    <ImageInput src={shop?.brandImageUrl} alt="logo da marca" className="h-8 w-auto" />
                </a>
            </Link>
        ) : (
            <Link>
                <a href="">
                    <h1 className="text-xl font-bold text-th-accent-medium">{shop.name}</h1>
                </a>
            </Link>
        )
    )
}