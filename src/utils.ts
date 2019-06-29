export let getNewBlock = (id: string, parentID: string) => ({
    id,
    parentID,
    isEditMode: true,
    hasChildren: false,
    value: '',
});

let s4 = (): string => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

export let guid = () => `${s4()}${s4()}- ${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`