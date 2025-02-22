export const variablesDiv = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
}

export const variablesBtn = {
    ...variablesDiv,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
}