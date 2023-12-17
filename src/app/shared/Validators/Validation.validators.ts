
// /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';


export class TextFieldValidator {
  static validTextField(fc: FormControl) {
    if (fc.value != undefined && fc.value != "" && fc.value != null) {
      const regex = /^[0-9a-zA-Z ]+$/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validTextField: true };
      }
    } else {
      return null;
    }
  }
}




//numeric

export class NumericFieldValidator {
  static validNumericField(fc: FormControl) {
    if (fc.value != undefined && fc.value != "" && fc.value != null) {
      const regex =  /[0-9]+/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validNumericField: true };
      }
    } else {
      return null;
    }
  }
}


//Char And Field

export class CharFieldValidator {
    static validCharField(fc: FormControl) {
      if (fc.value != undefined && fc.value != '' && fc.value != null) {
        const regex =  /^[a-zA-Z]+$/;
        if (regex.test(fc.value)) {
          return null;
        } else {
          return { validCharField: true };
        }
      } else {
        return null;
      }
    }
  }


  
  
  export class EmailField {
    static emailField(fc: FormControl) {
      if (fc.value != undefined && fc.value != '' && fc.value != null) {
        const regex =/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
        if (regex.test(fc.value)) {
          return null;
        } else {
          return { validEmail: true };
        }
      } else {
        return null;
      }
    }
  }

// whiteSpace Validators


export class NowWhiteSpaceValidator {
    static nowWhiteSpaceValidator(fc: FormControl) {
      if (fc.value != undefined && fc.value != '' && fc.value != null) {
       const isWhiteSpace = (fc.value.toString().trim().length === 0)
        if(!isWhiteSpace) {
          return null;
        } else {
          return { nowWhiteSpaceValidator : true };
        }
      } else { 
        return null;
      }
    }
  }

//   // Validation two field

//   export function MustMatchValidator (controlName : string, matchingControlName : string) {
//     return (formGroup : FormGroup) => {
//     // const control = formGroup.get(controlName);
//     const control = formGroup.controls[controlName];
//     const matchingControl = formGroup.controls[matchingControlName];

//   if(matchingControl.errors && !matchingControl.errors['mustMatch']){

//   }


// if (control.value != matchingControl.value){
//     matchingControl.setErrors( {mustMatch : true})

// }else{
//     matchingControl
// }

//   }
// }


// Validation two field

export function MustMatchValidator (controlName : string, matchingControlName : string) {
  return (ctrl : AbstractControl) :ValidationErrors | null => {
  // const control = formGroup.get(controlName);
  const control = ctrl.get(controlName);
  const matchingControl = ctrl.get(matchingControlName);

if(matchingControl.errors && !matchingControl.errors['mustMatch']){
return null ;
}


if (control.value != matchingControl.value){
  matchingControl.setErrors( {mustMatch : true})

}else{
  matchingControl.setErrors(null);
}
return null;
}
}






