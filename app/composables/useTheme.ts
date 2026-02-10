export const useTheme = () => {
    const theme = useState('theme', () => 'dark')

    const toggleTheme = () => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark'
        if (process.client) {
            localStorage.setItem('theme', theme.value)
            if (theme.value === 'dark') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }

    const initTheme = () => {
        if (process.client) {
            const storedTheme = localStorage.getItem('theme')
            if (storedTheme) {
                theme.value = storedTheme
            } else {
                // Default to dark
                theme.value = 'dark'
            }

            if (theme.value === 'dark') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
    }

    return {
        theme,
        toggleTheme,
        initTheme
    }
}
