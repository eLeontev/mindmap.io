import React, { Component } from 'react';

import { Block } from './block';
import { SaveButton } from './save-button'
import { LoadMapButton } from './load-map-button'

import * as CONSTANTS from '../constants'
import* as utils from '../utils';

import './mind-map.css';

let { guid, getNewBlock } = utils;
let {
    elementsHandledOnCLick,
    rootBlock,
    ENTER_KEY_CODE,
    TAB_KEY_CODE,
} = CONSTANTS;

export class MindMap extends Component<any, any> {
    private handlers: any;
    
    constructor(props: any) {
        super(props)

        this.state = {
            selectedBlockID: 0,
            enableCreateNewBlock: true,
            blocks: [{ ...rootBlock }],
        };

        this.handlers = {
            updateLabel: this.updateLabel,
            closeLabel: this.closeLabel,
            switchLabelToEditMode: this.switchLabelToEditMode,
            removeBlockWithChildren: this.removeBlockWithChildren,
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown, false);
        document.addEventListener('mousedown', this.clickOnEmptySpace, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown, false);
        document.removeEventListener('mousedown', this.clickOnEmptySpace, true);
    }

    keyDown = (event: any) => {
        let { selectedBlockID, enableCreateNewBlock, blocks } = this.state;

        let hasEditedBlocks = blocks.some(({ isEditMode }: any) => isEditMode);

        if (hasEditedBlocks) {
            return;
        }

        let { which: keyCode } = event;

        switch (true) {
            case keyCode === ENTER_KEY_CODE && enableCreateNewBlock: {
                this.createNewSisterBlock(selectedBlockID);
                break;
            }
            case keyCode === TAB_KEY_CODE: {
                event.preventDefault();

                this.createNewChildrenBlock(selectedBlockID);
                break;
            }
            default: {
                this.setState({
                    enableCreateNewBlock: true,
                });
            }
        }
        /* eslint-enable indent */
    };

    clickOnEmptySpace = ({ target: { className: targetClass } }: any) => {
        let isClickOnHandledElement = elementsHandledOnCLick.some(
            (className) => className === targetClass
        );

        if (!isClickOnHandledElement) {
            this.closeEditedLabelOnCLick();
        }
    };

    switchLabelToEditMode = (id: string) => {
        let { blocks } = this.state;

        let hasEditedBlockWithEmptyLabel = blocks.find(
            ({ isEditMode, value }: any) => isEditMode && !value.trim()
        );

        if (hasEditedBlockWithEmptyLabel) {
            return;
        }

        blocks = blocks.map((block: any) => ({
            ...block,
            isEditMode: block.id === id,
        }));

        this.setState({
            blocks,
            selectedBlockID: id,
        });
    };

    updateLabel = (id: string, value: string) => {
        let { blocks } = this.state;

        /* eslint-disable indent */
        blocks = blocks.map(
            (block: any) =>
                block.id === id
                    ? {
                          ...block,
                          value: value.trim(),
                      }
                    : block
        );
        /* eslint-enable indent */
        this.setState({
            blocks,
        });
    };

    closeLabel = (selectedBlockID: string) => {
        let { blocks } = this.state;

        /* eslint-disable indent */
        blocks = blocks.map(
            (block: any) =>
                block.id === selectedBlockID
                    ? {
                          ...block,
                          isEditMode: false,
                      }
                    : block
        );
        /* eslint-enable indent */
        this.setState({
            blocks,
            selectedBlockID,
        });
    };

    createNewSisterBlock = (id: string) => {
        if (id === rootBlock.id) {
            return;
        }

        let { blocks } = this.state;
        let { parentID } = blocks.find(({ id: currentID }: any) => currentID === id);

        this.createAndSelectNewBlock(parentID, blocks);
    };

