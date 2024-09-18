'use client';
import * as React from "react";
import { createContext, useState, useContext } from "react";

interface ModalAlertProps {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
    openModal: (title: string, message: string, alertType: 'success' | 'error') => void;
}

const ModalAlertContext = createContext<ModalAlertProps | undefined>(undefined);

const ModalAlertProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [type, setType] = useState<'success' | 'error'>('error');

    function openModal (newTitle: string, newMessage: string, alertType: 'success' | 'error') {
        setTitle(newTitle);
        setMessage(newMessage);
        setType(alertType);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <ModalAlertContext.Provider value={{isOpen, title, message, type, onClose: closeModal, openModal}}>
            {children}
            {isOpen && (
              <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <div
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                  <div className="sm:flex sm:items-start">
                                      <div
                                        className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${type === 'success' ? 'bg-green-100' : 'bg-red-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                                          {type === 'success' ? (
                                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 13l4 4L19 7"/>
                                            </svg>
                                          ) : (
                                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                                            </svg>
                                          )}
                                      </div>
                                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">

                                          <h3 className="text-base font-semibold leading-6 text-gray-900"
                                              id="modal-title">{title}</h3>
                                          <div className="mt-2">
                                              <p className="text-sm text-gray-500">{message}</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button
                                    onClick={() => {
                                        closeModal()
                                    }}
                                    onPaste={() => {
                                        closeModal()
                                    }}
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  >
                                      Ok
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            )}
        </ModalAlertContext.Provider>
    )
}

const useModalAlert = () => {
    const context = useContext(ModalAlertContext);
    if (!context) {
        throw new Error("useModalAlert must be used within a ModalAlertProvider");
    }
    return context;
};

export { ModalAlertProvider, useModalAlert };