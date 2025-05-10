// Your code here.
const items = document.querySelectorAll('.item');
const container = document.querySelector('.items');

items.forEach(item => {
  item.style.position = 'absolute'; // Allow free movement
  const rect = item.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // Set initial position based on current layout
  item.style.left = (rect.left - containerRect.left + container.scrollLeft) + 'px';
  item.style.top = (rect.top - containerRect.top) + 'px';

  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  item.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - item.offsetLeft;
    offsetY = e.clientY - item.offsetTop;

    item.style.zIndex = 1000;

    function onMouseMove(e) {
      if (!isDragging) return;

      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // Constrain within container
      const maxX = container.clientWidth - item.offsetWidth;
      const maxY = container.clientHeight - item.offsetHeight;

      x = Math.max(0, Math.min(x, maxX));
      y = Math.max(0, Math.min(y, maxY));

      item.style.left = x + 'px';
      item.style.top = y + 'px';
    }

    function onMouseUp() {
      isDragging = false;
      item.style.zIndex = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});