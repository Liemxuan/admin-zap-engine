import React, { useState, useRef, useEffect, useLayoutEffect, ReactNode } from 'react';

// Types
interface TooltipProps {
    children: ReactNode;
    delayDuration?: number;
}

interface TooltipTriggerProps {
    children: ReactNode;
    asChild?: boolean;
    className?: string; // Allow passing classes for styling the trigger
}

interface TooltipContentProps {
    children: ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    className?: string;
    sideOffset?: number;
}

// Context
type TooltipContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRect: DOMRect | null;
    updateTriggerRect: () => void;
};

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

const useTooltip = () => {
    const context = React.useContext(TooltipContext);
    if (!context) {
        throw new Error('Tooltip components must be used within a Tooltip provider');
    }
    return context;
};

// Components

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
};

export const Tooltip = ({ children, delayDuration = 200 }: TooltipProps) => {
    const [open, setOpen] = useState(false);
    const [pinned, setPinned] = useState(false);
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isHoveredRef = useRef(false);

    const updateTriggerRect = () => {
        if (wrapperRef.current) {
            setTriggerRect(wrapperRef.current.getBoundingClientRect());
        }
    };

    // Handle open/close with delay
    useEffect(() => {
        if (open) return;
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [open]);

    const handleOpen = () => {
        isHoveredRef.current = true;
        updateTriggerRect();

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (pinned) return; // If pinned, already open, no need to schedule open

        timeoutRef.current = setTimeout(() => {
            if (isHoveredRef.current) {
                updateTriggerRect();
                setOpen(true);
            }
        }, delayDuration);
    };

    const handleClose = () => {
        isHoveredRef.current = false;
        if (pinned) return; // Do not close if pinned

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        // Toggle pin state
        if (pinned) {
            setPinned(false);
            // If we are unpinning, checking hover state to decide whether to stay open would be nice,
            // but strictly `handleClose` logic relies on `isHoveredRef`.
            // If user clicked, they are likely inside. `isHoveredRef` should be true.
            // So it stays open until they leave.
        } else {
            setPinned(true);
            updateTriggerRect();
            setOpen(true); // Force open immediately
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    };

    return (
        <TooltipContext.Provider value={{ open, setOpen: (val) => val ? handleOpen() : handleClose(), triggerRect, updateTriggerRect }}>
            <div
                ref={wrapperRef}
                className="relative inline-flex"
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                onFocus={handleOpen}
                onBlur={handleClose}
                onClick={handleClick}
            >
                {children}
            </div>
        </TooltipContext.Provider>
    );
};

export const TooltipTrigger = ({ children, className = '' }: TooltipTriggerProps) => {
    return (
        <div className={`inline-flex ${className}`}>
            {children}
        </div>
    );
};

export const TooltipContent = ({ children, side = 'top', className = '', sideOffset = 4 }: TooltipContentProps) => {
    const { open, triggerRect } = useTooltip();
    const contentRef = useRef<HTMLDivElement>(null);
    const [finalSide, setFinalSide] = useState(side);

    // Auto-placement logic
    useLayoutEffect(() => {
        if (open && triggerRect && contentRef.current) {
            const contentRect = contentRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let newSide = side;

            // Simple flipping logic
            // TODO: Could be enhanced with robust checking of all sides, but this covers basic "screen edge" cases.
            if (side === 'top' && triggerRect.top - contentRect.height - sideOffset < 0) {
                newSide = 'bottom';
            } else if (side === 'bottom' && triggerRect.bottom + contentRect.height + sideOffset > viewportHeight) {
                newSide = 'top';
            } else if (side === 'left' && triggerRect.left - contentRect.width - sideOffset < 0) {
                newSide = 'right';
            } else if (side === 'right' && triggerRect.right + contentRect.width + sideOffset > viewportWidth) {
                newSide = 'left';
            }

            if (newSide !== finalSide) {
                setFinalSide(newSide);
            }
        }
    }, [open, triggerRect, side, sideOffset, finalSide]);

    if (!open) return null;

    let positionClasses = '';
    // CSS transform isn't needed for the wrapper-relative flow, standard tailwind positioning works well
    // except we need margin to simulate "offset" cleanly without overlapping

    switch (finalSide) {
        case 'top':
            positionClasses = 'bottom-full left-1/2 -translate-x-1/2 mb-2';
            break;
        case 'bottom':
            positionClasses = 'top-full left-1/2 -translate-x-1/2 mt-2';
            break;
        case 'left':
            positionClasses = 'right-full top-1/2 -translate-y-1/2 mr-2';
            break;
        case 'right':
            positionClasses = 'left-full top-1/2 -translate-y-1/2 ml-2';
            break;
    }

    return (
        <div
            ref={contentRef}
            className={`absolute z-50 overflow-hidden rounded-md border border-slate-200 bg-slate-950 px-3 py-1.5 text-xs text-slate-50 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 ${positionClasses} ${className}`}
            data-side={finalSide}
            role="tooltip"
        >
            {children}
        </div>
    );
};
