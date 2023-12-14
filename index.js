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
    root: null, // Use the viewport as the root
    threshold: 0.3, // Trigger when 50% of the target is visible
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
  // Observe the #works element
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

  // Añade el enlace al DOM y simula un clic para iniciar la descarga
  document.body.appendChild(link);
  link.click();

  // Limpia el enlace después de la descarga
  document.body.removeChild(link);
}


function obtenerHoraCostaRica() {
  const ahora = new Date();
  const horaCostaRica = ahora.toLocaleTimeString('es-CR', { timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit' });
  return horaCostaRica;
}

function mostrarHora() {
  const contenedorHora = document.getElementById('hora-container');
  contenedorHora.textContent = `Costa Rica \n ${obtenerHoraCostaRica()}`;

  setTimeout(mostrarHora, 60000); // Actualizar cada minuto (60,000 milisegundos)
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
      // Cualquier acción adicional que desees realizar cuando window.innerWidth es mayor que 768
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
    })

    .to("#elem2", {
      height: "100%",
      top: 0,
      duration: 1.5,
      delay: -2.8,
      ease: Expo.easeInOut,
    })

    .to("#elem2", {
      height: 0,
      duration: 1.2,
      delay: -1.6,
      ease: Expo.easeOut,
      onComplete: function () {
        homePageAnimation();
      },
    });
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

function horizontalScroll() {
  const horizontalSections = gsap.utils.toArray('.container-skills')

  horizontalSections.forEach(function (sec, i) {	
    
    var thisPinWrap = sec.querySelector('.pin-wrap');
    var thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');
    
    var getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth); 
  
    gsap.fromTo(thisAnimWrap, { 
      x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue() 
    }, { 
      x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0, 
      ease: "none",
      scrollTrigger: {
        trigger: sec,		
        start: "top top",
        end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
        pin: thisPinWrap,
        invalidateOnRefresh: true,
        //anticipatePin: 1,
        scrub: true,
        //markers: true,
      }
    });
  
  });	
}



mostrarHora();
menuButton();
revealToSpan();
prealoaderAnimation();
revealImg();
horizontalScroll();