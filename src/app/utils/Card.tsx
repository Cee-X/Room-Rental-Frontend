import clsx from "clsx";
import * as React from "react";

const Card = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
        <div
            className={clsx(
                'bg-white shadow-lg rounded-lg overflow-hidden',
                className
            )}
            ref={ref}
            {...props}
        />
) );


Card.displayName = 'Card';

const CardTitle = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
        <div
        className={clsx('px-4 pt-2 text-xl font-semibold text-gray-900', className)}
        ref={ref}
        {...props}
        />
));

CardTitle.displayName = 'CardTitle';


const CardDescription = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
        <div 
        className={clsx('px-4 text-lg font-normal text', className)}
        ref={ref}
        {...props}
        />
));

CardDescription.displayName = 'CardDescription';

const CardPrice = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
        <div
        className={clsx('px-4 pt-2 text-md text-gray-600', className)}
        ref={ref}
        {...props}
        />
));

CardPrice.displayName = 'CardPrice';


const CardLocation = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
        <div
        className={clsx('px-4 py-2 text-md text-gray-500', className)}
        ref={ref}
        {...props}
        />
));


CardLocation.displayName = 'CardLocation';



export { Card,CardTitle,CardDescription, CardPrice, CardLocation };