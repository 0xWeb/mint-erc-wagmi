import { IconAlertCircleFilled } from "@tabler/icons-react"
import { VT323 } from "next/font/google"
import { toast, Toaster } from "sonner"

const vt323 = VT323({ subsets: ['latin'], weight: ['400'] })

export const handleToast = (type, title) => {

    const content = (type, title) => {

        const iconColor = type === 'success' ? 'text-red-700' : 'text-green-700'
        return (
            <article className={`flex items-center ${vt323.className} max-w-[150px]`}>
                <IconAlertCircleFilled strokeWidth={0} className={`${iconColor}`} />
                <div className="flex flex-col ml-2">
                    <p className="text-xl font-medium leading-3 ml-3">{title}</p>

                </div>
            </article>
        )
    }
    switch (type) {
        case 'success':
            toast.success(content(type, title));
            break;
        case 'error':
            toast.error(content(type, title));
            break;
    }

}

