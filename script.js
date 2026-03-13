// أنيميشن الظهور التدريجي
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal); // للتأكد من عملها عند تحميل الصفحة

// سكرول سلس
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// تأثير الضغط على النصوص التفاعلية
document.querySelectorAll('.interactive-text').forEach(item => {
    item.addEventListener('mousedown', () => {
        item.style.transform = "scale(0.97)";
    });
    item.addEventListener('mouseup', () => {
        item.style.transform = "scale(1)";
    });
});




const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});




// 1. إضافة تفاعل لزر Send Message
const sendButton = document.querySelector('.btn-primary');
if (sendButton) {
    sendButton.addEventListener('click', function (e) {
        const form = document.querySelector('.glass-form');
        const inputs = form.querySelectorAll('input, textarea');
        let isComplete = true;

        inputs.forEach(input => { if (!input.value) isComplete = false; });

        if (!isComplete) {
            form.style.animation = "shake 0.4s ease";
            setTimeout(() => form.style.animation = "", 400);
        } else {
            this.innerHTML = "Message Sent! ✓";
            this.style.background = "#22c55e";
            this.style.borderColor = "#22c55e";
        }
    });
}






function animateSkillsOnScroll() {

    const skillSection = document.querySelector("#skills");
    const bars = document.querySelectorAll(".progress-bar");

    const sectionTop = skillSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {

        bars.forEach(bar => {

            const width = bar.getAttribute("data-width");

            if (!bar.classList.contains("filled")) {
                bar.style.width = width;
                bar.classList.add("filled");
            }

        });

    }

}

window.addEventListener("scroll", animateSkillsOnScroll);








const myProjects = [
    {
        title: "VEGEFOODS",
        description: "A responsive e-commerce interface focused on clean UI and seamless user experience. Developed using advanced CSS techniques like Flexbox and Grid to ensure full compatibility across all device screens.",
        image: "assets/images/Project 1.PNG",
        link: "projects/project 1/index.html",
        skills: ["HTML", "CSS"], // فقط HTML و CSS
        gradient: "linear-gradient(135deg, #38bdf8, #0ea5e9)"
    },
    {
        title: "Clothing Store",
        description: "A collaborative full-stack web application built with ASP.NET Core. Features a dynamic product management system integrated with SQL Server for real-time data handling and server-side logic.",
        image: "assets/images/Project 2.PNG",
        link: "projects/project 2/index.html",
        skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "C#", "SQL", "LINQ", "EF", "MVC.NET"], // Full-stack .NET فقط
        gradient: "linear-gradient(135deg, #facc15, #f97316)"
    },
    {
        title: "Personal Portfolio",
        description: "A high-performance interactive portfolio showcasing modern web capabilities. Implements custom JavaScript logic for dynamic content rendering, smooth transitions, and optimized UI components.",
        image: "assets/images/Project 3.PNG",
        link: "#",
        skills: ["HTML", "CSS", "JavaScript"], // HTML + CSS + JS فقط
        gradient: "linear-gradient(135deg, #a855f7, #7c3aed)"
    }
];

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = "";

    myProjects.forEach(project => {
        const projectHTML = `
            <div class="project-box reveal">
                <div class="project-image" style="background-image: url('${project.image}'), ${project.gradient};">
                    <a href="${project.link}" target="_blank">
                        <i class="fas fa-up-right-from-square"></i>
                    </a>
                </div>
                <div class="project-info">
                    <div>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                    <div class="project-skills">
                        ${project.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += projectHTML;
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);






