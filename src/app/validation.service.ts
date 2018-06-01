import { Injectable } from '@angular/core';
import { Utility } from './utility';


@Injectable( {
  providedIn: 'root'
})

// Validation methods: success validation - false, failed - true

export class ValidationService {
  maxLengthOfInput = 5;

  constructor() {}

  // Validation: length less than maxLengthOfInput and only positive number
  formValidationLengthAndPositive(validateInput: string): any {
    if (+validateInput < 0 || !/(0|[1-9][0-9]*)$/.test(validateInput)) {
      const message1 = 'Only positive number allowed';
      return [true, message1];
    }
    if (validateInput.length > this.maxLengthOfInput) {
      const message2 = 'Only five-digit number allowed';
      return [true, message2];
    }
    return [false, ''];
  }
  // Validation: unique utility value and only chars
  formValidationUniqueAndOnlyChars(validateInput: string, utilitiesArray: Utility[]): any {
    if (!/^[A-Za-z].*$/.test(validateInput)) {
      const message1 = 'First symbol must be char';
      return [true, message1];
    }
    for (const key of utilitiesArray) {
      if (key.utilityName.toLowerCase() === validateInput.toLowerCase()) {
        const message2 = 'Utility with this name already existing';
        return [true, message2];
      }
    }
    return [false, ''];
  }
  /* Validation: length less than maxLengthOfInput and only positive number
  * Current counter value larger that previous counter value
   */
  formValidationForCalculation(validateInput: string, compareUtilityName: string, utilitiesArray: Utility[]): any {
    if (validateInput.length > this.maxLengthOfInput || +validateInput < 0) {
      const message1 = 'Only five-digit positive number allowed';
      return [true, message1];
    }
    if (+validateInput < 0 || !/(0|[1-9][0-9]*)$/.test(validateInput)) {
      const message4 = 'Only numbers allow';
      return [true, message4];
    }
    for (const key of utilitiesArray) {
      if (compareUtilityName === key.utilityName) {
        if (+validateInput !== key.previousCounter && +validateInput > key.previousCounter) {
          if ( key.tariff !== 0 ) {
            return [false, ''];
          }
          const message2 = 'Tariff cant be equal 0';
          return [true, message2];
        }
        const message3 = 'Must be greater than Previous Counter';
        return [true, message3];
      }
    }
  }



}
