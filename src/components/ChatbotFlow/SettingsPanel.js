import React, { useState, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingsPanel = ({ selectedNode, setSelectedNode, saveChanges }) => {
    const [label, setLabel] = useState(selectedNode.data.label);

    useEffect(() => {
        setLabel(selectedNode.data.label);
    }, [selectedNode]);

    const handleLabelChange = (e) => {
        setLabel(e.target.value);
    };

    const handleSave = () => {
        if (!label.trim()) {
            toast.error('Text cannot be empty');
            return;
        }
        setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label } });
        saveChanges(selectedNode.id, label);
        setSelectedNode(null);
    };

    return (
        <div className='py-5'>
            <button className='bg-white border-2 border-blue-500 rounded-md font-medium text-blue-500 w-full p-2' onClick={handleSave}>Save Changes</button>
            <div className='bg-slate-200 p-2 mt-5 '>
                <span className='flex items-center'><span onClick={() => setSelectedNode(null)} className='me-1 cursor-pointer'><BiArrowBack /></span> Message</span>
            </div>
            <div className='mt-2'>
                <label>Text</label>
                <textarea className='w-full h-24 p-1 mt-2 border rounded' value={label} onChange={handleLabelChange} />
            </div>
        </div>
    );
};

export default SettingsPanel;
