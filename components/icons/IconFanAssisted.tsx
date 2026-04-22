import Icon from './Icon';

export default function IconFanAssisted({ size = 24 }: { size?: number }) {
    return (
        <Icon size={size}>
            <svg className='w-full h-full' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path vectorEffect="non-scaling-stroke" d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path vectorEffect="non-scaling-stroke" d="M10 13.5031L12.0234 12.3371V10" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
                <path vectorEffect="non-scaling-stroke" d="M14.0469 13.503L12.0234 12.3371" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />
            </svg>

        </Icon>
    );
}

