import Icon from './Icon';

export default function IconSpinner({ size = 24 }: { size?: number }) {
    return (
        <Icon size={size}>
            <div className="w-4 h-4 shrink-0">
                <span className="block w-full h-full border-2 border-b-transparent rounded-full box-border animate-spin" />
            </div>
        </Icon>
    );
}

