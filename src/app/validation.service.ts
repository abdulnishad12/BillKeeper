import { Injectable } from '@angular/core';
import { Utility } from './utility';


@Injectable( {
  providedIn: 'root'
})

// Validation methods: complete validation - false, not complete - true

export class ValidationService {
  maxLengthOfInput = 5;

  constructor() {}
  // Validation: length less than maxLengthOfInput and only positive number
  formValidationLengthAndPositive(validateInput: string, ) {
    return validateInput.length > this.maxLengthOfInput || +validateInput < 0;
  }
  // Validation: unique utility value and only chars
  formValidationUniqueAndOnlyChars(validateInput: string, utilitiesArray: Utility[]) {
    if (!/^[a-zA-Z]+$/.test(validateInput)) {
      return true;
    }
    for (const key of utilitiesArray) {
      if (key.utilityName.toLowerCase() === validateInput.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  /* Validation: length less than maxLengthOfInput and only positive number
  * Current counter value larger that previous counter value
   */
  formValidationPreviousCounterLargerThanCurrent(validateInput: string, compareUtilityName: string, utilitiesArray: Utility[]) {
    if (validateInput.length > this.maxLengthOfInput || +validateInput < 0) {
      return true;
    }
    for (const key of utilitiesArray) {
      if (compareUtilityName === key.utilityName) {
        if (+validateInput !== key.previousCounter && +validateInput > key.previousCounter) {
          if ( key.tariff !== 0 ) {
            return false;
          }
        }
      }
    }
    return true;
  }





}
