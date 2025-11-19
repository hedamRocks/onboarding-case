import type { Content } from "~/types/Content"
// import mock content for development
import mockOnboardingContent from '../../public/mock-onboarding-content.json'
import mockLoginContent from '../../public/mock-login-content.json'

// fetch content by type
export const fetchContent = async (type: string): Promise<Content[keyof Content]> => {
    try {
        // use mock content in development as fallback
        if (import.meta.dev){
            if (type === 'onboarding') {
                return mockOnboardingContent as Content['onboarding']
            } else if (type === 'login') {
                return mockLoginContent as Content['login']
            }
        }
        const data = await $fetch(`/mock-${type}-content.json`)
        return data as Content[keyof Content]
    } catch (error) {
        console.error(`Failed to fetch ${type} content:`, error)
        
        throw error
    }
}