export const useAuth = () => {
    const user = useState('user', () => null)

    const login = (username, password) => {
        // Mock Login
        if (username && password) {
            user.value = {
                username: username,
                name: 'Mostafa',
                role: username === 'admin' ? 'ADMIN' : 'USER',
                isPremium: true
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
