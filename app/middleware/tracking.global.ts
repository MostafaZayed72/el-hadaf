export default defineNuxtRouteMiddleware(async (to) => {
    if (process.client) {
        try {
            await $fetch('/api/track', {
                method: 'POST',
                body: {
                    path: to.fullPath,
                    userAgent: navigator.userAgent
                }
            })
        } catch (e) {
            // Ignore tracking errors
        }
    }
})
