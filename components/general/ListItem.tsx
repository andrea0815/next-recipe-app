
import React from 'react';
import Button from '../buttons/Button';
import Link from 'next/link';
import Form from 'next/form';

type ListItemProps = {
    onDeleteAction: () => void,
    textItems: string[],
    editHref: string,
    id: string,
}

export default function ListItem({ textItems, id, editHref, onDeleteAction }: ListItemProps) {
    return (
        <li key={id} className='flex gap-3 border-2 '>
            <div className='flex-1 flex border-2'>
                {textItems.map((item, index) => (
                    <p key={index} className='flex-1'>{item}</p>
                ))}
            </div>
            <Link href={editHref}>Edit</Link>
            <Form action={onDeleteAction}>
                <Button text="Delete" bgColor='red' />
            </Form>
        </li>
    );
}
