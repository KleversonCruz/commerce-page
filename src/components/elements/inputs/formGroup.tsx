interface FormGroupProps {
    label: string
    id: string
    register: any
    required?: boolean
    type?: string
    placeholder?: string
    className?: string
    readonly?: boolean
    onBlur?: (e) => void
    maxLength?: number
    minLength?: number
    defaultValue?: string
}

export default function FormGroup(props: FormGroupProps) {
    const register = props.register
    return (
        <>
            <label className="block text-sm">
                {props.label}
            </label>
            <input
                type={props?.type ?? 'text'}
                required={props.required}
                readOnly={props.readonly}
                {...register(props.id)}
                placeholder={props.placeholder}
                className={`mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm rounded-md
                bg-gray-100 dark:bg-warmGray-800 border-gray-100 dark:border-warmGray-900
                    ${props.className}`}
                onBlur={props.onBlur}
                maxLength={props.maxLength}
                minLength={props.minLength}
                defaultValue={props.defaultValue}
            />
        </>
    )
}