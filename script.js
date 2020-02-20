let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
      button.addEventListener('click', () => {
        if (!button.className) {
          for (let btn of buttons) {
            btn.className = '';
          }
          button.className = 'active';
        }
      });
    }