    createNewChildrenBlock = (parentID: string) => {
        let { blocks } = this.state;

        /* eslint-disable indent */
        blocks = blocks.map(
            (block: any) =>
                block.id === parentID
                    ? {
                          ...block,
                          hasChildren: true,
                      }
                    : block
        );
        /* eslint-enable indent */
        this.createAndSelectNewBlock(parentID, blocks);
    };

    createAndSelectNewBlock = (parentID: string, blocks: any[]) => {
        let selectedBlockID = guid();

        this.setState({
            blocks: [...blocks, getNewBlock(selectedBlockID, parentID)],
            selectedBlockID,
        });
    };

    closeEditedLabelOnCLick = () => {
        /* eslint-disable-next-line react/destructuring-assignment */
        let { hasEditedLabel, blocks } = this.state.blocks.reduce(
            ({ blocks, hasEditedLabel }: any, block: any) => {
                let { isEditMode, value } = block;

                if (isEditMode && value.trim()) {
                    block = { ...block, isEditMode: false };
                    hasEditedLabel = true;
                }

                return {
                    hasEditedLabel,
                    blocks: [...blocks, block],
                };
            },
            { blocks: [] }
        );

        if (hasEditedLabel) {
            this.setState({ blocks });
        }
    };

    removeBlockWithChildren = (id: string) => {
        let selectedBlockID: string = '';
        let { blocks } = this.state;

        blocks = blocks
            .filter(({ id: blockID, parentID }: any) => {
                if (blockID === id) {
                    selectedBlockID = parentID;
                    return false;
                }

                return true;
            })
            .map((block: any, i: number, blockWithoutRootRemovedBlock: any) => {
                let { id } = block;
                let hasNotChildren = this.isRemovedBlockHasNotChildren(
                    blockWithoutRootRemovedBlock,
                    selectedBlockID,
                    id
                );

                if (hasNotChildren) {
                    return {
                        ...block,
                        hasChildren: false,
                    };
                }

                return block;
            });

        blocks = this.getBlocksWithoutChildrenOfRemoved(blocks, [id]);

        this.setState({
            blocks,
            selectedBlockID,
        });
    };

    isRemovedBlockHasNotChildren = (
        blockWithoutRootRemovedBlock: any,
        parentID: any,
        id: any
    ) =>
        id === parentID
        && !blockWithoutRootRemovedBlock.find(
            ({ parentID: blockParentID }: any) => blockParentID === parentID
        );

    getBlocksWithoutChildrenOfRemoved = (blocks: any[], parentIDarray: string[]) => {
        let childrenIDarray: string[] = [];
        let notChildrenBlocks = blocks.filter(({ id, parentID }) => {
            if (parentIDarray.find((id) => id === parentID)) {
                childrenIDarray.push(id);

                return false;
            }

            return true;
        });

        let hasChildren = Boolean(childrenIDarray.length);
        if (hasChildren) {
            blocks = this.getBlocksWithoutChildrenOfRemoved(
                notChildrenBlocks,
                childrenIDarray
            );
        }

        return blocks;
    };

    exportMap = () => {
        const { blocks } = this.state;

        const JSONMindmapContent: string = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blocks));
        const  link = document.createElement('a');
        link.href = 'data:' + JSONMindmapContent;
        link.download = 'mindmap.json';
        link.click();
        link.remove();
    }

    loadMindmap = (mindMap: any) => {
        this.setState({
            selectedBlockID: 0,
            enableCreateNewBlock: true,
            blocks: [...mindMap],

        })
        console.log(mindMap);
        
    }

    render() {
        let { blocks } = this.state;
        let [rootBlock] = blocks;

        return (
            <div className="mind-map-container">
                <SaveButton exportMap={this.exportMap}/>
                <LoadMapButton loadMindmap={this.loadMindmap} />
                <div className="mind-map">
                    <Block
                        block={rootBlock}
                        blocks={blocks}
                        handlers={this.handlers}
                    />
                </div>
            </div>
        );
    }
}