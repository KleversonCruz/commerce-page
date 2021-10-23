import useApp from "@data/hooks/UseApp"
import { api } from "@data/services/api"

export default function Brand() {
    const { shop } = useApp()

    return (
        shop?.imageUrl ? (
            <img
                className="h-8 w-auto"
                src={`${api.defaults.baseURL}/images/${shop?.imageUrl}`}
                alt="Workflow"
            />
        ) : (
            <h1 className="text-xl font-bold text-th-accent-medium">{shop.name}</h1>
        )
    )
}