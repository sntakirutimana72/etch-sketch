function toggleNavigation() {
  this.classList.toggle('open');
  Selectors.query('#materials').classList.toggle('flex');
  CanvasJob.render();
}

/**
 * Generates a random number with respect to provided boundaries.
 * @param {Integer} start
 * @param {Integer} limit
 * @returns {Integer} returns a randomized number in range of parameters :start & :limit
 */
const getHEX = (start = 1, limit = 255) => {
  const min = Math.ceil(start);
  const max = Math.floor(limit);

  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Generates a random rgb color.
 * @returns
 */
const getRGBColor = () => `rgb(${getHEX()}, ${getHEX()}, ${getHEX()})`;

/**
 * Remove shading effect from a given pad cell
 * @param { HTMLElement } element
 */
const clearShadingEffect = (element) => {
  element.style.backgroundColor = 'unset';
  element.removeAttribute('shaded');
};

const eraseAll = () => {
  Selectors.queryAll('.grid-cell[shaded]').forEach(clearShadingEffect);
};

class CanvasJob {
  static scheduled;
  static queued;
  static gridSize = 16;

  static newCell(x, y) {
    const size = `${this.gridSize}px`;
    const cell = document.createElement('div');
    cell.setAttribute('id', `cell-${x}-${y}`);
    cell.classList.add("grid-cell");
    cell.style.width = size;
    cell.style.height = size;

    return cell;
  }

  static async setQueued(value) {
    this.queued = value;
  }

  static async setScheduled(value) {
    this.scheduled = value;
  }

  static async unsetSchedule() {
    this.scheduled && clearInterval(this.scheduled)
    this.scheduled = null;
  }

  static async render() {
    await this.unsetSchedule();

    while (this.queued) { }

    await this.setScheduled(setTimeout(() => { this.newCanvas() }, 5000))
  }

  static async newCanvas() {
    await this.setQueued(true)

    const canvas = Selectors.canvas();
    canvas.innerHTML = '';

    let x = Math.floor(canvas.offsetHeight / this.gridSize);

    while (this.scheduled && x >= 0) {
      let y = Math.floor(canvas.offsetWidth / this.gridSize);

      while (this.scheduled && y >= 0) {
        canvas.appendChild(this.newCell(x, y));
        --y;
      }
      --x;
    }

    await this.setQueued(false);
  }

  static setGridSize() {
    const newSize = Number(prompt('Enter New Grid Size (16-100): '));
    if (newSize >= 16 && newSize <= 100) {
      this.gridSize = newSize;
      this.render();
    } else {
      alert(`Could not reset grid size`);
    }
  }

  static paint(element) {
    if (element.getAttribute('shaded')) {
      clearShadingEffect(element);
    } else {
      element.style.backgroundColor = getRGBColor();
      element.setAttribute('shaded', 'true');
    }
  }
}
