import React, { useState, useCallback, useRef, useEffect, Suspense, Component } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { NeuralNetwork } from '../3d/NeuralNetwork';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Terminal, Maximize2, Minimize2, Save, Code, FileCode, Download, Upload, Info, AlertTriangle } from 'lucide-react';
import * as THREE from 'three';

// Custom error boundary component
class ErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const templates = {
  simple: `# Define a simple neural network architecture
layers = [3, 4, 4, 3]  # Input, hidden, output layers

# Example input data
input_data = [0.5, 0.3, 0.8]

# This is a playground environment
# You can modify the code and see the neural network update
`,
  classification: `# Neural network for classification
layers = [4, 8, 8, 2]  # Input, hidden, output layers

# Example input data (features)
input_data = [0.2, 0.7, 0.5, 0.1]

# Example of how to process data
def process_data(data):
    # Normalize data
    return [x / sum(data) for x in data]

# Processed data would be used for prediction
# processed = process_data(input_data)
`,
  regression: `# Neural network for regression
layers = [5, 10, 6, 1]  # Input, hidden, output layers

# Example input data (features)
input_data = [0.2, 0.7, 0.5, 0.1, 0.9]

# Example of a simple activation function
def relu(x):
    return max(0, x)

# Example of forward propagation (simplified)
def forward(data, weights):
    # This is just a placeholder
    return sum(data) / len(data)
`,
  advanced: `# Advanced neural network with multiple components
layers = [6, 12, 8, 4]  # Input, hidden, output layers

# Example input data
input_data = [0.2, 0.7, 0.5, 0.1, 0.9, 0.3]

# Example of a more complex network architecture
class NeuralNetwork:
    def __init__(self, layers):
        self.layers = layers
        # Initialize weights and biases
        
    def forward(self, x):
        # Forward pass
        return x
        
    def backward(self, grad):
        # Backward pass
        pass
        
# Create network instance
# nn = NeuralNetwork(layers)
`
};

