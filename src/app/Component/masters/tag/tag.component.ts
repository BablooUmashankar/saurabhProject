import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CharFieldValidator,NowWhiteSpaceValidator } from 'src/app/shared/Validators/Validation.validators';
import { HttpService } from 'src/app/shared/services/http.service';
import { DbOperation } from 'src/app/shared/utility/db-operation';
import { environment } from 'src/environments/environments.prod';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit , OnDestroy {

  addForm: FormGroup;
  buttonText: string;
  dbOps: DbOperation;
  objRows: any[] = [];
  objRow: any;


  @ViewChild('nav') elnav: any;
  formErrors= {
    name : ''
  };
validationMessage={
  
  name: {
    required: 'Name is required',
    minlength: 'Name can not be less than 1 char',
    maxlength: 'Name can not be more than 10 char',
    validCharField:'Name Char and Space only',
    NowWhiteSpaceValidator:' only whiteSpace not allow'
  }
};

  constructor(
    private _httpServices: HttpService,
    private _toastr: ToastrService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setFormState();
    this.getData();
  }
  setFormState() {
    this.buttonText = 'Add';
    this.dbOps = DbOperation.create;
    this.addForm = this._fb.group({
      id: [0],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10),
          CharFieldValidator.validCharField,
          NowWhiteSpaceValidator.nowWhiteSpaceValidator
        ])
      ]
    });
    this.addForm.valueChanges.subscribe(() => {
  this.onValueChange();
    });
  }
    onValueChange(){
if(!this.addForm){
return;
}
  for (const field of Object.keys(this.formErrors)){
 this.formErrors[field]="";
 const control = this.addForm.get(field);
 if(control && control.dirty && control.invalid){
const message = this.validationMessage[field];

for(const key of Object.keys(control.errors)){
  if(key !== 'required'){
    this.formErrors[field] += message[key] + " ";
  }
}
 }

  }
 }
  get ctrl() {
    return this.addForm.controls;
  }

  Submit() {
    if (this.addForm.invalid) {
      return;
    }
    switch (this.dbOps) {
      case DbOperation.create:
        this._httpServices
          .post(
            environment.BASE_API_PATH + 'TagMaster/Save',
            this.addForm.value
          )
          .subscribe(res => {
            if (res.isSuccess) {
              this._toastr.success('Record Saved !!', 'Tag Master');
              this.resetForm();
            } else {
              this._toastr.error(res.errors[0], 'Tag Master');
            }
          });
        break;
      case DbOperation.update:
        this._httpServices
          .post(
            environment.BASE_API_PATH + 'TagMaster/Update',
            this.addForm.value
          )
          .subscribe(res => {
            if (res.isSuccess) {
              this._toastr.success('Record Updated !!', 'Tag Master');
              this.resetForm();
            } else {
              this._toastr.error(res.errors[0], 'Tag Master');
            }
          });
        break;
    }
  }

  resetForm() {
    this.addForm.reset({
      id: 0,
      name: ''
    });
    this.buttonText = 'Add';
    this.dbOps = DbOperation.create;
    this.getData();
    this.elnav.select('viewtab');
  }

  cancelForm() {
    this.addForm.reset({
      id: 0,
      name: '',
    });
    this.buttonText = 'Add';
    this.dbOps = DbOperation.create;
    this.elnav.select('viewtab');
  }
  getData() {
    this._httpServices
      .get(environment.BASE_API_PATH + 'TagMaster/GetAll')
      .subscribe(res => {
        // console.log("Data =>", res);
        
        if (res.isSuccess) {
          this.objRows = res.data;
          // debugger;
        } else {
          this._toastr.error(res.errors[0], 'Tag Master');
        }
      });
  }

  Edit(id: number) {
    this.buttonText = 'Update';
    this.dbOps = DbOperation.update;
    this.elnav.select('addtab');
    this.objRow = this.objRows.find(x => x.id === id);
    this.addForm.patchValue(this.objRow);
  }
  Delete(id: number) {
    let obj ={
      id: id
    };
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpServices
        .post(environment.BASE_API_PATH + "TagMaster/Delete" ,obj)
        .subscribe(res => {
          if (res.isSuccess) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your Record has been deleted.',
              'success'
            )
           this.getData();
          } else {
            this._toastr.error(res.errors[0], 'Tag Master');
          }
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your record is safe :)',
          'error'
        )
      }
    })
  }

  ngOnDestroy() {
    this.objRows = null;
    this.objRow = null;
  }

  tabChange(event: any) {
    this.addForm.reset({
      id: 0,
      name: ''
    });
    this.buttonText = 'Add';
    this.dbOps = DbOperation.create;
  }
}



