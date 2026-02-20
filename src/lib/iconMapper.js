/**
 * Icon Mapper
 *
 * Maps icon strings (e.g., "tabler/IconRun") to actual icon components.
 * This explicit mapping ensures perfect tree-shaking - only imported icons
 * are included in the bundle (~2-5KB each).
 */

// Tabler Icons
import {
    IconAlertTriangle,
    IconBolt,
    IconBook,
    IconBooks,
    IconBrain,
    IconBrandPython,
    IconBug,
    IconCalendar,
    IconChecks,
    IconChefHat,
    IconClipboardCheck,
    IconComponents,
    IconCopy,
    IconCpu,
    IconDatabase,
    IconDiamond,
    IconEyeOff,
    IconFileText,
    IconFlag,
    IconFlagOff,
    IconGhost,
    IconGitMerge,
    IconHeart,
    IconHelp,
    IconHierarchy,
    IconHourglass,
    IconLayersOff,
    IconLock,
    IconMessage,
    IconMoodConfuzed,
    IconMoon,
    IconPlayerPlay,
    IconPlugConnected,
    IconPresentation,
    IconQuestionMark,
    IconRefresh,
    IconRobot,
    IconRun,
    IconShield,
    IconShieldOff,
    IconSquare,
    IconTool,
    IconUser,
    IconUserHeart,
    IconUsers,
    IconZip,
} from '@tabler/icons-react'

// MUI Icons (adicionar conforme necessário)
// import GitHubIcon from '@mui/icons-material/GitHub'

/**
 * Icon mapping object
 * Key: icon string from frontmatter (e.g., "tabler/IconRun")
 * Value: React component
 */
export const iconMap = {
    // Blog Posts
    'tabler/IconBook': IconBook,
    'tabler/IconRun': IconRun,
    'tabler/IconHelp': IconHelp,
    'tabler/IconFlag': IconFlag,
    'tabler/IconUsers': IconUsers,
    'tabler/IconPlayerPlay': IconPlayerPlay,

    // Capítulos Principais
    'tabler/IconHeart': IconHeart,
    'tabler/IconChecks': IconChecks,
    'tabler/IconComponents': IconComponents,
    'tabler/IconCalendar': IconCalendar,
    'tabler/IconPresentation': IconPresentation,
    'tabler/IconPlugConnected': IconPlugConnected,
    'tabler/IconFileText': IconFileText,
    'tabler/IconBooks': IconBooks,
    'tabler/IconClipboardCheck': IconClipboardCheck,
    'tabler/IconRefresh': IconRefresh,

    // Requisitos - Dimensões
    'tabler/IconHierarchy': IconHierarchy,
    'tabler/IconUser': IconUser,
    'tabler/IconGitMerge': IconGitMerge,
    'tabler/IconCpu': IconCpu,
    'tabler/IconHourglass': IconHourglass,

    // Técnicas
    'tabler/IconBug': IconBug,
    'tabler/IconBrandPython': IconBrandPython,
    'tabler/IconDiamond': IconDiamond,
    'tabler/IconBrain': IconBrain,
    'tabler/IconZip': IconZip,

    // Gambi Design Patterns
    'tabler/IconMoon': IconMoon,
    'tabler/IconShield': IconShield,
    'tabler/IconMessage': IconMessage,
    'tabler/IconQuestionMark': IconQuestionMark,
    'tabler/IconDatabase': IconDatabase,
    'tabler/IconAlertTriangle': IconAlertTriangle,
    'tabler/IconTool': IconTool,
    'tabler/IconLock': IconLock,
    'tabler/IconUserHeart': IconUserHeart,
    'tabler/IconRobot': IconRobot,
    'tabler/IconLayersOff': IconLayersOff,
    'tabler/IconFlagOff': IconFlagOff,
    'tabler/IconEyeOff': IconEyeOff,
    'tabler/IconMoodConfuzed': IconMoodConfuzed,
    'tabler/IconSquare': IconSquare,
    'tabler/IconCopy': IconCopy,
    'tabler/IconGhost': IconGhost,
    'tabler/IconChefHat': IconChefHat,
    'tabler/IconBolt': IconBolt,
    'tabler/IconShieldOff': IconShieldOff,

    // MUI Icons (adicionar conforme necessário)
    // 'mui/GitHub': GitHubIcon,
}

/**
 * Get icon component from icon string
 * @param {string} iconString - Icon identifier (e.g., "tabler/IconRun")
 * @returns {React.Component|null} Icon component or null if not found
 */
export const getIcon = (iconString) => {
    if (!iconString) return null
    return iconMap[iconString] || null
}

/**
 * Check if icon exists in the map
 * @param {string} iconString - Icon identifier
 * @returns {boolean}
 */
export const hasIcon = (iconString) => {
    return iconString && iconString in iconMap
}

/**
 * Get all available icon keys
 * @returns {string[]}
 */
export const getAvailableIcons = () => {
    return Object.keys(iconMap)
}

export default iconMap