export function Playground() {
  const [code, setCode] = useState(templates.simple);
  const [layers, setLayers] = useState([3, 4, 4, 3]);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('simple');
  const [showTooltip, setShowTooltip] = useState(false);
  const editorRef = useRef(null);
  const [networkData, setNetworkData] = useState<number[]>([0.5, 0.3, 0.8]);
  const [error, setError] = useState<string | null>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Add keyboard shortcut for running code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
      // Parse the code to extract network architecture
      try {
        const layersMatch = value.match(/layers\s*=\s*\[([\d,\s]+)\]/);
        if (layersMatch) {
          const newLayers = layersMatch[1].split(',').map(n => parseInt(n.trim()));
          setLayers(newLayers);
        }

        const dataMatch = value.match(/input_data\s*=\s*\[([\d\.,\s]+)\]/);
        if (dataMatch) {
          const newData = dataMatch[1].split(',').map(n => parseFloat(n.trim()));
          setNetworkData(newData);
        }
      } catch (error) {
        console.error('Error parsing code:', error);
      }
    }
  };

  const runCode = useCallback(() => {
    setConsoleOutput(prev => [...prev, '> Running code...']);
    try {
      // Here you would typically run the code through a Python interpreter
      // For now, we'll just simulate some output
      setConsoleOutput(prev => [
        ...prev,
        `Network architecture: [${layers.join(', ')}]`,
        `Input data: [${networkData.join(', ')}]`,
        'Simulation complete.'
      ]);
    } catch (error) {
      setConsoleOutput(prev => [...prev, `Error: ${error}`]);
    }
  }, [layers, networkData]);

  const clearConsole = useCallback(() => {
    setConsoleOutput([]);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const changeTemplate = (template: string) => {
    setSelectedTemplate(template);
    setCode(templates[template as keyof typeof templates]);
    
    // Update console
    setConsoleOutput(prev => [...prev, `> Loaded ${template} template`]);
    
    // Parse the template to extract network architecture
    try {
      const layersMatch = templates[template as keyof typeof templates].match(/layers\s*=\s*\[([\d,\s]+)\]/);
      if (layersMatch) {
        const newLayers = layersMatch[1].split(',').map(n => parseInt(n.trim()));
        setLayers(newLayers);
      }

      const dataMatch = templates[template as keyof typeof templates].match(/input_data\s*=\s*\[([\d\.,\s]+)\]/);
      if (dataMatch) {
        const newData = dataMatch[1].split(',').map(n => parseFloat(n.trim()));
        setNetworkData(newData);
      }
    } catch (error) {
      console.error('Error parsing template:', error);
    }
  };

  const saveCode = () => {
    try {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `neural_network_${selectedTemplate}.py`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setConsoleOutput(prev => [...prev, '> Code saved to file']);
    } catch (error) {
      setConsoleOutput(prev => [...prev, `Error saving file: ${error}`]);
    }
  };

  const loadCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        setConsoleOutput(prev => [...prev, '> Code loaded from file']);
        
        // Parse the loaded code
        try {
          const layersMatch = content.match(/layers\s*=\s*\[([\d,\s]+)\]/);
          if (layersMatch) {
            const newLayers = layersMatch[1].split(',').map(n => parseInt(n.trim()));
            setLayers(newLayers);
          }

          const dataMatch = content.match(/input_data\s*=\s*\[([\d\.,\s]+)\]/);
          if (dataMatch) {
            const newData = dataMatch[1].split(',').map(n => parseFloat(n.trim()));
            setNetworkData(newData);
          }
        } catch (error) {
          console.error('Error parsing loaded code:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  // Error boundary for 3D visualization
  const handleError = useCallback((event: any) => {
    console.error('Error in 3D visualization:', event);
    setError('An error occurred while rendering the visualization.');
  }, []);

  // Fallback component for when Three.js fails to load or initialize
  const VisualizationFallback = () => (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-primary/20 p-4 mb-4">
        <Code size={32} className="text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium">Neural Network Visualization</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-md">
        The visualization couldn't be loaded. You can still use the code editor to experiment with neural network architectures.
      </p>
      <div className="text-xs text-muted-foreground border border-border/40 bg-card/50 p-3 rounded-md max-w-sm">
        <p>Current architecture: [{layers.join(', ')}]</p>
        <p className="mt-1">Input data: [{networkData.map((d: number) => d.toFixed(2)).join(', ')}]</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left panel - Code editor */}
      <div className={`border-r border-border/40 bg-background transition-all ${isFullscreen ? 'w-1/3' : 'w-1/2'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border/40 p-4">
            <div>
              <h2 className="font-mono text-lg font-semibold text-primary">Python Playground</h2>
              <p className="text-sm text-muted-foreground">
                Experiment with neural network architectures
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Info size={18} />
                </button>
                {showTooltip && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-md border bg-card p-4 shadow-md">
                    <h3 className="mb-2 text-sm font-medium">How to Use</h3>
                    <ul className="text-xs text-muted-foreground">
                      <li>• Modify the code to change the neural network</li>
                      <li>• Press Ctrl+Enter or click Run to execute</li>
                      <li>• The 3D visualization updates automatically</li>
                      <li>• Use templates for different network types</li>
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={toggleFullscreen}
                className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
          
          <div className="border-b border-border/40 bg-card/50 p-2">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <span className="text-xs font-medium text-muted-foreground">Templates:</span>
              {Object.keys(templates).map((template) => (
                <button
                  key={template}
                  onClick={() => changeTemplate(template)}
                  className={`whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTemplate === template
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {template.charAt(0).toUpperCase() + template.slice(1)}
                </button>
              ))}
              <div className="ml-auto flex items-center space-x-2">
                <button
                  onClick={saveCode}
                  className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80"
                >
                  <Download size={14} className="mr-1" />
                  Save
                </button>
                <label className="inline-flex cursor-pointer items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80">
                  <Upload size={14} className="mr-1" />
                  Load
                  <input
                    type="file"
                    accept=".py,.txt"
                    onChange={loadCode}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'JetBrains Mono',
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                suggestOnTriggerCharacters: true,
              }}
            />
          </div>

          <div className="border-t border-border/40 bg-card">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center space-x-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  onClick={runCode}
                >
                  <Play size={16} />
                  <span>Run Code</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center space-x-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                >
                  <Terminal size={16} />
                  <span>Console</span>
                </motion.button>
              </div>
              <span className="text-sm text-muted-foreground">
                Press Ctrl + Enter to run
              </span>
            </div>

            <AnimatePresence>
              {isConsoleOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border/40"
                >
                  <div className="flex h-48 flex-col bg-background/50 backdrop-blur">
                    <div className="flex items-center justify-between border-b border-border/40 px-4 py-2">
                      <span className="text-sm font-medium">Console Output</span>
                      <button
                        onClick={clearConsole}
                        className="rounded p-1 text-muted-foreground hover:text-foreground"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 font-mono text-sm">
                      {consoleOutput.length === 0 ? (
                        <div className="text-muted-foreground">
                          {"> Console output will appear here..."}
                        </div>
                      ) : (
                        consoleOutput.map((line, i) => (
                          <div key={i} className="text-muted-foreground">
                            {line}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right panel - Visualization */}
      <div className={`relative bg-background transition-all ${isFullscreen ? 'w-2/3' : 'w-1/2'}`}>
        <div className="absolute inset-0">
          {error ? (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <AlertTriangle size={48} className="mb-4 text-yellow-500" />
              <h3 className="mb-2 text-lg font-medium">Visualization Error</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                There was an error rendering the neural network visualization.
              </p>
              <button
                onClick={() => setError(null)}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Try Again
              </button>
            </div>
          ) : (
            <ErrorBoundary fallback={<VisualizationFallback />}>
              <Suspense fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="text-muted-foreground">Loading visualization...</p>
                  </div>
                </div>
              }>
                <Canvas
                  camera={{ position: [0, 0, 10], fov: 75 }}
                  style={{ background: 'hsl(var(--background))' }}
                  onCreated={state => {
                    state.gl.setClearColor(new THREE.Color('hsl(var(--background))'));
                  }}
                  onError={handleError}
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <NeuralNetwork
                    layers={layers}
                    color="hsl(var(--secondary))"
                    connectionColor="hsl(var(--secondary) / 0.3)"
                    data={networkData}
                  />
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    rotateSpeed={0.5}
                    maxDistance={20}
                    minDistance={5}
                  />
                  <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                </Canvas>
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border/40 bg-card/80 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Network Architecture</h3>
              <p className="text-xs text-muted-foreground">
                Layers: [{layers.join(', ')}]
              </p>
              {networkData.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Input: [{networkData.map(d => d.toFixed(2)).join(', ')}]
                </p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-xs font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => {
                // Reset camera position
                const controls = document.querySelector('canvas')?.parentElement?.querySelector('.orbit-controls');
                if (controls) {
                  (controls as any).reset();
                }
              }}
            >
              Reset View
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 