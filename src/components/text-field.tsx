import React from 'react';
import './text-field.css';

interface TextFieldProps {
    id: string;
    value: string;
    isEditMode: boolean;
    switchLabelToEditMode: (id: string) => void;
}
export let TextField = ({ id, value, isEditMode, switchLabelToEditMode }: TextFieldProps) => {
    let className: string = isEditMode
        ? 'label--text label-text_hidden'
        : 'label--text';

    return (
        <p className={className} onClick={() => switchLabelToEditMode(id)}>
            {value}
        </p>
    );
};