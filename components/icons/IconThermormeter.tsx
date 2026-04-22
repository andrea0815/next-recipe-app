import Icon from './Icon';

export default function IconThermormeter({ size = 24 }: { size?: number }) {
    return (
        <Icon size={size}>
            <svg className='w-full h-full' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_188_13266)">
                    <path vectorEffect="non-scaling-stroke" d="M14 14.76V3.5C14 2.83696 13.7366 2.20107 13.2678 1.73223C12.7989 1.26339 12.163 1 11.5 1C10.837 1 10.2011 1.26339 9.73223 1.73223C9.26339 2.20107 9 2.83696 9 3.5V14.76C8.19728 15.2963 7.58832 16.0766 7.26307 16.9856C6.93782 17.8946 6.91352 18.8841 7.19376 19.8079C7.47399 20.7317 8.04391 21.541 8.81934 22.1161C9.59476 22.6912 10.5346 23.0017 11.5 23.0017C12.4654 23.0017 13.4052 22.6912 14.1807 22.1161C14.9561 21.541 15.526 20.7317 15.8062 19.8079C16.0865 18.8841 16.0622 17.8946 15.7369 16.9856C15.4117 16.0766 14.8027 15.2963 14 14.76Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <line vectorEffect="non-scaling-stroke" x1="18" y1="4" x2="21" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line vectorEffect="non-scaling-stroke" x1="18" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line vectorEffect="non-scaling-stroke" x1="18" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path vectorEffect="non-scaling-stroke" d="M13 18.5C13 19.3284 12.3284 20 11.5 20C10.6716 20 10 19.3284 10 18.5C10 17.6716 10.6716 17 11.5 17C12.3284 17 13 17.6716 13 18.5Z" fill="currentColor" />
                <defs>
                    <clipPath id="clip0_188_13266">
                        <rect vectorEffect="non-scaling-stroke" width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </Icon>
    );
}

