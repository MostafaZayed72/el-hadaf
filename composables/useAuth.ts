interface User {
    username: string
    name: string
    role: string
}

export const useAuth = () => {
    const user = useState<User | null>('user', () => null)

    // Check localStorage on initialization
    if (process.client && !user.value) {
        const stored = localStorage.getItem('auth_user')
        if (stored) {
            try {
                user.value = JSON.parse(stored)
            } catch (e) {
                localStorage.removeItem('auth_user')
            }
        }
    }

    const login = (username: string, password: string) => {
        // Check credentials: admin / admin123456
        if (username === 'admin' && password === 'admin123456') {
            user.value = {
                username: username,
                name: 'Admin',
                role: 'ADMIN'
            }
            if (process.client) {
                localStorage.setItem('auth_user', JSON.stringify(user.value))
            }
            return true
        }
        return false
    }

    const logout = () => {
        user.value = null
        if (process.client) {
            localStorage.removeItem('auth_user')
        }
        return navigateTo('/admin')
    }

    const isAdmin = computed(() => user.value?.role === 'ADMIN')
    const isAuthenticated = computed(() => !!user.value)

    return {
        user,
        login,
        logout,
        isAdmin,
        isAuthenticated
    }
}
