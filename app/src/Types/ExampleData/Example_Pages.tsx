import { Page } from "../PageType";

const Group1: Page[] = [
  {
    info: {
      slug: "CDD-home",
      title: "Home",
      title_display: "Welcome Home",
      icon: "home",
    },
    content: <div>Welcome to the Home Page</div>,
  },
  {
    info: {
      slug: "about",
      title: "About Dictionary",
      title_display: "About Us",
      icon: "info"
    },
    content: <div>Learn more about us on this page.</div>,
  },
  {
    info: {
      slug: "contact",
      title: "Contact Resource",
      title_display: "Contact Us",
      icon: "mail"
    },
    content: <div>Get in touch with us here.</div>,
  },
  {
    info: {
      slug: "services",
      title: "Services Dictionary",
      title_display: "Our Services",
      icon: "apps"
    },
    content: <div>Explore the services we offer.</div>,
  },
  {
    info: { slug: "blog", title: "Blog Resource", title_display: "Our Blog", icon: "newspaper" },
    content: <div>Read our latest blog posts.</div>,
  },
];

const Group2: Page[] = [
  {
    info: {
      slug: "faq",
      title: "FAQ Dictionary",
      title_display: "Frequently Asked Questions",
      icon: "contact_support"
    },
    content: <div>Find answers to common questions.</div>,
  },
  {
    info: {
      slug: "team",
      title: "Team Resource",
      title_display: "Meet the Team",
      icon: "group"
    },
    content: <div>Get to know our team members.</div>,
  },
  {
    info: {
      slug: "careers",
      title: "Careers Dictionary",
      title_display: "Join Our Team",
      icon: "work",
    },
    content: <div>Explore career opportunities with us.</div>,
  },
  {
    info: {
      slug: "portfolio",
      title: "Portfolio Resource",
      title_display: "Our Work",
      icon: "account_circle",
    },
    content: <div>Check out our portfolio.</div>,
  },
  {
    info: {
      slug: "testimonials",
      title: "Testimonials Dictionary",
      title_display: "What Our Clients Say",
      icon: "assignment"
    },
    content: <div>Read testimonials from our clients.</div>,
  },
];

const Group3: Page[] = [
  {
    info: {
      slug: "pricing",
      title: "Pricing Resource",
      title_display: "Our Pricing",
    },
    content: <div>View our pricing plans.</div>,
  },
  {
    info: {
      slug: "gallery",
      title: "Gallery Dictionary",
      title_display: "Photo Gallery",
      icon: "payment"
    },
    content: <div>Browse our photo gallery.</div>,
  },
  {
    info: {
      slug: "events",
      title: "Events Resource",
      title_display: "Upcoming Events",
      icon: "event",
    },
    content: <div>Check out our upcoming events.</div>,
  },
  {
    info: {
      slug: "news",
      title: "News Dictionary",
      title_display: "Latest News",
      icon: "newspaper"
    },
    content: <div>Stay updated with our latest news.</div>,
  },
  {
    info: {
      slug: "resources",
      title: "Resources Resource",
      title_display: "Helpful Resources",
      icon: "sdk"
    },
    content: <div>Access our helpful resources.</div>,
  },
  {
    info: {
      slug: "partners",
      title: "Partners Dictionary",
      title_display: "Our Partners",
      icon: "handshake"
    },
    content: <div>Learn about our partners.</div>,
  },
  {
    info: {
      slug: "support",
      title: "Support Resource",
      title_display: "Customer Support",
      icon: "brick"
    },
    content: <div>Get support for our products and services.</div>,
  },
  {
    info: {
      slug: "privacy",
      title: "Privacy Dictionary",
      title_display: "Privacy Policy",
      icon: "verified_user"
    },
    content: <div>Read our privacy policy.</div>,
  },
  {
    info: {
      slug: "terms",
      title: "Terms Resource",
      title_display: "Terms and Conditions",
      icon: "contract",
    },
    content: <div>Review our terms and conditions.</div>,
  },
  {
    info: {
      slug: "sitemap",
      title: "Sitemap Dictionary",
      title_display: "Website Sitemap",
      icon: "map"
    },
    content: <div>Navigate through our website sitemap.</div>,
  },
];

export const Example_Pages = {
  Group1,
  Group2,
  Group3,
};