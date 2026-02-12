interface User {
    username: string
    name: string
    role: string
}

export const useAuth = () => {
    // Use cookie for persistence (available SSR + Client)
    const user = useCookie<User | null>('auth_user', {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax'
    })

    const login = (username: string, password: string) => {
        // Check credentials: admin / admin123456
        if (username === 'admin' && password === 'admin123456') {
            user.value = {
                username: username,
                name: 'Admin',
                role: 'ADMIN'
            }
            return true
        }
        return false
    }

    const logout = () => {
        user.value = null
        return navigateTo('/login')
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
