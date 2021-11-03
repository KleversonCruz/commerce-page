interface SelectInputProps {
    label: string
    id: string
    register: any
    required?: boolean
    className?: string
    children?: any
    value?: any
    onChange?: any
}

export default function SelectInput(props: SelectInputProps) {
    const register = props.register
    return (
        <>
            <label className="block text-sm">
                {props.label}
            </label>
            <select
                required={props.required}
                {...register(props.id)}
                value={props.value}
                onChange={props.onChange}
                className={`mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm rounded-md
                    bg-gray-100 dark:bg-warmGray-800 border-gray-100 dark:border-warmGray-900
                    ${props.className}`}
            >
                {props.children}
            </select>
        </>
    )
}