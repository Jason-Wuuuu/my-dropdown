[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

## Getting Started

```bash
npm install
npm start
```

---

# my-dropdown

A multi-select dropdown web component with keyboard navigation and filtering, built with Stencil.js

## Components

- **`<my-dropdown>`** — the dropdown container and trigger
- **`<my-dropdown-option>`** — an individual selectable option, passed in via slot

---

## Usage Example

```html
<my-dropdown label="Apple Products">
  <my-dropdown-option value="iphone" label="iPhone" selected></my-dropdown-option>
  <my-dropdown-option value="ipad" label="iPad"></my-dropdown-option>
  <my-dropdown-option value="macbook_pro" label="MacBook Pro"></my-dropdown-option>
</my-dropdown>
```

### Listening to Selection Changes

`my-dropdown` emits a `selectionChange` custom event whenever the selection is updated.
The event `detail` is an array of the currently selected `value` strings.

```jsx
document.querySelector('my-dropdown').addEventListener('selectionChange', e => {
  console.log(e.detail); // e.g. ["iphone", "ipad"]
});
```

---

## `<my-dropdown>`

### Properties

| Property | Attribute | Type                   | Default | Description                                                                        |
| -------- | --------- | ---------------------- | ------- | ---------------------------------------------------------------------------------- |
| `label`  | `label`   | `string \| undefined`  | —       | Optional label rendered above the trigger button.                                  |
| `size`   | `size`    | `'sm' \| 'md' \| 'lg'` | `'md'`  | Uses predefined widths, font sizes, and padding to maintain interface consistency. |

### Events

| Event             | Detail     | Description                                                                 |
| ----------------- | ---------- | --------------------------------------------------------------------------- |
| `selectionChange` | `string[]` | Fired after every selection change. Contains all currently selected values. |

### Keyboard Navigation

| Key         | Behavior                                                     |
| ----------- | ------------------------------------------------------------ |
| `ArrowDown` | Moves focus to the next visible option.                      |
| `ArrowUp`   | Moves focus to the previous visible option.                  |
| `Enter`     | Toggles the currently focused option.                        |
| `Escape`    | Closes the dropdown and returns focus to the trigger button. |

### Behavior Notes

- **Filter**: When the dropdown opens, focus is automatically moved to the filter input. Typing filters options by case-insensitive substring match against each option's `label`. The filter resets when the dropdown closes.
- **Close on outside click**: Clicking anywhere outside the component closes the dropdown.
- **Trigger label**: Shows `"No Selection"` when nothing is selected. With one selection it shows the label; with multiple it shows them comma-separated. The count badge next to the label prop also updates reactively.

---

## `<my-dropdown-option>`

### Properties

| Property   | Attribute  | Type      | Default | Description                                                                     |
| ---------- | ---------- | --------- | ------- | ------------------------------------------------------------------------------- |
| `value`    | `value`    | `string`  | —       | **Required.** The value emitted on selection.                                   |
| `label`    | `label`    | `string`  | —       | **Required.** The display text of the option. Also used for filtering.          |
| `selected` | `selected` | `boolean` | `false` | Whether the option is selected. Can be set as an attribute to define a default. |

---

## Styling

The component exposes both **CSS custom properties** for theming and **CSS shadow parts** for structural overrides.

### CSS Parts

### `<my-dropdown>` parts

| Part           | Element                          |
| -------------- | -------------------------------- |
| `trigger`      | The dropdown trigger `<button>`  |
| `dropdown`     | The floating panel container     |
| `filter`       | The filter label + input wrapper |
| `filter-input` | The filter `<input>` element     |
| `menu`         | The options listbox container    |

### `<my-dropdown-option>` parts

| Part               | Element                                              |
| ------------------ | ---------------------------------------------------- |
| `option`           | The option row (always present)                      |
| `option--selected` | Added alongside `option` when the option is selected |

**Example:**

```css
/* Round the trigger button */
my-dropdown::part(trigger) {
  border-radius: 20px;
}

/* Highlight selected options with a background */
my-dropdown-option::part(option--selected) {
  background-color: #e8f4fd;
}

/* Style the filter input */
my-dropdown::part(filter-input) {
  border: 1px solid #ccc;
  border-radius: 4px;
}
```

### CSS Custom Properties

All properties are set on the `my-dropdown` host element and cascade into `my-dropdown-option` automatically.

### Colors

| Property                       | Default (light)    | Description                          |
| ------------------------------ | ------------------ | ------------------------------------ |
| `--color-bg`                   | `#fff`             | General background                   |
| `--color-border`               | `#333`             | Border color used throughout         |
| `--color-text`                 | `#333`             | General text color                   |
| `--color-dropdown-bg`          | `#fff`             | Dropdown panel and option background |
| `--color-dropdown-text`        | `#333`             | Dropdown panel and option text       |
| `--color-dropdown-hover-bg`    | `#333`             | Trigger button hover background      |
| `--color-dropdown-hover-text`  | `#fff`             | Trigger button hover text            |
| `--color-option-hover-bg`      | `#ddd`             | Option row hover background          |
| `--color-option-selected-text` | `rgb(55, 55, 200)` | Selected option text color           |

### Sizing & Spacing

| Property                          | Default (`md`) | Description                       |
| --------------------------------- | -------------- | --------------------------------- |
| `--dropdown-width`                | `200px`        | Width of the trigger and panel    |
| `--dropdown-font-size`            | `12px`         | Base font size                    |
| `--dropdown-padding`              | `8px 12px`     | Trigger button padding            |
| `--dropdown-filter-padding`       | `8px`          | Filter section padding            |
| `--dropdown-filter-input-padding` | `4px 2px`      | Filter input internal padding     |
| `--dropdown-option-padding`       | `10px 12px`    | Option row padding                |
| `--dropdown-selected-font-size`   | `14px`         | Font size of selected option rows |

### Built-in Themes

### Size variants (`size` prop)

| Size | Width   | Font size |
| ---- | ------- | --------- |
| `sm` | `150px` | `11px`    |
| `md` | `200px` | `12px`    |
| `lg` | `300px` | `14px`    |

### Dark theme

Add `data-theme="dark"` to the `<my-dropdown>` element to activate the built-in dark palette.

```html
<my-dropdown label="Products" data-theme="dark"> ... </my-dropdown>
```
