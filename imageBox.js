document.addEventListener('DOMContentLoaded', function() {
  /* Thumbnails for demo purposes. Replace with your own images if needed. */
  const thumbnails = [
    'kitten.png',
    'kitten2.png',
    'kitten3.png',
    'kitten4.png'
  ];

  function createDraggableBox() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Create draggable box
    const box = document.createElement('div');
    box.className = 'draggable-box';
    overlay.appendChild(box);

    // Position box next to the profile image inside the container
    const container = document.querySelector('.container');
    const profilePic = document.querySelector('.profile-pic');
    // Position the box just to the right of the profile image
    var profilePicEl = document.querySelector('.profile-pic');
    if (profilePicEl) {
      const rect = profilePicEl.getBoundingClientRect();
      box.style.position = 'fixed';
      box.style.left = `${rect.right + 32}px`;
      box.style.top = `${rect.top + rect.height / 2 - 160}px`;
      box.style.transform = '';
    }

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    box.appendChild(closeBtn);
    closeBtn.onclick = () => overlay.remove();

    // Thumbnails grid
    const grid = document.createElement('div');
    grid.className = 'thumb-grid';
    box.appendChild(grid);

    thumbnails.forEach((src, i) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.className = 'thumbnail';
      thumb.onclick = () => {
        document.querySelector('.profile-pic').src = src;
      };
      grid.appendChild(thumb);
    });

    // Drag logic
    let isDragging = false, startX, startY, startLeft, startTop;
    box.onmousedown = function(e) {
      if (e.target === closeBtn) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = box.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      document.body.style.userSelect = 'none';
    };
    document.onmousemove = function(e) {
      if (!isDragging) return;
      const newLeft = startLeft + (e.clientX - startX);
      const newTop = startTop + (e.clientY - startY);
      box.style.left = `${newLeft}px`;
      box.style.top = `${newTop}px`;
      box.style.transform = '';
    };
    document.onmouseup = function() {
      isDragging = false;
      document.body.style.userSelect = '';
    };
  }

  // Restore button label and set click handler only
  const contactBtn = document.querySelector('.contact-btn');
  if (contactBtn) {
    contactBtn.textContent = 'Choose kitten';
    contactBtn.onclick = createDraggableBox;
  }
});
