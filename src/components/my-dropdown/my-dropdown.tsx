import { Element, Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'my-dropdown',
  styleUrl: 'my-dropdown.css',
  shadow: true,
})
export class MyDropdown {
  @Element() el!: HTMLElement;

  @Prop() label?: string;

  @State() isOpen: boolean = false;
  @State() selectedValues: Set<string> = new Set();

  @State() filterText: string = '';

  componentDidLoad() {
    const options = this.getOptions();
    const initValues = new Set(options.filter(option => option.selected).map(option => option.value));

    this.selectedValues = initValues;
  }

  // options
  private getOptions() {
    return Array.from(this.el.querySelectorAll('my-dropdown-option'));
  }

  private toggleOption(option: HTMLMyDropdownOptionElement) {
    const next = new Set(this.selectedValues);

    if (next.has(option.value)) {
      next.delete(option.value);
      option.selected = false;
    } else {
      next.add(option.value);
      option.selected = true;
    }

    this.selectedValues = next;
  }

  private onOptionClick(e: MouseEvent) {
    const target = (e.target as HTMLElement).closest('my-dropdown-option');
    // console.log(target);

    if (target) this.toggleOption(target);
  }

  // open / close
  private open() {
    this.isOpen = true;
  }

  private close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.filterText = '';

    this.getOptions().forEach(option => {
      option.hidden = false;
    });
  }

  //
  private getTriggerLabel() {
    if (this.selectedValues.size === 0) return 'No Selection';

    const labels = this.getOptions()
      .filter(option => this.selectedValues.has(option.value))
      .map(option => option.label);

    return labels.length === 1 ? labels[0] : `${labels.length} selected`;
  }

  private onFilterInput(e: Event) {
    const inputText = (e.target as HTMLInputElement).value.trim();

    this.filterText = inputText;

    const lowerInputText = inputText.toLowerCase();
    this.getOptions().forEach(option => {
      const match = option.label.toLowerCase().includes(lowerInputText);
      option.hidden = !match;
    });
  }

  render() {
    return (
      <div>
        {this.label && <h3>{this.label}</h3>}

        <button type="button" onClick={() => (this.isOpen ? this.close() : this.open())}>
          {this.getTriggerLabel()}
        </button>

        {this.isOpen && (
          <div>
            <label htmlFor="filterText">Filter:</label>
            <input id="filterText" type="text" placeholder="type here" value={this.filterText} onInput={e => this.onFilterInput(e)} />
            <div onClick={e => this.onOptionClick(e)}>
              <slot />

              {/* {this.filterText.length > 0 && <div>No match</div>} */}
            </div>
          </div>
        )}
      </div>
    );
  }
}
