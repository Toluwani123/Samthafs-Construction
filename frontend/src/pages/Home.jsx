import React, {useState, useEffect} from 'react'
import publicApi from '../api';
import { FaChevronDown, FaMapMarkerAlt, FaClock, FaBuilding, FaHome, FaIndustry, FaPaintRoller, FaTree, FaCheckCircle, FaCalendarAlt, FaUsers, FaStar } from "react-icons/fa";
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';
import  {differenceInMonths} from 'date-fns';
import ServiceCard from '../components/ServiceCard';
import StatCard from '../components/StatCard';
import ContactModal from '../components/ContactModal';
import QuoteModal from '../components/QuoteModal';
import ScrollToTop from '../components/ScrollToTop';


function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [quoteModal, setQuoteModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [quoteSent, setQuoteSent] = useState(false);
    const [activePage, setActivePage] = useState("home");
    const [projects, setProjects] = useState([]);
    const [quote, setQuote] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        location: "",
        budget: "",
        description: "",
    });
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleQuoteChange = (e) => {
        setQuote({
            ...quote,
            [e.target.name]: e.target.value,
        });
    };
    const handleContactChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    };
    const handleQuoteSubmit = async e => {
        e.preventDefault();
        try {
        const { status } = await publicApi.post('/quote/', quote);
        if (status === 201) {
            setQuoteModal(false);
            setQuoteSent(true);
            setQuote({
            name: '', email: '', phone: '',
            projectType: '', location: '',
            budget: '', description: '',
            });
        }
        } catch (err) { console.error('Error sending quote:', err); }
    };
    const handleContactSubmit = async e => {
        e.preventDefault();
        try {
        const { status } = await publicApi.post('/contact/', contact);
        if (status === 201) {
            setContactModal(false);
            setMessageSent(true);
            setContact({ name: '', email: '', phone: '', subject: '', message: '' });
        }
        } catch (err) { console.error('Error sending contact message:', err); }
    };
    const services = [
        {
            Icon: FaBuilding,
            title: 'Commercial Construction',
            desc:
            'From office buildings to retail spaces, we deliver commercial projects that combine functionality with architectural excellence.',
        },
        {
            Icon: FaHome,
            title: 'Residential Development',
            desc:
            'Creating beautiful, sustainable homes and residential complexes that enhance quality of life and community values.',
        },
        {
            Icon: FaIndustry,
            title: 'Industrial Construction',
            desc:
            'Specialized construction for manufacturing, logistics, and industrial facilities with a focus on efficiency and durability.',
        },
        {
            Icon: FaPaintRoller,
            title: 'Interior Works',
            desc:
            'From drywall and millwork to bespoke finishes and MEP fit-outs, we customize every interior space for style, comfort, and code compliance.',
        },
        {
            Icon: FaTree,
            title: 'Exterior Construction',
            desc:
            'Façade restoration, roofing, cladding, hardscapes, and landscaping—ensuring curb appeal, weather-resistance, and long-term performance.',
        },
    ];
    const stats = [
        { Icon: FaCheckCircle, value: '250+', label: 'Projects Completed' },
        { Icon: FaCalendarAlt,  value: '20+',   label: 'Years of Experience' },
        { Icon: FaUsers,        value: '150+', label: 'Team Members' },
        { Icon: FaStar,         value: '98%',  label: 'Client Satisfaction' },
    ];
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    const duration = (startDate, endDate) => {
         const start = new Date(startDate);
         const end = new Date(endDate);
         const months = differenceInMonths(end, start);
         const years = Math.floor(months / 12);
         const remMonths = months % 12;
         let parts = [];
         if (years) parts.push(`${years} year${years > 1 ? 's' : ''}`);
         if (remMonths) parts.push(`${remMonths} month${remMonths > 1 ? 's' : ''}`);
         return parts.join(' ') || '0 months';
     };

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p=> p.category === activeFilter);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await publicApi.get("/projects/");
                if (response.status === 200) {
                    setProjects(response.data);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);
    useEffect(() => {
        // when either modal is open, prevent the body from scrolling
        document.body.style.overflow = (contactModal || quoteModal) ? 'hidden' : 'auto';
        // clean up on unmount
        return () => { document.body.style.overflow = 'auto'; };
    }, [contactModal, quoteModal]);



  return (
    <div className='min-h-screen font-sans text-gray-800'>
        <MenuBar 
            isScrolled={scrolled} 
            setActivePage={setActivePage} 
            setIsQuoteModalOpen={setQuoteModal} 
            setIsContactModalOpen={setContactModal} 
            activePage={activePage}
        />
        <main>
            <section id='home' className='relative h-screen flex items-center'>
                <div className='absolute inset-0 overflow-hidden'>
                    <img src="/images/home-bg.jpg" alt="Background" className='w-full h-full object-cover object-top' />
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent'></div>
                </div>
                <div className='container mx-auto px-6 relative z-10'>
                    <div className='max-w-2xl text-white'>
                        <h1 className='text-5xl md:text-6xl font-bold mb-4'>Building Tomorrows Landmarks Today</h1>
                        <p className='text-xl mb-8'>
                            Excellence in construction is not just a goal; it's our commitment. We bring your vision to life with precision and care, ensuring every detail is perfect.
                        </p>
                        <button className='!rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium transition-colors cursor-pointer'>
                            View Our Projects
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                    <FaChevronDown />
                </div>
            </section>
            <section id="projects" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Our Featured Projects</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our portfolio of exceptional construction projects delivered with precision and excellence.</p>
                    </div>
                    <div className="flex justify-center mb-10 overflow-x-auto px-4">
                        <div className="inline-flex min-w-max rounded-md shadow-sm">
                            {['all','commercial','residential','industrial','exterior','interior'].map((cat, i) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`
                                    whitespace-nowrap px-6 py-2 text-sm font-medium
                                    ${activeFilter === cat 
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700'}
                                    ${i === 0 
                                        ? 'border border-gray-200 rounded-l-lg'
                                        : i === 5 
                                        ? 'border-t border-b border-r border-gray-200 rounded-r-lg'
                                        : 'border-t border-b border-r border-gray-200'
                                    }
                                    cursor-pointer
                                    `}
                                >
                                    {cat === 'all' 
                                    ? 'All Projects'
                                    : cat.charAt(0).toUpperCase() + cat.slice(1)
                                    }
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg bg-white transition-transform duration-300 hover:-translate-y-2">
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={project.main_image}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                                    <p className="text-blue-200 mb-2">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                                    <div className="flex justify-between text-white text-sm mt-2">
                                        <span><FaMapMarkerAlt className='mr-2' />{project.location}</span>
                                        <span><FaClock/>{duration(project.start_date, project.completion_date)}</span>
                                    </div>
                                    <a href="#" className="!rounded-button whitespace-nowrap mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors inline-block cursor-pointer">
                                        View Project
                                    </a>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-blue-600 text-sm uppercase tracking-wider mb-2">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                                    <div className="flex justify-between text-gray-500 text-sm">
                                        <span><FaMapMarkerAlt className='mr-2' />{project.location}</span>
                                        <span><FaClock className='mr-2' />{duration(project.start_date, project.completion_date)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="services" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Our Expertise</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We specialize in delivering exceptional construction services across various sectors.
                    </p>
                    </div>
                    <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        xl:grid-cols-5
                        gap-7
                        items-stretch
                    "
                    >
                    {services.map(({ Icon, title, desc }) => (
                        <ServiceCard key={title} Icon={Icon} title={title}>
                        {desc}
                        </ServiceCard>
                    ))}
                    </div>
                </div>
            </section>
            <section className="py-16 bg-blue-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map(({ Icon, value, label }) => (
                        <StatCard
                        key={label}
                        Icon={Icon}
                        value={value}
                        label={label}
                        />
                    ))}
                    </div>
                </div>
            </section>
            <section className="relative overflow-hidden bg-blue-600 text-white py-16 sm:py-20">
                {/* subtle blueprint behind everything */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img
                    src="https://readdy.ai/api/search-image?query=abstract%20construction%20blueprint%20pattern%2C%20architectural%20drawings%2C%20technical%20diagrams%2C%20engineering%20schematics%2C%20subtle%20background%20texture%2C%20professional%20construction%20plans%2C%20high%20resolution&width=1440&height=400&seq=10&orientation=landscape"
                    alt="Blueprint pattern"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                        Ready to Start Your Next Project?
                    </h2>
                    <p className="text-lg sm:text-xl mb-6 sm:mb-8 leading-relaxed">
                        Partner with BuildMaster for exceptional construction services delivered on time and
                        within budget. Our team of experts is ready to bring your vision to life.
                    </p>
                    <button
                        id="contact-us-button"
                        onClick={() => setIsContactModalOpen(true)}
                        className="
                        inline-block
                        bg-white text-blue-600 hover:bg-blue-50
                        font-bold
                        text-base sm:text-lg
                        px-6 sm:px-8
                        py-3 sm:py-4
                        rounded-lg
                        transition-colors
                        "
                    >
                        Contact Us Today
                    </button>
                    </div>
                </div>
            </section>
            <ContactModal
                isOpen={contactModal}
                onClose={() => setContactModal(false)}
                formData={contact}
                onChange={handleContactChange}
                onSubmit={handleContactSubmit}
                isMessageSent={messageSent}
            />
            <QuoteModal
                isOpen={quoteModal}
                onClose={() => setQuoteModal(false)}
                formData={quote}
                onChange={handleQuoteChange}
                onSubmit={handleQuoteSubmit}
            />
        </main>
        <Footer
            setActivePage={setActivePage}
            setIsContactModalOpen={setContactModal}
        />
        <ScrollToTop />
    
    </div>
  )
}

export default Home