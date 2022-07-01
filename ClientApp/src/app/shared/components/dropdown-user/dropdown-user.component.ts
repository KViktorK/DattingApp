import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-user',
  templateUrl: './dropdown-user.component.html',
  styleUrls: ['./dropdown-user.component.scss'],
})
export class DropdownUserComponent implements OnInit {
  options: any = [
    { name: 'Profile' },
    {
      name: 'LogOut',
    },
  ];
  @Output() currentValueChange = new EventEmitter();
  @Output() logout = new EventEmitter();
 
  public dropdownOpen: boolean = false;
  
  public get dropdownElement(): Element {
    return this.elem.nativeElement.querySelector('.dropdown-list');
  }

  constructor(private elem: ElementRef) {}

  ngOnInit(): void {
   
  }

 
  closeDropdown() {
    this.dropdownElement.setAttribute('aria-expanded', 'false');
    this.dropdownOpen = false;
  }

  select(value) {
    this.closeDropdown();
    this.currentValueChange.emit(value);
    if(value.name === "LogOut"){
    this.logout.emit(null)
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdownElement.setAttribute(
      'aria-expanded',
      this.dropdownOpen ? 'true' : 'false'
    );
  }
}
