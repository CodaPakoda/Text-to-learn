document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("sidebarToggle");

    if (!sidebar || !toggle) return;

    const texts = document.querySelectorAll(".sidebar-text");
    const headings = document.querySelectorAll(".sidebar-heading");
    const subtitle = document.querySelector(".sidebar-subtitle");
    const learningCard = document.getElementById("learningCard");

    function collapse() {

        sidebar.classList.remove("w-72");
        sidebar.classList.add("w-24");
        sidebar.classList.remove("px-0");

        texts.forEach(el => el.classList.add("hidden"));

        headings.forEach(el => el.classList.add("hidden"));

        if (subtitle)
            subtitle.classList.add("hidden");

        const logoSection = document.getElementById("logoSection");
        const header = document.getElementById("sidebarHeader");

        if (logoSection)
            logoSection.classList.add("hidden");

        if (header){

            header.classList.remove("justify-between");
            header.classList.add("justify-center");

        }   

        if (learningCard)
            learningCard.classList.add("hidden");

        document.querySelectorAll(".sidebar-link").forEach(link => {

            link.classList.remove("gap-4");
            link.classList.remove("px-4");
            link.classList.add("justify-center");

        });

        localStorage.setItem("sidebar", "collapsed");

    }

    function expand() {

        sidebar.classList.remove("w-24");
        sidebar.classList.add("w-72");

        texts.forEach(el => el.classList.remove("hidden"));

        headings.forEach(el => el.classList.remove("hidden"));

        if (subtitle)
            subtitle.classList.remove("hidden");

        const logoSection = document.getElementById("logoSection");
        const header = document.getElementById("sidebarHeader");

        if (logoSection)
           logoSection.classList.remove("hidden");

        if (header){

            header.classList.remove("justify-center");
            header.classList.add("justify-between");

        }

        if (learningCard)
            learningCard.classList.remove("hidden");

        document.querySelectorAll(".sidebar-link").forEach(link => {

            link.classList.remove("justify-center");
            link.classList.add("gap-4");
            link.classList.add("px-4");

        });

        localStorage.setItem("sidebar", "expanded");

    }

    let collapsed = localStorage.getItem("sidebar") === "collapsed";

    if (collapsed)
        collapse();

    toggle.addEventListener("click", () => {

        collapsed = !collapsed;

        if (collapsed)
            collapse();
        else
            expand();

    });

});