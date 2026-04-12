"use client";

import Button from "../buttons/Button";
import IconEdit from "../icons/IconEdit";
import IconTrash from "../icons/IconTrash";
import ConfirmAction from "../errors/ConfirmaAction";

import { ListItem as ListItemType, TextItem } from "@/types/general"

type ListItemProps = {
    item: ListItemType;
    onDeleteAction: () => void;
    onEditButton: (item: ListItemType) => void;
};

export default function ListItem({
    item,
    onEditButton,
    onDeleteAction,
}: ListItemProps) {
    return (
        <>
            {item.textItems.map((textItem, index) => (
                <p
                    key={index}
                    className="border-b border-gray-400 self-stretch flex justify-start items-center"
                >
                    {textItem.value}
                </p>
            ))}

            <div className="flex items-center border-b border-gray-400">
                <Button
                    onClick={() => onEditButton(item)}
                    priority="tertiary"
                >
                    <IconEdit />
                </Button>

                <ConfirmAction
                    title="Delete item?"
                    description="This action cannot be undone."
                    confirmText="Delete"
                    onConfirm={onDeleteAction}
                    trigger={(openConfirm) => (
                        <Button
                            onClick={openConfirm}
                            color="red"
                            priority="tertiary"
                            customClass="p-1"
                        >
                            <IconTrash />
                        </Button>
                    )}
                />
            </div>
        </>
    );
}