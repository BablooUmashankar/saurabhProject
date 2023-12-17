import {Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CharFieldValidator, NowWhiteSpaceValidator, NumericFieldValidator } from 'src/app/shared/Validators/Validation.validators';
import { HttpService } from 'src/app/shared/services/http.service';
import { DbOperation } from 'src/app/shared/utility/db-operation';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
  
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,OnDestroy {
  addForm: FormGroup;
  buttonText: string;
  dbOps: DbOperation;
  objRows: any[] = [];
  objRow: any;
  addedImagePath: string = "assets/images/noimage.png";
  fileToUpload: any;

  @ViewChild('nav') elnav: any;
  @ViewChild('file') elfile: ElementRef;

  formErrors = {
    name: '',
    title:'',
    isSave:'',
    link:''
  };
  validationMessage = {
    name: {
      required: 'Name is required',
      minlength: 'Name cannot be less than 1 char long',
      maxlength: 'Name cannot be more than 10 char long',
      validCharField: 'Name must be contains char and space only',
      noWhiteSpaceValidator: 'Only whitespace is not allowed'
    },
    title: {
      required: 'Title is required',
      minlength: 'Title cannot be less than 3 char long',
      maxlength: 'Title cannot be more than 10 char long',
      validCharField: 'Title must be contains char and space only',
      noWhiteSpaceValidator: 'Only whitespace is not allowed'
    },
    isSave: {
      required: 'Discount value is required',
      minlength: 'Discount value cannot be less than 1 char long',
      maxlength: 'Discount value cannot be more than 2 char long',
      NumericFieldValidator : 'Discount value must be contains number  only',
      noWhiteSpaceValidator: 'Only whitespace is not allowed'
    },
    link: {
      required: 'Link is required',
      minlength: 'Link cannot be less than 20 char long',
      maxlength: 'Link cannot be more than 100 char long',
      // validCharField: 'Link must be contains char and space only',
      noWhiteSpaceValidator: 'Only whitespace is not allowed'
    }
  
  };

  constructor(private _httpServices: HttpService, private _toastr: ToastrService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
    this.getData();
  }

  setFormState() {
    this.buttonText = "Add";
    this.dbOps = DbOperation.create;

    this.addForm = this._fb.group({
      id: [0],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        CharFieldValidator.validCharField,
       NowWhiteSpaceValidator.nowWhiteSpaceValidator
      ])],
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        CharFieldValidator.validCharField,
       NowWhiteSpaceValidator.nowWhiteSpaceValidator
      ])],
      isSave: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
        // CharFieldValidator.validCharField,
        NumericFieldValidator.validNumericField,
       NowWhiteSpaceValidator.nowWhiteSpaceValidator
      ])],
      link: ['', Validators.compose([
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(100),
       NowWhiteSpaceValidator.nowWhiteSpaceValidator
      ])],
    });

    this.addForm.valueChanges.subscribe(() => {
      this.onValueChanges();
    });
  }

  onValueChanges() {
    if (!this.addForm) {
      return;
    }

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = "";

      const control = this.addForm.get(field);

      if (control && control.dirty && control.invalid) {
        const message = this.validationMessage[field];

        for (const key of Object.keys(control.errors)) {
          if (key !== 'required') {
            this.formErrors[field] += message[key] + " ";
          }
        }
      }
    }
  }
 
  get ctrl() {
    return this.addForm.controls;
  }

  upload(files: any) {
    if (files.length === 0) {
      return;
    }

    let type = files[0].type;
    if (type.match(/image\/*/) == null) {
      this._toastr.error("Please Upload a Valid Image !!", "Category Master");
      this.elfile.nativeElement.value = "";
      this.addedImagePath = "assets/images/noimage.png";
    }

    this.fileToUpload = files[0];

    //read image
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.addedImagePath = reader.result.toString();
    }

  }

  Submit() {
    if (this.addForm.invalid) {
      return;
    }

    if (this.dbOps === DbOperation.create && !this.fileToUpload) {
      this._toastr.error("Please Upload a Image !!", "Category Master");
      return;
    }

    const formData = new FormData();
    formData.append("Id", this.addForm.value.id);
    formData.append("Name", this.addForm.value.name);
    formData.append("Image", this.fileToUpload, this.fileToUpload.name);
    formData.append("Title", this.addForm.value.title);
    formData.append("isSave", this.addForm.value.isSave);
    formData.append("link", this.addForm.value.link);


    switch (this.dbOps) {
      case DbOperation.create:
        this._httpServices.postImage(environment.BASE_API_PATH + "Category/Save/", formData).subscribe(res => {
          if (res.isSuccess) {
            this._toastr.success("Record Saved !!", "Category Master");
            this.resetForm();
          } else {
            this._toastr.error(res.errors[0], "Category Master");
          }
        });
        break;
      case DbOperation.update:
        this._httpServices.postImage(environment.BASE_API_PATH + "Category/Update", formData).subscribe(res => {
          if (res.isSuccess) {
            this._toastr.success("Record Updated !!", "Category Master");
            this.resetForm();
          } else {
            this._toastr.error(res.errors[0], "Category Master");
          }
        });
        break;
    }

  }

  resetForm() {
    this.addForm.reset({
      id: 0,
      name: '',
      title:'',
      isSave:'',
      link:''
    });

    this.buttonText = "Add";
    this.elfile.nativeElement.value = "";
    this.addedImagePath = "assets/images/noimage.png";
    this.dbOps = DbOperation.create;
    this.getData();
    this.elnav.select('viewtab');
  }

  cancelForm() {
    this.addForm.reset({
      id: 0,
      name: ''
    });

    this.buttonText = "Add";
    this.elfile.nativeElement.value = "";
    this.addedImagePath = "assets/images/noimage.png";
    this.dbOps = DbOperation.create;
    this.elnav.select('viewtab');
  }

  getData() {
    this._httpServices.get(environment.BASE_API_PATH + "Category/GetAll").subscribe(res => {
      if (res.isSuccess) {
        this.objRows = res.data;
      } else {
        this._toastr.error(res.errors[0], "Category Master");
      }
    });
  }

  Edit(id: number) {
    this.buttonText = "Update";
    this.dbOps = DbOperation.update;
    this.elnav.select('addtab');

    this.objRow = this.objRows.find(x => x.id === id);
    this.addForm.patchValue(this.objRow);
    this.addedImagePath = this.objRow.imagePath;
  }


  Delete(id: number) {
    let obj = {
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
        this._httpServices.post(environment.BASE_API_PATH + "Category/Delete", obj).subscribe(res => {
          if (res.isSuccess) {
            //this._toastr.success("Record Deleted !!", "Category Master");
            swalWithBootstrapButtons.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            )
            this.getData();
          } else {
            this._toastr.error(res.errors[0], "Category Master");
          }
        });
      } else if (
        /* Read more about handling dismissals below */
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
    //console.log(event);
    this.addForm.reset({
      id: 0,
      name: '',
      title:'',
      isSave:'',
      link:''
    });

    this.buttonText = "Add";
    this.dbOps = DbOperation.create;
    this.elfile.nativeElement.value = "";
    this.addedImagePath = "assets/images/noimage.png";
  }

}
 
