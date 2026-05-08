import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-dropdown-option',
  styleUrl: 'my-dropdown-option.css',
  shadow: true,
})
export class MyDropdownOption {
  @Prop() value!: string;
  @Prop() label!: string;
  @Prop({ mutable: true }) selected: boolean = false;

  render() {
    return (
      <div class={{ 'option': true, 'option--selected': this.selected }} role="option" aria-selected={String(this.selected)}>
        <span aria-hidden="true">{this.selected && '> '}</span>
        <span>{this.label}</span>
      </div>
    );
  }
}
