interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function RetroWindow({ title, children, className = "" }: RetroWindowProps) {
  return (
    <div className={`border-2 border-gray-400 bg-gray-100 rounded-sm shadow-lg ${className}`}>
      {/* Title bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-2 py-1 flex items-center justify-between">
        <span className="text-white text-sm font-mono">{title}</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-gray-300 border border-gray-500" />
          <div className="w-4 h-4 bg-gray-300 border border-gray-500" />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

