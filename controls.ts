export class Controls {
  private forward = false;
  private backward = false;
  private left = false;
  private right = false;

  constructor(controllable: boolean) {
    if (controllable) {
      window.addEventListener('keyup', () => {
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;
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
