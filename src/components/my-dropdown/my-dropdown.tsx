import { Element, Component, Prop, State, h, Listen } from '@stencil/core';

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
  @State() focusedIndex: number = -1;

  @State() filterText: string = '';
  private filterInputRef?: HTMLInputElement;

  private triggerRef?: HTMLButtonElement;

  async componentWillLoad() {
    const options = this.getOptions();
    const initValues = new Set(options.filter(option => option.selected).map(option => option.value));

    this.selectedValues = initValues;
  }

  // options
  private getOptions() {
    const options = Array.from(this.el.querySelectorAll('my-dropdown-option'));
    // console.log(options);
    return options;
  }

  private getVisibleOptions() {
    const visibleOptions = this.getOptions().filter(option => !option.hasAttribute('hidden'));
    // console.log(visibleOptions);
    return visibleOptions;
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

  private setFocusedIndex(index: number, visible: HTMLMyDropdownOptionElement[]) {
    this.getOptions().forEach(option => option.removeAttribute('aria-current'));
    this.focusedIndex = index;

    if (index >= 0 && visible[index]) {
      const focusedEl = visible[index];
      focusedEl.setAttribute('aria-current', 'true');

      focusedEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', // scroll only when the element is hidden
      });
    }
  }

  // open / close
  private open() {
    this.isOpen = true;
    this.focusedIndex = -1;

    // ensure the input exists in the DOM before focus
    requestAnimationFrame(() => this.filterInputRef?.focus());
  }

  private close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.filterText = '';
    this.focusedIndex = -1;

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

    return labels.length === 1 ? labels[0] : `${labels.join(', ')}`;
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

  // keyboard
  @Listen('keydown')
  onKeyDown(e: KeyboardEvent) {
    if (!this.isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.open();
      }

      return;
    }

    const visible = this.getVisibleOptions();

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.close();
        this.triggerRef?.focus();
        break;

      case 'ArrowDown':
        e.preventDefault();
        this.setFocusedIndex(Math.min(this.focusedIndex + 1, visible.length - 1), visible);
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (this.focusedIndex <= 0) {
          this.setFocusedIndex(-1, visible);
          this.filterInputRef?.focus();
        } else {
          this.setFocusedIndex(this.focusedIndex - 1, visible);
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (this.focusedIndex >= 0 && visible[this.focusedIndex]) {
          this.toggleOption(visible[this.focusedIndex]);
        }
        break;
    }
  }

  render() {
    const selectedCount = this.selectedValues.size;

    const visibleOptions = this.getVisibleOptions();
    const hasNoResults = this.isOpen && this.filterText.length > 0 && visibleOptions.length === 0;

    return (
      <div class={{ dropdown: true }}>
        <p class={{ dropdown_label: true }}>
          {this.label && this.label} {selectedCount > 0 && <span class="label_count">{this.label ? `(${selectedCount})` : `${selectedCount} selected`}</span>}
        </p>

        <button
          class={{ dropdown_trigger: true }}
          type="button"
          onClick={() => (this.isOpen ? this.close() : this.open())}
          aria-haspopup="listbox" // tell the screen reader this will opens a list of option
          aria-expanded={this.isOpen} // whether dropdown is opened
          aria-controls="options-listbox"
          ref={el => (this.triggerRef = el)}
        >
          <span>{this.getTriggerLabel()}</span>
          <span aria-hidden="true">{this.isOpen ? '▲' : '▼'}</span>
        </button>

        {this.isOpen && (
          <div class={{ dropdown_container: true }}>
            <div class={{ filter: true }}>
              <label htmlFor="filterText">Filter:</label>
              <input
                id="filterText"
                class={{ filter_input: true }}
                type="text"
                placeholder="type here"
                value={this.filterText}
                onInput={e => this.onFilterInput(e)}
                role="combobox" // input that controls a popup
                aria-controls="options-listbox"
                aria-activedescendant={this.focusedIndex >= 0 ? `option-${this.focusedIndex}` : undefined} // current highlighted option
                ref={el => (this.filterInputRef = el)}
              />
            </div>

            <div
              id="options-listbox"
              class={{ dropdown_options: true }}
              onClick={e => this.onOptionClick(e)}
              part="menu"
              role="listbox" // container of selectable options
              aria-multiselectable="true"
              aria-label={this.label}
            >
              <slot />
              {hasNoResults && (
                <p class="dropdown_no-results" role="status">
                  No results
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
