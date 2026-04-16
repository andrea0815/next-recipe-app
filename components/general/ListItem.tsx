"use client";

import Button from "../buttons/Button";
import IconEdit from "../icons/IconEdit";
import IconTrash from "../icons/IconTrash";
import ConfirmAction from "../errors/ConfirmaAction";

import { ItemType, ListItem as ListItemType, TextItem } from "@/types/general"
import IconProfile from "../icons/IconProfile";

type ListItemProps = {
    type: ItemType;
    item: ListItemType;
    isPendingOnDelete: boolean;
    onDeleteAction: () => void;
    onEditButton: (item: ListItemType) => void;
};

export default function ListItem({
    item,
    type,
    isPendingOnDelete,
    onEditButton,
    onDeleteAction,
}: ListItemProps) {

    const deleteMessage = type === ItemType.CATEGORY ?
        "Deleting a category will delete and remove all its existing occurrences." :
        "This action cannot be undone.";

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
                    title="Delete this item?"
                    description={deleteMessage}
                    confirmText="Delete"
                    onConfirm={onDeleteAction}
                    trigger={(openConfirm) => (
                        <Button
                            onClick={openConfirm}
                            color="red"
                            priority="tertiary"
                            customClass="p-1"
                        >
                            {isPendingOnDelete ? <div className="animation-spin" ><IconProfile /></div> : <IconTrash />}
                        </Button>
                    )}
                />
            </div>
        </>
    );
}