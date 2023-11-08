const navToggleI = nav_toggle.getElementsByTagName("i")[0];
const navListUl = document.getElementsByClassName("nav-list")[0];

nav_toggle.onclick = () => {
    navToggleI.classList.toggle("bi-list");
    navToggleI.classList.toggle('bi-x-lg');

    navListUl.classList.toggle("show-menu");
}