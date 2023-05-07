import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
// Trong đoạn mã này, `Directive`, `HostListener`, và `HostBinding` là các decorator được import từ module `@angular/core`.
// `@Directive` được sử dụng để định nghĩa một directive trong Angular. Trong ví dụ này, directive có tên là `DropdownDirective` và có selector là `[appDropdown]`.
// `@HostBinding` được sử dụng để kết nối một thuộc tính của directive với một thuộc tính của phần tử HTML mà directive được áp dụng. Trong ví dụ này, `@HostBinding('class.open')` được sử dụng để liên kết thuộc tính `isOpen` của directive với thuộc tính `class` của phần tử HTML. 
// Khi `isOpen` được đặt là `true`, thuộc tính `class` của phần tử HTML sẽ được thêm vào `open`.
// `@HostListener` được sử dụng để đăng ký một sự kiện lắng nghe của directive trên phần tử HTML mà directive được áp dụng. 
// Trong ví dụ này, `@HostListener('click')` được sử dụng để đăng ký sự kiện `click` trên phần tử HTML. Khi sự kiện `click` xảy ra, phương thức `toggleOpen()` sẽ được gọi để chuyển giá trị của `isOpen` sang trạng thái ngược lại.