"use client"
import { Dispatch, SetStateAction } from 'react';
import IconMinusCircle from '../icons/IconMinusCircle';
import IconPlusCircle from '../icons/IconPlusCircle';
import Button from '@/components/buttons/Button';

export default function NumberSelect({
    portions,
    name,
    onPortionChange,
}: {
    portions: number;
    name?: string;
    onPortionChange: Dispatch<SetStateAction<number>>;
}) {
    const addPortion = () => {
        onPortionChange((prev: number) => Math.min(999, prev + 1));
    };

    const subtractPortion = () => {
        onPortionChange((prev: number) => Math.max(1, prev - 1));
    };

    return (
        <div className='flex gap-2 items-stretch h-(--btn-h-sm)'>
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
                onChange={(e) =>  onPortionChange(Number(e.target.value))}
                className={`w-[3rem] text-center h-(--btn-h-sm) p-2 bg-white text-text rounded-lg border border-gray-500 no-spinner`}
                min={1}
                step={1}
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
        </div>
    );
}
