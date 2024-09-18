"use client";
import * as React from "react";
import { useRef, useState } from "react";
import { useModalAlert } from "@/app/context/ModalAlertContext";
import { CreditCardResponse } from "@/app/types/credit";


const CreditCardValidator = function CreditCardValidator() {
  const [creditCardNumber, setCreditCardNumber] = useState<string>('');
  const [disableButton, setDisableButton] = useState(true);
  const { openModal } = useModalAlert();
  const saveButton = useRef<HTMLButtonElement>(null);

  function showAlert(title:string, message: string, alertType: 'success' | 'error') {
    openModal(title, message, alertType);
  }

  function handleCreditCardInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length >= event.target.minLength) {
      setDisableButton(false);
      saveButton?.current?.classList.remove('cursor-not-allowed', 'bg-gray-400');
      saveButton?.current?.classList.add('bg-blue-800');
    }
    if (event.target.value.length < event.target.minLength) {
      setDisableButton(true);
      saveButton?.current?.classList.add('cursor-not-allowed', 'bg-gray-400');
      saveButton?.current?.classList.remove('bg-blue-800');
    }
    if(event.target.value.length >= event.target.maxLength) {
      return;
    }
    setCreditCardNumber(event.target.value);
  }

  async function validateCreditCard() {
    const url = "http://localhost:8080/api/v1/validate_credit_card";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({credit_card_number: Number(creditCardNumber)}),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json: CreditCardResponse = await response.json();
      const type = json.valid ? "success" : "error";
      showAlert(json.title, json.message, type);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div
        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Credit Card
          Validator</h5>
        <div>
          <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Credit Card Number</label>
          <input
            type="number"
            id="number"
            maxLength={20}
            minLength={14}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your card number"
            value={creditCardNumber}
            onChange={(event) => handleCreditCardInput(event)}
            required
          />
        </div>

        <button
          onClick={validateCreditCard}
          ref={saveButton}
          disabled={disableButton}
          type="submit"
          className="cursor-not-allowed mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg focus:ring-4 focus:outline-none "
        >
          Validate Card number
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>

    </>
  )
}

export default CreditCardValidator;