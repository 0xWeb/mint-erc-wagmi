import { IconAlertCircleFilled } from "@tabler/icons-react"
import { VT323 } from "next/font/google"
import { toast, Toaster } from "sonner"

const vt323 = VT323({ subsets: ['latin'], weight: ['400'] })

export const handleToast = (type, title, description) => {

    const content = (type, title, description) => {

        const iconColor = type === 'success' ? 'text-red-700' : 'text-green-700'
        return (
            <article className={`flex items-center gap-3 ${vt323.className}`}>
                <IconAlertCircleFilled className={iconColor} />
                <div className="flex flex-col ">
                    <p className="text-xl">{title}</p>
                    <p className="text-lg text-red-500">{description}</p>
                </div>
            </article>
        )
    }
    switch (type) {
        case 'success':
            toast.success(content(type, title, description));
            break;
        case 'error':
            toast.error(content(type, title, description));
            break;
    }

}

