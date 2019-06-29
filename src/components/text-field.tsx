import React from 'react';
import './text-field.css';

export let TextField = ({ id, value, isEditMode, switchLabelToEditMode }: any) => {
    let className = isEditMode
        ? 'label--text label-text_hidden'
        : 'label--text';

    return (
        <p className={className} onClick={() => switchLabelToEditMode(id)}>
            {value}
        </p>
    );
};