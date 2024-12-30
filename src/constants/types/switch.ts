export const SWITCH_BASE_STYLES = `
    relative inline-flex items-center cursor-pointer
    transition-colors ease-in-out duration-200
    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
`;

export const SWITCH_SIZES = {
    sm: {
        container: 'w-8 h-5',
        thumb: 'h-4 w-4',
        translate: 'translate-x-3'
    },
    md: {
        container: 'w-11 h-6',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5'
    },
    lg: {
        container: 'w-14 h-7',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7'
    }
};
