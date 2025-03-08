import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="p-8 bg-background text-foreground min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Test Component</h1>
      <p>If you can see this, the basic React rendering is working.</p>
    </div>
  );
};

export default TestApp; 