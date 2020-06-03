import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/api/data.service';
import { environment } from 'src/environments/environment';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})


export class PetListComponent implements OnInit {

  petForm: FormGroup;
  pets: any = [];
  selectedPetData: any = {
    name: '',
    age: '',
    address: '',
    ownerEmail: sessionStorage.getItem("email")
  };
  isAdd: boolean = true;
  submitted: boolean = false;
  baseUrl: string = `${environment.baseUrl}/pets`;

  style2: any = { backgroundColor: 'green', color: 'white' };
  defaultStyle: any = { backgroundColor: 'orange', color: '' };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.petForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required])
      });
    this.getPets();
  }
  /**
  * @description This method fetches all pets by calling service method
  */
  getPets = () => {
    this.dataService.getData(this.baseUrl).subscribe((response) => {
      //console.log(response);
      this.pets = response;
    },
      (error) => {
        console.log(error);
      },
      () => {

      })
  }
  /**
   * @description This method adds a pet by calling service method
   */
  addPet = () => {
    this.submitted = true;
    this.dataService.addData(`${this.baseUrl}`, this.selectedPetData).subscribe((response) => {
      console.log(response);
      this.getPets();
    },
      (error) => {
        console.log(error);
      },
      () => {

      })
  }


  /* This function attaches the pet list data to DOM and render only the new changes */
  trackById = (index: number, pet: any) => {
    return pet.id;
  }

  /**
   * @description This function deletes the pet by calling service method
   *  @param id
   */
  deletePet = (id) => {
    this.dataService.deleteData(`${this.baseUrl}/${id}`).subscribe((response) => {
      console.log(response);
      this.getPets();
    },
      (error) => {
        console.log(error);
      },
      () => {

      })
  }
  /**
  * @description This method updates a pet by calling service method
  */
  updatePet = () => {
    this.submitted = true;
    this.dataService.updateData(`${this.baseUrl}/${this.selectedPetData.id}`, this.selectedPetData).subscribe((response) => {
      console.log(response);

      this.getPets();
      alert("Pet updated successfully");
    },
      (error) => {
        console.log(error);
      },
      () => {

      })
  }


  /**
   * @description This function holds the selected pet data into a variable
   * @param pet
   */
  onSelect = (pet) => {
    this.selectedPetData = pet;
    this.isAdd = false;
  }
/**
 * @description This method calls either to adds/updates a pet
 * @param petRef
 */
  submit = (petRef) => {
    this.submitted = true;
    if (petRef.valid) {
      if (this.isAdd) {
        this.addPet();
      }
      else {
        this.updatePet();
      }
    }
  }

}




