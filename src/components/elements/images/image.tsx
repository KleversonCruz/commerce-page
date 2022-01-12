import { api } from "@data/services/api"

interface ImageProps {
    src?: string
    alt?: string
    className?: string
    ignoreBaseUrl?: boolean
}

export default function Image(props: ImageProps) {
    return (
        <img
            src={props.ignoreBaseUrl ? props.src : `/images/${props.src}`}
            alt={props.alt}
            className={props.className}
        />
    )
}