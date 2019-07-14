import { Block } from './interfaces/block.model';

export let getNewBlock: (id: string, parentID: string) => Block = (id: string, parentID: string): Block => ({
    id,
    parentID,
    isEditMode: true,
    hasChildren: false,
    value: '',
});

let s4: () => string = (): string => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

export let guid: () => string = (): string => `${s4()}${s4()}- ${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`