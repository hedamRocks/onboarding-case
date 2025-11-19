import { fetchContent } from "~/services/serviceContent"
import type { Content } from "~/types/Content"

/**
 * Composable to manage application content
 * @returns Methods and state for content management
 */
export const useContent = () => {
    /**
     * State to hold the content for different sections of the app
     */
    const content = useState<Content>('app-content', () => {
        return {
            onboarding: null,
            login: null
        }
    } )

    /**
     * Fetch content by type, caching it in state
     * @param type The type of content to fetch (e.g., 'onboarding', 'login')
     * @returns The fetched content
     */
    const getContentByType = async (type: keyof Content) => {
        if (content.value[type]) {
            return content.value[type]
        }

        try {
            const data = await fetchContent(type)
            // TODO: Improve type safety here
            switch (type) {
                case 'login':
                    content.value.login = data as Content['login']
                    break;
                case 'onboarding':
                    content.value.onboarding = data as Content['onboarding']
                    break;
                default:
                    break;
            }
            return data
        } catch (error) {
            console.error(`Failed to fetch ${type} content:`, error)
            throw error
        }
    }   

    return {
        content: readonly(content),
        getContentByType,
    }
}