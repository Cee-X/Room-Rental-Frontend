import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogOverlay = AlertDialogPrimitive.Overlay;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogPrimitive.AlertDialogContentProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
                <AlertDialogPrimitive.Content {...props} ref={forwardedRef} className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
                    {children}
                </AlertDialogPrimitive.Content>
        );
    }
    );

AlertDialogContent.displayName = 'AlertDialogContent';

const AlertDialogTitle = React.forwardRef<HTMLDivElement, AlertDialogPrimitive.AlertDialogTitleProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <AlertDialogPrimitive.Title {...props} ref={forwardedRef} className='text-lg m-0 font-semibold'>
                {children}
            </AlertDialogPrimitive.Title>
        );
    }
);

AlertDialogTitle.displayName = 'AlertDialogTitle';

const AlertDialogDescription = React.forwardRef<HTMLDivElement, AlertDialogPrimitive.AlertDialogDescriptionProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <AlertDialogPrimitive.Description {...props} ref={forwardedRef} className='text-md mt-4 mb-5'>
                {children}
            </AlertDialogPrimitive.Description>
        );
    }
);

AlertDialogDescription.displayName = 'AlertDialogDescription';

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogPrimitive.AlertDialogCancelProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <AlertDialogPrimitive.Cancel {...props} ref={forwardedRef} className='text-sm m-0 font-semibold text-[#00364D]'>
                {children}
            </AlertDialogPrimitive.Cancel>
        );
    }
);

AlertDialogCancel.displayName = 'AlertDialogCancel';

const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogPrimitive.AlertDialogActionProps>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <AlertDialogPrimitive.Action {...props} ref={forwardedRef} className='text-sm m-0 font-semibold text-[#00364D]'>
                {children}
            </AlertDialogPrimitive.Action>
        );
    }
);

AlertDialogAction.displayName = 'AlertDialogAction';

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction };