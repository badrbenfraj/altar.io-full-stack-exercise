import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LiveComponent } from '@ui/components';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, LiveComponent],
  exports: [CommonModule, RouterModule, FormsModule, LiveComponent]
})
export class SharedModule {}
