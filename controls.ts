export class Controls {
  private forward = false;
  private backward = false;
  private left = false;
  private right = false;

  constructor(controllable: boolean) {
    if (controllable) {
      window.addEventListener('keyup', (e) => {
        switch (e.key) {
          case 'ArrowUp':
            this.forward = false;
            break;
          case 'ArrowDown':
            this.backward = false;
            break;
          case 'ArrowLeft':
            this.left = false;
            break;
          case 'ArrowRight':
            this.right = false;
            break;
        }
      });

      window.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowUp':
            this.forward = true;
            break;
          case 'ArrowDown':
            this.backward = true;
            break;
          case 'ArrowLeft':
            this.left = true;
            break;
          case 'ArrowRight':
            this.right = true;
            break;
        }
      });
    } else {
      this.forward = true;
    }
  }

  get isMovingForward() {
    return this.forward;
  }

  get isMovingBackwards() {
    return this.backward;
  }

  get isMovingLeft() {
    return this.left;
  }

  get isMovingRight() {
    return this.right;
  }
}
