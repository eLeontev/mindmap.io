import React, { Component, KeyboardEvent } from 'react';
import * as CONSTANTS from '../constants';

import './text-area.css';

let PLACEHOLDER: string = 'start type here to begin';
let { ENTER_KEY_CODE, TAB_KEY_CODE } = CONSTANTS;

interface TextAreaProps {
    id: string;
    value: string;
    isEditMode: boolean;
    updateLabel: (id: string, label: string) => void;
    closeLabel: (id: string) => void;
}
export class TextArea extends Component<TextAreaProps, any> {
    private textarea: any;
    componentDidMount() {
        this.textarea.focus();
    }

    onEnterUpdate = (event: KeyboardEvent): void => {
        let { id, value, closeLabel, updateLabel }: TextAreaProps = this.props;

        if (event.which === ENTER_KEY_CODE && value.trim()) {
            updateLabel(id, value.trim());
            closeLabel(id);
        }
    };

    preventFocus = (event: KeyboardEvent) => {
        if (event.which === TAB_KEY_CODE) {
            event.preventDefault();
        }
    };

    render() {
        let { props, onEnterUpdate, preventFocus } = this;
        let { id, value, updateLabel, isEditMode }: TextAreaProps = props;

        let className: string = isEditMode
            ? 'editable-block'
            : 'editable-block editable-block_hidden';


            const trimedValue: string = value.trim();
        return (
            <textarea
                placeholder={PLACEHOLDER}
                ref={(textarea) => (this.textarea = textarea)}
                value={ trimedValue ? value : '' }
                className={className}
                onKeyDown={preventFocus}
                onKeyPress={onEnterUpdate}
                onChange={({ target: { value } }) =>
                    updateLabel(id, value)
                }
            />
        );
    }
}