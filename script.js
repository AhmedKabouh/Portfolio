document.addEventListener('DOMContentLoaded', () => {
    // 1. التحكم في قائمة الموبايل والتابلت
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('nav ul');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navList.classList.toggle('active');

            // تغيير شكل الأيقونة من X لـ Bars والعكس
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }
        });

        // إغلاق القائمة عند الضغط على أي رابط أو في أي مكان بره
        document.addEventListener('click', (e) => {
            if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
                navList.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            }
        });
    }

    // 2. أنيميشن الظهور التدريجي (Reveal)
    const reveal = () => {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", reveal);
    reveal(); // لتشغيلها عند التحميل

    // 3. سكرول سلس (Smooth Scroll)
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // قفل القائمة بعد الضغط (للموبايل)
                navList.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
            }
        });
    });

    // 4. أنيميشن مهارات (Skills) عند الوصول إليها
    const animateSkills = () => {
        const skillSection = document.querySelector("#skills");
        if (!skillSection) return;
        const sectionTop = skillSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            document.querySelectorAll(".progress-bar").forEach(bar => {
                bar.style.width = bar.getAttribute("data-width");
            });
        }
    };
    window.addEventListener("scroll", animateSkills);

    // 5. رندر المشاريع (Projects)
    renderProjects();
});

// مصفوفة المشاريع ووظيفة الرندر (تأكد أنها خارج الـ DOMContentLoaded أو استدعيها جواها)
const myProjects = [
    {
        title: "VEGEFOODS",
        description: "A responsive e-commerce interface focused on clean UI and seamless user experience.",
        image: "assets/images/Project 1.PNG",
        link: "projects/project 1/index.html",
        skills: ["HTML", "CSS"],
        gradient: "linear-gradient(135deg, #38bdf8, #0ea5e9)"
    },
    {
        title: "Clothing Store",
        description: "A collaborative full-stack web application built with ASP.NET Core and SQL Server.",
        image: "assets/images/Project 2.PNG",
        link: "projects/project 2/index.html",
        skills: ["C#", "SQL", "MVC.NET"],
        gradient: "linear-gradient(135deg, #facc15, #f97316)"
    },
    {
        title: "Personal Portfolio",
        description: "A high-performance interactive portfolio showcasing modern web capabilities.",
        image: "assets/images/Project 3.PNG",
        link: "#",
        skills: ["HTML", "CSS", "JS"],
        gradient: "linear-gradient(135deg, #a855f7, #7c3aed)"
    }
];

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    container.innerHTML = myProjects.map(project => `
        <div class="project-box reveal">
            <div class="project-image" style="background-image: url('${project.image}'), ${project.gradient};">
                <a href="${project.link}" target="_blank"><i class="fas fa-up-right-from-square"></i></a>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-skills">
                    ${project.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
                </div>
                <div class="project-action">
                    <a href="${project.link}" target="_blank" class="btn-view-project">View Project <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    `).join('');
}






const sections = document.querySelectorAll('section'); // تأكد أن كل الأقسام تستخدم tag <section> أو غيرها لـ id
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // إذا كان التمرير تجاوز بداية السكشن بمسافة بسيطة
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});