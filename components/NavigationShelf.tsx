
import React from 'react';
import { EducationalApp } from '../types';

interface Props {
  apps: EducationalApp[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const NavigationShelf: React.FC<Props> = ({ apps, activeIndex, onSelect }) => {
  return (
    <div className="bg-white border-t-4 border-blue-100 p-4">
      <div className="max-w-4xl mx-auto flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {apps.map((app, index) => (
          <button
            key={app.id}
            onClick={() => onSelect(index)}
            className={`
              flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all
              ${activeIndex === index 
                ? 'bg-blue-100 ring-4 ring-blue-400 scale-105' 
                : 'bg-gray-50 hover:bg-gray-100 hover:scale-102'}
            `}
          >
            <div className={`w-16 h-16 ${app.color} rounded-xl shadow-inner flex items-center justify-center text-3xl`}>
              {app.icon}
            </div>
            <span className={`text-sm font-bold ${activeIndex === index ? 'text-blue-700' : 'text-gray-600'}`}>
              {app.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationShelf;
