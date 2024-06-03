import React from 'react';
import { AiFillMessage } from 'react-icons/ai';

const NodePanel = ({ onCreateNode }) => {
    return (
        <div className='py-5'>
            <div
                onClick={() => onCreateNode('textNode')}
                className='cursor-pointer border-2 rounded-md border-blue-700 flex flex-col justify-center items-center py-8 w-full mb-1'
            >
                <span className='text-blue-700'><AiFillMessage size={30} /></span>
                <span className='text-blue-700'>Message</span>
            </div>
            <p className='text-xs'><span className='text-red-500'>*</span>Click here to create new Message!</p>
        </div>
    );
};

export default NodePanel;
