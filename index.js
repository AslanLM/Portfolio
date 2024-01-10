window.addEventListener('beforeunload', function() {
  
  history.scrollRestoration = "manual";
  history.go(-history.length);
  // window.scrollTo(0, 0); otra manera de hacerlo
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const body = document.body;
  const worksSection = document.getElementById("works");

  const options = {
    root: null,
    threshold: 0.3, 
  };

  const observer = new IntersectionObserver(handleIntersection, options);

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        body.style.backgroundColor = "#111";
        body.style.color = "#f8f8f8";
        header.classList.add("active2");
        header.classList.remove("active");
      } else {
        body.style.backgroundColor = "#f8f8f8";
        body.style.color = "#000";
        header.classList.remove("active2");
      }
    });
  }

  observer.observe(worksSection);
  
  function handleScroll() {
    const scrollY = window.scrollY;
    header.classList.toggle("active", scrollY > 0);
  }

  window.addEventListener("scroll", handleScroll);

  handleScroll();

});


document.getElementById('formSent') .addEventListener('submit', function(event) {
  const btn = document.getElementById('btnSent');
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_p16w59o';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Message';
      alert('Sent!');
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
    }, (err) => {
      btn.value = 'Send Message';
      alert(JSON.stringify(err));
    });
});


document.getElementById("downloadButton").addEventListener("click", downloadResume);
function downloadResume() {
  
  var resumePath = 'CV/MedinaLCV.pdf';

  var link = document.createElement('a');

  link.href = resumePath;

  link.download = 'MedinaCV.pdf';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}

function getTimeCostaRica() {
  const nowCR = new Date();
  const timeCostaRica = nowCR.toLocaleTimeString('es-CR', { timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit' });
  return timeCostaRica;
}

function showTimeCR() {
  const timeContainer = document.getElementById('time-container');
  timeContainer.textContent = `Costa Rica \n ${getTimeCostaRica()}`;

  setTimeout(showTimeCR, 60000);
}

function menuButton() {
  const button = document.getElementById('menuButton');
  const navbar = document.getElementById('navbar');

  function handleResize() {
    if (window.innerWidth <= 768) {
      button.addEventListener('click', function () {
        if (this.classList.contains('clickeado')) {
          navbar.style.display = 'none';
          button.classList.remove('clickeado');
        } else {
          this.classList.add('clickeado');
          navbar.style.display = 'block';
        }
      });

      const links = document.querySelectorAll('#navbar ul li a');
      links.forEach(link => {
        link.addEventListener('click', function () {
          navbar.style.display = 'none';
          button.classList.remove('clickeado');
        });
      });
    } else {
      navbar.style.display = 'block';
    }
  }

  handleResize();
  window.addEventListener('resize', handleResize);
}

function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    var parent = document.createElement("span");
    var child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
  });

  gsap.set("#home span .child", {
    y: "100%",
  });
}

function prealoaderAnimation() {
  var tl = gsap.timeline({
    onStart: function () {
      document.body.style.overflowY = "hidden";
    },
    onComplete: function () {
      document.body.style.overflowY = "visible";
    },
  });

  tl.from("#loader .child span", {
    x: "20%",
    delay: 1,
    stagger: 0.2,
    duration: 1.8,
    ease: Power3.easeInOut,
  })

    .to("#loader .parent .child", {
      y: "-100%",
      duration: 1,
      ease: Circ.easeInOut,
    })

    .to("#loader", {
      height: 0,
      duration: 2,
      ease: Expo.easeInOut,
    })

    .to("#elem", {
      height: "100%",
      top: 0,
      duration: 2,
      delay: -2,
      ease: Expo.easeInOut,
    })

    .to("#elem", {
      height: 0,
      duration: 2,
      delay: -0.4,
      ease: Expo.easeOut,
      onComplete: function () {
        homePageAnimation();
      },
    })


}

function homePageAnimation() {
  var tl = gsap.timeline();

  tl.call(function () {
    document.getElementById("header").classList.remove("header-hidden");
  }).to("#home .parent .child", {
    y: 0,
    stagger: 0.2,
    duration: 1.8,
    ease: Expo.easeInOut,
  });
}

function revealImg() {
  const project = document.querySelectorAll(".project");
  const revealImg = document.querySelectorAll(".reveal-img");
  const hiddenImg = document.querySelectorAll(".hidden-img");

  for (let i = 0; i < project.length; i++) {
    project[i].addEventListener("mousemove", (e) => {
      revealImg[i].style.opacity = 1;
      revealImg[i].style.transform = `translate(-100%, -50%) rotate(5deg)`;
      hiddenImg[i].style.transform = "scale(1,1)";
      revealImg[i].style.left = e.clientX + "px";
    });
    project[i].addEventListener("mouseleave", (e) => {
      revealImg[i].style.opacity = 0;
      revealImg[i].style.transform = `translate(-50%, -50%) rotate(-5deg)`;
      hiddenImg[i].style.transform = "scale(0.8,0.8)";
    });
  }
}






showTimeCR();
menuButton();
revealToSpan();
prealoaderAnimation();
revealImg();
