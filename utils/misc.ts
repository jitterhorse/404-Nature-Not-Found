export const shuffle = <T>(array: Array<T>): Array<T> => {
    let currentIndex = array.length
    let randomIndex

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}
export const randomEntry = <T>(array: Array<T>): T => array[Math.floor(Math.random() * array.length)]
export const sleep = (milliseconds: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, milliseconds))