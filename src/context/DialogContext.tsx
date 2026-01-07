import { createContext } from "react";


export const DialogContext = createContext(false);

type Props = {
    children:React.ReactNode
}
export const DialogProvider  = ({children}:Props) => {
    return (
        <DialogContext.Provider value={false}>
            {children}
        </DialogContext.Provider>
    )
}