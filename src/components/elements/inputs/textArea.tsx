interface TextAreaProps {
    label: string
    id: string
    register: any
    placeholder?: string
    rows?: number
    className?: string
}
export default function TextArea(props: TextAreaProps) {
    const register = props.register
    return (
        <>
            <label className="block text-sm">
                {props.label}
            </label>
            <div className="mt-1">
                <textarea
                    {...register(props.id)}
                    placeholder={props.placeholder}
                    rows={props?.rows ?? 3}
                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm rounded-md
                    bg-gray-100 dark:bg-warmGray-800 border-gray-100 dark:border-warmGray-900
                    ${props.className}`}
                />
            </div>
        </>
    )
}