
export const useAuth = () => {
    const isAdmin = useCookie<boolean>('is_admin')
    const router = useRouter()

    const login = (u: string, p: string) => {
        if (u === 'mostafa' && p === 'mostafa') {
            isAdmin.value = true
            return true
        }
        return false
    }

    const logout = () => {
        isAdmin.value = false
        router.push('/')
    }

    return {
        isAdmin,
        login,
        logout
    }
}
