import React from 'react'

const loadButtonLabel: string = 'load your own mind map'
const handleFileLoading = (loadMindmap: any) => ({ target }: any) => {
    let fr = new FileReader();
    fr.onload = ({target:  { result }}: any) => {
        loadMindmap(JSON.parse(result));
        target.value = '';
    } 
    fr.readAsText(target.files.item(0));
    
}
export const LoadMapButton = ({ loadMindmap }: any) => (
    <label>{loadButtonLabel}: <input id="loadJSONId" type="file" onChange={handleFileLoading(loadMindmap)} accept='.json'/></label>
)