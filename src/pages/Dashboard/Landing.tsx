import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import {
  FaPhone,
  FaChevronRight,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  IoMenuOutline,
  IoCloseOutline,
  IoCallOutline,
  IoChevronUp,
} from "react-icons/io5";
import "../../assets/css/landing.css";

// Types
interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface BlogPost {
  id: number;
  image: string;
  date: string;
  title: string;
  description: string;
}

const Landing: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isBackTopBtnActive, setIsBackTopBtnActive] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [stats, setStats] = useState({
    transits: 0,
    operations: 0,
    delivery: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTypewriter(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsHeaderActive(true);
        setIsBackTopBtnActive(true);
      } else {
        setIsHeaderActive(false);
        setIsBackTopBtnActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setStats({
          transits: Math.min(500, Math.floor((500 * currentStep) / steps)),
          operations: 24,
          delivery: Math.min(99.9, Math.floor((99.9 * currentStep) / steps)),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    animateStats();
  }, []);

  const services: Service[] = [
    {
      id: 1,
      icon: "/assets/images/service-icon-1.png",
      title: "Air Freight",
      description:
        "Our aim is to optimize and improve your supply chain so that we can give you the best service.",
    },
    {
      id: 2,
      icon: "/assets/images/service-icon-2.png",
      title: "Road Freight",
      description:
        "Our aim is to optimize and improve your supply chain so that we can give you the best service.",
    },
    {
      id: 3,
      icon: "/assets/images/service-icon-3.png",
      title: "Ocean Freight",
      description:
        "Our aim is to optimize and improve your supply chain so that we can give you the best service.",
    },
    {
      id: 4,
      icon: "/assets/images/service-icon-4.png",
      title: "Rail Freight",
      description:
        "Our aim is to optimize and improve your supply chain so that we can give you the best service.",
    },
    {
      id: 5,
      icon: "/assets/images/service-icon-5.png",
      title: "Warehousing",
      description:
        "Our aim is to optimize and improve your supply chain so that we can give you the best service.",
    },
    {
      id: 6,
      icon: "/assets/images/service-icon-6.png",
      title: "Project Cargo",
      description:
        "Our aim is to optimize and improve your supply chain so that we can give you the best service.",
    },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      image: "/assets/images/blog-1.jpg",
      date: "02 Aug",
      title:
        "At the end of the day, going forward, a new normal that has evolved from. your only logistic partner.",
      description:
        "New chip traps clusters of migrating tumor cells asperiortenetur, blanditiis odit. typesetting industry the standard dummy text ever since the when an printer.",
    },
    {
      id: 2,
      image: "/assets/images/blog-2.jpg",
      date: "21 Aug",
      title:
        "Going forward, a new normal that has evolved from generation. moving your products across all borders.",
      description:
        "New chip traps clusters of migrating tumor cells asperiortenetur, blanditiis odit. typesetting industry the standard dummy text ever since the when an printer.",
    },
  ];

  return (
    <div className="landing-page landing-page-main-div">
      {/* Header */}
      <header
        className={`header ${isHeaderActive ? "active" : ""}`}
        data-header
      >
        <div className="container">
          <h1>
            <Link to="/" className="logo">
              {/* Scholarship Portal */}
              <img
                src="../../public/images/loogo.png"
                alt="Logo"
                width={140}
                height={30}
              />
            </Link>
          </h1>

          <nav className={`navbar ${isMenuOpen ? "active" : ""}`} data-navbar>
            <div className="navbar-top">
              <Link to="/" className="logo">
                {/* Scholarship Portal */}
                <img
                  src="../../public/images/loogo.png"
                  alt="Logo"
                  width={140}
                  height={30}
                />
              </Link>
              <button
                className="nav-close-btn"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <IoCloseOutline />
              </button>
            </div>

            <ul className="navbar-list">
              <li className="navbar-item">
                <Link
                  to="#home"
                  className="navbar-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Home</span>
                  <FaChevronRight />
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="#about"
                  className="navbar-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>About</span>
                  <FaChevronRight />
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="#service"
                  className="navbar-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Service</span>
                  <FaChevronRight />
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="#blog"
                  className="navbar-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Blog</span>
                  <FaChevronRight />
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="#"
                  className="navbar-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Contact</span>
                  <FaChevronRight />
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-contact">
            <div>
              <Link to="/signin" className="contact-number">
                Login
              </Link>
            </div>

            {/* <div>
              <p className="contact-label">Free Call In U.S.A</p>
              <a href="tel:12345678910" className="contact-number">
                1 234 567 8910
              </a>
            </div>
            <div className="contact-icon">
              <IoCallOutline />
            </div> */}
          </div>

          <button
            className="nav-open-btn"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <IoMenuOutline />
          </button>

          <div
            className={`overlay ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          ></div>
        </div>
      </header>

      <main>
        <article>
          <section className="section hero" aria-label="home" id="home">
            <div className="container">
              <div className="hero-content">
                <h1 className="hero-title animate-fade-in">
                  <div className="typewriter-container">
                    {!showTypewriter ? (
                      <div className="typewriter-wrapper">
                        Innovative{" "}
                        <span style={{ color: "var(--dark-orange)" }}>
                          Logistics
                        </span>{" "}
                        Solutions
                      </div>
                    ) : (
                      <Typewriter
                        options={{
                          strings: [
                            'Efficient <span style="color: var(--dark-orange)">Oil</span> Tanker Transit',
                            'Seamless <span style="color: var(--dark-orange)">Port</span> to Depot Logistics',
                            'Reliable <span style="color: var(--dark-orange)">Petroleum</span> Transportation',
                          ],
                          autoStart: true,
                          loop: true,
                          delay: 75,
                          deleteSpeed: 10,
                          cursor: "",
                          wrapperClassName: "typewriter-wrapper",
                        }}
                      />
                    )}
                  </div>
                </h1>

                <div className="hero-stats animate-fade-in-delayed">
                  <div className="stat-item">
                    <span className="stat-number">{stats.transits}+</span>
                    <span className="stat-label">Successful Transits</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{stats.operations}/7</span>
                    <span className="stat-label">Operations</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">{stats.delivery}%</span>
                    <span className="stat-label">On-Time Delivery</span>
                  </div>
                </div>
              </div>
              <div className="hero-image animate-float">
                <img
                  src="../../../public/images/bigby.png"
                  alt="Oil Tanker Transit"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section
            className="section service"
            id="service"
            aria-label="service"
          >
            <div className="container">
              <p className="section-subtitle">All Services</p>
              <h2 className="h2 section-title">Trusted For Our Services</h2>
              <p className="section-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry the standard dummy text ever since the when an printer
                took.
              </p>

              <ul className="service-list grid-list">
                {services.map((service) => (
                  <li key={service.id}>
                    <div className="service-card">
                      <div className="card-icon">
                        <img
                          src={service.icon}
                          width="80"
                          height="60"
                          loading="lazy"
                          alt={service.title}
                        />
                      </div>
                      <h3 className="h3 card-title">
                        <span className="span">
                          {service.id.toString().padStart(2, "0")}
                        </span>{" "}
                        {service.title}
                      </h3>
                      <p className="card-text">{service.description}</p>
                      <Link to="#" className="btn-link">
                        <FaChevronRight />
                        <span className="span">View Detail</span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Blog Section */}
          <section className="section blog" aria-label="blog" id="blog">
            <div className="container">
              <p className="section-subtitle">Our Blogs</p>
              <h2 className="h2 section-title">Recent news & events</h2>
              <p className="section-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry the standard dummy text ever since the when an printer
                took.
              </p>

              <ul className="blog-list grid-list">
                {blogPosts.map((post) => (
                  <li key={post.id}>
                    <div className="blog-card">
                      <figure
                        className="card-banner img-holder"
                        style={
                          {
                            "--width": 770,
                            "--height": 500,
                          } as React.CSSProperties
                        }
                      >
                        <img
                          src={post.image}
                          width="770"
                          height="500"
                          loading="lazy"
                          alt={post.title}
                          className="img-cover"
                        />
                      </figure>
                      <div className="card-content">
                        <time className="card-meta" dateTime="2052-05-02">
                          <span className="span">{post.date}</span>
                        </time>
                        <h3 className="h3 card-title">
                          <Link to="#">{post.title}</Link>
                        </h3>
                        <p className="card-text">{post.description}</p>
                        <Link to="#" className="btn-link">
                          <FaChevronRight />
                          <span className="span">Read More</span>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top section">
            <div className="footer-brand">
              <Link to="/" className="logo">
                Scholarship Portal
              </Link>
              <p className="footer-text">
                Streamline your scholarship management and logistics operations
                with Scholarship Portal
              </p>
              <ul className="social-list">
                <li>
                  <Link to="#" className="social-link">
                    <FaFacebook />
                  </Link>
                </li>
                <li>
                  <Link to="#" className="social-link">
                    <FaTwitter />
                  </Link>
                </li>
                <li>
                  <Link to="#" className="social-link">
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link to="#" className="social-link">
                    <FaYoutube />
                  </Link>
                </li>
              </ul>
            </div>

            <ul className="footer-list">
              {/* <li>
                <p className="footer-list-title">Quick Links</p>
              </li>
              <li>
                <Link to="#">About</Link>
              </li>
              <li>
                <Link to="#">Services</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
              <li>
                <Link to="#">Contact Us</Link>
              </li> */}
            </ul>

            <ul className="footer-list">
              {/* <li>
                <p className="footer-list-title">Services</p>
              </li>
              <li>
                <Link to="#">Warehouse</Link>
              </li>
              <li>
                <Link to="#">Air Freight</Link>
              </li>
              <li>
                <Link to="#">Ocean Freight</Link>
              </li>
              <li>
                <Link to="#">Road Freight</Link>
              </li>
              <li>
                <Link to="#">Packaging</Link>
              </li> */}
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Community</p>
              </li>
              <li>
                <Link to="#">Business Consulting</Link>
              </li>
              <li>
                <Link to="#">Testimonials</Link>
              </li>
              <li>
                <Link to="#">Track Your Shipment</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms & Condition</Link>
              </li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p className="copyright">
              &copy; 2025 Scholarship Portal. All Rights Reserved by{" "}
              <Link to="#" className="copyright-link">
                Admin
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <Link
        to="#top"
        className={`back-top-btn ${isBackTopBtnActive ? "active" : ""}`}
        aria-label="Back to top"
      >
        <IoChevronUp />
      </Link>
    </div>
  );
};

export default Landing;
