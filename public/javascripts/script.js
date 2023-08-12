function confirmDeletionPopUp(name) {
  if (confirm(`Are you sure you want to delete this ${name}?`)) {
    return true;
  } else {
    // stop the page
    event.stopPropagation();
    event.preventDefault();
  }
}
