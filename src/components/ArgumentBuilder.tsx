import React, { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  RotateCcw, 
  CheckCircle2, 
  Target, 
  FileText, 
  Link, 
  TrendingUp,
  AlertTriangle,
  Users,
  Scale,
  Clock,
  Star,
  Zap
} from 'lucide-react';

interface ArgumentComponent {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category: 'core' | 'evidence' | 'structure' | 'advanced';
}

interface DroppedComponent extends ArgumentComponent {
  position: number;
}

const ArgumentBuilder = () => {
  const [availableComponents] = useState<ArgumentComponent[]>([
    // Core Components
    { 
      id: 'claim', 
      label: 'Claim', 
      description: 'Your main argument or position',
      icon: Target,
      color: 'bg-blue-100 border-blue-300 text-blue-800',
      category: 'core'
    },
    { 
      id: 'evidence', 
      label: 'Evidence', 
      description: 'Facts and data supporting your claim',
      icon: FileText,
      color: 'bg-green-100 border-green-300 text-green-800',
      category: 'evidence'
    },
    { 
      id: 'warrant', 
      label: 'Warrant', 
      description: 'Explains why evidence supports claim',
      icon: Link,
      color: 'bg-purple-100 border-purple-300 text-purple-800',
      category: 'core'
    },
    { 
      id: 'impact', 
      label: 'Impact', 
      description: 'Why your argument matters',
      icon: TrendingUp,
      color: 'bg-red-100 border-red-300 text-red-800',
      category: 'core'
    },
    
    // Evidence Types
    { 
      id: 'statistics', 
      label: 'Statistics', 
      description: 'Numerical data and percentages',
      icon: TrendingUp,
      color: 'bg-emerald-100 border-emerald-300 text-emerald-800',
      category: 'evidence'
    },
    { 
      id: 'expert-testimony', 
      label: 'Expert Testimony', 
      description: 'Quotes from credible authorities',
      icon: Users,
      color: 'bg-amber-100 border-amber-300 text-amber-800',
      category: 'evidence'
    },
    { 
      id: 'historical-example', 
      label: 'Historical Example', 
      description: 'Past events as precedent',
      icon: Clock,
      color: 'bg-orange-100 border-orange-300 text-orange-800',
      category: 'evidence'
    },
    
    // Structure Components
    { 
      id: 'counter-argument', 
      label: 'Counter-Argument', 
      description: 'Opposing viewpoint consideration',
      icon: Scale,
      color: 'bg-slate-100 border-slate-300 text-slate-800',
      category: 'structure'
    },
    { 
      id: 'rebuttal', 
      label: 'Rebuttal', 
      description: 'Response to counter-arguments',
      icon: Zap,
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      category: 'structure'
    },
    
    // Advanced Components
    { 
      id: 'fallacy-check', 
      label: 'Fallacy Check', 
      description: 'Identify logical fallacies',
      icon: AlertTriangle,
      color: 'bg-rose-100 border-rose-300 text-rose-800',
      category: 'advanced'
    },
    { 
      id: 'credibility', 
      label: 'Source Credibility', 
      description: 'Establish source reliability',
      icon: Star,
      color: 'bg-indigo-100 border-indigo-300 text-indigo-800',
      category: 'advanced'
    }
  ]);

  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const categoryColors = {
    core: 'bg-blue-50 border-blue-200',
    evidence: 'bg-green-50 border-green-200', 
    structure: 'bg-purple-50 border-purple-200',
    advanced: 'bg-orange-50 border-orange-200'
  };

  const categoryLabels = {
    core: 'Core Components',
    evidence: 'Evidence Types',
    structure: 'Structure Elements',
    advanced: 'Advanced Tools'
  };

  const groupedComponents = availableComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, ArgumentComponent[]>);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === 'argument-structure') {
      const component = availableComponents.find(c => c.id === draggableId);
      if (component && !droppedComponents.find(dc => dc.id === draggableId)) {
        const newComponent: DroppedComponent = {
          ...component,
          position: destination.index
        };
        
        const newDroppedComponents = [...droppedComponents];
        newDroppedComponents.splice(destination.index, 0, newComponent);
        
        // Update positions
        const updatedComponents = newDroppedComponents.map((comp, index) => ({
          ...comp,
          position: index
        }));
        
        setDroppedComponents(updatedComponents);
        
        // Check if argument is complete
        const hasCore = updatedComponents.some(c => ['claim', 'evidence', 'warrant', 'impact'].includes(c.id));
        setIsComplete(updatedComponents.length >= 4 && hasCore);
      }
    } else if (source.droppableId === 'argument-structure' && destination.droppableId === 'argument-structure') {
      // Reorder within argument structure
      const newComponents = Array.from(droppedComponents);
      const [reorderedItem] = newComponents.splice(source.index, 1);
      newComponents.splice(destination.index, 0, reorderedItem);
      
      const updatedComponents = newComponents.map((comp, index) => ({
        ...comp,
        position: index
      }));
      
      setDroppedComponents(updatedComponents);
    }
  }, [droppedComponents, availableComponents]);

  const removeComponent = (id: string) => {
    setDroppedComponents(prev => prev.filter(comp => comp.id !== id));
    setIsComplete(false);
  };

  const resetArgument = () => {
    setDroppedComponents([]);
    setIsComplete(false);
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {/* Available Components */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-4 md:space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Available Components</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetArgument}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
            
            {Object.entries(groupedComponents).map(([category, components]) => (
              <Card key={category} className={`${categoryColors[category as keyof typeof categoryColors]} border-2`}>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                    {categoryLabels[category as keyof typeof categoryLabels]}
                  </h4>
                  <Droppable droppableId={`category-${category}`} isDropDisabled>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3"
                      >
                        {components.map((component, index) => {
                          const isUsed = droppedComponents.some(dc => dc.id === component.id);
                          const IconComponent = component.icon;
                          
                          return (
                            <Draggable
                              key={component.id}
                              draggableId={component.id}
                              index={index}
                              isDragDisabled={isUsed}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`
                                    group relative p-3 rounded-lg border-2 transition-all duration-200
                                    ${component.color}
                                    ${isUsed 
                                      ? 'opacity-50 cursor-not-allowed' 
                                      : snapshot.isDragging 
                                        ? 'cursor-grabbing shadow-xl scale-110 rotate-3 z-50'
                                        : 'cursor-grab hover:shadow-md hover:scale-[1.02] active:cursor-grabbing'
                                    }
                                  `}
                                  style={provided.draggableProps.style}
                                >
                                  <div className="flex items-start gap-2">
                                    <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div className="min-w-0 flex-1">
                                      <div className="font-medium text-sm leading-tight">
                                        {component.label}
                                      </div>
                                      <div className="text-xs opacity-80 mt-1 leading-tight">
                                        {component.description}
                                      </div>
                                    </div>
                                  </div>
                                  {isUsed && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Argument Structure */}
          <div className="lg:col-span-1 xl:col-span-2">
            <div className="sticky top-4 md:top-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Argument Structure</h3>
              
              <Droppable droppableId="argument-structure">
                {(provided, snapshot) => (
                  <Card className={`
                    min-h-80 md:min-h-96 border-2 transition-all duration-300
                    ${snapshot.isDraggingOver 
                      ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20 scale-[1.01]' 
                      : droppedComponents.length > 0 
                      ? 'border-border bg-card shadow-sm' 
                      : 'border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/30'
                    }
                  `}>
                    <CardContent className="p-4">
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-72 md:min-h-80 space-y-3"
                      >
                        {droppedComponents.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-72 md:h-80 text-center">
                            <Target className="w-12 h-12 text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground font-medium">Drop components here</p>
                            <p className="text-sm text-muted-foreground/70 mt-1">
                              Build your argument step by step
                            </p>
                          </div>
                        ) : (
                          droppedComponents.map((component, index) => {
                            const IconComponent = component.icon;
                            return (
                              <Draggable key={component.id} draggableId={component.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`
                                      group p-3 rounded-lg border-2 transition-all duration-200
                                      ${component.color}
                                      ${snapshot.isDragging 
                                        ? 'shadow-xl scale-105 cursor-grabbing z-50' 
                                        : 'hover:shadow-md hover:scale-[1.02] cursor-grab'
                                      }
                                    `}
                                    style={provided.draggableProps.style}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-xs font-bold">
                                          {index + 1}
                                        </span>
                                        <IconComponent className="w-4 h-4" />
                                        <span className="font-medium text-sm">{component.label}</span>
                                      </div>
                                      <button
                                        onClick={() => removeComponent(component.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-background/20 rounded"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })
                        )}
                        {provided.placeholder}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Droppable>

              {/* Completion Status */}
              {droppedComponents.length > 0 && (
                <div className="mt-4">
                  <Card className={`border-2 ${isComplete ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        {isComplete ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">Argument Complete!</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <span className="font-medium text-amber-800">
                              Add {4 - droppedComponents.length} more components
                            </span>
                          </>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {droppedComponents.length} of {availableComponents.length} components used
                      </div>
                      <div className="mt-2 h-2 bg-background/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${isComplete ? 'bg-green-500' : 'bg-amber-500'}`}
                          style={{ width: `${(droppedComponents.length / 4) * 100}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ArgumentBuilder;