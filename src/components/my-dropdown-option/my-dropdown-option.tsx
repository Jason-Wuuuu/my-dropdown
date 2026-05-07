import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'my-dropdown-option',
  styleUrl: 'my-dropdown-option.css',
  shadow: true,
})
export class MyDropdown {
  @Prop() value!: string;
  @Prop() label!: string;
  @Prop() selected: boolean = false;

  render() {
    return (
      <div>
        <span>{this.selected && 'v '}</span>
        <span>{this.label}</span>
      </div>
    );
  }
}
