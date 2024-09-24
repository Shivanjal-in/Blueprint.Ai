import React, { useState, useRef } from 'react';

interface AccordionProps {
    title: string;
    content: string;
    isActive: boolean;
    onToggle: () => void;
}

const Accordion = ({ title, content, isActive, onToggle }: AccordionProps) => {
    const contentRef = useRef<HTMLDivElement>(null); 

    return (
        <div className={`accordion-item ${isActive ? 'active' : ''}`}>
            <h2 onClick={onToggle} className='w-full text-gray-300  md:text-lg ' style={{ fontFamily: "Switzer" }}>{title}</h2>
            <div 
                ref={contentRef} 
                className="accordion-content text-[#ccc] mb-4 text-xs md:text-sm" 
                style={{ maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : '0' }}
            >
                {content}
            </div>
        </div>
    );
};

export default Accordion;
