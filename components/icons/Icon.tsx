interface IconProps {
    size?: number,
    children: React.ReactNode;
}

export default function Icon({
    children,
    size = 20,
}: IconProps) {

    const iconSize = size;

    return (
        <div
            className="flex justify-center items-center transition hover:scale-105"
            style={{ width: iconSize, height: iconSize }}
        >
            {children}
        </div>
    );
}