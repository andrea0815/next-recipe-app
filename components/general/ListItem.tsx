"use client";

import Button from '../buttons/Button';
import Link from 'next/link';
import IconEdit from '../icons/IconEdit';
import IconTrash from '../icons/IconTrash';

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
        <li className={`flex py-2 gap-3 border-b last-of-type:border-b-0 border-light items-center`}  >
            <div className="flex-1 flex gap-3">
                {textItems.map((item, index) => (
                    <p key={index} className="flex-1">
                        {item}
                    </p>
                ))}
            </div>

            <Link href={editHref}>
                <IconEdit />
            </Link>


            <Button onClick={onDeleteAction} bgColor="error" textColor='red'> 
                <IconTrash />
                 </Button>
        </li>
    );
}