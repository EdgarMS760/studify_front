import { useCallback, useEffect, useRef, useState } from "react";

// Define a type for the function signature
// Allow any for internal flexibility
// No direct equivalent in JavaScript, so we will just use a function type

function useDebounceFunction(fn, waitTime = 400) {
  // Use ReturnType<typeof setTimeout> for portability
  const timeoutRef = useRef(null);
  const fnRef = useRef(fn);
  
  // Keep function reference fresh without triggering effect
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);
  
  // The actual debounced function
  const debouncedFn = useCallback((...args) => {
    // Clear any pending execution
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set up new timer
    timeoutRef.current = setTimeout(() => {
      fnRef.current(...args);
      timeoutRef.current = null;
    }, waitTime);
  }, [waitTime]);
  
  // Create the cancel function
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  
  // Assign the cancel method to the debounced function
  debouncedFn.cancel = cancel;
  
  return debouncedFn;
}

// Now the actual value debounce hook
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  const updateValue = useDebounceFunction(
    // Explicitly type the callback parameter
    (newValue) => setDebouncedValue(newValue),
    delay
  );
  
  useEffect(() => {
    // Update the debounced value
    updateValue(value);
    // Cleanup function to cancel the timeout on unmount or when value/delay changes
    return () => updateValue.cancel();
    // Ensure effect runs if delay changes
  }, [value, delay, updateValue]);
  
  return debouncedValue;
}