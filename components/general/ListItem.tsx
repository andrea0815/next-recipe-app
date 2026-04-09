"use client";

import Button from '../buttons/Button';
import Link from 'next/link';
import IconEdit from '../icons/IconEdit';
import IconTrash from '../icons/IconTrash';
import ConfirmAction from '../errors/ConfirmaAction';

type ListItemProps = {
    onDeleteAction: () => void;
    textItems: string[];
    editHref: string;
    id: string;
};

export default function ListItem({
    textItems,
    editHref,
    onDeleteAction,
}: ListItemProps) {
    return (
        <li className={`flex py-1 gap-3 border-b last-of-type:border-b-0 border-gray-400 items-center`}  >
            <div className="flex-1 flex gap-3">
                {textItems.map((item, index) => (
                    <p key={index} className="flex-1">
                        {item}
                    </p>
                ))}
            </div>

            <div className='flex items-center'>

                <Link href={editHref}>
                    <IconEdit />
                </Link>

                <ConfirmAction
                    title="Delete item?"
                    description="This action cannot be undone."
                    confirmText="Delete"
                    onConfirm={onDeleteAction}
                    trigger={(openConfirm) => (
                        <Button onClick={openConfirm} color="red" priority="tertiary" customClass='p-1'>
                            <IconTrash />
                        </Button>
                    )}
                />
            </div>
        </li>
    );
}