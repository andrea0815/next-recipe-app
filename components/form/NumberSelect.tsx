"use client"
import { Dispatch, SetStateAction } from 'react';
import IconMinusCircle from '../icons/IconMinusCircle';
import IconPlusCircle from '../icons/IconPlusCircle';
import Button from '@/components/buttons/Button';

export default function NumberSelect({
    portions,
    name,
    unit,
    stretch = false,
    step = 1,
    min = 1,
    onPortionChange,
}: {
    portions: number;
    name?: string;
    unit?: string,
    step?: number,
    stretch?: boolean,
    min?: number,
    onPortionChange: Dispatch<SetStateAction<number>>;
}) {
    const addPortion = () => {
        onPortionChange((prev: number) => Math.min(999, prev + step));
    };

    const subtractPortion = () => {
        onPortionChange((prev: number) => Math.max(1, prev - step));
    };

    return (
        <div className='flex gap-2 items-center h-(--btn-h-sm)'>
            <Button
                onClick={subtractPortion}
                size='small'
                priority='tertiary'
                color='primary'
                disabled={portions <= 1}
            >
                <IconMinusCircle size={28} />
            </Button>
                <input
                    type="number"
                    value={portions}
                    onChange={(e) => onPortionChange(Number(e.target.value))}
                    className={`${stretch ? "w-full" : "w-12"} text-center h-(--btn-h-sm) p-2 bg-white text-text rounded-lg border border-gray-500 no-spinner`}
                    min={min}
                    step={step}
                    name={name}
                />
            <Button
                onClick={addPortion}
                priority='tertiary'
                color='primary'
                size='small'
            >
                <IconPlusCircle size={28} />
            </Button>
            {unit &&
                <p>{unit}</p>
            }
        </div>
    );
}
