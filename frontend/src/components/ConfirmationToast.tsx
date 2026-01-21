import React from 'react';
import toast, { type Toast } from 'react-hot-toast';

interface ConfirmationToastProps {
    t: Toast;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmationToast: React.FC<ConfirmationToastProps> = ({
    t,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Procees',
    cancelText = 'Cancel'
}) => {
    return (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
                <div className="flex items-center">
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col border-l border-gray-200">
                <button
                    onClick={() => {
                        onConfirm();
                        toast.dismiss(t.id);
                    }}
                    className="w-full border-b border-gray-200 rounded-tr-xl p-3 flex items-center justify-center text-sm font-bold text-[#0088cc] hover:bg-gray-50 focus:outline-none"
                >
                    {confirmText}
                </button>
                <button
                    onClick={() => {
                        if (onCancel) onCancel();
                        toast.dismiss(t.id);
                    }}
                    className="w-full rounded-br-xl p-3 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none"
                >
                    {cancelText}
                </button>
            </div>
        </div>
    );
};

export default ConfirmationToast;
