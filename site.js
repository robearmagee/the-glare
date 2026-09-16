// Keep the privacy link useful even when its native disclosure is closed.
function revealLinkedDisclosure() {
  if (window.location.hash === '#privacy') {
    document.getElementById('privacy').open = true;
  }
}
document.getElementById('privacy-link').addEventListener('click', () => {
  document.getElementById('privacy').open = true;
});
window.addEventListener('hashchange', revealLinkedDisclosure);
revealLinkedDisclosure();
