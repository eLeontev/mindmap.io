import React, { Component } from 'react';
import * as CONSTANTS from '../constants';

import './text-area.css';

let PLACEHOLDER = 'start type here to begin';
let { ENTER_KEY_CODE, TAB_KEY_CODE } = CONSTANTS;

export class TextArea extends Component<any, any> {
    private textarea: any;
    componentDidMount() {
        this.textarea.focus();
    }

    onEnterUpdate = (event: any) => {
        let { id, value, closeLabel } = this.props;

        if (event.which === ENTER_KEY_CODE && value.trim()) {
            closeLabel(id);
        }
    };

    preventFocus = (event: any) => {
        if (event.which === TAB_KEY_CODE) {
            event.preventDefault();
        }
    };

    render() {
        let { props, onEnterUpdate, preventFocus } = this;
        let { id, value, updateLabel, isEditMode } = props;

        let className = isEditMode
            ? 'editable-block'
            : 'editable-block editable-block_hidden';

        return (
            <textarea
                placeholder={PLACEHOLDER}
                ref={(textarea) => (this.textarea = textarea)}
                value={value}
                className={className}
                onKeyDown={preventFocus}
                onKeyPress={onEnterUpdate}
                onChange={({ target: { value } }) =>
                    updateLabel(id, value.trim())
                }
            />
        );
    }
}