import useApp from '@data/hooks/UseApp';
import NextLink from 'next/link'

interface LinkProps {
    path?: any
    query?: {}
    children: any
}
export default function Link(props: LinkProps) {
    const { shop } = useApp();
    const path = props.path ? `/${props.path}` : ''

    return (
        <NextLink
            href={{
                pathname: `${shop.url}${path}`,
                query: props.query,
            }}
        >
            {props.children}
        </NextLink>
    )
}