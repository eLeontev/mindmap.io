export interface Block {
    id: string;
    parentID: string;
    isEditMode: boolean;
    hasChildren: boolean;
    value: string;
}

export type Blocks = Block[];