import React from 'react'

interface SaveButtonProps {
    exportMap: () => void;
}
export const SaveButton = ({ exportMap }: SaveButtonProps) => <button onClick={exportMap}>export to JSON</button>