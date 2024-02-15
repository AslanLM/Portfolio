window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
  history.go(-history.length);
  // window.scrollTo(0, 0); otra manera de hacerlo
});

document.addEventListener("DOMContentLoaded", function() {
  const cursor = new MouseFollower({
    container: 'body',
    speed: 0.3
  });
});

gsap.registerPlugin(ScrollTrigger);

document.getElementById("formSent").addEventListener("submit", function (event) {
    const btn = document.getElementById("btnSent");
    event.preventDefault();

    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_p16w59o";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Send Message";
        alert("Sent!");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
      },
      (err) => {
        btn.value = "Send Message";
        alert(JSON.stringify(err));
      }
    );
  });

function toggleHeaderClass() {
  var header = document.getElementById("header");
  var footer = document.getElementById("footer");

  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }

  var footerPosition = footer.getBoundingClientRect().top;

  if (footerPosition <= 180) {
    header.classList.add("active2");
  } else {
    header.classList.remove("active2");
  }
}
window.onscroll = toggleHeaderClass;

function getTimeCostaRica() {
  const nowCR = new Date();
  const timeCostaRica = nowCR.toLocaleTimeString("es-CR", {
    timeZone: "America/Costa_Rica",
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeCostaRica;
}

function showTimeCR() {
  const timeContainer = document.getElementById("time-container");
  timeContainer.textContent = `Costa Rica \n ${getTimeCostaRica()}`;

  setTimeout(showTimeCR, 60000);
}

function menuButton() {
  const button = document.getElementById("menuButton");
  const navbar = document.getElementById("navbar");

  function toggleNavbar() {
    if (button.classList.contains("clickeado")) {
      navbar.style.display = "none";
      button.classList.remove("clickeado");
    } else {
      button.classList.add("clickeado");
      navbar.style.display = "block";
    }
  }

  function handleResize() {
    if (window.innerWidth <= 768) {
      button.addEventListener("click", toggleNavbar);

      const links = document.querySelectorAll("#navbar ul li a");
      links.forEach((link) => {
        link.addEventListener("click", function () {
          navbar.style.display = "none";
          button.classList.remove("clickeado");
        });
      });
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);
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

  tl.set("#loader", {
    height: "100%",
  })

  .set("header", {
    y: "-100%",
  })

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
      duration: 1.8,
      delay: -2,
      ease: Expo.easeInOut,
    })

    .to("#elem", {
      height: 0,
      duration: 1.4,
      delay: -0.8,
      ease: Expo.easeOut,
      onComplete: function () {
        homePageAnimation();
      },
    });
}

function homePageAnimation() {
  var tl = gsap.timeline();
    
  tl.to("#home .parent .child", {
    y: 0,
    stagger: 0.2,
    duration: 1.8,
    ease: Expo.easeInOut,
  });

  tl.to("header", {
    y: 0,
    delay: -0.8,
    duration: 0.2,
    ease: Expo.easeInOut,
  })
}

function textRevealServices() {
  gsap.from("#services .parent .child", {
    y: 128,
    stagger: 0.2,
    duration: 1.8,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#services .parent .child",
      start: "top 140%",
    },
  });

  gsap.from("#services .hability", {
    y: 128,
    stagger: 0.2,
    duration: 1.8,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#services .parent .child",
      start: "top 140%",
    },
  });
}

function textRevealWorks() {
  gsap.from("#works .parent .child", {
    y: 128,
    stagger: 0.2,
    duration: 1.8,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#works .parent .child",
      start: "top 140%",
    },
  });
}

function textRevealContact() {
  gsap.from("#contact .parent .child", {
    y: 128,
    stagger: 0.1,
    duration: 1.8,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#contact .parent .child",
      start: "top 140%",
    },
  });

  gsap.from("#contact .contact-container", {
    opacity: 0.2,
    duration: 1.8,
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: "#contact",
      start: "top 140%",
    },
  });
}




/*function revealImg() {
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
} */

showTimeCR();
menuButton();
revealToSpan();
prealoaderAnimation();
textRevealServices();
textRevealWorks();
textRevealContact();
