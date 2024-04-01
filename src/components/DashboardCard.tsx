// Import React and ReactNode from the 'react' package
// ReactNode is a type that can be used to type-check children props
import React, { ReactNode } from "react";

// Define an interface named 'DashboardCardProps' to specify the props that the DashboardCard component expects
// Each property in the interface is optional, indicated by the '?' after the property name
// 'title' is a required string
// 'description' is an optional string
// 'buttonText' is an optional string
// 'onButtonClick' is an optional function that takes no arguments and returns nothing
// 'children' is an optional ReactNode, which can be any valid React child (e.g., JSX elements, strings, etc.)
interface DashboardCardProps {
  title: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  children?: ReactNode;
}

// Define a functional component named 'DashboardCard' that takes 'DashboardCardProps' as its props
// This component is typed with React.FC, which is a generic type provided by React for functional components
// The props are destructured in the function's parameter list for easier access within the component
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  children,
}) => {
  // Return a JSX element representing the card
  // The card is a div with various CSS classes for styling
  // Inside the div, there are conditionally rendered elements based on the props
  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out max-h-87 overflow-auto">
      // Display the title as a heading with specific styling
      <h2 className="font-semibold text-xl text-indigo-600">{title}</h2>
      // If 'description' is provided, display it as a paragraph with specific
      styling
      {description && <p className="mt-2">{description}</p>}
      // Render any children passed to the component
      {children}
      // If both 'buttonText' and 'onButtonClick' are provided, render a button
      with specific styling and an onClick handler
      {buttonText && onButtonClick && (
        <button
          className="mt-4 px-4 py-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

// Export the DashboardCard component as the default export of this module
export default DashboardCard;
