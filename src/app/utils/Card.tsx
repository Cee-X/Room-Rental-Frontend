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
        className={clsx('px-4 py-2 text-lg font-semibold', className)}
        ref={ref}
        {...props}
        />
));

CardTitle.displayName = 'CardTitle';


const CardDescription = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
        <div 
        className={clsx('px-4 py-2 text-sm font-bold', className)}
        ref={ref}
        {...props}
        />
));

CardDescription.displayName = 'CardDescription';

const CardPrice = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
        <div
        className={clsx('px-4 py-2 text-md font-light', className)}
        ref={ref}
        {...props}
        />
));

CardPrice.displayName = 'CardPrice';


const CardLocation = React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className, ...props}, ref) => (
        <div
        className={clsx('px-4 py-2 text-md font-semibold', className)}
        ref={ref}
        {...props}
        />
));


CardLocation.displayName = 'CardLocation';

export { Card,CardTitle,CardDescription, CardPrice, CardLocation };